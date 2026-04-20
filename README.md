# Waikīkī Trip Planner — Hansen Family, May 19–26, 2026

A React + Vite drag-and-drop itinerary for our Oʻahu trip. Days reorder, stops reorder within or across days, and changes sync live between browsers through a shared JSONBin bucket.

## Stack
- React 18 + Vite
- `@hello-pangea/dnd` (the maintained fork of `react-beautiful-dnd`)
- Google Fonts: Fraunces (serif), Inter (sans), Caveat (accent)
- **State:** `localStorage` for instant loads + JSONBin.io for cloud sync between browsers
- **Auth:** shared-password gate (cosmetic — keeps randoms out)

## Run locally
```bash
npm install
npm run dev
```

## Shared cloud sync — 3-minute setup

By default the app runs in local-only mode (each browser keeps its own itinerary). To share the plan with another person, hook up a free JSONBin bucket:

1. Sign up at <https://jsonbin.io> (free, email only — no credit card).
2. Click **Create Bin**. Paste `{}` as the starter JSON. Save. Copy the **Bin ID** from the URL (looks like `66f0a1b2c3d4e5f6a7b8c9d0`).
3. Top-right menu → **API Keys** → **Create Access Key**. Give it read + update. Optionally scope it to the bin you just made. Copy the key (starts with `$2a$10$…` or `$2b$10$…`).
4. Open `src/config.js`, paste the two values, and set a `SHARED_PASSWORD`:
   ```js
   export const CONFIG = {
     JSONBIN_ID: '66f0a1b2c3d4e5f6a7b8c9d0',
     JSONBIN_ACCESS_KEY: '$2a$10$abcdefghijklmnopqrstuv',
     SHARED_PASSWORD: 'honu2026',
   }
   ```
5. Commit + push. GitHub Actions rebuilds. Open the site — it prompts for the password, then loads the shared plan.
6. Send your person the URL + password. They unlock once per browser and edit the same itinerary you do. Changes poll every ~20 seconds.

> **Security note:** the bin ID, key, and password are all embedded in the public JS bundle. That's fine for a trip itinerary — the access key is scoped to a single bin. Delete or rotate the bin + key after the trip.

### Sync behavior
- **On load** — pull the latest plan from JSONBin (falls back to localStorage if offline).
- **On change** — debounced save to JSONBin (~800ms after you stop editing).
- **Every 20s** — poll JSONBin for edits the other browser made. Paused while a modal is open.
- **Status pill** in the toolbar shows `Synced · 4s ago` / `Syncing…` / `Offline`. Click it to force a refresh.
- Last write wins. With two casual editors it's effectively conflict-free.

### Sign out
The **Sign out** button (only visible when a password is set) clears the unlock flag in this browser. Next load re-prompts.

## Deploy to GitHub Pages (from `main`)

Deploys automatically via GitHub Actions every push to `main`. Live URL:
`https://erikhansen07-sudo.github.io/waikiki_planner/`

If you rename the repo, update:
1. `"homepage"` in `package.json`
2. `base` in `vite.config.js` (e.g. `'/your-repo-name/'`)

Then in the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Features
- 8 pre-seeded days, tuned for two parents + 8yo + 4yo
- Drag days up and down; drag stops within or between days
- Add / edit / delete stops
- Per-stop tag (Beach, Food, Adventure, Culture, Show, Shopping, Travel)
- Confirmed vs. Maybe pill — visually distinct card treatment
- Notes on any stop
- Filter chips at the top (filters stops across all days and the bin)
- Sidebar "Ideas Bin" of unscheduled activities to drag into days
- **Reset to original plan** button (also pushes the reset to the cloud)
- Shared-password gate + JSONBin cloud sync for 2-browser use

## File map
```
src/
  main.jsx       — entry
  App.jsx        — the app (dnd, CRUD, sync choreography)
  Gate.jsx       — password unlock screen
  cloud.js       — JSONBin load/save wrapper
  config.js      — JSONBin ID + key + password (fill in)
  seedData.js    — the 8-day itinerary + ideas bin
  styles.css     — tropical editorial aesthetic + sync pill + gate
```
