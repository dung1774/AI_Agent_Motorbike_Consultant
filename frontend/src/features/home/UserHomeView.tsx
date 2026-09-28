import Link from "next/link";
import { VehicleVisual } from "@/shared/ui/VehicleVisual";
import { vehicles } from "@/data/mock/vehicles";
import { formatVnd } from "@/lib/format";

export function UserHomeView() {
  const featured = vehicles[0];
  return (
    <>
      <section className="hero home-hero">
        <div className="container home-hero-inner">
          <div className="hero-copy home-hero-copy">
            <span className="eyebrow">Chatbot tư vấn Xe X · bản demo</span>
            <h1>Trò chuyện để chọn xe theo nhu cầu</h1>
            <p>Trợ lý hỏi từng câu về mục đích, quãng đường, ngân sách và chỗ sạc. Sau đó bạn xem xe gợi ý có nguồn và tính thử chi phí sử dụng.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/advisor">Bắt đầu trò chuyện</Link>
              <Link className="button button-secondary" href="/vehicles">Xem mẫu xe</Link>
            </div>
            <p className="microcopy">Thông số và giá trong bản demo chưa phải dữ liệu chính hãng.</p>
          </div>
          <div className="home-hero-vehicle"><VehicleVisual vehicle={featured} priority /><span>Xe minh họa · {featured.name}</span></div>
        </div>
      </section>
      <section className="home-featured-bar"><div className="container home-featured-inner"><strong>{featured.name}</strong><span>{featured.variant} · Giá demo {formatVnd(featured.price)}</span><Link href={`/vehicles/${featured.id}`}>Xem chi tiết →</Link></div></section>
      <section className="section">
        <div className="container">
          <h2>Ba bước chính</h2>
          <div className="feature-grid">
            <article className="feature-card"><strong>01</strong><h3>Trò chuyện về nhu cầu</h3><p>Trả lời lần lượt bốn câu hỏi ngắn.</p></article>
            <article className="feature-card"><strong>02</strong><h3>Xem gợi ý có nguồn</h3><p>Kiểm tra lý do, thông số và giới hạn dữ liệu.</p></article>
            <article className="feature-card"><strong>03</strong><h3>Ước tính chi phí</h3><p>Điều chỉnh giả định điện, xăng và quãng đường.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}
