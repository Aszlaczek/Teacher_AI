import TeacherPanel from "@/components/TeacherPanel";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M12 22a10 10 0 0 0 0-20" />
            </svg>
            Tłumacz AI
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Teacher<span className="text-indigo-600">_AI</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-500">
            Wpisz słowo, zdanie albo frazę — przetłumaczymy, pokażemy przykłady
            i poprawimy błędy. Obsługujemy polski, angielski, włoski i francuski.
          </p>
        </div>

        <TeacherPanel />
      </div>
    </main>
  );
}
