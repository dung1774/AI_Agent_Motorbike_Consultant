import type { VehicleService } from "@/lib/api";
import { vehicles } from "@/data/mock/vehicles";

export const mockVehicleService: VehicleService = {
  async getVehicles() {
    return { data: vehicles, receivedAt: new Date().toISOString() };
  },
};
