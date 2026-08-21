"""Build the sanitized public export from the shared hybrid CV source."""

from pathlib import Path

from hybrid_cv_content import (
    AVAILABILITY,
    EDUCATION,
    EDUCATION_STATUS,
    EXPERIENCE_PRIMARY,
    EXPERIENCE_SECONDARY,
    HEADLINE,
    LANGUAGES,
    PROFILE,
    PROJECTS,
    SKILLS,
)
from hybrid_cv_layout import build_cv


OUTPUT = Path(__file__).resolve().parents[1] / "public" / "Leon_Westermeir_Lebenslauf.pdf"


if __name__ == "__main__":
    contact = (
        "Augsburg / München&nbsp;&nbsp;|&nbsp;&nbsp;"
        '<link href="mailto:leon.westermeir@ibmw-engineering.com">leon.westermeir@ibmw-engineering.com</link><br/>'
        '<link href="https://ibmw-automations.de/#project=azure-platform">ibmw-automations.de</link>&nbsp;&nbsp;|&nbsp;&nbsp;'
        '<link href="https://github.com/leonwwest">github.com/leonwwest</link>'
    )
    print(
        build_cv(
            output=OUTPUT,
            name="Leon Westermeir",
            headline=HEADLINE,
            contact_html=contact,
            profile=PROFILE,
            availability=AVAILABILITY,
            education_status=EDUCATION_STATUS,
            skills=SKILLS,
            experience_primary=EXPERIENCE_PRIMARY,
            experience_secondary=EXPERIENCE_SECONDARY,
            projects=PROJECTS,
            education=EDUCATION,
            languages=LANGUAGES,
            footer_text="Öffentliche Fassung · ohne Privatanschrift und Telefonnummer",
            subject="Öffentlicher Lebenslauf für DevOps und Cloud Platform Engineering",
        )
    )
