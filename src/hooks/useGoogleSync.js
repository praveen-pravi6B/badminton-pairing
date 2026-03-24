import { useState, useCallback } from 'react'
import { LS_KEYS, DEFAULT_GS_URL } from '../constants/defaults'

export function useGoogleSync() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)
  const url = localStorage.getItem(LS_KEYS.GS_URL) || DEFAULT_GS_URL

  const pull = useCallback(async () => {
    if (!url) return
    setIsSyncing(true)
    try {
      const response = await fetch(url)
      const cloudData = await response.json()
      
      let changed = false
      Object.entries(cloudData).forEach(([key, value]) => {
        if (value && localStorage.getItem(key) !== value) {
          localStorage.setItem(key, value)
          changed = true
        }
      })
      
      setLastSync(new Date())
      if (changed) window.location.reload()
    } catch (err) {
      console.error('Sync pull failed:', err)
    } finally {
      setIsSyncing(false)
    }
  }, [url])

  const push = useCallback(async () => {
    if (!url) return
    setIsSyncing(true)
    try {
      const payload = {
        [LS_KEYS.PLAYERS]: localStorage.getItem(LS_KEYS.PLAYERS),
        [LS_KEYS.LAST_PAIRS]: localStorage.getItem(LS_KEYS.LAST_PAIRS),
        [LS_KEYS.ROUND_NUMBER]: localStorage.getItem(LS_KEYS.ROUND_NUMBER),
        [LS_KEYS.TOURNAMENT]: localStorage.getItem(LS_KEYS.TOURNAMENT),
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
  }, [url])

  return { url, isSyncing, lastSync, pull, push }
}
