"use client";

import { useMemo, useState } from "react";
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
  const [input, setInput] = useState(defaults);
  const result = useMemo(() => calculateOwnershipCost(input), [input]);
  const update = (key: keyof CostInputs, value: number) =>
    setInput((current) => ({ ...current, [key]: value }));
  const maxCost = Math.max(result.petrolMonthly, result.electricMonthly);

  return (
    <div className="calculator-layout">
      <section className="panel stack">
        <div>
          <span className="eyebrow">Thông tin di chuyển</span>
          <h2 style={{ marginBottom: 6 }}>Thói quen của bạn</h2>
          <p className="microcopy">
            Thay đổi quãng đường và ngày sử dụng để xem số liệu tự động tính toán.
          </p>
        </div>

        <div className="range-wrap">
          <div className="range-head">
            <span>Quãng đường mỗi ngày</span>
            <strong>{input.dailyKm} km</strong>
          </div>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={input.dailyKm}
            onChange={(e) => update("dailyKm", Number(e.target.value))}
          />
        </div>

        <div className="range-wrap">
          <div className="range-head">
            <span>Số ngày sử dụng / tháng</span>
            <strong>{input.daysPerMonth} ngày</strong>
          </div>
          <input
            type="range"
            min="10"
            max="31"
            value={input.daysPerMonth}
            onChange={(e) => update("daysPerMonth", Number(e.target.value))}
          />
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="electricity-price">Giá điện giả định (đ/kWh)</label>
            <input
              id="electricity-price"
              className="input"
              type="number"
              min="1000"
              value={input.electricityPrice}
              onChange={(e) => update("electricityPrice", Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label htmlFor="petrol-price">Giá xăng giả định (đ/lít)</label>
            <input
              id="petrol-price"
              className="input"
              type="number"
              min="10000"
              value={input.petrolPrice}
              onChange={(e) => update("petrolPrice", Number(e.target.value))}
            />
          </div>
        </div>

        <details>
          <summary className="button button-ghost" style={{ paddingLeft: 0 }}>
            ⚙ Tùy chỉnh mức tiêu hao kỹ thuật
          </summary>
          <div className="form-grid" style={{ marginTop: 12 }}>
            <div className="field">
              <label htmlFor="electric-use">Điện năng / 100 km (kWh)</label>
              <input
                id="electric-use"
                className="input"
                type="number"
                min="1"
                step="0.1"
                value={input.electricKwhPer100Km}
                onChange={(e) => update("electricKwhPer100Km", Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="petrol-use">Mức xăng / 100 km (Lít)</label>
              <input
                id="petrol-use"
                className="input"
                type="number"
                min="1"
                step="0.1"
                value={input.petrolLitresPer100Km}
                onChange={(e) => update("petrolLitresPer100Km", Number(e.target.value))}
              />
            </div>
          </div>
        </details>
      </section>

      <section className="panel">
        <div className="result-hero">
          <small>Chênh lệch chi phí năng lượng ước tính</small>
          <strong>
            {formatVnd(result.savingMonthly).replace("₫", "đ")}
            <small>/tháng</small>
          </strong>
          <span>Tương đương khoảng {formatVnd(result.savingYearly).replace("₫", "đ")} mỗi năm</span>
        </div>

        <div className="result-grid" style={{ marginTop: 16 }}>
          <div className="result-card">
            <span>Quãng đường / tháng</span>
            <strong>{formatNumber(result.monthlyKm)} km</strong>
          </div>
          <div className="result-card">
            <span>Tỷ lệ chi phí điện / xăng</span>
            <strong>
              {result.petrolMonthly > 0
                ? Math.round((result.electricMonthly / result.petrolMonthly) * 100)
                : 0}
              %
            </strong>
          </div>
        </div>

        <div className="bar-chart" aria-label="Biểu đồ so sánh chi phí">
          <div className="bar">
            <div
              className="bar-fill"
              style={{
                height: `${Math.max(8, (result.electricMonthly / (maxCost || 1)) * 100)}%`,
                background: "var(--forest)",
              }}
            />
            <span>
              Xe điện
              <br />
              <strong>{formatVnd(result.electricMonthly).replace("₫", "đ")}</strong>
            </span>
          </div>
          <div className="bar">
            <div
              className="bar-fill"
              style={{
                height: `${Math.max(8, (result.petrolMonthly / (maxCost || 1)) * 100)}%`,
                background: "#f07850",
              }}
            />
            <span>
              Xe xăng
              <br />
              <strong>{formatVnd(result.petrolMonthly).replace("₫", "đ")}</strong>
            </span>
          </div>
        </div>

        <p className="microcopy" style={{ marginTop: 14 }}>
          * Công thức tính toán được thực hiện trực tiếp bằng code: 
          Chi phí điện = (Km/100) × kWh/100km × Giá điện. Chi phí xăng = (Km/100) × Lít/100km × Giá xăng. 
          Số liệu mang tính chất ước tính năng lượng tiêu thụ, chưa bao gồm phí bảo dưỡng hoặc thuê pin.
        </p>
      </section>
    </div>
  );
}
