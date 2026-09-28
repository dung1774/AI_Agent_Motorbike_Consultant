import { DepositView } from "@/features/purchase/DepositView";
import { PublicLayout } from "@/shared/layouts/PublicLayout";
import { vehicles } from "@/data/mock/vehicles";

export default async function DepositPage({ searchParams }: { searchParams: Promise<{ vehicle?: string }> }) {
  const { vehicle } = await searchParams;
  const initialVehicleId = vehicles.find((item) => item.id === vehicle)?.id;
  return <PublicLayout><DepositView initialVehicleId={initialVehicleId} /></PublicLayout>;
}
