# US-008 — tạo yêu cầu trả góp

- **Một việc:** khách xác nhận phương án và tạo yêu cầu `pending_review`.
- **Nghiệm thu demo:** chỉ lưu hồ sơ ẩn danh trong phiên trình duyệt; không thu CCCD/SĐT, không tự duyệt hoặc gọi đây là hồ sơ thật.
- **Nghiệm thu API:** `POST /api/v1/leads/installment` với auth khách, chống gửi trùng, lỗi/thử lại và trả mã/trạng thái từ server.
