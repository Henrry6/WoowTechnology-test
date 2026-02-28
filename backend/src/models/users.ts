export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
