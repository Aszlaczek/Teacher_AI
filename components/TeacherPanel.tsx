"use client";

import { useState } from "react";
import LanguageBar from "./LanguageBar";
import ModeTabs from "./ModeTabs";
import ResultCard from "./ResultCard";
import type { LangCode } from "@/lib/languages";
import type { Mode, TeachResponse } from "@/lib/types";

const PLACEHOLDERS: Record<Mode, string> = {
  translator: "np. „serendipity” albo „She don't like coffee.”",
  grammar: "np. „dlaczego 'have been' a nie 'have be'?”",
};

export default function TeacherPanel() {
  const [mode, setMode] = useState<Mode>("translator");
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
        body: JSON.stringify({ mode, sourceLang, targetLang, input: input.trim() }),
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
    <div className="w-full max-w-2xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <ModeTabs mode={mode} onChange={setMode} />
        <LanguageBar
          sourceLang={sourceLang}
          targetLang={targetLang}
          onSourceChange={handleSourceChange}
          onTargetChange={handleTargetChange}
          onSwap={handleSwap}
        />
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-paperLine bg-white/60 p-4 shadow-sm">
        <label htmlFor="teach-input" className="mb-2 block text-sm text-ink/60">
          {mode === "translator"
            ? "Wpisz słowo, frazę albo zdanie"
            : "Zadaj pytanie o gramatykę"}
        </label>
        <textarea
          id="teach-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={PLACEHOLDERS[mode]}
          rows={3}
          maxLength={800}
          className="w-full resize-none rounded-md border border-paperLine bg-white px-3 py-2 text-ink placeholder:text-ink/30 focus:border-chalk"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-ink/40">{input.length}/800</span>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-md bg-chalkDark px-5 py-2 font-medium text-paper transition-colors hover:bg-chalk disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Sprawdzam…" : mode === "translator" ? "Przetłumacz" : "Wyjaśnij"}
          </button>
        </div>
      </form>

      <div className="mt-5" aria-live="polite">
        {error && (
          <div className="rounded-md border border-pen/40 bg-penLight/40 p-3 text-sm text-pen">
            {error}
          </div>
        )}
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}
