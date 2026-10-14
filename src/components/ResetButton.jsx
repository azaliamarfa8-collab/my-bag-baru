import { RotateCcw } from "lucide-react";

export default function ResetButton({ onReset, tick }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-100 active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
    >
      <RotateCcw key={tick} size={16} aria-hidden="true" className={tick ? "animate-spin-once" : ""} />
      Reset Bag
    </button>
  );
}
