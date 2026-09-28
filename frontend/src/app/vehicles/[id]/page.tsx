import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vehicles } from "@/data/mock/vehicles";
import { formatVnd } from "@/lib/format";
import { PublicLayout } from "@/shared/layouts/PublicLayout";
import { VehicleVisual } from "@/shared/ui/VehicleVisual";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return vehicles.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = vehicles.find((item) => item.id === id);
  return { title: vehicle ? `${vehicle.name} — Xe X` : "Không tìm thấy mẫu xe — Xe X" };
}

function officialVinFastUrl(value?: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      ["vinfastauto.com", "www.vinfastauto.com"].includes(url.hostname) &&
      url.pathname.startsWith("/vn_vi/xe-may-dien-")
      ? url.toString() : null;
  } catch {
    return null;
  }
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = vehicles.find((item) => item.id === id);
  if (!vehicle) notFound();

  const hasSource = Boolean(vehicle.sourceLabel && vehicle.sourceUpdatedAt);
  const officialUrl = officialVinFastUrl(vehicle.officialUrl);
  const selectedVehicle = encodeURIComponent(vehicle.id);

  return (
    <PublicLayout>
      <div className="product-page">
        <div className="container product-breadcrumb"><Link href="/vehicles">← Tất cả mẫu xe</Link><span aria-hidden="true">/</span><span>{vehicle.name}</span></div>
        <section className="product-hero" aria-labelledby="product-title">
          <div className="container product-hero-inner">
            <span className="product-watermark" aria-hidden="true">{vehicle.name.replace("Xe X ", "").toUpperCase()}</span>
            <h1 id="product-title" className="sr-only">{vehicle.name}</h1>
            <div className="product-hero-art"><VehicleVisual vehicle={vehicle} priority /><span>Hình xe Xe X minh họa</span></div>
          </div>
        </section>
        <section className="container product-intro">
          <span className="eyebrow">{vehicle.name} · {vehicle.variant}</span>
          <h2>{vehicle.tagline}</h2>
          <p>Mẫu xe demo để thử tư vấn và so sánh. Thông số dưới đây chỉ mang tính minh họa.</p>
          <div className="product-highlights" aria-label="Thông số chính">
            <div><strong>{hasSource ? `${vehicle.rangeKm} km` : "—"}</strong><span>Quãng đường demo</span></div>
            <div><strong>{hasSource ? `${vehicle.batteryKwh} kWh` : "—"}</strong><span>Pin demo</span></div>
            <div><strong>{hasSource ? `${vehicle.chargeHours} giờ` : "—"}</strong><span>Sạc demo</span></div>
          </div>
          {hasSource ? <p className="source-line">{vehicle.sourceLabel} · Cập nhật {vehicle.sourceUpdatedAt}</p> : <p className="field-error">Thiếu nguồn; thông số chưa thể hiển thị.</p>}
        </section>
        <div className="product-action-bar">
          <div className="container product-action-inner">
            <div><span>Giá xe demo từ</span><strong>{hasSource ? formatVnd(vehicle.price) : "Chưa có giá"}</strong></div>
            <div className="product-action-links">
              <Link className="button button-secondary" href={`/installment?vehicle=${selectedVehicle}`}>Ước tính trả góp</Link>
              <Link className="button button-primary" href={`/deposit?vehicle=${selectedVehicle}`}>Yêu cầu cọc demo</Link>
            </div>
          </div>
        </div>
        <section className="container product-details" aria-labelledby="product-spec-title">
          <div className="product-details-intro">
            <span className="eyebrow">Thông số xe</span>
            <h2 id="product-spec-title">{vehicle.name} · {vehicle.variant}</h2>
            <p>Thông số và giá dưới đây dùng để thử luồng tư vấn. Quãng đường thực tế có thể thay đổi theo tải, tốc độ, địa hình và điều kiện sử dụng.</p>
          </div>
          <dl className="product-spec-list">
            <div><dt>Phiên bản</dt><dd>{vehicle.variant}</dd></div>
            <div><dt>Giá demo</dt><dd>{hasSource ? formatVnd(vehicle.price) : "Chưa có nguồn"}</dd></div>
            <div><dt>Quãng đường demo</dt><dd>{hasSource ? `${vehicle.rangeKm} km` : "Chưa có nguồn"}</dd></div>
            <div><dt>Dung lượng pin demo</dt><dd>{hasSource ? `${vehicle.batteryKwh} kWh` : "Chưa có nguồn"}</dd></div>
            <div><dt>Thời gian sạc demo</dt><dd>{hasSource ? `${vehicle.chargeHours} giờ` : "Chưa có nguồn"}</dd></div>
          </dl>
          <p className="source-line">{hasSource ? `${vehicle.sourceLabel} · Cập nhật ${vehicle.sourceUpdatedAt}` : "Chưa có nguồn được xác minh"}</p>
          {officialUrl ? <a className="button button-secondary" href={officialUrl} target="_blank" rel="noopener noreferrer">Xem xe trên VinFast ↗</a> : <p className="microcopy">Mẫu minh họa này chưa có trang sản phẩm VinFast tương ứng.</p>}
        </section>
      </div>
    </PublicLayout>
  );
}
