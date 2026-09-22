"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirectUrl);
      return;
    }

    if (allowedRoles && role && !allowedRoles.includes(role)) {
      router.replace(`/unauthorized?required=${allowedRoles.join(",")}&current=${role}`);
    }
  }, [isLoading, isAuthenticated, role, allowedRoles, router, pathname]);

  if (isLoading) {
    return (
      <div className="page" style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <span className="brand-mark" style={{ margin: "0 auto 16px", animation: "pulse 1.5s infinite" }}>ϟ</span>
          <p className="muted">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}
