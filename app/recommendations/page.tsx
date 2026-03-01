"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { MealRecommendation, HealthProfile } from "@/lib/recommendationEngine";

interface Insights {
  bmi: number;
  bmiCategory: string;
  healthTips: string[];
  whyTheseMeals: string;
  nutritionalFocus: string;
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-80 mx-auto animate-pulse" />
        </div>

        {/* Health summary skeleton */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Insights skeleton */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            </div>
          ))}
        </div>

        {/* Meal cards skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6 animate-pulse" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 animate-pulse"
              >
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-10 bg-gray-300 dark:bg-gray-600 rounded" />
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading message */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600" />
            <span className="text-primary-700 dark:text-primary-300 font-medium">
              AI is crafting your personalized meals...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<HealthProfile | null>(null);
  const [recommendations, setRecommendations] = useState<MealRecommendation[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAIRecommendations = useCallback(async (healthProfile: HealthProfile, isRegenerate = false) => {
    try {
      if (isRegenerate) {
        setRegenerating(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(healthProfile),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to generate recommendations");
      }

      const data = await response.json();

      setRecommendations(data.recommendations);
      setInsights(data.insights || null);
      setUsedFallback(data.usedFallback || false);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(err instanceof Error ? err.message : "Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      return;
    }

    // Load health profile
    const savedProfile = localStorage.getItem("healthProfile");
    if (!savedProfile) {
      router.push("/questionnaire");
      return;
    }

    const healthProfile = JSON.parse(savedProfile);
    setProfile(healthProfile);

    // Generate AI-powered recommendations
    generateAIRecommendations(healthProfile);
  }, [router, generateAIRecommendations]);

  if (loading || !profile) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => profile && generateAIRecommendations(profile)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {usedFallback ? "Your Personalized Meal Plan" : "🤖 AI-Powered Meal Recommendations"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {usedFallback
              ? "Based on your health profile and goals"
              : "Generated by AI specifically for your health profile"}
          </p>
          {usedFallback && (
            <div className="mt-3 inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
              ℹ️ Using rule-based recommendations (AI not configured)
            </div>
          )}
        </div>

        {/* Health Summary */}
        <div className="bg-gradient-to-r from-primary-50 to-green-50 dark:from-primary-900/20 dark:to-green-900/20 rounded-xl p-6 mb-8 border border-primary-200 dark:border-primary-800">
          <h2 className="text-xl font-semibold mb-4">Your Health Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">BMI</p>
              <p className="text-2xl font-bold text-primary-600">
                {insights?.bmi || 0}
              </p>
              <p className="text-xs text-gray-500">{insights?.bmiCategory || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Goal</p>
              <p className="text-lg font-semibold capitalize">
                {profile.healthGoal.replace("-", " ")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Diet</p>
              <p className="text-lg font-semibold capitalize">
                {profile.dietaryPreference}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Activity</p>
              <p className="text-lg font-semibold capitalize">
                {profile.activityLevel}
              </p>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        {insights && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Why These Meals */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="text-2xl mr-2">💡</span>
                Why These Meals?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {insights.whyTheseMeals}
              </p>
            </div>

            {/* Nutritional Focus */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Nutritional Strategy
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {insights.nutritionalFocus}
              </p>
            </div>
          </div>
        )}

        {/* Health Tips */}
        {insights && insights.healthTips && insights.healthTips.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">✨</span>
              Personalized Health Tips
            </h3>
            <ul className="space-y-2">
              {insights.healthTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recommended Meals for You</h2>
            <button
              onClick={() => profile && generateAIRecommendations(profile, true)}
              disabled={regenerating}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-primary-200 dark:border-primary-800"
            >
              {regenerating ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Regenerating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                  </svg>
                  Regenerate
                </>
              )}
            </button>
          </div>

          {/* Regenerating overlay */}
          <div className={`relative ${regenerating ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="text-5xl mb-3">{meal.image}</div>
                    <h3 className="text-xl font-bold mb-2">{meal.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {meal.description}
                    </p>

                    {/* Macros */}
                    <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Calories</p>
                        <p className="font-bold text-primary-600">{meal.calories}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Protein</p>
                        <p className="font-bold">{meal.protein}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Carbs</p>
                        <p className="font-bold">{meal.carbs}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Fats</p>
                        <p className="font-bold">{meal.fats}g</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {meal.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-3">Ready to Start Your Journey?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Choose a subscription plan and get these delicious, healthy meals delivered to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/subscriptions"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              View Subscription Plans
            </Link>
            <Link
              href="/questionnaire"
              className="px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
