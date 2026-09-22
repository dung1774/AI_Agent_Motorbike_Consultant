"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { BrandMark } from "@/shared/ui/BrandMark";

export function EmployeeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { toast } = useApp();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f8f6" }}>
      <header className="site-header" style={{ background: "#ffffff", borderBottom: "1px solid #d4dfd6" }}>
        <div className="container header-inner" style={{ height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <BrandMark href="/employee" />
            <span
              style={{
                padding: "3px 8px",
                borderRadius: 6,
                background: "#e8efe9",
                color: "var(--forest)",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Sales Advisor Workspace
            </span>
          </div>

          <nav className="desktop-nav" aria-label="Điều hướng nhân viên">
            <Link
              href="/employee"
              className={pathname === "/employee" || pathname === "/sales" ? "active" : ""}
            >
              Hàng đợi Lead & Handoff
            </Link>
          </nav>

          <div className="cluster" style={{ gap: 12 }}>
            {user && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ textAlign: "right", lineHeight: 1.2 }}>
                  <strong style={{ fontSize: "0.82rem", display: "block" }}>{user.name}</strong>
                  <small style={{ color: "var(--forest-2)", fontSize: "0.72rem", fontWeight: 700 }}>
                    Tư vấn viên Showroom
                  </small>
                </div>
                <button
                  className="button button-ghost button-small"
                  onClick={() => void logout()}
                  style={{ fontSize: "0.78rem", color: "var(--danger)" }}
                  title="Đăng xuất khỏi hệ thống"
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
