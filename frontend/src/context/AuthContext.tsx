"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AuthUser, LoginCredentials, RegisterData, UserRole } from "@/types/auth";
import { mockAuthService } from "@/services/auth-service";
import { getRedirectPathForRole } from "@/lib/auth";

interface AuthContextValue {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  register: (data: RegisterData) => Promise<AuthUser>;
  logout: () => Promise<void>;
  getRedirectPathForRole: (role: UserRole) => string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const session = mockAuthService.getStoredSession();
      if (session) {
        setUser(session.user);
      }
    } catch {
      // Storage unavailable or failed to parse
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role: user ? user.role : null,
      isAuthenticated: Boolean(user),
      isLoading,
      async login(credentials) {
        const res = await mockAuthService.login(credentials);
        setUser(res.data);
        return res.data;
      },
      async register(data) {
        const res = await mockAuthService.register(data);
        setUser(res.data);
        return res.data;
      },
      async logout() {
        await mockAuthService.logout();
        setUser(null);
      },
      getRedirectPathForRole,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
