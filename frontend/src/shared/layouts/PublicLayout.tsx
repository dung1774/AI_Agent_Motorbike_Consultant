import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/shared/ui/BrandMark";
import { DemoAccountLink } from "@/shared/ui/DemoAccountLink";

const links = [
  ["Tư vấn", "/advisor"], ["Mẫu xe", "/vehicles"], ["Chi phí", "/cost"],
  ["So sánh", "/compare"], ["Trả góp", "/installment"], ["Đặt cọc", "/deposit"],
  ["Cửa hàng", "/stores"], ["Lịch sử", "/history"],
] as const;

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="public-site">
      <header className="site-header">
        <div className="container header-inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Điều hướng chính">
            {links.slice(0, 3).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <div className="header-actions">
            <DemoAccountLink />
            <Link className="button button-primary header-cta" href="/advisor">Tư vấn ngay</Link>
            <details className="mobile-nav">
              <summary aria-label="Mở menu điều hướng"><span className="menu-bars" aria-hidden="true"><span /><span /><span /></span></summary>
              <nav aria-label="Điều hướng điện thoại">
                {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
                <DemoAccountLink />
              </nav>
            </details>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container footer-inner"><span>Xe X · Dữ liệu và giá chỉ để minh họa. Hãy xác nhận trước khi quyết định.</span><Link href="/staff/login">Khu vực nhân viên</Link></div>
      </footer>
    </div>
  );
}
