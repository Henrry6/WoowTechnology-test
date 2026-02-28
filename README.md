# Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:

✅ **Node.js >= 18**  
✅ **Docker**  
✅ **Docker Compose**

Verificar versiones:

```bash
node -v
docker -v
docker compose version
```

## ⚙️ Instalación y Ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone git@github.com:Henrry6/WoowTechnology-test.git
```

# Levantar Servidor (Backend)

```bash
cd backend
```

## 2️⃣ Levantar la Base de Datos con Docker

```bash
docker compose up -d

```

Verificar que el contenedor esté corriendo:

```bash
docker ps

```

Conectarse a la base de datos:

```bash
docker exec -it woow_postgres psql -U woow -d woowdb
```

Dentro del prompt de psql:

```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## 3️⃣ Instalar dependencias

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

### Servidor disponible en:

http://localhost:3000

## 4️⃣ Endpoints Principales

### 🔐 Autenticación Login

**POST** /api/auth/login

```json
Body:
{
"email": "admin@test.com",
"password": "12345678"
}
```

Respuesta:

```bash

{
"token": "jwt_token",
"user": {
"id": 1,
"email": "admin@test.com",
"role": "admin"
}
```

### Registro

**POST** /api/auth/register

```json
{
  "name": "Henrry David",
  "email": "admin@test.com",
  "password": "12345678",
  "role": "admin"
}
```

### Obtener datos del usuario logueado

**GET** /api/users/me

```bash
{
  "id": "74494aa6-4987-4bcf-b4e2-14320545abb2",
  "name": "USUARIO EDIATDO",
  "email": "admin@testt.com",
  "role": "user"
}
```

### Actualizar datos del usuario logueado

**PUT** /api/users/me

```bash
{
  "name": "AdministradorUp",
  "email": "newemail@test.com",
}
```

### Usuarios

**GET** /api/users

```json
[
  {
    "id": "59241bea-6306-4da5-b62f-8283eb02c253",
    "name": "Administrador",
    "email": "admin@test.com",
    "role": "admin"
  },
  {
    "id": "e8f0d783-9120-44a1-8197-015e068eb931",
    "name": "HENRRY",
    "email": "henry@test.com",
    "role": "admin"
  },
  {
    "id": "74494aa6-4987-4bcf-b4e2-14320545abb2",
    "name": "USUARIO EDIATDO",
    "email": "admin@testt.com",
    "role": "user"
  }
]
```

### Actualizar datos de cualquier usuario

**PUT** /api/users/[idUsuario]

```bash
{
  "name": "AdministradorUp",
  "email": "newemail@test.com",
}
```

### Crear nuevo usuario

**POST** /api/users

```bash
{
  "name": "Administrador 2",
  "email": "admin2@test.com",
  "password": "12345678",
  "role": "admin"
}
```

👥 Usuarios
Obtener todos los usuarios
GET /api/users

```bash
Requiere token JWT en header:
Authorization: <token>
```

### 📂 Estructura del Proyecto

- src/
- ├── controllers/
- ├── services/
- ├── repositories/
- ├── middlewares/
- ├── routes/
- ├── config/
- ├── utils/
- └── app.ts

# Levantar App (Frontend)

```bash
cd frontend
```

## Instalar dependencias

```bash
 npm install
```
