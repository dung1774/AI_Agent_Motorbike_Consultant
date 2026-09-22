import { InstallmentCalculator } from "./InstallmentCalculator";

export function InstallmentView() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-title">
          <span className="eyebrow">Ước tính trả góp</span>
          <h1>Chủ động phương án tài chính</h1>
          <p>
            Thử nghiệm các mức trả trước và kỳ hạn linh hoạt. Agent hỗ trợ ước tính sơ bộ; nhân viên tư vấn showroom sẽ hoàn thiện hồ sơ chính xác cho bạn.
          </p>
        </header>
        <InstallmentCalculator />
      </div>
    </div>
  );
}
