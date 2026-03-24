export default function MatchCard({ match, index, pairs }) {
  const homeTeam = pairs.find((p) => p.courtNumber === match.home)
  const awayTeam = pairs.find((p) => p.courtNumber === match.away)

  return (
    <div
      className="animate-slide-up bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden opacity-0"
      style={{
        animationDelay: `${index * 60}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Court header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Court {match.courtNumber}
        </span>
        <span className="text-slate-300 text-sm">⚔️</span>
      </div>

      <div className="p-4 space-y-3">
        {/* Home team */}
        <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">
            Team {match.home}
          </p>
          {homeTeam && (
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-blue-800">{homeTeam.advanced}</p>
              <p className="text-sm text-blue-600">{homeTeam.intermediate}</p>
            </div>
          )}
        </div>

        {/* VS divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-slate-200" />
          <span className="text-xs font-bold text-slate-400">VS</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        {/* Away team */}
        <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">
            Team {match.away}
          </p>
          {awayTeam && (
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-emerald-800">{awayTeam.advanced}</p>
              <p className="text-sm text-emerald-600">{awayTeam.intermediate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
