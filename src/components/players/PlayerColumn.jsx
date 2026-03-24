import PlayerCard from './PlayerCard'

export default function PlayerColumn({ title, players, colorClass, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className={`px-4 py-3 border-b ${colorClass}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">{title}</h3>
          <span className="text-xs font-medium bg-white/60 px-2 py-0.5 rounded-full">
            {players.length} players
          </span>
        </div>
      </div>
      <div className="p-3 space-y-2 min-h-[200px]">
        {players.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">No players yet</p>
        ) : (
          players.map((p) => (
            <PlayerCard key={p.id} player={p} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  )
}
