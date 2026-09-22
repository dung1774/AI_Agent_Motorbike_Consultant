import type { AgentReply, AgentService, DepositService, LeadService, StoreService, VehicleService } from "@/lib/api";
import { initialLeads } from "@/data/mock/leads";
import { stores } from "@/data/mock/stores";
import { vehicles } from "@/data/mock/vehicles";
import { recommendVehicles } from "@/lib/recommendations";
import type { ChatMessage, SalesLead, ServiceResult } from "@/lib/types";

const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));
const result = <T,>(data: T): ServiceResult<T> => ({ data, receivedAt: new Date().toISOString() });
const LEADS_KEY = "xe_x_mock_leads";
let leads = initialLeads.map((lead) => ({ ...lead }));

function isSalesLead(value: unknown): value is SalesLead {
  if (!value || typeof value !== "object") return false;
  const lead = value as Partial<SalesLead>;
  return Boolean(
    typeof lead.id === "string" &&
    typeof lead.customerName === "string" &&
    typeof lead.phone === "string" &&
    typeof lead.summary === "string" &&
    Array.isArray(lead.interestedVehicleIds) &&
    Array.isArray(lead.unresolvedQuestions) &&
    ["new", "contacted", "resolved"].includes(lead.status ?? "")
  );
}

function readLeads(): SalesLead[] {
  if (typeof window === "undefined") return leads;
  try {
    const stored = window.localStorage.getItem(LEADS_KEY);
    if (!stored) return leads;
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isSalesLead)) {
      window.localStorage.removeItem(LEADS_KEY);
      return leads;
    }
    leads = parsed;
    return leads;
  } catch {
    window.localStorage.removeItem(LEADS_KEY);
    return leads;
  }
}

function saveLeads(next: SalesLead[]): SalesLead[] {
  leads = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LEADS_KEY, JSON.stringify(next));
    } catch {
      // Keep the in-memory fallback when browser storage is unavailable.
    }
  }
  return leads;
}

export const mockVehicleService: VehicleService = {
  async getVehicles() { await wait(380); return result(vehicles); },
  async getVehicleById(id) { await wait(300); return result(vehicles.find((vehicle) => vehicle.id === id) ?? null); },
};

function buildAgentText(message: string, complete: boolean) {
  const normalized = message.toLocaleLowerCase("vi");
  if (normalized.includes("pin") || normalized.includes("sạc")) return "Mình sẽ ưu tiên phạm vi di chuyển và điều kiện sạc. Các con số đang là dữ liệu demo có ghi nguồn; khi có catalog thật, lớp service sẽ thay dữ liệu mà không đổi giao diện.";
  if (normalized.includes("trả góp")) return "Mình có thể giúp bạn ước tính khoản trả trước và tiền hàng tháng. Kết quả chỉ để tham khảo; yêu cầu thật luôn được chuyển cho nhân viên xác nhận.";
  if (normalized.includes("nhân viên") || normalized.includes("tư vấn viên")) return "Mình đã chuẩn bị bản tóm tắt nhu cầu để chuyển cho tư vấn viên. Bạn vẫn có thể tiếp tục trò chuyện trong lúc chờ hỗ trợ.";
  if (complete) return "Mình đã có đủ thông tin để chọn các mẫu phù hợp nhất. Bạn có thể xem lý do đề xuất, so sánh hoặc điều chỉnh nhu cầu.";
  return "Mình đã ghi nhận. Bạn có thể chọn câu trả lời nhanh bên dưới để mình hoàn thiện hồ sơ nhu cầu.";
}

export const mockAgentService: AgentService = {
  async sendMessage(message, profile) {
    await wait(650);
    if (message.trim().toLowerCase() === "/error") throw new Error("Không thể kết nối mock agent.");
    const complete = Boolean(profile.purpose && profile.dailyKm && profile.budgetMax && profile.charging);
    const agentMessage: ChatMessage = {
      id: `agent-${Date.now()}`,
      role: "agent",
      content: buildAgentText(message, complete),
      createdAt: new Date().toISOString(),
      source: complete ? "Catalog demo Xe X · cập nhật 20/09/2026" : undefined,
    };
    const payload: AgentReply = { message: agentMessage };
    if (complete) payload.recommendations = recommendVehicles(vehicles, profile);
    return result(payload);
  },
};

export const mockStoreService: StoreService = {
  async getStores() { await wait(420); return result(stores); },
};

export const mockLeadService: LeadService = {
  async getLeads() { await wait(350); return result(readLeads()); },
  async createLead(input) {
    await wait(420);
    const currentLeads = readLeads();
    const nextNumber = currentLeads.reduce((max, lead) => {
      const numericId = Number(lead.id.replace("LD-", ""));
      return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
    }, 1023) + 1;
    const lead: SalesLead = {
      ...input,
      id: `LD-${nextNumber}`,
      status: "new",
      createdAt: "Vừa xong",
    };
    saveLeads([lead, ...currentLeads]);
    return result(lead);
  },
  async updateStatus(id, status) {
    await wait(320);
    const currentLeads = [...readLeads()];
    const index = currentLeads.findIndex((lead) => lead.id === id);
    if (index < 0) throw new Error("Không tìm thấy lead.");
    currentLeads[index] = { ...currentLeads[index], status };
    saveLeads(currentLeads);
    return result(currentLeads[index]);
  },
};

export const mockDepositService: DepositService = {
  async createDeposit(request) {
    await wait(700);
    if (!request.vehicleId || !request.storeId || !request.customerName || !request.phone) throw new Error("Thiếu thông tin bắt buộc.");
    const vehicle = vehicles.find((item) => item.id === request.vehicleId);
    const store = stores.find((item) => item.id === request.storeId);
    await mockLeadService.createLead({
      customerName: request.customerName,
      phone: request.phone,
      purpose: vehicle?.bestFor[0] ?? "Đi phố",
      budgetLabel: vehicle ? `${Math.ceil(vehicle.price / 1000000)} triệu` : "Chưa xác định",
      dailyKm: 0,
      interestedVehicleIds: [request.vehicleId],
      summary: `Khách đã gửi yêu cầu giữ xe demo${store ? ` tại ${store.name}` : ""}.`,
      unresolvedQuestions: ["Cần xác nhận xe có sẵn", "Cần chốt thời gian xem hoặc lái thử"],
    });
    return result({ reference: `DX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}` });
  },
};

export function resetMockLeads(): SalesLead[] {
  return saveLeads(initialLeads.map((lead) => ({ ...lead })));
}
