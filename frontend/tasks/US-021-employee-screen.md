# US-021 — một màn hình nhân viên

- **Mục tiêu:** nhân viên thấy hàng đợi thuộc cửa hàng được phân công.
- **Việc frontend trước mắt:** route `/staff` với layout riêng hiển thị hồ sơ giả, chọn hồ sơ và trạng thái, nhãn demo rõ ràng; `/employee` chuyển hướng đến `/staff`.
- **Nghiệm thu UI demo:** xem được hàng đợi, chọn hồ sơ, biết loại yêu cầu và trạng thái; dùng được trên mobile/bàn phím.
- **Chưa nghiệm thu vận hành:** đăng nhập, phân quyền theo cửa hàng, API hàng đợi; không đưa hồ sơ thật lên trang công khai.

- **Bổ sung demo:** vai trò nhân viên được chọn ở `/staff/login`; chỉ vai trò này thấy nút đổi trạng thái và yêu cầu ẩn danh vừa tạo trong tab. Đây không phải phân quyền thật.
