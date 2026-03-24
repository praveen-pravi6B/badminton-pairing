import PairingControls from './PairingControls'
import PairCard from './PairCard'

export default function PairingPanel({
  advancedPlayers,
  intermediatePlayers,
  isUnequal,
  pairs,
  unpaired,
  roundNumber,
  onGenerate,
  onReshuffle,
}) {
  const hasPairs = pairs.length > 0
  const hasUnpaired =
    (unpaired.advanced && unpaired.advanced.length > 0) ||
    (unpaired.intermediate && unpaired.intermediate.length > 0)

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      <PairingControls
        isUnequal={isUnequal}
        advancedCount={advancedPlayers.length}
        intermediateCount={intermediatePlayers.length}
        hasPairs={hasPairs}
        onGenerate={() => onGenerate(advancedPlayers, intermediatePlayers)}
        onReshuffle={() => onReshuffle(advancedPlayers, intermediatePlayers)}
      />

      {hasPairs && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pairs.map((pair, i) => (
              <PairCard
                key={`r${roundNumber}-c${i}`}
                pair={pair}
                index={i}
                roundNumber={roundNumber}
              />
            ))}
          </div>

          {hasUnpaired && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-600 mb-3">Sitting Out</h3>
              <div className="flex flex-wrap gap-2">
                {unpaired.advanced.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-full"
                  >
                    {name} <span className="text-xs text-blue-400">(adv)</span>
                  </span>
                ))}
                {unpaired.intermediate.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-full"
                  >
                    {name} <span className="text-xs text-emerald-400">(int)</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!hasPairs && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-5xl mb-3">🏸</div>
          <p className="text-sm">Click "Generate Pairs" to assign courts</p>
        </div>
      )}
    </div>
  )
}
