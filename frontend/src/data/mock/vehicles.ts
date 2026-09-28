import type { Vehicle } from "@/lib/types";

export const vehicles: Vehicle[] = [
  { id: "xe-x-lite", name: "Xe X Lite", variant: "Tiêu chuẩn", tagline: "Gọn nhẹ cho nhịp sống đô thị", price: 18900000, rangeKm: 80, batteryKwh: 2, chargeHours: 5.5, accent: "#95e949", bestFor: ["Đi học", "Đi phố"], sourceLabel: "Catalog demo Xe X — thông số minh họa", sourceUpdatedAt: "20/09/2026" },
  { id: "xe-x-city", name: "Xe X City", variant: "Plus", tagline: "Cân bằng quãng đường và tiện nghi", price: 26900000, rangeKm: 115, batteryKwh: 3.2, chargeHours: 6, accent: "#42c883", bestFor: ["Đi làm", "Đi học", "Đi phố"], sourceLabel: "Catalog demo Xe X — thông số minh họa", sourceUpdatedAt: "20/09/2026" },
  { id: "xe-x-flow", name: "Xe X Flow", variant: "Long Range", tagline: "Đi xa hơn cho ngày làm việc dài", price: 34900000, rangeKm: 165, batteryKwh: 4.5, chargeHours: 6.5, accent: "#ff9d5c", bestFor: ["Đi làm", "Giao hàng"], sourceLabel: "Catalog demo Xe X — thông số minh họa", sourceUpdatedAt: "20/09/2026" },
  { id: "xe-x-pro", name: "Xe X Pro", variant: "Performance", tagline: "Hiệu năng mạnh, hoàn thiện cao cấp", price: 45900000, rangeKm: 190, batteryKwh: 5.2, chargeHours: 7, accent: "#ff6b57", bestFor: ["Đi làm", "Giao hàng", "Đi phố"], sourceLabel: "Catalog demo Xe X — thông số minh họa", sourceUpdatedAt: "20/09/2026" },
];
