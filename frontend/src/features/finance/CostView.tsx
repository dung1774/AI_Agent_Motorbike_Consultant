import { CostCalculator } from "./CostCalculator";

export function CostView() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-title">
          <span className="eyebrow">Công cụ chi phí</span>
          <h1>Xe máy điện tiết kiệm bao nhiêu?</h1>
          <p>
            Phép tính chi phí nhiên liệu chạy trực tiếp bằng code trên trình duyệt, dựa trên quãng đường thực tế và giá năng lượng hiện hành.
          </p>
        </header>
        <CostCalculator />
      </div>
    </div>
  );
}
