"use client";

import { useMemo, useState } from "react";
import { demoStores } from "@/data/mock/stores";

export function StoresView() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => demoStores.filter((store) =>
    `${store.name} ${store.area}`.toLocaleLowerCase("vi").includes(query.trim().toLocaleLowerCase("vi"))
  ), [query]);

  return (
    <div className="container page compact-page store-page">
      <div className="store-heading"><div><span className="eyebrow">Điểm tiếp nhận · bản demo</span><h1>Tìm theo khu vực</h1></div><p>Tra cứu điểm minh họa; địa chỉ và vị trí thật sẽ lấy từ API cửa hàng.</p></div>
      <div className="store-locator">
        <section className="store-locator-sidebar" aria-label="Tìm điểm tiếp nhận">
          <div className="store-search field"><label htmlFor="store-query">Tỉnh, thành phố hoặc tên điểm</label><input id="store-query" className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Hà Nội, Đà Nẵng, TP.HCM..." /></div>
          <p className="microcopy">{visible.length} điểm minh họa · Chưa có địa chỉ showroom được xác minh.</p>
          {visible.length ? <div className="store-results">{visible.map((store, index) => <article className="store-result" key={store.id}>
            <span className="store-card-index">{String(index + 1).padStart(2, "0")}</span>
            <div><span className="eyebrow">{store.area}</span><h2>{store.name}</h2><p>Điểm tiếp nhận minh họa</p></div>
          </article>)}</div> : <div className="empty-state"><h2>Không có điểm demo phù hợp</h2><p>Thử khu vực khác.</p></div>}
        </section>
        <section className="store-map-placeholder" aria-label="Trạng thái bản đồ">
          <div className="store-map-center"><span aria-hidden="true">⌖</span><h2>Bản đồ đang chờ dữ liệu</h2><p>Chưa có tọa độ cửa hàng từ API. Các điểm demo không được đặt lên bản đồ để tránh nhầm với showroom thật.</p></div>
        </section>
      </div>
    </div>
  );
}
