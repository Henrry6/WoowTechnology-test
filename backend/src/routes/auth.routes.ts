import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { validateFields } from "../middlewares/validation";
import { loginValidator, registerValidator } from "../utils/validator";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validateFields,
  AuthController.register,
);
router.post("/login", loginValidator, validateFields, AuthController.login);

export default router;
