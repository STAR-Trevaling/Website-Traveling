---
name: brand-identity-and-logo
description: 'Official brand identity, typography, color palette, and logo design system for STAR (STAR Travels). Enforces finalized brand name "STAR", required 5-point golden star emblem symbol, dual-element logo construction (name + star icon), responsive SVG lockups, clear space, minimum sizing, and brand application guidelines.'
---

# Brand Identity & Logo Design System: STAR

This skill defines the official, non-negotiable brand guidelines, visual identity standards, and logo implementation rules for **STAR** (and the **STAR Travels** platform ecosystem).

---

## 1. Core Brand Directives

### 1.1 Finalized Brand Name
- **Primary Brand Name**: **`STAR`**
- **Platform & Service Descriptor**: **`STAR Travels`** (or *STAR Vietnam*, *STAR Concierge*)
- **Capitalization Rule**:
  - The core brand name **STAR** must be represented in **ALL CAPS** (`STAR`) or title-cased (`Star`) in elegant typography.
  - In technical logos, badges, and wordmarks, the wordmark **STAR** is the primary anchor.
  - Never alter, abbreviate, or mistranslate the brand name.

### 1.2 Mandatory Logo Requirement: Dual-Element Construction
Every official logo instance **MUST** contain both:
1. **The Brand Name ("STAR")**: Clear, high-contrast, elegant typography.
2. **The Star Symbol / Icon ("Ngôi Sao")**: A precision 5-pointed geometric star emblem (`#EAB308` golden accent or contextual brand color).

> [!IMPORTANT]
> A logo design that contains only text without the star symbol, or only a star without the brand name (except in constrained favicon/app icon contexts), is **INVALID**. The logo design must feature both the name and the star icon.

---

## 2. Logo Anatomy & Visual Architecture

```
           ┌──────────────────────────────────────────────┐
           │             STAR EMBLEM / ICON               │
           │         ★ (5-pointed golden star)            │
           └──────────────────────┬───────────────────────┘
                                  │
                                  ▼
           ┌──────────────────────────────────────────────┐
           │               STAR WORDMARK                  │
           │   "S  T  A  R"  +  "T R A V E L S"          │
           └──────────────────────────────────────────────┘
```

### 2.1 The Star Emblem (Hình Ngôi Sao)
- **Geometry**: Balanced 5-point star with 72° symmetry, crisp vertices, and harmonious inner-to-outer radius ratio ($\approx 0.382$ golden ratio).
- **Default SVG Polygon Points**:
  ```xml
  <polygon points="50,5 64,36 98,38 72,60 80,94 50,75 20,94 28,60 2,38 36,36" />
  ```
- **Primary Color**: Heritage Gold (`#EAB308` / `#F59E0B`), representing excellence, radiance, and Vietnam's national star heritage.
- **Visual Effects**:
  - In dark/overlay mode: Ambient drop-glow (`drop-shadow(0 2px 12px rgba(234, 179, 8, 0.45))`).
  - Subtle interactive micro-rotation or scale on hover (`group-hover:rotate-12 group-hover:scale-110`).

### 2.2 The Wordmark (Tên Thương Hiệu)
- **Typography Pairings**:
  - *Classic Heritage Style*: Cormorant Garamond, Cinzel, or Playfair Display (Serif, refined luxury).
  - *Modern Editorial Script*: Yellowtail / Pacifico for organic Anima template aesthetic (`.logo-title`).
  - *Geometric Modern Sans*: Montserrat, Inter, or Outfit with wide tracking (`tracking-[0.25em]`).
- **Descriptor Balance**: When accompanied by `"Travels"`, `"Travels"` must be secondary in visual weight or set in complementary casing/color.

---

