from langchain.document_loaders import PyPDFLoader

import re

def process_pdf(file_path):
    try:
        loader = PyPDFLoader(file_path, extract_images=True)
        documents = loader.load()
    except Exception as e:
        print(f"Error loading PDF: {e}")
        return []

    processed_documents = []
    for page in documents:
        text = page.page_content
        text = re.sub(r'[ \t]{2,}', '', text)
        text = re.sub(r"\.{2,}", "", text)
        text = re.sub(r'\n{2,}', '\n', text)
        processed_documents.append(text)
    return processed_documents