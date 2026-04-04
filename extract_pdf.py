import fitz
import os

pdf_files = [
    "research_proposal.pdf",
    "project_development.pdf",
    "canvas_lesson.pdf"
]

base_dir = r"C:\Users\cagla\Desktop\port\public\documents"
dest_dir = r"C:\Users\cagla\Desktop\port\public\images"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

for pdf in pdf_files:
    pdf_path = os.path.join(base_dir, pdf)
    if os.path.exists(pdf_path):
        doc = fitz.open(pdf_path)
        page = doc.load_page(0)  # load first page
        pix = page.get_pixmap(dpi=150)
        img_name = pdf.replace(".pdf", ".png")
        img_path = os.path.join(dest_dir, img_name)
        pix.save(img_path)
        print(f"Saved {img_path}")
    else:
        print(f"File not found: {pdf_path}")
