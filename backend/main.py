from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from model import translation_text

# Project paths
BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"

app = FastAPI(title="SLM Translator")

# Serve CSS and JavaScript from frontend/
app.mount(
    "/static",
    StaticFiles(directory=str(FRONTEND_DIR)),
    name="static"
)


class TranslationRequest(BaseModel):
    text: str


# Open the frontend UI
@app.get("/")
def home():
    return FileResponse(FRONTEND_DIR / "index.html")


# Check whether the API is running
@app.get("/health")
def health():
    return {"status": "ok", "model": "loaded"}


# Translate English text into Tamil
@app.post("/translate")
def translate(data: TranslationRequest):
    if not data.text.strip():
        raise HTTPException(
            status_code=400,
            detail="Please enter text to translate."
        )

    try:
        result = translation_text(data.text)

        return {
            "original_text": data.text,
            "translated_text": result
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Translation failed. Check the backend terminal."
        )
