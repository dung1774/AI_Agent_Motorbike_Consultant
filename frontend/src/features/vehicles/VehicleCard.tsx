"use client";

import Link from "next/link";
import { formatVnd } from "@/lib/format";
import type { Vehicle } from "@/lib/types";
import { VehicleVisual } from "@/shared/ui/VehicleVisual";

export function VehicleCard({ vehicle, reason }: { vehicle: Vehicle; reason?: string }) {
  const hasSource = Boolean(vehicle.sourceLabel && vehicle.sourceUpdatedAt);
  return (
    <article className="vehicle-card">
      <div className="vehicle-card-visual"><VehicleVisual vehicle={vehicle} compact /></div>
      <div className="vehicle-card-body">
        <span className="eyebrow">{vehicle.variant}</span>
        <h3>{vehicle.name}</h3>
        <p>{reason ?? vehicle.tagline}</p>
        {hasSource ? (
          <>
            <strong className="vehicle-price">{formatVnd(vehicle.price)} <small>giá demo</small></strong>
            <div className="spec-row">
              <span><strong>{vehicle.rangeKm} km</strong><small>quãng đường demo</small></span>
              <span><strong>{vehicle.batteryKwh} kWh</strong><small>pin demo</small></span>
              <span><strong>{vehicle.chargeHours} giờ</strong><small>sạc demo</small></span>
            </div>
            <p className="source-line">{vehicle.sourceLabel} · Cập nhật {vehicle.sourceUpdatedAt}</p>
          </>
        ) : <p className="field-error">Thiếu nguồn; thông số chưa thể hiển thị.</p>}
        <Link className="button button-secondary" href={`/vehicles/${vehicle.id}`}>Xem chi tiết</Link>
      </div>
    </article>
  );
}
