import type { TeachResponse } from "@/lib/types";

function ExampleList({ examples }: { examples: { target: string; source: string }[] }) {
  if (!examples?.length) return null;
  return (
    <div className="mt-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Przykłady użycia
      </p>
      {examples.map((ex, i) => (
        <div key={i} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
          <p className="font-medium text-slate-800">{ex.target}</p>
          <p className="mt-1 text-sm text-slate-500">{ex.source}</p>
        </div>
      ))}
    </div>
  );
}

export default function ResultCard({ result }: { result: TeachResponse }) {
  const t = result.translator;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="font-display text-3xl font-bold text-indigo-900">{t.translation}</h2>
        {t.partOfSpeech && (
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            {t.partOfSpeech}
          </span>
        )}
      </div>

      {t.usageNote && (
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.usageNote}</p>
      )}

      {t.correction && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            Poprawka
          </p>
          <p className="mt-2 text-sm text-slate-400 line-through">{t.correction.original}</p>
          <p className="font-semibold text-slate-800">{t.correction.corrected}</p>
          <p className="mt-2 text-sm text-slate-600">{t.correction.explanation}</p>
        </div>
      )}

      <ExampleList examples={t.examples} />
    </div>
  );
}
