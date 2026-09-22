import { AuthLayout } from "@/shared/layouts/AuthLayout";
import { RegisterView } from "@/features/auth/RegisterView";
import { PublicOnlyRoute } from "@/shared/guards/PublicOnlyRoute";

export default function RegisterRoute() {
  return (
    <PublicOnlyRoute>
      <AuthLayout>
        <RegisterView />
      </AuthLayout>
    </PublicOnlyRoute>
  );
}
