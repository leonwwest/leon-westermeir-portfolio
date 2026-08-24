---
name: Leon Westermeir Portfolio
description: Ein helles technisches Inbetriebnahmeprotokoll für prüfbare DevOps- und Cloud-Platform-Arbeit.
colors:
  signal: "#c8ff3d"
  signal-deep: "#526d00"
  on-signal: "#161716"
  paper: "#f1f0ea"
  paper-bright: "#faf9f5"
  graphite: "#161716"
  graphite-soft: "#3f413e"
  graphite-muted: "#5f625d"
  rule: "#c8c9c2"
  inverse-muted: "#aaada5"
  inverse-rule: "#5a5c57"
  demo-black: "#0f1110"
typography:
  display:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "clamp(3.65rem, 8vw, 7.8rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "clamp(3rem, 6vw, 6.4rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.055em"
  title:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Fragment Mono, monospace"
    fontSize: "0.71rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.07em"
rounded:
  sharp: "0px"
  signal: "50%"
spacing:
  tight: "0.5rem"
  control: "1rem"
  block: "1.5rem"
  panel: "2.5rem"
  page-gutter: "clamp(1.25rem, 4vw, 4.5rem)"
  section: "clamp(6.5rem, 12vw, 11rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.sharp}"
    padding: "0.8rem 1rem"
    height: "2.75rem"
  button-dark:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.sharp}"
    padding: "0.68rem 0.85rem"
    height: "2.75rem"
  project-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.sharp}"
    padding: "1.3rem clamp(1.25rem, 4vw, 4.5rem)"
    height: "8.6rem"
    width: "100%"
  project-row-active:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.sharp}"
    padding: "1.3rem clamp(1.25rem, 4vw, 4.5rem)"
    height: "8.6rem"
    width: "100%"
  status-label:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0.08rem 0.25rem"
---

# Design System: Leon Westermeir Portfolio

## Overview

**Creative North Star: "Systems Evidence Board"**

Das Portfolio wirkt wie ein helles Inbetriebnahmeprotokoll: ruhig, präzise, werkstattartig und für Recruiter sofort lesbar. Viel warme Arbeitsfläche und ein strenges Linienraster geben realen Projektdemos, Tests und Runbooks den Charakter sichtbarer Prüfbelege. Es ist kein simuliertes Terminal und keine technische Kulisse; die Oberfläche ordnet vorhandene Arbeit wie ein Evidence Board.

Die Sprache bleibt menschlich und direkt. Scharfe Kanten, große Satzflächen und wenige bewusst gesetzte Statussignale ersetzen dekorative Karten, Verläufe und Effekte. Die alte Navy-Orange-Agenturwelt sowie generische KI- oder SaaS-Portfolios sind bestätigte Anti-Referenzen.

**Key Characteristics:**

- Warmes Arbeitspapier mit tiefem Graphit statt reinem Schwarz-Weiß.
- Säuregrün erscheint selten und ausschließlich als Signal, Status oder primäre Aktion.
- Reale Demos und Prüfsummen besetzen die visuell stärksten Flächen.
- Scharfe Werkstattkanten, Linien und großzügige Kapitelabstände strukturieren die Seite.
- Instrument Sans trägt die Aussage; Fragment Mono kennzeichnet Messwerte und Metadaten.

## Colors

Die Palette übersetzt Papier, Druckfarbe und Prüfsignal in eine helle, technische Arbeitsoberfläche.

### Primary

- **Säuregrünes Prüfsignal:** Markiert PASS-Zustände, aktive Inspektionsleisten, die primäre Aktion, Fokus und den abschließenden Kontaktbereich. Seine Seltenheit erzeugt Bedeutung.
- **Tiefes Signalgrün:** Dient als zugänglicher Fokus- und Linkton auf hellen Flächen, wenn das leuchtende Signal selbst zu wenig Kontrast liefern würde.

### Neutral

