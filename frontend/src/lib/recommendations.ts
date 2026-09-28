import type { ConsultationProfile, Recommendation, Vehicle } from "@/lib/types";

export function recommendVehicles(vehicles: Vehicle[], profile: ConsultationProfile): Recommendation[] {
  const { purpose, dailyKm, budgetMax, charging } = profile;
  if (!purpose || !dailyKm || !budgetMax || !charging) return [];

  return vehicles
    .filter((vehicle) =>
      Boolean(vehicle.sourceLabel && vehicle.sourceUpdatedAt) &&
      vehicle.bestFor.includes(purpose) &&
      vehicle.price <= budgetMax &&
      vehicle.rangeKm >= dailyKm
    )
    .sort((a, b) => charging === "limited"
      ? b.rangeKm - a.rangeKm || a.price - b.price
      : a.price - b.price
    )
    .slice(0, 3)
    .map((vehicle) => {
      const reasons = [
        `Phù hợp mục đích ${purpose.toLowerCase()}`,
        "Giá demo nằm trong ngân sách đã khai",
        "Quãng đường công bố đáp ứng cự ly dự kiến trên giấy tờ",
      ];
      if (charging === "limited") {
        reasons.push("Ưu tiên quãng đường công bố cao hơn vì bạn khó sạc thường xuyên; cần xác minh lịch sạc thực tế");
      }
      return { vehicle, reasons };
    });
}
