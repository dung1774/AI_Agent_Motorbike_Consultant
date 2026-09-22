import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { UserLayout } from "@/shared/layouts/UserLayout";
import { ReservationView } from "@/features/reservation/ReservationView";

export default function DepositRoute() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout>
        <ReservationView />
      </UserLayout>
    </ProtectedRoute>
  );
}
