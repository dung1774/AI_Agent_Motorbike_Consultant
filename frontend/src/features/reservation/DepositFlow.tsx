"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { vehicles } from "@/data/mock/vehicles";
import { stores } from "@/data/mock/stores";
import { mockDepositService } from "@/services/mock-services";
import { formatVnd } from "@/lib/format";
import type { DepositRequest } from "@/lib/types";

const emptyErrors: Record<string, string> = {};

export function DepositFlow() {
  const { selectedVehicleId, selectVehicle } = useApp();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<DepositRequest>({
    vehicleId: selectedVehicleId,
    storeId: stores[0].id,
    customerName: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    note: "",
  });
  const [errors, setErrors] = useState(emptyErrors);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [accepted, setAccepted] = useState(true);
  const [reference, setReference] = useState("");

  const vehicle = vehicles.find((item) => item.id === form.vehicleId) ?? vehicles[0];
  const store = stores.find((item) => item.id === form.storeId) ?? stores[0];
  const update = (key: keyof DepositRequest, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const validateCustomer = () => {
    const next: Record<string, string> = {};
    if (form.customerName.trim().length < 2) next.customerName = "Vui lòng nhập họ và tên.";
    if (!/^(0|\+84)[0-9\s]{8,11}$/.test(form.phone.trim())) next.phone = "Số điện thoại chưa hợp lệ.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Email chưa đúng định dạng.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const nextStep = () => {
    if (step === 2 && !validateCustomer()) return;
    setStep((current) => Math.min(3, current + 1));
  };

  const submit = async () => {
    if (!accepted) {
      setSubmitError("Bạn cần đồng ý để tư vấn viên liên hệ xác nhận yêu cầu.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await mockDepositService.createDeposit(form);
      setReference(response.data.reference);
      setStep(4);
    } catch (caught) {
      setSubmitError(caught instanceof Error ? caught.message : "Chưa thể gửi yêu cầu giữ xe.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="panel">
      <div className="stepper">
        {["Chọn xe & Showroom", "Thông tin liên hệ", "Xác nhận"].map((label, index) => (
          <div
            className={`step ${step === index + 1 ? "active" : step > index + 1 ? "done" : ""}`}
            key={label}
          >
            <b>{step > index + 1 ? "✓" : index + 1}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="stack">
          <div>
            <span className="eyebrow">Bước 1</span>
            <h2>Chọn mẫu xe và điểm nhận xe</h2>
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="deposit-vehicle">Mẫu xe quan tâm</label>
              <select
                id="deposit-vehicle"
                className="select"
                value={form.vehicleId}
                onChange={(e) => {
                  update("vehicleId", e.target.value);
                  selectVehicle(e.target.value);
                }}
              >
                {vehicles.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name} ({item.variant}) — {formatVnd(item.price).replace("₫", "đ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="deposit-store">Showroom tiếp nhận</label>
              <select
                id="deposit-store"
                className="select"
                value={form.storeId}
                onChange={(e) => update("storeId", e.target.value)}
              >
                {stores.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name} — {item.address}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="microcopy">
            * Đây là yêu cầu giữ xe demo. Chưa thu bất kỳ khoản tiền nào và không tạo nghĩa vụ thanh toán ngay.
          </p>
          <button className="button button-primary" onClick={nextStep}>
            Tiếp tục sang thông tin liên hệ →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="stack">
          <div>
            <span className="eyebrow">Bước 2</span>
            <h2>Thông tin người nhận xe</h2>
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="customer-name">Họ và tên *</label>
              <input
                id="customer-name"
                className="input"
                placeholder="Nguyễn Văn An"
                value={form.customerName}
                onChange={(e) => update("customerName", e.target.value)}
              />
              {errors.customerName && <span className="field-error">{errors.customerName}</span>}
            </div>
            <div className="field">
              <label htmlFor="customer-phone">Số điện thoại *</label>
              <input
                id="customer-phone"
                className="input"
                placeholder="0912 345 678"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                inputMode="tel"
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="field">
              <label htmlFor="customer-email">Email nhận xác nhận</label>
              <input
                id="customer-email"
                className="input"
                type="email"
                placeholder="an.nguyen@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                inputMode="email"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="customer-note">Ghi chú thêm (thời gian lái thử, màu xe mong muốn...)</label>
              <textarea
                id="customer-note"
                className="textarea"
                rows={3}
                value={form.note}
                onChange={(e) => update("note", e.target.value)}
              />
            </div>
          </div>
          <div className="cluster">
            <button className="button button-secondary" onClick={() => setStep(1)}>
              ← Quay lại
            </button>
            <button className="button button-primary" onClick={nextStep}>
              Xem lại yêu cầu →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="stack">
          <div>
            <span className="eyebrow">Bước 3</span>
            <h2>Xác nhận yêu cầu giữ xe</h2>
          </div>
          <div className="review-list">
            <div className="review-row">
              <span>Mẫu xe giữ chỗ</span>
              <strong>
                {vehicle.name} ({vehicle.variant}) · {formatVnd(vehicle.price).replace("₫", "đ")}
              </strong>
            </div>
            <div className="review-row">
              <span>Showroom tiếp nhận</span>
              <strong>{store.name} ({store.address})</strong>
            </div>
            <div className="review-row">
              <span>Người nhận</span>
              <strong>{form.customerName}</strong>
            </div>
            <div className="review-row">
              <span>Liên hệ</span>
              <strong>
                {form.phone}
                {form.email ? ` · ${form.email}` : ""}
              </strong>
            </div>
            <div className="review-row">
              <span>Thanh toán đặt cọc</span>
              <strong>0đ (Mô phỏng demo, không thu tiền)</strong>
            </div>
          </div>
          <label className="microcopy" style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
            />
            Tôi đồng ý để tư vấn viên showroom liên hệ xác nhận tình trạng xe và thời gian xem xe.
          </label>
          {submitError && <span className="field-error">{submitError}</span>}
          <div className="cluster">
            <button className="button button-secondary" onClick={() => setStep(2)}>
              Chỉnh sửa thông tin
            </button>
            <button className="button button-lime" disabled={submitting || !accepted} onClick={() => void submit()}>
              {submitting ? "Đang gửi hồ sơ..." : "Gửi yêu cầu giữ xe demo"}
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="success-state">
          <div className="success-mark">✓</div>
          <span className="eyebrow">Yêu cầu đã được tiếp nhận</span>
          <h2>Mã giữ chỗ: {reference}</h2>
          <p className="muted">
            Mock service đã ghi nhận yêu cầu giữ mẫu xe <strong>{vehicle.name}</strong> tại{" "}
            <strong>{store.name}</strong> cho {form.customerName} - {form.phone}. Đây chưa phải xác nhận từ showroom thật.
          </p>
          <button
            className="button button-secondary"
            onClick={() => {
              setStep(1);
              setReference("");
              setForm({
                vehicleId: selectedVehicleId,
                storeId: stores[0].id,
                customerName: user?.name ?? "",
                phone: user?.phone ?? "",
                email: user?.email ?? "",
                note: "",
              });
              setAccepted(true);
              setSubmitError("");
            }}
          >
            Tạo thêm yêu cầu khác
          </button>
        </div>
      )}
    </section>
  );
}
