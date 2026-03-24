import { useState, useEffect } from 'react'
import Header from './components/Header'
import TabNav from './components/TabNav'
import PlayerPanel from './components/players/PlayerPanel'
import PairingPanel from './components/pairing/PairingPanel'
import MatchesPanel from './components/matches/MatchesPanel'
import TournamentPanel from './components/tournament/TournamentPanel'
import { usePlayers } from './hooks/usePlayers'
import { usePairing } from './hooks/usePairing'
import { useMatches } from './hooks/useMatches'
import { useTournament } from './hooks/useTournament'
import { useGoogleSync } from './hooks/useGoogleSync'

export default function App() {
  const [activeTab, setActiveTab] = useState('players')
  const { pull, push } = useGoogleSync()

  const { advancedPlayers, intermediatePlayers, isUnequal, addPlayer, editPlayer, deletePlayer, resetPlayers } = usePlayers(push)
  const { pairs, unpaired, roundNumber, generate, reshuffle } = usePairing(push)
  const { matches, sitOut, draw } = useMatches()
  const { stage, groups, groupMatches, semis, final, champion, start, reset, updateMatch, setWinner } = useTournament(pairs, push)

  // Smart Navigation & Initial Sync
  useEffect(() => {
    // 1. Initial cloud sync
    pull()

    // 2. Set starting tab based on data state (deferred to avoid render warnings)
    const frame = requestAnimationFrame(() => {
      if (stage !== 'idle') {
        setActiveTab('tournament')
      } else if (pairs.length > 0) {
        setActiveTab('pairing')
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pull, stage, pairs.length]) 

  // 3. Auto-switch to Tournament when it starts
  useEffect(() => {
    if (stage === 'groups') {
      const frame = requestAnimationFrame(() => {
        setActiveTab('tournament')
      })
      return () => cancelAnimationFrame(frame)
    }
  }, [stage])

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'players' && (
        <PlayerPanel
          advancedPlayers={advancedPlayers}
          intermediatePlayers={intermediatePlayers}
          onAdd={addPlayer}
          onEdit={editPlayer}
          onDelete={deletePlayer}
          onReset={resetPlayers}
        />
      )}

      {activeTab === 'pairing' && (
        <PairingPanel
          advancedPlayers={advancedPlayers}
          intermediatePlayers={intermediatePlayers}
          isUnequal={isUnequal}
          pairs={pairs}
          unpaired={unpaired}
          roundNumber={roundNumber}
          onGenerate={generate}
          onReshuffle={reshuffle}
        />
      )}

      {activeTab === 'matches' && (
        <MatchesPanel pairs={pairs} matches={matches} sitOut={sitOut} onDraw={draw} />
      )}

      {activeTab === 'tournament' && (
        <TournamentPanel
          pairs={pairs}
          stage={stage}
          groups={groups}
          groupMatches={groupMatches}
          semis={semis}
          final={final}
          champion={champion}
          onStart={start}
          onReset={reset}
          onUpdate={updateMatch}
          onSetWinner={setWinner}
        />
      )}
    </div>
  )
}
