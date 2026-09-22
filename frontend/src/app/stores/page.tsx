import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { UserLayout } from "@/shared/layouts/UserLayout";
import { StoresView } from "@/features/stores/StoresView";

export default function StoresRoute() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout>
        <StoresView />
      </UserLayout>
    </ProtectedRoute>
  );
}
