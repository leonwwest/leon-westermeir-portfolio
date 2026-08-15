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
  decision: string;
  boundary: string;
  stack: string[];
  image: string;
  still: string;
  imageAlt: string;
  repo?: string;
  linkLabel?: string;
  status: string;
  tests: string;
  proof?: string;
};

const projects: Project[] = [
  {
    id: "m365-automation",
    number: "01",
    title: "Azure & Microsoft 365 Tenant Guard",
    role: "Safe operations",
    purpose: "Bestände prüfen, Abweichungen erklären und Änderungen kontrolliert freigeben.",
    result:
      "Python und PowerShell erzeugen aus einem reproduzierbaren Inventar denselben Governance-Report. Remediation bleibt bis zur expliziten Freigabe im Dry Run.",
    evidence: "11 Tests · 11 deterministische Findings · Release v1.2.0",
    decision: "Inventar, Bewertung und Remediation sind getrennte Schritte.",
    boundary: "Die öffentliche Demo nutzt synthetische Tenant-Daten und führt keine Änderungen aus.",
    stack: ["PowerShell", "Python", "Microsoft Graph", "GitHub Actions"],
    image: "/projects/m365-automation-demo.gif",
    still: "/projects/m365-automation.png",
    imageAlt: "Terminaldemo des Azure und Microsoft 365 Tenant Guard",
    repo: "https://github.com/leonwwest/azure-m365-automation-lab",
    status: "v1.2.0",
    tests: "11 / 11",
  },
  {
    id: "azure-platform",
    number: "02",
    title: "Azure Platform IaC",
    role: "Cloud foundation",
    purpose: "Eine prüfbare Azure-Basis ohne dauerhafte Zugangsdaten.",
    result:
      "Terraform provisioniert Container Apps, Key Vault, Monitoring und kostenbewusste Leitplanken. GitHub Actions authentifiziert sich per OIDC.",
    evidence: "13 automatisierte Tests · AzureRM v5 Contract · Release v1.1.0",
    decision: "GitHub Actions authentifiziert sich kurzlebig per OIDC statt mit gespeicherten Cloud-Secrets.",
    boundary: "Das öffentliche Evidence-Paket belegt lokale Planung und Verträge, nicht dauerhaft betriebene Azure-Ressourcen.",
    stack: ["Terraform", "Azure", "OIDC", "GitHub Actions"],
    image: "/projects/azure-platform-demo.gif",
    still: "/projects/azure-platform.png",
    imageAlt: "Terminaldemo des Azure Platform Infrastructure-as-Code Labs",
    repo: "https://github.com/leonwwest/azure-platform-iac-lab",
    status: "v1.1.0",
    tests: "13 / 13",
  },
  {
    id: "gitops-platform",
    number: "03",
    title: "GitOps Platform Lab",
    role: "Platform engineering",
    purpose: "Clusterzustand aus Git reproduzierbar machen, messen und wiederherstellen.",
    result:
      "Argo CD und Kustomize halten den gewünschten Zustand synchron. Policies, SLOs und ein Burn-Rate-Recovery-Ablauf machen Drift sichtbar und behebbar.",
    evidence: "18 Tests · drei Overlays · Release v1.2.0",
    decision: "Ein gemeinsamer Basiszustand wird durch kleine, prüfbare Umgebungs-Overlays erweitert.",
    boundary: "Das Lab läuft lokal und dokumentiert Betriebsmechanik; es ist kein fremdes Produktionscluster.",
    stack: ["Kubernetes", "Argo CD", "Kustomize", "Prometheus"],
    image: "/projects/gitops-platform-demo.gif",
    still: "/projects/gitops-platform.png",
    imageAlt: "Terminaldemo des Kubernetes GitOps Platform Labs",
    repo: "https://github.com/leonwwest/gitops-platform-lab",
    status: "v1.2.0",
    tests: "18 / 18",
  },
  {
    id: "leon-work-os",
    number: "04",
    title: "Leon Work OS",
    role: "Systems automation",
    purpose: "Aufgaben, Freigaben und Wiederanlauf auf eigener Infrastruktur steuern.",
    result:
      "Task Registry, Mac-Worker und Hermes bilden einen privaten Control Plane. Guardrails, Checkpoints, verschlüsselte Backups und Restore-Drills halten die Automation nachvollziehbar.",
    evidence: "20 SQLite-Datenbanken geprüft · 2.898 Archivobjekte · Restore-Validierung 5,96 s",
    decision: "Jede externe Wirkung braucht eine explizite Freigabe; read-only Prüfungen bleiben automatisierbar.",
    boundary: "Repository und Betriebsdaten bleiben privat; veröffentlicht werden nur sanitisierte Prüfwerte.",
    stack: ["Python", "SQLite", "macOS", "Linux", "systemd"],
    image: "/projects/leon-work-os.png",
    still: "/projects/leon-work-os.png",
    imageAlt: "Operator-Dashboard des privat betriebenen Leon Work OS",
    linkLabel: "Sanitisierte Architektur und Recovery-Nachweise öffnen →",
    proof: "/work-os-evidence",
    status: "Betrieb",
    tests: "15.08.2026",
  },
  {
    id: "cloudscrobble",
    number: "05",
    title: "CloudScrobble",
    role: "Product engineering",
    purpose: "Musikwiedergabe zuverlässig erfassen, auch wenn Netz oder Zugangsdaten ausfallen.",
    result:
      "Die iOS-App puffert Scrobbles offline, schützt Tokens im Keychain und delegiert serverseitige Aufgaben an einen kleinen Go- und Worker-Stack.",
    evidence: "90 Swift-Tests · fünf CI-Jobs · Release v0.1.0",
    decision: "Eine lokale Queue entkoppelt die Wiedergabe vom Netzwerk und macht Wiederholungen kontrollierbar.",
    boundary: "Der öffentliche Stand belegt Architektur und Build; eine Store-Veröffentlichung wird nicht behauptet.",
    stack: ["Swift", "SwiftUI", "Go", "Cloudflare Workers"],
    image: "/projects/cloudscrobble.png",
    still: "/projects/cloudscrobble.png",
    imageAlt: "Echte iOS-Oberfläche von CloudScrobble im Demo-Modus",
    repo: "https://github.com/leonwwest/cloudscrobble-ios",
    status: "v0.1.0",
    tests: "90 TESTS",
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
              <span>15.08.2026 · DE</span>
            </div>
            <div className="dispatch-main">
              <p className="dispatch-label">Aktiver Prüfbereich</p>
              <p className="dispatch-value">Microsoft systems<br />&amp; safe automation</p>
              <dl className="dispatch-metrics">
                <div><dt>Kernsysteme</dt><dd>05</dd></div>
                <div><dt>Releases</dt><dd>04</dd></div>
                <div><dt>Status</dt><dd className="status-pass">AKTIV</dd></div>
              </dl>
            </div>
            <div className="dispatch-foot">
              <span>Belege: Code · Tests · Runbooks</span>
              <span aria-hidden="true">LW—05</span>
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
              <h2 id="projects-title">Fünf Kernsysteme.<br />Entscheidung und Beleg.</h2>
              <p>Jedes Projekt zeigt Problem, technische Entscheidung, überprüfbaren Nachweis und eine klare Grenze. Öffentliche Systeme führen direkt zum Code.</p>
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
                <dl className="evidence-facts">
                  <div><dt>Entscheidung</dt><dd>{active.decision}</dd></div>
                  <div><dt>Nachweis</dt><dd>{active.evidence}</dd></div>
                  <div><dt>Grenze</dt><dd>{active.boundary}</dd></div>
                </dl>
                <ul className="stack-list" aria-label="Technologien">
                  {active.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {active.repo ? (
                  <a className="repo-link" href={active.repo} target="_blank" rel="noreferrer">Repository und Runbook öffnen ↗</a>
                ) : active.proof ? (
                  <a className="repo-link" href={active.proof}>{active.linkLabel}</a>
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
              <h2 id="proof-title">Was die Nachweise<br />wirklich abdecken.</h2>
            </div>
          </div>
          <div className="proof-grid">
            <div className="proof-statement">
              <p>Die öffentlichen Labs belegen reproduzierbare Engineering-Abläufe. Leon Work OS ergänzt reale Eigenbetriebsdaten. Claims bleiben so präzise wie die zugänglichen Belege.</p>
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
            <a href="https://github.com/leonwwest/operations-kpi-automation-demo" target="_blank" rel="noreferrer"><span>Operations Data Quality</span><small>Python · API · Power BI</small><b>↗</b></a>
            <a href="https://github.com/leonwwest/ludo_club" target="_blank" rel="noreferrer"><span>Board Magic</span><small>Flutter · langlebige Produktentwicklung</small><b>↗</b></a>
            <a href="https://github.com/leonwwest/slow-ai-app-incident-lab" target="_blank" rel="noreferrer"><span>Incident Automation Lab</span><small>OpenTelemetry · erklärbare Triage</small><b>↗</b></a>
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
