"use client";

import { useState } from "react";
import Image from "next/image";

type Project = {
  id: string;
  number: string;
  title: string;
  role: string;
  purpose: string;
  result: string;
  evidence: string;
  stack: string[];
  image: string;
  still: string;
  imageAlt: string;
  repo?: string;
  linkLabel?: string;
  status: string;
  tests: string;
};

const projects: Project[] = [
  {
    id: "leon-work-os",
    number: "01",
    title: "Leon Work OS",
    role: "Systems automation",
    purpose: "Aufgaben, Freigaben und Wiederanlauf auf meiner eigenen Infrastruktur steuern.",
    result:
      "Ein privates Operator-System verbindet Task Registry, Mac-Worker und Hermes. Guardrails, Checkpoints, Backups und Runbooks halten Automatisierung nachvollziehbar und stoppen externe Aktionen an klaren Freigabegrenzen.",
    evidence: "Laufender Eigenbetrieb · verifizierte Recovery- und Guardrail-Abläufe",
    stack: ["Python", "SQLite", "macOS", "Linux", "Automation"],
    image: "/projects/leon-work-os.png",
    still: "/projects/leon-work-os.png",
    imageAlt: "Operator-Dashboard des privat betriebenen Leon Work OS",
    linkLabel: "Privates Repository · Architektur im Gespräch",
    status: "Betrieb",
    tests: "LIVE / PRIVAT",
  },
  {
    id: "azure-platform",
    number: "02",
    title: "Azure Platform IaC",
    role: "Cloud foundation",
    purpose: "Eine prüfbare Azure-Basis ohne dauerhafte Zugangsdaten.",
    result:
      "Terraform provisioniert Container Apps, Key Vault, Monitoring und kostenbewusste Leitplanken. GitHub Actions authentifiziert sich per OIDC.",
    evidence: "17 Checkov-Prüfungen bestanden · 6 Contract Tests",
    stack: ["Terraform", "Azure", "OIDC", "GitHub Actions"],
    image: "/projects/azure-platform-demo.gif",
    still: "/projects/azure-platform.png",
    imageAlt: "Terminaldemo des Azure Platform Infrastructure-as-Code Labs",
    repo: "https://github.com/leonwwest/azure-platform-iac-lab",
    status: "Geprüft",
    tests: "06 / 06",
  },
  {
    id: "m365-automation",
    number: "03",
    title: "M365 Governance Automation",
    role: "Safe operations",
    purpose: "Bestände prüfen, Abweichungen erklären, Änderungen freigeben.",
    result:
      "Die Pipeline trennt Inventarisierung, Governance-Nachweise und Remediation. Änderungen bleiben bis zur expliziten Freigabe im Dry Run.",
    evidence: "7 automatisierte Tests · nachvollziehbarer Evidence Export",
    stack: ["PowerShell", "Microsoft Graph", "CI", "Governance"],
    image: "/projects/m365-automation-demo.gif",
    still: "/projects/m365-automation.png",
    imageAlt: "Terminaldemo der Microsoft 365 Governance Automation",
    repo: "https://github.com/leonwwest/azure-m365-automation-lab",
    status: "Geprüft",
    tests: "07 / 07",
  },
  {
    id: "gitops-platform",
    number: "04",
    title: "GitOps Platform Lab",
    role: "Platform engineering",
    purpose: "Clusterzustand aus Git reproduzierbar machen und messen.",
    result:
      "Argo CD und Kustomize halten den gewünschten Zustand synchron. Policies, SLOs und ein Recovery-Ablauf machen Fehler sichtbar und behebbar.",
    evidence: "14 Tests · dokumentierter Drift- und Recovery-Ablauf",
    stack: ["Kubernetes", "Argo CD", "Kustomize", "Prometheus"],
    image: "/projects/gitops-platform-demo.gif",
    still: "/projects/gitops-platform.png",
    imageAlt: "Terminaldemo des Kubernetes GitOps Platform Labs",
    repo: "https://github.com/leonwwest/gitops-platform-lab",
    status: "Geprüft",
    tests: "14 / 14",
  },
  {
    id: "incident-response",
    number: "05",
    title: "Incident Response Lab",
    role: "Observability",
    purpose: "Langsame Anwendungen eingrenzen, bevor Aktionismus entsteht.",
    result:
      "Metriken, Logs und Traces fließen in eine erklärbare SEV-Einstufung. Vorgeschlagene Maßnahmen bleiben standardmäßig sicher im Dry Run.",
    evidence: "3 Tests · reproduzierbares Slow-App-Szenario",
    stack: ["FastAPI", "OpenTelemetry", "Grafana", "Loki"],
    image: "/projects/incident-response-demo.gif",
    still: "/projects/incident-response.png",
    imageAlt: "Terminaldemo eines beobachtbaren Incident-Response-Szenarios",
    repo: "https://github.com/leonwwest/slow-ai-app-incident-lab",
    status: "Geprüft",
    tests: "03 / 03",
  },
  {
    id: "data-quality",
    number: "06",
    title: "Operations Data Quality",
    role: "Automation & data",
    purpose: "Fehlerhafte Betriebsdaten stoppen, bevor KPIs falsch werden.",
    result:
      "Ein versionierter Datenvertrag, Quality Gates, Quarantäne und Lineage machen den ETL-Lauf prüfbar. Die API liefert nur freigegebene Kennzahlen aus.",
    evidence: "27 Tests · Quality Report und Quarantäne-Nachweis",
    stack: ["Python", "FastAPI", "Power BI", "n8n"],
    image: "/projects/data-quality-demo.gif",
    still: "/projects/data-quality.png",
    imageAlt: "Terminaldemo der Operations Data Quality Pipeline",
    repo: "https://github.com/leonwwest/operations-kpi-automation-demo",
    status: "Geprüft",
    tests: "27 / 27",
  },
];

