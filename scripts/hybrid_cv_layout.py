"""Shared ATS-readable reportlab layout for public and application CV exports."""

from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


PAGE_W, PAGE_H = A4
LEFT = 17 * mm
RIGHT = 17 * mm
TOP = 15 * mm
BOTTOM = 17 * mm
CONTENT_W = PAGE_W - LEFT - RIGHT

PAPER = colors.HexColor("#F1F0EA")
PAPER_BRIGHT = colors.HexColor("#FAF9F5")
INK = colors.HexColor("#161716")
INK_SOFT = colors.HexColor("#3F413E")
MUTED = colors.HexColor("#5F625D")
LINE = colors.HexColor("#C8C9C2")
SIGNAL = colors.HexColor("#C8FF3D")
SIGNAL_DARK = colors.HexColor("#526D00")
WHITE = colors.HexColor("#F1F0EA")


def register_fonts() -> tuple[str, str, str]:
    regular = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
    bold = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
    italic = Path("/System/Library/Fonts/Supplemental/Arial Italic.ttf")
    if regular.exists() and bold.exists() and italic.exists():
        pdfmetrics.registerFont(TTFont("HybridArial", str(regular)))
        pdfmetrics.registerFont(TTFont("HybridArial-Bold", str(bold)))
        pdfmetrics.registerFont(TTFont("HybridArial-Italic", str(italic)))
        pdfmetrics.registerFontFamily(
            "HybridArial",
            normal="HybridArial",
            bold="HybridArial-Bold",
            italic="HybridArial-Italic",
            boldItalic="HybridArial-Bold",
        )
        return "HybridArial", "HybridArial-Bold", "HybridArial-Italic"
    return "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"


FONT, FONT_BOLD, FONT_ITALIC = register_fonts()
BASE = getSampleStyleSheet()

STYLES = {
    "name": ParagraphStyle(
        "Name", parent=BASE["Normal"], fontName=FONT_BOLD, fontSize=25, leading=27,
        textColor=INK, spaceAfter=1,
    ),
    "headline": ParagraphStyle(
        "Headline", parent=BASE["Normal"], fontName=FONT, fontSize=12.4, leading=14.5,
        textColor=SIGNAL_DARK, spaceAfter=4,
    ),
    "contact": ParagraphStyle(
        "Contact", parent=BASE["Normal"], fontName=FONT, fontSize=8.1, leading=10.2,
        textColor=MUTED, spaceAfter=0,
    ),
    "section": ParagraphStyle(
        "Section", parent=BASE["Normal"], fontName=FONT_BOLD, fontSize=10.3, leading=12,
        textColor=INK, spaceAfter=0, keepWithNext=True,
    ),
    "body": ParagraphStyle(
        "Body", parent=BASE["Normal"], fontName=FONT, fontSize=9, leading=11.4,
        textColor=INK_SOFT, spaceAfter=0,
    ),
    "profile": ParagraphStyle(
        "Profile", parent=BASE["Normal"], fontName=FONT, fontSize=9.5, leading=12.1,
        textColor=INK, spaceAfter=0,
    ),
    "skill_label": ParagraphStyle(
        "SkillLabel", parent=BASE["Normal"], fontName=FONT_BOLD, fontSize=8.2, leading=9.8,
        textColor=INK, spaceAfter=1,
    ),
    "skill_text": ParagraphStyle(
        "SkillText", parent=BASE["Normal"], fontName=FONT, fontSize=8, leading=9.8,
        textColor=INK_SOFT,
    ),
    "job_title": ParagraphStyle(
        "JobTitle", parent=BASE["Normal"], fontName=FONT_BOLD, fontSize=9.3, leading=11.2,
        textColor=INK,
    ),
    "job_date": ParagraphStyle(
        "JobDate", parent=BASE["Normal"], fontName=FONT, fontSize=7.7, leading=9.4,
        textColor=MUTED, alignment=TA_RIGHT,
    ),
    "meta": ParagraphStyle(
        "Meta", parent=BASE["Normal"], fontName=FONT_ITALIC, fontSize=7.7, leading=9.2,
        textColor=MUTED, spaceAfter=1.2,
    ),
    "bullet": ParagraphStyle(
        "Bullet", parent=BASE["Normal"], fontName=FONT, fontSize=8.35, leading=10.35,
        textColor=INK_SOFT, leftIndent=8, firstLineIndent=-6, spaceAfter=0.8,
    ),
    "project_title": ParagraphStyle(
        "ProjectTitle", parent=BASE["Normal"], fontName=FONT_BOLD, fontSize=9.2, leading=10.8,
        textColor=INK,
    ),
    "project_proof": ParagraphStyle(
        "ProjectProof", parent=BASE["Normal"], fontName=FONT, fontSize=7.7, leading=9.2,
        textColor=MUTED, spaceAfter=1,
    ),
    "project_text": ParagraphStyle(
        "ProjectText", parent=BASE["Normal"], fontName=FONT, fontSize=8.3, leading=10.2,
        textColor=INK_SOFT,
    ),
    "small_label": ParagraphStyle(
        "SmallLabel", parent=BASE["Normal"], fontName=FONT_BOLD, fontSize=8, leading=9.6,
        textColor=INK,
    ),
    "small": ParagraphStyle(
        "Small", parent=BASE["Normal"], fontName=FONT, fontSize=7.9, leading=9.7,
        textColor=INK_SOFT,
    ),
    "strip": ParagraphStyle(
        "Strip", parent=BASE["Normal"], fontName=FONT_BOLD, fontSize=7.4, leading=9,
        textColor=INK,
    ),
}


