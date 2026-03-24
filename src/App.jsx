import { useState } from 'react'
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
  const { push } = useGoogleSync()

  const { advancedPlayers, intermediatePlayers, isUnequal, addPlayer, editPlayer, deletePlayer, resetPlayers } = usePlayers(push)
  const { pairs, unpaired, roundNumber, generate, reshuffle } = usePairing(push)
  const { matches, sitOut, draw } = useMatches()
  const { stage, groups, groupMatches, semis, final, champion, start, reset, updateMatch, setWinner } = useTournament(pairs, push)

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
