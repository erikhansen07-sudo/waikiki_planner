# Waikīkī Trip Planner — Hansen Family, May 19–26, 2026

A React + Vite drag-and-drop itinerary for our Oʻahu trip. Days reorder, stops reorder within or across days, and everything saves to `localStorage`.

## Stack
- React 18 + Vite
- `@hello-pangea/dnd` (the maintained fork of `react-beautiful-dnd`)
- Google Fonts: Fraunces (serif), Inter (sans), Caveat (accent)
- No backend. State persists in `localStorage` under `waikiki-trip-planner:v1`.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages (from `main`)

Deploys automatically via GitHub Actions every time you push to `main`. Live URL:
`https://erikhansen07-sudo.github.io/waikiki-trip-planner/`

If you use a different repo name, update two things:
1. `"homepage"` in `package.json`
2. `base` in `vite.config.js` (e.g. `'/your-repo-name/'`)

### One-time setup
```bash
git init
git branch -M main
git remote add origin https://github.com/erikhansen07-sudo/waikiki-trip-planner.git
git add .
git commit -m "Initial commit: Waikiki trip planner"
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

That's it. The workflow in `.github/workflows/deploy.yml` handles install + build + deploy on every push to `main`. You can also trigger it manually from the Actions tab ("Run workflow").

## Features
- 8 pre-seeded days with every stop from the original plan
- Drag days up and down; drag stops within or between days
- Add / edit / delete stops
- Per-stop tag (Beach, Food, Adventure, Culture, Show, Shopping, Travel)
- Confirmed vs. Maybe pill — visually distinct card treatment
- Notes on any stop
- Filter chips at the top (filters stops across all days and the bin)
- Sidebar "Ideas Bin" of unscheduled activities to drag into days
- **Reset to original plan** button if you want to start over
- Everything saves to `localStorage` automatically

## File map
```
src/
  main.jsx       — entry
  App.jsx        — the whole app (dnd, CRUD, state)
  seedData.js    — the 8-day itinerary + ideas bin
  styles.css     — tropical editorial aesthetic
```
