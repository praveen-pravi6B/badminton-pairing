import TournamentMatchCard from './TournamentMatchCard'

const gridClass = {
  4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
  2: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  1: 'flex justify-center',
}

export default function BracketStage({ title, matches, pairs, isActive, isComplete, onPickWinner }) {
  const isPending = !isActive && !isComplete

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-bold text-slate-700">{title}</h3>
        {isActive && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
            In Progress
          </span>
        )}
        {isComplete && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
            Complete
          </span>
        )}
      </div>

      {isPending || matches.length === 0 ? (
        <div className="text-sm text-slate-400 italic py-2">Waiting for previous round...</div>
      ) : (
        <div className={gridClass[matches.length] || 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
          {matches.map((match, i) => (
            <TournamentMatchCard
              key={match.id}
              match={match}
              pairs={pairs}
              index={i}
              onPickWinner={onPickWinner}
            />
          ))}
        </div>
      )}
    </div>
  )
}
