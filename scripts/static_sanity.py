import ast
from pathlib import Path
files=list(Path("apps/api").rglob("*.py"))+list(Path("scripts").rglob("*.py"))
for file in files: ast.parse(file.read_text(encoding="utf-8"),filename=str(file))
print(f"python AST: ok ({len(files)} files)")
