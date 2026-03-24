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

export default function Header() {
  const { isSyncing, lastSync } = useGoogleSync()
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400">System Information</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded">V 2.0.0</span>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded">STABLE</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-xs text-slate-400">Cloud Storage</span>
                <span className="text-xs font-bold text-emerald-400">ENABLED & SECURE</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-xs text-slate-400">Sync Interval</span>
                <span className="text-xs font-bold text-slate-200 italic">REAL-TIME / 2S BUFFER</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-xs text-slate-400">Last Database Sync</span>
                <span className="text-xs font-bold text-blue-400">
                  {lastSync ? lastSync.toLocaleTimeString() : 'PULLING DATA...'}
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 text-sm">
                ℹ️
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                Manual configuration has been disabled for security. Your data is being safely stored in the designated Google Cloud Sheet.
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
