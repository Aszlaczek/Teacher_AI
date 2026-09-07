import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-worksans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teacher_AI — tłumacz i nauczyciel gramatyki",
  description:
    "Tłumacz słowa, popraw zdania i zrozum gramatykę w czterech językach: polskim, angielskim, włoskim i francuskim.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body
        className={`${fraunces.variable} ${workSans.variable} font-body text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
