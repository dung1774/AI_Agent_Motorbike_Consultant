import { VehicleCatalog } from "./VehicleCatalog";

export function VehicleCatalogView() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-title">
          <span className="eyebrow">Catalog xe minh họa</span>
          <h1>Chọn mẫu xe cho hành trình của bạn</h1>
          <p>
            Thông số và mức giá hiện là dữ liệu demo. Mỗi mẫu xe đều có thể xem chi tiết, đưa vào bảng so sánh hoặc đăng ký giữ xe.
          </p>
        </header>
        <VehicleCatalog />
      </div>
    </div>
  );
}
