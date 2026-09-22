import { vehicles } from "@/data/mock/vehicles";
import { stores } from "@/data/mock/stores";
import { initialLeads } from "@/data/mock/leads";

const readiness = [
  { label: "Xác thực và phân quyền frontend", value: "Đã mô phỏng" },
  { label: "Catalog và cửa hàng", value: "Dữ liệu demo" },
  { label: "LLM, RAG và model routing", value: "Chưa kết nối" },
  { label: "Bộ eval thông số", value: "Chờ backend/data" },
];

export function AdminOverviewView() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-title">
          <span className="eyebrow">Quản trị demo</span>
          <h1>Tổng quan frontend</h1>
          <p>
            Màn hình tối thiểu để xác nhận cấu trúc role và route. Toàn bộ số liệu bên dưới lấy từ fixture frontend, không phải telemetry production.
          </p>
        </header>

        <div className="result-grid" style={{ marginBottom: 24 }}>
          <article className="result-card">
            <span>Mẫu xe demo</span>
            <strong>{vehicles.length}</strong>
          </article>
          <article className="result-card">
            <span>Cửa hàng demo</span>
            <strong>{stores.length}</strong>
          </article>
          <article className="result-card">
            <span>Lead mẫu ban đầu</span>
            <strong>{initialLeads.length}</strong>
          </article>
          <article className="result-card">
            <span>Vai trò frontend</span>
            <strong>3</strong>
          </article>
        </div>

        <section className="panel">
          <div className="section-head" style={{ marginBottom: 16 }}>
            <div>
              <span className="eyebrow">Phạm vi quản trị hiện tại</span>
              <h2 style={{ margin: "4px 0" }}>Trạng thái tích hợp</h2>
            </div>
            <span className="badge badge-warning">Mock only</span>
          </div>
          <div className="profile-list">
            {readiness.map((item) => (
              <div className="profile-item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <p className="microcopy" style={{ marginTop: 16 }}>
            Dashboard chuyển đổi, chi phí mô hình và kết quả eval chỉ nên hiển thị sau khi backend cung cấp dữ liệu đo thật.
          </p>
        </section>
      </div>
    </div>
  );
}
