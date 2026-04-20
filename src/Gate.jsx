import React, { useState } from 'react'
import { CONFIG } from './config'

// If the password changes, the key fingerprint changes, which invalidates
// every previously-unlocked browser. That way bumping the password in
// config.js actually kicks people out.
const pwFingerprint = () => {
  try {
    return CONFIG.SHARED_PASSWORD
      ? btoa(unescape(encodeURIComponent(CONFIG.SHARED_PASSWORD))).slice(0, 10)
      : 'nopw'
  } catch {
    return 'nopw'
  }
}

const authKey = () => `waikiki-trip-planner:unlocked:${pwFingerprint()}`

export const hasAuth = () => {
  // No password configured? The gate is disabled.
  if (!CONFIG.SHARED_PASSWORD) return true
  try {
    return localStorage.getItem(authKey()) === '1'
  } catch {
    return false
  }
}

export const clearAuth = () => {
  try { localStorage.removeItem(authKey()) } catch {}
}

export default function Gate({ onUnlock }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!CONFIG.SHARED_PASSWORD) {
      onUnlock()
      return
    }
    if (pw === CONFIG.SHARED_PASSWORD) {
      try { localStorage.setItem(authKey(), '1') } catch {}
      onUnlock()
    } else {
      setErr('Not quite — try again?')
      setPw('')
    }
  }

  return (
    <div className="gate">
      <form className="gate-card" onSubmit={submit}>
        <div className="gate-eyebrow">The Pacific Issue</div>
        <h1 className="gate-title">
          Waikīkī,
          <span className="gate-italic"> the family itinerary</span>
        </h1>
        <p className="gate-sub">
          Password, please. It's the one we agreed on.
        </p>
        <input
          className="gate-input"
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr('') }}
          placeholder="Shared password"
          autoComplete="current-password"
        />
        {err && <div className="gate-err">{err}</div>}
        <button className="btn btn-primary gate-btn" type="submit">
          Unlock
        </button>
        <div className="gate-foot">aloha · mahalo</div>
      </form>
    </div>
  )
}
