# 🤖 AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) application for Healthcare Professionals (HCPs). The application enables medical representatives to log HCP interactions using either a structured form or natural language through an AI assistant.

This project was developed as part of the AIVOA AI Assignment.

---

# Features

- Log HCP interactions using AI chat
- Structured interaction form
- Automatic information extraction using AI
- Interaction history
- Edit existing interactions
- Delete interactions
- AI-generated interaction summary
- AI sentiment analysis
- AI follow-up suggestions
- Redux state management
- FastAPI backend
- LangGraph AI workflow
- MySQL/PostgreSQL database support

---

# Tech Stack

## Frontend

- React
- Redux Toolkit
- CSS
- Google Inter Font

## Backend

- Python
- FastAPI
- SQLAlchemy
- LangGraph
- Groq LLM (Gemma2-9B-IT / Llama-3.3-70B)

## Database

- MySQL / PostgreSQL

---

# AI Agent Architecture

User Input

↓

FastAPI Backend

↓

LangGraph Agent

↓

LLM (Groq)

↓

Tools

- Log Interaction
- Edit Interaction
- Summarize Interaction
- Sentiment Analysis
- Suggest Follow-up

↓

Database

↓

Frontend

---

# LangGraph Tools

## 1. Log Interaction Tool

Extracts structured information from natural language and stores the interaction.

Example:

- HCP Name
- Date
- Time
- Attendees
- Topics
- Materials
- Samples
- Outcomes
- Follow-up Actions

---

## 2. Edit Interaction Tool

Updates an existing interaction in the database.

---

## 3. Summarize Interaction Tool

Creates a concise summary of the interaction.

---

## 4. Sentiment Analysis Tool

Determines whether the interaction sentiment is:

- Positive
- Neutral
- Negative

---

## 5. Suggest Follow-up Tool

Generates recommended follow-up actions for the medical representative.

Examples:

- Send latest clinical evidence
- Schedule follow-up visit
- Share updated brochure
- Record HCP feedback

---

# Project Structure

```
aivoa-assignment/

├── backend
│   ├── main.py
│   ├── graph.py
│   ├── tools.py
│   ├── models.py
│   ├── database.py
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── redux
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# Installation

## Backend

Create a virtual environment.

```
python -m venv .venv
```

Activate it.

Windows

```
.venv\Scripts\activate
```

Install dependencies.

```
pip install -r requirements.txt
```

Run FastAPI.

```
uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger API

```
http://127.0.0.1:8000/docs
```

---

## Frontend

Install dependencies.

```
npm install
```

Run React.

```
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file in the backend folder.

Example:

```
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=your_database_url
```

---

# API Endpoints

## AI Chat

```
POST /chat
```

Logs an interaction using AI.

---

## Get History

```
GET /interactions
```

Returns all interactions.

---

## Save Interaction

```
POST /interactions
```

Creates a new interaction.

---

## Update Interaction

```
PUT /interactions/{id}
```

Updates an existing interaction.

---

## Delete Interaction

```
DELETE /interactions/{id}
```

Deletes an interaction.

---

# Workflow

1. User enters interaction details using AI chat or manually.
2. LangGraph agent processes the input.
3. Groq LLM extracts structured information.
4. AI tools generate:
   - Summary
   - Sentiment
   - Follow-up suggestions
5. Data is saved in the SQL database.
6. Interaction history is updated.

---

# Future Enhancements

- Voice-to-text interaction logging
- HCP search and filtering
- Authentication and user roles
- Dashboard analytics
- Email reminders
- Calendar integration
- PDF export
- Advanced reporting

---

# Author

**Sowmya Sirla**

B.Tech Information Technology

AI-First CRM HCP Module Assignment