class HybridCanvas(canvas.Canvas):
    def __init__(self, *args, footer_text: str, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []
        self.footer_text = footer_text
        self._draw_background()

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()
        self._draw_background()

    def save(self):
        total_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self._draw_page(total_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def _draw_page(self, total_pages: int) -> None:
        self.saveState()

        self.setFillColor(INK)
        self.rect(0, PAGE_H - 10 * mm, PAGE_W, 10 * mm, fill=1, stroke=0)
        self.setFillColor(SIGNAL)
        self.rect(LEFT, PAGE_H - 10 * mm, 27 * mm, 10 * mm, fill=1, stroke=0)
        self.setFillColor(INK)
        self.setFont(FONT_BOLD, 7.3)
        self.drawString(LEFT + 4 * mm, PAGE_H - 6.4 * mm, "LW / CV")
        self.setFillColor(WHITE)
        self.setFont(FONT, 7.1)
        self.drawRightString(PAGE_W - RIGHT, PAGE_H - 6.4 * mm, "DEVOPS & CLOUD PLATFORM")

        footer_y = 9.8 * mm
        self.setStrokeColor(INK)
        self.setLineWidth(0.55)
        self.line(LEFT, footer_y + 4.1 * mm, PAGE_W - RIGHT, footer_y + 4.1 * mm)
        self.setFillColor(MUTED)
        self.setFont(FONT, 6.8)
        self.drawString(LEFT, footer_y, self.footer_text)
        self.drawRightString(PAGE_W - RIGHT, footer_y, f"{self._pageNumber} / {total_pages}")
        self.restoreState()

    def _draw_background(self) -> None:
        self.saveState()
        self.setFillColor(PAPER)
        self.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        self.restoreState()


def paragraph(text: str, style: str = "body") -> Paragraph:
    return Paragraph(text, STYLES[style])


def section(title: str) -> list:
    return [
        Spacer(1, 3.4 * mm),
        paragraph(title.upper(), "section"),
        HRFlowable(width="100%", thickness=0.65, color=INK, spaceBefore=1.2 * mm, spaceAfter=2.2 * mm),
    ]


def availability_strip(availability: str, education_status: str) -> Table:
    table = Table(
        [[paragraph(availability.upper(), "strip"), paragraph(education_status.upper(), "strip")]],
        colWidths=[55 * mm, CONTENT_W - 55 * mm],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SIGNAL),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 2.1 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.1 * mm),
                ("LINEAFTER", (0, 0), (0, 0), 0.5, INK),
            ]
        )
    )
    return table


def skill_grid(skills: list[tuple[str, str]]) -> Table:
    rows = []
    for index in range(0, len(skills), 2):
        cells = []
        for label, value in skills[index : index + 2]:
            cells.append([paragraph(label, "skill_label"), paragraph(value, "skill_text")])
        rows.append(cells)
    table = Table(rows, colWidths=[CONTENT_W / 2] * 2)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PAPER_BRIGHT),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 2.2 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2 * mm),
            ]
        )
    )
    return table


def job_block(job: dict, compact: bool = False) -> KeepTogether:
    head = Table(
        [[paragraph(f"{job['role']} | {job['company']}", "job_title"), paragraph(job["dates"], "job_date")]],
        colWidths=[CONTENT_W - 37 * mm, 37 * mm],
    )
    head.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    content = [head]
    if job.get("meta"):
        content.append(paragraph(job["meta"], "meta"))
    content.extend(paragraph(f"- {bullet}", "bullet") for bullet in job["bullets"])
    body = Table([[content]], colWidths=[CONTENT_W])
    body.setStyle(
        TableStyle(
            [
                ("LINEBEFORE", (0, 0), (0, 0), 1.2, SIGNAL_DARK),
                ("LEFTPADDING", (0, 0), (0, 0), 3 * mm),
                ("RIGHTPADDING", (0, 0), (0, 0), 0),
                ("TOPPADDING", (0, 0), (0, 0), 1 * mm),
                ("BOTTOMPADDING", (0, 0), (0, 0), 1 * mm),
            ]
        )
    )
    return KeepTogether([body, Spacer(1, (0.7 if compact else 1.2) * mm)])


