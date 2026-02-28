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
