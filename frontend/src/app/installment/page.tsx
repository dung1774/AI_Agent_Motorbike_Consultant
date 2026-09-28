import { InstallmentView } from "@/features/purchase/InstallmentView";
import { PublicLayout } from "@/shared/layouts/PublicLayout";
import { vehicles } from "@/data/mock/vehicles";

export default async function InstallmentPage({ searchParams }: { searchParams: Promise<{ vehicle?: string }> }) {
  const { vehicle } = await searchParams;
  const initialVehicleId = vehicles.find((item) => item.id === vehicle)?.id;
  return <PublicLayout><InstallmentView initialVehicleId={initialVehicleId} /></PublicLayout>;
}
