# __import__('pysqlite3')
# import sys
# sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

from dotenv import load_dotenv
load_dotenv()

from Model.pdf import *
from Model.model import *

pdf_path = None
def set_pdf_path(path):
    global pdf_path
    pdf_path = path

print(f"현재 피디에프 경로 : {pdf_path}")

def make_chain():
    print(f"변경된 pdf 경로 : {pdf_path}")
    processed_documents = process_pdf(pdf_path)
    doc_chunks = create_document_chunks(processed_documents, pdf_path)
    chain = setup_chain(doc_chunks)
    return chain



class SentencePredictor:
    def __init__(self, chain):
        self.chain = chain

    def predict_sentence(self, text):
        print("무엇을 도와드릴까요")
        output = self.chain(text)
        return output['answer']


