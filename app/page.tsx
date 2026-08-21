"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/app/components/site-chrome";
import projectEvidence from "@/content/project-evidence.json";

type EvidenceRecord = {
  release: string;
  testTotal: number;
  highlights: string[];
  boundary: string;
  ciRun: string;
};

const verified = projectEvidence.projects as Record<string, EvidenceRecord>;

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
  image?: string;
  still: string;
  video?: string;
  imageAlt: string;
  repo?: string;
  linkLabel?: string;
  status: string;
  highlights: string[];
  verification: string;
  transfer: string;
  ciRun?: string;
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
    evidence: `${verified["azure-platform"].testTotal} verifizierte Tests / AzureRM v5 Contract / Release ${verified["azure-platform"].release}`,
    decision: "GitHub Actions authentifiziert sich kurzlebig per OIDC statt mit gespeicherten Cloud-Secrets.",
    boundary: verified["azure-platform"].boundary,
    stack: ["Terraform", "Azure", "OIDC", "GitHub Actions"],
    still: "/projects/azure-platform.png",
    video: "/projects/azure-platform-demo.mp4",
    imageAlt: "Terminaldemo des Azure Platform Infrastructure-as-Code Labs",
    repo: "https://github.com/leonwwest/azure-platform-iac-lab",
    status: verified["azure-platform"].release,
    highlights: verified["azure-platform"].highlights,
    verification: "13 / 13",
    transfer: "Terraform-Module pflegen, CI-Guardrails absichern und Azure-Änderungen ohne langlebige Secrets ausliefern.",
    ciRun: verified["azure-platform"].ciRun,
  },
  {
    id: "gitops-platform",
    title: "GitOps Platform Lab",
    role: "Kubernetes operations",
    purpose: "Clusterzustand aus Git reproduzierbar machen, messen und wiederherstellen.",
    result:
      "Argo CD und Kustomize halten den gewünschten Zustand synchron. Policies, SLOs und ein Burn-Rate-Recovery-Ablauf machen Drift sichtbar und behebbar.",
    evidence: `${verified["gitops-platform"].testTotal} verifizierte Tests / drei Overlays / Release ${verified["gitops-platform"].release}`,
    decision: "Ein gemeinsamer Basiszustand wird durch kleine, prüfbare Umgebungs-Overlays erweitert.",
    boundary: verified["gitops-platform"].boundary,
    stack: ["Kubernetes", "Argo CD", "Kustomize", "Prometheus"],
    still: "/projects/gitops-platform.png",
    video: "/projects/gitops-platform-demo.mp4",
    imageAlt: "Terminaldemo des Kubernetes GitOps Platform Labs",
    repo: "https://github.com/leonwwest/gitops-platform-lab",
    status: verified["gitops-platform"].release,
    highlights: verified["gitops-platform"].highlights,
    verification: "24 / 24",
    transfer: "Git-basierte Deployments, Umgebungs-Overlays, Drift-Recovery und SLO-Nachweise in den Plattformbetrieb übernehmen.",
    ciRun: verified["gitops-platform"].ciRun,
  },
  {
    id: "incident-automation",
    title: "Incident Automation Lab",
    role: "Observability & SRE",
    purpose: "Metriken, Logs und Traces in eine sichere Incident-Entscheidung überführen.",
    result:
      "Ein reproduzierbar langsamer FastAPI-Dienst liefert reale Telemetrie an Prometheus, Loki und Jaeger. Deterministische Triage priorisiert Hypothesen, führt aber keine Änderung selbst aus.",
    evidence: "4 Tests + 5 Endpoint-Checks / SEV2-Fixture / CI und Security Gates",
    decision: "Automatisierung sammelt und erklärt Belege; Restart, Scale, Rollback und Credential-Rotation bleiben freigabepflichtig.",
    boundary: verified["incident-automation"].boundary,
    stack: ["OpenTelemetry", "Prometheus", "Grafana", "Loki"],
    still: "/projects/incident-response.png",
    video: "/projects/incident-response-demo.mp4",
    imageAlt: "Realer Lauf des Incident Automation Labs mit langsamer Anfrage und Dry-Run-Triage",
    repo: "https://github.com/leonwwest/slow-ai-app-incident-lab",
    status: verified["incident-automation"].release,
    highlights: verified["incident-automation"].highlights,
    verification: "SEV2 DRY RUN",
    transfer: "Telemetrie korrelieren, Hypothesen priorisieren und freigabepflichtige Recovery-Schritte in belastbare Runbooks überführen.",
    ciRun: verified["incident-automation"].ciRun,
  },
  {
    id: "m365-automation",
    title: "Azure & Microsoft 365 Tenant Guard",
    role: "Governance automation",
    purpose: "Bestände prüfen, Abweichungen erklären und Änderungen kontrolliert freigeben.",
    result:
      "Python und PowerShell erzeugen aus einem reproduzierbaren Inventar denselben Governance-Report. Remediation bleibt bis zur expliziten Freigabe im Dry Run.",
    evidence: "11 Tests (9 Python + 2 Pester) / 11 deterministische Findings / Release v1.2.0",
    decision: "Inventar, Bewertung und Remediation sind getrennte Schritte.",
    boundary: verified["m365-automation"].boundary,
    stack: ["PowerShell", "Python", "Microsoft Graph", "GitHub Actions"],
    still: "/projects/m365-automation.png",
    video: "/projects/m365-automation-demo.mp4",
    imageAlt: "Terminaldemo des Azure und Microsoft 365 Tenant Guard",
    repo: "https://github.com/leonwwest/azure-m365-automation-lab",
    status: verified["m365-automation"].release,
    highlights: verified["m365-automation"].highlights,
    verification: "11 / 11",
    transfer: "Tenant-Inventare, Governance-Reports und kontrollierte Remediation mit PowerShell und Python automatisieren.",
    ciRun: verified["m365-automation"].ciRun,
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
    highlights: ["20/20 SQLite-Datenbanken", "2.898 Archivobjekte", "Restore validiert · 5,96 s"],
    verification: "15.08.2026",
    transfer: "Automationsgrenzen, Freigaben, Wiederanlauf und Betriebsübergaben für interne Systeme nachvollziehbar gestalten.",
  },
];

