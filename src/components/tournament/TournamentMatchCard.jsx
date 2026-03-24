function TeamSlot({ teamNumber, pair, isWinner, isLoser, onPick, canPick }) {
  return (
    <div
      className={`rounded-lg border p-3 transition-all ${
        isWinner
          ? 'bg-amber-50 border-amber-300'
          : isLoser
          ? 'bg-slate-50 border-slate-200 opacity-40'
          : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
            Team {teamNumber}
          </p>
          {pair ? (
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-slate-800">{pair.advanced}</p>
              <p className="text-sm text-slate-500">{pair.intermediate}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">TBD</p>
          )}
        </div>
        <div className="flex-shrink-0">
          {isWinner ? (
            <span className="text-lg">🏆</span>
          ) : canPick ? (
            <button
              onClick={onPick}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Pick
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function TournamentMatchCard({ match, pairs, onPickWinner, index }) {
  const homePair = pairs.find((p) => p.courtNumber === match.home)
  const awayPair = pairs.find((p) => p.courtNumber === match.away)
  const canPick = match.winner === null

  return (
    <div
      className="animate-slide-up bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden opacity-0"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
    >
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Match {index + 1}
        </span>
      </div>
      <div className="p-3 space-y-2">
        <TeamSlot
          teamNumber={match.home}
          pair={homePair}
          isWinner={match.winner === match.home}
          isLoser={match.winner === match.away}
          canPick={canPick}
          onPick={() => onPickWinner(match.id, match.home)}
        />
        <div className="flex items-center gap-2 py-0.5">
          <div className="flex-1 border-t border-slate-200" />
          <span className="text-xs font-bold text-slate-400">VS</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>
        <TeamSlot
          teamNumber={match.away}
          pair={awayPair}
          isWinner={match.winner === match.away}
          isLoser={match.winner === match.home}
          canPick={canPick}
          onPick={() => onPickWinner(match.id, match.away)}
        />
      </div>
    </div>
  )
}
