"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSafeRedirectPath } from "@/lib/auth";

export function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && role) {
      const requestedPath = new URLSearchParams(window.location.search).get("redirect");
      router.replace(getSafeRedirectPath(role, requestedPath));
    }
  }, [isAuthenticated, isLoading, role, router]);

  if (isLoading) {
    return <div className="panel" style={{ padding: 40, textAlign: "center" }}>Đang kiểm tra phiên đăng nhập...</div>;
  }

  return isAuthenticated ? null : <>{children}</>;
}
