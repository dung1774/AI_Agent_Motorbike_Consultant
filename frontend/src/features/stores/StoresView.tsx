import { StoreExplorer } from "./StoreExplorer";

export function StoresView() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-title">
          <span className="eyebrow">Showroom & Điểm sạc</span>
          <h1>Xem xe thực tế, lái thử tại cửa hàng</h1>
          <p>
            Khám phá luồng tìm showroom bằng dữ liệu demo; hãy xác nhận địa chỉ và lịch hẹn trước khi đến.
          </p>
        </header>
        <StoreExplorer />
      </div>
    </div>
  );
}
