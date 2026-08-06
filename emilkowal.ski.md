# Design Map

## Spacing Scale

- Inline and list rhythm: `8px`, `12px`, `16px`, `24px`
- Major reading pause: `64px`, `128px`
- Repeated chapter distance: `128px`

## Font Hierarchy

- Section title: `16px / 500`, Sans
- Body and project names: `16px / 400`, Sans
- Utility control: `14px / 400`, Sans
- Body line height: `26.4px`

## Color Palette

- Page background: `#FDFDFC`
- Primary surface: `#FFFFFF`
- Primary text: `#21201C`
- Secondary text: `#63635E`
- Inverse text: `#FDFDFC`

## Image Ratios

- No photographic or illustrative images above `80 × 80px`
- No project thumbnails or hero media

## Component Tokens

- Content width: `644px`; one column
- Corner radii: `6px`, `8px`; compact controls use `9999px`
- Elevation: `0 0 0 1px rgba(0,0,0,.08), 0 2px 2px rgba(0,0,0,.04)`
- Transition: `150ms cubic-bezier(.4, 0, .2, 1)` for color and border states
- `:focus-visible` is present

---

# Taste DNA

### The index replaces the showcase

- **Trigger**: When projects and essays needed to be browsed quickly.
- **Decision**: Chose linked names with one-sentence descriptions over project cards, screenshots or thumbnails.
- **Reason**: The visitor compares what was made and why it exists without first decoding presentation chrome.
- **Evidence**: Zero detected cards; zero images above `80px`; one `644px` content column.

### Distance carries hierarchy

- **Trigger**: When the page needed to separate biography, projects and writing.
- **Decision**: Chose repeated `128px` chapter gaps over borders, background changes or oversized headings.
- **Reason**: A long blank interval makes the next topic unmistakable while leaving each list internally compact.
- **Evidence**: `128px` spacing appears five times; list rhythm uses `12px`; no section relies on a decorative divider.

### Two weights do all semantic work

- **Trigger**: When names, labels and descriptions required distinction.
- **Decision**: Chose one `16px` family in weights `400` and `500` over a display face and multi-step heading scale.
- **Reason**: Visitors scan the information as a personal record rather than as a campaign page.
- **Evidence**: Sans is the only detected family; `16px` occurs `41` times; weights `400` and `500` are the only detected weights.

### Color stays out of the argument

- **Trigger**: When links and projects could have received individual accent colors.
- **Decision**: Chose `#21201C` and `#63635E` text on `#FDFDFC` over a branded accent palette.
- **Reason**: The hierarchy comes from language, order and spacing, so no project gains importance merely through color.
- **Evidence**: `#FFFFFF` accounts for `88.7%` of measured background area; only two text colors repeat; no colored accent candidate was detected.
