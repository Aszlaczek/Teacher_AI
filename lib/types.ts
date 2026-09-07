import type { LangCode } from "./languages";

export interface TeachRequestBody {
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

export interface TeachResponse {
  translator: TranslatorResult;
}
