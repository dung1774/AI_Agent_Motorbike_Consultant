"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setDemoRole } from "@/lib/demo-workflows";

export function DemoAuthView({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const isRegister = mode === "register";

  function enterDemo() {
    setDemoRole("customer");
    router.push("/account");
  }

  return (
    <div className="container page auth-page">
      <section className="auth-center" aria-labelledby="auth-title">
        <span className="eyebrow">Tài khoản Xe X</span>
        <h1 id="auth-title">{isRegister ? "Đăng ký" : "Đăng nhập"}</h1>
        <p className="auth-center-note">Tài khoản thật đang chờ API. Bạn có thể vào phiên khách demo để xem yêu cầu và tiếp tục tư vấn.</p>
        <fieldset className="auth-disabled-fields" disabled>
          <legend className="sr-only">Biểu mẫu tài khoản chưa khả dụng</legend>
          {isRegister && <input className="input" type="text" placeholder="Họ và tên · chờ API" aria-label="Họ và tên, chưa khả dụng" />}
          <input className="input" type="email" placeholder="Email · chờ API" aria-label="Email, chưa khả dụng" />
          <input className="input" type="password" placeholder="Mật khẩu · chờ API" aria-label="Mật khẩu, chưa khả dụng" />
        </fieldset>
        <button className="button button-primary auth-main-action" type="button" onClick={enterDemo}>Vào tài khoản demo</button>
        <p className="microcopy">Không cần nhập thông tin. Phiên chỉ lưu trong tab này; đây không phải xác thực thật.</p>
        <div className="auth-links"><Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}</Link><Link href="/advisor">Tư vấn không cần tài khoản</Link></div>
      </section>
    </div>
  );
}