- **Warmes Arbeitspapier:** Grundfläche der gesamten Seite; verhindert sterile Weißräume und hält lange technische Inhalte ruhig.
- **Helles Prüfblatt:** Hebt Dispatch- und Inspektionsflächen minimal vom Grund ab, ohne eine Kartenwelt zu erzeugen.
- **Tiefes Graphit:** Haupttext, Linien, dunkle Arbeitskapitel und inverse Projektzustände.
- **Weiches Graphit:** Fließtext und sekundäre Erklärungen mit weiterhin hoher Lesbarkeit.
- **Gedämpftes Graphit:** Metadaten, Rollen und Nebeninformationen.
- **Werkstattlinie:** Feine Trenner in Projekt-, Fakten- und Linklisten.
- **Inverse Metadaten:** Sekundärtext auf Graphitflächen.
- **Inverse Werkstattlinie:** Teilung dunkler Prozessfelder.
- **Demo-Schwarz:** Ruhige Einfassung für echte Terminal- und Run-Captures.

### Named Rules

**The Signal Rarity Rule.** Säuregrün kennzeichnet nur überprüfbare Zustände, primäre Handlungen oder den einen Kontaktabschluss; es ist niemals dekorativer Flächenfüller.

**The Signal Contrast Rule.** Text und Icons auf Säuregrün verwenden immer tiefes Graphit (`#161716`) und werden niemals durch ein automatisches Farbschema invertiert.

**The Paper Before White Rule.** Neue helle Flächen beginnen mit warmem Papier oder hellem Prüfblatt, nicht mit klinischem Reinweiß.

## Typography

**Display Font:** Instrument Sans (mit Arial und Sans-Serif-Fallback)
**Body Font:** Instrument Sans (mit Arial und Sans-Serif-Fallback)
**Label/Mono Font:** Fragment Mono (mit Monospace-Fallback)

**Character:** Instrument Sans wirkt direkt und gegenwärtig, bleibt aber neutral genug, damit technische Belege die Hauptrolle spielen. Fragment Mono setzt eine zweite, messende Stimme für Status, Losnummern, Tests und Systemmetadaten.

### Hierarchy

- **Display** (600, fluid von groß bis sehr groß, sehr kompakte Zeilenhöhe): Nur für die erste Positionierung; auf Mobilgeräten bleibt der harte Zeilenfall bewusst erhalten.
- **Headline** (600, große fluide Kapitelgröße, sehr kompakte Zeilenhöhe): Eröffnet die Hauptkapitel und darf zwei bis drei kurze Zeilen bilden.
- **Title** (600, mittlere fluide Größe, kompakte Zeilenhöhe): Benennt das ausgewählte System oder die konkrete Lösung innerhalb eines Prüfbereichs.
- **Body** (400, Basisgröße, ruhige Zeilenhöhe): Erklärt Zweck, Ergebnis und Grenzen; Textblöcke bleiben kurz und werden durch großzügige Abstände getrennt.
- **Label** (400, klein, weit gesperrt, versal): Kennzeichnet Index, Status, Testwerte, Rollen und technische Metadaten.

### Named Rules

**The Two Voice Rule.** Instrument Sans spricht; Fragment Mono misst. Mono wird nicht für längere Erklärungen oder dekorative Tech-Anmutung eingesetzt.

**The Tight Headline Rule.** Große Überschriften bleiben schwer, eng und kurz; zusätzliche Schriftschnitte oder künstliche Effekte ersetzen niemals klare Zeilenumbrüche.

## Layout

Die Homepage folgt einer fokussierten Arbeitsfläche: Positionierung, Rollenpfade, Projektkonsole, zusätzliche Arbeit und Kontakt. Arbeitsweise sowie Evidenzgrenzen liegen auf einer eigenen Leseseite; Data Quality erhält eine eigene, teilbare Detailseite. Hauptabschnitte erhalten einen großen fluiden Vertikalabstand; der horizontale Seitenrand wächst zwischen kleinen und großen Viewports mit. Projektkonsole, Prozessschritte und Nachweisbereiche nutzen sichtbare Linien statt umschlossener Karten.

