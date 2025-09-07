import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from bs4 import BeautifulSoup
import bs4

from langchain_community.tools import ArxivQueryRun, WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper, ArxivAPIWrapper
from langchain.chains import LLMMathChain
from langchain.agents import Tool, initialize_agent, AgentType


# -----------------------
# Load API Keys
# -----------------------
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")
hf_token = os.getenv("HF_TOKEN")
os.environ["HF_TOKEN"] = hf_token

# -----------------------
# Initialize LLM
# -----------------------
llm = ChatGroq(
    groq_api_key=groq_api_key,
    model_name="llama-3.3-70b-versatile"
)

# -----------------------
# Embeddings + VectorStore
# -----------------------
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def load_web_docs(urls):
    all_docs = []
    for url in urls:
        loader = WebBaseLoader(
            web_paths=(url,),
            bs_kwargs=dict(
                parse_only=bs4.SoupStrainer(
                    class_=("post-content", "post-title", "post-header")
                )
            ),
        )
        docs = loader.load()
        all_docs.extend(docs)
    return all_docs

urls = [
    "https://invadeagro.com/2025/07/03/common-crop-diseases-india/",
    "https://eos.com/blog/crop-diseases/",
    "https://www.growag.com/highlights/article/guide-to-crop-disease-and-management",
    "https://kshema.co/blogs/common-crop-diseases-and-how-to-prevent-them/",
    "https://krikso.co.in/pest-and-disease-management-protecting-your-crops-effectively/",
    "https://blog.plantwise.org/tag/plant-diseases/",
    "https://farmonaut.com/blogs/best-farming-organic-farming-blogs-in-india",
    "https://agrisearchindia.com/en/blog"
]

docs = load_web_docs(urls)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)

vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# -----------------------
# Prompt Template
# -----------------------
system_prompt = (
    "You are an expert assistant for answering crop and farming questions. "
    "Use the following retrieved context to answer the question. "
    "If you don't know the answer, say you don't know. "
    "Always respond in the same language as the user's question. "
    "Provide a detailed, thorough, and informative answer, covering all relevant points. "
    "Explain technical terms if needed.\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "Please answer in detail {input}"),
    ]
)

# -----------------------
# Tools
# -----------------------
# Wikipedia
api_wrapper_wiki = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=250)
wiki = WikipediaQueryRun(api_wrapper=api_wrapper_wiki)

# Math calculator
math_chain = LLMMathChain.from_llm(llm=llm)
calculator = Tool(
    name="Calculator",
    func=math_chain.run,
    description="A calculator for farming math. Use this when farmers ask about quantities, costs, yields, fertilizer requirements, or any arithmetic calculation."
)

# Retrieval QA Chain
question_answer_chain = create_stuff_documents_chain(llm, prompt)
chain = create_retrieval_chain(retriever, question_answer_chain)

def run_qa_chain_tool(question):
    try:
        response = chain.invoke({"input": question})
        if isinstance(response, dict) and "result" in response:
            return response["result"]
        return response
    except Exception as e:
        return f"An error occurred: {e}"

retriever_tool = Tool(
    name="CropDocs",
    func=run_qa_chain_tool,
    description="Useful for answering farming and crop disease questions from AgroPulse blog database"
)

tools = [retriever_tool, wiki, calculator]

# -----------------------
# Agent
# -----------------------
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# -----------------------
# Example Run
# -----------------------
# if __name__ == "__main__":
#     query = "What are the common rice diseases in India and how can they be managed?"
#     response = agent.run(query)
#     print("Answer:\n", response)

# Single entrypoint function the API will call
def answer_question(question: str) -> str:
    print("Received message:", question)
    """
    Runs the agent on the question and returns a string reply.
    We call agent.run inside a thread from FastAPI to avoid blocking the event loop.
    """
    try:
        return agent.run(question)
    except Exception as e:
        return f"Agent error: {e}"
