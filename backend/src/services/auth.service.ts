import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../models/users";
import { UserRepository } from "../repositories/user.repository";

const JWT_SECRET = process.env.JWT_SECRET!;

export const AuthService = {
  async register(data: IUser) {
    const existing = await UserRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("El email ya está registrado");
    }
    const hashed = await bcrypt.hash(data.password, 10);

    return UserRepository.create({
      ...data,
      password: hashed,
    });
  },

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Credenciales inválidas");
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  },
};