def project_block(project: dict) -> KeepTogether:
    title = f'<link href="{project["url"]}">{project["title"]}</link>'
    content = [
        paragraph(title, "project_title"),
        paragraph(project["proof"], "project_proof"),
        paragraph(project["text"], "project_text"),
        paragraph(f'<font color="#5F625D">Grenze: {project["boundary"]}</font>', "project_text"),
    ]
    table = Table([[content]], colWidths=[CONTENT_W])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), PAPER_BRIGHT),
                ("BOX", (0, 0), (0, 0), 0.45, LINE),
                ("LEFTPADDING", (0, 0), (0, 0), 3 * mm),
                ("RIGHTPADDING", (0, 0), (0, 0), 3 * mm),
                ("TOPPADDING", (0, 0), (0, 0), 2 * mm),
                ("BOTTOMPADDING", (0, 0), (0, 0), 2 * mm),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 1.4 * mm)])


def education_language_table(education: list[dict], languages: list[tuple[str, str]]) -> Table:
    education_content = [paragraph("AUSBILDUNG", "small_label")]
    for item in education:
        education_content.extend(
            [
                Spacer(1, 1 * mm),
                paragraph(f"<b>{item['title']}</b> | {item['dates']}", "small"),
                paragraph(f"{item['institution']}<br/>{item['detail']}", "small"),
            ]
        )
    language_content = [paragraph("SPRACHEN & ARBEITSWEISE", "small_label")]
    for label, value in languages:
        language_content.extend([Spacer(1, 1 * mm), paragraph(f"<b>{label}:</b> {value}", "small")])
    language_content.extend(
        [
            Spacer(1, 1 * mm),
            paragraph("<b>Arbeitsweise:</b> analytisch, dokumentationsstark, sicherheitsbewusst und umsetzungsorientiert", "small"),
        ]
    )
    table = Table(
        [[education_content, language_content]],
        colWidths=[CONTENT_W * 0.56, CONTENT_W * 0.44],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PAPER_BRIGHT),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("LINEAFTER", (0, 0), (0, 0), 0.5, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
            ]
        )
    )
    return table


def build_cv(
    *,
    output: Path,
    name: str,
    headline: str,
    contact_html: str,
    profile: str,
    availability: str,
    education_status: str,
    skills: list[tuple[str, str]],
    experience_primary: list[dict],
    experience_secondary: list[dict],
    projects: list[dict],
    education: list[dict],
    languages: list[tuple[str, str]],
    footer_text: str,
    subject: str,
) -> Path:
    output.parent.mkdir(parents=True, exist_ok=True)
    document = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        leftMargin=LEFT,
        rightMargin=RIGHT,
        topMargin=TOP,
        bottomMargin=BOTTOM,
        title=f"Lebenslauf Leon Westermeir - {headline}",
        subject=subject,
        author=name,
        creator="Leon Westermeir Hybrid CV Builder",
    )

    story = [
        Spacer(1, 2 * mm),
        paragraph(name, "name"),
        paragraph(headline, "headline"),
        paragraph(contact_html, "contact"),
        Spacer(1, 3 * mm),
        availability_strip(availability, education_status),
    ]
    story.extend(section("Profil"))
    story.append(paragraph(profile, "profile"))
    story.extend(section("Kernkompetenzen"))
    story.append(skill_grid(skills))
    story.extend(section("Berufserfahrung"))
    story.extend(job_block(job) for job in experience_primary)
    if experience_secondary:
        story.append(job_block(experience_secondary[0], compact=True))

    story.append(PageBreak())
    story.extend(section("Weitere Erfahrung"))
    story.extend(job_block(job, compact=True) for job in experience_secondary[1:])
    story.extend(section("Ausgewählte Engineering-Projekte"))
    story.extend(project_block(project) for project in projects)
    story.extend(section("Ausbildung & Sprachen"))
    story.append(education_language_table(education, languages))

    def canvas_factory(*args, **kwargs):
        return HybridCanvas(*args, footer_text=footer_text, **kwargs)

    document.build(story, canvasmaker=canvas_factory)
    return output
