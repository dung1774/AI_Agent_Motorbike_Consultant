"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearDemoRole, demoStatusLabel, getDemoLeads, getDemoRole, type DemoLead, type DemoRole } from "@/lib/demo-workflows";
import { formatVnd } from "@/lib/format";

export function AccountView({ section = "overview" }: { section?: "overview" | "history" }) {
  const router = useRouter();
  const [role, setRole] = useState<DemoRole | null>(null);
  const [leads, setLeads] = useState<DemoLead[]>([]);
  const [hasConversation, setHasConversation] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setRole(getDemoRole());
      setLeads(getDemoLeads());
      try {
        const saved = JSON.parse(window.sessionStorage.getItem("xe-x-demo-conversation") ?? "null");
        setHasConversation(Array.isArray(saved?.messages) && saved.messages.length > 1);
      } catch { setHasConversation(false); }
    };
    refresh();
    window.addEventListener("xe-x-demo-change", refresh);
    return () => window.removeEventListener("xe-x-demo-change", refresh);
  }, []);

  if (role !== "customer") return <div className="container page"><div className="empty-page"><h1>Tài khoản demo</h1><p>Vào vai khách để xem yêu cầu trong phiên trình duyệt này.</p><Link className="button button-primary" href="/login">Vào demo khách</Link></div></div>;

  const shownLeads = section === "overview" ? leads.slice(0, 3) : leads;
  return (
    <div className="account-page"><div className="container account-grid">
      <aside className="account-sidebar" aria-label="Điều hướng tài khoản demo">
        <div className="account-greeting"><span aria-hidden="true">●</span><div><small>Xin chào,</small><strong>Khách demo</strong></div></div>
        <nav className="account-nav" aria-label="Mục tài khoản">
          <span>HÀNH TRÌNH CỦA TÔI</span>
          <Link href="/account" aria-current={section === "overview" ? "page" : undefined}>Tổng quan</Link>
          <Link href="/history" aria-current={section === "history" ? "page" : undefined}>Yêu cầu của tôi</Link>
          <Link href="/advisor">Tiếp tục tư vấn</Link>
          <span>KHÁM PHÁ</span>
          <Link href="/vehicles">Mẫu xe</Link>
          <Link href="/cost">Tính chi phí</Link>
        </nav>
        <button className="account-signout" type="button" onClick={() => { clearDemoRole(); router.push("/login"); }}>Thoát vai demo</button>
      </aside>
      <main className="account-main">
        <div className="account-main-head"><div><span className="eyebrow">Tài khoản Xe X</span><h1>{section === "overview" ? "Tổng quan" : "Yêu cầu của tôi"}</h1></div><span className="badge">Bản demo</span></div>
        <p className="microcopy">Dữ liệu chỉ lưu trong tab này; đây không phải tài khoản hay lịch sử trên máy chủ.</p>
        {section === "overview" && <div className="account-shortcuts">
          <Link href="/advisor"><strong>Tiếp tục tư vấn</strong><span>Trở lại cuộc trò chuyện →</span></Link>
          <Link href="/vehicles"><strong>Khám phá mẫu xe</strong><span>Xem thông số demo →</span></Link>
          <Link href="/deposit"><strong>Yêu cầu cọc</strong><span>Thử luồng chờ nhân viên →</span></Link>
        </div>}
        {section === "overview" && hasConversation && <div className="account-conversation"><div><strong>Phiên tư vấn trong tab</strong><p>Hội thoại chưa được đồng bộ với máy chủ.</p></div><Link href="/advisor">Mở lại →</Link></div>}
        <div className="account-list-head"><h2>{section === "overview" ? "Yêu cầu gần đây" : "Lịch sử yêu cầu"}</h2>{section === "overview" && <Link href="/history">Xem tất cả →</Link>}</div>
        {shownLeads.length === 0 ? <div className="account-empty"><span aria-hidden="true">◎</span><h3>Chưa có yêu cầu</h3><p>Thử ước tính trả góp hoặc tạo yêu cầu cọc demo để xem trạng thái ở đây.</p><div className="cluster"><Link className="button button-secondary" href="/installment">Trả góp</Link><Link className="button button-primary" href="/deposit">Yêu cầu cọc</Link></div></div> :
          <div className="account-leads">{shownLeads.map((lead) => <article key={lead.id}>
            <div><span className="eyebrow">{lead.kind === "installment" ? "Trả góp demo" : "Cọc demo"}</span><h3>{lead.vehicleName}</h3><p>{lead.id}</p></div>
            <div><strong>{demoStatusLabel[lead.status]}</strong><span>{lead.kind === "installment" ? "Trả trước" : "Cọc giả định"}: {formatVnd(lead.amount)}</span>{lead.storeName && <small>Điểm demo: {lead.storeName}</small>}</div>
          </article>)}</div>}
      </main>
    </div></div>
  );
}
