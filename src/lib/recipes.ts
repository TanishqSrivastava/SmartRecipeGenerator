export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten_free' | 'dairy_free' | 'nut_free' | 'keto' | 'halal' | 'kosher';

export type Recipe = {
	id: string;
	name: string;
	cuisine: string;
	difficulty: 'easy' | 'medium' | 'hard';
	cookingTimeMinutes: number;
	servings: number;
	dietary: DietaryTag[];
	ingredients: { name: string; quantity: number; unit: string; optional?: boolean; substitutions?: string[] }[];
	steps: string[];
	nutrition: { calories: number; protein: number; carbs: number; fat: number };
};

export const RECIPES: Recipe[] = [
	{
		id: 'margherita-pizza',
		name: 'Margherita Pizza',
		cuisine: 'Italian',
		difficulty: 'medium',
		cookingTimeMinutes: 30,
		servings: 2,
		dietary: ['vegetarian'],
		ingredients: [
			{ name: 'pizza dough', quantity: 1, unit: 'base' },
			{ name: 'tomato sauce', quantity: 200, unit: 'g' },
			{ name: 'mozzarella', quantity: 150, unit: 'g', substitutions: ['cheddar', 'paneer'] },
			{ name: 'basil', quantity: 5, unit: 'g', optional: true },
		],
		steps: [
			'Preheat oven to 250°C (480°F).',
			'Spread tomato sauce over dough.',
			'Top with sliced mozzarella and basil.',
			'Bake 10-12 minutes until cheese melts and crust is golden.',
		],
		nutrition: { calories: 600, protein: 22, carbs: 70, fat: 24 },
	},
	{
		id: 'chickpea-curry',
		name: 'Chickpea Curry',
		cuisine: 'Indian',
		difficulty: 'easy',
		cookingTimeMinutes: 25,
		servings: 4,
		dietary: ['vegan', 'gluten_free'],
		ingredients: [
			{ name: 'chickpeas', quantity: 400, unit: 'g' },
			{ name: 'onion', quantity: 1, unit: 'pc' },
			{ name: 'garlic', quantity: 3, unit: 'clove' },
			{ name: 'tomato', quantity: 2, unit: 'pc', substitutions: ['canned tomatoes'] },
			{ name: 'coconut milk', quantity: 200, unit: 'ml', substitutions: ['cream'] },
			{ name: 'curry powder', quantity: 2, unit: 'tbsp' },
		],
		steps: [
			'Sauté chopped onion and garlic until translucent.',
			'Add curry powder and toast.',
			'Stir in tomatoes, chickpeas, and coconut milk; simmer 15 minutes.',
		],
		nutrition: { calories: 420, protein: 14, carbs: 50, fat: 16 },
	},
	{
		id: 'grilled-chicken-salad',
		name: 'Grilled Chicken Salad',
		cuisine: 'American',
		difficulty: 'easy',
		cookingTimeMinutes: 20,
		servings: 2,
		dietary: ['gluten_free'],
		ingredients: [
			{ name: 'chicken breast', quantity: 2, unit: 'pc', substitutions: ['tofu'] },
			{ name: 'lettuce', quantity: 200, unit: 'g' },
			{ name: 'tomato', quantity: 1, unit: 'pc' },
			{ name: 'cucumber', quantity: 1, unit: 'pc' },
			{ name: 'olive oil', quantity: 1, unit: 'tbsp' },
		],
		steps: [
			'Grill seasoned chicken until cooked through; slice.',
			'Toss vegetables with olive oil.',
			'Top salad with sliced chicken.',
		],
		nutrition: { calories: 350, protein: 38, carbs: 10, fat: 16 },
	},
	// ... add many more recipes to reach 20+ ...
	{
		id: 'veg-fried-rice',
		name: 'Vegetable Fried Rice',
		cuisine: 'Chinese',
		difficulty: 'easy',
		cookingTimeMinutes: 20,
		servings: 3,
		dietary: ['vegetarian'],
		ingredients: [
			{ name: 'rice', quantity: 300, unit: 'g' },
			{ name: 'egg', quantity: 2, unit: 'pc', optional: true, substitutions: ['tofu'] },
			{ name: 'carrot', quantity: 1, unit: 'pc' },
			{ name: 'peas', quantity: 100, unit: 'g' },
			{ name: 'soy sauce', quantity: 2, unit: 'tbsp' },
		],
		steps: [
			'Stir-fry vegetables, scramble egg, add rice and soy sauce; combine.',
		],
		nutrition: { calories: 520, protein: 16, carbs: 85, fat: 12 },
	},
	{
		id: 'pancakes',
		name: 'Fluffy Pancakes',
		cuisine: 'American',
		difficulty: 'easy',
		cookingTimeMinutes: 15,
		servings: 4,
		dietary: [],
		ingredients: [
			{ name: 'flour', quantity: 200, unit: 'g', substitutions: ['gluten-free flour'] },
			{ name: 'milk', quantity: 250, unit: 'ml', substitutions: ['almond milk'] },
			{ name: 'egg', quantity: 2, unit: 'pc' },
			{ name: 'baking powder', quantity: 2, unit: 'tsp' },
			{ name: 'sugar', quantity: 2, unit: 'tbsp' },
		],
		steps: [
			'Mix dry and wet ingredients; cook ladles on a griddle until bubbly then flip.',
		],
		nutrition: { calories: 450, protein: 12, carbs: 70, fat: 12 },
	},
	{
		id: 'quinoa-salad',
		name: 'Quinoa Salad',
		cuisine: 'Mediterranean',
		difficulty: 'easy',
		cookingTimeMinutes: 25,
		servings: 3,
		dietary: ['vegan', 'gluten_free'],
		ingredients: [
			{ name: 'quinoa', quantity: 200, unit: 'g' },
			{ name: 'cucumber', quantity: 1, unit: 'pc' },
			{ name: 'tomato', quantity: 2, unit: 'pc' },
			{ name: 'olive oil', quantity: 2, unit: 'tbsp' },
			{ name: 'lemon', quantity: 1, unit: 'pc' },
		],
		steps: [
			'Cook quinoa; toss with chopped vegetables, olive oil, and lemon juice.',
		],
		nutrition: { calories: 380, protein: 12, carbs: 54, fat: 12 },
	},
	{
		id: 'beef-tacos',
		name: 'Beef Tacos',
		cuisine: 'Mexican',
		difficulty: 'easy',
		cookingTimeMinutes: 20,
		servings: 4,
		dietary: [],
		ingredients: [
			{ name: 'tortillas', quantity: 8, unit: 'pc', substitutions: ['lettuce leaves'] },
			{ name: 'ground beef', quantity: 400, unit: 'g', substitutions: ['black beans'] },
			{ name: 'onion', quantity: 1, unit: 'pc' },
			{ name: 'tomato', quantity: 1, unit: 'pc' },
			{ name: 'cheese', quantity: 100, unit: 'g' },
		],
		steps: [
			'Brown beef with onion; assemble tacos with toppings.',
		],
		nutrition: { calories: 520, protein: 28, carbs: 45, fat: 24 },
	},
	{
		id: 'lentil-soup',
		name: 'Lentil Soup',
		cuisine: 'Middle Eastern',
		difficulty: 'easy',
		cookingTimeMinutes: 35,
		servings: 4,
		dietary: ['vegan', 'gluten_free'],
		ingredients: [
			{ name: 'lentils', quantity: 300, unit: 'g' },
			{ name: 'carrot', quantity: 1, unit: 'pc' },
			{ name: 'celery', quantity: 1, unit: 'pc' },
			{ name: 'onion', quantity: 1, unit: 'pc' },
			{ name: 'vegetable stock', quantity: 1, unit: 'l' },
		],
		steps: [
			'Simmer lentils with chopped vegetables and stock until tender.',
		],
		nutrition: { calories: 320, protein: 18, carbs: 48, fat: 4 },
	},
	{
		id: 'salmon-teriyaki',
		name: 'Teriyaki Salmon',
		cuisine: 'Japanese',
		difficulty: 'medium',
		cookingTimeMinutes: 25,
		servings: 2,
		dietary: ['gluten_free'],
		ingredients: [
			{ name: 'salmon', quantity: 2, unit: 'fillet' },
			{ name: 'soy sauce', quantity: 3, unit: 'tbsp' },
			{ name: 'mirin', quantity: 2, unit: 'tbsp' },
			{ name: 'sugar', quantity: 1, unit: 'tbsp' },
		],
		steps: [
			'Simmer sauce; pan-sear salmon and glaze with teriyaki.',
		],
		nutrition: { calories: 420, protein: 34, carbs: 12, fat: 24 },
	},
	{
		id: 'caprese-salad',
		name: 'Caprese Salad',
		cuisine: 'Italian',
		difficulty: 'easy',
		cookingTimeMinutes: 10,
		servings: 2,
		dietary: ['vegetarian', 'gluten_free'],
		ingredients: [
			{ name: 'tomato', quantity: 2, unit: 'pc' },
			{ name: 'mozzarella', quantity: 150, unit: 'g', substitutions: ['tofu'] },
			{ name: 'basil', quantity: 5, unit: 'g' },
			{ name: 'olive oil', quantity: 1, unit: 'tbsp' },
		],
		steps: ['Slice tomatoes and mozzarella; layer with basil; drizzle oil.'],
		nutrition: { calories: 320, protein: 16, carbs: 8, fat: 24 },
	},
	{
		id: 'hummus-wrap',
		name: 'Hummus Veggie Wrap',
		cuisine: 'Mediterranean',
		difficulty: 'easy',
		cookingTimeMinutes: 10,
		servings: 2,
		dietary: ['vegan'],
		ingredients: [
			{ name: 'tortilla', quantity: 2, unit: 'pc', substitutions: ['lettuce leaves'] },
			{ name: 'hummus', quantity: 100, unit: 'g' },
			{ name: 'cucumber', quantity: 1, unit: 'pc' },
			{ name: 'carrot', quantity: 1, unit: 'pc' },
		],
		steps: ['Spread hummus on tortilla; add veggies and roll.'],
		nutrition: { calories: 300, protein: 10, carbs: 40, fat: 10 },
	},
 	{
 		id: 'shakshuka',
 		name: 'Shakshuka',
 		cuisine: 'Middle Eastern',
 		difficulty: 'easy',
 		cookingTimeMinutes: 25,
 		servings: 3,
 		dietary: ['vegetarian', 'gluten_free'],
 		ingredients: [
 			{ name: 'egg', quantity: 4, unit: 'pc', substitutions: ['tofu'] },
 			{ name: 'tomato', quantity: 3, unit: 'pc', substitutions: ['canned tomatoes'] },
 			{ name: 'onion', quantity: 1, unit: 'pc' },
 			{ name: 'garlic', quantity: 3, unit: 'clove' },
 			{ name: 'bell pepper', quantity: 1, unit: 'pc' },
 			{ name: 'cumin', quantity: 1, unit: 'tsp' },
 		],
 		steps: ['Simmer tomato-pepper sauce; crack eggs and poach until set.'],
 		nutrition: { calories: 350, protein: 18, carbs: 20, fat: 20 },
 	},
 	{
 		id: 'pesto-pasta',
 		name: 'Pesto Pasta',
 		cuisine: 'Italian',
 		difficulty: 'easy',
 		cookingTimeMinutes: 20,
 		servings: 2,
 		dietary: ['vegetarian'],
 		ingredients: [
 			{ name: 'pasta', quantity: 200, unit: 'g', substitutions: ['gluten-free pasta'] },
 			{ name: 'basil', quantity: 20, unit: 'g', substitutions: ['spinach'] },
 			{ name: 'olive oil', quantity: 2, unit: 'tbsp' },
 			{ name: 'parmesan', quantity: 30, unit: 'g', substitutions: ['mozzarella'] },
 			{ name: 'garlic', quantity: 1, unit: 'clove' },
 		],
 		steps: ['Blend pesto; toss with cooked pasta and cheese.'],
 		nutrition: { calories: 520, protein: 14, carbs: 70, fat: 20 },
 	},
 	{
 		id: 'tofu-stirfry',
 		name: 'Tofu Stir-fry',
 		cuisine: 'Chinese',
 		difficulty: 'easy',
 		cookingTimeMinutes: 15,
 		servings: 2,
 		dietary: ['vegan', 'gluten_free'],
 		ingredients: [
 			{ name: 'tofu', quantity: 300, unit: 'g', substitutions: ['chicken breast'] },
 			{ name: 'broccoli', quantity: 150, unit: 'g' },
 			{ name: 'soy sauce', quantity: 2, unit: 'tbsp' },
 			{ name: 'garlic', quantity: 2, unit: 'clove' },
 		],
 		steps: ['Stir-fry tofu and broccoli; add sauce and toss.'],
 		nutrition: { calories: 320, protein: 20, carbs: 18, fat: 18 },
 	},
 	{
 		id: 'greek-salad',
 		name: 'Greek Salad',
 		cuisine: 'Greek',
 		difficulty: 'easy',
 		cookingTimeMinutes: 10,
 		servings: 2,
 		dietary: ['vegetarian', 'gluten_free'],
 		ingredients: [
 			{ name: 'cucumber', quantity: 1, unit: 'pc' },
 			{ name: 'tomato', quantity: 2, unit: 'pc' },
 			{ name: 'olive oil', quantity: 1, unit: 'tbsp' },
 			{ name: 'feta', quantity: 80, unit: 'g', substitutions: ['paneer'] },
 			{ name: 'olive', quantity: 50, unit: 'g' },
 		],
 		steps: ['Chop and toss with olive oil and seasoning.'],
 		nutrition: { calories: 280, protein: 10, carbs: 12, fat: 20 },
 	},
 	{
 		id: 'butter-chicken',
 		name: 'Butter Chicken',
 		cuisine: 'Indian',
 		difficulty: 'medium',
 		cookingTimeMinutes: 35,
 		servings: 4,
 		dietary: ['halal'],
 		ingredients: [
 			{ name: 'chicken breast', quantity: 500, unit: 'g', substitutions: ['tofu'] },
 			{ name: 'tomato', quantity: 3, unit: 'pc' },
 			{ name: 'cream', quantity: 150, unit: 'ml', substitutions: ['coconut milk'] },
 			{ name: 'butter', quantity: 30, unit: 'g' },
 			{ name: 'garam masala', quantity: 2, unit: 'tsp' },
 		],
 		steps: ['Simmer spiced tomato gravy; add grilled chicken and finish with cream.'],
 		nutrition: { calories: 620, protein: 38, carbs: 18, fat: 40 },
 	},
 	{
 		id: 'black-bean-bowl',
 		name: 'Black Bean Bowl',
 		cuisine: 'Mexican',
 		difficulty: 'easy',
 		cookingTimeMinutes: 20,
 		servings: 2,
 		dietary: ['vegan', 'gluten_free'],
 		ingredients: [
 			{ name: 'black beans', quantity: 300, unit: 'g', substitutions: ['kidney beans'] },
 			{ name: 'rice', quantity: 200, unit: 'g' },
 			{ name: 'corn', quantity: 100, unit: 'g' },
 			{ name: 'tomato', quantity: 1, unit: 'pc' },
 		],
 		steps: ['Assemble warm rice, beans, corn, and salsa toppings.'],
 		nutrition: { calories: 520, protein: 18, carbs: 90, fat: 8 },
 	},
 	{
 		id: 'miso-soup',
 		name: 'Miso Soup',
 		cuisine: 'Japanese',
 		difficulty: 'easy',
 		cookingTimeMinutes: 15,
 		servings: 2,
 		dietary: ['vegan', 'gluten_free'],
 		ingredients: [
 			{ name: 'miso paste', quantity: 2, unit: 'tbsp' },
 			{ name: 'tofu', quantity: 150, unit: 'g' },
 			{ name: 'seaweed', quantity: 5, unit: 'g' },
 			{ name: 'spring onion', quantity: 1, unit: 'pc', substitutions: ['onion'] },
 		],
 		steps: ['Dissolve miso in hot stock; add tofu and seaweed.'],
 		nutrition: { calories: 120, protein: 10, carbs: 6, fat: 6 },
 	},
 	{
 		id: 'falafel',
 		name: 'Falafel',
 		cuisine: 'Middle Eastern',
 		difficulty: 'medium',
 		cookingTimeMinutes: 30,
 		servings: 4,
 		dietary: ['vegan'],
 		ingredients: [
 			{ name: 'chickpeas', quantity: 400, unit: 'g' },
 			{ name: 'onion', quantity: 1, unit: 'pc' },
 			{ name: 'garlic', quantity: 3, unit: 'clove' },
 			{ name: 'parsley', quantity: 10, unit: 'g' },
 			{ name: 'cumin', quantity: 1, unit: 'tsp' },
 		],
 		steps: ['Grind mix; form balls; fry or bake until crisp.'],
 		nutrition: { calories: 480, protein: 18, carbs: 50, fat: 20 },
 	},
 	{
 		id: 'omelette',
 		name: 'Cheese Omelette',
 		cuisine: 'French',
 		difficulty: 'easy',
 		cookingTimeMinutes: 10,
 		servings: 1,
 		dietary: ['gluten_free', 'vegetarian'],
 		ingredients: [
 			{ name: 'egg', quantity: 2, unit: 'pc' },
 			{ name: 'cheese', quantity: 40, unit: 'g', substitutions: ['mozzarella'] },
 			{ name: 'butter', quantity: 10, unit: 'g' },
 		],
 		steps: ['Whisk eggs; cook gently with cheese; fold.'],
 		nutrition: { calories: 320, protein: 20, carbs: 2, fat: 26 },
 	},
 	{
 		id: 'banana-smoothie',
 		name: 'Banana Smoothie',
 		cuisine: 'American',
 		difficulty: 'easy',
 		cookingTimeMinutes: 5,
 		servings: 2,
 		dietary: ['vegetarian', 'gluten_free'],
 		ingredients: [
 			{ name: 'banana', quantity: 2, unit: 'pc' },
 			{ name: 'milk', quantity: 300, unit: 'ml', substitutions: ['almond milk'] },
 			{ name: 'peanut butter', quantity: 1, unit: 'tbsp', optional: true },
 		],
 		steps: ['Blend all until smooth.'],
 		nutrition: { calories: 280, protein: 10, carbs: 42, fat: 8 },
 	},
 	{
 		id: 'avocado-toast',
 		name: 'Avocado Toast',
 		cuisine: 'American',
 		difficulty: 'easy',
 		cookingTimeMinutes: 10,
 		servings: 1,
 		dietary: ['vegetarian'],
 		ingredients: [
 			{ name: 'bread', quantity: 2, unit: 'slice', substitutions: ['gluten-free bread'] },
 			{ name: 'avocado', quantity: 1, unit: 'pc' },
 			{ name: 'egg', quantity: 1, unit: 'pc', optional: true },
 		],
 		steps: ['Toast bread; smash avocado; top with optional egg.'],
 		nutrition: { calories: 420, protein: 12, carbs: 38, fat: 24 },
 	},
 	{
 		id: 'tomato-soup',
 		name: 'Tomato Soup',
 		cuisine: 'American',
 		difficulty: 'easy',
 		cookingTimeMinutes: 30,
 		servings: 3,
 		dietary: ['vegetarian', 'gluten_free'],
 		ingredients: [
 			{ name: 'tomato', quantity: 5, unit: 'pc', substitutions: ['canned tomatoes'] },
 			{ name: 'onion', quantity: 1, unit: 'pc' },
 			{ name: 'garlic', quantity: 2, unit: 'clove' },
 			{ name: 'cream', quantity: 50, unit: 'ml', optional: true, substitutions: ['coconut milk'] },
 		],
 		steps: ['Simmer and blend until smooth; finish with cream.'],
 		nutrition: { calories: 260, protein: 6, carbs: 28, fat: 12 },
 	},
 	{
 		id: 'buddha-bowl',
 		name: 'Buddha Bowl',
 		cuisine: 'Fusion',
 		difficulty: 'easy',
 		cookingTimeMinutes: 20,
 		servings: 2,
 		dietary: ['vegan', 'gluten_free'],
 		ingredients: [
 			{ name: 'quinoa', quantity: 150, unit: 'g', substitutions: ['rice'] },
 			{ name: 'chickpeas', quantity: 200, unit: 'g' },
 			{ name: 'spinach', quantity: 100, unit: 'g' },
 			{ name: 'avocado', quantity: 1, unit: 'pc' },
 		],
 		steps: ['Assemble cooked grains with toppings and dressing.'],
 		nutrition: { calories: 520, protein: 16, carbs: 64, fat: 18 },
 	},
 	{
 		id: 'garlic-butter-shrimp',
 		name: 'Garlic Butter Shrimp',
 		cuisine: 'American',
 		difficulty: 'easy',
 		cookingTimeMinutes: 12,
 		servings: 2,
 		dietary: ['gluten_free'],
 		ingredients: [
 			{ name: 'shrimp', quantity: 300, unit: 'g' },
 			{ name: 'garlic', quantity: 3, unit: 'clove' },
 			{ name: 'butter', quantity: 30, unit: 'g' },
 			{ name: 'lemon', quantity: 1, unit: 'pc' },
 		],
 		steps: ['Sauté garlic in butter; add shrimp; finish with lemon.'],
 		nutrition: { calories: 360, protein: 28, carbs: 2, fat: 26 },
 	},
 	{
 		id: 'bean-chili',
 		name: 'Three-Bean Chili',
 		cuisine: 'American',
 		difficulty: 'easy',
 		cookingTimeMinutes: 40,
 		servings: 4,
 		dietary: ['vegan', 'gluten_free'],
 		ingredients: [
 			{ name: 'kidney beans', quantity: 200, unit: 'g', substitutions: ['black beans'] },
 			{ name: 'black beans', quantity: 200, unit: 'g' },
 			{ name: 'chickpeas', quantity: 200, unit: 'g' },
 			{ name: 'tomato', quantity: 2, unit: 'pc' },
 			{ name: 'onion', quantity: 1, unit: 'pc' },
 			{ name: 'chili powder', quantity: 2, unit: 'tsp' },
 		],
 		steps: ['Simmer beans with aromatics and spices until thick.'],
 		nutrition: { calories: 480, protein: 24, carbs: 80, fat: 6 },
 	},
 	{
 		id: 'grilled-veg-skewers',
 		name: 'Grilled Veg Skewers',
 		cuisine: 'Mediterranean',
 		difficulty: 'easy',
 		cookingTimeMinutes: 18,
 		servings: 3,
 		dietary: ['vegan', 'gluten_free'],
 		ingredients: [
 			{ name: 'bell pepper', quantity: 2, unit: 'pc' },
 			{ name: 'zucchini', quantity: 2, unit: 'pc' },
 			{ name: 'mushroom', quantity: 150, unit: 'g' },
 			{ name: 'olive oil', quantity: 2, unit: 'tbsp' },
 		],
 		steps: ['Skewer and grill until tender; drizzle oil.'],
 		nutrition: { calories: 220, protein: 6, carbs: 18, fat: 12 },
 	},
 	{
 		id: 'spaghetti-bolognese',
 		name: 'Spaghetti Bolognese',
 		cuisine: 'Italian',
 		difficulty: 'medium',
 		cookingTimeMinutes: 45,
 		servings: 4,
 		dietary: [],
 		ingredients: [
 			{ name: 'pasta', quantity: 400, unit: 'g' },
 			{ name: 'ground beef', quantity: 400, unit: 'g', substitutions: ['lentils'] },
 			{ name: 'tomato', quantity: 3, unit: 'pc', substitutions: ['canned tomatoes'] },
 			{ name: 'onion', quantity: 1, unit: 'pc' },
 			{ name: 'garlic', quantity: 2, unit: 'clove' },
 		],
 		steps: ['Simmer meat sauce; toss with al dente pasta.'],
 		nutrition: { calories: 700, protein: 32, carbs: 90, fat: 22 },
 	},
];

