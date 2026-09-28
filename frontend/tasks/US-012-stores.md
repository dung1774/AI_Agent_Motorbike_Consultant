# US-012 — tìm cửa hàng

- **Một việc:** tìm và chọn cửa hàng theo khu vực/vị trí, xem địa chỉ và liên hệ khi dữ liệu đã xác minh.
- **Nghiệm thu demo:** điểm minh họa được ghi rõ là không phải địa chỉ showroom; có trạng thái không kết quả.
- **Bố cục:** theo trang tìm showroom VinFast: bộ lọc và danh sách ở cột trái, vùng bản đồ ở cột phải; mobile xếp dọc. Khi chưa có tọa độ API, vùng bản đồ là trạng thái chờ có nhãn, không vẽ ghim/địa chỉ giả.
- **Nghiệm thu API:** `GET /api/v1/stores` với `lat`, `lng`, `radius`; xử lý không cấp vị trí, lỗi và dữ liệu thiếu.
