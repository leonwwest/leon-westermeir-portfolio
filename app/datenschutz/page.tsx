import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Datenschutz" };

export default function Datenschutz() {
  return (
    <main className="legal-page">
      <Link className="legal-back" href="/">← Portfolio</Link>
      <p className="section-index">Rechtliches</p>
      <h1>Datenschutz</h1>
      <div className="legal-copy">
        <section><h2>1. Verantwortlicher</h2><p>Leon Westermeir, Am Unteranger 3, 86672 Thierhaupten<br /><a href="mailto:leon.westermeir@ibmw-engineering.com">leon.westermeir@ibmw-engineering.com</a></p></section>
        <section><h2>2. Aufruf dieser Website</h2><p>Beim Aufruf können technisch notwendige Verbindungsdaten wie IP-Adresse, Zeitpunkt, angeforderte Datei und Browserinformationen in Server-Logs verarbeitet werden. Dies dient der sicheren und stabilen Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p></section>
        <section><h2>3. Hosting</h2><p>Die Website wird über Vercel bereitgestellt. Dabei können Verbindungsdaten verarbeitet werden. Weitere Informationen finden sich in der Datenschutzerklärung von Vercel.</p></section>
        <section><h2>4. Kontaktaufnahme</h2><p>Wenn Sie per E-Mail Kontakt aufnehmen, werden Ihre Angaben zur Bearbeitung der Anfrage verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Anfragen, ansonsten Art. 6 Abs. 1 lit. f DSGVO.</p></section>
        <section><h2>5. Externe Links</h2><p>Links zu GitHub und Projektdemos werden erst beim Anklicken aufgerufen. Für die anschließende Datenverarbeitung gelten die Hinweise des jeweiligen Anbieters.</p></section>
        <section><h2>6. Ihre Rechte</h2><p>Sie haben im gesetzlichen Umfang Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.</p></section>
      </div>
    </main>
  );
}
