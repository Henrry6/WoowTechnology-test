Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:

✅ Node.js >= 18
✅ Docker
✅ Docker Compose

Verificar versiones:

node -v
docker -v
docker compose version

⚙️ Instalación y Ejecución
1️⃣ Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd nombre-del-proyecto

2️⃣ Configurar variables de entorno

Copiar archivo de ejemplo:

cp .env.example .env

Editar el archivo .env con las credenciales necesarias:

PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/database
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d

3️⃣ Levantar la Base de Datos con Docker
docker compose up -d
Verificar que el contenedor esté corriendo:

docker ps
4️⃣ Instalar dependencias
npm install
5️⃣ Ejecutar Seed (datos iniciales)

Este comando crea datos de prueba (usuarios y roles):

npm run seed
6️⃣ Levantar servidor en desarrollo
npm run dev

Servidor disponible en:
http://localhost:3000

🧪 Endpoints Principales
🔐 Autenticación
Login
POST /api/auth/login
Body:
{
"email": "admin@test.com",
"password": "12345678"
}

Respuesta:

{
"token": "jwt_token",
"user": {
"id": 1,
"email": "admin@test.com",
"role": "admin"
}
}

👥 Usuarios
Obtener todos los usuarios
GET /api/users
Requiere token JWT en header:
Authorization: <token>

📂 Estructura del Proyecto
src/
│
├── controllers/
├── services/
├── repositories/
├── middlewares/
├── routes/
├── config/
├── utils/
└── app.ts

Arquitectura por capas:

Routes → Define endpoints

Controllers → Maneja request/response

Services → Lógica

Repositories → Acceso a base de datos

Middlewares → Autenticación y manejo de errores

🛑 Detener la Base de Datos
docker compose down
🚦 Flujo Rápido de Ejecución

docker compose up -d
cp .env.example .env
npm install
npm run seed
npm run dev

Henrry Alvarado
Prueba Técnica Backend – WoowTechnology
