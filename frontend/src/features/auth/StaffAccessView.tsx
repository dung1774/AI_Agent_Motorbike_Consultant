"use client";

import { useRouter } from "next/navigation";
import { setDemoRole } from "@/lib/demo-workflows";

export function StaffAccessView() {
  const router = useRouter();
  return <div className="container staff-access-page"><div className="staff-access-card">
    <span className="eyebrow">Không gian làm việc riêng</span>
    <h1>Vào khu vực nhân viên</h1>
    <p>Xem bản bàn giao tư vấn và thử xử lý yêu cầu trả góp, đặt cọc trong tab này.</p>
    <button className="button button-primary" type="button" onClick={() => { setDemoRole("staff"); router.push("/staff"); }}>Vào vai nhân viên demo</button>
    <p className="microcopy">Chưa có tài khoản hoặc phân quyền thật. Khi backend có xác thực, lối vào này sẽ được thay bằng đăng nhập nhân viên.</p>
  </div></div>;
}
