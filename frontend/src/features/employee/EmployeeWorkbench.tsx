"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearDemoHandoff, readDemoHandoff, type DemoHandoff } from "@/lib/demo-handoff";
import { formatVnd } from "@/lib/format";
import { demoRequests, type DemoRequestStatus } from "@/data/mock/employee-requests";
import { demoStatusLabel, getDemoLeads, getDemoRole, updateDemoLead, type DemoLead, type DemoLeadStatus, type DemoRole } from "@/lib/demo-workflows";

const statusLabels: Record<DemoRequestStatus, string> = {
  pending: "Chờ nhân viên",
  approved: "Đã duyệt (demo)",
  rejected: "Đã từ chối (demo)",
  confirmed: "Đã xác nhận (demo)",
  "needs-info": "Cần bổ sung (demo)",
};

export function EmployeeWorkbench() {
  const [selectedId, setSelectedId] = useState(demoRequests[0].id);
  const [handoff, setHandoff] = useState<DemoHandoff | null>(null);
  useEffect(() => setHandoff(readDemoHandoff()), []);
  const [leads, setLeads] = useState<DemoLead[]>([]);
  const [role, setRole] = useState<DemoRole | null>(null);
  const [roleLoaded, setRoleLoaded] = useState(false);
  useEffect(() => {
    const refresh = () => { setLeads(getDemoLeads()); setRole(getDemoRole()); setRoleLoaded(true); };
    refresh();
    window.addEventListener("xe-x-demo-change", refresh);
    return () => window.removeEventListener("xe-x-demo-change", refresh);
  }, []);
  const [statuses, setStatuses] = useState<Record<string, DemoRequestStatus>>({});
  const selected = demoRequests.find((request) => request.id === selectedId) ?? demoRequests[0];
  const selectedStatus = statuses[selected.id] ?? "pending";
  const pendingCount = demoRequests.filter((request) => (statuses[request.id] ?? "pending") === "pending").length;

  function updateStatus(status: DemoRequestStatus) {
    setStatuses((current) => ({ ...current, [selected.id]: status }));
  }
  function review(id: string, status: DemoLeadStatus) {
    updateDemoLead(id, status);
  }

  if (!roleLoaded) return <div className="container page compact-page" role="status">Đang mở màn hình nhân viên demo...</div>;
  if (role !== "staff") return (
    <div className="container page compact-page">
      <div className="panel stack">
        <h1>Hàng đợi nhân viên</h1>
        <p className="notice">Hàng đợi chỉ hiện sau khi chọn vai nhân viên demo. Đây chưa phải phân quyền thật; backend cần JWT và kiểm quyền theo cửa hàng.</p>
        <Link className="button button-primary" href="/staff/login">Vào vai nhân viên demo</Link>
      </div>
    </div>
  );

  return (
    <div className="container page compact-page">
      <div className="notice employee-demo-notice" role="status">
        Dữ liệu ở đây hoàn toàn giả. Vai trò demo chỉ ở trình duyệt, chưa có JWT/phân quyền cửa hàng/API; quyết định không gửi máy chủ.
      </div>
      {role === "staff" && handoff && (
        <section className="panel employee-handoff-preview" aria-labelledby="handoff-preview-title">
          <div className="employee-section-head">
            <div>
              <span className="eyebrow">Từ phiên tư vấn trên trình duyệt này</span>
              <h2 id="handoff-preview-title">Bản bàn giao demo</h2>
            </div>
            <button className="button button-ghost" type="button" onClick={() => { clearDemoHandoff(); setHandoff(null); }}>Xóa bản demo</button>
          </div>
          <dl className="employee-summary">
            <div><dt>Xe quan tâm</dt><dd>{handoff.vehicleName}</dd></div>
            <div><dt>Mục đích</dt><dd>{handoff.profile.purpose ?? "Chưa có"}</dd></div>
            <div><dt>Quãng đường</dt><dd>{handoff.profile.dailyKm ? `${handoff.profile.dailyKm} km/ngày` : "Chưa có"}</dd></div>
            <div><dt>Ngân sách tối đa</dt><dd>{handoff.profile.budgetMax ? formatVnd(handoff.profile.budgetMax) : "Chưa có"}</dd></div>
            <div><dt>Chỗ sạc</dt><dd>{handoff.profile.charging === "home" ? "Tại nhà" : handoff.profile.charging === "work" ? "Nơi làm việc" : handoff.profile.charging === "limited" ? "Khó sạc" : "Chưa có"}</dd></div>
            <div><dt>Bước tiếp theo</dt><dd>Nhân viên kiểm tra lại nhu cầu và xe demo trước khi tư vấn.</dd></div>
          </dl>
          <p className="microcopy">Chỉ là bản xem trước ẩn danh trong tab này. Chưa tạo lead, chưa gửi cho nhân viên và chưa lưu lên máy chủ.</p>
        </section>
      )}
      {role === "staff" && leads.length > 0 && (
        <section className="panel stack employee-handoff-preview" aria-labelledby="session-leads-title">
          <h2 id="session-leads-title">Yêu cầu tạo trong tab này ({leads.length})</h2>
          {leads.map((lead) => <article className="employee-session-lead" key={lead.id}>
            <div><strong>{lead.id} · {lead.vehicleName}</strong><p>{lead.kind === "installment" ? "Trả góp" : "Đặt cọc"} · {demoStatusLabel[lead.status]}</p><p>{lead.kind === "installment" ? "Trả trước" : "Số tiền cọc"}: {formatVnd(lead.amount)}{lead.storeName ? ` · ${lead.storeName}` : ""}</p></div>
            <div className="cluster">
              {lead.status === "pending_review" && (lead.kind === "installment" ? <>
                <button className="button button-primary" type="button" onClick={() => review(lead.id, "approved")}>Duyệt demo</button>
                <button className="button button-secondary" type="button" onClick={() => review(lead.id, "rejected")}>Từ chối demo</button>
              </> : <>
                <button className="button button-primary" type="button" onClick={() => review(lead.id, "confirmed")}>Xác nhận demo</button>
                <button className="button button-secondary" type="button" onClick={() => review(lead.id, "needs_info")}>Cần bổ sung</button>
              </>)}
            </div>
          </article>)}
        </section>
      )}
      <div className="employee-layout">
        <section className="panel employee-queue" aria-labelledby="employee-queue-title">
          <div className="employee-section-head">
            <div>
              <span className="eyebrow">Hàng đợi minh họa</span>
              <h1 id="employee-queue-title">Yêu cầu ({demoRequests.length})</h1>
            </div>
            <span className="badge">{pendingCount} chờ xử lý</span>
          </div>
          <div className="employee-request-list">
            {demoRequests.map((request) => {
              const status = statuses[request.id] ?? "pending";
              return (
                <button
                  aria-current={selected.id === request.id ? "true" : undefined}
                  className={`employee-request ${selected.id === request.id ? "employee-request--active" : ""}`}
                  key={request.id}
                  onClick={() => setSelectedId(request.id)}
                  type="button"
                >
                  <span className="employee-request-top">
                    <strong>{request.id}</strong>
                    <span className="employee-request-kind">{request.kind === "installment" ? "Trả góp" : "Đặt cọc"}</span>
                  </span>
                  <span className="employee-request-vehicle">{request.vehicle}</span>
                  <span className="microcopy">{statusLabels[status]}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel employee-detail" aria-labelledby="employee-detail-title">
          <div className="employee-section-head">
            <div>
              <span className="eyebrow">Tóm tắt bàn giao · {selected.id}</span>
              <h2 id="employee-detail-title">{selected.kind === "installment" ? "Yêu cầu trả góp" : "Yêu cầu đặt cọc"}</h2>
            </div>
            <span className="badge">{statusLabels[selectedStatus]}</span>
          </div>

          <dl className="employee-summary">
            <div><dt>Xe quan tâm</dt><dd>{selected.vehicle}</dd></div>
            <div><dt>Mục đích</dt><dd>{selected.purpose}</dd></div>
            <div><dt>Quãng đường</dt><dd>{selected.dailyKm}</dd></div>
            <div><dt>Ngân sách</dt><dd>{selected.budget}</dd></div>
            <div><dt>Chỗ sạc</dt><dd>{selected.charging}</dd></div>
            <div><dt>Bước đã làm</dt><dd>{selected.progress}</dd></div>
          </dl>

          <div className="employee-next-step">
            <strong>Bước tiếp theo</strong>
            <p>{selected.nextStep}</p>
          </div>

          <div className="employee-actions">
            <h3>Thử xử lý yêu cầu</h3>
            <p className="microcopy">Chỉ đổi trạng thái hiển thị trên máy này. Không duyệt tín dụng, thu cọc hoặc gửi thông báo cho khách.</p>
            {role === "staff" ? <div className="cluster">
              {selected.kind === "installment" ? (
                <>
                  <button className="button button-primary" onClick={() => updateStatus("approved")} type="button">Duyệt mô phỏng</button>
                  <button className="button button-secondary" onClick={() => updateStatus("rejected")} type="button">Từ chối mô phỏng</button>
                </>
              ) : (
                <>
                  <button className="button button-primary" onClick={() => updateStatus("confirmed")} type="button">Xác nhận mô phỏng</button>
                  <button className="button button-secondary" onClick={() => updateStatus("needs-info")} type="button">Cần bổ sung</button>
                </>
              )}
              {selectedStatus !== "pending" && (
                <button className="button button-ghost" onClick={() => updateStatus("pending")} type="button">Đặt lại demo</button>
              )}
            </div> : <Link className="button button-secondary" href="/staff/login">Vào vai nhân viên demo</Link>}
          </div>
        </section>
      </div>
    </div>
  );
}

