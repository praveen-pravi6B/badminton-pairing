export default function PairCard({ pair, index, roundNumber }) {
  return (
    <div
      key={`r${roundNumber}-c${index}`}
      className="animate-slide-up bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden opacity-0"
      style={{
        animationDelay: `${index * 60}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Team {pair.courtNumber}
        </span>
        <span className="text-slate-300 text-sm">🏸</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-700 font-bold text-xs">C</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 leading-none mb-0.5">Captain</p>
            <p className="font-semibold text-slate-800 text-sm">{pair.advanced}</p>
          </div>
        </div>
        <div className="border-t border-slate-100" />
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-700 font-bold text-xs">P</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 leading-none mb-0.5">Partner</p>
            <p className="font-semibold text-slate-800 text-sm">{pair.intermediate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
