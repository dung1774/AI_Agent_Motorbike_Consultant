import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { UserLayout } from "@/shared/layouts/UserLayout";
import { ProfileView } from "@/features/profile/ProfileView";

export default function ProfileRoute() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout>
        <ProfileView />
      </UserLayout>
    </ProtectedRoute>
  );
}
