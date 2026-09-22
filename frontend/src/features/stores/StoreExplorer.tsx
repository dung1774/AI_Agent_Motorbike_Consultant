"use client";

import { useEffect, useMemo, useState } from "react";
import { mockStoreService } from "@/services/mock-services";
import { useApp } from "@/context/AppContext";
import type { Store } from "@/lib/types";

export function StoreExplorer() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showToast } = useApp();

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = (await mockStoreService.getStores()).data;
      setStores(data);
      setSelectedId(data[0]?.id ?? "");
    } catch {
      setError("Không thể tải danh sách cửa hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const visible = useMemo(
    () =>
      stores.filter((store) =>
        `${store.name} ${store.address} ${store.district}`
          .toLocaleLowerCase("vi")
          .includes(query.toLocaleLowerCase("vi"))
      ),
    [query, stores]
  );

  const selected = visible.find((store) => store.id === selectedId) ?? visible[0];

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-mark">!</div>
        <h2>Chưa tải được cửa hàng</h2>
        <p>{error}</p>
        <button className="button button-primary" onClick={load}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="store-layout">
      <section>
        <div className="field" style={{ marginBottom: 14 }}>
          <label htmlFor="store-search">Tìm theo quận hoặc địa chỉ</label>
          <input
            id="store-search"
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ví dụ: Cầu Giấy, Ba Đình..."
          />
        </div>

        {loading ? (
          <div className="stack">
            <div className="skeleton" style={{ height: 110, borderRadius: 14 }} />
            <div className="skeleton" style={{ height: 110, borderRadius: 14 }} />
          </div>
        ) : visible.length ? (
          <div className="store-list">
            {visible.map((store) => (
              <button
                className={`store-card ${selected?.id === store.id ? "selected" : ""}`}
                key={store.id}
                onClick={() => setSelectedId(store.id)}
              >
                <h3>{store.name}</h3>
                <p>{store.address}</p>
                <div className="store-meta">
                  <span>⌖ {store.distanceKm} km</span>
                  <span>◷ {store.hours}</span>
                  <span>☎ {store.phone}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-mark">⌕</div>
            <h2>Không có cửa hàng phù hợp</h2>
            <p>Thử tìm bằng tên quận khác.</p>
            <button className="button button-secondary" onClick={() => setQuery("")}>
              Xóa tìm kiếm
            </button>
          </div>
        )}
      </section>

      <section className="map-placeholder" aria-label="Bản đồ minh họa cửa hàng">
        <div className="map-grid" />
        <div className="map-river" />
        <span className="map-pin map-pin-one">
          <span>1</span>
        </span>
        <span className="map-pin map-pin-two">
          <span>2</span>
        </span>
        <span className="map-pin map-pin-three">
          <span>3</span>
        </span>

        {selected && (
          <div className="map-info">
            <span className="eyebrow">Đang chọn · cách {selected.distanceKm} km</span>
            <h3>{selected.name}</h3>
            <p>
              {selected.address} · Giờ mở cửa: {selected.hours}
            </p>
            <div className="cluster" style={{ marginTop: 10 }}>
              <button
                className="button button-primary button-small"
                onClick={() => showToast(`Đã tạo lịch hẹn lái thử tại ${selected.name}.`)}
              >
                Đặt lịch lái thử
              </button>
              <a
                className="button button-secondary button-small"
                href={`tel:${selected.phone.replace(/\s/g, "")}`}
              >
                Gọi hotline {selected.phone}
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
