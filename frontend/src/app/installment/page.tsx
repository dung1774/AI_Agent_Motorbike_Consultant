import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { UserLayout } from "@/shared/layouts/UserLayout";
import { InstallmentView } from "@/features/finance/InstallmentView";

export default function InstallmentRoute() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout>
        <InstallmentView />
      </UserLayout>
    </ProtectedRoute>
  );
}
