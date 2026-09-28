"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { clearDemoRole } from "@/lib/demo-workflows";
import { BrandMark } from "@/shared/ui/BrandMark";

export function StaffLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  return <div className="staff-site">
    <header className="staff-header"><div className="container staff-header-inner">
      <div className="staff-brand"><BrandMark /><span className="staff-header-label">Khu vực nhân viên</span></div>
      <nav aria-label="Điều hướng nhân viên" className="staff-header-actions">
        {pathname !== "/staff/login" && <Link href="/staff">Hàng đợi</Link>}
        <Link href="/">Về trang khách</Link>
        {pathname !== "/staff/login" && <button className="button button-secondary" type="button" onClick={() => { clearDemoRole(); router.push("/staff/login"); }}>Thoát demo</button>}
      </nav>
    </div></header>
    <main className="staff-main">{children}</main>
    <footer className="staff-footer"><div className="container">Xe X · Không dùng dữ liệu thật hoặc quyết định thật trong bản demo.</div></footer>
  </div>;
}
