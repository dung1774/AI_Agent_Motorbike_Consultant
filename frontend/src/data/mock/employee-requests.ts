export type DemoRequestKind = "installment" | "deposit";
export type DemoRequestStatus = "pending" | "approved" | "rejected" | "confirmed" | "needs-info";

export type DemoRequest = {
  id: string;
  kind: DemoRequestKind;
  vehicle: string;
  purpose: string;
  dailyKm: string;
  budget: string;
  charging: string;
  progress: string;
  nextStep: string;
};

export const demoRequests: DemoRequest[] = [
  {
    id: "YC-001",
    kind: "installment",
    vehicle: "Xe X Lite",
    purpose: "Đi học",
    dailyKm: "25 km/ngày",
    budget: "20 triệu đồng",
    charging: "Có chỗ sạc tại nhà",
    progress: "Đã khai nhu cầu và xem gợi ý xe",
    nextStep: "Nhân viên kiểm tra điều kiện trả góp với khách",
  },
  {
    id: "YC-002",
    kind: "deposit",
    vehicle: "Xe X City",
    purpose: "Đi làm",
    dailyKm: "30 km/ngày",
    budget: "30 triệu đồng",
    charging: "Có thể sạc tại nơi làm",
    progress: "Đã chọn xe quan tâm",
    nextStep: "Nhân viên xác nhận thông tin cọc mô phỏng",
  },
  {
    id: "YC-003",
    kind: "installment",
    vehicle: "Chưa chọn xe",
    purpose: "Giao hàng",
    dailyKm: "Chưa có",
    budget: "35 triệu đồng",
    charging: "Chưa xác định",
    progress: "Đã khai mục đích và ngân sách",
    nextStep: "Hỏi thêm quãng đường và chỗ sạc trước khi tư vấn",
  },
];
