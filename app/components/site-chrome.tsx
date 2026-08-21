"use client";

import Link from "next/link";

export function Wordmark() {
  return (
    <Link className="wordmark" href="/#top" aria-label="Leon Westermeir, zur Startseite">
      <span className="wordmark-mark" aria-hidden="true">LW</span>
      <span>Leon Westermeir</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <Wordmark />
      <nav aria-label="Hauptnavigation">
        <Link href="/#projekte">Projekte</Link>
        <Link href="/arbeitsweise">Arbeitsweise</Link>
        <a className="header-contact" href="mailto:leon.westermeir@ibmw-engineering.com">Kontakt ↗</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Wordmark />
      <p>Gebaut mit realen Projektdaten. Zuletzt geprüft: August 2026.</p>
      <nav aria-label="Rechtliches und Profile">
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <a href="https://github.com/leonwwest" target="_blank" rel="noreferrer">GitHub ↗</a>
      </nav>
    </footer>
  );
}