## 3. Brand Color System

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| **Star Gold (Primary Symbol)** | `#EAB308` | `amber-500` / `yellow-500` | The core star icon, awards, highlights, verified badges |
| **Star Gold Dark** | `#CA8A04` | `yellow-600` | Star gradients, border definition, active states |
| **Star Gold Glow** | `rgba(234, 179, 8, 0.45)` | `amber-500/45` | Ambient drop shadow behind the star emblem |
| **Midnight Slate (Primary Text)** | `#0F172A` / `#1E293B` | `slate-900` / `slate-800` | Core wordmark on light backgrounds |
| **Coastal Teal (Brand Accent)** | `#0098A2` | Custom Teal | CTAs, buttons, active navigation, badges |
| **Pure White** | `#FFFFFF` | `white` | Wordmark on dark hero banners, modal surfaces |
| **Sand Cream (Template BG)** | `#FDFBF7` / `#F8F6F0` | Custom Warm | Editorial background harmony |

---

## 4. Logo Variations & Lockups

### Lockup A: Primary Horizontal (Header & Navbars)
- **Layout**: Star emblem situated immediately to the left of `"STAR"` (or integrated seamlessly into the letterform).
- **Proportions**: Star height = 100% to 120% of the wordmark cap-height.
- **Usage**: Sticky navigation, desktop header, invoice headers, email mastheads.

### Lockup B: Integrated Hero / Template Backdrop Lockup (Footer & Banners)
- **Layout**: Large golden star emblem positioned directly behind the word `"STAR"` with organic script typography.
- **Proportions**: Star emblem scales at 1.4x–1.8x the font size, centered behind the wordmark with soft opacity/glow.
- **Usage**: Site footer, splash screens, editorial hero sections, promotional banners.

### Lockup C: Stacked Vertical (Splash, Presentation, Mobile Hero)
- **Layout**: Star icon centered prominently on top, with `"STAR"` positioned directly underneath, followed by `"TRAVELS"` in wide tracking.
- **Usage**: App loading screen, mobile cards, covers, social avatars, marketing collaterals.

### Lockup D: Icon-Only Mark (Favicon & App Icon)
- **Layout**: Standalone golden star emblem enclosed in a rounded squircle with subtle slate or dark ocean gradient.
- **Usage**: Browser favicon (`favicon.ico`, `apple-touch-icon.png`), social media profile avatar.

---

## 5. Clear Space & Minimum Sizes

### 5.1 Clear Space
- Always maintain clear space around the logo equal to at least **$X$**, where **$X$** is half the width of the star icon:
  ```
       ┌───────────────────────┐
       │         [ X ]         │
  [X]  │   ★  S T A R          │  [X]
       │         [ X ]         │
       └───────────────────────┘
  ```
- No other text, icons, buttons, or busy background elements may encroach within this perimeter.

### 5.2 Minimum Display Sizes
- **Digital Screen (Horizontal Lockup)**: Minimum height = `28px` (desktop), `24px` (mobile).
- **Digital Screen (Star Icon Only)**: Minimum `16x16px` for favicon, `24x24px` for in-app badges.
- **Print Resolution**: Minimum width = `25mm` (300 DPI).

---

## 6. Official Component Implementation (React / Next.js)

Below is the standard reference component for rendering the STAR logo across the platform:

