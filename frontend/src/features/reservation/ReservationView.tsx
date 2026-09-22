import { DepositFlow } from "./DepositFlow";

export function ReservationView() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 850 }}>
        <header className="page-title">
          <span className="eyebrow">Đặt lịch & Giữ xe</span>
          <h1>Giữ xe demo, chưa cần thanh toán</h1>
          <p>
            Chọn mẫu xe và showroom thuận tiện. Tư vấn viên sẽ liên hệ xác nhận tình trạng xe có sẵn và hỗ trợ bạn nhận xe nhanh nhất.
          </p>
        </header>
        <DepositFlow />
      </div>
    </div>
  );
}
