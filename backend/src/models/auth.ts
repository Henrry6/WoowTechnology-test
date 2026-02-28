import jwt from "jsonwebtoken";
import { UserRole } from "./users";
import { Request } from "express";

// export interface AuthRequest extends Request {
//   user: {
//     id: string | jwt.JwtPayload;
//     role: string;
//   };
// }
// export interface AuthRequestMiddleware extends Request {
//   user: string | jwt.JwtPayload;
// }
// export interface AuthResponse {
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     role: UserRole;
//   };
// }
