import ast
from pathlib import Path
files = [
    f
    for f in list(Path("apps/api").rglob("*.py")) + list(Path("scripts").rglob("*.py"))
    if ".venv" not in f.parts
]
for file in files: ast.parse(file.read_text(encoding="utf-8"),filename=str(file))
print(f"python AST: ok ({len(files)} files)")
