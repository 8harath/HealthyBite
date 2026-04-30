import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import {
  HealthProfile,
  MealRecommendation,
  generateRecommendations as fallbackRecommendations,
  getRegionalMealPool,
  calculateMealPrice,
  generateBasePriceForMeal,
  MEAT_KEYWORDS,
  SEAFOOD_KEYWORDS,
  EGG_KEYWORDS,
  DAIRY_KEYWORDS,
  GLUTEN_KEYWORDS,
  NUT_KEYWORDS,
  SOY_KEYWORDS,
  EXPENSIVE_INGREDIENT_KEYWORDS,
} from "./recommendationEngine";

export type LLMProvider = "gemini" | "groq";

const JSON_ONLY_SYSTEM_PROMPT =
  "You are a professional nutritionist and meal planning expert. Always respond with valid JSON only, no additional text.";

// Initialize Gemini client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables");
  }

  return new GoogleGenerativeAI(apiKey);
};

// Initialize Groq client
const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured in environment variables");
  }

  return new Groq({ apiKey });
};

export function getConfiguredLLMProvider(): LLMProvider | null {
  if (process.env.GEMINI_API_KEY) {
    return "gemini";
  }

  if (process.env.GROQ_API_KEY) {
    return "groq";
  }

  return null;
}

export interface LLMRecommendationResponse {
  meals: MealRecommendation[];
  insights: {
    bmi: number;
    bmiCategory: string;
    healthTips: string[];
    whyTheseMeals: string;
    nutritionalFocus: string;
  };
  success: boolean;
  usedFallback?: boolean;
  provider?: LLMProvider | "fallback";
}

interface RegionalCuisineContext {
  region: string;
  cuisine: string;
  ingredients: string;
  examples: string;
}

/**
 * Retry a function with exponential backoff
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 2,
  baseDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt + 1}/${maxRetries + 1} failed:`, error instanceof Error ? error.message : error);

      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Generate AI-powered meal recommendations using Gemini or Groq.
 * Gemini is preferred when both keys are configured because the product
 * and docs still describe Gemini as the primary meal suggestion engine.
 */
export async function generateMealRecommendationsWithLLM(
  profile: HealthProfile
): Promise<LLMRecommendationResponse> {
  const provider = getConfiguredLLMProvider();

  try {
    if (!provider) {
      throw new Error("No LLM provider configured. Set GEMINI_API_KEY or GROQ_API_KEY.");
    }

    // Calculate BMI
    const height = parseFloat(profile.height);
    const weight = parseFloat(profile.weight);
    const bmi = calculateBMI(height, weight);
    const bmiCategory = getBMICategory(bmi);

    // Create detailed prompt
    const prompt = createMealRecommendationPrompt(profile, bmi, bmiCategory);

    const text = provider === "gemini"
      ? await generateWithGemini(prompt)
      : await generateWithGroq(prompt);

    // Parse JSON response from LLM
    const parsedResponse = parseLLMResponse(text);
    const finalizedMeals = finalizeMealRecommendations(parsedResponse.meals, profile);
    const preferredCuisine = getPreferredCuisineContext(profile);

    return {
      meals: finalizedMeals,
      insights: {
        bmi,
        bmiCategory,
        healthTips: parsedResponse.healthTips,
        whyTheseMeals: buildWhyTheseMealsSummary(parsedResponse.whyTheseMeals, profile, preferredCuisine),
        nutritionalFocus: parsedResponse.nutritionalFocus,
      },
      success: true,
      usedFallback: false,
      provider,
    };
  } catch (error) {
    console.error(`Error generating ${provider ?? "LLM"} recommendations:`, error);

    // Fallback to rule-based recommendations
    return generateFallbackRecommendations(profile);
  }
}

async function generateWithGemini(prompt: string): Promise<string> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await withRetry(
    () => model.generateContent(`${JSON_ONLY_SYSTEM_PROMPT}\n\n${prompt}`),
    2
  );
  const response = await result.response;

  return response.text();
}

async function generateWithGroq(prompt: string): Promise<string> {
  const groq = getGroqClient();
  const chatCompletion = await withRetry(
    () => groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: JSON_ONLY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: "json_object" },
    }),
    2
  );

  return chatCompletion.choices[0]?.message?.content || "";
}

