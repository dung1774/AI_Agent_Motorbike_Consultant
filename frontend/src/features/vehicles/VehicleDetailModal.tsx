"use client";

import Link from "next/link";
import { formatVnd } from "@/lib/format";
import type { Vehicle } from "@/lib/types";
import { VehicleVisual } from "@/shared/ui/VehicleVisual";
import { useApp } from "@/context/AppContext";

interface VehicleDetailModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export function VehicleDetailModal({ vehicle, onClose }: VehicleDetailModalProps) {
  const { selectVehicle } = useApp();

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-shell" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">{vehicle.variant}</span>
            <h2 id="modal-title" style={{ margin: "2px 0 0" }}>{vehicle.name}</h2>
          </div>
          <button className="button button-ghost button-small" onClick={onClose} aria-label="Đóng">✕</button>
        </div>

        <div className="modal-body">
          <VehicleVisual accent={vehicle.accent} />

          <div className="spec-grid" style={{ margin: "16px 0" }}>
            <div className="spec-card">
              <span>Giá tham khảo</span>
              <strong>{formatVnd(vehicle.price).replace("₫", "đ")}</strong>
            </div>
            <div className="spec-card">
              <span>Quãng đường</span>
              <strong>{vehicle.rangeKm} km</strong>
            </div>
            <div className="spec-card">
              <span>Dung lượng pin</span>
              <strong>{vehicle.batteryKwh} kWh</strong>
            </div>
            <div className="spec-card">
              <span>Thời gian sạc</span>
              <strong>{vehicle.chargeHours} giờ</strong>
            </div>
            <div className="spec-card">
              <span>Công suất</span>
              <strong>{vehicle.powerKw} kW</strong>
            </div>
            <div className="spec-card">
              <span>Tốc độ tối đa</span>
              <strong>{vehicle.topSpeedKmh} km/h</strong>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <strong style={{ fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Màu sắc có sẵn:</strong>
            <div className="cluster" style={{ gap: 6 }}>
              {vehicle.colors.map((color) => (
                <span key={color} className="pill" style={{ fontSize: "0.76rem" }}>
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <strong style={{ fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Đặc điểm nổi bật:</strong>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: "0.82rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>
              {vehicle.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ background: "var(--surface-2)", padding: "10px 12px", borderRadius: 10, fontSize: "0.75rem", color: "var(--ink-soft)" }}>
            ℹ Nguồn dữ liệu: {vehicle.sourceLabel} · Cập nhật ngày {vehicle.sourceUpdatedAt}
          </div>
        </div>

        <div className="modal-footer cluster" style={{ justifyContent: "flex-end", gap: 10 }}>
          <button className="button button-secondary button-small" onClick={onClose}>
            Đóng
          </button>
          <Link
            href="/deposit"
            className="button button-primary button-small"
            onClick={() => {
              selectVehicle(vehicle.id);
              onClose();
            }}
          >
            Giữ xe mẫu này →
          </Link>
        </div>
      </div>
    </div>
  );
}
