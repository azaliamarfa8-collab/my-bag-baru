import { Backpack } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          WHAT'S IN MY BAG?
        </h1>
        <p className="mt-1 text-sm text-zinc-600 sm:text-base">
          Pack smart. Never forget what matters.
        </p>
      </div>
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/30 sm:h-14 sm:w-14">
        <Backpack size={28} aria-label="Backpack" />
      </div>
    </header>
  );
}
