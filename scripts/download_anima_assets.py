from pathlib import Path
from urllib.request import urlopen

BASE = "https://c.animaapp.com/SKQWAu1r/img"
ASSETS = [
    "rectangle-3.svg", "rectangle-55.svg", "rectangle-58.svg", "rectangle-61.svg",
    "rectangle-63.svg", "rectangle-64.svg", "rectangle-65.svg", "rectangle-66.svg",
    "rectangle-67.svg", "rectangle-76.svg", "rectangle-77.svg", "rectangle-78.svg",
    "rectangle-88.svg", "rectangle-89.svg", "rectangle-90.svg", "rectangle-91.svg",
    "rectangle-94.svg", "rectangle-95.svg", "rectangle-108.svg", "rectangle-109.svg",
    "rectangle-110.svg", "rectangle-111.svg", "rectangle-112.svg", "star-1.svg",
    "tabler-circle-triangle.svg", "mdi-crown-outline.svg", "mdi-ruler-square-compass.svg",
    "mdi-instagram.svg", "cirrum-twitter.svg", "iconoir-facebook.svg",
    "material-symbols-call.svg", "ic-outline-email.svg",
]
OUT = Path("frontend/public/assets/anima")
OUT.mkdir(parents=True, exist_ok=True)
for name in ASSETS:
    target = OUT / name
    if target.exists() and target.stat().st_size:
        print("skip", name)
        continue
    with urlopen(f"{BASE}/{name}", timeout=20) as response:
        target.write_bytes(response.read())
    print("downloaded", name)
