import bcrypt from "bcryptjs";
import { pool } from "./config/database";

async function seed() {
  const adminPassword = await bcrypt.hash("12345678", 10);
  const userPassword = await bcrypt.hash("12345678", 10);

  await pool.query(`
    INSERT INTO users (name, email, password, role)
    VALUES
    ('Administrador', 'admin@test.com', '${adminPassword}', 'admin'),
    ('Usuario Normal', 'user@test.com', '${userPassword}', 'user')
    ON CONFLICT (email) DO NOTHING;
  `);

  console.log("Seed ejecutado correctamente");
  process.exit();
}

seed();
