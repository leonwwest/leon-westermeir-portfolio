"""Sanitized single source of truth for the public and application CV exports."""

import json
from pathlib import Path


EVIDENCE_PATH = Path(__file__).resolve().parents[1] / "content" / "project-evidence.json"
EVIDENCE = json.loads(EVIDENCE_PATH.read_text(encoding="utf-8"))["projects"]

HEADLINE = "DevOps & Cloud Platform Engineering"

PROFILE = (
    "Fachinformatiker für Systemintegration mit vollständig erbrachten Abschlussleistungen im "
    "Studiengang International Information Systems (B.Sc.) und Praxis in IT-Betrieb, Security, "
    "Automatisierung und strukturiertem Troubleshooting. Reproduzierbare Labs belegen Azure IaC, "
    "Kubernetes GitOps, CI/CD, Observability und Recovery."
)

AVAILABILITY = "Verfügbar ab 01.10.2026"
EDUCATION_STATUS = "Abschlussleistungen erbracht · Zeugnis ausstehend · immatrikuliert bis 30.09.2026"

SKILLS = [
    (
        "Cloud & Infrastructure as Code",
        "Azure, Container Apps, Terraform, VNet, Private Endpoint/DNS, Managed Identity, RBAC, GitHub OIDC",
    ),
    (
        "GitOps & Delivery",
        "Docker, Kubernetes, k3d, Kustomize, Argo CD, GitHub Actions, CI/CD, automatisierte Tests",
    ),
    (
        "Observability & Reliability",
        "Prometheus, Grafana, Loki, OpenTelemetry, SLOs, Incident-Triage, Recovery und Runbooks",
    ),
    (
        "Infrastructure & Automation",
        "Windows Server, Active Directory, Entra ID, Netzwerk, PowerShell, Python, Backup/Restore",
    ),
]

EXPERIENCE_PRIMARY = [
    {
        "role": "IT-Systemadministration, 2nd-Level und Projekte",
        "company": "Blue Taurus GmbH & Co. KG",
        "dates": "03/2026 - 08/2026",
        "meta": "Vollzeit, projektbezogene Tätigkeit · Projektabschluss im August 2026",
        "bullets": [
            "Technische Anliegen in Microsoft-365-, Entra-ID-, Windows-Server-, Netzwerk-/VPN-, Fortinet- und Veeam-Umgebungen analysiert und bearbeitet.",
            "Die schrittweise FortiNAC-/802.1X-Einführung in einer Kundenumgebung mit rund 800 erfassten Geräten und 1.000 Concurrent-Lizenzen unterstützt.",
            "Portanalysen, NAC-Pilotierung, Zertifikats- und EAP-TLS-Tests sowie strukturierte Betriebs- und Troubleshooting-Dokumentation umgesetzt.",
        ],
    },
    {
        "role": "IT-Systemadministration und Automatisierung",
        "company": "Südstahl GmbH",
        "dates": "seit 09/2025",
        "meta": "Projektbezogen, parallel",
        "bullets": [
            "Monatlichen BDE-/MITAN-Prozess mit Python und PowerShell automatisiert; Preflight, SQL-Assets, Tests, Logs, Statusdateien, Reports und Runbooks integriert.",
            "IT-Betrieb, Active Directory, Backup-/Restore-Vorbereitung und reproduzierbare technische Übergaben unterstützt.",
        ],
    },
    {
        "role": "Werkstudent Business Intelligence und Bachelorand",
        "company": "seele GmbH",
        "dates": "09/2024 - 02/2026",
        "meta": "Zusammenhängende Beschäftigung mit internem Rollenwechsel",
        "bullets": [
            "ETL-/ELT-Prozesse mit Talend, SQL Server und ERP-/DWH-Daten entwickelt und betrieben.",
            "Eine CDC-Pipeline in der mit 1,0 bewerteten Bachelorarbeit konzipiert und implementiert; Betriebs- und Monitoringaufgaben mit PowerShell automatisiert.",
        ],
    },
]

