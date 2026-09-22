"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function RegisterView() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Vui lòng nhập họ và tên.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = "Vui lòng nhập địa chỉ email hợp lệ.";
    }
    if (!phone.trim() || !/^(0|\+84)[0-9\s]{8,11}$/.test(phone.trim())) {
      errs.phone = "Vui lòng nhập số điện thoại hợp lệ.";
    }
    if (!password || password.length < 6) {
      errs.password = "Mật khẩu tối thiểu 6 ký tự.";
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        confirmPassword,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/user");
      }, 1200);
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : "Đăng ký không thành công.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="panel" style={{ padding: "36px 28px", textAlign: "center", boxShadow: "var(--shadow)" }}>
        <div className="success-mark" style={{ margin: "0 auto 16px" }}>✓</div>
        <span className="eyebrow">Đăng ký thành công</span>
        <h2 style={{ fontSize: "1.5rem", margin: "8px 0" }}>Chào mừng {name}!</h2>
        <p className="muted" style={{ fontSize: "0.9rem" }}>
          Tài khoản khách hàng của bạn đã sẵn sàng. Đang chuyển đến Trợ lý Xe X...
        </p>
      </div>
    );
  }

  return (
    <div className="panel" style={{ padding: "32px 28px", boxShadow: "var(--shadow)" }}>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <span className="brand-mark" style={{ margin: "0 auto 12px", width: 44, height: 44 }}>ϟ</span>
        <span className="eyebrow">Tài khoản khách hàng</span>
        <h1 style={{ fontSize: "1.75rem", margin: "6px 0 8px", letterSpacing: "-0.03em" }}>Tạo tài khoản mới</h1>
        <p className="muted" style={{ fontSize: "0.86rem", margin: 0 }}>
          Lưu hồ sơ tư vấn, bảng so sánh và đơn giữ xe của bạn
        </p>
      </div>

      {generalError && (
        <div style={{ padding: "10px 14px", borderRadius: 10, background: "#fff2f0", color: "var(--danger)", border: "1px solid #ffccc7", fontSize: "0.85rem", marginBottom: 18 }}>
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="stack" style={{ gap: 14 }}>
        <div className="field">
          <label htmlFor="reg-name" style={{ fontSize: "0.84rem", fontWeight: 700 }}>
            Họ và tên *
          </label>
          <input
            id="reg-name"
            className="input"
            placeholder="Ví dụ: Nguyễn Văn An"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="reg-email" style={{ fontSize: "0.84rem", fontWeight: 700 }}>
            Địa chỉ Email *
          </label>
          <input
            id="reg-email"
            className="input"
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="reg-phone" style={{ fontSize: "0.84rem", fontWeight: 700 }}>
            Số điện thoại *
          </label>
          <input
            id="reg-phone"
            className="input"
            type="tel"
            placeholder="0912 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            required
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="field">
            <label htmlFor="reg-password" style={{ fontSize: "0.84rem", fontWeight: 700 }}>
              Mật khẩu *
            </label>
            <input
              id="reg-password"
              className="input"
              type="password"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="field">
            <label htmlFor="reg-confirm" style={{ fontSize: "0.84rem", fontWeight: 700 }}>
              Xác nhận mật khẩu *
            </label>
            <input
              id="reg-confirm"
              className="input"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>
        </div>

        <p className="microcopy" style={{ margin: "2px 0 6px" }}>
          * Tài khoản mới mặc định là quyền <strong>Khách hàng</strong>. Tài khoản Nhân viên và Quản trị viên được cấp qua danh sách kiểm thử demo.
        </p>

        <button
          type="submit"
          className="button button-primary button-block"
          disabled={loading}
          style={{ height: 46, fontSize: "0.95rem" }}
        >
          {loading ? "Đang tạo tài khoản..." : "Hoàn tất đăng ký →"}
        </button>
      </form>

      <div style={{ marginTop: 22, textAlign: "center", fontSize: "0.85rem", color: "var(--ink-soft)" }}>
        Đã có tài khoản?{" "}
        <Link href="/login" style={{ color: "var(--forest-2)", fontWeight: 700, textDecoration: "underline" }}>
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
