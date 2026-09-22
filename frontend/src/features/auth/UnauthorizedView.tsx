"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getRedirectPathForRole } from "@/lib/auth";

export function UnauthorizedView() {
  const { user, role, logout } = useAuth();

  const getRoleLabel = () => {
    switch (role) {
      case "user":
        return "Khách hàng (User)";
      case "employee":
        return "Nhân viên / Tư vấn viên (Employee)";
      case "admin":
        return "Quản trị viên (Admin)";
      default:
        return "Khách vãng lai";
    }
  };

  const roleHome = role ? getRedirectPathForRole(role) : "/login";

  return (
    <div className="panel" style={{ padding: "40px 28px", textAlign: "center", boxShadow: "var(--shadow)" }}>
      <div
        style={{
          width: 54,
          height: 54,
          margin: "0 auto 16px",
          display: "grid",
          placeItems: "center",
          borderRadius: 16,
          background: "#fff1f0",
          color: "var(--danger)",
          fontSize: "1.8rem",
          fontWeight: 900,
        }}
      >
        ✕
      </div>

      <span className="eyebrow" style={{ color: "var(--danger)" }}>403 Truy cập bị từ chối</span>
      <h1 style={{ fontSize: "1.75rem", margin: "8px 0 12px", letterSpacing: "-0.03em" }}>
        Không đủ quyền truy cập
      </h1>

      <p className="muted" style={{ fontSize: "0.92rem", maxWidth: 380, margin: "0 auto 18px", lineHeight: 1.6 }}>
        Tài khoản hiện tại của bạn là <strong>{getRoleLabel()}</strong>. Bạn không được phép truy cập trực tiếp vào khu vực này.
      </p>

      <div style={{ background: "var(--surface-2)", padding: "12px 16px", borderRadius: 12, marginBottom: 24, fontSize: "0.82rem", color: "var(--ink-soft)" }}>
        Đăng nhập với tài khoản: <strong>{user?.email ?? "Chưa đăng nhập"}</strong>
      </div>

      <div className="cluster" style={{ justifyContent: "center", gap: 12 }}>
        <Link href={roleHome} className="button button-primary">
          Về khu vực của bạn →
        </Link>
        <button
          className="button button-secondary"
          onClick={async () => {
            await logout();
            window.location.href = "/login";
          }}
        >
          Đăng xuất / Đổi tài khoản
        </button>
      </div>
    </div>
  );
}
