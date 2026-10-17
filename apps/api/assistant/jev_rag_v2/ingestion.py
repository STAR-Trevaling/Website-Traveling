"""Curated local DOCX, PDF, XLSX, TXT and Markdown ingestion.

Operators must supply a published, trusted source and a canonical public URL.
No OCR, web crawling, or inbound anonymous file uploads.
"""

from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass
from pathlib import Path

MAX_BYTES = 12 * 1024 * 1024
MAX_TEXT_CHARS = 1_000_000


@dataclass(frozen=True)
class Chunk:
    index: int
    text: str
    digest: str


def extract_local_file(path: Path) -> str:
    path = Path(path)
    if not path.is_file() or path.stat().st_size > MAX_BYTES:
        raise ValueError("Missing/oversized ingestion file")
    ext = path.suffix.lower()
    if ext in {".txt", ".md"}:
        text = path.read_text(encoding="utf-8")
    elif ext == ".pdf":
        from pypdf import PdfReader

        reader = PdfReader(str(path), strict=True)
        if reader.is_encrypted or len(reader.pages) > 200:
            raise ValueError("Encrypted or oversized PDF")
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
    elif ext == ".docx":
        from docx import Document

        doc = Document(str(path))
        text = "\n".join(p.text for p in doc.paragraphs)
        text += "\n" + "\n".join(
            " | ".join(c.text for c in row.cells) for table in doc.tables for row in table.rows
        )
    elif ext == ".xls":
        import xlrd  # optional legacy-format dependency

        wb = xlrd.open_workbook(str(path), on_demand=True)
        xls_rows: list[str] = []
        for sheet in wb.sheets()[:20]:
            xls_rows.append(f"Sheet: {sheet.name}")
            for i in range(min(sheet.nrows, 5000)):
                xls_rows.append(
                    " | ".join(str(sheet.cell_value(i, j)) for j in range(min(sheet.ncols, 40)))
                )
        text = "\n".join(xls_rows)
    elif ext == ".xlsx":
        from openpyxl import load_workbook

        workbook = load_workbook(path, read_only=True, data_only=True, keep_links=False)
        try:
            xlsx_rows: list[str] = []
            for sheet in workbook.worksheets[:20]:
                xlsx_rows.append(f"Sheet: {sheet.title}")
                for row in sheet.iter_rows(max_row=5000, max_col=40, values_only=True):
                    xlsx_rows.append(
                        " | ".join(str(value) if value is not None else "" for value in row)
                    )
            text = "\n".join(xlsx_rows)
        finally:
            workbook.close()
    else:
        raise ValueError(f"Unsupported input: {ext}")
    text = text.strip()
    if not text or len(text) > MAX_TEXT_CHARS:
        raise ValueError("Document empty, scanned or too large")
    return text


def chunk_text(text: str, chunk_chars: int = 900, overlap_chars: int = 120) -> list[Chunk]:
    if not (200 <= chunk_chars <= 4000 and 0 <= overlap_chars < chunk_chars):
        raise ValueError("Invalid chunking limits")
    clean = re.sub(r"[ \t]+", " ", text.replace("\r", "\n")).strip()
    if not clean:
        return []
    result: list[Chunk] = []
    start = 0
    while start < len(clean):
        end = min(start + chunk_chars, len(clean))
        if end < len(clean):
            cut = clean.rfind("\n", start + chunk_chars // 2, end)
            if cut > start:
                end = cut + 1
        part = clean[start:end].strip()
        if part:
            result.append(
                Chunk(len(result), part, hashlib.sha256(part.encode("utf-8")).hexdigest())
            )
        if end == len(clean):
            break
        start = max(start + 1, end - overlap_chars)
    return result
