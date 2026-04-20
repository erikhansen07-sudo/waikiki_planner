// Thin wrapper around JSONBin.io's REST API.
// If config isn't filled in, every function is a silent no-op and the app
// runs in local-only mode.

import { CONFIG } from './config'

const BASE = 'https://api.jsonbin.io/v3/b'

export const cloudEnabled = () =>
  Boolean(CONFIG.JSONBIN_ID && CONFIG.JSONBIN_ACCESS_KEY)

// Pull the latest saved itinerary from the bin. Returns `null` if cloud is
// off; throws on network or auth errors so the caller can show a status.
export async function cloudLoad() {
  if (!cloudEnabled()) return null
  const res = await fetch(`${BASE}/${CONFIG.JSONBIN_ID}/latest`, {
    headers: { 'X-Access-Key': CONFIG.JSONBIN_ACCESS_KEY },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`cloudLoad ${res.status}`)
  const json = await res.json()
  // JSONBin wraps the payload in { record, metadata }
  return json && json.record ? json.record : null
}

// Overwrite the bin with the current state. We disable versioning so we don't
// bloat the free-tier history.
export async function cloudSave(state) {
  if (!cloudEnabled()) return
  const res = await fetch(`${BASE}/${CONFIG.JSONBIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': CONFIG.JSONBIN_ACCESS_KEY,
      'X-Bin-Versioning': 'false',
    },
    body: JSON.stringify(state),
  })
  if (!res.ok) throw new Error(`cloudSave ${res.status}`)
}