export type MatchFilters = {
	maxCookingTimeMinutes?: number;
	difficulty?: Recipe['difficulty'][];
	dietary?: DietaryTag[];
};

export type MatchInput = {
	availableIngredients: string[];
	filters?: MatchFilters;
	servings?: number;
};

export type MatchResult = {
	recipe: Recipe;
	matchScore: number; // 0..1 fraction of ingredients matched (after substitutions)
	missing: string[];
	substitutionsUsed: Record<string, string | undefined>;
};

const normalize = (s: string) => s.trim().toLowerCase();

export function scaleRecipeServings(recipe: Recipe, servings: number): Recipe {
	if (servings === recipe.servings) return recipe;
	const factor = servings / recipe.servings;
	return {
		...recipe,
		servings,
		ingredients: recipe.ingredients.map((ing) => ({
			...ing,
			quantity: Math.round(ing.quantity * factor * 100) / 100,
		})),
		nutrition: {
			calories: Math.round(recipe.nutrition.calories * factor),
			protein: Math.round(recipe.nutrition.protein * factor * 10) / 10,
			carbs: Math.round(recipe.nutrition.carbs * factor * 10) / 10,
			fat: Math.round(recipe.nutrition.fat * factor * 10) / 10,
		},
	};
}

export function matchRecipes(input: MatchInput): MatchResult[] {
	const available = new Set(input.availableIngredients.map(normalize));
	const filters = input.filters;
	let candidates = RECIPES;
	if (filters) {
		candidates = candidates.filter((r) => {
			if (filters.maxCookingTimeMinutes && r.cookingTimeMinutes > filters.maxCookingTimeMinutes) return false;
			if (filters.difficulty && filters.difficulty.length && !filters.difficulty.includes(r.difficulty)) return false;
			if (filters.dietary && filters.dietary.length && !filters.dietary.every((d) => r.dietary.includes(d))) return false;
			return true;
		});
	}
	const results: MatchResult[] = candidates.map((recipe) => {
		const substitutionsUsed: Record<string, string | undefined> = {};
		let matched = 0;
		const missing: string[] = [];
		recipe.ingredients.forEach((req) => {
			const need = normalize(req.name);
			if (available.has(need)) {
				matched++;
				return;
			}
			const options = (req.substitutions || []).map(normalize);
			const foundSub = options.find((opt) => available.has(opt));
			if (foundSub) {
				matched++;
				substitutionsUsed[need] = foundSub;
			} else if (!req.optional) {
				missing.push(req.name);
			}
		});
		const requiredCount = recipe.ingredients.filter((i) => !i.optional).length;
		const matchScore = requiredCount === 0 ? 1 : matched / requiredCount;
		let adjustedRecipe = recipe;
		if (input.servings && input.servings !== recipe.servings) {
			adjustedRecipe = scaleRecipeServings(recipe, input.servings);
		}
		return { recipe: adjustedRecipe, matchScore, missing, substitutionsUsed };
	});
	return results
		.filter((r) => r.matchScore > 0)
		.sort((a, b) => b.matchScore - a.matchScore);
}

export function suggestSubstitutionsForMissing(missing: string[]): Record<string, string[]> {
	const index: Record<string, string[]> = {};
	for (const r of RECIPES) {
		for (const ing of r.ingredients) {
			if (!ing.substitutions || ing.substitutions.length === 0) continue;
			const key = normalize(ing.name);
			index[key] = Array.from(new Set([...(index[key] || []), ...ing.substitutions]));
		}
	}
	const out: Record<string, string[]> = {};
	for (const m of missing) {
		const key = normalize(m);
		out[m] = index[key] || [];
	}
	return out;
}