EXPERIENCE_SECONDARY = [
    {
        "role": "Praktikum Backend Development",
        "company": "INOYAD GmbH",
        "dates": "02/2024 - 07/2024",
        "meta": "",
        "bullets": [
            "Backend-Komponenten, Tests und Automatisierungen mit Python, FastAPI, PostgreSQL/MSSQL, SQLAlchemy und Alembic umgesetzt."
        ],
    },
    {
        "role": "IT-Unterstützung",
        "company": "ibmw Ingenieurbüro",
        "dates": "seit 03/2019",
        "meta": "Nebenberuflich und projektbezogen",
        "bullets": [
            "Langfristige Unterstützung bei Client-, Microsoft-, Netzwerk-, Benutzer- und allgemeinen IT-Betriebsthemen."
        ],
    },
    {
        "role": "Ausbildung Fachinformatiker Systemintegration",
        "company": "Quentia GmbH",
        "dates": "09/2018 - 07/2021",
        "meta": "IHK Schwaben",
        "bullets": [
            "System- und Netzwerkplanung, Support, Monitoring, Backup und technische Kundendokumentation umgesetzt; einzelne Wartungskunden selbstständig betreut."
        ],
    },
]

PROJECTS = [
    {
        "title": "Azure Platform IaC Lab",
        "url": "https://github.com/leonwwest/azure-platform-iac-lab",
        "proof": f"Release {EVIDENCE['azure-platform']['release']} · {EVIDENCE['azure-platform']['testTotal']} Tests · AzureRM-v5-Contract",
        "text": (
            "Terraform modelliert Azure Container Apps, Managed Identity, einen privaten Key-Vault-Endpunkt, "
            "RBAC, Monitoring und Kostenleitplanken. GitHub Actions nutzt OIDC statt gespeicherter Cloud-Secrets; "
            "Apply bleibt explizit freigabegesteuert."
        ),
        "boundary": "Portfolio-Lab; keine produktive Kundenumgebung.",
    },
    {
        "title": "GitOps Platform Lab",
        "url": "https://github.com/leonwwest/gitops-platform-lab",
        "proof": f"Release {EVIDENCE['gitops-platform']['release']} · {EVIDENCE['gitops-platform']['testTotal']} Tests · drei Kustomize-Overlays",
        "text": (
            "Ein Non-Root-FastAPI-Service wird über Git Desired State, Kustomize und Argo CD reconciliert. "
            "Prometheus, Grafana, Loki und OpenTelemetry belegen SLOs, Drift Self-Healing, Failure Exercise "
            "und Git-basiertes Recovery."
        ),
        "boundary": "Lokal reproduzierbares Lab; kein produktiver Cluster.",
    },
    {
        "title": "Incident Automation Lab",
        "url": "https://github.com/leonwwest/slow-ai-app-incident-lab",
        "proof": "Release v1.1.0 · SEV2-Fixture · Triage im Dry Run",
        "text": (
            "Prometheus-Metriken, Loki-Logs und OpenTelemetry-Traces werden zu einer deterministischen, "
            "erklärbaren Incident-Triage verbunden. Restart, Scale, Rollback und Credential-Rotation bleiben "
            "freigabepflichtig."
        ),
        "boundary": "Reale Lab-Telemetrie mit simulierten Fehlerbildern.",
    },
]

EDUCATION = [
    {
        "title": "B.Sc. International Information Systems",
        "institution": "Technische Hochschule Augsburg",
        "dates": "10/2021 - 09/2026",
        "detail": "Abschlussleistungen 07/2026 vollständig erbracht; Zeugnis ausstehend; immatrikuliert bis 30.09.2026",
    },
    {
        "title": "Bachelorarbeit: Konzeption und Implementierung einer CDC-Pipeline",
        "institution": "Technische Hochschule Augsburg",
        "dates": "2026",
        "detail": "Note 1,0 · ausschließlich Note der Bachelorarbeit, keine Gesamtnote",
    },
    {
        "title": "Fachinformatiker für Systemintegration (IHK)",
        "institution": "Quentia GmbH · IHK Schwaben",
        "dates": "09/2018 - 07/2021",
        "detail": "Duale Ausbildung",
    },
]

LANGUAGES = [
    ("Deutsch", "Muttersprache"),
    ("Englisch", "Fließende berufliche und akademische Kenntnisse; Englisch-Abitur und englischsprachiges Studium"),
]
