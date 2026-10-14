import { useState } from "react";
import { BellRing, Copy, Download, Plus, Save, Trash2, X } from "lucide-react";

const CATEGORIES = ["Electronics", "Documents", "Clothing", "Health", "Other"];
const CARD = "rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70";
const FIELD = "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";
// Same look as ResetButton
const BTN = "inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-100 active:scale-[.98] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

// Feature 9: reminder for "often forgotten" items that are not packed yet.
export function Reminders({ items, onRemove }) {
  if (items.length === 0) return null;
  return (
    <div role="status" className="animate-fade-up flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sky-900">
      <BellRing className="mt-0.5 shrink-0 text-sky-600" size={24} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-bold">Don’t forget again!</p>
        <ul className="mt-1 space-y-1 text-sm">
          {items.map((i) => (
            <li key={i.id} className="flex items-center justify-between gap-2">
              <span>You often forget your {i.name.toLowerCase()}.</span>
              <button type="button" aria-label={`Remove reminder for ${i.name}`} title="Remove reminder" onClick={() => onRemove(i.id)} className="rounded-md p-1 text-sky-700 hover:bg-sky-100">
                <X size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Feature 4: add / edit a custom item (parent remounts it via `key` when `editing` changes).
export function AddItemForm({ editing, onSave, onCancel }) {
  const [name, setName] = useState(editing?.name ?? "");
  const [category, setCategory] = useState(editing?.category ?? CATEGORIES[0]);
  const [essential, setEssential] = useState(editing?.essential ?? false);

  const submit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    onSave({ id: editing?.id ?? `custom-${Date.now()}`, name: n, category, essential });
    if (!editing) setName("");
  };

  return (
    <form onSubmit={submit} aria-labelledby="add-item-title" className={CARD}>
      <h2 id="add-item-title" className="text-lg font-bold">{editing ? "Edit your item" : "Add your own item"}</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Item name" aria-label="Item name" className={`${FIELD} sm:col-span-3`} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category" className={FIELD}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={essential ? "essential" : "optional"} onChange={(e) => setEssential(e.target.value === "essential")} aria-label="Essential or optional" className={FIELD}>
          <option value="optional">Optional</option>
          <option value="essential">Essential</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" disabled={!name.trim()} className={`${BTN} flex-1`}>
            <Plus size={16} aria-hidden="true" />{editing ? "Save" : "Add"}
          </button>
          {editing && <button type="button" onClick={onCancel} className={BTN}>Cancel</button>}
        </div>
      </div>
    </form>
  );
}

// Feature 2: save / use / delete presets (parent passes only the presets of the active mode).
export function PresetPanel({ presets, canSave, onSave, onApply, onDelete }) {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    if (presets.some((p) => p.name.toLowerCase() === n.toLowerCase()) && !window.confirm(`Replace the existing preset "${n}"?`)) return;
    onSave(n);
    setName("");
  };

  return (
    <section aria-labelledby="preset-title" className={CARD}>
      <h2 id="preset-title" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Bag Presets</h2>
      <form onSubmit={submit} className="mt-3 flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Preset name" aria-label="Preset name" className={FIELD} />
        <button type="submit" disabled={!canSave || !name.trim()} title={canSave ? "Save packed items as preset" : "Pack at least one item first"} className={BTN}>
          <Save size={16} aria-hidden="true" />Save
        </button>
      </form>
      {presets.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500">No presets for this mode yet.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {presets.map((p) => (
            <li key={p.id} className="flex items-center gap-2 text-sm">
              <span className="min-w-0 flex-1 truncate font-medium">{p.name} <span className="text-xs font-normal text-zinc-500">({p.ids.length} items)</span></span>
              <button type="button" onClick={() => onApply(p)} className="rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-600">Use</button>
              <button type="button" aria-label={`Delete preset ${p.name}`} title="Delete preset" onClick={() => onDelete(p.id)} className="rounded-md p-1.5 text-red-500 hover:bg-zinc-100">
                <Trash2 size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// Feature 8: copy / download the checklist as plain text (browser APIs only).
export function ShareButtons({ mode, selected, status }) {
  const [msg, setMsg] = useState("");
  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(""), 2000); };

  const build = () => {
    const packed = mode.items.filter((i) => selected.includes(i.id)).length;
    const missing = mode.items.filter((i) => mode.essentials.includes(i.id) && !selected.includes(i.id));
    return [
      `${mode.name}: Bag Checklist`,
      `Status: ${status} (${packed}/${mode.items.length} packed)`,
      ...(missing.length ? [`Missing essentials: ${missing.map((m) => m.name).join(", ")}`] : []),
      "",
      ...mode.items.map((i) => `[${selected.includes(i.id) ? "x" : " "}] ${i.name} (${mode.essentials.includes(i.id) ? "Essential" : "Optional"})`),
    ].join("\n");
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(build()); flash("Copied!"); } catch { flash("Copy failed"); }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([build()], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${mode.name.toLowerCase().replace(/\s+/g, "-")}-checklist.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={copy} className={BTN}><Copy size={16} aria-hidden="true" />Copy</button>
        <button type="button" onClick={download} className={BTN}><Download size={16} aria-hidden="true" />Download TXT</button>
      </div>
      <p role="status" className="mt-1 h-4 text-center text-xs text-zinc-500">{msg}</p>
    </div>
  );
}
