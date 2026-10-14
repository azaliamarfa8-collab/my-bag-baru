import { Check } from "lucide-react";

export default function ItemCard({ item, checked, essential, onToggle }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 active:scale-[.98] ${
        checked ? "border-sky-300 bg-sky-50 shadow-sm" : "border-zinc-200 bg-white"
      }`}
    >
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${checked ? "bg-sky-500 text-white" : "bg-zinc-100 text-zinc-600"}`}>
        <Icon size={22} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">{item.name}</span>
        <span className="block text-xs text-zinc-500">
          {essential ? "Essential" : "Optional"}{checked ? " · Packed" : ""}
        </span>
      </span>
      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-all ${checked ? "border-sky-500 bg-sky-500 text-white" : "border-zinc-300"}`}>
        {checked && <Check size={14} strokeWidth={3} className="animate-pop" aria-hidden="true" />}
      </span>
    </button>
  );
}
