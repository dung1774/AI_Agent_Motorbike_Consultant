"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import { mockVehicleService } from "@/services/mock-services";
import type { UseCase, Vehicle } from "@/lib/types";
import { VehicleCard } from "./VehicleCard";

const filters: Array<"Tất cả" | UseCase> = ["Tất cả", "Đi học", "Đi làm", "Giao hàng", "Đi phố"];

export function VehicleCatalog() {
  const [items, setItems] = useState<Vehicle[]>([]);
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tất cả");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { comparisonIds } = useApp();

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setItems((await mockVehicleService.getVehicles()).data);
    } catch {
      setError("Không thể tải catalog demo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const visible = useMemo(
    () =>
      items.filter((vehicle) => {
        const matchesFilter = filter === "Tất cả" || vehicle.bestFor.includes(filter);
        const matchesQuery = `${vehicle.name} ${vehicle.variant}`
          .toLocaleLowerCase("vi")
          .includes(query.toLocaleLowerCase("vi"));
        return matchesFilter && matchesQuery;
      }),
    [filter, items, query]
  );

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-mark">!</div>
        <h2>Catalog tạm gián đoạn</h2>
        <p>{error}</p>
        <button className="button button-primary" onClick={load}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="filter-bar">
        <input
          className="input search-field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Tìm mẫu xe"
          placeholder="Tìm theo tên hoặc phiên bản..."
        />
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="vehicle-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="skeleton" key={index} style={{ height: 360, borderRadius: "var(--radius)" }} />
          ))}
        </div>
      ) : visible.length ? (
        <div className="vehicle-grid">
          {visible.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-mark">⌕</div>
          <h2>Chưa tìm thấy mẫu phù hợp</h2>
          <p>Thử bỏ bộ lọc hoặc tìm bằng từ khóa khác.</p>
          <button
            className="button button-secondary"
            onClick={() => {
              setFilter("Tất cả");
              setQuery("");
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {comparisonIds.length > 0 && (
        <div className="floating-compare">
          <div>
            <strong>Đã chọn {comparisonIds.length}/3 mẫu</strong>
            <small>Chọn từ 2 mẫu để thấy khác biệt rõ hơn</small>
          </div>
          <Link href="/compare" className="button button-lime button-small">
            So sánh ngay →
          </Link>
        </div>
      )}
    </>
  );
}
