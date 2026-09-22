import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { UserLayout } from "@/shared/layouts/UserLayout";
import { ConsultationView } from "@/features/consultation/ConsultationView";

export default function AdvisorRoute() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout>
        <ConsultationView />
      </UserLayout>
    </ProtectedRoute>
  );
}
