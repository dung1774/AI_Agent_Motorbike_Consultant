import { VehicleComparison } from "./VehicleComparison";

export function VehicleComparisonView() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-title">
          <span className="eyebrow">So sánh minh bạch</span>
          <h1>Đặt các lựa chọn cạnh nhau</h1>
          <p>
            Đối chiếu trực quan các thông số cốt lõi: giá bán, cự ly vận hành thực tế, pin, thời gian sạc và điểm nổi bật.
          </p>
        </header>
        <VehicleComparison />
      </div>
    </div>
  );
}