const workflow = [
  ["01", "Unklarheit eingrenzen", "Randbedingungen, Risiken und das kleinste überprüfbare Ziel festhalten."],
  ["02", "System automatisieren", "Konfiguration in Code überführen und sichere Standardwerte setzen."],
  ["03", "Verhalten beweisen", "Tests, Metriken und reproduzierbare Demos statt bloßer Behauptungen."],
  ["04", "Betrieb übergeben", "Runbook, Fehlerbilder und Recovery so dokumentieren, dass andere weiterkommen."],
];

const directionContract = `<!--
THESIS: Ein technisches Portfolio als helles Inbetriebnahmeprotokoll – ruhig, präzise und überprüfbar.
OWN-WORLD: Systeme sind Aufträge; Projekte sind Prüflose; Tests, Status und Runbooks sind die sichtbaren Belege.
STORY: Erst Position und Signal, dann fünf inspizierbare Systeme, anschließend Arbeitsweise, Grenzen und Kontakt.
FIRST VIEWPORT: Name, klare Zielrolle, ein aktives Projektfenster und reale Prüfsummen ohne dekorative Hero-Illustration.
FORM: Scharfe Werkstattkanten, viel warme Arbeitsfläche, tiefes Graphit und Säuregrün ausschließlich als präzises Signal.
-->`;

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="Leon Westermeir – zum Seitenanfang">
      <span className="wordmark-mark" aria-hidden="true">LW</span>
      <span>Leon Westermeir</span>
    </a>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((project) => project.id === activeId) ?? projects[0];

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: directionContract }} />
      <a className="skip-link" href="#main">Zum Inhalt springen</a>

      <header className="site-header" id="top">
        <Wordmark />
        <nav aria-label="Hauptnavigation">
          <a href="#projekte">Projekte</a>
          <a href="#arbeitsweise">Arbeitsweise</a>
          <a className="header-contact" href="mailto:leon.westermeir@ibmw-engineering.com">Kontakt ↗</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="signal-dot" /> Microsoft · Infrastruktur · Cloud · Automation</p>
            <h1 id="hero-title">Ich baue Systeme,<br />die man prüfen kann.</h1>
            <p className="hero-intro">
              Ich bin Leon – ausgebildeter Fachinformatiker Systemintegration und B.Sc. International Information Systems. Ich arbeite mit Microsoft 365, Entra ID, Windows-Infrastruktur, Netzwerk und Security und automatisiere wiederkehrende Abläufe mit PowerShell und Python.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#projekte">Arbeit ansehen <span aria-hidden="true">↓</span></a>
              <a className="text-action" href="https://github.com/leonwwest" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>

          <div className="dispatch-card" aria-label="Aktueller Projektstatus">
            <div className="dispatch-head">
              <span>Engineering dispatch</span>
              <span>14.08.2026 · DE</span>
            </div>
            <div className="dispatch-main">
              <p className="dispatch-label">Aktiver Prüfbereich</p>
              <p className="dispatch-value">Microsoft systems<br />&amp; safe automation</p>
              <dl className="dispatch-metrics">
                <div><dt>Systeme</dt><dd>06</dd></div>
                <div><dt>Prüfungen</dt><dd>57+</dd></div>
                <div><dt>Status</dt><dd className="status-pass">AKTIV</dd></div>
              </dl>
            </div>
            <div className="dispatch-foot">
              <span>Belege: Code · Tests · Runbooks</span>
              <span aria-hidden="true">LW—57</span>
            </div>
          </div>
        </section>

        <section className="experience-strip" aria-label="Qualifikation und technische Praxis">
          <div><span>Ausbildung</span><strong>Fachinformatiker Systemintegration</strong></div>
          <div><span>Studium</span><strong>B.Sc. International Information Systems</strong></div>
          <div><span>Praxis</span><strong>M365 · Entra · Windows · Netzwerk/Security</strong></div>
          <div><span>Automation</span><strong>PowerShell · Python</strong></div>
        </section>

        <section className="project-section" id="projekte" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="section-index">01 / Ausgewählte Systeme</p>
            <div>
              <h2 id="projects-title">Sechs Systeme.<br />Belegbar statt behauptet.</h2>
              <p>Wähle ein Projekt aus. Öffentliche Labs führen direkt zu Code und Runbook; beim privat betriebenen Work OS bleibt das Repository geschützt.</p>
            </div>
          </div>

          <div className="project-console">
            <div className="project-index" role="group" aria-label="Projektauswahl">
              {projects.map((project) => {
                const selected = project.id === active.id;
                return (
                  <button
                    className="project-row"
                    data-active={selected}
                    key={project.id}
                    onClick={() => setActiveId(project.id)}
                    aria-pressed={selected}
                  >
                    <span className="project-number">{project.number}</span>
                    <span className="project-row-copy">
                      <strong>{project.title}</strong>
                      <small>{project.purpose}</small>
                    </span>
                    <span className="row-status"><span className="signal-dot" /> {project.status}</span>
                    <span className="row-arrow" aria-hidden="true">{selected ? "→" : "↗"}</span>
                  </button>
                );
              })}
            </div>

            <article className="inspection" aria-live="polite" aria-atomic="true">
              <div className="inspection-head">
                <span>LOT {active.number} · {active.role}</span>
                <span>TEST {active.tests}</span>
              </div>
              <div className="demo-frame">
                <Image className="motion-demo" key={`motion-${active.image}`} src={active.image} alt={active.imageAlt} width={1280} height={720} unoptimized />
                <Image className="still-demo" key={`still-${active.still}`} src={active.still} alt={active.imageAlt} width={1280} height={640} />
              </div>
              <div className="inspection-copy">
                <p className="inspection-kicker">Was hier gelöst wird</p>
                <h3>{active.purpose}</h3>
                <p>{active.result}</p>
                <p className="evidence-line"><span aria-hidden="true">✓</span> {active.evidence}</p>
                <ul className="stack-list" aria-label="Technologien">
                  {active.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {active.repo ? (
                  <a className="repo-link" href={active.repo} target="_blank" rel="noreferrer">Repository und Runbook öffnen ↗</a>
                ) : (
                  <p className="private-project-note">{active.linkLabel}</p>
                )}
              </div>
            </article>
          </div>
        </section>

        <section className="workflow-section" id="arbeitsweise" aria-labelledby="workflow-title">
          <div className="section-heading section-heading-light">
            <p className="section-index">02 / Arbeitsweise</p>
            <div>
              <h2 id="workflow-title">Schnell lernen.<br />Sauber belegen.</h2>
              <p>Produktiver Betrieb verlangt mehr als eine gute Demo. Darum baue ich von Anfang an auf Nachvollziehbarkeit und sichere Übergaben.</p>
            </div>
          </div>
          <ol className="workflow-list">
            {workflow.map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="proof-section" aria-labelledby="proof-title">
          <div className="section-heading">
            <p className="section-index">03 / Einordnung</p>
            <div>
              <h2 id="proof-title">Keine erfundene<br />Produktions<wbr />erfahrung.</h2>
            </div>
          </div>
          <div className="proof-grid">
            <div className="proof-statement">
              <p>Die öffentlichen Projekte sind reproduzierbare Labs. Leon Work OS läuft privat auf meiner eigenen Infrastruktur. Beides zeigt meine Arbeitsweise, ersetzt aber keine Verantwortung für fremde Produktivumgebungen.</p>
            </div>
            <dl className="proof-facts">
              <div><dt>Heute</dt><dd>System Engineering, Support &amp; Automation</dd></div>
              <div><dt>Nächster Schritt</dt><dd>Microsoft-, Infrastruktur- oder Cloud-Rolle</dd></div>
              <div><dt>Arbeitsort</dt><dd>Raum Augsburg / München · Remote</dd></div>
              <div><dt>Sprachen</dt><dd>Deutsch · Englisch</dd></div>
            </dl>
          </div>
        </section>

        <section className="more-section" aria-labelledby="more-title">
          <p className="section-index">04 / Weitere Arbeit</p>
          <h2 id="more-title">Außerdem gebaut</h2>
          <div className="more-list">
            <a href="https://whatsapp-school-assistant-demo.vercel.app" target="_blank" rel="noreferrer"><span>WhatsApp School Assistant</span><small>Workflow-Demo · Live ansehen</small><b>↗</b></a>
            <a href="https://github.com/leonwwest/cloudscrobble-ios" target="_blank" rel="noreferrer"><span>CloudScrobble</span><small>Native iOS App</small><b>↗</b></a>
            <a href="https://github.com/leonwwest/repo-audio-summary" target="_blank" rel="noreferrer"><span>Repository Audio Summary</span><small>Developer Tooling</small><b>↗</b></a>
          </div>
        </section>

        <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
          <p className="eyebrow"><span className="signal-dot" /> Offen für den nächsten Einsatz</p>
          <h2 id="contact-title">Lassen Sie uns über<br />das System sprechen.</h2>
          <a className="contact-mail" href="mailto:leon.westermeir@ibmw-engineering.com">leon.westermeir@<wbr />ibmw-engineering.com <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer>
        <Wordmark />
        <p>Gebaut mit realen Projektdaten. Zuletzt geprüft: August 2026.</p>
        <nav aria-label="Rechtliches und Profile">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
          <a href="https://github.com/leonwwest" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </footer>
    </>
  );
}
