import type {
  ChatMessage,
  ConsultationProfile,
  DepositRequest,
  LeadCreateInput,
  Recommendation,
  SalesLead,
  ServiceResult,
  Store,
  Vehicle,
} from "@/lib/types";

export interface VehicleService {
  getVehicles(): Promise<ServiceResult<Vehicle[]>>;
  getVehicleById(id: string): Promise<ServiceResult<Vehicle | null>>;
}

export interface AgentReply {
  message: ChatMessage;
  recommendations?: Recommendation[];
}

export interface AgentService {
  sendMessage(message: string, profile: ConsultationProfile): Promise<ServiceResult<AgentReply>>;
}

export interface StoreService {
  getStores(): Promise<ServiceResult<Store[]>>;
}

export interface LeadService {
  getLeads(): Promise<ServiceResult<SalesLead[]>>;
  createLead(input: LeadCreateInput): Promise<ServiceResult<SalesLead>>;
  updateStatus(id: string, status: SalesLead["status"]): Promise<ServiceResult<SalesLead>>;
}

export interface DepositService {
  createDeposit(request: DepositRequest): Promise<ServiceResult<{ reference: string }>>;
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
