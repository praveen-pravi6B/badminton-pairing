export default function RoundBadge({ roundNumber }) {
  if (roundNumber === 0) return null
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
      Round {roundNumber}
    </span>
  )
}
