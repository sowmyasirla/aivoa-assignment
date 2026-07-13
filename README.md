# Aivoa AI Chat Assignment

An AI-powered chat application developed as part of the Aivoa Full Stack Developer assignment. The application provides an interactive chat interface with an AI-powered backend API and a responsive frontend.

## 🚀 Features

* AI-based chat interaction
* User-friendly chat interface
* FastAPI backend API
* React-based frontend
* Real-time communication between frontend and backend
* API documentation using Swagger UI
* Secure environment variable management
* Responsive design

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* Uvicorn
* AI API Integration
* REST API

### Tools

* Git & GitHub
* VS Code
* npm
* Python Virtual Environment

## 📂 Project Structure

```
aivoa-assignment/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── tools.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChat.jsx
│   │   │   └── InteractionForm.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/sowmyasirla/aivoa-assignment.git
```

Go into project folder:

```bash
cd aivoa-assignment
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside backend folder:

```
GOOGLE_API_KEY=your_api_key_here
```

Run backend server:

```bash
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open a new terminal.

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔄 Application Flow

1. User enters a message in the frontend chat interface.
2. Frontend sends the request to the FastAPI backend.
3. Backend processes the request using AI services.
4. AI response is returned through the API.
5. Frontend displays the response to the user.

## 🔐 Environment Variables

Sensitive information such as API keys is stored in `.env` files.

Environment files are excluded from GitHub using `.gitignore` to protect credentials.

## 📌 API Endpoints

### Chat API

```
POST /chat
```

Used for sending user messages and receiving AI responses.

### Documentation

```
GET /docs
```

Provides interactive API documentation using Swagger UI.

## 🧪 Testing

Backend API can be tested using:

* Swagger UI
* Postman
* Frontend chat interface

## 👩‍💻 Author

**Sowmya Sirla**

GitHub:
https://github.com/sowmyasirla

## 📄 License

This project was created for the Aivoa Full Stack Developer assignment.
