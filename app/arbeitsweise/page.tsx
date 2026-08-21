import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/app/components/site-chrome";

export const metadata: Metadata = {
  title: "Arbeitsweise & Evidenz",
  description: "Wie Leon Westermeir Cloud-, Platform- und Automationsarbeit eingrenzt, automatisiert, verifiziert und in den Betrieb übergibt.",
  alternates: { canonical: "/arbeitsweise" },
};

const workflow = [
  ["Unklarheit eingrenzen", "Randbedingungen, Risiken und das kleinste überprüfbare Ziel festhalten."],
  ["System automatisieren", "Konfiguration in Code überführen und sichere Standardwerte setzen."],
  ["Verhalten beweisen", "Tests, Metriken und reproduzierbare Demos statt bloßer Behauptungen."],
  ["Betrieb übergeben", "Runbook, Fehlerbilder und Recovery so dokumentieren, dass andere weiterkommen."],
];

export default function ArbeitsweisePage() {
  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <SiteHeader />
      <main id="main" className="method-page">
        <section className="method-hero" aria-labelledby="method-title">
          <p className="eyebrow">Arbeitsweise / Evidenz / Übergabe</p>
          <h1 id="method-title">Schnell lernen.<br />Sauber belegen.</h1>
          <p>Produktiver Betrieb verlangt mehr als eine gute Demo. Darum beginne ich mit überprüfbaren Grenzen und ende mit einer Übergabe, die andere weiterführen können.</p>
          <Link className="primary-action" href="/#projekte">Projektbelege öffnen</Link>
        </section>

        <section className="workflow-section method-workflow" aria-labelledby="workflow-title">
          <div className="section-heading section-heading-light">
            <div>
              <h2 id="workflow-title">Vier Schritte.<br />Ein überprüfbarer Pfad.</h2>
            </div>
          </div>
          <ol className="workflow-list">
            {workflow.map(([title, copy]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="proof-section method-proof" aria-labelledby="proof-title">
          <div className="section-heading">
            <div>
              <h2 id="proof-title">Was die Nachweise<br />wirklich abdecken.</h2>
            </div>
          </div>
          <div className="proof-grid">
            <div className="proof-statement">
              <p>Die öffentlichen Labs belegen reproduzierbare Engineering-Abläufe. Leon Work OS ergänzt sanitisierte Eigenbetriebsdaten. Claims bleiben so präzise wie die zugänglichen Belege.</p>
            </div>
            <dl className="proof-facts">
              <div><dt>Berufliche Basis</dt><dd>System Engineering, Betrieb und Automation</dd></div>
              <div><dt>Nachweisprinzip</dt><dd>Code, CI, reale Läufe und Runbooks</dd></div>
              <div><dt>Veränderungen</dt><dd>Read-only zuerst, Freigabe vor externer Wirkung</dd></div>
              <div><dt>Arbeitsort</dt><dd>Raum Augsburg / München, remote in Deutschland</dd></div>
            </dl>
          </div>
        </section>

        <section className="boundary-section" aria-labelledby="boundary-title">
          <h2 id="boundary-title">Grenzen gehören zum Beleg.</h2>
          <div>
            <p>Die Labs behaupten keine fremde Produktionsverantwortung. Live-Status, Kundendaten und nicht zugängliche Betriebswerte werden nicht simuliert.</p>
            <p>Stattdessen zeigen sie, wie ich sichere Defaults, CI-Gates, Telemetrie, Recovery und Übergaben technisch strukturiere.</p>
          </div>
        </section>

        <section className="contact-section compact-contact" aria-labelledby="method-contact-title">
          <p className="contact-kicker">Passend für Cloud, Platform und Infrastructure Automation.</p>
          <h2 id="method-contact-title">Sprechen wir über<br />Ihren Betriebsweg.</h2>
          <a className="contact-mail" href="mailto:leon.westermeir@ibmw-engineering.com">leon.westermeir@<wbr />ibmw-engineering.com <span aria-hidden="true">↗</span></a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
