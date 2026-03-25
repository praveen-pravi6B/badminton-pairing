import { useState } from 'react'

function Confetti() {
  const [pieces] = useState(() => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: (Math.random() * 5 - 5) + 's',
      duration: (Math.random() * 3 + 2) + 's',
      rotation: Math.random() * 360 + 'deg'
    }))
  })

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
      {pieces.map((p) => (
        <div 
          key={p.id}
          className="confetti"
          style={{
            left: p.left,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotation})`
          }}
        />
      ))}
    </div>
  )
}

export default function CelebrationModal({ champion, pairs, onReset }) {
  if (!champion) return null
  const team = pairs.find((p) => p.courtNumber === champion)

  return (
    <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl animate-in fade-in duration-700" />
      
      {/* Confetti */}
      <Confetti />

      {/* Content */}
      <div className="relative bg-white rounded-[2rem] p-5 sm:p-8 max-w-md w-full max-h-[80vh] flex flex-col items-center shadow-[0_0_40px_rgba(37,99,235,0.2)] animate-in zoom-in slide-in-from-bottom-8 duration-700">
        
        {/* Scrollable Area */}
        <div className="flex-1 w-full overflow-y-auto pr-1 flex flex-col items-center text-center custom-scrollbar pt-6">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full animate-pulse" />
            <div className="text-6xl sm:text-7xl mb-1 animate-tada relative z-10">🏆</div>
          </div>
          
          <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5F59FF] mb-1">Badminton Tournament</h2>
          <h1 className="text-2xl sm:text-3xl font-black text-[#5F59FF] italic tracking-tighter mb-6 uppercase leading-tight">
            METROPOLIS CHAMPION
          </h1>

          <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 sm:p-6 mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Team {champion}</p>
            <div className="space-y-1">
              <p className="text-xl sm:text-2xl font-black text-slate-900 italic tracking-tight leading-tight">{team?.advanced}</p>
              <div className="w-6 h-1 bg-blue-600 mx-auto rounded-full" />
              <p className="text-base sm:text-lg font-bold text-slate-500">{team?.intermediate}</p>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="pt-4 space-y-3">
          <button 
            onClick={onReset}
            className="w-full py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
          >
            Reset Tournament
          </button>
          
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">
            Congratulations to the Metropolis Winners!
          </p>
        </div>
      </div>
    </div>
  )
}
