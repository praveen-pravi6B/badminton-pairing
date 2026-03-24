import { useState } from 'react'
import { LS_KEYS } from '../constants/defaults'
import { useGoogleSync } from '../hooks/useGoogleSync'

function ShuttlecockLoader() {
  return (
    <div className="flex items-center gap-2 bg-blue-600/10 text-blue-600 px-3 py-1.5 rounded-full border border-blue-100 animate-pulse">
      <div className="relative w-4 h-4 animate-bounce">
        <span className="absolute inset-0 text-xs text-center">🏸</span>
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest">Live Syncing</span>
    </div>
  )
}

export default function Header({ isAdmin, onSetAdmin }) {
  const { isSyncing, lastSync } = useGoogleSync(isAdmin)
  const [showConfig, setShowConfig] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="transition-transform group-hover:translate-x-1">
              <h1 className="text-2xl font-black text-[#5F59FF] leading-tight tracking-tighter italic uppercase">
                METROPOLIS
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                Badminton Tournament <span className="w-1 h-1 bg-[#5F59FF] rounded-full animate-pulse" />
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isSyncing ? (
              <ShuttlecockLoader />
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                CLOUD ACTIVE
              </div>
            )}

            <div className="h-6 w-px bg-slate-100 mx-1" />

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowConfig(!showConfig)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${showConfig ? 'bg-blue-600 text-white rotate-90' : 'bg-slate-50 text-slate-400 hover:bg-slate-200'}`}
                title="Sync Info"
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>

        {showConfig && (
          <div className="bg-slate-900 text-white rounded-2xl p-6 animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl shadow-blue-900/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400">System Information</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded">V 2.0.0</span>
                {isAdmin ? (
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">ADMIN ACCESS</span>
                ) : (
                  <span className="text-[10px] font-bold bg-white/5 text-slate-500 px-2 py-1 rounded">VIEW ONLY</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="space-y-1">
                <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                  <span className="text-xs text-slate-500 font-medium">Cloud Storage</span>
                  <span className="text-[10px] font-black text-emerald-400 uppercase italic">Active</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                  <span className="text-xs text-slate-500 font-medium">Last Cloud Sync</span>
                  <span className="text-[10px] font-black text-blue-400 uppercase">
                    {lastSync ? lastSync.toLocaleTimeString() : 'PENDING'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs text-slate-500 font-medium">Sync Interval</span>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter italic">Real-Time</span>
                </div>
              </div>

              <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Mode</span>
                  <button 
                    onClick={() => onSetAdmin(!isAdmin)}
                    className={`relative w-10 h-5 rounded-full transition-all duration-300 ${isAdmin ? 'bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${isAdmin ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
                <p className="text-[9px] text-slate-500 leading-normal italic">
                  {isAdmin 
                    ? "Organizers: All editing and reset controls are now enabled." 
                    : "Viewers: Editing and resetting are disabled to protect data."}
                </p>
              </div>
            </div>
            
            <div className="mt-2 pt-4 border-t border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-400/80 text-sm">
                ℹ️
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                {isAdmin 
                  ? "You are currently pushing live updates to the designated Google Sheet." 
                  : "You are currently viewing a live-synced version of the tournament."}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
