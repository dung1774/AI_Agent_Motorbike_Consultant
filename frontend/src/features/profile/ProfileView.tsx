"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { vehicles } from "@/data/mock/vehicles";
import { formatVnd } from "@/lib/format";

export function ProfileView() {
  const { user, logout } = useAuth();
  const { comparisonIds, clearComparison } = useApp();

  const comparedVehicles = comparisonIds
    .map((id) => vehicles.find((v) => v.id === id))
    .filter(Boolean);

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 900 }}>
        <header className="page-title">
          <span className="eyebrow">Tài khoản khách hàng</span>
          <h1>Hồ sơ & Lịch sử tư vấn</h1>
          <p>Quản lý thông tin cá nhân, các mẫu xe đang so sánh và tiến trình trao đổi cùng trợ lý Xe X.</p>
        </header>

        <div className="calculator-layout profile-page-layout">
          {/* User Details Card */}
          <section className="panel stack" style={{ height: "fit-content" }}>
            <div style={{ textAlign: "center", paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto 12px",
                  borderRadius: "50%",
                  background: "var(--lime)",
                  color: "var(--forest)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "1.6rem",
                  fontWeight: 800,
                }}
              >
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <h2 style={{ fontSize: "1.25rem", margin: "4px 0" }}>{user?.name}</h2>
              <span className="badge">{user?.role === "user" ? "Khách hàng" : user?.role}</span>
            </div>

            <div className="profile-list">
              <div className="profile-item">
                <span>Email</span>
                <strong>{user?.email}</strong>
              </div>
              <div className="profile-item">
                <span>Số điện thoại</span>
                <strong>{user?.phone ?? "0912 345 678"}</strong>
              </div>
              <div className="profile-item">
                <span>Trạng thái</span>
                <strong style={{ color: "var(--forest-2)" }}>● Phiên demo đang hoạt động</strong>
              </div>
            </div>

            <button
              className="button button-secondary button-block"
              style={{ marginTop: 8, color: "var(--danger)" }}
              onClick={() => void logout()}
            >
              Đăng xuất tài khoản
            </button>
          </section>

          {/* Activity and History Cards */}
          <div className="stack" style={{ gap: 20 }}>
            {/* Recent Comparison */}
            <section className="panel">
              <div className="cluster" style={{ justifyContent: "space-between", marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Mẫu xe đang lưu so sánh ({comparedVehicles.length}/3)</h3>
                {comparedVehicles.length > 0 && (
                  <button className="button button-ghost button-small" onClick={clearComparison}>
                    Xóa danh sách
                  </button>
                )}
              </div>

              {comparedVehicles.length === 0 ? (
                <p className="microcopy">Bạn chưa lưu mẫu xe nào vào danh sách so sánh.</p>
              ) : (
                <div className="stack" style={{ gap: 10 }}>
                  {comparedVehicles.map((v) => (
                    v && (
                      <div
                        key={v.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 14px",
                          borderRadius: 12,
                          background: "var(--surface-2)",
                          border: "1px solid var(--line)",
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: "0.92rem" }}>{v.name}</strong>
                          <small style={{ display: "block", color: "var(--ink-soft)" }}>
                            {v.variant} · {v.rangeKm} km · {formatVnd(v.price).replace("₫", "đ")}
                          </small>
                        </div>
                        <Link href="/compare" className="button button-secondary button-small">
                          Xem bảng so sánh →
                        </Link>
                      </div>
                    )
                  ))}
                </div>
              )}
            </section>

            {/* Mock Consultation History */}
            <section className="panel">
              <h3 style={{ margin: "0 0 4px", fontSize: "1.1rem" }}>Lịch sử tư vấn minh họa</h3>
              <p className="microcopy" style={{ margin: "0 0 12px" }}>Các mục dưới đây là fixture giao diện, chưa được lưu từ backend.</p>
              <div className="stack" style={{ gap: 12 }}>
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "white",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div className="cluster" style={{ justifyContent: "space-between", marginBottom: 6 }}>
                    <span className="eyebrow" style={{ fontSize: "0.7rem" }}>Phiên tư vấn #1480</span>
                    <span className="microcopy">Hôm nay</span>
                  </div>
                  <strong style={{ fontSize: "0.9rem", display: "block" }}>
                    Nhu cầu: Đi làm 30 km/ngày · Ngân sách 20–30 triệu
                  </strong>
                  <p className="microcopy" style={{ margin: "4px 0 10px" }}>
                    Agent đề xuất: <strong>Xe X City</strong> (Độ phù hợp 92%). Đã chuyển tóm tắt cho tư vấn viên showroom.
                  </p>
                  <Link href="/advisor" className="button button-ghost button-small" style={{ paddingLeft: 0 }}>
                    Tiếp tục cuộc trò chuyện →
                  </Link>
                </div>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "white",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div className="cluster" style={{ justifyContent: "space-between", marginBottom: 6 }}>
                    <span className="eyebrow" style={{ fontSize: "0.7rem" }}>Yêu cầu giữ xe #DX-2026-1024</span>
                    <span className="badge" style={{ fontSize: "0.68rem" }}>Đã tiếp nhận</span>
                  </div>
                  <strong style={{ fontSize: "0.9rem", display: "block" }}>
                    Xe X City (Plus) tại Showroom Ba Đình
                  </strong>
                  <p className="microcopy" style={{ margin: "4px 0 0" }}>
                    Tư vấn viên showroom sẽ liên hệ qua số điện thoại để sắp xếp lịch xem xe trực tiếp.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
