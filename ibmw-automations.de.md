# Design Map

## Spacing Scale

- Component gaps: `8.8px`, `12.8px`, `16px`, `20px`, `24px`
- Section padding: `72px`
- Chapter interval: `115px`
- Dominant method: CSS `gap` inside components; padding and measured whitespace between sections

## Font Hierarchy

- Hero: `89.28px / 650 / 83.9232px`, IBM Plex Sans
- Section heading: `66.24px / 650 / 64.9152px`, IBM Plex Sans
- Subheading: `24px / 400 / 26.88px`, IBM Plex Sans
- Body: `15.04px / 400`, Public Sans
- Micro-label: `10.4px / 800`, Public Sans or `ui-monospace`

## Color Palette

- Deep field: `#0D2639`
- Paper: `#F7F5EF`
- Primary ink: `#15334F`
- Cool panel: `#E7E9E5`
- White panel: `#FFFEFA`
- Signal orange: `#D56D24`; dark text variant `#9C4E18`
- Muted text: `#5E6B73`

## Image Ratios

- No photographic or illustrative images above `80 × 80px`
- Operational workbench: `401 × 387px`, ratio `1.04:1`

## Component Tokens

- Grid: `2` columns (`541.148px / 400.844px`) with `72px` gutter
- Corner radii: `2px`, `3px`, `4px`; pills use `999px`
- Workbench shadow: `12px 12px 0 rgba(21, 51, 79, 0.09)`
- Soft elevation: `0 18px 44px rgba(11, 36, 54, 0.08)`
- Interaction timing: `160ms` for transform/color; `520ms` for entrance opacity/transform
- `:focus-visible` and `prefers-reduced-motion` are present

---

# Taste DNA

### Evidence occupies the image slot

- **Trigger**: When the first viewport needed a visual anchor.
- **Decision**: Chose a `401 × 387px` operational workbench over a hero photograph or illustration.
- **Reason**: A visitor evaluating process automation can inspect a working mechanism sooner than they can trust a mood image.
- **Evidence**: No rendered images above `80px`; workbench ratio `1.04:1`; two-column hero with `72px` gutter.

### Scroll pauses mark chapters

- **Trigger**: When successive explanations could have been compressed into a shorter page.
- **Decision**: Chose `115px` section intervals and `72px` section padding over a dense continuous pitch.
- **Reason**: Each operational claim receives a reset before the next one, so the reader can retain the sequence rather than skim a wall of promises.
- **Evidence**: Eight consecutive `115px` section gaps; `72px` section padding; `16–24px` component gaps.

### Orange behaves as a status signal

- **Trigger**: When a second brand color could have spread across backgrounds and decoration.
- **Decision**: Chose tiny `#D56D24` and `#9C4E18` signal moments over broad orange surfaces.
- **Reason**: Rare color reads as a change in operational state instead of becoming atmosphere.
- **Evidence**: `#0D2639` owns `29.9%` of measured background area; orange background area rounds to `0%`; navy and paper remain dominant.

### Workshop edges replace soft containers

- **Trigger**: When dense process material needed separation.
- **Decision**: Chose `2–4px` corners and a `12px` hard offset shadow over large-radius floating cards.
- **Reason**: Components feel handled and placed like tools or sheets, keeping technical material grounded in work rather than presentation chrome.
- **Evidence**: `2px` radius appears `12` times; `3px` appears `7` times; the workbench carries a navy-tinted `12px 12px` offset shadow.
