export type UseCase = "Đi học" | "Đi làm" | "Giao hàng" | "Đi phố";
export type Charging = "home" | "work" | "limited";

export interface Vehicle {
  id: string;
  name: string;
  variant: string;
  tagline: string;
  price: number;
  rangeKm: number;
  batteryKwh: number;
  chargeHours: number;
  accent: string;
  bestFor: UseCase[];
  sourceLabel: string;
  sourceUpdatedAt: string;
  officialUrl?: string | null;
}

export interface ConsultationProfile {
  purpose?: UseCase;
  dailyKm?: number;
  budgetMax?: number;
  charging?: Charging;
}

export interface Recommendation {
  vehicle: Vehicle;
  reasons: string[];
}

export interface CostInputs {
  dailyKm: number;
  daysPerMonth: number;
  electricityPrice: number;
  petrolPrice: number;
  petrolLitresPer100Km: number;
  electricKwhPer100Km: number;
}

export interface CostResult {
  monthlyKm: number;
  electricPerKm: number;
  petrolPerKm: number;
  electricMonthly: number;
  petrolMonthly: number;
  differenceMonthly: number;
}

export interface ServiceResult<T> {
  data: T;
  receivedAt: string;
}
