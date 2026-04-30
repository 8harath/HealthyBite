import { describe, expect, it } from "vitest";
import { generateRecommendations, type HealthProfile } from "@/lib/recommendationEngine";

describe("Recommendation Engine", () => {
  const baseProfile: HealthProfile = {
    age: "29",
    gender: "female",
    height: "165",
    weight: "60",
    activityLevel: "moderate",
    healthGoal: "general-health",
    dietaryPreference: "vegetarian",
    cuisinePreference: "local",
    allergies: "",
    mealsPerDay: "3",
    budget: "moderate",
    cookingPreference: "both",
    medicalConditions: "",
    location: "kerala",
  };

  it("does not return meat, seafood, or egg dishes for vegetarian users", () => {
    const meals = generateRecommendations(baseProfile);

    expect(meals.length).toBeGreaterThan(0);

    meals.forEach((meal) => {
      const text = `${meal.name} ${meal.description}`.toLowerCase();
      expect(text).not.toMatch(/chicken|mutton|lamb|beef|pork|fish|prawn|shrimp|egg|omelette|omelet|mutta/);
      expect(meal.type).not.toBe("non-vegetarian");
      expect(meal.type).not.toBe("pescatarian");
    });
  });
});
