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
    default: "Leon Westermeir - DevOps & Cloud Platform Engineering",
    template: "%s - Leon Westermeir",
  },
  description: "Cloud aus Code, sicher im Betrieb: prüfbare Azure-, GitOps-, Microsoft- und Automationsprojekte mit CI, Telemetrie und Recovery.",
  keywords: ["Leon Westermeir", "DevOps Engineer", "Platform Engineer", "Cloud Engineer", "Azure", "Terraform", "Kubernetes", "GitOps", "CI/CD", "SRE", "Observability"],
  authors: [{ name: "Leon Westermeir" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://ibmw-automations.de",
    siteName: "Leon Westermeir",
    title: "Leon Westermeir - DevOps & Cloud Platform Engineering",
    description: "Cloud aus Code. Sicher im Betrieb. Azure IaC, Kubernetes GitOps und Microsoft Automation mit Code, CI und Runbooks.",
    images: [{ url: "/social-preview.png", width: 1280, height: 640, alt: "Leon Westermeir - Cloud aus Code, sicher im Betrieb" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon Westermeir - DevOps & Cloud Platform Engineering",
    description: "Cloud aus Code. Sicher im Betrieb. Prüfbare Azure-, GitOps- und Automationsarbeit.",
    images: ["/social-preview.png"],
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
