export type UseCase = "Đi học" | "Đi làm" | "Giao hàng" | "Đi phố";

export interface Vehicle {
  id: string;
  name: string;
  variant: string;
  tagline: string;
  price: number;
  rangeKm: number;
  batteryKwh: number;
  chargeHours: number;
  powerKw: number;
  topSpeedKmh: number;
  colors: string[];
  accent: string;
  bestFor: UseCase[];
  highlights: string[];
  sourceLabel: string;
  sourceUpdatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  district: string;
  distanceKm: number;
  phone: string;
  hours: string;
  availableVehicleIds: string[];
}

export type ChatRole = "agent" | "user";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  source?: string;
}

export interface ConsultationProfile {
  purpose?: UseCase;
  dailyKm?: number;
  budgetMax?: number;
  charging?: "home" | "work" | "limited";
}

export interface Recommendation {
  vehicle: Vehicle;
  score: number;
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
  electricMonthly: number;
  petrolMonthly: number;
  savingMonthly: number;
  savingYearly: number;
}

export interface InstallmentInputs {
  vehiclePrice: number;
  downPaymentPercent: number;
  termMonths: number;
  annualInterestPercent: number;
}

export interface InstallmentResult {
  downPayment: number;
  principal: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export type LeadStatus = "new" | "contacted" | "resolved";

export interface SalesLead {
  id: string;
  customerName: string;
  phone: string;
  purpose: UseCase;
  budgetLabel: string;
  dailyKm: number;
  interestedVehicleIds: string[];
  summary: string;
  unresolvedQuestions: string[];
  status: LeadStatus;
  createdAt: string;
}

export type LeadCreateInput = Omit<SalesLead, "id" | "status" | "createdAt">;

export interface DepositRequest {
  vehicleId: string;
  storeId: string;
  customerName: string;
  phone: string;
  email: string;
  note: string;
}

export interface ServiceResult<T> {
  data: T;
  receivedAt: string;
}
