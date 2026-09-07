import { NextRequest, NextResponse } from "next/server";
import { LANGUAGES, type LangCode } from "@/lib/languages";
import { buildSystemPrompt, extractJson } from "@/lib/prompts";
import type { TeachRequestBody, TeachResponse, TranslatorResult } from "@/lib/types";

export const runtime = "nodejs";

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const FREE_MODELS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
];
const VALID_CODES = new Set(LANGUAGES.map((l) => l.code));

function isValidLangCode(value: unknown): value is LangCode {
  return typeof value === "string" && VALID_CODES.has(value as LangCode);
}

async function callGemini(
  apiKey: string,
  model: string,
  systemPrompt: string,
  input: string
): Promise<string> {
  const res = await fetch(
    `${GEMINI_URL}/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: input }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${model} (${res.status}): ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(`${model}: brak treści w odpowiedzi`);
  return text;
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

  const { sourceLang, targetLang, input } = body;

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

  const systemPrompt = buildSystemPrompt(sourceLang, targetLang);
  const trimmedInput = input.trim();

  const errors: string[] = [];

  for (const model of FREE_MODELS) {
    try {
      const textBlock = await callGemini(apiKey, model, systemPrompt, trimmedInput);
      const parsed = extractJson<TranslatorResult>(textBlock);
      const result: TeachResponse = { translator: parsed };
      return NextResponse.json(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(msg);
      continue;
    }
  }

  return NextResponse.json(
    { error: `Wszystkie modele były zajęte. Spróbuj ponownie.\n${errors.join("\n")}` },
    { status: 502 }
  );
}
