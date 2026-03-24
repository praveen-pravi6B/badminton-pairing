import { useState } from 'react'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildMatches(teamNumbers, prefix) {
  const shuffled = shuffleArray(teamNumbers)
  const matches = []
  for (let i = 0; i + 1 < shuffled.length; i += 2) {
    matches.push({
      id: `${prefix}-${matches.length}`,
      home: shuffled[i],
      away: shuffled[i + 1],
      homeScore: '',
      awayScore: '',
      winner: null,
    })
  }
  return matches
}

const INITIAL = {
  stage: 'idle',         // idle | r1 | semi | final | champion
  round1: [],
  semis: [],
  final: null,
  champion: null,
}

export function useTournament(pairs) {
  const [state, setState] = useState(INITIAL)
  const { stage, round1, semis, final, champion } = state

  const start = () => {
    if (pairs.length < 2) return
    const teams = pairs.map((p) => p.courtNumber)
    setState({ ...INITIAL, stage: 'r1', round1: buildMatches(teams, 'r1') })
  }

  const reset = () => setState(INITIAL)

  const updateMatch = (stageKey, matchId, field, value) => {
    setState((prev) => {
      if (stageKey === 'final') {
        return { ...prev, final: { ...prev.final, [field]: value } }
      }
      return {
        ...prev,
        [stageKey]: prev[stageKey].map((m) =>
          m.id === matchId ? { ...m, [field]: value } : m
        ),
      }
    })
  }

  const setWinner = (stageKey, matchId, team) => {
    setState((prev) => {
      const toggle = (m) =>
        m.id === matchId ? { ...m, winner: m.winner === team ? null : team } : m

      if (stageKey === 'final') {
        const updated = { ...prev.final, winner: prev.final.winner === team ? null : team }
        const champion = updated.winner !== null ? updated.winner : null
        return {
          ...prev,
          final: updated,
          stage: champion ? 'champion' : 'final',
          champion,
        }
      }

      const updated = prev[stageKey].map(toggle)
      const allDone = updated.every((m) => m.winner !== null)

      if (!allDone) return { ...prev, [stageKey]: updated }

      // Advance to next stage
      const winners = updated.map((m) => m.winner)
      if (stageKey === 'round1') {
        return { ...prev, round1: updated, stage: 'semi', semis: buildMatches(winners, 'sf') }
      }
      if (stageKey === 'semis') {
        const [home, away] = shuffleArray(winners)
        return {
          ...prev,
          semis: updated,
          stage: 'final',
          final: { id: 'final-0', home, away, homeScore: '', awayScore: '', winner: null },
        }
      }
      return prev
    })
  }

  return { stage, round1, semis, final, champion, start, reset, updateMatch, setWinner }
}
