import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Impressum" };

export default function Impressum() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Portfolio</Link>
      <p className="section-index">Rechtliches / 01</p>
      <h1>Impressum</h1>
      <div className="legal-copy">
        <section><h2>Angaben gemäß § 5 DDG</h2><p>ibmw automations<br />Einzelunternehmen<br />Vertreten durch Leon Westermeir</p><p>Am Unteranger 3<br />86672 Thierhaupten<br />Deutschland</p></section>
        <section><h2>Kontakt</h2><p>E-Mail: <a href="mailto:leon.westermeir@ibmw-engineering.com">leon.westermeir@ibmw-engineering.com</a><br />Telefon: <a href="tel:+491777867492">+49 177 7867492</a></p></section>
        <section><h2>Verantwortlich für den Inhalt</h2><p>Leon Westermeir<br />Anschrift wie oben.</p></section>
        <section><h2>Haftung für Links</h2><p>Diese Website enthält Links zu externen Websites. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich.</p></section>
      </div>
    </main>
  );
}
