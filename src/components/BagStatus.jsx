const STYLES = {
  Empty: "bg-zinc-100 text-zinc-700 ring-zinc-300",
  Packing: "bg-sky-100 text-sky-800 ring-sky-300",
  "Almost ready": "bg-amber-100 text-amber-900 ring-amber-300",
  Ready: "bg-emerald-100 text-emerald-900 ring-emerald-300",
};

export default function BagStatus({ packed, total, essDone, essTotal, status }) {
  return (
    <section aria-labelledby="status-title" className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70">
      <h2 id="status-title" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Bag Status</h2>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between"><dt className="text-zinc-600">Items packed</dt><dd className="font-bold">{packed} / {total}</dd></div>
        <div className="flex justify-between"><dt className="text-zinc-600">Essentials</dt><dd className="font-bold">{essDone} / {essTotal}</dd></div>
        <div className="flex items-center justify-between">
          <dt className="text-zinc-600">Bag status</dt>
          <dd key={status} className={`animate-pop rounded-full px-3 py-1 text-xs font-bold ring-1 ${STYLES[status]}`}>{status}</dd>
        </div>
      </dl>
    </section>
  );
}
