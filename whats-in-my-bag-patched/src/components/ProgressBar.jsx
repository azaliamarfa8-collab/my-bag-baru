export default function ProgressBar({ packed, total }) {
  const pct = total ? Math.round((packed / total) * 100) : 0;
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70">
      <div className="flex items-baseline justify-between text-sm">
        <span><strong className="text-base">{packed} / {total}</strong> items packed</span>
        <span className="font-semibold text-zinc-600">{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Packing progress"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-200"
      >
        <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
