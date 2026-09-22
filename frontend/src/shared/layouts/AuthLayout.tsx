import type { ReactNode } from "react";
import Link from "next/link";
import { BrandMark } from "@/shared/ui/BrandMark";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-layout-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "radial-gradient(circle at 80% 20%, #eefbe6 0%, rgba(251,252,250,1) 50%)" }}>
      <header className="site-header" style={{ background: "transparent", borderBottom: "1px solid rgba(215, 225, 217, 0.5)" }}>
        <div className="container header-inner" style={{ height: 68 }}>
          <BrandMark />
          <div className="cluster">
            <span className="badge badge-neutral" style={{ fontSize: "0.72rem" }}>Hệ thống Demo 2026</span>
            <Link href="/" className="button button-ghost button-small">← Về trang chủ</Link>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, display: "grid", placeItems: "center", padding: "36px 16px" }}>
        <div style={{ width: "100%", maxWidth: 480 }}>
          {children}
        </div>
      </main>

      <footer style={{ padding: "20px 0", borderTop: "1px solid var(--line)", textAlign: "center", color: "var(--ink-soft)", fontSize: "0.76rem" }}>
        <div className="container">
          <p style={{ margin: 0 }}>Xe X Electric Motorcycles · Trợ lý tư vấn & bán hàng AI · Demo Prototype</p>
        </div>
      </footer>
    </div>
  );
}
