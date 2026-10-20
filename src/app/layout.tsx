import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { PROFILE } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono", display: "swap" });

const TITLE = `${PROFILE.name} | ${PROFILE.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: PROFILE.intro,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: TITLE,
    description: PROFILE.intro,
    siteName: PROFILE.name,
  },
  twitter: { card: "summary", title: TITLE, description: PROFILE.intro },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-scroll-behavior="smooth" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
