export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <span className="text-2xl">🏸</span>
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">Badminton Pairing</h1>
          <p className="text-xs text-slate-500">Mixed doubles court assignment</p>
        </div>
      </div>
    </header>
  )
}
