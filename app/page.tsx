import TeacherPanel from "@/components/TeacherPanel";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* czerwona linia marginesu, jak w zeszycie w linie */}
      <div
        className="pointer-events-none absolute left-10 top-0 h-full w-px bg-margin/40 sm:left-16"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-start px-6 py-16 pl-16 sm:px-10 sm:pl-24">
        <p className="text-sm text-ink/50">Osobisty nauczyciel języków</p>
        <h1 className="mt-1 font-display text-4xl leading-tight text-chalkDark sm:text-5xl">
          Teacher_AI
        </h1>
        <p className="mt-3 max-w-lg text-ink/70">
          Wpisz słowo, zdanie albo pytanie o gramatykę — w polskim, angielskim,
          włoskim lub francuskim. Wybierz tryb: tłumacz poda znaczenie i
          przykłady albo poprawi twoje zdanie; gramatyka wyjaśni, dlaczego mówi
          się tak, a nie inaczej.
        </p>

        <div className="mt-10 w-full">
          <TeacherPanel />
        </div>
      </div>
    </main>
  );
}
