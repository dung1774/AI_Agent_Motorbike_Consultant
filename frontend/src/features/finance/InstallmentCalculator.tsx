"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { vehicles } from "@/data/mock/vehicles";
import { calculateInstallment } from "@/lib/calculators";
import { formatVnd } from "@/lib/format";
import { mockLeadService } from "@/services/mock-services";

export function InstallmentCalculator() {
  const { selectedVehicleId, selectVehicle, showToast } = useApp();
  const { user } = useAuth();
  const vehicle = vehicles.find((item) => item.id === selectedVehicleId) ?? vehicles[1];
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [termMonths, setTermMonths] = useState(24);
  const [annualInterestPercent, setAnnualInterestPercent] = useState(9.5);
  const [submitting, setSubmitting] = useState(false);

  const result = useMemo(
    () =>
      calculateInstallment({
        vehiclePrice: vehicle.price,
        downPaymentPercent,
        termMonths,
        annualInterestPercent,
      }),
    [annualInterestPercent, downPaymentPercent, termMonths, vehicle.price]
  );

  const requestSupport = async () => {
    setSubmitting(true);
    try {
      const lead = (await mockLeadService.createLead({
        customerName: user?.name ?? "Khách hàng demo",
        phone: user?.phone ?? "Chưa cung cấp",
        purpose: vehicle.bestFor[0] ?? "Đi phố",
        budgetLabel: `${Math.ceil(vehicle.price / 1000000)} triệu`,
        dailyKm: 0,
        interestedVehicleIds: [vehicle.id],
        summary: `Khách cần nhân viên xác nhận phương án trả góp demo cho ${vehicle.name}.`,
        unresolvedQuestions: [
          `Xác nhận mức trả trước ${downPaymentPercent}% và kỳ hạn ${termMonths} tháng`,
          "Kiểm tra lãi suất và điều kiện hồ sơ thực tế",
        ],
      })).data;
      showToast(`Đã tạo yêu cầu #${lead.id.replace("LD-", "")} trong hàng đợi nhân viên.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="calculator-layout">
      <section className="panel stack">
        <div className="field">
          <label htmlFor="installment-vehicle">Chọn mẫu xe dự kiến</label>
          <select
            id="installment-vehicle"
            className="select"
            value={vehicle.id}
            onChange={(e) => selectVehicle(e.target.value)}
          >
            {vehicles.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name} ({item.variant}) — {formatVnd(item.price).replace("₫", "đ")}
              </option>
            ))}
          </select>
        </div>

        <div className="range-wrap">
          <div className="range-head">
            <span>Tỷ lệ trả trước</span>
            <strong>
              {downPaymentPercent}% · {formatVnd(result.downPayment).replace("₫", "đ")}
            </strong>
          </div>
          <input
            type="range"
            min="20"
            max="70"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label htmlFor="term">Thời hạn vay</label>
          <select
            id="term"
            className="select"
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
          >
            {[12, 18, 24, 36].map((month) => (
              <option key={month} value={month}>
                {month} tháng ({month / 12} năm)
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="interest">Lãi suất năm giả định (%)</label>
          <input
            id="interest"
            className="input"
            type="number"
            min="0"
            max="30"
            step="0.1"
            value={annualInterestPercent}
            onChange={(e) => setAnnualInterestPercent(Number(e.target.value))}
          />
        </div>

        <p className="microcopy">
          * Lãi suất và công thức là mô phỏng frontend. Khoản thanh toán thực tế sẽ do đối tác ngân hàng/tài chính xác nhận theo hồ sơ tín dụng.
        </p>
      </section>

      <section className="panel">
        <div className="result-hero">
          <small>Khoản thanh toán ước tính</small>
          <strong>
            {formatVnd(result.monthlyPayment).replace("₫", "đ")}
            <small>/tháng</small>
          </strong>
          <span>Trong {termMonths} tháng sau khi trả trước</span>
        </div>

        <div className="review-list" style={{ marginTop: 16 }}>
          <div className="review-row">
            <span>Giá niêm yết</span>
            <strong>{formatVnd(vehicle.price).replace("₫", "đ")}</strong>
          </div>
          <div className="review-row">
            <span>Số tiền trả trước ({downPaymentPercent}%)</span>
            <strong>{formatVnd(result.downPayment).replace("₫", "đ")}</strong>
          </div>
          <div className="review-row">
            <span>Số tiền vay gốc</span>
            <strong>{formatVnd(result.principal).replace("₫", "đ")}</strong>
          </div>
          <div className="review-row">
            <span>Tổng lãi ước tính</span>
            <strong>{formatVnd(result.totalInterest).replace("₫", "đ")}</strong>
          </div>
          <div className="review-row">
            <span>Tổng số tiền chi trả</span>
            <strong>{formatVnd(result.totalPayment).replace("₫", "đ")}</strong>
          </div>
        </div>

        <button
          className="button button-lime button-block"
          style={{ marginTop: 16 }}
          disabled={submitting}
          onClick={() => void requestSupport()}
        >
          {submitting ? "Đang chuyển yêu cầu..." : "Yêu cầu nhân viên hỗ trợ hồ sơ"}
        </button>

        <p className="microcopy" style={{ marginTop: 10 }}>
          HITL (Human-in-the-loop): AI Agent không tự ý duyệt hồ sơ trả góp. Nhân viên tư vấn có thẩm quyền sẽ kiểm tra giấy tờ và liên hệ lại.
        </p>
      </section>
    </div>
  );
}
