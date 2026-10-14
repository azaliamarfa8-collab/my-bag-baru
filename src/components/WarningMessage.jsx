import { TriangleAlert, CircleCheck } from "lucide-react";

export default function WarningMessage({ missing }) {
  if (missing.length === 0) {
    return (
      <div role="status" className="animate-fade-up flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
        <CircleCheck className="animate-pop mt-0.5 shrink-0 text-emerald-600" size={24} aria-hidden="true" />
        <div>
          <p className="font-bold">✓ Your bag is ready!</p>
          <p className="text-sm text-emerald-800">You’re all packed and ready to go.</p>
        </div>
      </div>
    );
  }
  return (
    <div role="status" className="animate-fade-up flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
      <TriangleAlert className="mt-0.5 shrink-0 text-amber-600" size={24} aria-hidden="true" />
      <div>
        {missing.length === 1 ? (
          <p className="font-bold">▲ You forgot your {missing[0].name.toLowerCase()}.</p>
        ) : (
          <>
            <p className="font-bold">▲ You forgot:</p>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {missing.map((m) => <li key={m.id}>{m.name}</li>)}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
