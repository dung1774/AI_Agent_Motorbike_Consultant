"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { demoStores } from "@/data/mock/stores";
import { vehicles } from "@/data/mock/vehicles";
import { createDemoLead, getDemoRole, type DemoLead, type DemoRole } from "@/lib/demo-workflows";
import { formatVnd } from "@/lib/format";
import { VehicleVisual } from "@/shared/ui/VehicleVisual";

export function DepositView({ initialVehicleId = vehicles[0].id }: { initialVehicleId?: string }) {
  const [vehicleId, setVehicleId] = useState(initialVehicleId);
  const [storeId, setStoreId] = useState(demoStores[0].id);
  const [amount, setAmount] = useState(1_000_000);
  const [role, setRole] = useState<DemoRole | null>(null);
  const [created, setCreated] = useState<DemoLead | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { setRole(getDemoRole()); }, []);
  const vehicle = vehicles.find((item) => item.id === vehicleId) ?? vehicles[0];
  const store = demoStores.find((item) => item.id === storeId) ?? demoStores[0];
  const valid = Number.isInteger(amount) && amount > 0 && amount <= vehicle.price;

  function submit() {
    if (!valid || role !== "customer" || created) return;
    try {
      setCreated(createDemoLead({ kind: "deposit", vehicleId: vehicle.id, vehicleName: vehicle.name, storeName: store.name, amount }));
      setError("");
    } catch {
      setError("Không thể lưu yêu cầu demo trong phiên trình duyệt này.");
    }
  }

  return (
    <div className="container order-demo-page">
      <div className="order-demo-layout">
        <nav className="order-model-rail" aria-label="Chọn mẫu xe">
          {vehicles.map((item) => <button key={item.id} className={item.id === vehicleId ? "order-model-active" : ""} type="button" aria-pressed={item.id === vehicleId} onClick={() => { setVehicleId(item.id); setCreated(null); }}><VehicleVisual vehicle={item} compact /><span>{item.name.replace("Xe X ", "")}</span></button>)}
        </nav>
        <section className="order-demo-product" aria-labelledby="order-vehicle-title">
          <span className="order-product-watermark" aria-hidden="true">{vehicle.name.replace("Xe X ", "").toUpperCase()}</span>
          <div className="order-demo-image"><VehicleVisual vehicle={vehicle} /><span>Hình xe minh họa</span></div>
          <div className="order-demo-specs"><h2 id="order-vehicle-title">{vehicle.name}</h2><p>{vehicle.variant} · Giá demo {formatVnd(vehicle.price)}</p><div><span><strong>{vehicle.rangeKm} km</strong>Quãng đường demo</span><span><strong>{vehicle.batteryKwh} kWh</strong>Pin demo</span><span><strong>{vehicle.chargeHours} giờ</strong>Sạc demo</span></div></div>
        </section>
        <section className="order-demo-form" aria-labelledby="order-form-title">
          <ol className="order-steps" aria-label="Các bước yêu cầu cọc demo"><li aria-current="step">Lựa chọn xe</li><li>Nhập yêu cầu</li><li>Chờ nhân viên</li></ol>
          <span className="eyebrow">Yêu cầu mua xe · bản demo</span>
          <h1 id="order-form-title">Yêu cầu đặt cọc</h1>
          <p className="notice">Không thanh toán hoặc chuyển tiền tại đây. Giá, tiền cọc và điểm tiếp nhận đều là dữ liệu demo.</p>
          <div className="field"><label htmlFor="deposit-vehicle">Mẫu xe đang chọn</label><select id="deposit-vehicle" className="input" value={vehicleId} onChange={(event) => { setVehicleId(event.target.value); setCreated(null); }}>{vehicles.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.variant}</option>)}</select></div>
          <div className="field"><label htmlFor="deposit-store">Điểm tiếp nhận demo</label><select id="deposit-store" className="input" value={storeId} onChange={(event) => { setStoreId(event.target.value); setCreated(null); }}>{demoStores.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
          <div className="field"><label htmlFor="deposit-amount">Số tiền cọc mô phỏng (VND)</label><input id="deposit-amount" className="input" type="number" min="1" max={vehicle.price} value={amount} onChange={(event) => { setAmount(Number(event.target.value)); setCreated(null); }} /></div>
          <dl className="purchase-summary"><div><dt>Giá xe demo</dt><dd>{formatVnd(vehicle.price)}</dd></div><div><dt>Cọc giả định</dt><dd>{valid ? formatVnd(amount) : "Kiểm tra số tiền"}</dd></div><div><dt>Điểm demo</dt><dd>{store.name}</dd></div></dl>
          {!valid && <p className="field-error" role="alert">Số tiền phải là số nguyên dương và không vượt giá xe demo.</p>}
          {role === "customer" ? <button className="button button-primary order-submit" type="button" disabled={!valid || Boolean(created)} onClick={submit}>Tạo yêu cầu cọc demo</button> : <Link className="button button-secondary order-submit" href="/login">Vào vai khách demo để tiếp tục</Link>}
          {created && <p className="notice" role="status">{created.id} · Yêu cầu đang chờ nhân viên, chưa thu tiền. <Link href="/history">Xem trạng thái</Link></p>}
          {error && <p className="field-error" role="alert">{error}</p>}
          <p className="microcopy">Điểm demo không phải showroom thật. Yêu cầu chỉ lưu trong tab này.</p>
        </section>
      </div>
    </div>
  );
}
