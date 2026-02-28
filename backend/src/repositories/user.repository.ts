import { pool } from "../config/database";
import { IUser } from "../models/users";

export const UserRepository = {
  async findByEmail(email: string) {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  },

  async findById(id: string) {
    const { rows } = await pool.query(
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [id],
    );
    return rows[0];
  },

  async create(user: Partial<IUser>) {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role`,
      [user.name, user.email, user.password, user.role || "user"],
    );
    return rows[0];
  },

  async update(
    id: string,
    data: Partial<Omit<IUser, "id" | "createdAt" | "updatedAt">>,
  ) {
    const fields: string[] = [];
    const values: unknown[] = [];
    let index = 1;

    for (const key of Object.keys(data) as (keyof typeof data)[]) {
      const value = data[key];

      if (value !== undefined) {
        fields.push(`${String(key)} = $${index}`);
        values.push(value);
        index++;
      }
    }

    values.push(id);

    const { rows } = await pool.query(
      `UPDATE users SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${index}
      RETURNING id, name, email, role`,
      values,
    );

    return rows[0];
  },

  async delete(id: string) {
    const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    return rowCount;
  },

  async findAll() {
    const { rows } = await pool.query(
      "SELECT id, name, email, role FROM users",
    );
    return rows;
  },
};