function getPreferredCuisineCode(profile: HealthProfile): string {
  const preferredCuisine = profile.cuisinePreference?.trim();

  if (preferredCuisine && preferredCuisine !== "local") {
    return preferredCuisine;
  }

  return profile.location;
}

function getPreferredCuisineContext(profile: HealthProfile): RegionalCuisineContext {
  return getRegionalCuisineContext(getPreferredCuisineCode(profile));
}

function getMealSearchText(meal: MealRecommendation): string {
  const ingredientText = (meal.ingredients || [])
    .map((ingredient) => `${ingredient.name} ${ingredient.amount || ""}`)
    .join(" ");
  const instructionText = (meal.instructions || []).join(" ");
  const tagText = meal.tags.join(" ");

  return `${meal.name} ${meal.description} ${meal.type} ${tagText} ${ingredientText} ${instructionText}`.toLowerCase();
}

function parseDurationMinutes(value?: string): number | null {
  if (!value) {
    return null;
  }

  const match = value.match(/(\d+)/);
  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

function inferMealType(meal: MealRecommendation): string {
  const text = getMealSearchText(meal);

  if (MEAT_KEYWORDS.some((keyword) => text.includes(keyword)) || EGG_KEYWORDS.some((keyword) => text.includes(keyword))) {
    return "non-vegetarian";
  }

  if (SEAFOOD_KEYWORDS.some((keyword) => text.includes(keyword))) {
    return "pescatarian";
  }

  if (DAIRY_KEYWORDS.some((keyword) => text.includes(keyword))) {
    return "vegetarian";
  }

  return String(meal.type || "").toLowerCase();
}

function matchesDietaryPreference(meal: MealRecommendation, profile: HealthProfile): boolean {
  const preference = profile.dietaryPreference.toLowerCase();
  const text = getMealSearchText(meal);
  const inferredType = inferMealType(meal);
  const hasMeat = MEAT_KEYWORDS.some((keyword) => text.includes(keyword));
  const hasSeafood = SEAFOOD_KEYWORDS.some((keyword) => text.includes(keyword));
  const hasEgg = EGG_KEYWORDS.some((keyword) => text.includes(keyword));
  const hasDairy = DAIRY_KEYWORDS.some((keyword) => text.includes(keyword));

  if (preference === "vegan") {
    return !hasMeat && !hasSeafood && !hasEgg && !hasDairy && inferredType !== "non-vegetarian" && inferredType !== "pescatarian";
  }

  if (preference === "vegetarian") {
    return !hasMeat && !hasSeafood && !hasEgg && inferredType !== "non-vegetarian" && inferredType !== "pescatarian";
  }

  if (preference === "pescatarian") {
    return !hasMeat && !hasEgg;
  }

  if (preference === "keto") {
    return meal.tags.includes("keto") || meal.tags.includes("low-carb") || meal.carbs <= 25;
  }

  if (preference === "paleo") {
    return meal.tags.includes("paleo") || (meal.carbs <= 30 && meal.protein >= 20 && !hasDairy);
  }

  return true;
}

function matchesAllergyConstraints(meal: MealRecommendation, profile: HealthProfile): boolean {
  const allergyKeywords = profile.allergies
    .toLowerCase()
    .split(",")
    .map((allergy) => allergy.trim())
    .filter((allergy) => allergy.length > 0);

  if (allergyKeywords.length === 0) {
    return true;
  }

  const text = getMealSearchText(meal);

  return !allergyKeywords.some((allergen) =>
    text.includes(allergen) ||
    (allergen.includes("dairy") && DAIRY_KEYWORDS.some((keyword) => text.includes(keyword))) ||
    (allergen.includes("gluten") && GLUTEN_KEYWORDS.some((keyword) => text.includes(keyword))) ||
    (allergen.includes("nut") && NUT_KEYWORDS.some((keyword) => text.includes(keyword))) ||
    (allergen.includes("seafood") && SEAFOOD_KEYWORDS.some((keyword) => text.includes(keyword))) ||
    (allergen.includes("egg") && EGG_KEYWORDS.some((keyword) => text.includes(keyword))) ||
    (allergen.includes("soy") && SOY_KEYWORDS.some((keyword) => text.includes(keyword)))
  );
}

function scoreMealForProfile(
  meal: MealRecommendation,
  profile: HealthProfile,
  regionalMealIds: Set<number>
): number {
  let score = 0;
  const goal = profile.healthGoal.toLowerCase();
  const activity = profile.activityLevel.toLowerCase();
  const budget = profile.budget.toLowerCase();
  const cookingPreference = profile.cookingPreference.toLowerCase();
  const medicalConditions = profile.medicalConditions.toLowerCase();
  const text = getMealSearchText(meal);

  if (regionalMealIds.has(meal.id)) {
    score += 4;
  }

  if (goal === "weight-loss") {
    if (meal.calories <= 450) score += 4;
    if (meal.protein >= 20) score += 2;
  } else if (goal === "muscle-gain") {
    if (meal.protein >= 30) score += 4;
    if (meal.calories >= 350) score += 2;
  } else if (goal === "energy") {
    if (meal.carbs >= 45) score += 4;
    if (meal.calories >= 300) score += 1;
  } else if (goal === "maintenance") {
    if (meal.calories >= 350 && meal.calories <= 550) score += 3;
  } else {
    score += meal.protein >= 15 ? 2 : 0;
  }

  if ((activity.includes("sedentary") || activity.includes("light")) && meal.calories <= 500) {
    score += 1;
  }
  if ((activity.includes("active") || activity.includes("very-active")) && meal.calories >= 350) {
    score += 1;
  }

  if (budget === "budget") {
    if (!EXPENSIVE_INGREDIENT_KEYWORDS.some((keyword) => text.includes(keyword))) {
      score += 2;
    }
  } else if (budget === "premium" && EXPENSIVE_INGREDIENT_KEYWORDS.some((keyword) => text.includes(keyword))) {
    score += 1;
  }

  const prepMinutes = parseDurationMinutes(meal.prepTime);
  const cookMinutes = parseDurationMinutes(meal.cookTime);
  const totalMinutes = (prepMinutes || 0) + (cookMinutes || 0);
  if (cookingPreference === "ready-to-eat" && totalMinutes > 0 && totalMinutes <= 30) {
    score += 2;
  }
  if (cookingPreference === "meal-kits" && totalMinutes > 20 && totalMinutes <= 50) {
    score += 1;
  }

  if (medicalConditions.includes("diabetes") && meal.sugar !== undefined && meal.sugar <= 10 && meal.carbs <= 45) {
    score += 2;
  }
  if ((medicalConditions.includes("hypertension") || medicalConditions.includes("high blood pressure")) && meal.sodium !== undefined && meal.sodium <= 600) {
    score += 2;
  }
  if (medicalConditions.includes("cholesterol") && meal.fats <= 18 && !text.includes("fried")) {
    score += 2;
  }

  return score;
}

function applyPricesToMeals(meals: MealRecommendation[], budget: string): MealRecommendation[] {
  return meals.map((meal) => {
    const basePrice = generateBasePriceForMeal(meal);
    const actualPrice = calculateMealPrice(basePrice, budget);
    return {
      ...meal,
      basePrice,
      // Add the actual price as a calculated field
      actualPrice: actualPrice,
    } as any; // Type assertion to allow the actualPrice property
  });
}

function finalizeMealRecommendations(meals: MealRecommendation[], profile: HealthProfile): MealRecommendation[] {
  const regional = getRegionalMealPool(profile);
  const regionalMealIds = new Set(regional.map((meal) => meal.id));
  
  const compatibleMeals = meals
    .filter((meal) => matchesDietaryPreference(meal, profile))
    .filter((meal) => matchesAllergyConstraints(meal, profile))
    .sort((a, b) => scoreMealForProfile(b, profile, regionalMealIds) - scoreMealForProfile(a, profile, regionalMealIds));

  const dedupedMeals = compatibleMeals.filter((meal, index, array) =>
    array.findIndex((candidate) => candidate.name.toLowerCase() === meal.name.toLowerCase()) === index
  );

  let finalMeals: MealRecommendation[];
  if (dedupedMeals.length >= 5) {
    finalMeals = dedupedMeals.slice(0, 5);
  } else {
    const existingMealNames = new Set(dedupedMeals.map((meal) => meal.name.toLowerCase()));
    const fallbackMeals = fallbackRecommendations(profile).filter((meal) => !existingMealNames.has(meal.name.toLowerCase()));
    finalMeals = [...dedupedMeals, ...fallbackMeals].slice(0, 5);
  }

  // Apply prices based on budget bracket
  return applyPricesToMeals(finalMeals, profile.budget);
}

function buildWhyTheseMealsSummary(
  modelSummary: string,
  profile: HealthProfile,
  preferredCuisine: RegionalCuisineContext
): string {
  const cuisineNote = profile.cuisinePreference && profile.cuisinePreference !== "local"
    ? `${preferredCuisine.cuisine} cuisine preference`
    : `local ${preferredCuisine.cuisine.toLowerCase()} palate`;

  return `${modelSummary} Priority was given to ${profile.dietaryPreference.replace("-", " ")}, ${profile.healthGoal.replace("-", " ")}, ${cuisineNote}, ${profile.budget} budget, and ${profile.cookingPreference.replace("-", " ")} preferences.`;
}

/**
 * Create a detailed prompt for generating personalized meal recommendations
 */
// Map location codes to cuisine context for the AI prompt
function getRegionalCuisineContext(location: string): RegionalCuisineContext {
  const regionMap: Record<string, RegionalCuisineContext> = {
    "tamil-nadu": {
      region: "Tamil Nadu",
      cuisine: "Tamil",
      ingredients: "rice, lentils, tamarind, curry leaves, coconut, sesame oil, black pepper, mustard seeds",
      examples: "dosa, idli, sambar, rasam, pongal, chettinad chicken, kuzhambu, kootu, appam, uttapam, upma, adai",
    },
    "kerala": {
      region: "Kerala",
      cuisine: "Kerala",
      ingredients: "coconut, coconut oil, curry leaves, tamarind, rice, fish, banana, jackfruit",
      examples: "puttu, appam, stew, fish curry, avial, thoran, sadya, karimeen fry, erissery, olan, payasam",
    },
    "karnataka": {
      region: "Karnataka",
      cuisine: "Karnataka",
      ingredients: "ragi, jowar, rice, coconut, jaggery, curry leaves, urad dal",
      examples: "bisi bele bath, ragi mudde, Mysore masala dosa, akki roti, vangi bath, neer dosa, gojju",
    },
    "andhra-pradesh": {
      region: "Andhra Pradesh",
      cuisine: "Andhra",
      ingredients: "red chillies, tamarind, rice, lentils, curry leaves, mustard seeds, fenugreek",
      examples: "biryani, gongura, pesarattu, pulihora, gutti vankaya, chicken 65, pappu, pachadi",
    },
    "telangana": {
      region: "Telangana",
      cuisine: "Telangana",
      ingredients: "jowar, bajra, sesame, peanuts, tamarind, red chillies, lentils",
      examples: "Hyderabadi biryani, haleem, jonna rotte, sakinalu, bagara baingan, sarva pindi, pachi pulusu",
    },
    "delhi": {
      region: "Delhi / NCR",
      cuisine: "North Indian / Mughlai",
      ingredients: "wheat, ghee, paneer, cream, butter, spices (garam masala, cumin, coriander)",
      examples: "butter chicken, chole bhature, rajma chawal, paratha, biryani, dal makhani, paneer tikka, kebabs",
    },
    "punjab": {
      region: "Punjab",
      cuisine: "Punjabi",
      ingredients: "wheat, ghee, butter, paneer, mustard greens, makhan, cream, legumes",
      examples: "makki di roti with sarson ka saag, butter chicken, chole, dal makhani, lassi, tandoori chicken, rajma",
    },
    "haryana": {
      region: "Haryana",
      cuisine: "Haryanvi",
      ingredients: "wheat, bajra, curd, ghee, gram flour, fresh dairy, seasonal vegetables",
      examples: "bajra khichdi, kadhi pakora, mixed dal, bathua raita, besan masala roti, kachri ki sabzi",
    },
    "uttar-pradesh": {
      region: "Uttar Pradesh",
      cuisine: "Awadhi / UP",
      ingredients: "wheat, rice, ghee, saffron, spices, lentils, potato",
      examples: "lucknowi biryani, galouti kebab, nihari, bedmi puri, kachori, dum aloo, petha",
    },
    "rajasthan": {
      region: "Rajasthan",
      cuisine: "Rajasthani",
      ingredients: "bajra, jowar, ghee, buttermilk, gram flour, dried lentils, berries (ker sangri)",
      examples: "dal bati churma, gatte ki sabzi, laal maas, ker sangri, bajra roti, papad ki sabzi, pyaaz kachori",
    },
    "west-bengal": {
      region: "West Bengal",
      cuisine: "Bengali",
      ingredients: "rice, fish (rohu, hilsa), mustard oil, panch phoron, poppy seeds, coconut",
      examples: "machher jhol, shorshe ilish, luchi-alur dom, mishti doi, kosha mangsho, chingri malai curry, pitha",
    },
    "maharashtra": {
      region: "Maharashtra",
      cuisine: "Maharashtrian",
      ingredients: "rice, jowar, peanuts, coconut, kokum, jaggery, gram flour",
      examples: "vada pav, misal pav, puran poli, thalipeeth, poha, sabudana khichdi, bharli vangi, pav bhaji",
    },
    "gujarat": {
      region: "Gujarat",
      cuisine: "Gujarati",
      ingredients: "gram flour, buttermilk, jaggery, sesame, peanuts, rice, wheat",
      examples: "dhokla, thepla, undhiyu, khandvi, fafda-jalebi, dal-dhokli, handvo, shrikhand",
    },
    "goa": {
      region: "Goa",
      cuisine: "Goan",
      ingredients: "coconut, kokum, fish, rice, toddy vinegar, tamarind, spices",
      examples: "fish curry rice, vindaloo, xacuti, bebinca, prawn balchao, sorpotel, sannas",
    },
    "odisha": {
      region: "Odisha",
      cuisine: "Odia",
      ingredients: "rice, panch phutana, mustard, curd, coconut, banana flower",
      examples: "dalma, pakhala bhata, chhena poda, machha besara, santula, enduri pitha",
    },
    "bihar": {
      region: "Bihar",
      cuisine: "Bihari",
      ingredients: "sattu, rice, wheat, mustard oil, lentils, vegetables",
      examples: "litti chokha, sattu paratha, dal pitha, thekua, chana ghugni, khaja",
    },
    "jharkhand": {
      region: "Jharkhand",
      cuisine: "Jharkhandi",
      ingredients: "rice, millet, leafy greens, gram flour, lentils, mustard oil, forest vegetables",
      examples: "dhuska, chilka roti, rugra curry, pittha, saag, arsa roti",
    },
    "assam": {
      region: "Assam",
      cuisine: "Assamese",
      ingredients: "rice, fish, mustard oil, bamboo shoot, bhut jolokia, black sesame",
      examples: "masor tenga, khar, pitha, duck curry, aloo pitika, ou tenga",
    },
    "northeast": {
      region: "Northeast India",
      cuisine: "Northeast Indian",
      ingredients: "rice, bamboo shoot, fermented fish, king chilli, local greens, ginger",
      examples: "momos, thukpa, smoked pork, axone curry, jadoh, bamboo shoot curry",
    },
    "himachal-pradesh": {
      region: "Himachal Pradesh",
      cuisine: "Himachali / Pahari",
      ingredients: "wheat, rice, rajma, madra spice mix, yogurt, ghee",
      examples: "dham, madra, chana madra, siddu, babru, aktori, tudkiya bhath",
    },
    "jammu-kashmir": {
      region: "Jammu & Kashmir",
      cuisine: "Kashmiri",
      ingredients: "rice, saffron, dried fruits, fennel, yogurt, mustard oil, lotus stem",
      examples: "rogan josh, dum aloo, yakhni, haak saag, rajma, modur pulao, kahwa",
    },
    "uttarakhand": {
      region: "Uttarakhand",
      cuisine: "Garhwali / Kumaoni",
      ingredients: "mandua (finger millet), jhangora (barnyard millet), rajma, urad dal, bhatt",
      examples: "kafuli, phaanu, chainsoo, bal mithai, dubuk, bhatt ki churkani",
    },
    "madhya-pradesh": {
      region: "Madhya Pradesh",
      cuisine: "Malwa / Bundelkhandi",
      ingredients: "wheat, gram flour, ghee, jaggery, sev, lentils",
      examples: "poha-jalebi, bhutte ka kees, dal bafla, malpua, chakki ki shaak, mawa bati",
    },
    "chhattisgarh": {
      region: "Chhattisgarh",
      cuisine: "Chhattisgarhi",
      ingredients: "rice, kochai patta, chana dal, mustard oil, tamarind",
      examples: "faraa, muthiya, bore baasi, chila, aamat, angakar roti",
    },
    "other-india": {
      region: "India",
      cuisine: "Indian",
      ingredients: "rice, wheat, lentils, spices, ghee, coconut, vegetables",
      examples: "dal rice, roti sabzi, biryani, dosa, khichdi, paratha, poha, upma",
    },
    "international": {
      region: "International",
      cuisine: "International",
      ingredients: "whole grains, vegetables, legumes, lean proteins, herbs, healthy fats",
      examples: "grain bowls, grilled fish, salads, wraps, pasta, stir-fry, soups, tacos",
    },
  };

  return regionMap[location] || {
    region: "India",
    cuisine: "Indian",
    ingredients: "rice, wheat, lentils, spices, ghee, coconut, vegetables",
    examples: "dal rice, roti sabzi, biryani, dosa, khichdi, paratha, poha, upma",
  };
}

function buildProfileConstraintChecklist(profile: HealthProfile): string {
  const constraints = [
    `- Budget: ${profile.budget}`,
    `- Cooking Preference: ${profile.cookingPreference}`,
    `- Medical Conditions: ${profile.medicalConditions || "None"}`,
  ];

  const dietaryPreference = profile.dietaryPreference.toLowerCase();
  if (dietaryPreference === "vegan") {
    constraints.push("- Hard rule: never include meat, seafood, eggs, dairy, ghee, butter, yogurt, or paneer.");
  } else if (dietaryPreference === "vegetarian") {
    constraints.push("- Hard rule: never include meat, seafood, or eggs.");
  } else if (dietaryPreference === "pescatarian") {
    constraints.push("- Hard rule: never include chicken, mutton, lamb, beef, pork, or eggs.");
  } else if (dietaryPreference === "keto") {
    constraints.push("- Hard rule: keep carbs very low and favor high-protein, high-fat meals.");
  } else if (dietaryPreference === "paleo") {
    constraints.push("- Hard rule: avoid grains, legumes, dairy, and processed ingredients.");
  }

  if (profile.allergies) {
    constraints.push(`- Allergy rule: absolutely avoid ${profile.allergies}.`);
  }

  if (profile.medicalConditions) {
    constraints.push("- Medical rule: adapt meal ingredients and nutrition to the listed medical conditions.");
  }

  if (profile.budget === "budget") {
    constraints.push("- Budget rule: prioritize affordable everyday ingredients and avoid premium items unless essential.");
  }

  if (profile.cookingPreference === "ready-to-eat") {
    constraints.push("- Cooking rule: favor simpler meals with lower prep and cook time.");
  }

  return constraints.join("\n");
}

function createMealRecommendationPrompt(
  profile: HealthProfile,
  bmi: number,
  bmiCategory: string
): string {
  const locationContext = getRegionalCuisineContext(profile.location);
  const preferredCuisine = getPreferredCuisineContext(profile);
  const cuisinePreferenceLabel = profile.cuisinePreference && profile.cuisinePreference !== "local"
    ? `${preferredCuisine.cuisine} cuisine`
    : `local cuisine from ${locationContext.region}`;
  const profileConstraints = buildProfileConstraintChecklist(profile);

  return `Based on the user's health profile, generate 5 personalized meal recommendations.

**User Health Profile:**
- Age: ${profile.age}
- Gender: ${profile.gender}
- Height: ${profile.height} cm
- Weight: ${profile.weight} kg
- BMI: ${bmi} (${bmiCategory})
- Activity Level: ${profile.activityLevel}
- Health Goal: ${profile.healthGoal}
- Dietary Preference: ${profile.dietaryPreference}
- Allergies: ${profile.allergies || "None"}
- Meals Per Day: ${profile.mealsPerDay}
- Budget: ${profile.budget}
- Cooking Preference: ${profile.cookingPreference}
- Medical Conditions: ${profile.medicalConditions || "None"}
- Location: ${locationContext.region}
- Preferred Cuisine: ${cuisinePreferenceLabel}

**Constraint Checklist:**
${profileConstraints}

**Task:**
Generate 5 personalized ${preferredCuisine.cuisine} meal recommendations that align with the user's health goals, dietary preferences, preferred cuisine, and location. Each meal should:
1. Be authentic ${preferredCuisine.cuisine} cuisine (examples: ${preferredCuisine.examples})
2. Use realistic ingredients that are accessible for someone in ${locationContext.region}
3. Match their dietary preference (${profile.dietaryPreference})
4. Support their health goal (${profile.healthGoal})
5. Be appropriate for their activity level (${profile.activityLevel})
6. Respect the stated budget and cooking preference
7. Adapt ingredients or nutrition to listed medical conditions
8. Avoid any mentioned allergies
9. Include realistic nutritional information (calories, protein, carbs, fats, fiber, sugar, sodium in grams/mg)
10. Include exact ingredient quantities in grams or standard measures
11. Include step-by-step cooking instructions
12. Include fun facts and practical tips for each meal

**Response Format (MUST BE VALID JSON):**
{
  "meals": [
    {
      "id": 1,
      "name": "Meal Name",
      "description": "Brief appetizing description mentioning the regional touch",
      "calories": 450,
      "protein": 35,
      "carbs": 40,
      "fats": 15,
      "fiber": 8,
      "sugar": 6,
      "sodium": 480,
      "type": "${profile.dietaryPreference.toLowerCase()}",
      "tags": ["relevant", "tags"],
      "image": "emoji",
      "ingredients": [
        { "name": "Ingredient name", "amount": "150g", "calories": 120 },
        { "name": "Another ingredient", "amount": "2 tbsp", "calories": 60 }
      ],
      "instructions": [
        "Step 1: Prepare ingredients by washing and chopping as needed.",
        "Step 2: Heat oil in a pan and add tempering spices.",
        "Step 3: Add main ingredients and cook on medium heat.",
        "Step 4: Season with salt and finish with garnish.",
        "Step 5: Serve hot with accompaniments."
      ],
      "prepTime": "15 min",
      "cookTime": "25 min",
      "servings": 1,
      "funFacts": [
        "A surprising fact about this dish or its key ingredient.",
        "Another interesting cultural or nutritional fact."
      ],
      "tips": [
        "Eat slowly and chew well to improve digestion.",
        "Pair with warm water or a specific drink to enhance nutrient absorption.",
        "A tip about the best time of day to eat this meal."
      ]
    }
  ],
  "healthTips": [
    "Tip 1 based on their health goal",
    "Tip 2 based on their BMI category",
    "Tip 3 based on regional diet wisdom from ${locationContext.region}"
  ],
  "whyTheseMeals": "2-3 sentence explanation of why these specific meals were chosen, referencing cuisine preference, location, and user constraints",
  "nutritionalFocus": "Brief statement about the nutritional strategy (e.g., 'High protein, moderate carbs for muscle gain')"
}

**Important Guidelines:**
- ALL meals MUST strictly follow the dietary preference and allergy rules
- ALL meals MUST fit ${preferredCuisine.cuisine} cuisine while staying practical for someone in ${locationContext.region}
- Use appropriate emojis for meal images
- Focus on relevant ingredients for ${preferredCuisine.region}: ${preferredCuisine.ingredients}
- Each meal MUST have 5-8 ingredients with exact gram or cup/tbsp/tsp quantities
- Each meal MUST have 4-6 step-by-step cooking instructions (not generic, specific to the dish)
- Each meal MUST have exactly 2 fun facts (historical, cultural, or surprising nutritional facts)
- Each meal MUST have exactly 3 tips (digestion, consumption timing, or absorption tips)
- Calories should align with activity level and health goals
- If goal is weight-loss, keep meals under 450 calories
- If goal is muscle-gain, prioritize protein (>30g per meal)
- If goal is energy, ensure adequate carbs (>50g per meal)
- NEVER include meat, seafood, or eggs for vegetarian users
- NEVER include meat, seafood, eggs, dairy, ghee, butter, or paneer for vegan users
- Avoid any ingredients related to allergies
- Make descriptions appetizing and culturally authentic
- Include a mix of breakfast, lunch, dinner, and snack options where possible`;
}

/**
 * Parse LLM response and extract meal recommendations
 */
function parseLLMResponse(text: string): {
  meals: MealRecommendation[];
  healthTips: string[];
  whyTheseMeals: string;
  nutritionalFocus: string;
} {
  try {
    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();

    // Remove ```json ... ``` or ``` ... ``` wrappers
    const jsonBlockMatch = cleanedText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (jsonBlockMatch) {
      cleanedText = jsonBlockMatch[1].trim();
    }

    // Try to extract JSON object if there's surrounding text
    if (!cleanedText.startsWith("{")) {
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedText = jsonMatch[0];
      }
    }

    const parsed = JSON.parse(cleanedText);

    // Validate the response structure
    if (!parsed.meals || !Array.isArray(parsed.meals)) {
      throw new Error("Invalid response structure: missing meals array");
    }

    // Ensure each meal has required fields with defaults
    const validatedMeals = parsed.meals.slice(0, 5).map((meal: Record<string, unknown>, index: number) => ({
      id: meal.id || index + 1,
      name: meal.name || `Meal ${index + 1}`,
      description: meal.description || "A nutritious meal tailored for you",
      calories: Number(meal.calories) || 400,
      protein: Number(meal.protein) || 20,
      carbs: Number(meal.carbs) || 40,
      fats: Number(meal.fats) || 15,
      fiber: Number(meal.fiber) || 0,
      sugar: Number(meal.sugar) || 0,
      sodium: Number(meal.sodium) || 0,
      type: meal.type || "balanced",
      tags: Array.isArray(meal.tags) ? meal.tags : [],
      image: meal.image || "🍽️",
      ingredients: Array.isArray(meal.ingredients) ? meal.ingredients : [],
      instructions: Array.isArray(meal.instructions) ? meal.instructions : [],
      prepTime: (meal.prepTime as string) || "20 min",
      cookTime: (meal.cookTime as string) || "20 min",
      servings: Number(meal.servings) || 1,
      funFacts: Array.isArray(meal.funFacts) ? meal.funFacts : [],
      tips: Array.isArray(meal.tips) ? meal.tips : [],
    }));

    return {
      meals: validatedMeals,
      healthTips: Array.isArray(parsed.healthTips) ? parsed.healthTips : [],
      whyTheseMeals: parsed.whyTheseMeals || "These meals are tailored to your health profile.",
      nutritionalFocus: parsed.nutritionalFocus || "Balanced nutrition for your goals.",
    };
  } catch (error) {
    console.error("Error parsing LLM response:", error);
    console.error("Raw response text:", text.substring(0, 500));
    throw new Error("Failed to parse LLM response");
  }
}

