export default function PairingControls({
  isAdmin,
  isUnequal,
  advancedCount,
  intermediateCount,
  hasPairs,
  onGenerate,
  onReshuffle,
}) {
  return (
    <div className="space-y-3">
      {isUnequal && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">⚠️</span>
          <div className="text-sm text-amber-800">
            <span className="font-medium">Unequal players: </span>
            {advancedCount} captains vs {intermediateCount} partners.{' '}
            {Math.abs(advancedCount - intermediateCount)} player
            {Math.abs(advancedCount - intermediateCount) !== 1 ? 's' : ''} will sit out.
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {!hasPairs ? (
              <button
                onClick={onGenerate}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Pairs
              </button>
            ) : (
              <button
                onClick={onReshuffle}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reshuffle
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
