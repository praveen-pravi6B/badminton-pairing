import MatchCard from './MatchCard'
import ChampionBanner from './ChampionBanner'

const STAGE_ORDER = ['r1', 'semi', 'final', 'champion']

function stageReached(current, target) {
  return STAGE_ORDER.indexOf(current) >= STAGE_ORDER.indexOf(target)
}

function BracketSection({ title, emoji, matches, stageKey, pairs, isActive, isComplete, isPending, onUpdate, onSetWinner, gridCols }) {
  return (
    <div className="space-y-3">
      {/* Stage header */}
      <div className="flex items-center gap-2">
        <span>{emoji}</span>
        <h3 className="text-base font-bold text-slate-700">{title}</h3>
        {isActive && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">In Progress</span>
        )}
        {isComplete && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Complete ✓</span>
        )}
        {isPending && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-medium">Waiting...</span>
        )}
      </div>

      {/* Match cards or placeholder */}
      {isPending ? (
        <div className="text-sm text-slate-400 italic pl-1">Waiting for previous round to complete</div>
      ) : (
        <div className={`grid gap-4 ${gridCols}`}>
          {matches.map((match, i) => (
            <MatchCard
              key={match.id}
              match={match}
              pairs={pairs}
              stageKey={stageKey}
              label={matches.length === 1 ? 'Grand Final' : `Match ${i + 1}`}
              index={i}
              onUpdate={onUpdate}
              onSetWinner={onSetWinner}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function TournamentPanel({ pairs, stage, round1, semis, final, champion, onStart, onReset, onUpdate, onSetWinner }) {
  if (pairs.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6 text-center py-16 text-slate-400">
        <div className="text-5xl mb-3">🎯</div>
        <p className="text-sm">Generate teams in the Pairing tab first</p>
      </div>
    )
  }

  const r1Complete = round1.length > 0 && round1.every((m) => m.winner !== null)
  const semiComplete = semis.length > 0 && semis.every((m) => m.winner !== null)
  const finalComplete = stage === 'champion'

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-10">

      {/* Controls */}
      <div className="flex items-center gap-3">
        {stage === 'idle' ? (
          <button onClick={onStart} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Start Tournament
          </button>
        ) : (
          <button onClick={onReset} className="px-4 py-2 border border-slate-300 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
            Reset
          </button>
        )}
      </div>

      {/* Idle */}
      {stage === 'idle' && (
        <div className="text-center py-12 text-slate-400">
          <div className="text-4xl mb-3">🏆</div>
          <p className="text-sm">8 teams · Round 1 → Semis → Final</p>
        </div>
      )}

      {/* Bracket */}
      {stage !== 'idle' && (
        <div className="space-y-10">

          {/* Round 1 */}
          <BracketSection
            title="Round 1"
            emoji="⚔️"
            matches={round1}
            stageKey="round1"
            pairs={pairs}
            isActive={stage === 'r1'}
            isComplete={r1Complete}
            isPending={false}
            onUpdate={onUpdate}
            onSetWinner={onSetWinner}
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          />

          {/* Connector */}
          <div className="flex items-center gap-3 text-slate-300">
            <div className="flex-1 border-t border-dashed border-slate-200" />
            <span className="text-xs text-slate-400">winners advance</span>
            <div className="flex-1 border-t border-dashed border-slate-200" />
          </div>

          {/* Semis */}
          <BracketSection
            title="Semi Finals"
            emoji="🎯"
            matches={semis}
            stageKey="semis"
            pairs={pairs}
            isActive={stage === 'semi'}
            isComplete={semiComplete}
            isPending={!stageReached(stage, 'semi')}
            onUpdate={onUpdate}
            onSetWinner={onSetWinner}
            gridCols="grid-cols-1 sm:grid-cols-2"
          />

          {/* Connector */}
          <div className="flex items-center gap-3 text-slate-300">
            <div className="flex-1 border-t border-dashed border-slate-200" />
            <span className="text-xs text-slate-400">winners advance</span>
            <div className="flex-1 border-t border-dashed border-slate-200" />
          </div>

          {/* Final */}
          <BracketSection
            title="Final"
            emoji="🏆"
            matches={final ? [final] : []}
            stageKey="final"
            pairs={pairs}
            isActive={stage === 'final'}
            isComplete={finalComplete}
            isPending={!stageReached(stage, 'final')}
            onUpdate={onUpdate}
            onSetWinner={onSetWinner}
            gridCols="grid-cols-1 max-w-xs"
          />

          {/* Champion */}
          {stage === 'champion' && (
            <ChampionBanner champion={champion} pairs={pairs} />
          )}
        </div>
      )}
    </div>
  )
}
