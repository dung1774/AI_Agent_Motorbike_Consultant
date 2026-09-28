"use client";

import { useEffect, useMemo, useState } from "react";
import { mockVehicleService } from "@/services/mock-services";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./VehicleCard";

export function VehicleCatalog() {
  const [items, setItems] = useState<Vehicle[]>([]);
  const [model, setModel] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setItems((await mockVehicleService.getVehicles()).data);
    } catch {
      setError("Không thể tải catalog minh họa.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { void load(); }, []);

  const models = useMemo(
    () => [...new Set(items.map((vehicle) => vehicle.name))].sort((a, b) => a.localeCompare(b, "vi")),
    [items]
  );
  const visible = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("vi");
    return items
      .filter((vehicle) =>
        (!model || vehicle.name === model) &&
        (vehicle.name + " " + vehicle.variant).toLocaleLowerCase("vi").includes(search)
      )
      .sort((a, b) => a.name.localeCompare(b.name, "vi") || a.variant.localeCompare(b.variant, "vi"));
  }, [items, model, query]);

  return (
    <section aria-label="Catalog Xe X minh họa">
      <div className="catalog-toolbar"><span className="eyebrow">Danh sách mẫu xe</span><span className="microcopy" aria-live="polite">{!loading && !error ? `${visible.length} mẫu minh họa` : ""}</span></div>
      <div className="filter-bar">
        <input className="input search-field" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Tìm mẫu xe" placeholder="Tìm mẫu hoặc phiên bản" />
        <select className="input" aria-label="Lọc theo mẫu xe" value={model} onChange={(event) => setModel(event.target.value)}>
          <option value="">Tất cả mẫu xe</option>
          {models.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
      {loading && <p role="status">Đang tải catalog...</p>}
      {error && <div role="alert"><p>{error}</p><button className="button button-secondary" type="button" onClick={() => void load()}>Thử lại</button></div>}
      {!loading && !error && visible.length === 0 && (
        <div className="empty-state"><h2>Chưa tìm thấy mẫu phù hợp</h2><p>Thử tên hoặc chọn mẫu khác.</p></div>
      )}
      {!loading && !error && visible.length > 0 && (
        <div className="vehicle-grid">{visible.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div>
      )}
    </section>
  );
}
