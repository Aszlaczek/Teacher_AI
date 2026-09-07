import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teacher_AI — tłumacz języki z AI",
  description:
    "Tłumacz słowa i zdania w czterech językach: polskim, angielskim, włoskim i francuskim. Przykłady użycia i poprawki błędów.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans text-slate-800 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
