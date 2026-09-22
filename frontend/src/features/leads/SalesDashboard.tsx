"use client";

import { useEffect, useMemo, useState } from "react";
import { vehicles } from "@/data/mock/vehicles";
import { mockLeadService } from "@/services/mock-services";
import type { LeadStatus, SalesLead } from "@/lib/types";
import { useApp } from "@/context/AppContext";

const statusLabel: Record<LeadStatus, string> = {
  new: "Mới",
  contacted: "Follow-up",
  resolved: "Đã xử lý",
};

export function SalesDashboard() {
  const [leads, setLeads] = useState<SalesLead[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const { showToast } = useApp();

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = (await mockLeadService.getLeads()).data;
      setLeads(data);
      setSelectedId((current) => current || data[0]?.id || "");
    } catch {
      setError("Không thể tải hàng đợi lead.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? leads : leads.filter((lead) => lead.status === filter)),
    [filter, leads]
  );

  const selected = leads.find((lead) => lead.id === selectedId) ?? visible[0];

  const updateStatus = async (status: LeadStatus) => {
    if (!selected) return;
    setUpdating(true);
    try {
      const changed = (await mockLeadService.updateStatus(selected.id, status)).data;
      setLeads((current) => current.map((lead) => (lead.id === changed.id ? changed : lead)));
      showToast(`Đã chuyển Lead #${selected.id.replace("LD-", "")} sang trạng thái “${statusLabel[status]}”.`);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="sales-layout">
        <div className="lead-sidebar">
          <div className="skeleton" style={{ height: 280, borderRadius: 14 }} />
        </div>
        <div className="lead-detail">
          <div className="skeleton" style={{ height: 380, borderRadius: 14 }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-mark">!</div>
        <h2>Hàng đợi tạm gián đoạn</h2>
        <p>{error}</p>
        <button className="button button-primary" onClick={load}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="sales-layout">
      {/* Left Column: Lead Queue */}
      <aside className="lead-sidebar">
        <div className="cluster" style={{ justifyContent: "space-between", marginBottom: 12 }}>
          <h2 style={{ fontSize: "1.15rem", margin: 0 }}>Lead cần xử lý</h2>
          <span className="badge" style={{ fontSize: "0.72rem" }}>
            {leads.filter((l) => l.status === "new").length} mới
          </span>
        </div>

        <div className="lead-tabs">
          {(["all", "new", "contacted", "resolved"] as const).map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item === "all" ? "Tất cả" : statusLabel[item]}
            </button>
          ))}
        </div>

        <div className="lead-list">
          {visible.map((lead) => (
            <button
              key={lead.id}
              className={`lead-item ${selected?.id === lead.id ? "selected" : ""}`}
              onClick={() => setSelectedId(lead.id)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>#{lead.id.replace("LD-", "")} · {statusLabel[lead.status]}</strong>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: lead.status === "new" ? "var(--warning)" : lead.status === "contacted" ? "#3b82f6" : "#10b981",
                  }}
                />
              </div>
              <small>
                {lead.customerName} · {lead.purpose} · {lead.budgetLabel}
                <br />
                {lead.createdAt}
              </small>
            </button>
          ))}
          {visible.length === 0 && (
            <p className="microcopy" style={{ textAlign: "center", padding: "20px 0" }}>
              Không có lead ở trạng thái này.
            </p>
          )}
        </div>
      </aside>

      {/* Right Column: Lead Detail View */}
      {selected ? (
        <section className="lead-detail">
          <div className="lead-detail-head">
            <div>
              <span className="eyebrow" style={{ color: "var(--forest-2)" }}>
                Handoff từ AI Advisor · Lý do: user yêu cầu tư vấn viên
              </span>
              <h1 style={{ margin: "4px 0 6px", fontSize: "1.6rem" }}>
                Lead #{selected.id.replace("LD-", "")}
              </h1>
              <p className="muted" style={{ margin: 0, fontSize: "0.95rem" }}>
                Khách hàng: <strong>{selected.customerName}</strong> · SĐT: <strong>{selected.phone}</strong>
              </p>
            </div>
            <span
              className={`badge ${
                selected.status === "new"
                  ? "badge-warning"
                  : selected.status === "contacted"
                  ? "badge-neutral"
                  : ""
              }`}
              style={{ fontSize: "0.82rem", padding: "6px 12px" }}
            >
              {statusLabel[selected.status]}
            </span>
          </div>

          <div className="lead-detail-grid">
            <div className="lead-fact">
              <span>NGÂN SÁCH</span>
              <strong>{selected.budgetLabel}</strong>
            </div>
            <div className="lead-fact">
              <span>MỤC ĐÍCH</span>
              <strong>{selected.purpose}</strong>
            </div>
            <div className="lead-fact">
              <span>KM / NGÀY</span>
              <strong>{selected.dailyKm} km</strong>
            </div>
            <div className="lead-fact">
              <span>QUAN TÂM</span>
              <strong>
                {selected.interestedVehicleIds
                  .map((id) => vehicles.find((v) => v.id === id)?.name ?? id)
                  .join(" / ")}
              </strong>
            </div>
          </div>

          <div className="lead-summary">
            <h3>AI Summary</h3>
            <p>{selected.summary}</p>
          </div>

          <div className="lead-summary">
            <h3>Unresolved questions</h3>
            <ul>
              {selected.unresolvedQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>

          <div className="lead-actions" style={{ marginTop: 24 }}>
            <button
              className="button button-primary"
              disabled={updating || selected.status === "contacted"}
              onClick={() => void updateStatus("contacted")}
            >
              Tiếp nhận lead
            </button>
            <button
              className="button button-secondary"
              disabled={updating}
              onClick={() => {
                void updateStatus("contacted");
                showToast(`Đã lưu ghi chú cần follow-up thêm cho Lead #${selected.id.replace("LD-", "")}.`);
              }}
            >
              Đánh dấu follow-up
            </button>
            <button
              className="button button-secondary"
              disabled={updating || selected.status === "resolved"}
              onClick={() => void updateStatus("resolved")}
            >
              Resolved (Đã xử lý xong)
            </button>
          </div>
        </section>
      ) : (
        <section className="lead-detail">
          <div className="empty-state">
            <h2>Chọn một lead để xem chi tiết</h2>
          </div>
        </section>
      )}
    </div>
  );
}
