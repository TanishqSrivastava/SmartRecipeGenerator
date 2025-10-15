// Lightweight image-to-ingredient labeling using @xenova/transformers in the browser.
// The model is downloaded on first use and cached in memory.

type ClassifierFn = (image: string, options?: { topk?: number }) => Promise<{ label: string; score: number }[]>;
let classifier: ClassifierFn | null = null;

type Classification = { label: string; score: number };

const COMMON_INGREDIENT_ALIASES: Record<string, string[]> = {
	tomato: ['tomatoes'],
	onion: ['red onion', 'white onion', 'shallot'],
	garlic: ['garlic clove', 'garlic bulb'],
	pepper: ['bell pepper', 'capsicum'],
	cheese: ['mozzarella', 'cheddar', 'parmesan', 'paneer'],
	chicken: ['chicken breast', 'chicken thigh'],
	beef: ['ground beef', 'minced beef'],
	fish: ['salmon', 'tuna', 'cod'],
	bean: ['black beans', 'kidney beans', 'chickpeas'],
	chickpeas: ['garbanzo beans'],
	lettuce: ['romaine', 'iceberg'],
	cucumber: [],
	carrot: [],
	egg: ['eggs'],
	milk: ['dairy milk'],
	flour: ['all-purpose flour', 'plain flour'],
	rice: ['white rice', 'brown rice'],
	quinoa: [],
	salmon: [],
	mozzarella: [],
	basil: [],
	"coconut milk": [],
};

const normalize = (s: string) => s.toLowerCase().trim();

function mapLabelToIngredient(label: string): string | null {
	const base = normalize(label).replace(/_/g, ' ');
	// Direct match
	if (COMMON_INGREDIENT_ALIASES[base]) return base;
	// Alias match
	for (const key of Object.keys(COMMON_INGREDIENT_ALIASES)) {
		if (key === base) return key;
		if (COMMON_INGREDIENT_ALIASES[key].some((alias) => normalize(alias) === base)) return key;
	}
	// Heuristics
	if (base.includes('tomato')) return 'tomato';
	if (base.includes('onion')) return 'onion';
	if (base.includes('garlic')) return 'garlic';
	if (base.includes('pepper')) return 'pepper';
	if (base.includes('cheese')) return 'cheese';
	if (base.includes('chicken')) return 'chicken breast';
	if (base.includes('beef')) return 'ground beef';
	if (base.includes('salmon')) return 'salmon';
	if (base.includes('cucumber')) return 'cucumber';
	if (base.includes('carrot')) return 'carrot';
	if (base.includes('egg')) return 'egg';
	if (base.includes('rice')) return 'rice';
	if (base.includes('quinoa')) return 'quinoa';
	return null;
}

export async function detectIngredientsFromImage(file: File): Promise<string[]> {
	if (typeof window === 'undefined') return [];
    if (!classifier) {
        const { pipeline } = await import('@xenova/transformers');
        const fn = await pipeline('image-classification', 'Xenova/convnext-tiny-224');
        // Pipeline returns a callable; cast via unknown to our function signature
        classifier = fn as unknown as ClassifierFn;
    }
	const image = URL.createObjectURL(file);
	try {
        const results: Classification[] = await (classifier as NonNullable<ClassifierFn>)(image, { topk: 5 });
		const mapped = results
			.filter((r) => r.score >= 0.15)
			.map((r) => mapLabelToIngredient(r.label))
			.filter((x): x is string => Boolean(x));
		return Array.from(new Set(mapped));
	} finally {
		URL.revokeObjectURL(image);
	}
}


