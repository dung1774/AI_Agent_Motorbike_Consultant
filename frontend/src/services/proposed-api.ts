// Types and transport for the proposed architecture. No route below is treated as live by the demo UI.
export interface ApiSource {
  field_name: string;
  value: string | number;
  catalog_source: string;
  updated_at: string;
}

export interface ApiChatResponse {
  response: string;
  conversation_id: string;
  sources: ApiSource[];
  warnings: string[];
  metadata?: Record<string, unknown>;
}

export interface ApiVehicleSummary {
  id: string;
  name: string;
  variant: string;
  price: number;
  range_km: number;
  image_url?: string | null;
}

export interface ApiVehicleDetail extends ApiVehicleSummary {
  specs: Record<string, unknown>;
  source: string;
  updated_at: string;
  official_url?: string | null;
}

export interface ApiLead {
  lead_id: string;
  status: string;
  monthly_payment?: number | null;
  total_cost?: number | null;
  created_at: string;
}

export interface ApiStore {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  distance_km?: number | null;
}

export const proposedRoutes = {
  login: "/auth/login",
  register: "/auth/register",
  chat: "/chat",
  conversations: "/chat/conversations",
  vehicles: "/vehicles",
  compare: "/vehicles/compare",
  costCompare: "/vehicles/cost-compare",
  installment: "/leads/installment",
  deposit: "/leads/deposit",
  leads: "/leads",
  stores: "/stores",
} as const;

export class ApiRequestError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}

export async function requestProposedApi<T>(
  route: string,
  options: { method?: "GET" | "POST" | "PATCH"; body?: unknown; token?: string; timeoutMs?: number } = {}
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("Chưa cấu hình NEXT_PUBLIC_API_BASE_URL.");
  const url = new URL(`/api/v1${route}`, base);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 10000);
  try {
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        Accept: "application/json",
        ...(options.body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) throw new ApiRequestError(response.status, `API trả lỗi ${response.status}`);
    return await response.json() as T;
  } finally {
    clearTimeout(timer);
  }
}
