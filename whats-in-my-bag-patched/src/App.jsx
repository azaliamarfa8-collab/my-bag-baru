import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { bagModes } from "./data/bagModes.js";
import Header from "./components/Header.jsx";
import ModeSelector from "./components/ModeSelector.jsx";
import ItemChecklist from "./components/ItemChecklist.jsx";
import Backpack from "./components/Backpack.jsx";
import WarningMessage from "./components/WarningMessage.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import BagStatus from "./components/BagStatus.jsx";
import ResetButton from "./components/ResetButton.jsx";
import { AddItemForm, PresetPanel, Reminders, ShareButtons } from "./components/BagExtras.jsx";

const STORAGE_KEY = "whats-in-my-bag:v1";
const EMPTY = Object.fromEntries(Object.keys(bagModes).map((k) => [k, []]));

function loadSaved() {
  try {
    return { ...EMPTY, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return EMPTY;
  }
}

// Same load/save pattern as `checked`, for the extra features (separate keys, old data untouched).
function useStored(key, fallback) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
  }, [key, value]);
  return [value, setValue];
}

export default function App() {
  const [modeKey, setModeKey] = useState("campus");
  const [checked, setChecked] = useState(loadSaved); // separate selection per mode
  const [resetTick, setResetTick] = useState(0);
  const [custom, setCustom] = useStored("whats-in-my-bag:custom:v1", {}); // { modeKey: [{ id, name, category, essential }] }
  const [presets, setPresets] = useStored("whats-in-my-bag:presets:v1", []); // [{ id, name, modeKey, ids }]
  const [forgot, setForgot] = useStored("whats-in-my-bag:forgot:v1", []); // item ids marked "often forgotten"
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch { /* ignore */ }
  }, [checked]);

  const base = bagModes[modeKey];
  const extra = (custom[modeKey] || []).map((c) => ({ ...c, icon: Package, custom: true }));
  const mode = {
    ...base,
    items: [...base.items, ...extra],
    essentials: [...base.essentials, ...extra.filter((c) => c.essential).map((c) => c.id)],
  };
  const selected = checked[modeKey] || [];
  const packedItems = mode.items.filter((i) => selected.includes(i.id));
  const missing = mode.items.filter((i) => mode.essentials.includes(i.id) && !selected.includes(i.id));
  const essTotal = mode.essentials.length;
  const essDone = essTotal - missing.length;
  const status =
    packedItems.length === 0 ? "Empty"
    : missing.length === 0 ? "Ready"
    : missing.length === 1 ? "Almost ready"
    : "Packing";

  const toggle = (id) =>
    setChecked((c) => {
      const cur = c[modeKey] || [];
      return { ...c, [modeKey]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] };
    });

  const reminders = mode.items.filter((i) => forgot.includes(i.id) && !selected.includes(i.id));
  const toggleForgot = (id) => setForgot((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const saveCustom = (item) => {
    setCustom((c) => {
      const list = c[modeKey] || [];
      return { ...c, [modeKey]: list.some((x) => x.id === item.id) ? list.map((x) => (x.id === item.id ? item : x)) : [...list, item] };
    });
    setEditingId(null);
  };
  const deleteCustom = (id) => {
    setCustom((c) => ({ ...c, [modeKey]: (c[modeKey] || []).filter((x) => x.id !== id) }));
    setChecked((c) => ({ ...c, [modeKey]: (c[modeKey] || []).filter((x) => x !== id) }));
    setForgot((f) => f.filter((x) => x !== id));
    setEditingId(null);
  };

  const modePresets = presets.filter((p) => p.modeKey === modeKey);
  const savePreset = (name) =>
    setPresets((p) => [
      ...p.filter((x) => !(x.modeKey === modeKey && x.name.toLowerCase() === name.toLowerCase())),
      { id: `preset-${Date.now()}`, name, modeKey, ids: selected },
    ]);
  const applyPreset = (p) =>
    setChecked((c) => ({ ...c, [modeKey]: p.ids.filter((id) => mode.items.some((i) => i.id === id)) }));
  const deletePreset = (id) => setPresets((p) => p.filter((x) => x.id !== id));

  const reset = () => {
    setChecked((c) => ({ ...c, [modeKey]: [] }));
    setResetTick((t) => t + 1);
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
        <Header />
        <ModeSelector modes={bagModes} active={modeKey} onChange={setModeKey} />

        <main className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            <ItemChecklist
              mode={mode} modeKey={modeKey} selected={selected} onToggle={toggle}
              forgot={forgot} onToggleForgot={toggleForgot} onEdit={setEditingId} onDelete={deleteCustom}
            />
            <AddItemForm
              key={editingId ?? "new"}
              editing={extra.find((c) => c.id === editingId)}
              onSave={saveCustom}
              onCancel={() => setEditingId(null)}
            />
          </div>
          <div className="space-y-4 lg:col-span-2">
            <Backpack packedItems={packedItems} ready={status === "Ready"} shakeKey={resetTick} onUnpack={toggle} />
            <WarningMessage missing={missing} />
            <Reminders items={reminders} onRemove={toggleForgot} />
            <ProgressBar packed={packedItems.length} total={mode.items.length} />
            <BagStatus packed={packedItems.length} total={mode.items.length} essDone={essDone} essTotal={essTotal} status={status} />
            <ResetButton onReset={reset} tick={resetTick} />
            <PresetPanel presets={modePresets} canSave={packedItems.length > 0} onSave={savePreset} onApply={applyPreset} onDelete={deletePreset} />
            <ShareButtons mode={mode} selected={selected} status={status} />
          </div>
        </main>

        <footer className="border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500">
          <p className="font-semibold text-zinc-700">What’s In My Bag?</p>
          <p>“Pack smart. Never forget what matters.”</p>
          <p className="mt-1 text-xs">Made for smarter packing.</p>
        </footer>
      </div>
    </div>
  );
}
