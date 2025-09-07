from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import asyncio
from pathlib import Path
import os
from my_agent import answer_question  # your chatbot logic

app = FastAPI()

# Enable CORS for dev (optional if frontend served by FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to React build folder
frontend_dist = os.path.join(os.path.dirname(__file__), "frontend", "dist")
public_dist = os.path.join(os.path.dirname(__file__), "frontend", "public")

# Serve /assets/*
app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

app.mount("/static", StaticFiles(directory=os.path.join(public_dist)), name="static")

# Serve React index.html on root
@app.get("/", response_class=FileResponse)
async def root():
    index_path = os.path.join(frontend_dist, "index.html")
    return FileResponse(index_path)
# Pydantic model for chat
class ChatRequest(BaseModel):
    message: str



# Chat endpoint
@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    if not req.message:
        raise HTTPException(status_code=400, detail="No message provided")
    try:
        # Run chatbot function in a thread (non-blocking)
        reply = await asyncio.to_thread(answer_question, req.message)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    index_path = os.path.join(frontend_dist, "index.html")
    return FileResponse(index_path)