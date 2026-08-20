import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leon Work OS - sanitisierte Betriebsnachweise",
  description: "Sanitisierte Architektur-, Backup- und Restore-Nachweise des privat betriebenen Leon Work OS.",
};

const verification = [
  ["Prüfzeitpunkt", "15.08.2026"],
  ["Restore-Drill", "09.08.2026"],
  ["SQLite-Prüfungen", "20 / 20"],
  ["Archivobjekte", "2.898"],
  ["Validierungsdauer", "5,96 s"],
  ["Ergebnis", "OK"],
];

const runbook = [
  "Verschlüsseltes Backup und Prüfsumme gegen den Offsite-Stand abgleichen.",
  "Archiv in ein isoliertes temporäres Verzeichnis entschlüsseln.",
  "Für jede enthaltene SQLite-Datenbank quick_check ausführen.",
  "Task-Registry-Zustand und Eventkette auf Lesbarkeit prüfen.",
  "Temporären Restore verwerfen und nur den sanitisierten Prüfstatus behalten.",
];

export default function WorkOsEvidence() {
  return (
    <main className="evidence-page">
      <Link className="legal-back" href="/">← Zurück zum Portfolio</Link>

      <header className="evidence-hero">
        <p className="section-index">Privater Eigenbetrieb / sanitisiertes Evidence-Paket</p>
        <h1>Leon Work OS</h1>
        <p>
          Ein persönlicher Control Plane für Aufgaben, Freigaben, Worker und Recovery. Der Quellcode und
          Betriebsdetails bleiben privat; diese Seite veröffentlicht nur überprüfte, nicht sensible Systemsignale.
        </p>
      </header>

      <section className="evidence-section" aria-labelledby="architecture-title">
        <div className="evidence-section-head">
          <span>01</span>
          <h2 id="architecture-title">Architektur</h2>
        </div>
        <ol className="architecture-flow" aria-label="Vereinfachter Work-OS-Datenfluss">
          <li><span>01</span><strong>Auftrag</strong><small>Manuell oder durch einen read-only Pilot</small></li>
          <li><span>02</span><strong>Task Registry</strong><small>Zustand, Risiko, Idempotenz und Eventspur</small></li>
          <li><span>03</span><strong>Freigabe</strong><small>Pflicht vor externer oder schreibender Wirkung</small></li>
          <li><span>04</span><strong>Worker</strong><small>Mac oder Hermes führen den begrenzten Schritt aus</small></li>
          <li><span>05</span><strong>Evidence</strong><small>Checkpoints, Logs, Backups und Restore-Drills</small></li>
        </ol>
      </section>

      <section className="evidence-section" aria-labelledby="verification-title">
        <div className="evidence-section-head">
          <span>02</span>
          <h2 id="verification-title">Letzter geprüfter Stand</h2>
        </div>
        <dl className="verification-grid">
          {verification.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        <p className="evidence-boundary">
          Die 5,96 Sekunden messen die lokale Validierung des vorbereiteten Restore-Pakets. Das ist kein
          zugesichertes Produktions-RTO und schließt Download- oder Infrastruktur-Wiederaufbauzeit nicht ein.
        </p>
      </section>

      <section className="evidence-section" aria-labelledby="runbook-title">
        <div className="evidence-section-head">
          <span>03</span>
          <h2 id="runbook-title">Runbook-Auszug</h2>
        </div>
        <ol className="runbook-list">
          {runbook.map((step, index) => (
            <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>
          ))}
        </ol>
      </section>

      <section className="evidence-section evidence-scope" aria-labelledby="scope-title">
        <div className="evidence-section-head">
          <span>04</span>
          <h2 id="scope-title">Nachweisgrenze</h2>
        </div>
        <p>
          Belegt sind mein eigener Betrieb, die technische Kontrollstruktur und ein erfolgreicher Restore-Drill.
          Nicht behauptet werden Mandantenbetrieb für Dritte, formale Zertifizierung oder eine garantierte SLA.
        </p>
      </section>
    </main>
  );
}
