import type { CostInputs, CostResult, InstallmentInputs, InstallmentResult } from "@/lib/types";

export function calculateOwnershipCost(input: CostInputs): CostResult {
  const monthlyKm = input.dailyKm * input.daysPerMonth;
  const electricMonthly = (monthlyKm / 100) * input.electricKwhPer100Km * input.electricityPrice;
  const petrolMonthly = (monthlyKm / 100) * input.petrolLitresPer100Km * input.petrolPrice;
  const savingMonthly = Math.max(0, petrolMonthly - electricMonthly);
  return { monthlyKm, electricMonthly, petrolMonthly, savingMonthly, savingYearly: savingMonthly * 12 };
}

export function calculateInstallment(input: InstallmentInputs): InstallmentResult {
  const downPayment = input.vehiclePrice * (input.downPaymentPercent / 100);
  const principal = input.vehiclePrice - downPayment;
  const monthlyRate = input.annualInterestPercent / 100 / 12;
  const totalInterest = principal * monthlyRate * input.termMonths;
  const monthlyPayment = (principal + totalInterest) / input.termMonths;
  return { downPayment, principal, monthlyPayment, totalInterest, totalPayment: downPayment + principal + totalInterest };
}
