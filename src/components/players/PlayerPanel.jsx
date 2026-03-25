import { useState } from 'react'
import PlayerColumn from './PlayerColumn'
import PlayerForm from './PlayerForm'

export default function PlayerPanel({
  isAdmin,
  advancedPlayers,
  intermediatePlayers,
  onAdd,
  onEdit,
  onDelete,
  onReset,
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState(null)

  const handleEdit = (player) => {
    setEditingPlayer(player)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setEditingPlayer(null)
  }

  const handleSave = (name, type) => {
    if (editingPlayer) {
      onEdit(editingPlayer.id, name, type)
    } else {
      onAdd(name, type)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Players ({advancedPlayers.length + intermediatePlayers.length} total)
        </h2>
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="px-3 py-1.5 text-sm border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Add Player
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PlayerColumn
          title="Captains"
          players={advancedPlayers}
          colorClass="bg-blue-50 border-blue-100 text-blue-800"
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={onDelete}
        />
        <PlayerColumn
          title="Partners"
          players={intermediatePlayers}
          colorClass="bg-emerald-50 border-emerald-100 text-emerald-800"
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={onDelete}
        />
      </div>

      {isAdmin && showForm && (
        <PlayerForm
          editingPlayer={editingPlayer}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
