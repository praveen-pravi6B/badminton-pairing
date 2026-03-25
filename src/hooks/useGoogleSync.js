import { useState, useCallback } from 'react'
import { LS_KEYS, DEFAULT_GS_URL } from '../constants/defaults'

export function useGoogleSync(isAdmin) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)
  const url = localStorage.getItem(LS_KEYS.GS_URL) || DEFAULT_GS_URL

  const pull = useCallback(async () => {
    if (!url) return
    setIsSyncing(true)
    try {
      const response = await fetch(url)
      const cloudData = await response.json()
      
      const cloudTs = Number(cloudData[LS_KEYS.LAST_UPDATE]) || 0
      const localTs = Number(localStorage.getItem(LS_KEYS.LAST_UPDATE)) || 0

      if (cloudTs > localTs) {
        Object.entries(cloudData).forEach(([key, value]) => {
          if (value) localStorage.setItem(key, value)
        })
        window.location.reload()
      }
      setLastSync(new Date())
    } catch (err) {
      console.error('Sync pull failed:', err)
    } finally {
      setIsSyncing(false)
    }
  }, [url])

  const push = useCallback(async () => {
    if (!url || !isAdmin) return
    setIsSyncing(true)
    try {
      const now = Date.now().toString()
      localStorage.setItem(LS_KEYS.LAST_UPDATE, now)
      
      const payload = {
        [LS_KEYS.PLAYERS]: localStorage.getItem(LS_KEYS.PLAYERS),
        [LS_KEYS.LAST_PAIRS]: localStorage.getItem(LS_KEYS.LAST_PAIRS),
        [LS_KEYS.ROUND_NUMBER]: localStorage.getItem(LS_KEYS.ROUND_NUMBER),
        [LS_KEYS.TOURNAMENT]: localStorage.getItem(LS_KEYS.TOURNAMENT),
        [LS_KEYS.LAST_UPDATE]: now,
      }
      
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        mode: 'no-cors'
      })
      setLastSync(new Date())
    } catch (err) {
      console.error('Sync push failed:', err)
    } finally {
      setIsSyncing(false)
    }
  }, [url, isAdmin])

  return { url, isSyncing, lastSync, pull, push }
}
