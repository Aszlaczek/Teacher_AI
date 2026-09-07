"use client";

import { LANGUAGES, type LangCode } from "@/lib/languages";

interface LanguageBarProps {
  sourceLang: LangCode;
  targetLang: LangCode;
  onSourceChange: (code: LangCode) => void;
  onTargetChange: (code: LangCode) => void;
  onSwap: () => void;
}

function LanguageSelect({
  value,
  onChange,
  label,
}: {
  value: LangCode;
  onChange: (code: LangCode) => void;
  label: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-ink/60">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as LangCode)}
        className="min-w-[9.5rem] rounded-md border border-paperLine bg-white/70 px-3 py-2 font-medium text-ink shadow-sm transition-colors hover:border-chalk focus:border-chalk"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function LanguageBar({
  sourceLang,
  targetLang,
  onSourceChange,
  onTargetChange,
  onSwap,
}: LanguageBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <LanguageSelect value={sourceLang} onChange={onSourceChange} label="Piszę po" />

      <button
        type="button"
        onClick={onSwap}
        aria-label="Zamień kierunek tłumaczenia"
        title="Zamień kierunek"
        className="mb-[3px] flex h-9 w-9 items-center justify-center rounded-full border border-paperLine bg-white/70 text-chalk transition-transform hover:scale-105 hover:border-chalk"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 7h11m0 0-4-4m4 4-4 4M17 17H6m0 0 4 4m-4-4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <LanguageSelect value={targetLang} onChange={onTargetChange} label="Tłumacz na" />
    </div>
  );
}
