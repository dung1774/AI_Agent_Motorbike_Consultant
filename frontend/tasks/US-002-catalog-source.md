# US-002 — catalog có nguồn

- **Mục tiêu:** khách tra thông số theo mẫu và phiên bản.
- **Việc frontend:** hiện danh sách xếp theo tên mẫu, tìm tên/phiên bản và lọc theo mẫu (không theo cách dùng); hiện giá, pin, sạc, quãng đường cùng nguồn và ngày cập nhật; dữ liệu chưa xác nhận có nhãn minh họa; chi tiết xe chỉ hiện link tới đúng trang sản phẩm VinFast khi bản ghi có URL chính thức đã xác minh.
- **Nghiệm thu:** lọc mẫu xe và tìm tên hoạt động cùng nhau; danh sách tên mẫu theo thứ tự A–Z; không hiển thị số liệu thiếu nguồn/nhãn; có trạng thái tải, rỗng, lỗi và thử lại khi thật sự cần tải; dữ liệu demo có sẵn không thêm thời gian chờ giả; không gán link sản phẩm thật cho mẫu Xe X giả hoặc tự suy URL từ tên.
- **Bố cục:** dùng ảnh xe demo riêng từng mẫu dạng ảnh sản phẩm; tên/phiên bản, giá demo và thông số chính phải quét nhanh được trên desktop/mobile; giữ nguồn và ngày cập nhật cạnh thẻ.
- **Chi tiết xe:** mở trang riêng `/vehicles/[id]` từ catalog hoặc gợi ý chat; ảnh xe chiếm phần lớn hero nền sáng như trang sản phẩm VinFast, tên mẫu/tagline phía dưới, ba thông số chính, bảng chi tiết, nguồn/ngày cập nhật và CTA cọc/trả góp có sẵn mẫu xe. Không dùng lớp phủ trong thẻ. URL không tồn tại trả 404.
- **Phụ thuộc:** schema catalog và nguồn dữ liệu được team chốt.
