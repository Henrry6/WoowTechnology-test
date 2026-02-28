import { Router } from "express";
import { validateFields } from "../middlewares/validation";
import { registerValidator, updateValidator } from "../utils/validator";
import {
  getMe,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
} from "../controllers/users";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware";

const router = Router();

// Usuario autenticado
router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateMe);

// Solo admin
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUserById);
router.post(
  "/",
  registerValidator,
  validateFields,
  authMiddleware,
  adminMiddleware,
  createUser,
);
router.put(
  "/:id",
  updateValidator,
  validateFields,
  authMiddleware,
  adminMiddleware,
  updateUser,
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
