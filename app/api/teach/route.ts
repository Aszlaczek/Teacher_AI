import { NextRequest, NextResponse } from "next/server";
import { LANGUAGES, type LangCode } from "@/lib/languages";
import { buildSystemPrompt, extractJson } from "@/lib/prompts";
import type {
  Mode,
  TeachRequestBody,
  TeachResponse,
  GrammarResult,
  TranslatorResult,
} from "@/lib/types";

export const runtime = "nodejs";

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const VALID_CODES = new Set(LANGUAGES.map((l) => l.code));

function isValidLangCode(value: unknown): value is LangCode {
  return typeof value === "string" && VALID_CODES.has(value as LangCode);
}

function isValidMode(value: unknown): value is Mode {
  return value === "translator" || value === "grammar";
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Brak GEMINI_API_KEY w konfiguracji serwera. Ustaw go w .env.local." },
      { status: 500 }
    );
  }

  let body: TeachRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowy JSON w żądaniu." }, { status: 400 });
  }

  const { mode, sourceLang, targetLang, input } = body;

  if (!isValidMode(mode)) {
    return NextResponse.json({ error: "Nieprawidłowy tryb. Użyj 'translator' lub 'grammar'." }, { status: 400 });
  }
  if (!isValidLangCode(sourceLang) || !isValidLangCode(targetLang)) {
    return NextResponse.json({ error: "Nieprawidłowy kod języka." }, { status: 400 });
  }
  if (sourceLang === targetLang) {
    return NextResponse.json(
      { error: "Język źródłowy i docelowy muszą się różnić." },
      { status: 400 }
    );
  }
  if (!input || typeof input !== "string" || !input.trim()) {
    return NextResponse.json({ error: "Pole 'input' nie może być puste." }, { status: 400 });
  }
  if (input.length > 800) {
    return NextResponse.json(
      { error: "Tekst jest zbyt długi (limit 800 znaków)." },
      { status: 400 }
    );
  }

  const systemPrompt = buildSystemPrompt(mode, sourceLang, targetLang);

  let geminiRes: Response;
  try {
    geminiRes = await fetch(
      `${GEMINI_URL}/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: input.trim() }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Nie udało się połączyć z Gemini API. Sprawdź połączenie sieciowe." },
      { status: 502 }
    );
  }

  if (!geminiRes.ok) {
    const detail = await geminiRes.text().catch(() => "");
    return NextResponse.json(
      { error: `Gemini API zwróciło błąd (${geminiRes.status}): ${detail.slice(0, 300)}` },
      { status: 502 }
    );
  }

  const data = await geminiRes.json();
  const textBlock = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textBlock) {
    return NextResponse.json(
      { error: "Model nie zwrócił treści tekstowej." },
      { status: 502 }
    );
  }

  try {
    if (mode === "translator") {
      const parsed = extractJson<TranslatorResult>(textBlock);
      const result: TeachResponse = { mode, translator: parsed };
      return NextResponse.json(result);
    } else {
      const parsed = extractJson<GrammarResult>(textBlock);
      const result: TeachResponse = { mode, grammar: parsed };
      return NextResponse.json(result);
    }
  } catch {
    return NextResponse.json(
      {
        error:
          "Nie udało się przetworzyć odpowiedzi modelu jako JSON. Spróbuj ponownie.",
      },
      { status: 502 }
    );
  }
}
