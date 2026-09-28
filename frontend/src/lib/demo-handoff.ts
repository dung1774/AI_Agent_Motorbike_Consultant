import type { ConsultationProfile, Vehicle } from "@/lib/types";

const storageKey = "xe-x-demo-handoff";

export interface DemoHandoff {
  id: string;
  createdAt: string;
  vehicleName: string;
  profile: ConsultationProfile;
}

export function saveDemoHandoff(vehicle: Vehicle, profile: ConsultationProfile): DemoHandoff {
  const handoff: DemoHandoff = {
    id: `DEMO-${Date.now()}`,
    createdAt: new Date().toISOString(),
    vehicleName: `${vehicle.name} · ${vehicle.variant}`,
    profile: {
      purpose: profile.purpose,
      dailyKm: profile.dailyKm,
      budgetMax: profile.budgetMax,
      charging: profile.charging,
    },
  };
  window.sessionStorage.setItem(storageKey, JSON.stringify(handoff));
  return handoff;
}

export function readDemoHandoff(): DemoHandoff | null {
  try {
    const raw = window.sessionStorage.getItem(storageKey);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const handoff = value as Partial<DemoHandoff>;
    if (typeof handoff.id !== "string" || typeof handoff.vehicleName !== "string" ||
        typeof handoff.createdAt !== "string" || !handoff.profile ||
        typeof handoff.profile !== "object") return null;
    return handoff as DemoHandoff;
  } catch {
    return null;
  }
}

export function clearDemoHandoff(): void {
  window.sessionStorage.removeItem(storageKey);
}