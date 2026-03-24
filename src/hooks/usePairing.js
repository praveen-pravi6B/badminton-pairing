import { useState, useEffect, useRef } from 'react'
import { LS_KEYS } from '../constants/defaults'
import { createPairs } from '../utils/pairingAlgorithm'

function loadState() {
  try {
    const lastPairs = JSON.parse(localStorage.getItem(LS_KEYS.LAST_PAIRS) || '[]')
    const roundNumber = parseInt(localStorage.getItem(LS_KEYS.ROUND_NUMBER) || '0', 10)
    return { lastPairs, roundNumber }
  } catch (err) {
    console.error('Failed to load pairing state', err)
    return { lastPairs: [], roundNumber: 0 }
  }
}

export function usePairing(push) {
  const saved = loadState()
  const [pairs, setPairs] = useState(saved.lastPairs)
  const [unpaired, setUnpaired] = useState({ advanced: [], intermediate: [] })
  const [lastPairs, setLastPairs] = useState(saved.lastPairs)
  const [roundNumber, setRoundNumber] = useState(saved.roundNumber)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      return
    }
    const timer = setTimeout(() => {
      push()
    }, 2000)
    return () => clearTimeout(timer)
  }, [pairs, push])

  const generate = (advancedPlayers, intermediatePlayers) => {
    const advNames = advancedPlayers.map((p) => p.name)
    const intNames = intermediatePlayers.map((p) => p.name)
    const result = createPairs(advNames, intNames, lastPairs)

    const newRound = roundNumber + 1
    setPairs(result.pairs)
    setUnpaired(result.unpaired)
    setLastPairs(result.pairs)
    setRoundNumber(newRound)

    localStorage.setItem(LS_KEYS.LAST_PAIRS, JSON.stringify(result.pairs))
    localStorage.setItem(LS_KEYS.ROUND_NUMBER, String(newRound))
  }

  const reshuffle = (advancedPlayers, intermediatePlayers) => {
    generate(advancedPlayers, intermediatePlayers)
  }

  return {
    pairs,
    unpaired,
    roundNumber,
    generate,
    reshuffle,
  }
}
