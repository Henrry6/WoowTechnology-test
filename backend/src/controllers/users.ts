import bcrypt from "bcryptjs";
import validator from "validator";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserRepository.findById(req.user?.id as string);
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, role, email, ...rest } = req.body;
    if (role) {
      return res.status(403).json({
        message: "No puedes cambiar tu rol",
      });
    }
    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          message: "El email no es válido",
        });
      }

      const existingUser = await UserRepository.findByEmail(email);

      if (existingUser && existingUser.id !== req?.user?.id) {
        return res.status(400).json({
          message: "El email ya está en uso",
        });
      }

      rest.email = email.toLowerCase();
    }
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          message: "La contraseña debe tener mínimo 8 caracteres",
        });
      }

      rest.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await UserRepository.update(
      req?.user?.id as string,
      rest,
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await UserRepository.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserRepository.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "El email ya está registrado",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, ...rest } = req.body;
    if (password) {
      rest.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await UserRepository.update(req.params.id, rest);
    if (!updatedUser) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleted = await UserRepository.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
