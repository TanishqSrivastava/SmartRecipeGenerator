export type RatingMap = Record<string, number>; // recipeId -> 1..5
export type FavoritesSet = Record<string, true>;

const RATINGS_KEY = 'sr_ratings_v1';
const FAVS_KEY = 'sr_favorites_v1';

function safeParse<T>(s: string | null, fallback: T): T {
	if (!s) return fallback;
	try { return JSON.parse(s) as T; } catch { return fallback; }
}

export function getRatings(): RatingMap {
	if (typeof window === 'undefined') return {};
	return safeParse<RatingMap>(localStorage.getItem(RATINGS_KEY), {});
}

export function setRating(recipeId: string, rating: number) {
	if (typeof window === 'undefined') return;
	const map = getRatings();
	map[recipeId] = Math.max(1, Math.min(5, Math.round(rating)));
	localStorage.setItem(RATINGS_KEY, JSON.stringify(map));
}

export function getFavorites(): FavoritesSet {
	if (typeof window === 'undefined') return {};
	return safeParse<FavoritesSet>(localStorage.getItem(FAVS_KEY), {});
}

export function toggleFavorite(recipeId: string): boolean {
	if (typeof window === 'undefined') return false;
	const favs = getFavorites();
	if (favs[recipeId]) { delete favs[recipeId]; }
	else { favs[recipeId] = true; }
	localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
	return Boolean(favs[recipeId]);
}

export function suggestedRecipeIds(_preferredDietary: string[] = []): string[] {
	// Simple heuristic: top-rated first; if tie, favorites, then dietary inclusion
	const ratings = getRatings();
	const favs = getFavorites();
	const entries = Object.entries(ratings);
	entries.sort((a, b) => b[1] - a[1]);
	// Bias favorites to front
	entries.sort((a, b) => (Boolean(favs[b[0]]) ? 1 : 0) - (Boolean(favs[a[0]]) ? 1 : 0));
	return entries.map(([id]) => id);
}


