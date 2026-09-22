import Link from "next/link";

export default function NotFound() {
  return <section className="empty-page"><span className="eyebrow">404</span><h1>Không tìm thấy trang</h1><p>Đường dẫn này không tồn tại trong bản demo.</p><Link className="button button-primary" href="/">Về trang chủ</Link></section>;
}
