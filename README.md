# Teacher_AI

Osobisty tłumacz i korektor językowy zbudowany w Next.js. Wpisujesz słowo,
frazę albo całe zdanie w jednym z czterech języków, a aplikacja — przez
Google Gemini API — zwraca tłumaczenie, typowe przykłady użycia, a jeśli
wpisane zdanie zawiera błąd, poprawia je i tłumaczy, na czym błąd polegał.

## Co robi

Jedno pole tekstowe, dwa scenariusze:

- **Pojedyncze słowo lub fraza** → tłumaczenie na wybrany język docelowy,
  część mowy (jeśli dotyczy) i 2–3 przykładowe zdania z tłumaczeniem.
- **Gotowe zdanie** → sprawdzenie poprawności gramatycznej i składniowej;
  jeśli zdanie zawiera błąd, aplikacja pokazuje poprawioną wersję i krótkie
  wyjaśnienie po języku, z którego piszesz.

Obsługiwane języki: **polski, angielski, włoski, francuski** — źródłowy
i docelowy wybiera się osobno, z przyciskiem do zamiany kierunku; oba są
zawsze widoczne nad polem do wpisywania tekstu.

> Uwaga: to jest wersja jednotrybowa — samo tłumaczenie z korektą. Osobny
> tryb "gramatyka" (wyjaśnianie zjawisk gramatycznych, np. "dlaczego mówi
> się tak, a nie inaczej") nie jest obecnie zaimplementowany w UI ani w
> API — patrz [Możliwe rozszerzenia](#możliwe-rozszerzenia).

## Stos technologiczny

- **Next.js 16** (App Router) + React 18 + TypeScript
- **Tailwind CSS** do stylowania
- **Google Gemini API** jako silnik językowy, wywoływany wyłącznie po
  stronie serwera

## Architektura

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

Klucz API nigdy nie trafia do przeglądarki — cała komunikacja z Gemini
odbywa się w `app/api/teach/route.ts`, działającym wyłącznie po stronie
serwera (`export const runtime = "nodejs"`).

### Odporność na przeciążone modele

`route.ts` próbuje kolejno kilka darmowych modeli Gemini (`gemini-2.5-flash`,
`gemini-2.5-flash-lite`, `gemini-3.0-flash-preview`,
`gemini-3.1-flash-lite-preview`) i zwraca pierwszą udaną odpowiedź. Jeśli
wszystkie zawiodą, użytkownik dostaje jeden czytelny komunikat błędu
zamiast pustego ekranu.

## Uruchomienie lokalne

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

## Możliwe rozszerzenia

- Przywrócenie trybu **gramatyka** — osobny widok wyjaśniający zjawiska
  gramatyczne (regułę + przykłady), obok istniejącego trybu tłumacza.
- Historia zapytań zapisywana lokalnie (localStorage albo baza danych).
- Wsparcie dla wymowy (audio) w przykładowych zdaniach.
- Tryb "fiszek" generowany z historii tłumaczeń.

## Licencja

Brak licencji ustawionej — dodaj plik `LICENSE`, jeśli repozytorium ma być
publicznie reużywalne.
