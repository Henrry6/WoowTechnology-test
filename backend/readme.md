## 2️⃣ Levantar la Base de Datos con Docker

```bash
docker compose up -d

```

Verificar que el contenedor esté corriendo:

```bash
docker ps

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
