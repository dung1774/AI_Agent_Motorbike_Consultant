export type UserRole = "user" | "employee" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: string;
}
