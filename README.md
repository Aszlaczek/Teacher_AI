# Teacher_AI

*[English](#english) | [Polski](#polski)*

---

<a id="english"></a>
## English

A personal language translator and corrector built with Next.js. You type a word, phrase, or full sentence in one of four languages, and the app — via the Google Gemini API — returns a translation, typical usage examples, and, if the sentence contains a mistake, a correction along with an explanation of what was wrong.

### What it does

One text field, two scenarios:

- **A single word or phrase** → translation into the chosen target language, part of speech (if applicable), and 2-3 example sentences with translation.
- **A complete sentence** → grammar and syntax check; if the sentence contains an error, the app shows the corrected version and a short explanation in the language you're writing from.

Supported languages: **Polish, English, Italian, French** — source and target are selected independently, with a button to swap direction; both are always visible above the input field.

> Note: this is a single-mode version — translation with correction only. A separate "grammar" mode (explaining grammar rules, e.g. "why do we say it this way and not another") is not currently implemented in the UI or the API — see [Possible extensions](#possible-extensions).

### Tech stack

- **Next.js 16** (App Router) + React 18 + TypeScript
- **Tailwind CSS** for styling
- **Google Gemini API** as the language engine, called exclusively server-side

### Architecture

```
app/
  page.tsx              — home page, header and panel embedding
  layout.tsx             — fonts (Inter + Fraunces), metadata
  globals.css             — global styles, background
  api/teach/route.ts      — server-side endpoint calling the Gemini API
components/
  TeacherPanel.tsx         — form state (languages, text, result) + call to /api/teach
  LanguageBar.tsx           — source/target language selection + direction swap
  ResultCard.tsx            — rendering the translation, correction and examples
lib/
  languages.ts               — list of the 4 supported languages (code + labels)
  prompts.ts                  — system prompt for Gemini + safe JSON parsing
  types.ts                     — shared TypeScript types (API request/response)
```

The API key never reaches the browser — all communication with Gemini happens in `app/api/teach/route.ts`, which runs exclusively server-side (`export const runtime = "nodejs"`).

### Resilience against overloaded models

`route.ts` tries several free Gemini models in sequence (`gemini-2.5-flash`, `gemini-2.5-flash-lite`, `gemini-3.0-flash-preview`, `gemini-3.1-flash-lite-preview`) and returns the first successful response. If all of them fail, the user gets one clear error message instead of a blank screen.

### Running locally

```bash
npm install
cp .env.local.example .env.local
```

Paste your key into `.env.local`:

```
GEMINI_API_KEY=your-key
```

Get a free Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

```bash
npm run dev
```

The app will start on `http://localhost:3000`.

<a id="possible-extensions"></a>
### Possible extensions

- Bring back **grammar mode** — a separate view explaining grammar phenomena (rule + examples), alongside the existing translator mode.
- Query history saved locally (localStorage or a database).
- Pronunciation support (audio) for example sentences.
- A "flashcards" mode generated from translation history.

### License

No license set — add a `LICENSE` file if the repository is meant to be publicly reusable.

---

<a id="polski"></a>
## Polski

Osobisty tłumacz i korektor językowy zbudowany w Next.js. Wpisujesz słowo, frazę albo całe zdanie w jednym z czterech języków, a aplikacja — przez Google Gemini API — zwraca tłumaczenie, typowe przykłady użycia, a jeśli wpisane zdanie zawiera błąd, poprawia je i tłumaczy, na czym błąd polegał.

### Co robi

Jedno pole tekstowe, dwa scenariusze:

- **Pojedyncze słowo lub fraza** → tłumaczenie na wybrany język docelowy, część mowy (jeśli dotyczy) i 2-3 przykładowe zdania z tłumaczeniem.
- **Gotowe zdanie** → sprawdzenie poprawności gramatycznej i składniowej; jeśli zdanie zawiera błąd, aplikacja pokazuje poprawioną wersję i krótkie wyjaśnienie po języku, z którego piszesz.

Obsługiwane języki: **polski, angielski, włoski, francuski** — źródłowy i docelowy wybiera się osobno, z przyciskiem do zamiany kierunku; oba są zawsze widoczne nad polem do wpisywania tekstu.

> Uwaga: to jest wersja jednotrybowa — samo tłumaczenie z korektą. Osobny tryb "gramatyka" (wyjaśnianie zjawisk gramatycznych, np. "dlaczego mówi się tak, a nie inaczej") nie jest obecnie zaimplementowany w UI ani w API — patrz [Możliwe rozszerzenia](#możliwe-rozszerzenia-pl).

### Stos technologiczny

- **Next.js 16** (App Router) + React 18 + TypeScript
- **Tailwind CSS** do stylowania
- **Google Gemini API** jako silnik językowy, wywoływany wyłącznie po stronie serwera

### Architektura

```
app/
  page.tsx              — strona główna, nagłówek i osadzenie panelu
  layout.tsx             — fonty (Inter + Fraunces), metadata
  globals.css             — style globalne, tło
  api/teach/route.ts      — server-side endpoint wywołujący Gemini API
components/
  TeacherPanel.tsx         — stan formularza (języki, tekst, wynik) + wywołanie /api/teach
  LanguageBar.tsx           — wybór języka źródłowego/docelowego + zamiana kierunku
  ResultCard.tsx            — renderowanie tłumaczenia, poprawki i przykładów
lib/
  languages.ts               — lista 4 obsługiwanych języków (kod + etykiety)
  prompts.ts                  — prompt systemowy dla Gemini + bezpieczne parsowanie JSON
  types.ts                     — wspólne typy TypeScript (żądanie/odpowiedź API)
```

Klucz API nigdy nie trafia do przeglądarki — cała komunikacja z Gemini odbywa się w `app/api/teach/route.ts`, działającym wyłącznie po stronie serwera (`export const runtime = "nodejs"`).

### Odporność na przeciążone modele

`route.ts` próbuje kolejno kilka darmowych modeli Gemini (`gemini-2.5-flash`, `gemini-2.5-flash-lite`, `gemini-3.0-flash-preview`, `gemini-3.1-flash-lite-preview`) i zwraca pierwszą udaną odpowiedź. Jeśli wszystkie zawiodą, użytkownik dostaje jeden czytelny komunikat błędu zamiast pustego ekranu.

### Uruchomienie lokalne

```bash
npm install
cp .env.local.example .env.local
```

W `.env.local` wklej swój klucz:

```
GEMINI_API_KEY=twoj-klucz
```

Darmowy klucz do Gemini API pobierzesz na [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

```bash
npm run dev
```

Aplikacja wystartuje na `http://localhost:3000`.

<a id="możliwe-rozszerzenia-pl"></a>
### Możliwe rozszerzenia

- Przywrócenie trybu **gramatyka** — osobny widok wyjaśniający zjawiska gramatyczne (regułę + przykłady), obok istniejącego trybu tłumacza.
- Historia zapytań zapisywana lokalnie (localStorage albo baza danych).
- Wsparcie dla wymowy (audio) w przykładowych zdaniach.
- Tryb "fiszek" generowany z historii tłumaczeń.

### Licencja

Brak licencji ustawionej — dodaj plik `LICENSE`, jeśli repozytorium ma być publicznie reużywalne.
