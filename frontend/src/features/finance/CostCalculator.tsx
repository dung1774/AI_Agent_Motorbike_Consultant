"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateOwnershipCost } from "@/lib/calculators";
import { formatNumber, formatVnd } from "@/lib/format";
import type { CostInputs } from "@/lib/types";

const defaults: CostInputs = {
  dailyKm: 30,
  daysPerMonth: 26,
  electricityPrice: 3000,
  petrolPrice: 24000,
  petrolLitresPer100Km: 2.2,
  electricKwhPer100Km: 3.2,
};

export function CostCalculator() {
  const [input, setInput] = useState<CostInputs>(defaults);

  useEffect(() => {
    const fromConsultation = Number(new URLSearchParams(window.location.search).get("dailyKm"));
    if (Number.isFinite(fromConsultation) && fromConsultation > 0) {
      setInput((current) => ({ ...current, dailyKm: fromConsultation }));
    }
  }, []);

  const update = (key: keyof CostInputs, value: number) =>
    setInput((current) => ({ ...current, [key]: value }));

  const valid = Object.values(input).every((value) => Number.isFinite(value) && value > 0) &&
    input.daysPerMonth <= 31;
  const result = useMemo(() => valid ? calculateOwnershipCost(input) : null, [input, valid]);

  return (
    <div className="cost-page">
      <header className="cost-page-head"><h1>Công cụ tính chi phí sử dụng</h1><p>Điều chỉnh hành trình và giá năng lượng giả định để so sánh xe điện với xe xăng.</p></header>
      <div className="calculator-layout cost-calculator">
      <section className="cost-form stack">
        <h2>Hành trình và giả định</h2>
        <p className="microcopy">Giá và mức tiêu hao dưới đây chỉ là giả định demo; bạn có thể thay đổi. Kết quả không gồm giá mua, bảo dưỡng hoặc phí khác.</p>
        <div className="form-grid">
          <div className="field"><label htmlFor="daily-km">Km mỗi ngày</label><input className="input" id="daily-km" type="number" min="1" value={input.dailyKm || ""} onChange={(event) => update("dailyKm", Number(event.target.value))} /></div>
          <div className="field"><label htmlFor="days">Ngày sử dụng mỗi tháng</label><input className="input" id="days" type="number" min="1" max="31" value={input.daysPerMonth || ""} onChange={(event) => update("daysPerMonth", Number(event.target.value))} /></div>
          <div className="field"><label htmlFor="electricity">Giá điện giả định (VND/kWh)</label><input className="input" id="electricity" type="number" min="1" value={input.electricityPrice || ""} onChange={(event) => update("electricityPrice", Number(event.target.value))} /></div>
          <div className="field"><label htmlFor="petrol">Giá xăng giả định (VND/lít)</label><input className="input" id="petrol" type="number" min="1" value={input.petrolPrice || ""} onChange={(event) => update("petrolPrice", Number(event.target.value))} /></div>
          <div className="field"><label htmlFor="electric-use">Điện năng giả định (kWh/100 km)</label><input className="input" id="electric-use" type="number" min="0.1" step="0.1" value={input.electricKwhPer100Km || ""} onChange={(event) => update("electricKwhPer100Km", Number(event.target.value))} /></div>
          <div className="field"><label htmlFor="petrol-use">Mức xăng giả định (lít/100 km)</label><input className="input" id="petrol-use" type="number" min="0.1" step="0.1" value={input.petrolLitresPer100Km || ""} onChange={(event) => update("petrolLitresPer100Km", Number(event.target.value))} /></div>
        </div>
        {!valid && <p className="field-error" role="alert">Các giá trị phải lớn hơn 0; số ngày trong tháng không quá 31.</p>}
      </section>

      <section className="cost-results stack" aria-live="polite">
        <h2>Kết quả so sánh</h2>
        {result ? (
          <>
            <div className="result-hero">
              <small>{result.differenceMonthly >= 0 ? "Xe điện thấp hơn xe xăng" : "Xe điện cao hơn xe xăng"} theo giả định · {formatNumber(result.monthlyKm)} km/tháng</small>
              <strong>{formatVnd(Math.abs(result.differenceMonthly))} / tháng</strong>
            </div>
            <div className="result-grid">
              <div className="result-card"><span>Xe điện / km</span><strong>{formatVnd(result.electricPerKm)}</strong></div>
              <div className="result-card"><span>Xe xăng / km</span><strong>{formatVnd(result.petrolPerKm)}</strong></div>
              <div className="result-card"><span>Xe điện / tháng</span><strong>{formatVnd(result.electricMonthly)}</strong></div>
              <div className="result-card"><span>Xe xăng / tháng</span><strong>{formatVnd(result.petrolMonthly)}</strong></div>
            </div>
            <p className="microcopy">Kết quả chỉ phản ánh giả định bạn nhập, có thể khác thực tế. Chưa gồm giá mua, bảo dưỡng hoặc phí khác.</p>
          </>
        ) : <p>Điền các giả định hợp lệ để xem kết quả.</p>}
      </section>
      </div>
    </div>
  );
}
