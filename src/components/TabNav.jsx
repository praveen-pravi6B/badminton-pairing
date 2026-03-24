export default function TabNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'players', label: 'Players', icon: '👥' },
    { id: 'pairing', label: 'Pairing', icon: '🎯' },
    { id: 'matches', label: 'Matches', icon: '⚔️' },
    { id: 'tournament', label: 'Tournament', icon: '🏆' },
  ]

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
