"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { vehicles } from "@/data/mock/vehicles";
import { createDemoLead, getDemoRole, type DemoLead, type DemoRole } from "@/lib/demo-workflows";
import { formatVnd } from "@/lib/format";

export function InstallmentView({ initialVehicleId = vehicles[0].id }: { initialVehicleId?: string }) {
  const initialVehicle = vehicles.find((item) => item.id === initialVehicleId) ?? vehicles[0];
  const [vehicleId, setVehicleId] = useState(initialVehicle.id);
  const [downPayment, setDownPayment] = useState(Math.round(initialVehicle.price * 0.3));
  const [months, setMonths] = useState(24);
  const [annualRate, setAnnualRate] = useState(0);
  const [role, setRole] = useState<DemoRole | null>(null);
  const [created, setCreated] = useState<DemoLead | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { setRole(getDemoRole()); }, []);

  const vehicle = vehicles.find((item) => item.id === vehicleId) ?? vehicles[0];
  const valid = Number.isFinite(downPayment) && downPayment >= 0 && downPayment < vehicle.price &&
    Number.isInteger(months) && months >= 6 && months <= 60 &&
    Number.isFinite(annualRate) && annualRate >= 0 && annualRate <= 40;
  const estimate = useMemo(() => {
    if (!valid) return null;
    const principal = vehicle.price - downPayment;
    const rate = annualRate / 1200;
    const monthly = rate === 0 ? principal / months : principal * rate / (1 - Math.pow(1 + rate, -months));
    return { principal, monthly, total: downPayment + monthly * months };
  }, [annualRate, downPayment, months, valid, vehicle.price]);

  function changeVehicle(id: string) {
    const next = vehicles.find((item) => item.id === id);
    if (!next) return;
    setVehicleId(id);
    setDownPayment(Math.round(next.price * 0.3));
    setCreated(null);
  }

  function submit() {
    if (!estimate || role !== "customer" || created) return;
    try {
      const lead = createDemoLead({
        kind: "installment", vehicleId: vehicle.id, vehicleName: vehicle.name,
        amount: downPayment, months, monthlyEstimate: estimate.monthly,
      });
      setCreated(lead);
      setError("");
    } catch {
      setError("Không thể lưu yêu cầu demo trong phiên trình duyệt này.");
    }
  }

  return (
    <div className="container page compact-page">
      <div className="calculator-layout">
        <section className="panel stack">
          <h1>Ước tính trả góp</h1>
          <p className="notice">Phương án hoàn toàn minh họa. Lãi suất là giả định do bạn nhập; chưa gồm phí, bảo hiểm hay điều kiện duyệt. Không phải đề nghị tín dụng.</p>
          <div className="field"><label htmlFor="installment-vehicle">Mẫu xe demo</label><select id="installment-vehicle" className="input" value={vehicleId} onChange={(event) => changeVehicle(event.target.value)}>{vehicles.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.variant}</option>)}</select></div>
          <p>Giá demo: <strong>{formatVnd(vehicle.price)}</strong></p>
          <div className="field"><label htmlFor="down-payment">Trả trước (VND)</label><input id="down-payment" className="input" type="number" min="0" max={vehicle.price - 1} value={downPayment} onChange={(event) => { setDownPayment(Number(event.target.value)); setCreated(null); }} /></div>
          <div className="field"><label htmlFor="months">Kỳ hạn (tháng, 6–60)</label><input id="months" className="input" type="number" min="6" max="60" value={months} onChange={(event) => { setMonths(Number(event.target.value)); setCreated(null); }} /></div>
          <div className="field"><label htmlFor="annual-rate">Lãi suất giả định (%/năm, 0–40)</label><input id="annual-rate" className="input" type="number" min="0" max="40" step="0.1" value={annualRate} onChange={(event) => { setAnnualRate(Number(event.target.value)); setCreated(null); }} /></div>
          {!valid && <p className="field-error" role="alert">Trả trước phải thấp hơn giá xe; kỳ hạn 6–60 tháng, lãi suất 0–40%.</p>}
        </section>
        <section className="panel stack" aria-live="polite">
          <h2>Kết quả ước tính</h2>
          {estimate ? <>
            <dl className="employee-summary">
              <div><dt>Số tiền còn lại</dt><dd>{formatVnd(estimate.principal)}</dd></div>
              <div><dt>Góp mỗi tháng</dt><dd>{formatVnd(estimate.monthly)}</dd></div>
              <div><dt>Tổng trả gồm trả trước</dt><dd>{formatVnd(estimate.total)}</dd></div>
              <div><dt>Giả định</dt><dd>{months} tháng · {annualRate}%/năm</dd></div>
            </dl>
            <p className="microcopy">Tính theo dư nợ giảm dần, khoản góp đều; khi lãi suất 0% thì chia đều gốc. Giá và lãi suất chỉ là dữ liệu demo.</p>
            {role === "customer" ? <button className="button button-primary" type="button" disabled={Boolean(created)} onClick={submit}>Tạo yêu cầu chờ duyệt (demo)</button> : <Link className="button button-secondary" href="/login">Vào vai khách demo để tạo yêu cầu</Link>}
            {created && <div className="notice" role="status"><strong>{created.id}</strong> · Chờ nhân viên (demo). <Link href="/history">Xem trạng thái</Link></div>}
            {error && <p className="field-error" role="alert">{error}</p>}
          </> : <p>Nhập giá trị hợp lệ để xem kết quả.</p>}
        </section>
      </div>
    </div>
  );
}
