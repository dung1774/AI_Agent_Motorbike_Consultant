export type DemoRole = "customer" | "staff";
export type DemoLeadKind = "installment" | "deposit";
export type DemoLeadStatus = "pending_review" | "approved" | "rejected" | "confirmed" | "needs_info";

export interface DemoLead {
  id: string;
  kind: DemoLeadKind;
  vehicleId: string;
  vehicleName: string;
  storeName?: string;
  amount: number;
  months?: number;
  monthlyEstimate?: number;
  status: DemoLeadStatus;
  createdAt: string;
}

const roleKey = "xe-x-demo-role";
const leadsKey = "xe-x-demo-leads";

export function getDemoRole(): DemoRole | null {
  const value = window.sessionStorage.getItem(roleKey);
  return value === "customer" || value === "staff" ? value : null;
}

export function setDemoRole(role: DemoRole): void {
  window.sessionStorage.setItem(roleKey, role);
  window.dispatchEvent(new Event("xe-x-demo-change"));
}

export function clearDemoRole(): void {
  window.sessionStorage.removeItem(roleKey);
  window.dispatchEvent(new Event("xe-x-demo-change"));
}

export function getDemoLeads(): DemoLead[] {
  try {
    const value: unknown = JSON.parse(window.sessionStorage.getItem(leadsKey) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is DemoLead =>
      item && typeof item === "object" &&
      typeof item.id === "string" && typeof item.vehicleName === "string" &&
      (item.kind === "installment" || item.kind === "deposit") &&
      typeof item.amount === "number" && Number.isFinite(item.amount) &&
      typeof item.status === "string"
    );
  } catch {
    return [];
  }
}

function writeLeads(leads: DemoLead[]): void {
  window.sessionStorage.setItem(leadsKey, JSON.stringify(leads));
  window.dispatchEvent(new Event("xe-x-demo-change"));
}

export function createDemoLead(input: Omit<DemoLead, "id" | "status" | "createdAt">): DemoLead {
  const lead: DemoLead = {
    ...input,
    id: `YC-DEMO-${Date.now()}`,
    status: "pending_review",
    createdAt: new Date().toISOString(),
  };
  writeLeads([lead, ...getDemoLeads()]);
  return lead;
}

export function updateDemoLead(id: string, status: DemoLeadStatus): void {
  writeLeads(getDemoLeads().map((lead) => lead.id === id ? { ...lead, status } : lead));
}

export const demoStatusLabel: Record<DemoLeadStatus, string> = {
  pending_review: "Chờ nhân viên (demo)",
  approved: "Đã duyệt (demo)",
  rejected: "Đã từ chối (demo)",
  confirmed: "Đã xác nhận (demo)",
  needs_info: "Cần bổ sung (demo)",
};
