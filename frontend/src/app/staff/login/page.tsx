import { StaffAccessView } from "@/features/auth/StaffAccessView";
import { StaffLayout } from "@/shared/layouts/StaffLayout";

export default function StaffLoginPage() {
  return <StaffLayout><StaffAccessView /></StaffLayout>;
}
