export default function Backpack({ packedItems, ready, shakeKey, onUnpack }) {
  const empty = packedItems.length === 0;
  return (
    <section aria-labelledby="backpack-title" className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-zinc-200/70 sm:p-6">
      <h2 id="backpack-title" className="text-lg font-bold">Your Backpack</h2>

      <div key={shakeKey} className={`relative mx-auto mt-3 aspect-[5/6] w-full max-w-[18rem] rounded-[3rem] ${shakeKey ? "animate-shake" : ""} ${ready ? "animate-glow" : ""}`}>
        <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full drop-shadow-xl" aria-hidden="true">
          <path d="M72 40 C72 6 128 6 128 40" fill="none" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
          <rect x="20" y="104" width="24" height="84" rx="12" fill="#1e40af" />
          <rect x="156" y="104" width="24" height="84" rx="12" fill="#1e40af" />
          <rect x="35" y="28" width="130" height="204" rx="46" fill={ready ? "#10b981" : "#3b82f6"} className="transition-colors duration-500" />
          <path d="M35 100 Q100 126 165 100" fill="none" stroke="rgb(0 0 0 / .18)" strokeWidth="4" />
          <rect x="82" y="58" width="36" height="8" rx="4" fill="rgb(0 0 0 / .22)" />
          <rect x="52" y="120" width="96" height="94" rx="22" fill="#fff" fillOpacity=".92" />
        </svg>

        <div className="absolute flex flex-wrap content-center justify-center gap-1" style={{ left: "26%", right: "26%", top: "50%", height: "38%" }}>
          {packedItems.map((item) => {
            const Icon = item.icon;
            return (
              <button type="button" key={item.id} title={`Unpack ${item.name}`} aria-label={`Unpack ${item.name}`} onClick={() => onUnpack?.(item.id)} className="animate-pop grid h-7 w-7 cursor-pointer place-items-center rounded-lg bg-white text-sky-600 shadow ring-1 ring-zinc-200 hover:ring-sky-400">
                <Icon size={16} aria-hidden="true" />
              </button>
            );
          })}
          {empty && <span className="text-xs font-medium text-zinc-400">Empty</span>}
        </div>
      </div>

      <div className="mt-4 text-center" aria-live="polite">
        {empty ? (
          <>
            <p className="font-semibold">Your bag is empty</p>
            <p className="text-sm text-zinc-600">Start packing by selecting the items you need.</p>
          </>
        ) : (
          <p className="text-sm text-zinc-600">
            Packed: <span className="font-medium text-zinc-800">{packedItems.map((i) => i.name).join(", ")}</span>
          </p>
        )}
      </div>
    </section>
  );
}
