"use client";

import { LANGUAGES, type LangCode } from "@/lib/languages";

interface LanguageBarProps {
  sourceLang: LangCode;
  targetLang: LangCode;
  onSourceChange: (code: LangCode) => void;
  onTargetChange: (code: LangCode) => void;
  onSwap: () => void;
}

const FLAG: Record<LangCode, string> = {
  pl: "🇵🇱",
  en: "🇬🇧",
  it: "🇮🇹",
  fr: "🇫🇷",
};

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
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as LangCode)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 font-medium text-slate-800 shadow-sm transition-all hover:border-indigo-300 hover:shadow focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {FLAG[lang.code]} {lang.label} ({lang.nativeLabel})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
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
      <div className="flex-1 min-w-[200px]">
        <LanguageSelect value={sourceLang} onChange={onSourceChange} label="Tłumacz z" />
      </div>

      <button
        type="button"
        onClick={onSwap}
        aria-label="Zamień kierunek tłumaczenia"
        title="Zamień kierunek"
        className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 hover:shadow hover:scale-105 active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </button>

      <div className="flex-1 min-w-[200px]">
        <LanguageSelect value={targetLang} onChange={onTargetChange} label="Tłumacz na" />
      </div>
    </div>
  );
}
