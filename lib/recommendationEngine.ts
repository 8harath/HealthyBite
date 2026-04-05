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
    { id: 101, name: "Sambar Rice", description: "Aromatic lentil stew with tamarind, drumstick, and seasonal veggies over steamed rice", calories: 380, protein: 14, carbs: 62, fats: 8, type: "vegan", tags: ["balanced", "general-health", "lunch", "dinner"], image: "🍛" },
    { id: 102, name: "Chettinad Chicken Curry", description: "Fiery Chettinad-style chicken with freshly ground spices and curry leaves", calories: 420, protein: 38, carbs: 12, fats: 24, type: "non-vegetarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🍗" },
    { id: 103, name: "Pongal with Coconut Chutney", description: "Creamy rice-lentil comfort dish tempered with black pepper, cumin, and ghee", calories: 350, protein: 12, carbs: 55, fats: 10, type: "vegetarian", tags: ["energy", "breakfast", "general-health"], image: "🍚" },
    { id: 104, name: "Kuzhambu with Steamed Rice", description: "Tangy tamarind-based curry with drumstick and brinjal served with hot rice", calories: 360, protein: 10, carbs: 58, fats: 9, type: "vegan", tags: ["balanced", "weight-loss", "lunch", "dinner"], image: "🍛" },
    { id: 105, name: "Adai Dosa with Avial", description: "Protein-rich mixed lentil crepe with a medley of vegetables in coconut-yogurt sauce", calories: 320, protein: 16, carbs: 42, fats: 10, type: "vegetarian", tags: ["high-protein", "breakfast", "weight-loss"], image: "🫓" },
    { id: 106, name: "Chicken Biryani (Ambur Style)", description: "Fragrant Ambur-style biryani with tender chicken, seeraga samba rice, and dhalcha", calories: 520, protein: 32, carbs: 55, fats: 18, type: "non-vegetarian", tags: ["energy", "muscle-gain", "lunch"], image: "🍚" },
    { id: 107, name: "Ragi Koozh", description: "Fermented finger millet porridge — a cooling, probiotic-rich Tamil classic", calories: 220, protein: 8, carbs: 42, fats: 3, type: "vegan", tags: ["weight-loss", "low-calorie", "general-health", "breakfast"], image: "🥣" },
  ],
  "kerala": [
    { id: 201, name: "Puttu & Kadala Curry", description: "Steamed rice flour cylinders with spiced black chickpea curry", calories: 380, protein: 15, carbs: 58, fats: 10, type: "vegan", tags: ["energy", "breakfast", "general-health"], image: "🍚" },
    { id: 202, name: "Karimeen Pollichathu", description: "Pearl spot fish marinated in spices, wrapped in banana leaf and pan-fried", calories: 350, protein: 35, carbs: 8, fats: 20, type: "pescatarian", tags: ["high-protein", "weight-loss", "dinner"], image: "🐟" },
    { id: 203, name: "Avial", description: "Mixed vegetables in coconut-yogurt gravy tempered with curry leaves and coconut oil", calories: 280, protein: 8, carbs: 28, fats: 16, type: "vegetarian", tags: ["weight-loss", "low-calorie", "lunch", "dinner"], image: "🥗" },
    { id: 204, name: "Appam & Vegetable Stew", description: "Lacy fermented rice pancake with a fragrant coconut milk vegetable stew", calories: 340, protein: 10, carbs: 48, fats: 12, type: "vegan", tags: ["balanced", "breakfast", "general-health"], image: "🫓" },
    { id: 205, name: "Kerala Fish Curry", description: "Tangy red fish curry with kokum and coconut, served with steamed rice", calories: 400, protein: 30, carbs: 40, fats: 14, type: "pescatarian", tags: ["high-protein", "balanced", "lunch", "dinner"], image: "🐟" },
    { id: 206, name: "Erissery", description: "Traditional pumpkin and red bean curry with roasted coconut paste", calories: 310, protein: 12, carbs: 38, fats: 12, type: "vegan", tags: ["general-health", "lunch", "dinner"], image: "🍛" },
    { id: 207, name: "Mutta Roast with Malabar Parotta", description: "Spicy egg roast with flaky layered Malabar parotta", calories: 480, protein: 20, carbs: 52, fats: 22, type: "vegetarian", tags: ["energy", "muscle-gain", "dinner"], image: "🍳" },
  ],
  "karnataka": [
    { id: 301, name: "Bisi Bele Bath", description: "Karnataka's spiced rice-lentil dish with vegetables, tamarind, and ghee", calories: 420, protein: 14, carbs: 60, fats: 14, type: "vegetarian", tags: ["energy", "balanced", "lunch"], image: "🍛" },
    { id: 302, name: "Ragi Mudde with Saaru", description: "Finger millet ball with a peppery rasam — a wholesome Kannada staple", calories: 300, protein: 10, carbs: 55, fats: 5, type: "vegan", tags: ["weight-loss", "general-health", "lunch", "dinner"], image: "🍚" },
    { id: 303, name: "Mysore Masala Dosa", description: "Crispy dosa with red chutney spread and spiced potato filling", calories: 380, protein: 10, carbs: 52, fats: 16, type: "vegan", tags: ["energy", "breakfast"], image: "🫓" },
    { id: 304, name: "Neer Dosa with Chicken Sukka", description: "Paper-thin rice crepe paired with dry spiced Mangalorean chicken", calories: 400, protein: 30, carbs: 38, fats: 14, type: "non-vegetarian", tags: ["high-protein", "muscle-gain", "dinner"], image: "🍗" },
    { id: 305, name: "Akki Rotti with Coconut Chutney", description: "Rice flour flatbread with onion, dill, and fresh coconut chutney", calories: 320, protein: 8, carbs: 48, fats: 12, type: "vegan", tags: ["balanced", "breakfast", "general-health"], image: "🫓" },
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
    type: "vegetarian",
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
    type: "vegetarian",
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
  let recommendations: MealRecommendation[] = [];

  // Build the meal pool: regional meals first, then general database as supplement
  const regional = regionalMeals[profile.location] || [];
  const combinedPool = [...regional, ...mealDatabase];

  // Filter by dietary preference
  let filteredMeals = combinedPool.filter((meal) => {
    const pref = profile.dietaryPreference.toLowerCase();

    if (pref === "vegan") return meal.type === "vegan";
    if (pref === "vegetarian") return meal.type === "vegetarian" || meal.type === "vegan";
    if (pref === "pescatarian") return meal.type === "pescatarian" || meal.type === "vegetarian" || meal.type === "vegan";
    if (pref === "keto") return meal.tags.includes("keto") || meal.tags.includes("low-carb");
    if (pref === "paleo") return meal.tags.includes("paleo") || (meal.carbs < 30 && meal.protein > 20);
    if (pref === "non-vegetarian") return true; // All meals allowed

    return true; // No preference
  });

  // Filter by health goal
  const goal = profile.healthGoal.toLowerCase();
  const goalFilteredMeals = filteredMeals.filter((meal) => {
    if (goal === "weight-loss") {
      return meal.calories < 400 || meal.tags.includes("weight-loss");
    }
    if (goal === "muscle-gain") {
      return meal.protein > 25 || meal.tags.includes("muscle-gain");
    }
    if (goal === "energy") {
      return meal.tags.includes("energy") || meal.carbs > 50;
    }
    if (goal === "maintenance") {
      return meal.calories >= 350 && meal.calories <= 550;
    }
    return true; // General health - all meals OK
  });

  // Use goal-filtered meals if enough results, otherwise use diet-filtered
  if (goalFilteredMeals.length >= 3) {
    filteredMeals = goalFilteredMeals;
  }

  // Filter by activity level (adjust calorie range)
  const activity = profile.activityLevel.toLowerCase();
  if (activity.includes("sedentary") || activity.includes("light")) {
    const activityFiltered = filteredMeals.filter((meal) => meal.calories < 500);
    if (activityFiltered.length >= 3) filteredMeals = activityFiltered;
  } else if (activity.includes("very-active")) {
    const activityFiltered = filteredMeals.filter((meal) => meal.calories > 350);
    if (activityFiltered.length >= 3) filteredMeals = activityFiltered;
  }

  // Remove meals with allergens
  if (profile.allergies) {
    const allergyKeywords = profile.allergies.toLowerCase().split(",").map(a => a.trim()).filter(a => a.length > 0);
    if (allergyKeywords.length > 0) {
      filteredMeals = filteredMeals.filter((meal) => {
        const mealLower = `${meal.name} ${meal.description}`.toLowerCase();
        return !allergyKeywords.some(allergen =>
          mealLower.includes(allergen) ||
          (allergen.includes("dairy") && (mealLower.includes("cheese") || mealLower.includes("paneer") || mealLower.includes("yogurt") || mealLower.includes("butter"))) ||
          (allergen.includes("gluten") && (mealLower.includes("pasta") || mealLower.includes("bread") || mealLower.includes("toast") || mealLower.includes("roti") || mealLower.includes("naan") || mealLower.includes("wrap"))) ||
          (allergen.includes("nut") && (mealLower.includes("peanut") || mealLower.includes("almond") || mealLower.includes("cashew"))) ||
          (allergen.includes("seafood") && (mealLower.includes("shrimp") || mealLower.includes("salmon") || mealLower.includes("fish"))) ||
          (allergen.includes("egg") && mealLower.includes("egg")) ||
          (allergen.includes("soy") && mealLower.includes("tofu"))
        );
      });
    }
  }

  // Sort by relevance (prioritize meals that match goal)
  filteredMeals.sort((a, b) => {
    let aScore = 0;
    let bScore = 0;

    // Goal match
    if (a.tags.includes(goal)) aScore += 3;
    if (b.tags.includes(goal)) bScore += 3;

    // Dietary preference match in tags
    const pref = profile.dietaryPreference.toLowerCase();
    if (a.tags.includes(pref)) aScore += 2;
    if (b.tags.includes(pref)) bScore += 2;

    // Activity level alignment
    if (activity.includes("very-active") || activity.includes("active")) {
      if (a.calories > 400) aScore += 1;
      if (b.calories > 400) bScore += 1;
    } else if (activity.includes("sedentary")) {
      if (a.calories < 400) aScore += 1;
      if (b.calories < 400) bScore += 1;
    }

    return bScore - aScore;
  });

  // Return top 5 recommendations
  recommendations = filteredMeals.slice(0, 5);

  // If we don't have enough recommendations, add more from filtered pool
  if (recommendations.length < 5) {
    const existing = new Set(recommendations.map(m => m.id));
    const allergyKeywords = (profile.allergies || "").toLowerCase().split(",").map(a => a.trim()).filter(a => a.length > 0);
    const extra = combinedPool
      .filter(m => !existing.has(m.id))
      .filter(m => {
        if (allergyKeywords.length === 0) return true;
        const mealLower = `${m.name} ${m.description}`.toLowerCase();
        return !allergyKeywords.some(allergen =>
          mealLower.includes(allergen) ||
          (allergen.includes("dairy") && (mealLower.includes("cheese") || mealLower.includes("paneer") || mealLower.includes("yogurt") || mealLower.includes("butter") || mealLower.includes("milk"))) ||
          (allergen.includes("gluten") && (mealLower.includes("pasta") || mealLower.includes("bread") || mealLower.includes("toast") || mealLower.includes("roti") || mealLower.includes("naan") || mealLower.includes("wrap"))) ||
          (allergen.includes("nut") && (mealLower.includes("peanut") || mealLower.includes("almond") || mealLower.includes("cashew"))) ||
          (allergen.includes("seafood") && (mealLower.includes("shrimp") || mealLower.includes("salmon") || mealLower.includes("fish"))) ||
          (allergen.includes("egg") && mealLower.includes("egg")) ||
          (allergen.includes("soy") && mealLower.includes("tofu"))
        );
      })
      .slice(0, 5 - recommendations.length);
    recommendations = [...recommendations, ...extra];
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
