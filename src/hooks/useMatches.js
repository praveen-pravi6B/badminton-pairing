import { useState } from 'react'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Given N teams, randomly pair them into N/2 matches
function drawMatches(teams) {
  const shuffled = shuffleArray(teams)
  const matches = []
  for (let i = 0; i < shuffled.length - 1; i += 2) {
    matches.push({
      courtNumber: matches.length + 1,
      home: shuffled[i],
      away: shuffled[i + 1],
    })
  }
  // If odd number of teams, last one sits out
  const sitOut = shuffled.length % 2 !== 0 ? shuffled[shuffled.length - 1] : null
  return { matches, sitOut }
}

export function useMatches() {
  const [matches, setMatches] = useState([])
  const [sitOut, setSitOut] = useState(null)

  const draw = (pairs) => {
    if (pairs.length === 0) return
    const teams = pairs.map((p) => p.courtNumber) // team numbers 1–8
    const result = drawMatches(teams)
    setMatches(result.matches)
    setSitOut(result.sitOut)
  }

  return { matches, sitOut, draw }
}
