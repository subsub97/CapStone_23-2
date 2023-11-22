# __import__('pysqlite3')
# import sys
# sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

from dotenv import load_dotenv
load_dotenv()

import pdf
import model

file_path = '등기부등본_더치트_210629.pdf'
processed_documents = pdf.process_pdf(file_path)
doc_chunks = model.create_document_chunks(processed_documents, file_path)
chain = model.setup_chain(doc_chunks)

class SentencePredictor:
    def __init__(self, chain):
        self.chain = chain

    def predict_sentence(self, text):
        input_sentence = text
        return self.chain(input_sentence)

predictor = SentencePredictor(chain)

question = input("무엇을 도와드릴까요? ")
output = predictor.predict_sentence(question)

while True:
    print('\n')
    q = input ("다음 질문을 입력하세요 (그만 두려면 'q'를 입력하세요 ) : ")
    if q == 'q':
        break
    output = predictor.predict_sentence(q)
