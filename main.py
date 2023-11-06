# __import__('pysqlite3')
# import sys
# sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

from dotenv import load_dotenv
load_dotenv()

from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.docstore.document import Document
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

import re

file_path = '등기부등본_더치트_210629.pdf'

loader = PyPDFLoader(file_path, extract_images=True)
documents = loader.load()

new_doc=[]
for page in documents:
    text = page.page_content
    text = re.sub(r'[ \t]{2,}', '', text)
    text = re.sub(r"\.{2,}", "", text)
    text = re.sub(r'\n{2,}', '\n', text)
    new_doc.append(text)  # documents_pr 에 추가

    doc_chunks = []

    for line in new_doc:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=3000,
            separators=[ "\n", "\n\n"],
            chunk_overlap=300,
        )
        chunks = text_splitter.split_text(line)
        for i, chunk in enumerate(chunks):  # 분리된 청크를 document형식으로 변환
            doc = Document(
                page_content=chunk, metadata={"page": i, "source": file_path}
            )
            doc_chunks.append(doc)  # doc_chunks 리스트에 추가

embeddings = OpenAIEmbeddings()
vector_store = Chroma.from_documents(doc_chunks, embeddings)
retriever = vector_store.as_retriever(search_kwargs={"k": 4})

from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,        # 시스템 사전 설정
    HumanMessagePromptTemplate,        # 질문 설정
)

system_template="""
등기사항전부증명서를 통해서 회사의 정보를 제공하고싶습니다.
제공해야 하는 기업 내용은 회사명, 회사 영문명, 법인 등록번호, 본점 주소, 발행할 주식의 총수, 설립 시 액면가, 현재 액면가, 회사설립연월일 입니다.
차례로 회사명과 회사 영문명은 상호 부분에서, 법인 등록번호는 등록번호에서, 본점 주소는 본점에서, 발행할 주식의 총수는 발행할 주식의 총수에서, 설립 시 액면가는 발행주식의 총수에서, 회사설립연월일은 회사성립연월일을 통해서 알려주세요 
주소는 변경일을 참고하여 최신 자료로 알려주세요.

한글로 대답해주세요.

{summaries}

"""

messages = [
    SystemMessagePromptTemplate.from_template(system_template),
    HumanMessagePromptTemplate.from_template("{question}")
]

prompt = ChatPromptTemplate.from_messages(messages)
chain_type_kwargs = {"prompt": prompt}
llm = ChatOpenAI(model_name="gpt-3.5-turbo",streaming=True, callbacks =[StreamingStdOutCallbackHandler()],temperature=0)

chain = RetrievalQAWithSourcesChain.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever = retriever,
    return_source_documents=True,
    chain_type_kwargs=chain_type_kwargs,
    reduce_k_below_max_tokens=True
)

myAsk = """ 필요한 회사 정보를 주세요 """ # 물어볼 질문
result = chain(myAsk)
