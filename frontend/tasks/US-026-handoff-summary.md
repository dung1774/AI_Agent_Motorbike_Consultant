# US-026 — tóm tắt bàn giao

- **Mục tiêu:** nhân viên hiểu nhu cầu và bước khách đã hoàn thành trước khi liên hệ.
- **Việc frontend trước mắt:** trong trang `/staff`, hiển thị bản tóm tắt ẩn danh của hồ sơ giả: mục đích, ngân sách, quãng đường, xe quan tâm, bước tiếp theo.
- **Nghiệm thu UI demo:** thay hồ sơ đang chọn thì tóm tắt đổi tương ứng; thiếu dữ liệu phải được ghi là chưa có.
- **Chưa nghiệm thu vận hành:** bàn giao từ chat/API thật và quyền xem dữ liệu khách.

- **Bổ sung UI demo:** từ gợi ý ở chat, tạo bản tóm tắt ẩn danh trong `sessionStorage` cùng tab; `/staff` hiển thị mẫu xe, bốn nhu cầu, bước tiếp theo và cho xóa.
- **Nghiệm thu bổ sung:** chỉ xuất hiện sau khi khách chọn gợi ý; tải lại tab vẫn thấy, bắt đầu phiên tư vấn mới/xóa thì mất; không hiện như lead thật hoặc trạng thái đã gửi nhân viên.
