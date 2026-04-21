// ─────────────────────────────────────────────────────────────────────────────
//  waikiki_planner · shared config
// ─────────────────────────────────────────────────────────────────────────────
//  Fill these three values in, then commit + push. GitHub Actions redeploys the
//  site and your wife can open the same URL, type the shared password, and see
//  (and edit) the same itinerary you do.
//
//  Setup in 3 minutes:
//    1. Go to https://jsonbin.io and sign up (free, email only, no card).
//    2. Click "Create Bin". Paste `{}` as the starter JSON. Save.
//       Copy the "Bin ID" from the URL — it looks like: 66f0a1b2c3d4e5f6a7b8c9d0
//    3. Top-right menu → API Keys → "Create Access Key".
//         · give it update + read permission
//         · scope it to the bin you just made (optional but safer)
//         · copy the key — it starts with $2a$10$... or $2b$10$...
//    4. Paste both values below, pick a password you and your wife will share,
//       save this file, commit + push. Done.
//
//  NOTE: these values WILL be visible in the compiled JS bundle on the site.
//  That's acceptable here because the key is scoped to one bin holding a trip
//  itinerary. Delete or rotate the bin + key after May 26.
//
//  If you leave any value blank, the app falls back to local-only mode (each
//  browser keeps its own itinerary) — handy for testing offline.
// ─────────────────────────────────────────────────────────────────────────────

export const CONFIG = {
  // From step 2 above — paste the Bin ID.
  JSONBIN_ID: '69e6b6c2aaba8821971ddde4',

  // From step 3 above — paste the access key (starts with $2a$ or $2b$).
  JSONBIN_ACCESS_KEY: '$2a$10$K3Qn/gq.D3ZlEOTiFUKw9eafaQY/qtQB9dUoq44UUxp8M1RK7.hnW',

  // From step 4 — whatever password you and your wife agreed on.
  // Keep it short and memorable. Both of you type this once per browser.
  SHARED_PASSWORD: 'hawaii2026',
}
