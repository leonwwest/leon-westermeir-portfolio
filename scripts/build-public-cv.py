"""Build the sanitized public CV linked from the portfolio."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


OUTPUT = Path(__file__).resolve().parents[1] / "public" / "Leon_Westermeir_Lebenslauf.pdf"

PAPER = HexColor("#F1F0EA")
INK = HexColor("#161716")
MUTED = HexColor("#5F625D")
SIGNAL = HexColor("#C8FF3D")
LINE = HexColor("#BFC0BA")
WHITE = HexColor("#FFFFFF")

PAGE_W, PAGE_H = A4
LEFT = 17 * mm
RIGHT = PAGE_W - 17 * mm
TOP = PAGE_H - 16 * mm
BOTTOM = 14 * mm
CONTENT_W = RIGHT - LEFT


def paragraph_style(name: str, size: float, leading: float, color=INK, font="Helvetica"):
    return ParagraphStyle(
        name,
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=0,
        splitLongWords=False,
    )


BODY = paragraph_style("body", 8.7, 12.1)
BODY_MUTED = paragraph_style("body-muted", 8.2, 11.5, MUTED)
BODY_SMALL = paragraph_style("body-small", 7.7, 10.6, MUTED)
ROLE = paragraph_style("role", 9.4, 12.4, INK, "Helvetica-Bold")
SECTION = paragraph_style("section", 8.2, 10.2, INK, "Helvetica-Bold")
PROJECT = paragraph_style("project", 9.1, 11.4, INK, "Helvetica-Bold")


def draw_text(c: canvas.Canvas, html: str, style: ParagraphStyle, x: float, y_top: float, width: float) -> float:
    p = Paragraph(html, style)
    _, height = p.wrap(width, PAGE_H)
    p.drawOn(c, x, y_top - height)
    return y_top - height


def page_chrome(c: canvas.Canvas, page_number: int, label: str):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    c.setFillColor(INK)
    c.rect(0, PAGE_H - 8 * mm, PAGE_W, 8 * mm, fill=1, stroke=0)
    c.setFillColor(SIGNAL)
    c.rect(LEFT, PAGE_H - 8 * mm, 22 * mm, 8 * mm, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(LEFT + 3 * mm, PAGE_H - 5.2 * mm, "LW / CV")
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 6.9)
    c.drawRightString(RIGHT, PAGE_H - 5.2 * mm, label.upper())

    c.setStrokeColor(INK)
    c.setLineWidth(0.6)
    c.line(LEFT, BOTTOM - 1.7 * mm, RIGHT, BOTTOM - 1.7 * mm)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 6.7)
    c.drawString(LEFT, BOTTOM - 5.1 * mm, "Öffentliche Fassung · ohne Privatanschrift und Telefonnummer")
    c.drawRightString(RIGHT, BOTTOM - 5.1 * mm, f"{page_number} / 2")


def section_heading(c: canvas.Canvas, title: str, y: float, index: str) -> float:
    c.setFillColor(SIGNAL)
    c.rect(LEFT, y - 4.3 * mm, 7 * mm, 5.2 * mm, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 6.6)
    c.drawCentredString(LEFT + 3.5 * mm, y - 2.65 * mm, index)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 10.4)
    c.drawString(LEFT + 10 * mm, y - 2.7 * mm, title.upper())
    c.setStrokeColor(INK)
    c.setLineWidth(0.6)
    c.line(LEFT + 10 * mm, y - 4.3 * mm, RIGHT, y - 4.3 * mm)
    return y - 9 * mm


def experience_entry(c: canvas.Canvas, y: float, date: str, company: str, role: str, body: str) -> float:
    date_w = 31 * mm
    gap = 6 * mm
    body_x = LEFT + date_w + gap
    body_w = RIGHT - body_x
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(LEFT, y - 2.5 * mm, date)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8.3)
    c.drawString(LEFT, y - 7 * mm, company)
    role_bottom = draw_text(c, role, ROLE, body_x, y, body_w)
    body_bottom = draw_text(c, body, BODY_MUTED, body_x, role_bottom - 1.5 * mm, body_w)
    next_y = min(y - 12 * mm, body_bottom - 4.5 * mm)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.4)
    c.line(body_x, next_y + 1.6 * mm, RIGHT, next_y + 1.6 * mm)
    return next_y


def project_entry(c: canvas.Canvas, y: float, title: str, proof: str, body: str, stack: str) -> float:
    y = draw_text(c, title, PROJECT, LEFT, y, CONTENT_W)
    y = draw_text(c, proof, BODY_SMALL, LEFT, y - 0.5 * mm, CONTENT_W)
    y = draw_text(c, body, BODY, LEFT, y - 1.5 * mm, CONTENT_W)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 7.1)
    c.drawString(LEFT, y - 3.7 * mm, stack.upper())
    next_y = y - 8 * mm
    c.setStrokeColor(LINE)
    c.setLineWidth(0.4)
    c.line(LEFT, next_y + 1.7 * mm, RIGHT, next_y + 1.7 * mm)
    return next_y


def draw_page_one(c: canvas.Canvas):
    page_chrome(c, 1, "Profil und Erfahrung")
    y = TOP - 4 * mm
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(LEFT, y, "Leon Westermeir")
    y -= 10.5 * mm
    c.setFont("Helvetica-Bold", 13)
    c.drawString(LEFT, y, "Microsoft 365 & Infrastructure Automation")

    y -= 9.5 * mm
    contact = [
        "Augsburg / München",
        "leon.westermeir@ibmw-engineering.com",
        "ibmw-automations.de",
        "github.com/leonwwest",
    ]
    x = LEFT
    c.setFont("Helvetica", 7.8)
    for item in contact:
        item_w = stringWidth(item, "Helvetica", 7.8)
        c.setFillColor(INK)
        c.drawString(x, y, item)
        x += item_w + 4.5 * mm
        if item != contact[-1]:
            c.setFillColor(SIGNAL)
            c.circle(x - 2.25 * mm, y + 1.2, 1.15, fill=1, stroke=0)

    y -= 10 * mm
    y = section_heading(c, "Profil", y, "01")
    profile = (
        "Ausgebildeter <b>Fachinformatiker für Systemintegration</b> mit B.Sc. International Information "
        "Systems. Praxis in Microsoft 365, Entra ID, Windows-Infrastruktur, Netzwerk und Security sowie "
        "in der Automatisierung wiederkehrender Betriebsabläufe mit PowerShell und Python. Ich suche eine "
        "Vollzeitrolle, in der sichere Administration, nachvollziehbare Automation und saubere Übergaben zusammengehören."
    )
    y = draw_text(c, profile, paragraph_style("profile", 9.8, 14.0), LEFT, y, CONTENT_W)

    y -= 10 * mm
    y = section_heading(c, "Berufserfahrung", y, "02")
    y = experience_entry(
        c,
        y,
        "03/2026 - 08/2026",
        "Blue Taurus GmbH",
        "IT-Systemadministrator · Vollzeitprojekt",
        "Microsoft 365, Entra ID, Windows, Netzwerk, VPN, Fortinet und Veeam. FortiNAC- und 802.1X-Umfeld "
        "mit rund 800 Geräten und 1.000 gleichzeitigen Lizenzen; technische Dokumentation und nachvollziehbare Übergaben.",
    )
    y = experience_entry(
        c,
        y,
        "09/2025 - heute",
        "Südstahl GmbH & Co. KG",
        "Systemadministration & Automation · paralleles Projekt",
        "Python- und PowerShell-Automation für monatliche BDE-/MITAN-Abläufe mit Preflight-Prüfungen, "
        "SQL-Assets, Tests, Logs, Statusmeldungen, Reports und Runbooks. Ergänzend Active Directory, Backup und Restore.",
    )
    y = experience_entry(
        c,
        y,
        "09/2024 - 02/2026",
        "seele GmbH",
        "Business Intelligence & Automation · Werkstudent/Bachelorprojekt",
        "ETL-/ELT-Strecken mit Talend und SQL Server, Change Data Capture, PowerShell-Automation sowie Reports "
        "und Datenqualitätskontrollen für wiederholbare Integrationsprozesse.",
    )
    y = experience_entry(
        c,
        y,
        "02/2024 - 07/2024",
        "INOYAD Technologies",
        "Backend Development · Werkstudent",
        "Backend-Entwicklung mit Python und FastAPI, API-Verträge, Datenverarbeitung und technische Dokumentation.",
    )
    experience_entry(
        c,
        y,
        "09/2018 - 07/2021",
        "Quentia GmbH",
        "Ausbildung Fachinformatiker Systemintegration",
        "Windows- und Netzwerkbetrieb, Anwendersupport, Systembereitstellung und strukturierte Fehleranalyse.",
    )


def draw_page_two(c: canvas.Canvas):
    page_chrome(c, 2, "Projekte und Qualifikation")
    y = TOP - 4 * mm
    y = section_heading(c, "Ausgewählte Systeme", y, "03")
    y = project_entry(
        c,
        y,
        "Azure & Microsoft 365 Tenant Guard",
        "Release v1.2.0 · 11 Tests · 11 deterministische Findings",
        "Python und PowerShell bewerten ein reproduzierbares Inventar. Remediation bleibt bis zur expliziten "
        "Freigabe im Dry Run; die öffentliche Demo nutzt synthetische Tenant-Daten.",
        "PowerShell · Python · Microsoft Graph · GitHub Actions",
    )
    y = project_entry(
        c,
        y,
        "Azure Platform IaC",
        "Release v1.1.0 · 13 Tests · AzureRM v5 Contract",
        "Terraform modelliert Container Apps, Key Vault und Monitoring. GitHub Actions nutzt kurzlebige OIDC-" 
        "Authentifizierung statt gespeicherter Cloud-Secrets; Evidence belegt lokale Planung und Verträge.",
        "Terraform · Azure · OIDC · GitHub Actions",
    )
    y = project_entry(
        c,
        y,
        "GitOps Platform Lab",
        "Release v1.2.0 · 18 Tests · drei Kustomize-Overlays",
        "Argo CD, Kustomize, Policies und SLOs machen Drift in einem lokalen Cluster sichtbar. Ein dokumentierter "
        "Burn-Rate-Recovery-Ablauf verbindet Alert, Ursache und Wiederherstellung.",
        "Kubernetes · Argo CD · Kustomize · Prometheus",
    )
    y = project_entry(
        c,
        y,
        "Leon Work OS",
        "Privater Eigenbetrieb · 20 SQLite-Datenbanken geprüft · 2.898 Archivobjekte",
        "Task Registry, Mac-Worker und Hermes bilden einen privaten Control Plane. Guardrails, Checkpoints, "
        "verschlüsselte Backups und Restore-Drills halten Automation nachvollziehbar; veröffentlicht sind nur sanitisierte Prüfwerte.",
        "Python · SQLite · macOS · Linux · systemd",
    )

    y -= 3 * mm
    y = section_heading(c, "Ausbildung", y, "04")
    left_w = 39 * mm
    body_x = LEFT + left_w
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(LEFT, y - 2.5 * mm, "10/2021 - 07/2026")
    y1 = draw_text(c, "B.Sc. International Information Systems", ROLE, body_x, y, RIGHT - body_x)
    y1 = draw_text(
        c,
        "Technische Hochschule Augsburg · Abschlussleistungen 07/2026 vollständig erbracht, Zeugnis ausstehend.",
        BODY_MUTED,
        body_x,
        y1 - 1 * mm,
        RIGHT - body_x,
    )
    y = min(y - 16 * mm, y1 - 5 * mm)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(LEFT, y - 2.5 * mm, "09/2018 - 07/2021")
    y2 = draw_text(c, "Fachinformatiker für Systemintegration", ROLE, body_x, y, RIGHT - body_x)
    y = draw_text(c, "IHK Schwaben · duale Ausbildung bei Quentia GmbH.", BODY_MUTED, body_x, y2 - 1 * mm, RIGHT - body_x)

    y -= 9 * mm
    y = section_heading(c, "Kompetenzen", y, "05")
    cols = [
        ("SYSTEME", "Microsoft 365 · Entra ID · Windows · Active Directory · Netzwerk · Fortinet · Veeam"),
        ("AUTOMATION", "PowerShell · Python · REST APIs · SQL · GitHub Actions · CI/CD"),
        ("CLOUD & PLATFORM", "Azure · Terraform · Docker · Kubernetes · Argo CD · Monitoring"),
        ("SPRACHEN", "Deutsch: Muttersprache · Englisch: sehr gut"),
    ]
    col_gap = 7 * mm
    col_w = (CONTENT_W - col_gap) / 2
    for index, (label, value) in enumerate(cols):
        col = index % 2
        row = index // 2
        x = LEFT + col * (col_w + col_gap)
        row_y = y - row * 18 * mm
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 7)
        c.drawString(x, row_y, label)
        draw_text(c, value, BODY_SMALL, x, row_y - 2.5 * mm, col_w)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(LEFT, BOTTOM + 10 * mm, "Portfolio: https://ibmw-automations.de")
    c.setFont("Helvetica", 7.7)
    c.setFillColor(MUTED)
    c.drawRightString(RIGHT, BOTTOM + 10 * mm, "Code, Tests, Runbooks und klare Betriebsgrenzen")


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("Leon Westermeir - Öffentlicher Lebenslauf")
    c.setAuthor("Leon Westermeir")
    c.setSubject("Microsoft 365 & Infrastructure Automation")
    draw_page_one(c)
    c.showPage()
    draw_page_two(c)
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