```tsx
import Link from "next/link";

interface StarLogoProps {
  variant?: "horizontal" | "integrated" | "stacked" | "icon-only";
  size?: "sm" | "md" | "lg" | "xl";
  showDescriptor?: boolean;
  inverted?: boolean; // For dark hero overlay
  className?: string;
}

export function StarLogo({
  variant = "horizontal",
  size = "md",
  showDescriptor = true,
  inverted = false,
  className = "",
}: StarLogoProps) {
  const sizeClasses = {
    sm: { star: "size-5", text: "text-lg", desc: "text-[9px]" },
    md: { star: "size-7", text: "text-2xl", desc: "text-[11px]" },
    lg: { star: "size-10", text: "text-4xl", desc: "text-xs" },
    xl: { star: "size-16 sm:size-20", text: "text-6xl sm:text-7xl", desc: "text-sm" },
  }[size];

  const textColor = inverted ? "text-white" : "text-slate-900";
  const descColor = inverted ? "text-white/80" : "text-slate-600";

  // SVG 5-Point Golden Star Emblem
  const StarIcon = ({ iconClass = "" }: { iconClass?: string }) => (
    <svg
      viewBox="0 0 100 100"
      fill="#EAB308"
      aria-hidden="true"
      className={`shrink-0 drop-shadow-[0_2px_8px_rgba(234,179,8,0.45)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105 ${iconClass}`}
    >
      <polygon points="50,5 64,36 98,38 72,60 80,94 50,75 20,94 28,60 2,38 36,36" />
    </svg>
  );

  if (variant === "icon-only") {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <StarIcon iconClass={sizeClasses.star} />
      </div>
    );
  }

  if (variant === "integrated") {
    // Template Hero/Footer style: golden star placed behind 'Star'
    return (
      <Link href="/" className={`group inline-flex items-center select-none ${className}`} aria-label="STAR Travels">
        <span className={`logo-title ${sizeClasses.text} leading-none ${textColor} flex items-center`}>
          <span className="relative inline-flex items-center justify-center">
            <StarIcon iconClass={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-85 -z-10 ${sizeClasses.star}`} />
            <span className="relative z-10 font-bold">STAR</span>
          </span>
          {showDescriptor && <span className="ml-2 font-normal">Travels</span>}
        </span>
      </Link>
    );
  }

  if (variant === "stacked") {
    return (
      <Link href="/" className={`group flex flex-col items-center text-center select-none ${className}`} aria-label="STAR Travels">
        <StarIcon iconClass={sizeClasses.star} />
        <span className={`mt-2 font-black tracking-widest uppercase ${sizeClasses.text} ${textColor}`}>
          STAR
        </span>
        {showDescriptor && (
          <span className={`tracking-[0.3em] uppercase font-medium ${sizeClasses.desc} ${descColor}`}>
            TRAVELS
          </span>
        )}
      </Link>
    );
  }

  // Default: Horizontal Lockup (Star icon next to STAR Travels)
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 select-none ${className}`} aria-label="STAR Travels">
      <StarIcon iconClass={sizeClasses.star} />
      <div className="flex flex-col leading-none">
        <span className={`font-black tracking-wider uppercase ${sizeClasses.text} ${textColor}`}>
          STAR
        </span>
        {showDescriptor && (
          <span className={`tracking-[0.25em] uppercase font-semibold text-[10px] mt-0.5 ${descColor}`}>
            TRAVELS
          </span>
        )}
      </div>
    </Link>
  );
}
```

---

## 7. Strict Prohibitions & Anti-Patterns

❌ **NEVER** display the wordmark "STAR" without the accompanying star icon in official brand anchors.  
❌ **NEVER** alter the proportions or skew the geometry of the 5-point star.  
❌ **NEVER** replace the star symbol with a generic circle, pin, or unrelated travel clip art.  
❌ **NEVER** render the star in jarring discordant colors (e.g., neon purple, harsh red) that violate the heritage gold `#EAB308` palette.  
❌ **NEVER** crowd the logo into UI containers without the minimum required clear space ($0.5X$).  
❌ **NEVER** use unapproved slogan variants that displace the primary "STAR" logotype.  

---

## 8. Verification Checklist for Developers & Agents

Before committing any UI or documentation containing the brand logo:
1. [ ] Is the brand name finalized and spelled as **STAR**?
2. [ ] Does the logo design include **both** the name ("STAR") and the star icon (hình ngôi sao)?
3. [ ] Is the star icon colored in standard heritage gold (`#EAB308` / `#F59E0B`) or crisp contrast white on dark backgrounds?
4. [ ] Does the logo maintain clear space and responsive readability on all screen breakpoints (mobile, tablet, desktop)?
5. [ ] Does clicking the logo consistently navigate to the homepage (`/`)?