/**
 * Fallback to rule-based recommendations if LLM fails
 */
function generateFallbackRecommendations(profile: HealthProfile): LLMRecommendationResponse {
  const height = parseFloat(profile.height);
  const weight = parseFloat(profile.weight);
  const bmi = calculateBMI(height, weight);
  const bmiCategory = getBMICategory(bmi);
  const preferredCuisine = getPreferredCuisineContext(profile);

  const meals = fallbackRecommendations(profile);

  return {
    meals,
    insights: {
      bmi,
      bmiCategory,
      healthTips: [
        `Focus on ${profile.healthGoal.replace("-", " ")} with consistent meal planning.`,
        `Your BMI indicates ${bmiCategory.toLowerCase()} - maintain a balanced diet.`,
        `Stay active with ${profile.activityLevel.toLowerCase()} to support your goals.`,
      ],
      whyTheseMeals: `These meals are selected based on your ${profile.dietaryPreference} preference, ${profile.healthGoal.replace("-", " ")} goal, and ${preferredCuisine.cuisine.toLowerCase()} cuisine preference using our proven recommendation engine.`,
      nutritionalFocus: getFallbackNutritionalFocus(profile.healthGoal),
    },
    success: true,
    usedFallback: true,
  };
}

/**
 * Get nutritional focus based on health goal
 */
function getFallbackNutritionalFocus(healthGoal: string): string {
  const focusMap: Record<string, string> = {
    "weight-loss": "Low calorie, high protein for sustainable weight management",
    "muscle-gain": "High protein, moderate carbs for muscle building",
    "energy": "Complex carbs, balanced macros for sustained energy",
    "general-health": "Balanced nutrition for overall wellness",
  };

  return focusMap[healthGoal.toLowerCase()] || "Balanced nutrition for your goals";
}

/**
 * Calculate BMI (Body Mass Index)
 */
function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Get BMI category based on BMI value
 */
function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

/**
 * Validate that API key is configured
 */
export function isLLMConfigured(): boolean {
  return getConfiguredLLMProvider() !== null;
}
