from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQAWithSourcesChain

def create_document_chunks(processed_documents, file_path):
    doc_chunks = []
    for line in processed_documents:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=3000, separators=["\n", "\n\n"], chunk_overlap=300)
        chunks = text_splitter.split_text(line)
        for i, chunk in enumerate(chunks):
            doc = Document(page_content=chunk, metadata={"page": i, "source": file_path})
            doc_chunks.append(doc)
    return doc_chunks

def setup_chain(doc_chunks):
    embeddings = OpenAIEmbeddings()
    vector_store = Chroma.from_documents(doc_chunks, embeddings)
    retriever = vector_store.as_retriever(search_kwargs={"k": 4})

    system_template = """
    등기사항전부증명서를 통해서 회사의 정보를 제공하고싶습니다.

    만약 회사 정보를 물어볼 때 제공해야 하는 내용은 회사명, 회사 영문명, 법인 등록번호, 본점 주소, 발행할 주식의 총수, 설립 시 액면가, 현재 액면가, 회사설립연월일 입니다.
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
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", streaming=True, temperature=0)

    chain = RetrievalQAWithSourcesChain.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt},
        reduce_k_below_max_tokens=True,
    )
    return chain