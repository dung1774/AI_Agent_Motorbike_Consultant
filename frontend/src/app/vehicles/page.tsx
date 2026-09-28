import { PublicLayout } from "@/shared/layouts/PublicLayout";
import { VehicleCatalogView } from "@/features/vehicles/VehicleCatalogView";

export default function VehiclesRoute() {
  return <PublicLayout><VehicleCatalogView /></PublicLayout>;
}
