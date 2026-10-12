# UI Context

## Visual source of truth
The supplied Anima "Travel Company / Star Travels" template is the visual baseline for the customer home page.

Preserve:
- 1197px desktop composition as the reference canvas;
- tropical ocean photography and pale aqua shoreline background;
- centered editorial/script headings;
- white destination cards with restrained borders/shadows;
- teal tab/search accent;
- collage-style adventure grid;
- transparent/white trust and newsletter panels;
- oversized footer branding.

## Product mapping
- Home -> Home
- Packages -> Destinations
- Tours -> Experiences (places)
- About Us -> About
- Contact -> Contact
- Flights/Hotels/Tours search tabs -> Destinations/Experiences/Nearby

## Brand Identity & Logo Standard
- **Finalized Brand Name**: **`STAR`** (Ecosystem descriptor: **STAR Travels**).
- **Mandatory Logo Composition**: The official logo design **MUST** always include both:
  1. The Brand Name: **`STAR`** (prominent, elegant typography).
  2. The Star Emblem / Icon: **Hình ngôi sao** (geometric 5-pointed golden star `#EAB308` with subtle drop-shadow/glow).
- Refer to detailed guidelines and code specifications in [SKILL.md](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/.agents/skills/brand-identity-and-logo/SKILL.md).

The design may become responsive with Grid/Flex, but desktop proportions should remain visually faithful to the template. Do not convert the site into a SaaS/dashboard visual language.

## Context-Aware Hero Banner Contract
- **Destination & Tour Catalog Specificity**: Full landscape photo hero banners (`PageHero` with scenic photography) are strictly reserved for pages that display actual destination, tour, or place entities (`/`, `/destinations/[slug]`, `/tours/[slug]`, `/experiences/[slug]`).
- **Clean Headers for Directories & Utility**: Practical directories (`/guide/*`), editorial articles (`/stories`), and informational pages (`/about`, `/contact`, `/terms`, `/privacy`) MUST NOT display mismatched landscape photo hero banners. They use clean headers (`<SiteHeader overlay={false} />`), clean breadcrumbs, and structured card typography to ensure information hierarchy and prevent visual confusion.

## Living Mascot: "Bé Sao STAR"
- **Pure Standalone Entity**: The mascot in `InteractiveMotionTrigger` is a floating living creature without any enclosing box, orb container, or pedestal frame.
- **Physical Appearance**: Chubby rounded 5-pointed golden star creature (`#EAB308` / `#FACC15`) with subtle 3D highlight and dynamic ground drop-shadow.
- **Micro-Interactions**:
  - Real-time eye tracking: Pupils smoothly look toward the user's cursor coordinates.
  - Natural blinking: Eyelids blink automatically every 3.8s.
  - Mood on hover: Eyes squint into joyful crescent arches `(^_^)`, mouth smiles with cute pink tongue, pink cheeks blush, and creature performs an excited jiggle hop.
- **Capability Carousel**: Smooth horizontal rotating showcase (7 core capabilities) with 1-click prompt dispatch directly into the AI Concierge chat drawer.

## Global Dynamic Beach Background (`GlobalSiteBackground`)
- **Ambience Synchronization**: A fixed, smooth cross-fading background layer maintains the coastal/ocean travel aesthetic across the site.
- **Legibility**: Content cards utilize semi-transparent glassmorphism (`bg-white/80` or `bg-slate-900/80` with `backdrop-blur-md`) ensuring WCAG 2.1 AA text contrast over background photos.

