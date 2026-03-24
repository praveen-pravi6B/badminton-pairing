import MatchCard from './MatchCard'

export default function MatchesPanel({ pairs, matches, sitOut, onDraw }) {
  const hasPairs = pairs.length > 0
  const hasMatches = matches.length > 0

  if (!hasPairs) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="text-center py-16 text-slate-400">
          <div className="text-5xl mb-3">🎯</div>
          <p className="text-sm">Generate teams in the Pairing tab first</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onDraw(pairs)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {hasMatches ? 'Reshuffle Matches' : 'Draw Matches'}
        </button>
        {hasMatches && (
          <span className="text-sm text-slate-500">
            {matches.length} matches across {matches.length} courts
          </span>
        )}
      </div>

      {hasMatches && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {matches.map((match, i) => (
              <MatchCard key={`m${i}-${match.home}-${match.away}`} match={match} index={i} pairs={pairs} />
            ))}
          </div>

          {sitOut && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Sitting Out</h3>
              <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-full">
                Team {sitOut}
              </span>
            </div>
          )}
        </>
      )}

      {!hasMatches && (
        <div className="text-center py-12 text-slate-400">
          <div className="text-4xl mb-3">⚔️</div>
          <p className="text-sm">Click "Draw Matches" to assign opponents</p>
        </div>
      )}
    </div>
  )
}
