"use client";

import type { Mode } from "@/lib/types";

const TABS: { mode: Mode; label: string; hint: string }[] = [
  { mode: "translator", label: "Tłumacz", hint: "słowo, fraza lub zdanie do sprawdzenia" },
  { mode: "grammar", label: "Gramatyka", hint: "pytanie o zjawisko gramatyczne" },
];

export default function ModeTabs({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div role="tablist" aria-label="Tryb pracy" className="flex gap-2">
      {TABS.map((tab) => {
        const active = tab.mode === mode;
        return (
          <button
            key={tab.mode}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.mode)}
            className={[
              "rounded-t-md border-b-2 px-4 py-2 text-left transition-colors",
              active
                ? "border-pen bg-white/70 text-ink"
                : "border-transparent text-ink/50 hover:text-ink/80",
            ].join(" ")}
          >
            <span className="block font-display text-lg leading-none">{tab.label}</span>
            <span className="mt-1 block text-xs text-ink/50">{tab.hint}</span>
          </button>
        );
      })}
    </div>
  );
}
