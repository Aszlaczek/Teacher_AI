export type LangCode = "pl" | "en" | "it" | "fr";

export interface Language {
  code: LangCode;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: Language[] = [
  { code: "pl", label: "Polski", nativeLabel: "Polski" },
  { code: "en", label: "Angielski", nativeLabel: "English" },
  { code: "it", label: "Włoski", nativeLabel: "Italiano" },
  { code: "fr", label: "Francuski", nativeLabel: "Français" },
];

export function langByCode(code: LangCode): Language {
  const found = LANGUAGES.find((l) => l.code === code);
  if (!found) throw new Error(`Nieznany kod języka: ${code}`);
  return found;
}
