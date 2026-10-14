import { Bell, Pencil, Trash2 } from "lucide-react";
import ItemCard from "./ItemCard.jsx";

const MINI = "rounded-md p-1.5 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-sky-500";

export default function ItemChecklist({ mode, modeKey, selected, onToggle, forgot = [], onToggleForgot, onEdit, onDelete }) {
  return (
    <section aria-labelledby="checklist-title" className="rounded-3xl bg-white/60 p-4 shadow-sm ring-1 ring-zinc-200/70 sm:p-6">
      <h2 id="checklist-title" className="text-lg font-bold">What’s in your bag?</h2>
      <p className="mb-4 text-sm text-zinc-600">{mode.name}: tap an item once it’s packed.</p>
      <div key={modeKey} className="animate-fade-up grid grid-cols-1 gap-3 sm:grid-cols-2">
        {mode.items.map((item) => (
          <div key={item.id}>
            <ItemCard
              item={item}
              checked={selected.includes(item.id)}
              essential={mode.essentials.includes(item.id)}
              onToggle={() => onToggle(item.id)}
            />
            <div className="mt-1 flex items-center justify-end gap-0.5 px-1 text-xs text-zinc-500">
              {item.custom && <span className="mr-auto">{item.category}</span>}
              <button type="button" aria-pressed={forgot.includes(item.id)} title="Often forgotten: remind me" aria-label={`Remind me about ${item.name}`} onClick={() => onToggleForgot(item.id)} className={`${MINI} ${forgot.includes(item.id) ? "bg-sky-100 text-sky-600" : "text-zinc-400"}`}>
                <Bell size={14} aria-hidden="true" />
              </button>
              {item.custom && (
                <>
                  <button type="button" title="Edit item" aria-label={`Edit ${item.name}`} onClick={() => onEdit(item.id)} className={`${MINI} text-zinc-500`}>
                    <Pencil size={14} aria-hidden="true" />
                  </button>
                  <button type="button" title="Delete item" aria-label={`Delete ${item.name}`} onClick={() => onDelete(item.id)} className={`${MINI} text-red-500`}>
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
