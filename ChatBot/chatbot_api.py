from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import asyncio
from my_agent import answer_question  # your chatbot function

app = FastAPI(title="AgroPulse Chatbot API")

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
FRONTEND_DIST = os.path.join(os.path.dirname(__file__), "frontend", "dist")
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), "frontend", "public")

# Serve built React assets (JS, CSS, etc.)
app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="assets")

# Serve public files (images, etc.)
app.mount("/static", StaticFiles(directory=PUBLIC_DIR), name="static")
# app.mount("/", StaticFiles(directory=PUBLIC_DIR), name="public")

# Pydantic model for chat
class ChatRequest(BaseModel):
    message: str

# Root route → React app
@app.get("/static")
async def serve_root():
    return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))

# Any React route → React app
@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))

# Chat endpoint
@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    if not req.message:
        raise HTTPException(status_code=400, detail="No message provided")
    try:
        reply = await asyncio.to_thread(answer_question, req.message)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
