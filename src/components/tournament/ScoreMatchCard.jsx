function TeamRow({ teamNum, pair, score, isWinner, isLoser, onScoreChange, onSelectWinner, hasWinner }) {
  return (
    <div
      className={`rounded-lg border p-3 transition-all ${
        isWinner
          ? 'bg-amber-50 border-amber-300'
          : isLoser
          ? 'bg-slate-50 border-slate-100 opacity-50'
          : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="flex items-center gap-2">
        {/* Winner toggle */}
        <button
          onClick={onSelectWinner}
          title={isWinner ? 'Unmark winner' : 'Mark as winner'}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            isWinner
              ? 'bg-amber-400 border-amber-400 text-white'
              : 'border-slate-300 hover:border-blue-400 bg-white'
          }`}
        >
          {isWinner && <span className="text-xs font-bold">✓</span>}
        </button>

        {/* Player info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Team {teamNum}</p>
          {pair ? (
            <div>
              <p className="text-sm font-semibold text-slate-800 truncate">{pair.advanced}</p>
              <p className="text-xs text-slate-500 truncate">{pair.intermediate}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">TBD</p>
          )}
        </div>

        {/* Score input */}
        <input
          type="number"
          min="0"
          max="30"
          value={score}
          onChange={(e) => onScoreChange(e.target.value)}
          placeholder="0"
          className={`w-12 text-center text-lg font-bold rounded-lg border py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            isWinner
              ? 'bg-amber-100 border-amber-300 text-amber-800'
              : 'bg-white border-slate-300 text-slate-700'
          }`}
        />
      </div>
    </div>
  )
}

export default function ScoreMatchCard({ match, pairs, index, onUpdateScore, onSetWinner, label }) {
  const homePair = pairs.find((p) => p.courtNumber === match.home)
  const awayPair = pairs.find((p) => p.courtNumber === match.away)

  return (
    <div
      className="animate-slide-up bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden opacity-0"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
    >
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label || `Match ${index + 1}`}
        </span>
        {match.winner !== null && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            Done
          </span>
        )}
      </div>

      <div className="p-3 space-y-2">
        <TeamRow
          teamNum={match.home}
          pair={homePair}
          score={match.homeScore}
          isWinner={match.winner === match.home}
          isLoser={match.winner === match.away}
          hasWinner={match.winner !== null}
          onScoreChange={(v) => onUpdateScore(match.id, 'homeScore', v)}
          onSelectWinner={() => onSetWinner(match.id, match.home)}
        />
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-slate-200" />
          <span className="text-xs font-bold text-slate-400">VS</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>
        <TeamRow
          teamNum={match.away}
          pair={awayPair}
          score={match.awayScore}
          isWinner={match.winner === match.away}
          isLoser={match.winner === match.home}
          hasWinner={match.winner !== null}
          onScoreChange={(v) => onUpdateScore(match.id, 'awayScore', v)}
          onSelectWinner={() => onSetWinner(match.id, match.away)}
        />
      </div>
    </div>
  )
}
