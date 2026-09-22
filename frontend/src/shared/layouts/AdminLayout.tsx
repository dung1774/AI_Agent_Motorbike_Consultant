"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { BrandMark } from "@/shared/ui/BrandMark";

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { toast } = useApp();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8faf9" }}>
      <header className="site-header" style={{ background: "#ffffff", borderBottom: "1px solid #d4dfd6" }}>
        <div className="container header-inner" style={{ height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <BrandMark href="/admin" />
            <span
              style={{
                padding: "3px 8px",
                borderRadius: 6,
                background: "#f3e8ff",
                color: "#6b21a8",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Admin Portal
            </span>
          </div>

          <nav className="desktop-nav" aria-label="Điều hướng quản trị">
            <Link
              href="/admin"
              className={pathname === "/admin" ? "active" : ""}
            >
              Báo cáo & Giám sát hệ thống
            </Link>
          </nav>

          <div className="cluster" style={{ gap: 12 }}>
            {user && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ textAlign: "right", lineHeight: 1.2 }}>
                  <strong style={{ fontSize: "0.82rem", display: "block" }}>{user.name}</strong>
                  <small style={{ color: "#7c3aed", fontSize: "0.72rem", fontWeight: 700 }}>
                    Quản trị viên
                  </small>
                </div>
                <button
                  className="button button-ghost button-small"
                  onClick={() => void logout()}
                  style={{ fontSize: "0.78rem", color: "var(--danger)" }}
                  title="Đăng xuất khỏi tài khoản quản trị"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>{children}</main>

      {toast && <div className="toast" role="status">✓ {toast}</div>}
    </div>
  );
}
