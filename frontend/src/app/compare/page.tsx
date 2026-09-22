import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { UserLayout } from "@/shared/layouts/UserLayout";
import { VehicleComparisonView } from "@/features/vehicles/VehicleComparisonView";

export default function CompareRoute() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout>
        <VehicleComparisonView />
      </UserLayout>
    </ProtectedRoute>
  );
}
