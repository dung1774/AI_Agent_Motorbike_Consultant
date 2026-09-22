"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getSafeRedirectPath } from "@/lib/auth";
import { DEMO_CREDENTIALS } from "@/services/auth-service";
import type { UserRole } from "@/types/auth";

export function LoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams?.get("redirect") ?? null;

  const { login, isAuthenticated, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(getSafeRedirectPath(role, redirectParam));
    }
  }, [isAuthenticated, redirectParam, role, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Vui lòng nhập địa chỉ email.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const user = await login({ email: email.trim(), password });
      const dest = getSafeRedirectPath(user.role, redirectParam);
      router.push(dest);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập không thành công.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string, demoPassword: string, demoRole: UserRole) => {
    setEmail(demoEmail);
    setPassword("••••••••");
    setLoading(true);
    setError("");
    try {
      const user = await login({ email: demoEmail, password: demoPassword });
      const dest = getSafeRedirectPath(user.role, redirectParam);
      router.push(dest);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập nhanh thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel" style={{ padding: "32px 28px", boxShadow: "var(--shadow)" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span className="brand-mark" style={{ margin: "0 auto 12px", width: 44, height: 44 }}>ϟ</span>
        <span className="eyebrow">Đăng nhập tài khoản</span>
        <h1 style={{ fontSize: "1.75rem", margin: "6px 0 8px", letterSpacing: "-0.03em" }}>Chào mừng trở lại</h1>
        <p className="muted" style={{ fontSize: "0.88rem", margin: 0 }}>
          Truy cập nền tảng tư vấn xe máy điện thông minh
        </p>
      </div>

      {error && (
        <div style={{ padding: "10px 14px", borderRadius: 10, background: "#fff2f0", color: "var(--danger)", border: "1px solid #ffccc7", fontSize: "0.85rem", marginBottom: 18 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="stack" style={{ gap: 16 }}>
        <div className="field">
          <label htmlFor="login-email" style={{ fontSize: "0.84rem", fontWeight: 700 }}>
            Địa chỉ Email
          </label>
          <input
            id="login-email"
            className="input"
            type="email"
            placeholder="nhap-email@xex.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="email"
            required
          />
        </div>

        <div className="field">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="login-password" style={{ fontSize: "0.84rem", fontWeight: 700 }}>
              Mật khẩu
            </label>
            <span className="microcopy" style={{ color: "var(--ink-soft)" }}>Tối thiểu 6 ký tự</span>
          </div>
          <input
            id="login-password"
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="button button-primary button-block"
          disabled={loading || !email.trim()}
          style={{ height: 46, fontSize: "0.95rem" }}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập →"}
        </button>
      </form>

      <div style={{ margin: "24px 0 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
        <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Tài khoản Demo
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
      </div>

      <div className="stack" style={{ gap: 10 }}>
        {DEMO_CREDENTIALS.map((demo) => (
          <button
            key={demo.role}
            type="button"
            className="button button-secondary"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "left",
              padding: "10px 14px",
              borderRadius: 12,
              height: "auto",
              borderColor: demo.role === "user" ? "var(--line)" : demo.role === "employee" ? "#cce5df" : "#e2d3f3",
            }}
            onClick={() => handleQuickLogin(demo.email, demo.password, demo.role)}
            disabled={loading}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <strong style={{ fontSize: "0.88rem" }}>{demo.name}</strong>
                <span className={`badge ${demo.role === "admin" ? "badge-warning" : demo.role === "employee" ? "badge-neutral" : ""}`} style={{ fontSize: "0.68rem" }}>
                  {demo.roleLabel}
                </span>
              </div>
              <small style={{ color: "var(--ink-soft)", fontSize: "0.75rem", display: "block", marginTop: 2 }}>
                {demo.description}
              </small>
              <small style={{ color: "var(--ink-soft)", fontSize: "0.72rem", display: "block", marginTop: 2 }}>
                {demo.email} · Mật khẩu: {demo.password}
              </small>
            </div>
            <span style={{ fontSize: "0.95rem", color: "var(--forest)" }}>→</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 22, textAlign: "center", fontSize: "0.85rem", color: "var(--ink-soft)" }}>
        Chưa có tài khoản khách hàng?{" "}
        <Link href="/register" style={{ color: "var(--forest-2)", fontWeight: 700, textDecoration: "underline" }}>
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}
