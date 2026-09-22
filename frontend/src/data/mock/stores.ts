import type { Store } from "@/lib/types";

export const stores: Store[] = [
  { id: "store-ba-dinh", name: "Xe X Ba Đình", address: "12 Kim Mã, Ba Đình, Hà Nội", district: "Ba Đình", distanceKm: 2.4, phone: "024 7300 1480", hours: "08:00–20:00", availableVehicleIds: ["xe-x-lite", "xe-x-city", "xe-x-flow"] },
  { id: "store-cau-giay", name: "Xe X Cầu Giấy", address: "88 Xuân Thủy, Cầu Giấy, Hà Nội", district: "Cầu Giấy", distanceKm: 4.8, phone: "024 7300 1481", hours: "08:30–20:30", availableVehicleIds: ["xe-x-city", "xe-x-flow", "xe-x-pro"] },
  { id: "store-hai-ba-trung", name: "Xe X Hai Bà Trưng", address: "196 Bà Triệu, Hai Bà Trưng, Hà Nội", district: "Hai Bà Trưng", distanceKm: 6.1, phone: "024 7300 1482", hours: "08:00–21:00", availableVehicleIds: ["xe-x-lite", "xe-x-city", "xe-x-pro"] },
  { id: "store-thu-duc", name: "Xe X Thủ Đức", address: "24 Võ Văn Ngân, Thủ Đức, TP.HCM", district: "Thủ Đức", distanceKm: 8.7, phone: "028 7300 1483", hours: "08:00–20:30", availableVehicleIds: ["xe-x-lite", "xe-x-flow"] },
];
