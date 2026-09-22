import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { EmployeeLayout } from "@/shared/layouts/EmployeeLayout";
import { LeadDashboardView } from "@/features/leads/LeadDashboardView";

export default function EmployeeRoute() {
  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <EmployeeLayout>
        <LeadDashboardView />
      </EmployeeLayout>
    </ProtectedRoute>
  );
}
