import { PLAYER_TYPES } from '../../constants/defaults'

const typeStyles = {
  [PLAYER_TYPES.ADVANCED]: 'bg-blue-50 border-blue-200 text-blue-800',
  [PLAYER_TYPES.INTERMEDIATE]: 'bg-emerald-50 border-emerald-200 text-emerald-800',
}

export default function PlayerCard({ player, isAdmin, onEdit, onDelete }) {
  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${typeStyles[player.type]}`}>
      <span className="font-medium text-sm">{player.name}</span>
      {isAdmin && (
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(player)}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-white/70 transition-colors"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(player.id)}
            className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-white/70 transition-colors"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  )
}
