# US-010 — tạo yêu cầu cọc mô phỏng

- **Một việc:** khách chọn xe, điểm tiếp nhận và số tiền cọc để tạo yêu cầu chờ nhân viên.
- **Nghiệm thu demo:** không thu tiền; số tiền hợp lệ; yêu cầu được đánh dấu minh họa và xem lại trong phiên.
- **Bố cục:** theo trang đặt xe VinFast: thanh chọn mẫu hẹp + ảnh xe lớn bên trái, cột bước/chọn xe/yêu cầu bên phải trên desktop; mobile xếp dọc. Bước cuối chỉ là trạng thái yêu cầu demo, không vẽ thanh toán thật.
- **Nghiệm thu API:** `POST /api/v1/leads/deposit` với auth khách, cấu hình số tiền từ backend và mã yêu cầu thật.
