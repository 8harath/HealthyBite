export interface MealRecommendation {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  type: string;
  tags: string[];
  image: string;
}

export interface HealthProfile {
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  healthGoal: string;
  dietaryPreference: string;
  allergies: string;
  mealsPerDay: string;
  budget: string;
  cookingPreference: string;
  medicalConditions: string;
}

const mealDatabase: MealRecommendation[] = [
  // High Protein South Indian Meals
  {
    id: 1,
    name: "Chicken Chettinad with Brown Rice",
    description: "Spicy South Indian chicken curry with aromatic spices and brown rice",
    calories: 480,
    protein: 42,
    carbs: 38,
    fats: 16,
    type: "non-vegetarian",
    tags: ["high-protein", "muscle-gain", "spicy"],
    image: "🍛",
  },
  {
    id: 2,
    name: "Paneer Dosa with Sambar",
    description: "Crispy dosa stuffed with cottage cheese, served with lentil sambar",
    calories: 420,
    protein: 28,
    carbs: 42,
    fats: 14,
    type: "vegetarian",
    tags: ["high-protein", "vegetarian", "muscle-gain"],
    image: "🥞",
  },
  {
    id: 3,
    name: "Masala Idli with Coconut Chutney",
    description: "Steamed rice cakes sautéed with spices and vegetables",
    calories: 320,
    protein: 18,
    carbs: 48,
    fats: 8,
    type: "vegan",
    tags: ["vegan", "low-calorie", "weight-loss", "breakfast"],
    image: "🍘",
  },

  // Weight Loss South Indian Meals
  {
    id: 4,
    name: "Fish Curry Kerala Style",
    description: "Light and tangy fish curry with coconut and tamarind",
    calories: 350,
    protein: 38,
    carbs: 18,
    fats: 15,
    type: "pescatarian",
    tags: ["low-carb", "weight-loss", "high-protein", "omega-3"],
    image: "🐟",
  },
  {
    id: 5,
    name: "Ragi Dosa with Vegetable Sambar",
    description: "Nutritious finger millet crepe with mixed vegetable lentil stew",
    calories: 280,
    protein: 15,
    carbs: 42,
    fats: 6,
    type: "vegan",
    tags: ["low-calorie", "vegan", "weight-loss", "high-fiber"],
    image: "🥞",
  },
  {
    id: 6,
    name: "Vegetable Upma with Mint Chutney",
    description: "Semolina porridge loaded with vegetables and spices",
    calories: 260,
    protein: 12,
    carbs: 40,
    fats: 7,
    type: "vegan",
    tags: ["low-calorie", "vegan", "weight-loss", "breakfast"],
    image: "🍚",
  },

  // Balanced South Indian Meals
  {
    id: 7,
    name: "Egg Curry with Malabar Parotta",
    description: "Spiced egg curry served with flaky layered flatbread",
    calories: 520,
    protein: 32,
    carbs: 55,
    fats: 18,
    type: "non-vegetarian",
    tags: ["balanced", "maintenance", "moderate"],
    image: "🥚",
  },
  {
    id: 8,
    name: "Bisi Bele Bath",
    description: "Traditional Karnataka one-pot meal with rice, lentils, and vegetables",
    calories: 400,
    protein: 20,
    carbs: 62,
    fats: 10,
    type: "vegan",
    tags: ["vegan", "comfort-food", "general-health", "balanced"],
    image: "🍲",
  },
  {
    id: 9,
    name: "Thali Meal with Rasam and Rice",
    description: "Complete South Indian platter with rasam, sambar, vegetables, and rice",
    calories: 450,
    protein: 18,
    carbs: 68,
    fats: 12,
    type: "vegetarian",
    tags: ["vegetarian", "balanced", "general-health"],
    image: "🍱",
  },

  // High Calorie for Muscle Gain
  {
    id: 10,
    name: "Mutton Biryani Hyderabadi Style",
    description: "Aromatic rice layered with spiced mutton and herbs",
    calories: 680,
    protein: 48,
    carbs: 72,
    fats: 24,
    type: "non-vegetarian",
    tags: ["high-protein", "muscle-gain", "high-calorie"],
    image: "🍛",
  },
  {
    id: 11,
    name: "Ghee Roast Dosa with Potato Masala",
    description: "Crispy dosa roasted in ghee with spiced potato filling",
    calories: 580,
    protein: 16,
    carbs: 78,
    fats: 24,
    type: "vegetarian",
    tags: ["high-calorie", "energy", "vegetarian"],
    image: "🥞",
  },

  // Energy Boosting South Indian Meals
  {
    id: 12,
    name: "Rava Pongal with Cashews",
    description: "Savory semolina porridge with ghee, cashews, and black pepper",
    calories: 420,
    protein: 14,
    carbs: 58,
    fats: 16,
    type: "vegetarian",
    tags: ["energy", "breakfast", "vegetarian"],
    image: "🍚",
  },
  {
    id: 13,
    name: "Pesarattu with Ginger Chutney",
    description: "Green gram dosa packed with protein and served with spicy chutney",
    calories: 360,
    protein: 22,
    carbs: 52,
    fats: 8,
    type: "vegan",
    tags: ["energy", "vegan", "high-protein", "breakfast"],
    image: "🥞",
  },
  {
    id: 14,
    name: "Prawn Masala with Appam",
    description: "Spicy coastal prawn curry with soft rice pancakes",
    calories: 440,
    protein: 40,
    carbs: 38,
    fats: 14,
    type: "pescatarian",
    tags: ["high-protein", "pescatarian", "muscle-gain"],
    image: "🦐",
  },
  {
    id: 15,
    name: "Vegetable Uttapam with Coconut Chutney",
    description: "Thick rice pancake topped with onions, tomatoes, and peppers",
    calories: 340,
    protein: 16,
    carbs: 54,
    fats: 8,
    type: "vegan",
    tags: ["vegan", "balanced", "general-health"],
    image: "🥞",
  },
];

