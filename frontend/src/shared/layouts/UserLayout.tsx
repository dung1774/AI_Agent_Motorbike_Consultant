"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { BrandMark } from "@/shared/ui/BrandMark";

const userNavItems = [
  { href: "/advisor", label: "Tư vấn AI", short: "Tư vấn", icon: "✦" },
  { href: "/vehicles", label: "Mẫu xe", short: "Mẫu xe", icon: "▰" },
  { href: "/compare", label: "So sánh", short: "So sánh", icon: "⇄" },
  { href: "/cost", label: "Chi phí", short: "Chi phí", icon: "₫" },
  { href: "/installment", label: "Trả góp", short: "Trả góp", icon: "%" },
  { href: "/stores", label: "Cửa hàng", short: "Cửa hàng", icon: "⌖" },
  { href: "/deposit", label: "Giữ xe", short: "Giữ xe", icon: "✓" },
  { href: "/profile", label: "Hồ sơ", short: "Hồ sơ", icon: "👤" },
];

const mobileNavItems = userNavItems.filter((item) =>
  ["/advisor", "/vehicles", "/compare", "/cost", "/profile"].includes(item.href)
);

export function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const { comparisonIds, toast } = useApp();
  const { user, logout } = useAuth();

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <BrandMark href="/user" />
          <nav className="desktop-nav" aria-label="Điều hướng khách hàng">
            {userNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname.startsWith(item.href) ? "active" : ""}
              >
                {item.label}
                {item.href === "/compare" && comparisonIds.length > 0 && (
                  <span className="nav-count">{comparisonIds.length}</span>
                )}
              </Link>
            ))}
          </nav>

          <div className="cluster" style={{ gap: 10 }}>
            {user && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="badge" style={{ fontSize: "0.75rem" }}>
                  👤 {user.name.split(" ").slice(-1)[0]}
                </span>
                <button
                  className="button button-ghost button-small"
                  onClick={() => void logout()}
                  title="Đăng xuất khỏi tài khoản"
                  style={{ fontSize: "0.78rem", color: "var(--ink-soft)" }}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <nav className="mobile-nav" aria-label="Điều hướng di động">
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname.startsWith(item.href) ? "active" : ""}
          >
            <span aria-hidden="true">{item.icon}</span>
            <small>{item.short}</small>
            {item.href === "/compare" && comparisonIds.length > 0 && (
              <b>{comparisonIds.length}</b>
            )}
          </Link>
        ))}
      </nav>

      {toast && <div className="toast" role="status">✓ {toast}</div>}
    </>
  );
}
