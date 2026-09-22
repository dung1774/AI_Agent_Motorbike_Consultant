"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatVnd } from "@/lib/format";
import type { Vehicle } from "@/lib/types";
import { VehicleVisual } from "@/shared/ui/VehicleVisual";
import { VehicleDetailModal } from "./VehicleDetailModal";

export function VehicleCard({ vehicle, reason }: { vehicle: Vehicle; reason?: string }) {
  const [open, setOpen] = useState(false);
  const { comparisonIds, toggleComparison, selectVehicle, showToast } = useApp();
  const selected = comparisonIds.includes(vehicle.id);

  const handleCompare = () => {
    if (!selected && comparisonIds.length >= 3) {
      showToast("Bạn có thể so sánh tối đa 3 xe.");
      return;
    }
    toggleComparison(vehicle.id);
    showToast(selected ? "Đã bỏ xe khỏi danh sách so sánh." : "Đã thêm xe vào danh sách so sánh.");
  };

  return (
    <article className="vehicle-card">
      <button
        className={`check-button ${selected ? "selected" : ""}`}
        onClick={handleCompare}
        aria-label={selected ? `Bỏ ${vehicle.name} khỏi so sánh` : `Thêm ${vehicle.name} vào so sánh`}
      >
        {selected ? "✓" : "+"}
      </button>

      <div className="vehicle-card-visual">
        <VehicleVisual accent={vehicle.accent} compact />
      </div>

      <div className="vehicle-card-body">
        <div className="vehicle-card-title">
          <div>
            <span className="eyebrow">{vehicle.variant}</span>
            <h3>{vehicle.name}</h3>
          </div>
          <span className="vehicle-price">{formatVnd(vehicle.price).replace("₫", "đ")}</span>
        </div>

        <p className="tagline">{reason ?? vehicle.tagline}</p>

        <div className="spec-row">
          <span>
            <strong>{vehicle.rangeKm} km</strong>
            <small>phạm vi</small>
          </span>
          <span>
            <strong>{vehicle.batteryKwh} kWh</strong>
            <small>pin</small>
          </span>
          <span>
            <strong>{vehicle.chargeHours} giờ</strong>
            <small>sạc</small>
          </span>
        </div>

        <div className="vehicle-card-actions">
          <button className="button button-secondary button-small" onClick={() => setOpen(true)}>
            Chi tiết
          </button>
          <Link
            className="button button-primary button-small"
            href="/deposit"
            onClick={() => selectVehicle(vehicle.id)}
          >
            Giữ xe
          </Link>
        </div>
      </div>

      {open && <VehicleDetailModal vehicle={vehicle} onClose={() => setOpen(false)} />}
    </article>
  );
}