export function generateRecommendations(profile: HealthProfile): MealRecommendation[] {
  let recommendations: MealRecommendation[] = [];

  // Filter by dietary preference
  let filteredMeals = mealDatabase.filter((meal) => {
    const pref = profile.dietaryPreference.toLowerCase();

    if (pref === "vegan") return meal.type === "vegan";
    if (pref === "vegetarian") return meal.type === "vegetarian" || meal.type === "vegan";
    if (pref === "pescatarian") return meal.type === "pescatarian";
    if (pref === "non-vegetarian") return meal.type === "non-vegetarian"; // Only non-veg meals

    return true; // No preference
  });

  // Filter by health goal
  const goal = profile.healthGoal.toLowerCase();
  filteredMeals = filteredMeals.filter((meal) => {
    if (goal === "weight-loss") {
      return meal.calories < 400 || meal.tags.includes("weight-loss");
    }
    if (goal === "muscle-gain") {
      return meal.protein > 25 || meal.tags.includes("muscle-gain");
    }
    if (goal === "energy") {
      return meal.tags.includes("energy") || meal.carbs > 50;
    }
    return true; // General health - all meals OK
  });

  // Filter by activity level (adjust calorie range)
  const activity = profile.activityLevel.toLowerCase();
  if (activity.includes("sedentary") || activity.includes("light")) {
    filteredMeals = filteredMeals.filter((meal) => meal.calories < 500);
  } else if (activity.includes("very-active")) {
    filteredMeals = filteredMeals.filter((meal) => meal.calories > 350);
  }

  // Remove meals with allergens
  if (profile.allergies) {
    const allergyKeywords = profile.allergies.toLowerCase().split(",").map(a => a.trim());
    filteredMeals = filteredMeals.filter((meal) => {
      const mealLower = `${meal.name} ${meal.description}`.toLowerCase();
      return !allergyKeywords.some(allergen =>
        mealLower.includes(allergen) ||
        (allergen.includes("dairy") && mealLower.includes("cheese")) ||
        (allergen.includes("gluten") && mealLower.includes("pasta"))
      );
    });
  }

  // Sort by relevance (prioritize meals that match goal)
  filteredMeals.sort((a, b) => {
    const aScore = a.tags.includes(goal) ? 1 : 0;
    const bScore = b.tags.includes(goal) ? 1 : 0;
    return bScore - aScore;
  });

  // Return top 5 recommendations
  recommendations = filteredMeals.slice(0, 5);

  // If we don't have enough recommendations, add some balanced meals
  if (recommendations.length < 5) {
    const balanced = mealDatabase
      .filter(m => !recommendations.includes(m))
      .slice(0, 5 - recommendations.length);
    recommendations = [...recommendations, ...balanced];
  }

  return recommendations;
}

export function calculateBMI(height: number, weight: number): number {
  // Height in meters, weight in kg
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}
