import { AuthLayout } from "@/shared/layouts/AuthLayout";
import { UnauthorizedView } from "@/features/auth/UnauthorizedView";

export default function UnauthorizedRoute() {
  return (
    <AuthLayout>
      <UnauthorizedView />
    </AuthLayout>
  );
}
