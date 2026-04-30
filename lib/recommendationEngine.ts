export interface MealIngredient {
  name: string;
  amount: string;
  calories?: number;
}

export interface MealRecommendation {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  type: string;
  tags: string[];
  image: string;
  basePrice?: number; // Base price in INR
  actualPrice?: number; // Price adjusted for budget bracket
  ingredients?: MealIngredient[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  funFacts?: string[];
  tips?: string[];
}

export interface HealthProfile {
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  healthGoal: string;
  dietaryPreference: string;
  cuisinePreference?: string;
  allergies: string;
  mealsPerDay: string;
  budget: string;
  cookingPreference: string;
  medicalConditions: string;
  location: string;
}

// Regional meal databases keyed by location code
const regionalMeals: Record<string, MealRecommendation[]> = {
  "tamil-nadu": [
    { id: 101, name: "Sambar Rice", description: "Aromatic lentil stew with tamarind, drumstick, and seasonal veggies over steamed rice", calories: 380, protein: 14, carbs: 62, fats: 8, type: "vegan", tags: ["balanced", "general-health", "lunch", "dinner"], image: "🍛", basePrice: 150 },
    { id: 102, name: "Chettinad Chicken Curry", description: "Fiery Chettinad-style chicken with freshly ground spices and curry leaves", calories: 420, protein: 38, carbs: 12, fats: 24, type: "non-vegetarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🍗", basePrice: 280 },
    { id: 103, name: "Pongal with Coconut Chutney", description: "Creamy rice-lentil comfort dish tempered with black pepper, cumin, and ghee", calories: 350, protein: 12, carbs: 55, fats: 10, type: "vegetarian", tags: ["energy", "breakfast", "general-health"], image: "🍚", basePrice: 140 },
    { id: 104, name: "Kuzhambu with Steamed Rice", description: "Tangy tamarind-based curry with drumstick and brinjal served with hot rice", calories: 360, protein: 10, carbs: 58, fats: 9, type: "vegan", tags: ["balanced", "weight-loss", "lunch", "dinner"], image: "🍛", basePrice: 130 },
    { id: 105, name: "Adai Dosa with Avial", description: "Protein-rich mixed lentil crepe with a medley of vegetables in coconut-yogurt sauce", calories: 320, protein: 16, carbs: 42, fats: 10, type: "vegetarian", tags: ["high-protein", "breakfast", "weight-loss"], image: "🫓", basePrice: 160 },
    { id: 106, name: "Chicken Biryani (Ambur Style)", description: "Fragrant Ambur-style biryani with tender chicken, seeraga samba rice, and dhalcha", calories: 520, protein: 32, carbs: 55, fats: 18, type: "non-vegetarian", tags: ["energy", "muscle-gain", "lunch"], image: "🍚", basePrice: 320 },
    { id: 107, name: "Ragi Koozh", description: "Fermented finger millet porridge — a cooling, probiotic-rich Tamil classic", calories: 220, protein: 8, carbs: 42, fats: 3, type: "vegan", tags: ["weight-loss", "low-calorie", "general-health", "breakfast"], image: "🥣", basePrice: 100 },
  ],
  "kerala": [
    { id: 201, name: "Puttu & Kadala Curry", description: "Steamed rice flour cylinders with spiced black chickpea curry", calories: 380, protein: 15, carbs: 58, fats: 10, type: "vegan", tags: ["energy", "breakfast", "general-health"], image: "🍚", basePrice: 140 },
    { id: 202, name: "Karimeen Pollichathu", description: "Pearl spot fish marinated in spices, wrapped in banana leaf and pan-fried", calories: 350, protein: 35, carbs: 8, fats: 20, type: "pescatarian", tags: ["high-protein", "weight-loss", "dinner"], image: "🐟", basePrice: 320 },
    { id: 203, name: "Avial", description: "Mixed vegetables in coconut-yogurt gravy tempered with curry leaves and coconut oil", calories: 280, protein: 8, carbs: 28, fats: 16, type: "vegetarian", tags: ["weight-loss", "low-calorie", "lunch", "dinner"], image: "🥗", basePrice: 120 },
    { id: 204, name: "Appam & Vegetable Stew", description: "Lacy fermented rice pancake with a fragrant coconut milk vegetable stew", calories: 340, protein: 10, carbs: 48, fats: 12, type: "vegan", tags: ["balanced", "breakfast", "general-health"], image: "🫓", basePrice: 150 },
    { id: 205, name: "Kerala Fish Curry", description: "Tangy red fish curry with kokum and coconut, served with steamed rice", calories: 400, protein: 30, carbs: 40, fats: 14, type: "pescatarian", tags: ["high-protein", "balanced", "lunch", "dinner"], image: "🐟", basePrice: 280 },
    { id: 206, name: "Erissery", description: "Traditional pumpkin and red bean curry with roasted coconut paste", calories: 310, protein: 12, carbs: 38, fats: 12, type: "vegan", tags: ["general-health", "lunch", "dinner"], image: "🍛", basePrice: 130 },
    { id: 207, name: "Mutta Roast with Malabar Parotta", description: "Spicy egg roast with flaky layered Malabar parotta", calories: 480, protein: 20, carbs: 52, fats: 22, type: "non-vegetarian", tags: ["energy", "muscle-gain", "dinner"], image: "🍳", basePrice: 180 },
  ],
  "karnataka": [
    { id: 301, name: "Bisi Bele Bath", description: "Karnataka's spiced rice-lentil dish with vegetables, tamarind, and ghee", calories: 420, protein: 14, carbs: 60, fats: 14, type: "vegetarian", tags: ["energy", "balanced", "lunch"], image: "🍛", basePrice: 160 },
    { id: 302, name: "Ragi Mudde with Saaru", description: "Finger millet ball with a peppery rasam — a wholesome Kannada staple", calories: 300, protein: 10, carbs: 55, fats: 5, type: "vegan", tags: ["weight-loss", "general-health", "lunch", "dinner"], image: "🍚", basePrice: 120 },
    { id: 303, name: "Mysore Masala Dosa", description: "Crispy dosa with red chutney spread and spiced potato filling", calories: 380, protein: 10, carbs: 52, fats: 16, type: "vegan", tags: ["energy", "breakfast"], image: "🫓", basePrice: 140 },
    { id: 304, name: "Neer Dosa with Chicken Sukka", description: "Paper-thin rice crepe paired with dry spiced Mangalorean chicken", calories: 400, protein: 30, carbs: 38, fats: 14, type: "non-vegetarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🍗", basePrice: 260 },
    { id: 305, name: "Akki Rotti with Coconut Chutney", description: "Rice flour flatbread with onion, dill, and fresh coconut chutney", calories: 320, protein: 8, carbs: 48, fats: 12, type: "vegan", tags: ["balanced", "breakfast", "general-health"], image: "🫓", basePrice: 130 },
  ],
  "andhra-pradesh": [
    { id: 401, name: "Pesarattu with Ginger Chutney", description: "Green gram dosa served with spicy ginger chutney — an Andhra breakfast classic", calories: 300, protein: 16, carbs: 40, fats: 8, type: "vegan", tags: ["high-protein", "weight-loss", "breakfast"], image: "🫓" },
    { id: 402, name: "Gutti Vankaya Kura", description: "Stuffed baby eggplant curry with peanut-sesame masala", calories: 280, protein: 8, carbs: 22, fats: 18, type: "vegan", tags: ["weight-loss", "low-calorie", "lunch", "dinner"], image: "🍛" },
    { id: 403, name: "Andhra Chicken Biryani", description: "Fiery Andhra-style dum biryani with aromatic spices and tender chicken", calories: 530, protein: 34, carbs: 55, fats: 18, type: "non-vegetarian", tags: ["energy", "muscle-gain", "lunch"], image: "🍚" },
    { id: 404, name: "Gongura Mutton", description: "Tangy sorrel leaf mutton curry — the pride of Andhra cuisine", calories: 450, protein: 38, carbs: 10, fats: 28, type: "non-vegetarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🍖" },
    { id: 405, name: "Pulihora (Tamarind Rice)", description: "Tangy tamarind rice tempered with peanuts, curry leaves, and dried chillies", calories: 340, protein: 8, carbs: 58, fats: 10, type: "vegan", tags: ["energy", "lunch", "general-health"], image: "🍚" },
  ],
  "telangana": [
    { id: 501, name: "Hyderabadi Dum Biryani", description: "Slow-cooked layered biryani with saffron, mint, and tender meat", calories: 550, protein: 32, carbs: 58, fats: 20, type: "non-vegetarian", tags: ["energy", "muscle-gain", "lunch", "dinner"], image: "🍚" },
    { id: 502, name: "Jonna Rotte with Natu Kodi Pulusu", description: "Jowar flatbread with country chicken curry in tamarind-onion gravy", calories: 420, protein: 30, carbs: 42, fats: 14, type: "non-vegetarian", tags: ["high-protein", "balanced", "dinner"], image: "🫓" },
    { id: 503, name: "Sarva Pindi", description: "Crispy rice flour pancake with peanuts, chana dal, and curry leaves", calories: 280, protein: 10, carbs: 35, fats: 12, type: "vegan", tags: ["weight-loss", "breakfast", "snack"], image: "🫓" },
    { id: 504, name: "Bagara Baingan", description: "Baby eggplants in rich peanut-sesame-coconut gravy", calories: 320, protein: 8, carbs: 22, fats: 22, type: "vegan", tags: ["balanced", "lunch", "dinner"], image: "🍛" },
    { id: 505, name: "Haleem", description: "Slow-cooked wheat, lentil, and meat porridge — Hyderabadi comfort food", calories: 480, protein: 35, carbs: 40, fats: 18, type: "non-vegetarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🥣" },
  ],
  "punjab": [
    { id: 601, name: "Sarson Ka Saag & Makki Roti", description: "Slow-cooked mustard greens with cornmeal flatbread and a dollop of butter", calories: 420, protein: 14, carbs: 48, fats: 20, type: "vegetarian", tags: ["energy", "balanced", "lunch", "dinner"], image: "🫓" },
    { id: 602, name: "Chole Bhature", description: "Spiced chickpea curry with deep-fried fluffy bread — the Punjabi classic", calories: 550, protein: 18, carbs: 65, fats: 24, type: "vegan", tags: ["energy", "high-calorie", "lunch"], image: "🫓" },
    { id: 603, name: "Butter Chicken with Naan", description: "Creamy tomato-butter chicken gravy with soft tandoori naan", calories: 580, protein: 36, carbs: 42, fats: 28, type: "non-vegetarian", tags: ["muscle-gain", "high-protein", "dinner"], image: "🍗" },
    { id: 604, name: "Dal Makhani", description: "Rich slow-cooked black lentils with cream, butter, and aromatic spices", calories: 380, protein: 16, carbs: 42, fats: 16, type: "vegetarian", tags: ["balanced", "general-health", "dinner"], image: "🍛" },
    { id: 605, name: "Tandoori Chicken with Salad", description: "Chargrilled yogurt-marinated chicken with fresh cucumber-onion salad", calories: 350, protein: 42, carbs: 10, fats: 16, type: "non-vegetarian", tags: ["high-protein", "weight-loss", "muscle-gain", "dinner"], image: "🍗" },
  ],
  "delhi": [
    { id: 701, name: "Rajma Chawal", description: "Delhi-style kidney bean curry with steamed basmati rice and a squeeze of lemon", calories: 440, protein: 18, carbs: 62, fats: 12, type: "vegan", tags: ["balanced", "energy", "lunch"], image: "🍛" },
    { id: 702, name: "Paneer Tikka", description: "Smoky tandoor-grilled cottage cheese cubes with mint chutney", calories: 320, protein: 22, carbs: 12, fats: 20, type: "vegetarian", tags: ["high-protein", "weight-loss", "snack", "dinner"], image: "🧀" },
    { id: 703, name: "Chole Kulche", description: "Spiced chickpea curry with soft leavened bread — Delhi street food staple", calories: 480, protein: 16, carbs: 60, fats: 18, type: "vegan", tags: ["energy", "lunch"], image: "🫓" },
    { id: 704, name: "Chicken Seekh Kebab", description: "Minced chicken kebabs grilled on skewers with onion, green chutney and rumali roti", calories: 380, protein: 35, carbs: 22, fats: 16, type: "non-vegetarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🍢" },
    { id: 705, name: "Aloo Paratha with Curd", description: "Stuffed potato flatbread served with yogurt and pickle", calories: 400, protein: 12, carbs: 52, fats: 18, type: "vegetarian", tags: ["energy", "breakfast"], image: "🫓" },
  ],
  "west-bengal": [
    { id: 801, name: "Machher Jhol (Fish Curry)", description: "Light Bengali fish curry with potatoes in a turmeric-mustard gravy", calories: 350, protein: 28, carbs: 30, fats: 12, type: "pescatarian", tags: ["balanced", "high-protein", "lunch", "dinner"], image: "🐟" },
    { id: 802, name: "Luchi with Alur Dom", description: "Deep-fried puffed bread with spiced baby potato curry", calories: 480, protein: 10, carbs: 58, fats: 24, type: "vegan", tags: ["energy", "breakfast"], image: "🫓" },
    { id: 803, name: "Shorshe Ilish", description: "Hilsa fish steamed in a pungent mustard paste — Bengal's signature dish", calories: 320, protein: 30, carbs: 8, fats: 20, type: "pescatarian", tags: ["high-protein", "weight-loss", "dinner"], image: "🐟" },
    { id: 804, name: "Chingri Malai Curry", description: "Prawns cooked in a creamy coconut milk sauce with green chillies", calories: 380, protein: 28, carbs: 12, fats: 26, type: "pescatarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🍤" },
    { id: 805, name: "Moong Dal Khichuri", description: "Bengali-style comfort khichdi with ghee and seasonal vegetables", calories: 360, protein: 14, carbs: 55, fats: 10, type: "vegetarian", tags: ["balanced", "general-health", "lunch"], image: "🍲" },
  ],
  "maharashtra": [
    { id: 901, name: "Misal Pav", description: "Spicy sprouted moth bean curry topped with farsan, served with soft pav", calories: 420, protein: 16, carbs: 52, fats: 16, type: "vegan", tags: ["energy", "breakfast", "lunch"], image: "🍛" },
    { id: 902, name: "Sabudana Khichdi", description: "Tapioca pearls tossed with peanuts, cumin, and fresh coriander", calories: 340, protein: 8, carbs: 55, fats: 12, type: "vegan", tags: ["energy", "breakfast", "general-health"], image: "🍚" },
    { id: 903, name: "Bharli Vangi with Jowar Bhakri", description: "Stuffed baby eggplant with sorghum flatbread — Maharashtrian comfort", calories: 380, protein: 10, carbs: 48, fats: 16, type: "vegan", tags: ["balanced", "lunch", "dinner"], image: "🍛" },
    { id: 904, name: "Kolhapuri Chicken", description: "Fiery Kolhapuri-style chicken in a rich red masala gravy", calories: 450, protein: 36, carbs: 12, fats: 28, type: "non-vegetarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🍗" },
    { id: 905, name: "Poha with Sev", description: "Flattened rice tempered with mustard seeds, turmeric, peanuts, and topped with sev", calories: 280, protein: 8, carbs: 42, fats: 10, type: "vegan", tags: ["weight-loss", "breakfast", "low-calorie"], image: "🍚" },
  ],
  "gujarat": [
    { id: 1001, name: "Dhokla with Green Chutney", description: "Steamed fermented gram flour cake — light, tangy, and protein-rich", calories: 240, protein: 12, carbs: 32, fats: 8, type: "vegan", tags: ["weight-loss", "low-calorie", "breakfast", "snack"], image: "🍰" },
    { id: 1002, name: "Undhiyu", description: "Mixed winter vegetable casserole slow-cooked with fenugreek dumplings", calories: 380, protein: 12, carbs: 42, fats: 18, type: "vegan", tags: ["balanced", "general-health", "lunch", "dinner"], image: "🍛" },
    { id: 1003, name: "Thepla with Curd", description: "Spiced fenugreek flatbread with fresh yogurt — perfect travel food", calories: 320, protein: 10, carbs: 42, fats: 14, type: "vegetarian", tags: ["energy", "breakfast", "balanced"], image: "🫓" },
    { id: 1004, name: "Gujarati Dal-Rice", description: "Sweet-tangy lentil soup with steamed rice, tempered with cumin and curry leaves", calories: 380, protein: 14, carbs: 58, fats: 10, type: "vegan", tags: ["balanced", "lunch", "general-health"], image: "🍛" },
    { id: 1005, name: "Khandvi", description: "Rolled gram flour sheets seasoned with coconut and mustard seeds — a light snack", calories: 180, protein: 10, carbs: 22, fats: 6, type: "vegetarian", tags: ["weight-loss", "low-calorie", "snack"], image: "🥡" },
  ],
  "rajasthan": [
    { id: 1101, name: "Dal Bati Churma", description: "Baked wheat balls with five-lentil dal and sweet crushed wheat — Rajasthani royalty", calories: 580, protein: 18, carbs: 65, fats: 26, type: "vegetarian", tags: ["energy", "high-calorie", "lunch"], image: "🍛" },
    { id: 1102, name: "Gatte Ki Sabzi", description: "Gram flour dumplings in a tangy yogurt-based curry", calories: 340, protein: 14, carbs: 35, fats: 16, type: "vegetarian", tags: ["balanced", "lunch", "dinner"], image: "🍛" },
    { id: 1103, name: "Laal Maas", description: "Fiery red meat curry with Mathania chillies — a Rajput warrior dish", calories: 480, protein: 40, carbs: 10, fats: 30, type: "non-vegetarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🍖" },
    { id: 1104, name: "Bajra Roti with Lehsun Chutney", description: "Pearl millet flatbread with garlic chutney and a side of buttermilk", calories: 300, protein: 10, carbs: 48, fats: 8, type: "vegan", tags: ["weight-loss", "general-health", "lunch", "dinner"], image: "🫓" },
    { id: 1105, name: "Ker Sangri", description: "Desert beans and berries cooked with spices — unique Rajasthani delicacy", calories: 260, protein: 8, carbs: 30, fats: 12, type: "vegan", tags: ["weight-loss", "balanced", "lunch", "dinner"], image: "🌿" },
  ],
};

const regionalMealAliases: Record<string, string[]> = {
  "haryana": ["punjab", "delhi"],
  "himachal-pradesh": ["punjab", "delhi"],
  "jammu-kashmir": ["punjab", "delhi"],
  "uttarakhand": ["delhi", "punjab"],
  "uttar-pradesh": ["delhi", "punjab"],
  "odisha": ["west-bengal"],
  "bihar": ["delhi", "west-bengal"],
  "jharkhand": ["west-bengal", "delhi"],
  "assam": ["west-bengal"],
  "northeast": ["west-bengal"],
  "goa": ["maharashtra", "kerala"],
  "madhya-pradesh": ["rajasthan", "maharashtra"],
  "chhattisgarh": ["maharashtra", "andhra-pradesh"],
  "other-india": ["delhi", "maharashtra", "tamil-nadu"],
  "international": ["delhi", "maharashtra", "kerala"],
};

export const MEAT_KEYWORDS = ["chicken", "mutton", "lamb", "beef", "pork", "bacon", "ham", "turkey"];
export const SEAFOOD_KEYWORDS = ["fish", "salmon", "tuna", "prawn", "shrimp", "crab", "lobster", "hilsa", "rohu"];
export const EGG_KEYWORDS = ["egg", "omelette", "omelet", "mutta"];
export const DAIRY_KEYWORDS = ["paneer", "cheese", "milk", "yogurt", "curd", "ghee", "butter", "cream"];
export const GLUTEN_KEYWORDS = ["naan", "bread", "toast", "pasta", "roti", "wrap", "parotta", "paratha", "kulcha", "bhature"];
export const NUT_KEYWORDS = ["peanut", "almond", "cashew", "walnut", "pista", "hazelnut"];
export const SOY_KEYWORDS = ["soy", "tofu", "soybean"];
export const EXPENSIVE_INGREDIENT_KEYWORDS = ["salmon", "prawn", "lobster", "lamb", "steak", "quinoa", "avocado", "hilsa"];
export const QUICK_MEAL_KEYWORDS = ["salad", "bowl", "toast", "wrap", "parfait", "smoothie", "hummus", "poha", "khichdi"];
export const HEAVY_MEAL_KEYWORDS = ["biryani", "bhature", "parotta", "fried", "butter", "creamy", "steak", "lamb"];
export const HIGH_GLYCEMIC_KEYWORDS = ["bhature", "jalebi", "payasam", "honey", "sweet", "biryani", "pasta", "toast"];

function getPreferredCuisineCode(profile: HealthProfile): string {
  const preferredCuisine = profile.cuisinePreference?.trim();

  if (preferredCuisine && preferredCuisine !== "local") {
    return preferredCuisine;
  }

  return profile.location;
}

export function getRegionalMealPool(profile: HealthProfile): MealRecommendation[] {
  const preferredCode = getPreferredCuisineCode(profile);
  const directMatch = regionalMeals[preferredCode];

  if (directMatch?.length) {
    return directMatch;
  }

  const aliasCodes = regionalMealAliases[preferredCode] || regionalMealAliases[profile.location] || [];
  for (const aliasCode of aliasCodes) {
    const aliasMatch = regionalMeals[aliasCode];
    if (aliasMatch?.length) {
      return aliasMatch;
    }
  }

  return [];
}

function getMealSearchText(meal: MealRecommendation): string {
  const tagText = meal.tags.join(" ");
  const ingredientText = (meal.ingredients || [])
    .map((ingredient) => `${ingredient.name} ${ingredient.amount || ""}`)
    .join(" ");
  const instructionText = (meal.instructions || []).join(" ");

  return `${meal.name} ${meal.description} ${meal.type} ${tagText} ${ingredientText} ${instructionText}`.toLowerCase();
}

function matchesDietaryPreference(meal: MealRecommendation, profile: HealthProfile): boolean {
  const pref = profile.dietaryPreference.toLowerCase();
  const mealText = getMealSearchText(meal);
  const hasEgg = EGG_KEYWORDS.some((keyword) => mealText.includes(keyword));
  const hasSeafood = SEAFOOD_KEYWORDS.some((keyword) => mealText.includes(keyword));
  const hasMeat = MEAT_KEYWORDS.some((keyword) => mealText.includes(keyword));
  const hasDairy = DAIRY_KEYWORDS.some((keyword) => mealText.includes(keyword));

  if (pref === "vegan") {
    return meal.type === "vegan" && !hasEgg && !hasSeafood && !hasMeat && !hasDairy;
  }

  if (pref === "vegetarian") {
    return (meal.type === "vegetarian" || meal.type === "vegan") && !hasEgg && !hasSeafood && !hasMeat;
  }

  if (pref === "pescatarian") {
    return !hasEgg && !hasMeat && (meal.type === "pescatarian" || meal.type === "vegetarian" || meal.type === "vegan" || hasSeafood);
  }

  if (pref === "keto") {
    return meal.tags.includes("keto") || meal.tags.includes("low-carb") || meal.carbs <= 25;
  }

  if (pref === "paleo") {
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

  const mealText = getMealSearchText(meal);

  return !allergyKeywords.some((allergen) =>
    mealText.includes(allergen) ||
    (allergen.includes("dairy") && DAIRY_KEYWORDS.some((keyword) => mealText.includes(keyword))) ||
    (allergen.includes("gluten") && GLUTEN_KEYWORDS.some((keyword) => mealText.includes(keyword))) ||
    (allergen.includes("nut") && NUT_KEYWORDS.some((keyword) => mealText.includes(keyword))) ||
    (allergen.includes("seafood") && SEAFOOD_KEYWORDS.some((keyword) => mealText.includes(keyword))) ||
    (allergen.includes("egg") && EGG_KEYWORDS.some((keyword) => mealText.includes(keyword))) ||
    (allergen.includes("soy") && SOY_KEYWORDS.some((keyword) => mealText.includes(keyword)))
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
  const mealsPerDay = Number.parseInt(profile.mealsPerDay, 10);
  const mealText = getMealSearchText(meal);

  if (regionalMealIds.has(meal.id)) {
    score += 4;
  }

  if (goal === "weight-loss") {
    if (meal.calories <= 450) score += 4;
    if (meal.protein >= 20) score += 2;
    if (meal.tags.includes("weight-loss") || meal.tags.includes("low-calorie")) score += 2;
  } else if (goal === "muscle-gain") {
    if (meal.protein >= 30) score += 4;
    if (meal.calories >= 350) score += 2;
    if (meal.tags.includes("muscle-gain") || meal.tags.includes("high-protein")) score += 2;
  } else if (goal === "energy") {
    if (meal.carbs >= 45) score += 4;
    if (meal.tags.includes("energy")) score += 2;
  } else if (goal === "maintenance") {
    if (meal.calories >= 350 && meal.calories <= 550) score += 3;
    if (meal.tags.includes("balanced")) score += 2;
  } else {
    if (meal.tags.includes("general-health") || meal.tags.includes("balanced")) score += 2;
    if (meal.protein >= 15) score += 1;
  }

  if ((activity.includes("sedentary") || activity.includes("light")) && meal.calories <= 450) {
    score += 2;
  }
  if ((activity.includes("active") || activity.includes("very-active")) && meal.calories >= 350) {
    score += 2;
  }

  if (budget === "budget") {
    if (!EXPENSIVE_INGREDIENT_KEYWORDS.some((keyword) => mealText.includes(keyword))) {
      score += 2;
    }
  } else if (budget === "premium" && EXPENSIVE_INGREDIENT_KEYWORDS.some((keyword) => mealText.includes(keyword))) {
    score += 1;
  }

  if (cookingPreference === "ready-to-eat") {
    if (meal.tags.includes("snack") || meal.tags.includes("breakfast")) score += 1;
    if (QUICK_MEAL_KEYWORDS.some((keyword) => mealText.includes(keyword))) score += 2;
    if (HEAVY_MEAL_KEYWORDS.some((keyword) => mealText.includes(keyword))) score -= 1;
  } else if (cookingPreference === "meal-kits") {
    if (meal.tags.includes("lunch") || meal.tags.includes("dinner")) score += 1;
    if (!meal.tags.includes("snack")) score += 1;
  }

  if (Number.isFinite(mealsPerDay)) {
    if (mealsPerDay >= 5) {
      if (meal.calories <= 400) score += 1;
      if (meal.tags.includes("snack") || meal.tags.includes("breakfast")) score += 1;
    } else if (mealsPerDay <= 3) {
      if (meal.calories >= 350) score += 1;
      if (meal.tags.includes("lunch") || meal.tags.includes("dinner")) score += 1;
    }
  }

  if (medicalConditions.includes("diabetes")) {
    if (meal.carbs <= 45) score += 2;
    if (meal.sugar !== undefined && meal.sugar <= 10) score += 2;
    if (HIGH_GLYCEMIC_KEYWORDS.some((keyword) => mealText.includes(keyword))) score -= 1;
  }
  if (medicalConditions.includes("hypertension") || medicalConditions.includes("high blood pressure")) {
    if (meal.sodium !== undefined && meal.sodium <= 600) score += 2;
    if (!mealText.includes("fried") && !mealText.includes("pickle")) score += 1;
  }
  if (medicalConditions.includes("cholesterol")) {
    if (meal.fats <= 18) score += 2;
    if (!["fried", "butter", "cream", "ghee", "bacon"].some((keyword) => mealText.includes(keyword))) score += 1;
  }

  return score;
}

const mealDatabase: MealRecommendation[] = [
  // ===== HIGH PROTEIN MEALS =====
  {
    id: 1,
    name: "Grilled Chicken Breast with Quinoa",
    description: "Lean protein with complex carbs and mixed vegetables",
    calories: 450,
    protein: 45,
    carbs: 35,
    fats: 12,
    type: "non-vegetarian",
    tags: ["high-protein", "low-fat", "muscle-gain", "lunch", "dinner"],
    image: "🍗",
  },
  {
    id: 2,
    name: "Paneer Tikka with Brown Rice",
    description: "Indian cottage cheese with whole grains and aromatic spices",
    calories: 420,
    protein: 25,
    carbs: 40,
    fats: 15,
    type: "vegetarian",
    tags: ["high-protein", "vegetarian", "muscle-gain", "lunch", "dinner"],
    image: "🧀",
  },
  {
    id: 3,
    name: "Tofu Stir-Fry with Vegetables",
    description: "Plant-based protein with colorful bell peppers and broccoli",
    calories: 350,
    protein: 20,
    carbs: 30,
    fats: 14,
    type: "vegan",
    tags: ["vegan", "low-calorie", "weight-loss", "lunch", "dinner"],
    image: "🥗",
  },
  {
    id: 4,
    name: "Egg White Omelette with Spinach",
    description: "Protein-packed omelette with sautéed spinach and mushrooms",
    calories: 280,
    protein: 30,
    carbs: 8,
    fats: 12,
    type: "non-vegetarian",
    tags: ["high-protein", "low-carb", "weight-loss", "breakfast"],
    image: "🍳",
  },
  {
    id: 5,
    name: "Turkey & Avocado Wrap",
    description: "Lean turkey with avocado, lettuce, and whole wheat wrap",
    calories: 410,
    protein: 35,
    carbs: 32,
    fats: 16,
    type: "non-vegetarian",
    tags: ["high-protein", "balanced", "muscle-gain", "lunch"],
    image: "🌯",
  },

  // ===== WEIGHT LOSS MEALS =====
  {
    id: 6,
    name: "Grilled Salmon with Steamed Broccoli",
    description: "Omega-3 rich fish with nutrient-dense vegetables",
    calories: 380,
    protein: 35,
    carbs: 15,
    fats: 20,
    type: "pescatarian",
    tags: ["low-carb", "weight-loss", "high-protein", "dinner"],
    image: "🐟",
  },
  {
    id: 7,
    name: "Greek Salad with Chickpeas",
    description: "Fresh Mediterranean salad with plant protein and feta",
    calories: 320,
    protein: 15,
    carbs: 28,
    fats: 16,
    type: "vegetarian",
    tags: ["low-calorie", "vegetarian", "weight-loss", "lunch"],
    image: "🥗",
  },
  {
    id: 8,
    name: "Zucchini Noodles with Marinara",
    description: "Low-carb pasta alternative with homemade tomato sauce and basil",
    calories: 180,
    protein: 8,
    carbs: 20,
    fats: 7,
    type: "vegan",
    tags: ["low-carb", "vegan", "weight-loss", "low-calorie", "dinner"],
    image: "🍝",
  },
  {
    id: 9,
    name: "Cauliflower Rice Buddha Bowl",
    description: "Low-carb cauliflower rice with roasted veggies and tahini dressing",
    calories: 290,
    protein: 12,
    carbs: 22,
    fats: 18,
    type: "vegan",
    tags: ["low-carb", "vegan", "weight-loss", "lunch", "dinner"],
    image: "🥙",
  },
  {
    id: 10,
    name: "Grilled Fish Tacos with Slaw",
    description: "Light fish tacos with crunchy cabbage slaw and lime",
    calories: 340,
    protein: 28,
    carbs: 30,
    fats: 12,
    type: "pescatarian",
    tags: ["weight-loss", "balanced", "dinner"],
    image: "🌮",
  },
  {
    id: 11,
    name: "Cucumber & Hummus Plate",
    description: "Fresh cucumber rounds with chickpea hummus and cherry tomatoes",
    calories: 220,
    protein: 10,
    carbs: 25,
    fats: 10,
    type: "vegan",
    tags: ["low-calorie", "weight-loss", "snack", "vegan"],
    image: "🥒",
  },

  // ===== BALANCED / GENERAL HEALTH =====
  {
    id: 12,
    name: "Chicken Burrito Bowl",
    description: "Balanced meal with cilantro-lime rice, black beans, and lean chicken",
    calories: 520,
    protein: 38,
    carbs: 55,
    fats: 15,
    type: "non-vegetarian",
    tags: ["balanced", "general-health", "lunch", "dinner"],
    image: "🥙",
  },
  {
    id: 13,
    name: "Vegetable Khichdi",
    description: "Indian comfort food with lentils, rice, and seasonal vegetables",
    calories: 380,
    protein: 18,
    carbs: 60,
    fats: 8,
    type: "vegetarian",
    tags: ["vegetarian", "comfort-food", "general-health", "lunch", "dinner"],
    image: "🍲",
  },
  {
    id: 14,
    name: "Mediterranean Grain Bowl",
    description: "Farro with roasted vegetables, olives, and lemon herb dressing",
    calories: 430,
    protein: 16,
    carbs: 52,
    fats: 18,
    type: "vegan",
    tags: ["balanced", "general-health", "vegan", "lunch"],
    image: "🥗",
  },
  {
    id: 15,
    name: "Dal Tadka with Roti",
    description: "Yellow lentil curry with whole wheat flatbread and fresh herbs",
    calories: 400,
    protein: 18,
    carbs: 55,
    fats: 12,
    type: "vegan",
    tags: ["balanced", "general-health", "vegan", "lunch", "dinner"],
    image: "🍛",
  },
  {
    id: 16,
    name: "Chicken Tikka Masala with Rice",
    description: "Tender chicken in creamy tomato sauce with basmati rice",
    calories: 550,
    protein: 35,
    carbs: 50,
    fats: 22,
    type: "non-vegetarian",
    tags: ["balanced", "general-health", "dinner"],
    image: "🍛",
  },

  // ===== MUSCLE GAIN =====
  {
    id: 17,
    name: "Beef Steak with Sweet Potato",
    description: "High-quality protein with complex carbs and roasted vegetables",
    calories: 650,
    protein: 50,
    carbs: 45,
    fats: 28,
    type: "non-vegetarian",
    tags: ["high-protein", "muscle-gain", "high-calorie", "dinner"],
    image: "🥩",
  },
  {
    id: 18,
    name: "Peanut Butter Protein Smoothie Bowl",
    description: "Calorie-dense smoothie with banana, oats, and mixed nuts",
    calories: 580,
    protein: 32,
    carbs: 65,
    fats: 22,
    type: "vegetarian",
    tags: ["high-calorie", "muscle-gain", "energy", "breakfast"],
    image: "🥣",
  },
  {
    id: 19,
    name: "Grilled Chicken & Rice Bowl",
    description: "Classic bodybuilding meal with seasoned chicken and jasmine rice",
    calories: 600,
    protein: 48,
    carbs: 58,
    fats: 16,
    type: "non-vegetarian",
    tags: ["high-protein", "muscle-gain", "lunch", "dinner"],
    image: "🍗",
  },
  {
    id: 20,
    name: "Cottage Cheese & Fruit Bowl",
    description: "High-protein cottage cheese with mixed berries and honey drizzle",
    calories: 350,
    protein: 28,
    carbs: 35,
    fats: 10,
    type: "vegetarian",
    tags: ["high-protein", "muscle-gain", "breakfast", "snack"],
    image: "🫐",
  },
  {
    id: 21,
    name: "Lentil & Chickpea Power Bowl",
    description: "Protein-packed legume bowl with quinoa and roasted veggies",
    calories: 480,
    protein: 26,
    carbs: 62,
    fats: 14,
    type: "vegan",
    tags: ["high-protein", "muscle-gain", "vegan", "lunch"],
    image: "🥣",
  },

  // ===== ENERGY BOOSTING =====
  {
    id: 22,
    name: "Oatmeal with Berries and Almonds",
    description: "Sustained energy with fiber, antioxidants and healthy fats",
    calories: 420,
    protein: 15,
    carbs: 58,
    fats: 14,
    type: "vegan",
    tags: ["energy", "breakfast", "vegan"],
    image: "🥣",
  },
  {
    id: 23,
    name: "Whole Grain Pasta with Vegetables",
    description: "Complex carbs with roasted seasonal vegetables and olive oil",
    calories: 480,
    protein: 18,
    carbs: 72,
    fats: 12,
    type: "vegan",
    tags: ["energy", "vegan", "lunch", "dinner"],
    image: "🍝",
  },
  {
    id: 24,
    name: "Banana Almond Butter Toast",
    description: "Whole grain toast with almond butter, banana slices, and chia seeds",
    calories: 380,
    protein: 12,
    carbs: 52,
    fats: 16,
    type: "vegan",
    tags: ["energy", "breakfast", "vegan"],
    image: "🍞",
  },
  {
    id: 25,
    name: "Sweet Potato & Black Bean Burrito",
    description: "Energy-dense burrito with roasted sweet potato and spiced black beans",
    calories: 500,
    protein: 18,
    carbs: 68,
    fats: 16,
    type: "vegan",
    tags: ["energy", "vegan", "lunch"],
    image: "🌯",
  },
  {
    id: 26,
    name: "Fruit & Nut Trail Mix Bowl",
    description: "Mixed dried fruits, nuts, and seeds for quick sustained energy",
    calories: 350,
    protein: 10,
    carbs: 45,
    fats: 18,
    type: "vegan",
    tags: ["energy", "snack", "vegan"],
    image: "🥜",
  },

  // ===== KETO / LOW CARB =====
  {
    id: 27,
    name: "Bacon & Cheese Stuffed Avocado",
    description: "Creamy avocado filled with crispy bacon and melted cheese",
    calories: 420,
    protein: 22,
    carbs: 8,
    fats: 35,
    type: "non-vegetarian",
    tags: ["keto", "low-carb", "breakfast", "lunch"],
    image: "🥑",
  },
  {
    id: 28,
    name: "Butter Chicken Lettuce Wraps",
    description: "Rich butter chicken served in crisp lettuce cups instead of naan",
    calories: 380,
    protein: 32,
    carbs: 10,
    fats: 24,
    type: "non-vegetarian",
    tags: ["keto", "low-carb", "dinner"],
    image: "🥬",
  },
  {
    id: 29,
    name: "Paneer Bhurji (Scrambled Paneer)",
    description: "Spiced scrambled cottage cheese with onions, tomatoes, and peppers",
    calories: 340,
    protein: 22,
    carbs: 12,
    fats: 24,
    type: "vegetarian",
    tags: ["keto", "low-carb", "breakfast", "vegetarian"],
    image: "🧀",
  },
  {
    id: 30,
    name: "Coconut Curry Shrimp",
    description: "Creamy coconut curry with tiger shrimp and spinach",
    calories: 360,
    protein: 30,
    carbs: 14,
    fats: 22,
    type: "pescatarian",
    tags: ["keto", "low-carb", "dinner", "pescatarian"],
    image: "🍤",
  },

  // ===== PALEO =====
  {
    id: 31,
    name: "Herb-Crusted Baked Salmon",
    description: "Wild salmon with a fresh herb crust, served with roasted asparagus",
    calories: 420,
    protein: 38,
    carbs: 12,
    fats: 26,
    type: "pescatarian",
    tags: ["paleo", "high-protein", "dinner"],
    image: "🐟",
  },
  {
    id: 32,
    name: "Grilled Lamb Chops with Mint Chutney",
    description: "Tender lamb chops with fresh mint chutney and roasted vegetables",
    calories: 520,
    protein: 42,
    carbs: 15,
    fats: 32,
    type: "non-vegetarian",
    tags: ["paleo", "high-protein", "muscle-gain", "dinner"],
    image: "🍖",
  },

  // ===== INDIAN CUISINE =====
  {
    id: 33,
    name: "Rajma Chawal (Kidney Bean Curry with Rice)",
    description: "Hearty kidney bean curry simmered in spiced tomato gravy with rice",
    calories: 450,
    protein: 18,
    carbs: 65,
    fats: 12,
    type: "vegan",
    tags: ["balanced", "general-health", "energy", "lunch", "dinner"],
    image: "🍛",
  },
  {
    id: 34,
    name: "Palak Paneer with Jeera Rice",
    description: "Creamy spinach curry with cottage cheese and cumin-flavored rice",
    calories: 460,
    protein: 22,
    carbs: 45,
    fats: 20,
    type: "vegetarian",
    tags: ["balanced", "general-health", "vegetarian", "lunch", "dinner"],
    image: "🍛",
  },
  {
    id: 35,
    name: "Chole Bhature",
    description: "Spicy chickpea curry with crispy fried bread — a North Indian classic",
    calories: 580,
    protein: 16,
    carbs: 70,
    fats: 26,
    type: "vegan",
    tags: ["energy", "high-calorie", "lunch"],
    image: "🫓",
  },
  {
    id: 36,
    name: "Idli Sambar",
    description: "Steamed rice cakes with lentil vegetable stew and coconut chutney",
    calories: 300,
    protein: 12,
    carbs: 52,
    fats: 5,
    type: "vegan",
    tags: ["low-fat", "weight-loss", "breakfast", "vegan"],
    image: "🍚",
  },
  {
    id: 37,
    name: "Masala Dosa with Chutney",
    description: "Crispy rice and lentil crepe with spiced potato filling",
    calories: 370,
    protein: 10,
    carbs: 55,
    fats: 14,
    type: "vegan",
    tags: ["energy", "breakfast", "vegan"],
    image: "🫓",
  },

  // ===== BREAKFAST =====
  {
    id: 38,
    name: "Greek Yogurt Parfait",
    description: "Layered greek yogurt with granola, honey, and fresh fruits",
    calories: 340,
    protein: 20,
    carbs: 42,
    fats: 10,
    type: "vegetarian",
    tags: ["balanced", "breakfast", "general-health"],
    image: "🍨",
  },
  {
    id: 39,
    name: "Avocado Toast with Poached Eggs",
    description: "Whole grain toast with smashed avocado and perfectly poached eggs",
    calories: 380,
    protein: 18,
    carbs: 30,
    fats: 22,
    type: "non-vegetarian",
    tags: ["balanced", "breakfast", "energy"],
    image: "🥑",
  },

  // ===== SNACKS =====
  {
    id: 40,
    name: "Protein Energy Balls",
    description: "No-bake balls with oats, protein powder, peanut butter, and dark chocolate",
    calories: 200,
    protein: 12,
    carbs: 22,
    fats: 8,
    type: "vegetarian",
    tags: ["snack", "energy", "muscle-gain"],
    image: "🍫",
  },
];

export function generateRecommendations(profile: HealthProfile): MealRecommendation[] {
  // Build the meal pool: regional meals first, then general database as supplement
  const regional = getRegionalMealPool(profile);
  const regionalMealIds = new Set(regional.map((meal) => meal.id));
  const combinedPool = [...regional, ...mealDatabase];
  const compatibleMeals = combinedPool
    .filter((meal) => matchesDietaryPreference(meal, profile))
    .filter((meal) => matchesAllergyConstraints(meal, profile))
    .sort((a, b) => scoreMealForProfile(b, profile, regionalMealIds) - scoreMealForProfile(a, profile, regionalMealIds));

  const uniqueMeals = compatibleMeals.filter((meal, index, meals) =>
    meals.findIndex((candidate) => candidate.name.toLowerCase() === meal.name.toLowerCase()) === index
  );

  let finalMeals: MealRecommendation[];
  if (uniqueMeals.length >= 5) {
    finalMeals = uniqueMeals.slice(0, 5);
  } else {
    finalMeals = compatibleMeals.slice(0, 5);
  }

  // Apply pricing based on budget bracket
  return finalMeals.map((meal) => {
    const basePrice = generateBasePriceForMeal(meal);
    const actualPrice = calculateMealPrice(basePrice, profile.budget);
    return {
      ...meal,
      basePrice,
      actualPrice: actualPrice,
    } as any;
  });
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

/**
 * Calculate the actual price of a meal based on budget bracket
 * Budget multipliers:
 * - "budget": 0.8x (20% discount)
 * - "moderate": 1.0x (base price)
 * - "premium": 1.3x (30% premium)
 */
export function calculateMealPrice(basePrice: number | undefined, budget: string): number {
  if (!basePrice || basePrice <= 0) return 0;

  const budgetMultipliers: Record<string, number> = {
    budget: 0.8,
    moderate: 1.0,
    premium: 1.3,
  };

  const multiplier = budgetMultipliers[budget.toLowerCase()] || 1.0;
  return Math.round(basePrice * multiplier);
}

/**
 * Generate a base price for a meal based on its characteristics
 * Pricing strategy:
 * - Simple vegan/vegetarian meals: ₹140-180
 * - Non-vegetarian meals: ₹200-280
 * - Premium/specialty meals: ₹280-350
 */
export function generateBasePriceForMeal(meal: MealRecommendation): number {
  // If meal already has a price, use it
  if (meal.basePrice && meal.basePrice > 0) {
    return meal.basePrice;
  }

  let basePrice = 150; // Default price

  // Adjust based on protein content (premium ingredient indicator)
  if (meal.protein >= 35) {
    basePrice += 80; // High protein meals are pricier
  } else if (meal.protein >= 25) {
    basePrice += 50;
  }

  // Adjust based on meal type
  if (meal.type === "non-vegetarian" || meal.type === "pescatarian") {
    basePrice += 40;
  }

  // Adjust based on calories (higher calories = more ingredients)
  if (meal.calories >= 500) {
    basePrice += 30;
  } else if (meal.calories >= 400) {
    basePrice += 15;
  }

  // Premium for specialty/regional meals
  if (meal.tags.includes("specialty") || meal.tags.includes("regional")) {
    basePrice += 20;
  }

  // Check for premium ingredients in the name or description
  const description = (meal.name + " " + meal.description).toLowerCase();
  const premiumIngredients = ["salmon", "prawn", "lobster", "lamb", "biryani", "quinoa", "avocado"];
  if (premiumIngredients.some((ingredient) => description.includes(ingredient))) {
    basePrice += 60;
  }

  return Math.max(100, Math.min(basePrice, 380)); // Cap between 100-380
}
