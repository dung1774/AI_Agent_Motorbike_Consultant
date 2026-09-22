import type { ConsultationProfile, Recommendation, Vehicle } from "@/lib/types";

export function recommendVehicles(vehicles: Vehicle[], profile: ConsultationProfile): Recommendation[] {
  return vehicles.map((vehicle) => {
    let score = 58;
    const reasons: string[] = [];
    if (profile.purpose && vehicle.bestFor.includes(profile.purpose)) { score += 16; reasons.push(`Phù hợp nhu cầu ${profile.purpose.toLowerCase()}`); }
    if (profile.budgetMax && vehicle.price <= profile.budgetMax) { score += 14; reasons.push("Nằm trong ngân sách dự kiến"); }
    else if (profile.budgetMax && vehicle.price <= profile.budgetMax * 1.15) { score += 5; reasons.push("Cao hơn ngân sách một chút nhưng đáng cân nhắc"); }
    const requiredRange = (profile.dailyKm ?? 25) * (profile.charging === "limited" ? 2.4 : 1.8);
    if (vehicle.rangeKm >= requiredRange) { score += 10; reasons.push("Có dư địa quãng đường cho lịch di chuyển"); }
    if (profile.charging === "limited" && vehicle.rangeKm >= 150) { score += 6; reasons.push("Pin lớn giúp giảm tần suất sạc"); }
    if (!reasons.length) reasons.push("Cân bằng giữa chi phí và khả năng sử dụng");
    return { vehicle, score: Math.min(96, score), reasons };
  }).sort((a, b) => b.score - a.score).slice(0, 3);
}
