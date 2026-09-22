import type { SalesLead } from "@/lib/types";

export const initialLeads: SalesLead[] = [
  { id: "LD-1024", customerName: "Minh Anh", phone: "09•• ••• 482", purpose: "Đi làm", budgetLabel: "20–30 triệu", dailyKm: 30, interestedVehicleIds: ["xe-x-city", "xe-x-flow"], summary: "Ưu tiên chi phí hợp lý, đi 30 km/ngày và có thể sạc tại nhà. Muốn trao đổi với người thật trước khi quyết định.", unresolvedQuestions: ["Điều kiện sạc tại nơi ở chưa xác nhận", "Muốn biết phương án trả góp phù hợp"], status: "new", createdAt: "Hôm nay, 09:42" },
  { id: "LD-1025", customerName: "Quốc Huy", phone: "08•• ••• 126", purpose: "Giao hàng", budgetLabel: "30–45 triệu", dailyKm: 85, interestedVehicleIds: ["xe-x-flow"], summary: "Chạy giao hàng 80–90 km/ngày, cần xác nhận khả năng sạc giữa ca và lịch lái thử.", unresolvedQuestions: ["Chưa chọn cửa hàng", "Cần kiểm tra xe có sẵn"], status: "contacted", createdAt: "Hôm qua, 16:20" },
  { id: "LD-1026", customerName: "Thu Trang", phone: "03•• ••• 908", purpose: "Đi học", budgetLabel: "Dưới 20 triệu", dailyKm: 18, interestedVehicleIds: ["xe-x-lite"], summary: "Sinh viên cần xe gọn nhẹ và muốn phụ huynh cùng nghe tư vấn trả góp.", unresolvedQuestions: ["Cần hẹn giờ gọi cùng phụ huynh"], status: "new", createdAt: "Thứ sáu, 14:05" },
];
