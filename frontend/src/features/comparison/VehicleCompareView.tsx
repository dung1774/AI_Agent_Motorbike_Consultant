"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { vehicles } from "@/data/mock/vehicles";
import { formatVnd } from "@/lib/format";

const electricityPrice = 3000;

export function VehicleCompareView() {
  const [selectedIds, setSelectedIds] = useState<string[]>(vehicles.slice(0, 2).map((vehicle) => vehicle.id));
  const selected = useMemo(() => selectedIds.map((id) => vehicles.find((vehicle) => vehicle.id === id)).filter((vehicle) => vehicle !== undefined), [selectedIds]);

  function toggle(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  }

  return (
    <div className="container page compact-page">
      <div className="panel stack">
        <h1>So sánh mẫu xe</h1>
        <p className="notice">Tất cả xe và thông số bên dưới là minh họa. Chi phí điện/km ước tính = dung lượng pin ÷ quãng đường demo × 3.000 VND/kWh; chưa gồm hao hụt sạc, giá mua và phí khác.</p>
        <fieldset className="compare-options">
          <legend>Chọn 2–3 mẫu xe</legend>
          {vehicles.map((vehicle) => (
            <label key={vehicle.id}>
              <input type="checkbox" checked={selectedIds.includes(vehicle.id)} disabled={!selectedIds.includes(vehicle.id) && selectedIds.length >= 3} onChange={() => toggle(vehicle.id)} />
              <span>{vehicle.name} · {vehicle.variant}</span>
            </label>
          ))}
        </fieldset>
        {selected.length < 2 ? <p role="status">Chọn thêm một mẫu để so sánh.</p> : (
          <div className="compare-scroll">
            <table className="compare-table">
              <caption>So sánh theo cùng tiêu chí và giả định demo</caption>
              <thead><tr><th scope="col">Tiêu chí</th>{selected.map((vehicle) => <th scope="col" key={vehicle.id}>{vehicle.name}<small>{vehicle.variant}</small></th>)}</tr></thead>
              <tbody>
                <tr><th scope="row">Giá demo</th>{selected.map((vehicle) => <td key={vehicle.id}>{formatVnd(vehicle.price)}</td>)}</tr>
                <tr><th scope="row">Pin demo</th>{selected.map((vehicle) => <td key={vehicle.id}>{vehicle.batteryKwh} kWh</td>)}</tr>
                <tr><th scope="row">Sạc demo</th>{selected.map((vehicle) => <td key={vehicle.id}>{vehicle.chargeHours} giờ</td>)}</tr>
                <tr><th scope="row">Quãng đường demo</th>{selected.map((vehicle) => <td key={vehicle.id}>{vehicle.rangeKm} km</td>)}</tr>
                <tr><th scope="row">Điện/km ước tính</th>{selected.map((vehicle) => <td key={vehicle.id}>{formatVnd(vehicle.batteryKwh / vehicle.rangeKm * electricityPrice)}</td>)}</tr>
                <tr><th scope="row">Nguồn</th>{selected.map((vehicle) => <td key={vehicle.id}>{vehicle.sourceLabel} · {vehicle.sourceUpdatedAt}</td>)}</tr>
              </tbody>
            </table>
          </div>
        )}
        <p className="microcopy">Quãng đường thực tế thay đổi theo tải, tốc độ, địa hình và điều kiện sạc. Xem nguồn xe thật trước khi quyết định.</p>
        <div className="cluster"><Link className="button button-secondary" href="/vehicles">Về mẫu xe</Link><Link className="button button-primary" href="/installment">Ước tính trả góp</Link></div>
      </div>
    </div>
  );
}
