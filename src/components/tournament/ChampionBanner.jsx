export default function ChampionBanner({ champion, pairs }) {
  const team = pairs.find((p) => p.courtNumber === champion)

  return (
    <div
      className="animate-slide-up opacity-0 text-center py-10 space-y-4"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="text-6xl">🏆</div>
      <h2 className="text-2xl font-bold text-slate-800">Champion!</h2>
      <div className="inline-block bg-amber-50 border border-amber-300 rounded-2xl px-10 py-6 shadow-sm">
        <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3">
          Team {champion}
        </p>
        <p className="text-xl font-bold text-slate-800">{team?.advanced}</p>
        <p className="text-base text-slate-500 mt-1">{team?.intermediate}</p>
      </div>
    </div>
  )
}
