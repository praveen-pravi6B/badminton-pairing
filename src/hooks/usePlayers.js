import { useState, useEffect, useRef } from 'react'
import { LS_KEYS, DEFAULT_PLAYERS, PLAYER_TYPES } from '../constants/defaults'

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

function loadPlayers() {
  try {
    const stored = localStorage.getItem(LS_KEYS.PLAYERS)
    if (stored) return JSON.parse(stored)
  } catch (err) {
    console.error('Failed to load players', err)
  }
  return DEFAULT_PLAYERS
}

export function usePlayers(push) {
  const [players, setPlayers] = useState(loadPlayers)

  const initialized = useRef(false)

  useEffect(() => {
    localStorage.setItem(LS_KEYS.PLAYERS, JSON.stringify(players))
    
    if (!initialized.current) {
      initialized.current = true
      return
    }

    const timer = setTimeout(() => {
      push()
    }, 2000)

    return () => clearTimeout(timer)
  }, [players, push])

  const addPlayer = (name, type) => {
    setPlayers((prev) => [...prev, { id: genId(), name: name.trim(), type }])
  }

  const editPlayer = (id, name, type) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: name.trim(), type } : p))
    )
  }

  const deletePlayer = (id) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id))
  }

  const resetPlayers = () => {
    setPlayers(DEFAULT_PLAYERS)
  }

  const advancedPlayers = players.filter((p) => p.type === PLAYER_TYPES.ADVANCED)
  const intermediatePlayers = players.filter((p) => p.type === PLAYER_TYPES.INTERMEDIATE)
  const isUnequal = advancedPlayers.length !== intermediatePlayers.length

  return {
    players,
    advancedPlayers,
    intermediatePlayers,
    isUnequal,
    addPlayer,
    editPlayer,
    deletePlayer,
    resetPlayers,
  }
}
