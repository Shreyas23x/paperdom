"""
Stamp every downloadable solved paper in public/papers/ with a Paperdome seal:
a "PAPERDOME" mark on the top-right of page 1 and a "Paperdome · pastpaperdome.com"
footer on every page. Safe to re-run — already-stamped files are skipped (tracked
via a marker in the PDF metadata).

Requires PyMuPDF:  pip install pymupdf
Run from the project root:  python scripts/stamp_pdfs.py
"""
import fitz, os, glob, tempfile

FOLDER = os.path.join(os.path.dirname(__file__), "..", "public", "papers")
MARK = "paperdome-stamped-v1"
GREY = (0.55, 0.55, 0.58)
SEAL_STROKE = (0.62, 0.62, 0.66)
SEAL_INK = (0.40, 0.40, 0.44)


def already_stamped(doc):
    return MARK in ((doc.metadata or {}).get("keywords") or "")


def stamp(path):
    doc = fitz.open(path)
    if already_stamped(doc):
        doc.close()
        return "skip"
    foot = "Paperdome  ·  pastpaperdome.com"
    for page in doc:
        r = page.rect
        tw = fitz.get_text_length(foot, fontname="helv", fontsize=8)
        page.insert_text(((r.width - tw) / 2, r.height - 16), foot,
                         fontname="helv", fontsize=8, color=GREY)
    p0 = doc[0]
    r = p0.rect
    seal = "PAPERDOME"
    tw2 = fitz.get_text_length(seal, fontname="hebo", fontsize=7.5)
    pad = 7
    box = fitz.Rect(r.width - 34 - (tw2 + 2 * pad), 26, r.width - 34, 43)
    p0.draw_rect(box, color=SEAL_STROKE, width=0.8, radius=0.35)
    p0.insert_text((box.x0 + pad, box.y0 + 11.5), seal,
                   fontname="hebo", fontsize=7.5, color=SEAL_INK)
    md = doc.metadata or {}
    md["keywords"] = ((md.get("keywords") or "") + " " + MARK).strip()
    doc.set_metadata(md)
    fd, tmp = tempfile.mkstemp(suffix=".pdf", dir=FOLDER)
    os.close(fd)
    doc.save(tmp, deflate=True, garbage=3)
    doc.close()
    os.replace(tmp, path)
    return "stamped"


if __name__ == "__main__":
    counts = {"stamped": 0, "skip": 0}
    for path in sorted(glob.glob(os.path.join(FOLDER, "*.pdf"))):
        res = stamp(path)
        counts[res] += 1
        print(f"{res:8} {os.path.basename(path)}")
    print("---", counts)
