Smart Recipe Generator – Next.js App
====================================

Features
- Ingredient input (text) and on-device image recognition using `@xenova/transformers`
- Recipe matching with substitutions and serving-size scaling
- Filters: difficulty, time, dietary tags
- Nutrition info per recipe
- Ratings and favorites (persisted in `localStorage`) and simple suggestions
- Mobile-responsive UI, loading and error states

Tech
- Next.js App Router (TypeScript)
- On-device vision via `@xenova/transformers` (no server key required)

Getting Started
1. Install: `npm i`
2. Dev: `npm run dev` and open `http://localhost:3000`

Deployment (Vercel)
- Push to GitHub, then import in Vercel and deploy. Default settings work.

Approach (≤200 words)
This app centers on a typed recipe dataset and a deterministic matching algorithm. User-provided ingredients (typed or detected from images) are normalized and compared against each recipe’s required ingredients. Matches consider optional items and built-in substitutions, producing a score to rank results. Serving-size scaling proportionally adjusts ingredient amounts and nutrition. Dietary/time/difficulty filters prune candidates pre-match.

For vision, a lightweight ConvNeXt image-classification pipeline runs entirely in the browser via `@xenova/transformers`, mapping labels to common pantry ingredients with alias heuristics. Ratings and favorites persist in `localStorage`; suggestions rank recipes by user rating and favorite bias. The UI provides clear loading and error states, with responsive layout and minimal dependencies.
