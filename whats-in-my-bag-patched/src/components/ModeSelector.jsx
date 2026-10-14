export default function ModeSelector({ modes, active, onChange }) {
  return (
    <section aria-labelledby="mode-title">
      <h2 id="mode-title" className="mb-3 text-lg font-bold">Choose your mode</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(modes).map(([key, mode]) => {
          const Icon = mode.icon;
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(key)}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                isActive
                  ? "border-sky-500 bg-sky-50 shadow-md shadow-sky-500/10"
                  : "border-transparent bg-white shadow-sm"
              }`}
            >
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-colors ${isActive ? "bg-sky-500 text-white" : "bg-zinc-100 text-zinc-600"}`}>
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold uppercase tracking-wide">{mode.name}</span>
                <span className="block text-sm text-zinc-600">{mode.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
