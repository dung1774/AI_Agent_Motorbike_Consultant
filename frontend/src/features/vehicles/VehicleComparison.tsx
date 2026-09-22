"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { vehicles } from "@/data/mock/vehicles";
import { formatVnd } from "@/lib/format";

const rows = [
  { label: "Giá tham khảo", value: (id: string) => formatVnd(vehicles.find((item) => item.id === id)!.price).replace("₫", "đ") },
  { label: "Phạm vi công bố", value: (id: string) => `${vehicles.find((item) => item.id === id)!.rangeKm} km` },
  { label: "Dung lượng pin", value: (id: string) => `${vehicles.find((item) => item.id === id)!.batteryKwh} kWh` },
  { label: "Thời gian sạc", value: (id: string) => `${vehicles.find((item) => item.id === id)!.chargeHours} giờ` },
  { label: "Công suất", value: (id: string) => `${vehicles.find((item) => item.id === id)!.powerKw} kW` },
  { label: "Tốc độ tối đa", value: (id: string) => `${vehicles.find((item) => item.id === id)!.topSpeedKmh} km/h` },
  { label: "Phù hợp nhu cầu", value: (id: string) => vehicles.find((item) => item.id === id)!.bestFor.join(" · ") },
  { label: "Điểm nổi bật", value: (id: string) => vehicles.find((item) => item.id === id)!.highlights.join("; ") },
];

export function VehicleComparison() {
  const { comparisonIds, toggleComparison, clearComparison, selectVehicle } = useApp();
  const selected = comparisonIds.map((id) => vehicles.find((item) => item.id === id)).filter(Boolean);

  return (
    <>
      <section className="panel" style={{ marginBottom: 20 }}>
        <div className="section-head" style={{ margin: 0 }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", marginTop: 0 }}>Chọn tối đa 3 mẫu để đối chiếu</h2>
            <p>Trên màn hình di động, bảng tự động cuộn ngang mượt mà.</p>
          </div>
          {comparisonIds.length > 0 && (
            <button className="button button-ghost button-small" onClick={clearComparison}>
              Bỏ chọn tất cả
            </button>
          )}
        </div>
        <div className="filter-bar" style={{ margin: "18px 0 0" }}>
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              className={comparisonIds.includes(vehicle.id) ? "active" : ""}
              onClick={() => toggleComparison(vehicle.id)}
              disabled={!comparisonIds.includes(vehicle.id) && comparisonIds.length >= 3}
            >
              {comparisonIds.includes(vehicle.id) ? "✓ " : "+ "}
              {vehicle.name}
            </button>
          ))}
        </div>
      </section>

      {selected.length < 2 ? (
        <div className="empty-state">
          <div className="empty-state-mark">⇄</div>
          <h2>Chọn ít nhất hai mẫu xe</h2>
          <p>Chọn các nút phía trên hoặc quay lại catalog để thêm mẫu bạn quan tâm.</p>
          <Link className="button button-primary" href="/vehicles">
            Mở catalog xe →
          </Link>
        </div>
      ) : (
        <>
          <div className="comparison-shell">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Tiêu chí</th>
                  {selected.map(
                    (vehicle) =>
                      vehicle && (
                        <th key={vehicle.id}>
                          <div className="comparison-head">
                            <strong>{vehicle.name}</strong>
                            <small>{vehicle.variant}</small>
                          </div>
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {selected.map(
                      (vehicle) =>
                        vehicle && <td key={vehicle.id}>{row.value(vehicle.id)}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="microcopy" style={{ marginTop: 12 }}>
            * Thông số lấy từ catalog demo minh họa, chưa phải dữ liệu hãng đã xác minh. Phạm vi thực tế còn phụ thuộc tải trọng, địa hình và điều kiện giao thông.
          </p>

          <div className="cluster" style={{ marginTop: 18 }}>
            {selected.map(
              (vehicle) =>
                vehicle && (
                  <Link
                    href="/deposit"
                    className="button button-lime button-small"
                    key={vehicle.id}
                    onClick={() => selectVehicle(vehicle.id)}
                  >
                    Giữ xe {vehicle.name} →
                  </Link>
                )
            )}
          </div>
        </>
      )}
    </>
  );
}
