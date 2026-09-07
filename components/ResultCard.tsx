import type { TeachResponse } from "@/lib/types";

function ExampleList({ examples }: { examples: { target: string; source: string }[] }) {
  if (!examples?.length) return null;
  return (
    <ul className="mt-3 space-y-2">
      {examples.map((ex, i) => (
        <li key={i} className="border-l-2 border-paperLine pl-3">
          <p className="font-medium text-ink">{ex.target}</p>
          <p className="text-sm text-ink/60">{ex.source}</p>
        </li>
      ))}
    </ul>
  );
}

export default function ResultCard({ result }: { result: TeachResponse }) {
  if (result.mode === "translator" && result.translator) {
    const t = result.translator;
    return (
      <div className="rounded-lg border border-paperLine bg-white/70 p-5 shadow-sm">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="font-display text-2xl text-chalkDark">{t.translation}</h2>
          {t.partOfSpeech && (
            <span className="rounded-full bg-chalk/10 px-2 py-0.5 text-xs text-chalk">
              {t.partOfSpeech}
            </span>
          )}
        </div>

        {t.usageNote && <p className="mt-2 text-sm text-ink/70">{t.usageNote}</p>}

        {t.correction && (
          <div className="mt-4 rounded-md border border-pen/30 bg-penLight/40 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-pen/80">
              Poprawka
            </p>
            <p className="mt-1 text-sm text-ink/50 line-through decoration-pen/50">
              {t.correction.original}
            </p>
            <p className="font-medium text-ink">{t.correction.corrected}</p>
            <p className="mt-1 text-sm text-ink/70">{t.correction.explanation}</p>
          </div>
        )}

        {t.examples?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
              Przykłady użycia
            </p>
            <ExampleList examples={t.examples} />
          </div>
        )}
      </div>
    );
  }

  if (result.mode === "grammar" && result.grammar) {
    const g = result.grammar;
    return (
      <div className="rounded-lg border border-paperLine bg-white/70 p-5 shadow-sm">
        <p className="whitespace-pre-wrap leading-relaxed text-ink">{g.explanation}</p>

        <div className="mt-4 rounded-md border border-chalk/30 bg-chalk/5 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-chalk/80">
            Reguła do zapamiętania
          </p>
          <p className="mt-1 font-medium text-ink">{g.rule}</p>
        </div>

        {g.examples?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
              Przykłady
            </p>
            <ExampleList examples={g.examples} />
          </div>
        )}
      </div>
    );
  }

  return null;
}
