import { DemoAuthView } from "@/features/auth/DemoAuthView";
import { PublicLayout } from "@/shared/layouts/PublicLayout";
export default function LoginPage() { return <PublicLayout><DemoAuthView mode="login" /></PublicLayout>; }