Oberhalb von 1040px stehen Hero-Aussage und realer Azure-IaC-Run-Capture in asymmetrischen Spalten. Projektindex und aktiver Prüfbereich folgen als zweite technische Oberfläche. Unterhalb davon werden Hero und Projektkonsole linear. Unter 700px bleibt nur eine Spalte: Nebenbeschreibungen im Projektindex entfallen, Navigationspunkte werden auf die Kontaktaktion verdichtet und alle Hauptaktionen behalten mindestens 44px Höhe.

**The Chapter Distance Rule.** Große Abstände trennen eigenständige Argumente; feine Linien trennen Einträge innerhalb eines Arguments.

## Elevation & Depth

Das System ist überwiegend flach und linienbasiert. Tiefe entsteht durch Graphitflächen, harte Teilungslinien und echte Bildinhalte. Nur die Dispatch-Karte und die primäre Aktion erhalten einen ungefilterten, versetzten Graphitschatten; er wirkt wie ein physischer Papier- oder Schilderversatz, nicht wie weiche App-Elevation. Ein kleiner Signalhalo gehört ausschließlich zum Statuspunkt.

### Shadow Vocabulary

- **Primary Action Offset:** Ein kompakter harter Versatz unter der primären Aktion; bei Hover verschiebt sich die Aktion leicht gegen einen etwas größeren Versatz.
- **Dispatch Offset:** Ein größerer harter Graphitversatz, der das Dispatch-Blatt als einziges aufliegendes Werkstück im Hero markiert.
- **Signal Halo:** Ein schmaler transparenter Ring um den kleinen Statuspunkt; nicht für Buttons, Karten oder Überschriften verwenden.

### Named Rules

**The Structural Shadow Rule.** Schatten simulieren nur den mechanischen Versatz eines konkreten Elements; diffuse Ambient- oder Glaseffekte gehören nicht in dieses System.

## Shapes

Rechtecke bleiben scharfkantig. Buttons, Prüfblätter, Projektzeilen, Tags und Inhaltsflächen verwenden keine Rundung. Linien sind überwiegend ein Pixel stark und bilden ein durchgehendes Werkstattraster. Nur echte Statuspunkte sind kreisförmig; ihr Kreis ist semantisch, nicht dekorativ.

**The One Circle Rule.** Kreisformen sind ausschließlich Statussignalen vorbehalten.

## Components

### Buttons

- **Shape:** Scharfkantig, taktil und kompakt; Primär- und Header-Aktion halten mindestens 44px Höhe.
- **Primary:** Säuregrüner Grund, Graphittext, ein Pixel Graphitkante und harter Offset-Schatten.
- **Hover / Focus:** Auf präzisen Zeigegeräten verschiebt sich die primäre Aktion um zwei Pixel; Tastaturfokus erhält einen deutlich abgesetzten tiefgrünen Ring. Beim Drücken skalieren taktile Aktionen kurz auf 97 Prozent.
- **Dark:** Graphitfläche mit Arbeitspapier-Text; ohne dekorative Rundung oder Schatten.
- **Text:** Ruhige Textlinks zeichnen beim Hover eine feine Linie von rechts nach links ein.

### Chips

- **Style:** Technologie-Tags sind transparente, scharfkantige Fragmente mit feiner Werkstattlinie und Fragment Mono.
- **State:** Sie dienen nur als Metadaten und erhalten keinen ausgewählten Zustand.

### Cards / Containers

- **Corner Style:** Durchgehend scharf.
- **Background:** Arbeitspapier oder helles Prüfblatt; aktive Projektzeilen und Prozesskapitel dürfen invertieren.
- **Shadow Strategy:** Flach außer Dispatch-Blatt und primärer Aktion.
- **Border:** Ein-Pixel-Linien definieren Hierarchie, Raster und Zustandsgrenzen.
- **Internal Padding:** Fluid für große Prüfbereiche, kompakt für Status- und Indexzeilen.

