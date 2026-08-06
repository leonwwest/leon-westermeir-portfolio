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
    default: "Leon Westermeir — Cloud, Platform & Automation",
    template: "%s — Leon Westermeir",
  },
  description: "System Engineer mit Fokus auf Cloud-Plattformen, sichere Automation und nachvollziehbaren Betrieb. Fünf reproduzierbare Engineering-Labs mit Code, Tests und Runbooks.",
  keywords: ["Leon Westermeir", "Cloud Engineer", "Platform Engineer", "DevOps", "Automation", "Azure", "Kubernetes"],
  authors: [{ name: "Leon Westermeir" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://ibmw-automations.de",
    siteName: "Leon Westermeir",
    title: "Leon Westermeir — Cloud, Platform & Automation",
    description: "Prüfbare Cloud- und Automationsprojekte: Code, Tests, Demos und Runbooks.",
    images: [{ url: "/projects/azure-platform.png", width: 1280, height: 640, alt: "Leon Westermeir – Cloud Platform Engineering Portfolio" }],
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
