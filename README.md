# Teacher_AI

Osobisty nauczyciel języków w Next.js. Wpisujesz słowo, zdanie albo pytanie
o gramatykę — aplikacja łączy się z Google Gemini API i zwraca tłumaczenie,
przykłady użycia, poprawki gramatyczne albo wyjaśnienie zasady.

## Dwa tryby

- **Tłumacz** — tłumaczy słowo lub frazę i podaje 2–3 przykładowe zdania
  z tłumaczeniem. Jeśli wpiszesz gotowe zdanie z błędem, poprawia je
  i tłumaczy dlaczego.
- **Gramatyka** — wyjaśnia zjawiska gramatyczne w wybranym języku
  docelowym ("dlaczego mówi się tak, a nie inaczej"), podaje regułę
  ogólną i przykłady.

Dostępne języki: **polski, angielski, włoski, francuski** — zawsze wybierasz
osobno język, z którego piszesz, i język docelowy; oba są stale widoczne
na ekranie.

## Architektura

```
app/
  page.tsx              — strona główna
  layout.tsx             — fonty, metadata
  api/teach/route.ts     — server-side endpoint wywołujący Gemini API
components/
  TeacherPanel.tsx        — stan formularza + wywołanie /api/teach
  LanguageBar.tsx         — wybór języka źródłowego/docelowego
  ModeTabs.tsx            — przełącznik tłumacz / gramatyka
  ResultCard.tsx          — renderowanie wyniku
lib/
  languages.ts            — lista 4 obsługiwanych języków
  prompts.ts               — prompty systemowe dla obu trybów + parsowanie JSON
  types.ts                 — wspólne typy TypeScript
```

Klucz API nigdy nie trafia do przeglądarki — cała komunikacja z Gemini
odbywa się w `app/api/teach/route.ts`, który działa wyłącznie po stronie
serwera (`export const runtime = "nodejs"`).

## Uruchomienie lokalne

```bash
npm install
cp .env.local.example .env.local
# wklej swój klucz do .env.local: GEMINI_API_KEY=AIza...
npm run dev
```

Klucz API Gemini jest **darmowy** — pobierz go na:
https://aistudio.google.com/apikey

Aplikacja wystartuje na `http://localhost:3000`.

## Wypchnięcie na GitHub

Repozytorium lokalne jest już zainicjowane z pierwszym commitem. Aby
wypchnąć je na swoje konto:

```bash
gh repo create Teacher_AI --public --source=. --remote=origin --push
```

albo bez `gh`, po utworzeniu pustego repo `Teacher_AI` na github.com:

```bash
git remote add origin https://github.com/<twoj-login>/Teacher_AI.git
git branch -M main
git push -u origin main
```

## Możliwe rozszerzenia

- Historia zapytań zapisywana lokalnie (localStorage).
- Wsparcie dla wymowy (audio) w przykładach.
- Tryb "fiszek" generowany z historii tłumaczeń.