### Navigation

Die Navigation ist eine einzelne horizontale Zeile mit klarer Wortmarke, zwei Textzielen und einer dunklen Kontaktaktion. Textziele erhalten eine animierte Unterstreichung; auf Mobilgeräten bleiben nur Markenzeichen und Kontakt sichtbar. Die Wortmarke koppelt ein quadratisches Graphit-Signal mit dem ausgeschriebenen Namen.

### Project Inspection Console

Die Signaturkomponente verbindet fünf semantische Projektzeilen mit einem aktiven Prüfbereich. Der aktive Auftrag invertiert auf Graphit, während die rechte Inspektionsleiste Säuregrün trägt. Die eigentliche Projektgrafik ist immer ein realer Run-Capture; darunter folgen Problem, Ergebnis, Prüfnachweis, Technologien und Repository-Link in dieser Reihenfolge.

Die Auswahl ist über `#project=<id>` teilbar. Projektzeilen verwenden einen Auswahl-Chevron statt eines External-Link-Pfeils. Dynamische Änderungen werden mit einer kurzen Statusmeldung angekündigt; der vollständige Prüfbereich ist keine atomare Live-Region.

### Role Routes

Direkt nach dem Hero führen drei scharfkantige Rollenpfade zu Cloud & Platform, Microsoft & Automation sowie Data & Business Applications. Sie übersetzen die gleiche technische Evidenz für unterschiedliche Einstiegsfragen, ohne die primäre Cloud-/Platform-Positionierung zu verändern.

### Evidence Detail Pages

Detailseiten verwenden die gleichen Linien, Typografiestimmen und Signalregeln wie die Homepage, aber eine lesende Dramaturgie: Ergebnis, realer Beleg, Prozesspfad, Teamtransfer und Grenze. Sie sind direkte Bewerbungsziele und erhalten eigene Metadaten sowie bestehende reale Projektbilder.

### Hero Evidence Frame

Der Hero zeigt einen realen Azure-IaC-Verifikationslauf mit einer knappen, faktischen Bildunterschrift. Die harte Einfassung und der mechanische Offset machen den Run-Capture zum einzigen bewusst aufliegenden Werkstück der ersten Ansicht. Medien laufen stumm und in Schleife, solange sie sichtbar sind, pausieren außerhalb des Viewports und erhalten eine sichtbare Play-/Pause-Aktion sowie einen Original-Link. Bei reduzierter Bewegung starten sie nicht automatisch.

## Do's and Don'ts

### Do:

- **Do** beginne neue Flächen mit warmem Arbeitspapier, Graphitlinien und großzügiger Kapiteltrennung.
- **Do** nutze Säuregrün nur für Status, primäre Aktion, Fokus oder den abschließenden Kontakt.
- **Do** zeige reale Demos, Tests, Runbooks oder nachvollziehbare Messwerte an den visuell stärksten Stellen.
- **Do** behalte Instrument Sans für Aussagen und Fragment Mono für Messung und Metadaten bei.
- **Do** verdichte Layouts unter 1040px und 700px, ohne Fokus, Lesbarkeit oder 44px-Ziele zu verlieren.

### Don't:

- **Don't** verwende Navy-Orange, Verläufe, Glasflächen oder generische SaaS-Karten.
- **Don't** runde Buttons, Container oder Projektzeilen; Kreise gehören nur zu Statuspunkten.
- **Don't** setze Säuregrün als dekorativen Hintergrund für beliebige Inhaltssektionen.
- **Don't** ersetze echte Projektbelege durch KI-generierte Illustrationen, abstrakte Tech-Grafiken oder erfundene Dashboards.
- **Don't** füge diffuse Schatten, dauernde Bewegung oder Hover-only-Bedeutung hinzu.
