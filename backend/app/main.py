from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Base
from app.routes import users, tasks, auth

app = FastAPI()

# Configuração CORS - PERMITE O FRONTEND ACESSAR O BACKEND
origins = [
    "http://localhost:3000",  # Frontend React
    "http://127.0.0.1:3000",
    "http://localhost:8001",
    "http://127.0.0.1:8001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite essas origens
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, PUT, DELETE, etc)
    allow_headers=["*"],  # Permite todos os headers
)

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(tasks.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"mensagem": "API do Sistema de Tarefas funcionando!"}