import { SalesDashboard } from "./SalesDashboard";

export function LeadDashboardView() {
  return (
    <div className="page sales-page" style={{ paddingTop: 28 }}>
      <div className="container">
        <header className="sales-topbar">
          <div>
            <span className="eyebrow">Bàn làm việc Tư vấn viên</span>
            <h1 style={{ margin: "4px 0 0", fontSize: "1.85rem" }}>Hàng đợi hỗ trợ & Handoff</h1>
            <p className="muted" style={{ margin: "4px 0 0", fontSize: "0.9rem" }}>
              Mô phỏng hàng đợi khách do AI Agent chuyển sang; không xác minh hay phê duyệt hồ sơ thật.
            </p>
          </div>
        </header>
        <SalesDashboard />
      </div>
    </div>
  );
}
