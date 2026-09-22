"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { getRedirectPathForRole } from "@/lib/auth";
import { BrandMark } from "@/shared/ui/BrandMark";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { role, isAuthenticated } = useAuth();

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Điều hướng giới thiệu">
            <Link href="/vehicles">Mẫu xe</Link>
            <Link href="/cost">Chi phí</Link>
            <Link href="/stores">Cửa hàng</Link>
          </nav>
          <div className="cluster" style={{ gap: 8 }}>
            {isAuthenticated && role ? (
              <Link className="button button-primary button-small" href={getRedirectPathForRole(role)}>
                Vào khu vực của bạn
              </Link>
            ) : (
              <>
                <Link className="button button-ghost button-small" href="/login">Đăng nhập</Link>
                <Link className="button button-primary button-small" href="/register">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
