import type { LangCode } from "./languages";

export type Mode = "translator" | "grammar";

export interface TeachRequestBody {
  mode: Mode;
  sourceLang: LangCode;
  targetLang: LangCode;
  input: string;
}

export interface ExamplePair {
  target: string;
  source: string;
}

export interface TranslatorResult {
  translation: string;
  partOfSpeech?: string;
  usageNote?: string;
  examples: ExamplePair[];
  correction?: {
    original: string;
    corrected: string;
    explanation: string;
  } | null;
}

export interface GrammarResult {
  explanation: string;
  rule: string;
  examples: ExamplePair[];
}

export interface TeachResponse {
  mode: Mode;
  translator?: TranslatorResult;
  grammar?: GrammarResult;
}

export interface TeachErrorResponse {
  error: string;
}
