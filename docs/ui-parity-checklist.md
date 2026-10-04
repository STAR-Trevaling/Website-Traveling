# UI Parity Checklist

Visual baseline: the five screenshots in `docs/design-reference/` and the reconstructed Anima source under `reference/anima-original/`.

## Desktop reference
- Canvas target: 1197px wide.
- Hero uses the Anima `rectangle-3.svg` image.
- Social/contact strip sits above centered navigation.
- Editorial hero copy uses Abril Fatface + Grape Nuts.
- Search card is centered, white/translucent, with teal tabs.
- Popular destination cards preserve 230x290 reference proportions.
- Ocean/video section uses `rectangle-64.svg`.
- Page background uses `rectangle-65.svg` when available.
- Why Us cards are translucent white with subtle shadow.
- Adventure layout uses the five supplied Anima image/overlay pairs.
- Newsletter and award area preserve the two-column composition.
- Final CTA uses `rectangle-112.svg`.
- Footer keeps the star mark + Allison script treatment.

## Responsive adaptation
The original Anima export is fixed-position. Production `frontend/` intentionally replaces fixed absolute page positioning with responsive Grid/Flex while keeping the desktop composition visually faithful.

## Asset self-hosting
Run `python scripts/download_anima_assets.py` from the repository root, then set `NEXT_PUBLIC_USE_LOCAL_ANIMA_ASSETS=1` in the frontend environment to remove runtime dependency on the Anima CDN.
