import { NextRequest, NextResponse } from "next/server";
import { generateMealRecommendationsWithLLM, isLLMConfigured } from "@/lib/llmService";
import { generateRecommendations, calculateBMI, getBMICategory } from "@/lib/recommendationEngine";
import type { HealthProfile } from "@/lib/recommendationEngine";

// Simple in-memory rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Validate the health profile input
 */
function validateHealthProfile(profile: Partial<HealthProfile>): string[] {
  const errors: string[] = [];

  // Required fields
  if (!profile.age || isNaN(Number(profile.age)) || Number(profile.age) < 10 || Number(profile.age) > 120) {
    errors.push("Valid age (10-120) is required");
  }
  if (!profile.gender) {
    errors.push("Gender is required");
  }
  if (!profile.height || isNaN(Number(profile.height)) || Number(profile.height) < 100 || Number(profile.height) > 250) {
    errors.push("Valid height (100-250 cm) is required");
  }
  if (!profile.weight || isNaN(Number(profile.weight)) || Number(profile.weight) < 30 || Number(profile.weight) > 300) {
    errors.push("Valid weight (30-300 kg) is required");
  }
  if (!profile.activityLevel) {
    errors.push("Activity level is required");
  }
  if (!profile.healthGoal) {
    errors.push("Health goal is required");
  }
  if (!profile.dietaryPreference) {
    errors.push("Dietary preference is required");
  }
  if (!profile.mealsPerDay) {
    errors.push("Meals per day is required");
  }
  if (!profile.budget) {
    errors.push("Budget preference is required");
  }
  if (!profile.cookingPreference) {
    errors.push("Cooking preference is required");
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "Too many requests. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    const healthProfile = await request.json();

    // Validate input
    const validationErrors = validateHealthProfile(healthProfile);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Invalid health profile",
          message: validationErrors.join("; "),
          validationErrors,
        },
        { status: 400 }
      );
    }

    // Check if LLM is configured
    if (!isLLMConfigured()) {
      console.warn("⚠️  GEMINI_API_KEY not configured - using fallback rule-based engine");

      // Fallback to rule-based recommendations
      const recommendations = generateRecommendations(healthProfile);

      // Calculate BMI and generate insights for fallback
      const height = parseFloat(healthProfile.height);
      const weight = parseFloat(healthProfile.weight);
      const bmi = calculateBMI(height, weight);
      const bmiCategory = getBMICategory(bmi);

      return NextResponse.json({
        success: true,
        recommendations,
        insights: {
          bmi,
          bmiCategory,
          healthTips: [
            `Focus on ${healthProfile.healthGoal.replace("-", " ")} with consistent meal planning.`,
            `Your BMI indicates ${bmiCategory.toLowerCase()} — maintain a balanced diet.`,
            `Stay active with your ${healthProfile.activityLevel} lifestyle to support your goals.`,
          ],
          whyTheseMeals: `These meals are selected based on your ${healthProfile.dietaryPreference} preference and ${healthProfile.healthGoal.replace("-", " ")} goal using our proven recommendation engine.`,
          nutritionalFocus: healthProfile.healthGoal === "weight-loss"
            ? "Low calorie, high protein for sustainable weight management"
            : healthProfile.healthGoal === "muscle-gain"
              ? "High protein, moderate carbs for muscle building"
              : healthProfile.healthGoal === "energy"
                ? "Complex carbs, balanced macros for sustained energy"
                : "Balanced nutrition for overall wellness",
        },
        message: "Recommendations generated using rule-based engine (LLM not configured)",
        usedFallback: true,
      });
    }

    // Generate AI-powered recommendations using Gemini
    const result = await generateMealRecommendationsWithLLM(healthProfile);

    return NextResponse.json({
      success: true,
      recommendations: result.meals,
      insights: result.insights,
      message: result.usedFallback
        ? "Recommendations generated using fallback engine (LLM error)"
        : "AI-powered recommendations generated successfully",
      usedFallback: result.usedFallback,
    });
  } catch (error) {
    console.error("Error in recommendations API:", error);

    return NextResponse.json(
      {
        error: "Failed to generate recommendations",
        message: error instanceof Error ? error.message : "Internal server error"
      },
      { status: 500 }
    );
  }
}
