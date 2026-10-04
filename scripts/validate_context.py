from pathlib import Path
required=["AGENTS.md","context/project-overview.md","context/architecture.md","context/ai-workflow-rules.md","context/code-standards.md","context/progress-tracker.md","context/ui-context.md"]
missing=[p for p in required if not Path(p).is_file() or not Path(p).read_text(encoding="utf-8").strip()]
if missing: raise SystemExit(f"Missing/empty canonical context: {missing}")
print("context: ok")
