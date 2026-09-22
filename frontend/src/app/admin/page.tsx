import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";
import { AdminLayout } from "@/shared/layouts/AdminLayout";
import { AdminOverviewView } from "@/features/admin/AdminOverviewView";

export default function AdminRoute() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <AdminOverviewView />
      </AdminLayout>
    </ProtectedRoute>
  );
}
