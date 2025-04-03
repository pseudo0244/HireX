import pdfminer.high_level
import docx2txt
import os

def extract_text_from_resume(file_path):
    """Extracts text from a resume (PDF/DOCX) and returns plain text."""
    ext = os.path.splitext(file_path)[-1].lower()

    if ext == ".pdf":
        text = pdfminer.high_level.extract_text(file_path)
    elif ext == ".docx":
        text = docx2txt.process(file_path)
    else:
        raise ValueError("Unsupported file format! Use PDF or DOCX.")
    
    return text.strip()
