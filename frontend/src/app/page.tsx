import { PublicLayout } from "@/shared/layouts/PublicLayout";
import { UserHomeView } from "@/features/home/UserHomeView";

export default function HomeRoute() {
  return (
    <PublicLayout>
      <UserHomeView />
    </PublicLayout>
  );
}
