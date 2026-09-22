import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { UserLayout } from "@/shared/layouts/UserLayout";
import { VehicleCatalogView } from "@/features/vehicles/VehicleCatalogView";

export default function VehiclesRoute() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout>
        <VehicleCatalogView />
      </UserLayout>
    </ProtectedRoute>
  );
}
