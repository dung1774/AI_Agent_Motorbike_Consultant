import { formatVnd } from "@/lib/format";
import type { Charging, ConsultationProfile, UseCase, Vehicle } from "@/lib/types";

export type IntakeField = "purpose" | "dailyKm" | "budgetMax" | "charging" | "complete";
export type TopicReply = { text: string; action?: "cost" };

const normalize = (value: string) => value.toLowerCase().normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").trim();

export function nextField(profile: ConsultationProfile): IntakeField {
  if (!profile.purpose) return "purpose";
  if (!profile.dailyKm) return "dailyKm";
  if (!profile.budgetMax) return "budgetMax";
  if (!profile.charging) return "charging";
  return "complete";
}

export function questionFor(field: IntakeField): string {
  switch (field) {
    case "purpose": return "Bạn dùng xe chủ yếu để đi học, đi làm, giao hàng hay đi phố?";
    case "dailyKm": return "Mỗi ngày bạn dự kiến đi khoảng bao nhiêu km? Ví dụ: 30 km.";
    case "budgetMax": return "Ngân sách tối đa của bạn là bao nhiêu? Ví dụ: 20 triệu hoặc 20000000 VND.";
    case "charging": return "Bạn có thể sạc tại nhà, tại nơi làm việc hay khó sạc thường xuyên?";
    case "complete": return "Bạn có thể hỏi thêm về mẫu xe, pin, sạc hoặc xem chi phí sử dụng.";
  }
}

export function optionsFor(field: IntakeField): string[] {
  if (field === "purpose") return ["Đi học", "Đi làm", "Giao hàng", "Đi phố"];
  if (field === "charging") return ["Sạc tại nhà", "Sạc tại nơi làm việc", "Khó sạc thường xuyên"];
  if (field === "complete") return ["Xem lại gợi ý", "Giải thích pin/sạc", "Ước tính chi phí"];
  return [];
}

function positiveNumber(text: string, budget: boolean): number | null {
  const normalized = normalize(text);
  const million = /\b(trieu|tr)\b/.test(normalized);
  const first = normalized.match(/\d+(?:[.,]\d+)?/);
  if (!first) return null;
  const value = million
    ? Number(first[0].replace(",", ".")) * 1_000_000
    : budget ? Number(normalized.replace(/[^\d]/g, "")) : Number(first[0].replace(",", "."));
  if (!Number.isFinite(value) || value <= 0 || (budget && !Number.isSafeInteger(value))) return null;
  if (budget && value < 1_000_000) return null;
  return value;
}

export function parseAnswer(field: IntakeField, text: string): Partial<ConsultationProfile> | null {
  const value = normalize(text);
  if (field === "purpose") {
    let purpose: UseCase | undefined;
    if (value.includes("giao hang") || value.includes("shipper") || value.includes("cho hang")) purpose = "Giao hàng";
    else if (value.includes("di hoc") || value.includes("sinh vien")) purpose = "Đi học";
    else if (value.includes("di lam") || value.includes("cong so")) purpose = "Đi làm";
    else if (value.includes("di pho") || value.includes("di choi")) purpose = "Đi phố";
    return purpose ? { purpose } : null;
  }
  if (field === "dailyKm") {
    const dailyKm = positiveNumber(value, false);
    return dailyKm ? { dailyKm } : null;
  }
  if (field === "budgetMax") {
    const budgetMax = positiveNumber(value, true);
    return budgetMax ? { budgetMax } : null;
  }
  if (field === "charging") {
    let charging: Charging | undefined;
    if (value.includes("kho") || value.includes("khong") || value.includes("han che")) charging = "limited";
    else if (value.includes("nha") || value.includes("home")) charging = "home";
    else if (value.includes("noi lam") || value.includes("cong ty") || value.includes("work")) charging = "work";
    return charging ? { charging } : null;
  }
  return null;
}

export function answerCatalogQuestion(text: string, vehicles: Vehicle[]): TopicReply | null {
  const value = normalize(text);
  const vehicle = vehicles.find((item) => value.includes(normalize(item.name)) ||
    value.includes(normalize(item.name.split(" ").at(-1) ?? item.name)));
  if (vehicle) {
    if (!vehicle.sourceLabel || !vehicle.sourceUpdatedAt) return { text: "Mẫu này thiếu nguồn thông số; mình chưa thể trả lời bằng số liệu." };
    const facts: string[] = [];
    if (/gia|bao nhieu tien|thong so/.test(value)) facts.push(`giá demo ${formatVnd(vehicle.price)}`);
    if (/pin|thong so/.test(value)) facts.push(`pin demo ${vehicle.batteryKwh} kWh`);
    if (/sac|thong so/.test(value)) facts.push(`sạc demo ${vehicle.chargeHours} giờ`);
    if (/quang duong|pham vi|di duoc|thong so/.test(value)) facts.push(`quãng đường demo ${vehicle.rangeKm} km`);
    if (!facts.length) facts.push(`giá demo ${formatVnd(vehicle.price)}`, `quãng đường demo ${vehicle.rangeKm} km`);
    const rangeNote = facts.some((fact) => fact.includes("quãng đường")) ? " Quãng đường thực tế còn phụ thuộc tải, tốc độ và địa hình." : "";
    return { text: `${vehicle.name} (${vehicle.variant}): ${facts.join("; ")}. ${vehicle.sourceLabel}, cập nhật ${vehicle.sourceUpdatedAt}.${rangeNote}` };
  }
  if (/chi phi|tiet kiem|xang|xe dien/.test(value) && !/pin|dien thoai/.test(value)) {
    return { text: "Mình có công cụ tính chi phí điện và xăng theo quãng đường, với các giả định bạn có thể sửa. Xem phép tính và giới hạn ngay tại trang chi phí.", action: "cost" };
  }
  if (/pin|sac|quang duong|pham vi/.test(value)) {
    return { text: "Dung lượng pin (kWh), thời gian sạc (giờ) và quãng đường công bố (km) của từng mẫu nằm trên thẻ xe kèm nguồn demo. Quãng đường thực tế thay đổi theo tải, tốc độ, địa hình và điều kiện sạc; bản demo không cam kết cự ly thực tế." };
  }
  return null;
}
