import { Suspense } from "react";
import { AuthLayout } from "@/shared/layouts/AuthLayout";
import { LoginView } from "@/features/auth/LoginView";
import { PublicOnlyRoute } from "@/shared/guards/PublicOnlyRoute";

export default function LoginRoute() {
  return (
    <PublicOnlyRoute>
      <AuthLayout>
        <Suspense fallback={<div className="panel" style={{ padding: 40, textAlign: "center" }}>Đang tải...</div>}>
          <LoginView />
        </Suspense>
      </AuthLayout>
    </PublicOnlyRoute>
  );
}