const roleRoutes = [
  {
    title: "Cloud & Platform",
    copy: "Azure IaC, GitOps, Delivery und Recovery",
    projectId: "azure-platform",
  },
  {
    title: "Microsoft & Automation",
    copy: "M365 Governance, PowerShell und sichere Freigaben",
    projectId: "m365-automation",
  },
  {
    title: "Data & Business Applications",
    copy: "Data Quality, API, Power BI und Integration",
    href: "/projects/data-quality",
  },
];

const directionContract = `<!--
THESIS: Ein technisches Portfolio als helles Inbetriebnahmeprotokoll, ruhig, präzise und überprüfbar.
OWN-WORLD: Systeme sind Aufträge; Projekte sind Prüflose; Tests, Status und Runbooks sind die sichtbaren Belege.
STORY: Erst Cloud- und Platform-Positionierung mit realem Azure-IaC-Lauf, dann rollenbezogene Einstiege, fünf inspizierbare Systeme, Arbeitsweise, Grenzen und Kontakt.
FIRST VIEWPORT: Klare Zielrolle, recruiter-lesbares Ergebnis und ein realer Azure-IaC-Run-Capture.
FORM: Scharfe Werkstattkanten, viel warme Arbeitsfläche, tiefes Graphit und Säuregrün ausschließlich als präzises Signal.
-->`;

