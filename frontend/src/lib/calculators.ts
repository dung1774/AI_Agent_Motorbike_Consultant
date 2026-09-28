import type { CostInputs, CostResult } from "@/lib/types";

export function calculateOwnershipCost(input: CostInputs): CostResult {
  const monthlyKm = input.dailyKm * input.daysPerMonth;
  const electricPerKm = input.electricKwhPer100Km * input.electricityPrice / 100;
  const petrolPerKm = input.petrolLitresPer100Km * input.petrolPrice / 100;
  const electricMonthly = monthlyKm * electricPerKm;
  const petrolMonthly = monthlyKm * petrolPerKm;
  return {
    monthlyKm,
    electricPerKm,
    petrolPerKm,
    electricMonthly,
    petrolMonthly,
    differenceMonthly: petrolMonthly - electricMonthly,
  };
}
