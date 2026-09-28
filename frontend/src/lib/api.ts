import type { ServiceResult, Vehicle } from "@/lib/types";

export interface VehicleService {
  getVehicles(): Promise<ServiceResult<Vehicle[]>>;
}