function EvidenceVideo({ src, poster, label, priority = false }: { src: string; poster: string; label: string; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <div className="video-shell">
      <Image
        className={`video-poster${playing ? " video-poster-hidden" : ""}`}
        src={poster}
        alt=""
        fill
        sizes="(max-width: 1040px) 100vw, 50vw"
        priority={priority}
      />
      <video
        ref={videoRef}
        className={`motion-demo${playing ? " video-playing" : ""}`}
        src={src}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="media-actions">
        <button type="button" onClick={togglePlayback} aria-pressed={playing}>
          {playing ? "Demo pausieren" : "Demo abspielen"}
        </button>
        <a href={src} target="_blank" rel="noreferrer">Original öffnen ↗</a>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const [announcement, setAnnouncement] = useState("");
  const inspectionRef = useRef<HTMLElement>(null);
  const active = projects.find((project) => project.id === activeId) ?? projects[0];

  useEffect(() => {
    const syncFromHash = () => {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const requested = params.get("project");
      if (requested && projects.some((project) => project.id === requested)) {
        setActiveId(requested);
      } else if (params.has("project")) {
        setActiveId(projects[0].id);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const selectProject = (projectId: string, scrollTarget: "inspection" | "section" = "inspection") => {
    const project = projects.find((candidate) => candidate.id === projectId);
    if (!project) return;
    setActiveId(projectId);
    setAnnouncement(`${project.title} ausgewählt.`);
    window.history.replaceState(null, "", `#project=${projectId}`);
    window.requestAnimationFrame(() => {
      const compactLayout = window.matchMedia("(max-width: 1040px)").matches;
      const target = compactLayout || scrollTarget === "inspection" ? inspectionRef.current : document.getElementById("projekte");
      if (scrollTarget === "section" || compactLayout) {
        target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      }
    });
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: directionContract }} />
      <a className="skip-link" href="#main">Zum Inhalt springen</a>

      <SiteHeader />

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">DevOps / Platform Engineering</p>
            <h1 id="hero-title">Cloud aus Code.<br />Sicher im Betrieb.</h1>
            <p className="hero-intro">
              Ich plane Azure-Plattformen als Infrastructure as Code, liefere Kubernetes-Änderungen über Git aus und belege den Betrieb mit CI, Telemetrie und Recovery-Runbooks.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#einstieg">Passendes Projekt finden</a>
              <a className="text-action" href="/Leon_Westermeir_Lebenslauf.pdf" target="_blank" rel="noreferrer">Lebenslauf</a>
              <a className="text-action" href="https://github.com/leonwwest" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>

          <figure className="hero-evidence">
            <div className="hero-evidence-frame">
              <EvidenceVideo
                src="/projects/azure-platform-demo.mp4"
                poster="/projects/azure-platform.png"
                label="Realer Verifikationslauf des Azure Platform Infrastructure-as-Code Labs"
                priority
              />
            </div>
            <figcaption>
              <strong>Azure Platform IaC</strong>
              <span>13/13 Tests</span>
              <span>5 Policy-Guardrails</span>
            </figcaption>
          </figure>
        </section>

        <section className="role-routes" id="einstieg" aria-labelledby="routes-title">
          <p id="routes-title">Passender Einstieg nach Rolle</p>
          <div className="role-route-list">
            {roleRoutes.map((route) => route.projectId ? (
              <a
                key={route.title}
                href={`#project=${route.projectId}`}
                onClick={(event) => {
                  event.preventDefault();
                  selectProject(route.projectId, "section");
                }}
              >
                <strong>{route.title}</strong>
                <span>{route.copy}</span>
                <b>Projektpfad öffnen</b>
              </a>
            ) : (
              <a key={route.title} href={route.href}>
                <strong>{route.title}</strong>
                <span>{route.copy}</span>
                <b>Projektpfad öffnen</b>
              </a>
            ))}
          </div>
        </section>

        <section className="project-section" id="projekte" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <h2 id="projects-title">Engineering-Belege zum Prüfen.</h2>
              <p>Jedes System führt zuerst zum Ergebnis und dann zu Code, CI, Entscheidungen und ehrlichen Betriebsgrenzen.</p>
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
                    onClick={() => selectProject(project.id)}
                    aria-pressed={selected}
                    aria-controls="project-inspection"
                  >
                    <span className="project-row-copy">
                      <strong>{project.title}</strong>
                      <small>{project.purpose}</small>
                    </span>
                    <span className="row-status">{project.status}</span>
                    <span className="row-indicator" data-selected={selected} aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
            <article className="inspection" id="project-inspection" ref={inspectionRef} tabIndex={-1}>
              <div className="inspection-head">
                <span>{active.role}</span>
                <span>VERIFIZIERT {active.verification}</span>
              </div>
              <ul className="proof-highlights" aria-label="Verifizierte Projektergebnisse">
                {active.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              <div className="demo-frame">
                {active.video ? (
                  <EvidenceVideo
                    key={active.video}
                    src={active.video}
                    poster={active.still}
                    label={active.imageAlt}
                  />
                ) : (
                  <a className="image-original" href={active.still} target="_blank" rel="noreferrer" aria-label="Originalansicht des Nachweises öffnen">
                    <Image key={active.image ?? active.still} src={active.image ?? active.still} alt={active.imageAlt} width={1280} height={720} unoptimized />
                    <span>Original vergrößern ↗</span>
                  </a>
                )}
              </div>
              <div className="inspection-copy">
                <p className="inspection-kicker">Was hier gelöst wird</p>
                <h3>{active.purpose}</h3>
                <p>{active.result}</p>
                <dl className="evidence-facts">
                  <div><dt>Entscheidung</dt><dd>{active.decision}</dd></div>
                  <div><dt>Nachweis</dt><dd>{active.evidence}</dd></div>
                  <div><dt>Im Team</dt><dd>{active.transfer}</dd></div>
                  <div><dt>Grenze</dt><dd>{active.boundary}</dd></div>
                </dl>
                <ul className="stack-list" aria-label="Technologien">
                  {active.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {active.repo ? (
                  <div className="evidence-links">
                    <a className="repo-link" href={active.repo} target="_blank" rel="noreferrer">Repository und Runbook öffnen ↗</a>
                    {active.ciRun ? <a className="repo-link" href={active.ciRun} target="_blank" rel="noreferrer">Verifizierten CI-Lauf öffnen ↗</a> : null}
                  </div>
                ) : active.proof ? (
                  <a className="repo-link" href={active.proof}>{active.linkLabel}</a>
                ) : (
                  <p className="private-project-note">{active.linkLabel}</p>
                )}
              </div>
            </article>
          </div>
        </section>

        <section className="more-section" aria-labelledby="more-title">
          <h2 id="more-title">Außerdem gebaut</h2>
          <div className="more-list">
            <a id="data-quality" href="/projects/data-quality"><span>Operations Data Quality</span><small>27/27 Tests / 6 Quality Checks / Power BI</small><b>Details</b></a>
            <a href="https://github.com/leonwwest/private-ai-lab" target="_blank" rel="noreferrer"><span>Private AI Platform</span><small>Docker / k3d / Observability</small><b>↗</b></a>
            <a href="https://github.com/leonwwest/cloudscrobble-ios" target="_blank" rel="noreferrer"><span>CloudScrobble</span><small>Swift / Go / Cloudflare Workers</small><b>↗</b></a>
          </div>
          <a className="work-method-link" href="/arbeitsweise">Arbeitsweise, Evidenzgrenzen und Übergaben ansehen →</a>
        </section>

        <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
          <p className="contact-kicker">Offen für Cloud, Platform und Infrastructure Automation.</p>
          <h2 id="contact-title">Lassen Sie uns über<br />Ihr System sprechen.</h2>
          <a className="contact-mail" href="mailto:leon.westermeir@ibmw-engineering.com">leon.westermeir@<wbr />ibmw-engineering.com <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
