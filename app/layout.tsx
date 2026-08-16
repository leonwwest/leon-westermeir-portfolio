import type { Metadata } from "next";
import { Fragment_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibmw-automations.de"),
  title: {
      default: "Leon Westermeir — Microsoft, Infrastructure & Automation",
    template: "%s — Leon Westermeir",
  },
  description: "System Engineer für Microsoft 365, Entra ID, Windows-Infrastruktur, Cloud und sichere Automation. Reale Praxis, ein privat betriebener Work OS und reproduzierbare Engineering-Labs.",
  keywords: ["Leon Westermeir", "Microsoft 365", "Entra ID", "IT System Engineer", "Windows Infrastructure", "Cloud Engineer", "Automation", "Azure"],
  authors: [{ name: "Leon Westermeir" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://ibmw-automations.de",
    siteName: "Leon Westermeir",
    title: "Leon Westermeir — Microsoft, Infrastructure & Automation",
    description: "Prüfbare Microsoft-, Infrastruktur-, Cloud- und Automationsprojekte: Praxis, Code, Tests und Runbooks.",
    images: [{ url: "/social-preview.png", width: 1280, height: 640, alt: "Leon Westermeir – Microsoft, Infrastructure & Automation" }],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={`${instrumentSans.variable} ${fragmentMono.variable}`}>{children}</body>
    </html>
  );
}
