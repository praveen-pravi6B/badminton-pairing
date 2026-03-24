import { useState, useEffect } from 'react'
import { PLAYER_TYPES } from '../../constants/defaults'

export default function PlayerForm({ editingPlayer, onSave, onClose }) {
  const [name, setName] = useState('')
  const [type, setType] = useState(PLAYER_TYPES.ADVANCED)

  useEffect(() => {
    if (editingPlayer) {
      setName(editingPlayer.name)
      setType(editingPlayer.type)
    } else {
      setName('')
      setType(PLAYER_TYPES.ADVANCED)
    }
  }, [editingPlayer])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave(name, type)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          {editingPlayer ? 'Edit Player' : 'Add Player'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Player name"
              autoFocus
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <div className="flex gap-2">
              {[PLAYER_TYPES.ADVANCED, PLAYER_TYPES.INTERMEDIATE].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    type === t
                      ? t === PLAYER_TYPES.ADVANCED
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {t === PLAYER_TYPES.ADVANCED ? 'Captain' : 'Partner'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {editingPlayer ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
