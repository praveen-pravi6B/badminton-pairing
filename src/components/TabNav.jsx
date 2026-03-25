export default function TabNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'players', label: 'Players', icon: '👥' },
    { id: 'pairing', label: 'Pairing', icon: '🎯' },
    { id: 'matches', label: 'Matches', icon: '⚔️' },
    { id: 'tournament', label: 'Tournament', icon: '🏆' },
  ]

  return (
    <div className="bg-white border-b border-slate-200 sticky top-[73px] z-40">
      <div className="max-w-5xl mx-auto flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs sm:text-sm font-black uppercase tracking-widest border-b-4 transition-all ${
              activeTab === tab.id
                ? 'border-[#5F59FF] text-[#5F59FF] bg-purple-50/30'
                : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-base sm:text-lg opacity-80">{tab.icon}</span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight sm:tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
