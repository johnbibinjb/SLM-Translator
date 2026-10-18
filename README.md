# 🌐 SLM Translator — English to Tamil

An AI-powered translation application that translates English text into Tamil using a pretrained neural machine translation model, Python, and FastAPI.

🔗 **Source Code:** [GitHub Repository](https://github.com/johnbibinjb/SLM-Translator) · 🚀 

## 📌 Overview

SLM Translator integrates a pretrained sequence-to-sequence model with a FastAPI backend and a lightweight web interface to provide English-to-Tamil translation.

## ✨ Features

- English-to-Tamil text translation
- Pretrained neural machine translation model
- FastAPI-based REST API
- HTML, CSS, and JavaScript frontend
- Input validation and error handling
- Modular backend and frontend architecture

## 🏗️ System Architecture

```text
          👤 User
             |
             v
    🖥️ Frontend Interface
      HTML, CSS, JavaScript
             |
             | HTTP Request
             v
       ⚡ FastAPI Backend
          (main.py)
             |
             v
       🤖 Translation Module
          (model.py)
             |
             v
      🧠 Pretrained Model
   Helsinki-NLP/opus-mt-en-dra
             |
             v
       🔄 Generate Tamil Text
             |
             v
     📤 API Response (JSON)
             |
             v
      🖥️ Display Translation
```

### 🔄 How It Works

1. **User Input:** The user enters English text in the web interface.
2. **API Request:** JavaScript sends the text to the FastAPI backend.
3. **Model Processing:** The backend passes the input to the translation module.
4. **Translation:** The tokenizer processes the input, and the pretrained model generates the output.
5. **Response:** The backend returns the translated text as JSON.
6. **Display:** The frontend displays the Tamil translation.

## 📁 Project Structure

```text
SLM-Translator/
│
├── backend/
│   ├── main.py              # FastAPI application and API endpoints
│   └── model.py             # Model loading and translation logic
│
├── frontend/
│   ├── index.html           # User interface
│   ├── style.css            # Interface styling
│   └── script.js            # API requests and UI interactions
│
├── .gitignore               # Files excluded from Git
├── .python-version          # Python version configuration
├── README.md                # Project documentation
├── pyproject.toml           # Project and dependency configuration
├── requirements.txt         # Python dependencies
└── uv.lock                  # Locked dependency versions
```

*Note: The tree above is the intended layout. Keep only files and folders that actually exist in your repository, and update filenames if your implementation differs.*

### 📂 Backend Components

| File | Responsibility |
|---|---|
| `main.py` | Initializes FastAPI and handles API requests |
| `model.py` | Loads the pretrained model and performs translation |

### 🎨 Frontend Components

| File | Responsibility |
|---|---|
| `index.html` | Defines the web interface |
| `style.css` | Styles the application |
| `script.js` | Sends requests to the API and displays results |

## 🛠️ Technology Stack

### Languages
- Python
- HTML5
- CSS3
- JavaScript

### Frameworks & Libraries
- **FastAPI** — REST API development
- **Uvicorn** — ASGI server
- **Hugging Face Transformers** — Model and tokenizer loading
- **PyTorch** — Model inference

### AI Model
- **Model:** `Helsinki-NLP/opus-mt-en-dra`
- **Architecture:** Sequence-to-sequence neural machine translation
- **Task:** English-to-Tamil translation

### Development Tools
- **Git & GitHub** — Version control and source code hosting
- **Python `venv`** — Virtual environment management
- **pip** — Python package installation
- **uv** — Dependency and project management, if used in your workflow

## ⚙️ Installation & Execution

### 1. Clone the Repository

```bash
git clone https://github.com/johnbibinjb/SLM-Translator.git
cd SLM-Translator
```

### 2. Create and Activate a Virtual Environment

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the Backend

From the project root, if `main.py` is inside `backend/` and imports are configured for this layout:

```bash
uvicorn backend.main:app --reload
```

API documentation:

`http://127.0.0.1:8000/docs`

### 5. Open the Frontend

Open `frontend/index.html` in a browser or serve the frontend using your configured web server. Ensure the frontend API URL matches the running backend.

*The backend must allow the frontend origin through CORS if the frontend and API run on different origins.*

## 🎯 Key Learnings

- Pretrained transformer model inference
- Tokenization and text generation
- REST API development with FastAPI
- Frontend–backend integration
- Python environments and dependency management
- Debugging model and API integration

## 🔮 Future Enhancements

- Support for more Indian languages
- Translation quality evaluation
- Translation history and copy functionality
- Improved loading states and error handling
- Cloud deployment and automated testing

## 👨‍💻 Developer

**John Bibin V**

Computer Science and Engineering — Artificial Intelligence and Machine Learning  


- [GitHub](https://github.com/johnbibinjb)
- [LinkedIn](https://www.linkedin.com/in/john-bibin/)

---

⭐ If you find this project interesting, explore the repository and share your feedback.
