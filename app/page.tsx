"use client";

import { useState } from "react";
import Image from "next/image";

type Project = {
  id: string;
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
  video?: string;
  imageAlt: string;
  repo?: string;
  linkLabel?: string;
  status: string;
  tests: string;
  proof?: string;
};

const projects: Project[] = [
  {
    id: "azure-platform",
    title: "Azure Platform IaC",
    role: "Infrastructure as Code",
    purpose: "Eine sichere Azure-Plattform aus Code planen und kontrolliert ausliefern.",
    result:
      "Terraform provisioniert Container Apps, Key Vault, Monitoring und kostenbewusste Leitplanken. GitHub Actions authentifiziert sich per OIDC.",
    evidence: "13 automatisierte Tests / AzureRM v5 Contract / Release v1.1.0",
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
    title: "GitOps Platform Lab",
    role: "Kubernetes operations",
    purpose: "Clusterzustand aus Git reproduzierbar machen, messen und wiederherstellen.",
    result:
      "Argo CD und Kustomize halten den gewünschten Zustand synchron. Policies, SLOs und ein Burn-Rate-Recovery-Ablauf machen Drift sichtbar und behebbar.",
    evidence: "18 Tests / drei Overlays / Release v1.2.0",
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
    id: "incident-automation",
    title: "Incident Automation Lab",
    role: "Observability & SRE",
    purpose: "Metriken, Logs und Traces in eine sichere Incident-Entscheidung überführen.",
    result:
      "Ein reproduzierbar langsamer FastAPI-Dienst liefert reale Telemetrie an Prometheus, Loki und Jaeger. Deterministische Triage priorisiert Hypothesen, führt aber keine Änderung selbst aus.",
    evidence: "SEV2-Fixture / CI und Security Gates / Release v1.1.0",
    decision: "Automatisierung sammelt und erklärt Belege; Restart, Scale, Rollback und Credential-Rotation bleiben freigabepflichtig.",
    boundary: "Latenz, Fehler und Kosten entstehen in einer lokalen Simulation, nicht in einem Produktionsausfall.",
    stack: ["OpenTelemetry", "Prometheus", "Grafana", "Loki"],
    image: "/projects/incident-response-demo.gif",
    still: "/projects/incident-response.png",
    imageAlt: "Realer Lauf des Incident Automation Labs mit langsamer Anfrage und Dry-Run-Triage",
    repo: "https://github.com/leonwwest/slow-ai-app-incident-lab",
    status: "v1.1.0",
    tests: "SEV2 DRY RUN",
  },
  {
    id: "m365-automation",
    title: "Azure & Microsoft 365 Tenant Guard",
    role: "Governance automation",
    purpose: "Bestände prüfen, Abweichungen erklären und Änderungen kontrolliert freigeben.",
    result:
      "Python und PowerShell erzeugen aus einem reproduzierbaren Inventar denselben Governance-Report. Remediation bleibt bis zur expliziten Freigabe im Dry Run.",
    evidence: "11 Tests / 11 deterministische Findings / Release v1.2.0",
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
    id: "leon-work-os",
    title: "Leon Work OS",
    role: "Operations control plane",
    purpose: "Aufgaben, Freigaben und Wiederanlauf auf eigener Infrastruktur steuern.",
    result:
      "Task Registry, Mac-Worker und Hermes bilden einen privaten Control Plane. Guardrails, Checkpoints, verschlüsselte Backups und Restore-Drills halten die Automation nachvollziehbar.",
    evidence: "20 SQLite-Datenbanken geprüft / 2.898 Archivobjekte / Restore-Validierung 5,96 s",
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
];

const workflow = [
  ["Unklarheit eingrenzen", "Randbedingungen, Risiken und das kleinste überprüfbare Ziel festhalten."],
  ["System automatisieren", "Konfiguration in Code überführen und sichere Standardwerte setzen."],
  ["Verhalten beweisen", "Tests, Metriken und reproduzierbare Demos statt bloßer Behauptungen."],
  ["Betrieb übergeben", "Runbook, Fehlerbilder und Recovery so dokumentieren, dass andere weiterkommen."],
];

const directionContract = `<!--
THESIS: Ein technisches Portfolio als helles Inbetriebnahmeprotokoll, ruhig, präzise und überprüfbar.
OWN-WORLD: Systeme sind Aufträge; Projekte sind Prüflose; Tests, Status und Runbooks sind die sichtbaren Belege.
STORY: Erst DevOps-Positionierung und realer GitOps-Lauf, dann fünf inspizierbare Systeme, Arbeitsweise, Grenzen und Kontakt.
FIRST VIEWPORT: Klare Zielrolle, präzise Aussage und ein realer GitOps-Run-Capture.
FORM: Scharfe Werkstattkanten, viel warme Arbeitsfläche, tiefes Graphit und Säuregrün ausschließlich als präzises Signal.
-->`;

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="Leon Westermeir, zum Seitenanfang">
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
            <p className="eyebrow">DevOps / Platform Engineering</p>
            <h1 id="hero-title">IaC. GitOps.<br />Sicher im Betrieb.</h1>
            <p className="hero-intro">
              Ich automatisiere Azure- und Kubernetes-Plattformen mit IaC, CI/CD, Observability und dokumentiertem Recovery.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#projekte">DevOps-Projekte</a>
              <a className="text-action" href="/Leon_Westermeir_Lebenslauf.pdf" target="_blank" rel="noreferrer">Lebenslauf</a>
              <a className="text-action" href="https://github.com/leonwwest" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>

          <figure className="hero-evidence">
            <div className="hero-evidence-frame">
              <Image className="motion-demo" src="/projects/gitops-platform-demo.gif" alt="Realer Verifikationslauf des GitOps Platform Labs" width={1280} height={720} unoptimized priority />
              <Image className="still-demo" src="/projects/gitops-platform.png" alt="Verifikationslauf des GitOps Platform Labs" width={1280} height={640} priority />
            </div>
            <figcaption>
              <strong>GitOps Platform Lab</strong>
              <span>Argo CD: Synced / Healthy</span>
              <span>Drift: 2 → 1 Replica</span>
            </figcaption>
          </figure>
        </section>

        <section className="experience-strip" aria-label="Qualifikation und technische Praxis">
          <div><span>Zielrolle</span><strong>DevOps / Platform Engineering</strong></div>
          <div><span>Cloud</span><strong>Azure / Terraform / OIDC</strong></div>
          <div><span>Platform</span><strong>Kubernetes / Argo CD / Kustomize</strong></div>
          <div><span>Operations</span><strong>Prometheus / OpenTelemetry / Runbooks</strong></div>
        </section>

        <section className="project-section" id="projekte" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <h2 id="projects-title">DevOps-Arbeit zum Prüfen.</h2>
              <p>Infrastruktur, Delivery, Observability und Recovery führen direkt zu Code, CI und Runbooks.</p>
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
                    <span className="project-row-copy">
                      <strong>{project.title}</strong>
                      <small>{project.purpose}</small>
                    </span>
                    <span className="row-status">{project.status}</span>
                    <span className="row-arrow" aria-hidden="true">{selected ? "→" : "↗"}</span>
                  </button>
                );
              })}
            </div>

            <article className="inspection" aria-live="polite" aria-atomic="true">
              <div className="inspection-head">
                <span>{active.role}</span>
                <span>TEST {active.tests}</span>
              </div>
              <div className="demo-frame">
                {active.video ? (
                  <video
                    className="motion-demo product-video"
                    key={`motion-${active.video}`}
                    src={active.video}
                    poster={active.still}
                    aria-label={active.imageAlt}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls
                  />
                ) : (
                  <Image className="motion-demo" key={`motion-${active.image}`} src={active.image} alt={active.imageAlt} width={1280} height={720} unoptimized />
                )}
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
            <div>
              <h2 id="workflow-title">Schnell lernen.<br />Sauber belegen.</h2>
              <p>Produktiver Betrieb verlangt mehr als eine gute Demo. Darum baue ich von Anfang an auf Nachvollziehbarkeit und sichere Übergaben.</p>
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

        <section className="proof-section" aria-labelledby="proof-title">
          <div className="section-heading">
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
              <div><dt>Zielrolle</dt><dd>DevOps / Cloud Platform Engineering</dd></div>
              <div><dt>Arbeitsort</dt><dd>Raum Augsburg / München, remote in Deutschland</dd></div>
              <div><dt>Sprachen</dt><dd>Deutsch und Englisch</dd></div>
            </dl>
          </div>
        </section>

        <section className="more-section" aria-labelledby="more-title">
          <h2 id="more-title">Außerdem gebaut</h2>
          <div className="more-list">
            <a href="https://github.com/leonwwest/operations-kpi-automation-demo" target="_blank" rel="noreferrer"><span>Operations Data Quality</span><small>Python / API / Power BI</small><b>↗</b></a>
            <a href="https://github.com/leonwwest/private-ai-lab" target="_blank" rel="noreferrer"><span>Private AI Platform</span><small>Docker / k3d / Observability</small><b>↗</b></a>
            <a href="https://github.com/leonwwest/cloudscrobble-ios" target="_blank" rel="noreferrer"><span>CloudScrobble</span><small>Swift / Go / Cloudflare Workers</small><b>↗</b></a>
          </div>
        </section>

        <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
          <p className="contact-kicker">Offen für DevOps, Cloud Platform und Infrastructure Automation.</p>
          <h2 id="contact-title">Lassen Sie uns über<br />Ihre DevOps-Rolle sprechen.</h2>
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
