import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/app/components/site-chrome";
import projectEvidence from "@/content/project-evidence.json";

const evidence = projectEvidence.projects["data-quality"];

export const metadata: Metadata = {
  title: "Operations Data Quality",
  description: "Versionierte Python- und FastAPI-Pipeline mit Quality Gate, Lineage, Power-BI-Anbindung, n8n-Workflow und 27 verifizierten Tests.",
  alternates: { canonical: "/projects/data-quality" },
  openGraph: {
    title: "Operations Data Quality - Leon Westermeir",
    description: "27 Tests, sechs Quality Checks und ein nachvollziehbarer Datenpfad von CSV zu API und Power BI.",
    url: "/projects/data-quality",
    images: [{ url: "/projects/data-quality.png", width: 1280, height: 640, alt: "Operations Data Quality Pipeline und Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operations Data Quality - Leon Westermeir",
    description: "27 Tests, sechs Quality Checks und ein nachvollziehbarer Datenpfad von CSV zu API und Power BI.",
    images: ["/projects/data-quality.png"],
  },
};

const stages = [
  ["01", "Vertrag", "Schema, Verantwortlichkeit und erwartete Lieferperiode versionieren."],
  ["02", "Quality Gate", "Sechs Prüfungen ausführen und fehlerhafte Zeilen quarantänisieren."],
  ["03", "KPI & API", "Kennzahlen reproduzierbar berechnen und typisiert bereitstellen."],
  ["04", "Verbrauch", "Power BI und n8n erhalten nachvollziehbare Ergebnisse mit Lineage."],
];

export default function DataQualityPage() {
  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <SiteHeader />
      <main id="main" className="project-detail-page">
        <section className="detail-hero" aria-labelledby="detail-title">
          <div>
            <p className="eyebrow">Data / Business Applications / Automation</p>
            <h1 id="detail-title">Datenqualität, die im Betrieb erklärbar bleibt.</h1>
            <p>Eine versionierte Pipeline prüft operative CSV-Daten, isoliert fehlerhafte Zeilen, berechnet belastbare KPIs und stellt das Ergebnis für Power BI und n8n bereit.</p>
            <div className="detail-actions">
              <a className="primary-action" href={evidence.repository} target="_blank" rel="noreferrer">Repository öffnen ↗</a>
              <a className="text-action" href="https://operations-kpi-automation-demo.vercel.app" target="_blank" rel="noreferrer">Live-Demo ↗</a>
            </div>
          </div>
          <figure className="detail-evidence">
            <Image src="/projects/data-quality.png" alt="Dashboard und Quality Gate der Operations Data Quality Pipeline" width={1280} height={640} priority />
            <figcaption>Realer Demo-Stand: Gate bestanden · Score 100/100 · Contract v2.0.0</figcaption>
          </figure>
        </section>

        <ul className="detail-highlights" aria-label="Verifizierte Projektergebnisse">
          {evidence.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>

        <section className="detail-section" aria-labelledby="path-title">
          <div className="detail-heading">
            <h2 id="path-title">Vom Vertrag zum konsumierbaren Ergebnis.</h2>
            <p>Jeder Schritt hinterlässt einen überprüfbaren Zustand. Rohdaten werden nicht stillschweigend korrigiert oder in Logs kopiert.</p>
          </div>
          <ol className="data-path">
            {stages.map(([index, title, copy]) => (
              <li key={title}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="detail-facts" aria-labelledby="team-title">
          <div>
            <h2 id="team-title">Damit kann ich im Team anschließen.</h2>
            <p>Datenverträge und Quality Gates pflegen, API-Schnittstellen nachvollziehbar betreiben, Fehlerbilder mit Fachbereichen eingrenzen und Ergebnisse sauber an Reporting- oder Automationsprozesse übergeben.</p>
          </div>
          <dl>
            <div><dt>Verifikation</dt><dd>27/27 Pytest-Tests und sechs fachliche Quality Checks</dd></div>
            <div><dt>Demo-Datensatz</dt><dd>52 Zeilen, drei Teams und zwölf Monate</dd></div>
            <div><dt>Integrationen</dt><dd>FastAPI, Power Query, DAX und n8n</dd></div>
            <div><dt>Grenze</dt><dd>{evidence.boundary}</dd></div>
          </dl>
        </section>

        <section className="contact-section compact-contact" aria-labelledby="data-contact-title">
          <p className="contact-kicker">Passend für Data, Integration und Business Applications.</p>
          <h2 id="data-contact-title">Lassen Sie uns über<br />Ihren Datenpfad sprechen.</h2>
          <a className="contact-mail" href="mailto:leon.westermeir@ibmw-engineering.com">leon.westermeir@<wbr />ibmw-engineering.com <span aria-hidden="true">↗</span></a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
