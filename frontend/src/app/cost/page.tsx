import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { UserLayout } from "@/shared/layouts/UserLayout";
import { CostView } from "@/features/finance/CostView";

export default function CostRoute() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout>
        <CostView />
      </UserLayout>
    </ProtectedRoute>
  );
}
