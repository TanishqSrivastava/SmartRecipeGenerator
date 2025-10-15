"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { matchRecipes, suggestSubstitutionsForMissing, type MatchFilters, RECIPES, type DietaryTag, type Recipe } from "@/lib/recipes";
import { detectIngredientsFromImage } from "@/lib/vision";
import { getFavorites, getRatings, setRating, toggleFavorite, suggestedRecipeIds } from "@/lib/user-data";

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietary, setDietary] = useState<DietaryTag[]>([]);
  const [difficulty, setDifficulty] = useState<Recipe['difficulty'][]>([]);
  const [maxTime, setMaxTime] = useState<number | undefined>();
  const [servings, setServings] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ReturnType<typeof matchRecipes>>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<Record<string, true>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filters: MatchFilters = useMemo(() => ({
    maxCookingTimeMinutes: maxTime,
    difficulty,
    dietary,
  }), [maxTime, difficulty, dietary]);

  async function onClassifyFromImage(file: File) {
    setLoading(true);
    setError(null);
    try {
      const detected = await detectIngredientsFromImage(file);
      setIngredients((prev) => Array.from(new Set([...prev, ...detected])));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to analyze image";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function onMatch() {
    setLoading(true);
    setError(null);
    try {
      const res = matchRecipes({ availableIngredients: ingredients, filters, servings });
      setResults(res);
    } catch (_e: unknown) {
      setError("Failed to match recipes");
    } finally {
      setLoading(false);
    }
  }

  function initUserData() {
    setRatings(getRatings());
    setFavorites(getFavorites());
  }

  function onToggleFavorite(id: string) {
    toggleFavorite(id);
    setFavorites(getFavorites());
  }

  function onSetRating(id: string, value: number) {
    setRating(id, value);
    setRatings(getRatings());
  }

  // Hydrate ratings/favorites on first client render
  useEffect(() => { if (typeof window !== 'undefined') initUserData(); }, []);

  function onAddIngredient(i: string) {
    const v = i.trim().toLowerCase();
    if (!v) return;
    setIngredients((prev) => prev.includes(v) ? prev : [...prev, v]);
  }

  function onRemoveIngredient(i: string) {
    setIngredients((prev) => prev.filter((x) => x !== i));
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Smart Recipe Generator</h1>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Ingredients</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. tomato, rice, chicken"
            className="flex-1 border rounded px-3 py-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddIngredient((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          <button
            className="border rounded px-3 py-2"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onClassifyFromImage(file);
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((i) => (
            <span key={i} className="text-sm border rounded-full px-3 py-1 flex items-center gap-2">
              {i}
              <button onClick={() => onRemoveIngredient(i)} className="text-red-500">×</button>
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1">Dietary</label>
            <select multiple className="w-full border rounded px-3 py-2" value={dietary} onChange={(e) => setDietary(Array.from(e.target.selectedOptions).map(o => o.value as DietaryTag))}>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten_free">Gluten Free</option>
              <option value="dairy_free">Dairy Free</option>
              <option value="nut_free">Nut Free</option>
              <option value="keto">Keto</option>
              <option value="halal">Halal</option>
              <option value="kosher">Kosher</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Difficulty</label>
            <select multiple className="w-full border rounded px-3 py-2" value={difficulty} onChange={(e) => setDifficulty(Array.from(e.target.selectedOptions).map(o => o.value as Recipe['difficulty']))}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Max Time (min)</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={maxTime ?? ''} onChange={(e) => setMaxTime(e.target.value ? Number(e.target.value) : undefined)} />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Servings</label>
          <input type="number" className="border rounded px-3 py-2" value={servings} onChange={(e) => setServings(Math.max(1, Number(e.target.value || 1)))} />
        </div>
        <div>
          <button className="border rounded px-4 py-2" onClick={onMatch} disabled={loading}>Find Recipes</button>
        </div>
      </section>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}

      <section className="space-y-4">
        {results.length > 0 && <h2 className="text-lg font-medium">Results</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map(({ recipe, matchScore, missing, substitutionsUsed }) => (
            <div key={recipe.id} className="border rounded p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{recipe.name}</h3>
                <span className="text-xs">Match: {(matchScore * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <button className={`px-2 py-1 border rounded ${favorites[recipe.id] ? 'bg-yellow-100' : ''}`} onClick={() => onToggleFavorite(recipe.id)}>
                  {favorites[recipe.id] ? '★ Favorited' : '☆ Favorite'}
                </button>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <button key={s} onClick={() => onSetRating(recipe.id, s)} className={s <= (ratings[recipe.id] || 0) ? 'text-yellow-500' : 'text-gray-400'}>★</button>
                  ))}
                  <span className="text-xs ml-1">{ratings[recipe.id] || 0}/5</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">{recipe.cuisine} • {recipe.difficulty} • {recipe.cookingTimeMinutes} min • Serves {recipe.servings}</div>
              <div>
                <h4 className="text-sm font-medium">Ingredients</h4>
                <ul className="list-disc ml-5 text-sm">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.name}>
                      {ing.name} — {ing.quantity} {ing.unit} {ing.optional ? '(optional)' : ''}
                      {substitutionsUsed[ing.name.toLowerCase()] && (
                        <span className="text-xs text-amber-700"> (using {substitutionsUsed[ing.name.toLowerCase()]})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {missing.length > 0 && (
                <div className="text-sm">
                  <span className="font-medium">Missing:</span> {missing.join(', ')}
                  <div className="text-xs text-gray-600 mt-1">
                    {Object.entries(suggestSubstitutionsForMissing(missing)).map(([m, subs]) => (
                      <div key={m}>{m}: {subs.length ? subs.join(', ') : 'No known substitutions'}</div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium">Steps</h4>
                <ol className="list-decimal ml-5 text-sm">
                  {recipe.steps.map((s, idx) => (<li key={idx}>{s}</li>))}
                </ol>
              </div>
              <div className="text-sm text-gray-700">Nutrition: {recipe.nutrition.calories} kcal • {recipe.nutrition.protein} g P • {recipe.nutrition.carbs} g C • {recipe.nutrition.fat} g F</div>
            </div>
          ))}
        </div>
        {(() => {
          const suggestedIds = suggestedRecipeIds();
          const suggested = suggestedIds.map((id) => RECIPES.find(r => r.id === id)).filter(Boolean) as typeof RECIPES;
          if (suggested.length === 0) return null;
          return (
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Suggestions for you</h2>
              <div className="flex flex-wrap gap-2 text-sm">
                {suggested.slice(0, 6).map((r) => (
                  <span key={r.id} className="border rounded px-2 py-1">{r.name}</span>
                ))}
              </div>
            </div>
          );
        })()}
      </section>
    </div>
  );
}
