import os

from PIL import Image, ImageDraw

PUBLIC_DIR = (
    r"d:\Joyce\My documents\Pjs\Pjs src\Website-Traveling\apps\public-site\public"
)
APP_DIR = (
    r"d:\Joyce\My documents\Pjs\Pjs src\Website-Traveling\apps\public-site\src\app"
)

# 1. Generate SVG Icon
svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="35%" stop-color="#FACC15" />
      <stop offset="70%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#CA8A04" />
    </linearGradient>
    <filter id="starGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#EAB308" flood-opacity="0.4" />
    </filter>
  </defs>
  <!-- Rounded Base Badge -->
  <rect width="100" height="100" rx="24" fill="url(#bgGrad)" />
  <rect width="98" height="98" x="1" y="1" rx="23" stroke="#FACC15" stroke-width="1.5" stroke-opacity="0.3" fill="none" />
  
  <!-- 5-Point Precision Golden Star -->
  <polygon points="50,14 61,38 87,40 67,57 73,83 50,68 27,83 33,57 13,40 39,38" fill="url(#goldGrad)" filter="url(#starGlow)" />
</svg>
"""

with open(os.path.join(PUBLIC_DIR, "icon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)

with open(os.path.join(APP_DIR, "icon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)

print("SVG icons written successfully.")


# 2. Render PNG / ICO via Pillow
def draw_star_badge(size: int) -> Image.Image:
    # Supersample x4 for ultra anti-aliasing
    scale = 4
    w = size * scale
    img = Image.new("RGBA", (w, w), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded rectangle background
    corner_radius = int(w * 0.24)
    draw.rounded_rectangle(
        [(0, 0), (w - 1, w - 1)], radius=corner_radius, fill=(15, 23, 42, 255)
    )
    # Border
    draw.rounded_rectangle(
        [(0, 0), (w - 1, w - 1)],
        radius=corner_radius,
        outline=(234, 179, 8, 120),
        width=max(1, scale),
    )

    # Star points
    # Standard points for 100x100: 50,14 61,38 87,40 67,57 73,83 50,68 27,83 33,57 13,40 39,38
    raw_points = [
        (50, 14),
        (61, 38),
        (87, 40),
        (67, 57),
        (73, 83),
        (50, 68),
        (27, 83),
        (33, 57),
        (13, 40),
        (39, 38),
    ]
    scaled_points = [(int(x * w / 100), int(y * w / 100)) for (x, y) in raw_points]

    # Star fill: Gold
    draw.polygon(scaled_points, fill=(245, 158, 11, 255))

    # Downsample with Lanczos for crisp anti-aliasing
    return img.resize((size, size), Image.Resampling.LANCZOS)


# Generate multi-res ICO
icon_16 = draw_star_badge(16)
icon_32 = draw_star_badge(32)
icon_48 = draw_star_badge(48)
icon_64 = draw_star_badge(64)
icon_180 = draw_star_badge(180)

# Save favicon.ico to public and app
ico_public_path = os.path.join(PUBLIC_DIR, "favicon.ico")
icon_32.save(
    ico_public_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
)

ico_app_path = os.path.join(APP_DIR, "favicon.ico")
icon_32.save(ico_app_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# Save apple-touch-icon
apple_path_public = os.path.join(PUBLIC_DIR, "apple-touch-icon.png")
icon_180.save(apple_path_public, format="PNG")

apple_path_app = os.path.join(APP_DIR, "apple-icon.png")
icon_180.save(apple_path_app, format="PNG")

print("ICO and PNG favicons generated successfully!")
