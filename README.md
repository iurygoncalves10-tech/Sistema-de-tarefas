# Sistema de Tarefas

Uma aplicação full-stack para gerenciamento de tarefas, desenvolvida com **FastAPI** no backend e **React** no frontend.

## 🚀 Tecnologias

### Backend
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação segura
- **Pydantic** - Validação de dados

### Frontend
- **React 18** - Biblioteca para interfaces de usuário
- **Axios** - Cliente HTTP para requisições
- **React Router DOM** - Navegação entre páginas

## 📋 Pré-requisitos

- Python 3.8+
- Node.js 16+
- PostgreSQL

## 🔧 Instalação e Execução

### 1. Clone o repositório
\\\ash
git clone https://github.com/seu-usuario/sistema-de-tarefas.git
cd sistema-de-tarefas
\\\

### 2. Backend

\\\ash
cd backend

# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute o servidor
uvicorn app.main:app --reload
\\\

### 3. Frontend

\\\ash
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute o servidor de desenvolvimento
npm start
\\\

A aplicação estará disponível em:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Documentação da API: http://localhost:8000/docs

## 📁 Estrutura do Projeto

\\\
sistema-de-tarefas/
├── backend/
│   ├── app/
│   │   ├── dependencies/
│   │   ├── routes/
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── .gitignore
├── LICENSE
└── README.md
\\\

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com por Iury Gonçalves Ribeiro
