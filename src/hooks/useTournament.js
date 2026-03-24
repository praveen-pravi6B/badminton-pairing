import { useState } from 'react'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildRoundRobin(teamNumbers, groupName) {
  const matches = []
  for (let i = 0; i < teamNumbers.length; i++) {
    for (let j = i + 1; j < teamNumbers.length; j++) {
      matches.push({
        id: `group-${groupName}-${matches.length}`,
        home: teamNumbers[i],
        away: teamNumbers[j],
        homeScore: '',
        awayScore: '',
        winner: null,
      })
    }
  }
  return shuffleArray(matches) // Shuffle match order for variety
}

function buildKnockout(pairs, prefix) {
  const matches = []
  for (let i = 0; i < pairs.length; i++) {
    const [home, away] = pairs[i]
    matches.push({
      id: `${prefix}-${i}`,
      home,
      away,
      homeScore: '',
      awayScore: '',
      winner: null,
      court: i + 1, // Assign Court 1, 2, etc.
    })
  }
  return matches
}

export function calculateStandings(groupTeams, groupMatches) {
  const stats = groupTeams.map((teamId) => ({
    team: teamId,
    played: 0,
    wins: 0,
    losses: 0,
    sf: 0, // Score For
    sa: 0, // Score Against
    points: 0,
  }))

  groupMatches.forEach((m) => {
    if (m.winner === null) return

    const home = stats.find((s) => s.team === m.home)
    const away = stats.find((s) => s.team === m.away)
    if (!home || !away) return

    home.played++
    away.played++

    const hs = parseInt(m.homeScore) || 0
    const as = parseInt(m.awayScore) || 0
    home.sf += hs
    home.sa += as
    away.sf += as
    away.sa += hs

    if (m.winner === m.home) {
      home.wins++
      home.points += 2
      away.losses++
    } else {
      away.wins++
      away.points += 2
      home.losses++
    }
  })

  return stats.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    const aDiff = a.sf - a.sa
    const bDiff = b.sf - b.sa
    if (bDiff !== aDiff) return bDiff - aDiff
    return b.sf - a.sf
  })
}

function generateSchedule(matches, courtCount = 3) {
  const scheduled = []
  const unscheduled = [...matches]
  let roundNum = 1
  
  while (unscheduled.length > 0) {
    const teamsInRound = new Set()
    let matchesInRound = 0
    
    for (let i = 0; i < unscheduled.length; i++) {
      const maxCourts = roundNum <= 4 ? courtCount : 2
      if (matchesInRound >= maxCourts) break
      
      const m = unscheduled[i]
      if (!teamsInRound.has(m.home) && !teamsInRound.has(m.away)) {
        scheduled.push({
          ...m,
          round: roundNum,
          court: matchesInRound + 1
        })
        teamsInRound.add(m.home)
        teamsInRound.add(m.away)
        unscheduled.splice(i, 1)
        i-- 
        matchesInRound++
      }
    }
    roundNum++
    if (matchesInRound === 0 && unscheduled.length > 0) break
  }
  return scheduled
}

function generateBestSchedule(matches, courtCount = 3, attempts = 20) {
  let bestScheduled = null
  let minRounds = Infinity
  const targetRounds = Math.ceil(matches.length / courtCount)
  
  for (let a = 0; a < attempts; a++) {
    const currentScheduled = generateSchedule(shuffleArray([...matches]), courtCount)
    if (currentScheduled.length < matches.length) continue // Safety check
    
    const roundCount = Math.max(...currentScheduled.map(m => m.round))
    if (roundCount < minRounds) {
      minRounds = roundCount
      bestScheduled = currentScheduled
    }
    if (minRounds === targetRounds) break
  }
  return bestScheduled || generateSchedule(matches, courtCount)
}

const INITIAL = {
  stage: 'idle',         // idle | groups | semi | final | champion
  groups: { A: [], B: [] },
  groupMatches: { A: [], B: [] },
  semis: [],
  final: null,
  champion: null,
}

export function useTournament(pairs) {
  const [state, setState] = useState(INITIAL)
  const { stage, groups, groupMatches, semis, final, champion } = state

  const start = () => {
    if (pairs.length < 4) return // Need at least 4 teams for 2 groups
    // Sort teams by number so 1-4 go to A, 5-8 go to B
    const teams = pairs.map((p) => p.courtNumber).sort((a, b) => a - b)
    
    const mid = Math.ceil(teams.length / 2)
    const groupA = teams.slice(0, mid)
    const groupB = teams.slice(mid)

    const allRawMatches = [
      ...buildRoundRobin(groupA, 'A'),
      ...buildRoundRobin(groupB, 'B')
    ]
    
    // Attempt to find a dense schedule (ideally 4 rounds for 12 matches)
    const scheduled = generateBestSchedule(allRawMatches, 3)

    setState({
      ...INITIAL,
      stage: 'groups',
      groups: { A: groupA, B: groupB },
      groupMatches: {
        A: scheduled.filter(m => m.id.includes('group-A')),
        B: scheduled.filter(m => m.id.includes('group-B')),
      },
    })
  }

  const reset = () => setState(INITIAL)

  const updateMatch = (stageKey, matchId, field, value) => {
    setState((prev) => {
      if (stageKey === 'final') {
        return { ...prev, final: { ...prev.final, [field]: value } }
      }
      
      if (stageKey === 'group-A' || stageKey === 'group-B') {
        const key = stageKey.split('-')[1]
        return {
          ...prev,
          groupMatches: {
            ...prev.groupMatches,
            [key]: prev.groupMatches[key].map((m) =>
              m.id === matchId ? { ...m, [field]: value } : m
            ),
          },
        }
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

      // Handle Final
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

      // Handle Group Stage
      if (stageKey === 'group-A' || stageKey === 'group-B') {
        const groupKey = stageKey.split('-')[1]
        const updatedMatches = prev.groupMatches[groupKey].map(toggle)
        const newState = {
          ...prev,
          groupMatches: { ...prev.groupMatches, [groupKey]: updatedMatches },
        }

        const allA = newState.groupMatches.A.every((m) => m.winner !== null)
        const allB = newState.groupMatches.B.every((m) => m.winner !== null)

        if (allA && allB) {
          const standA = calculateStandings(prev.groups.A, newState.groupMatches.A)
          const standB = calculateStandings(prev.groups.B, newState.groupMatches.B)
          
          // Advancing pairs: (Winner A vs Runner B) and (Winner B vs Runner A)
          const semiPairs = [
            [standA[0].team, standB[1].team],
            [standB[0].team, standA[1].team],
          ]
          
          return {
            ...newState,
            stage: 'semi',
            semis: buildKnockout(semiPairs, 'sf'),
          }
        }
        return newState
      }

      // Handle Semis
      const updated = prev[stageKey].map(toggle)
      const allDone = updated.every((m) => m.winner !== null)

      if (!allDone) return { ...prev, [stageKey]: updated }

      const winners = updated.map((m) => m.winner)
      if (stageKey === 'semis') {
        return {
          ...prev,
          semis: updated,
          stage: 'final',
          final: { id: 'final-0', home: winners[0], away: winners[1], homeScore: '', awayScore: '', winner: null, court: 1 },
        }
      }
      return prev
    })
  }

  return { 
    stage, 
    groups, 
    groupMatches, 
    semis, 
    final, 
    champion, 
    start, 
    reset, 
    updateMatch, 
    setWinner 
  }
}
