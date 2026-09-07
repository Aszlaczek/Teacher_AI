"use client";

import { useState } from "react";
import LanguageBar from "./LanguageBar";
import ResultCard from "./ResultCard";
import type { LangCode } from "@/lib/languages";
import type { TeachResponse } from "@/lib/types";

export default function TeacherPanel() {
  const [sourceLang, setSourceLang] = useState<LangCode>("pl");
  const [targetLang, setTargetLang] = useState<LangCode>("en");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TeachResponse | null>(null);

  function handleSwap() {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  }

  function handleSourceChange(code: LangCode) {
    setSourceLang(code);
    if (code === targetLang) setTargetLang(sourceLang);
  }

  function handleTargetChange(code: LangCode) {
    setTargetLang(code);
    if (code === sourceLang) setSourceLang(targetLang);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/teach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sourceLang, targetLang, input: input.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Nieznany błąd serwera.");
      }
      setResult(data as TeachResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Coś poszło nie tak.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <LanguageBar
        sourceLang={sourceLang}
        targetLang={targetLang}
        onSourceChange={handleSourceChange}
        onTargetChange={handleTargetChange}
        onSwap={handleSwap}
      />

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50">
        <label htmlFor="teach-input" className="mb-2 block text-sm font-medium text-slate-500">
          Wpisz słowo, frazę albo zdanie
        </label>
        <textarea
          id="teach-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'np. \u201Eserendipity\u201D albo \u201EShe don\u2019t like coffee.\u201D'}
          rows={3}
          maxLength={800}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-300">{input.length}/800</span>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Tłumaczę…
              </span>
            ) : (
              "Przetłumacz"
            )}
          </button>
        </div>
      </form>

      <div className="space-y-4" aria-live="polite">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}
