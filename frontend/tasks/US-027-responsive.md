# US-027 — web tiếng Việt, responsive

- **Mục tiêu:** khách dùng các màn hình P0 trên web tiếng Việt và màn hình nhỏ.
- **Việc frontend:** responsive cho transcript, ô nhập chat, thẻ xe và bảng chi phí; giữ khối giới thiệu trên trang chủ, bỏ khối giới thiệu lớn ở /advisor, /vehicles, /cost, /staff để vào chức năng chính ngay; dùng phông sans, màu chữ đủ tương phản; menu ở desktop/mobile chỉ hiện biểu tượng ba gạch, mở theo chiều dọc và có tên truy cập; trạng thái tải/lỗi/thử lại; điều hướng và nhãn có thể dùng bằng bàn phím.
- **Nghiệm thu:** không tràn ngang hoặc che hành động chính trên màn hình nhỏ; hộp chat ở đầu nội dung trang và có tiêu đề cấp 1; nhãn xanh đọc rõ ở desktop/mobile; đi hết luồng P0 bằng bàn phím; trang chi tiết mở từ liên kết và quay lại được; lỗi có đường thử lại. Chuyển route cuộn về đầu nội dung; header sticky không bị mất và console không còn cảnh báo auto-scroll/smooth-scroll của Next.js. Khi chạy `pnpm dev`, các trang mới xem được giữ trong bộ nhớ biên dịch và cache điều hướng 10 phút để quay lại không phải biên dịch/tải dữ liệu trang ngay; cache dev tách khỏi build.
- **Phụ thuộc:** các màn hình P0 hoàn thành; kiểm tra luồng đầu-cuối ở cổng Demo 1.
