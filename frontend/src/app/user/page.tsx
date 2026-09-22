import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { UserLayout } from "@/shared/layouts/UserLayout";
import { UserHomeView } from "@/features/home/UserHomeView";

export default function UserHomeRoute() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout>
        <UserHomeView />
      </UserLayout>
    </ProtectedRoute>
  );
}
