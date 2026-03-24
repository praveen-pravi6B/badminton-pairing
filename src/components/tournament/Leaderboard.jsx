export default function Leaderboard({ leaderboard, pairs, finalistTeams = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-bold text-slate-700">Standings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide w-6">#</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Team</th>
              <th className="text-center px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">P</th>
              <th className="text-center px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">W</th>
              <th className="text-center px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">L</th>
              <th className="text-center px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">SF</th>
              <th className="text-center px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">SA</th>
              <th className="text-center px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Pts</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((row, i) => {
              const pair = pairs.find((p) => p.courtNumber === row.team)
              const isFinalist = finalistTeams.includes(row.team)
              const isTop2 = i < 2
              return (
                <tr
                  key={row.team}
                  className={`border-b border-slate-50 transition-colors ${
                    isFinalist
                      ? 'bg-amber-50'
                      : isTop2 && row.played > 0
                      ? 'bg-blue-50/50'
                      : ''
                  }`}
                >
                  <td className="px-4 py-2.5 text-slate-400 font-medium">{i + 1}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">Team {row.team}</span>
                      {isFinalist && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">Final</span>
                      )}
                      {isTop2 && !isFinalist && row.played > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">↑</span>
                      )}
                    </div>
                    {pair && (
                      <p className="text-xs text-slate-400 truncate">{pair.advanced} & {pair.intermediate}</p>
                    )}
                  </td>
                  <td className="text-center px-3 py-2.5 text-slate-600">{row.played}</td>
                  <td className="text-center px-3 py-2.5 font-semibold text-emerald-600">{row.wins}</td>
                  <td className="text-center px-3 py-2.5 text-slate-400">{row.losses}</td>
                  <td className="text-center px-3 py-2.5 text-slate-600">{row.sf}</td>
                  <td className="text-center px-3 py-2.5 text-slate-400">{row.sa}</td>
                  <td className="text-center px-3 py-2.5 font-bold text-slate-800">{row.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
        <p className="text-xs text-slate-400">P=Played · W=Won · L=Lost · SF=Score For · SA=Score Against · Pts=Points</p>
      </div>
    </div>
  )
}
