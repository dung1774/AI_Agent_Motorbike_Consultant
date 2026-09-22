import Link from "next/link";
import { VehicleVisual } from "@/shared/ui/VehicleVisual";
import { VehicleCard } from "@/features/vehicles/VehicleCard";
import { vehicles } from "@/data/mock/vehicles";
import { formatVnd } from "@/lib/format";

export function UserHomeView() {
  const featuredVehicle = vehicles[1];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Trợ lý chọn xe điện dành cho bạn</span>
            <h1>
              Chọn đúng xe.
              <br />
              <span>Đi đúng chất.</span>
            </h1>
            <p>
              Chia sẻ nhu cầu, ngân sách và quãng đường mỗi ngày. Trợ lý Xe X sẽ gợi ý mẫu phù hợp, giải thích rõ và giúp bạn tính chi phí chỉ trong vài phút.
            </p>
            <div className="hero-actions">
              <Link href="/advisor" className="button button-primary">
                Bắt đầu tư vấn AI <span aria-hidden="true">→</span>
              </Link>
              <Link href="/vehicles" className="button button-secondary">
                Khám phá mẫu xe
              </Link>
            </div>
            <div className="trust-row">
              <span>Đăng nhập cá nhân hóa</span>
              <span>Dữ liệu demo có ghi nguồn</span>
              <span>Hỗ trợ tư vấn viên thật (HITL)</span>
            </div>
          </div>
          <div className="hero-showcase" aria-label="Xe X City nổi bật">
            <div className="hero-orbit" />
            <div className="hero-float hero-float-one">
              <strong>{featuredVehicle.rangeKm} km</strong>Phạm vi demo
            </div>
            <div className="hero-float hero-float-two">
              <strong>Tiết kiệm hơn</strong>Ước tính theo lịch đi của bạn
            </div>
            <div className="hero-card">
              <div className="hero-card-top">
                <div>
                  <span className="eyebrow">Đề xuất nổi bật</span>
                  <h3>{featuredVehicle.name}</h3>
                </div>
                <span className="badge">Phù hợp 92%</span>
              </div>
              <VehicleVisual accent="#42c883" />
              <div className="spec-row">
                <span>
                  <strong>{formatVnd(featuredVehicle.price).replace("₫", "đ")}</strong>
                  <small>giá demo</small>
                </span>
                <span>
                  <strong>{featuredVehicle.batteryKwh} kWh</strong>
                  <small>dung lượng pin</small>
                </span>
                <span>
                  <strong>{featuredVehicle.chargeHours} giờ</strong>
                  <small>thời gian sạc</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Một hành trình liền mạch</span>
              <h2>Từ nhu cầu đến quyết định</h2>
            </div>
            <p>
              AI hỗ trợ phần tìm hiểu và tính toán; tư vấn viên thật tiếp nhận ở các bước cần xác nhận hoặc thủ tục trả góp.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-card-index">01</div>
              <h3>Hiểu nhu cầu thật</h3>
              <p>
                Hỏi đúng về mục đích (học sinh, người đi làm, shipper), cự ly di chuyển, ngân sách và nơi sạc.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-card-index">02</div>
              <h3>So sánh minh bạch</h3>
              <p>
                Đặt các mẫu xe cạnh nhau, tính chi phí điện so với xe xăng và hiển thị rõ mọi giả định kỹ thuật.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-card-index">03</div>
              <h3>Có nhân viên hỗ trợ</h3>
              <p>
                Khi cần trả góp, đặt cọc hoặc kiểm tra xe thực tế, hồ sơ được tóm tắt và chuyển ngay cho tư vấn viên showroom.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Dòng xe Xe X</span>
              <h2>Thiết kế cho mọi phong cách sống</h2>
            </div>
            <Link href="/vehicles" className="button button-secondary">
              Xem tất cả mẫu xe →
            </Link>
          </div>
          <div className="vehicle-grid">
            {vehicles.slice(0, 3).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
