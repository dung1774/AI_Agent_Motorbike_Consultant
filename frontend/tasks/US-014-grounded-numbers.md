# US-014 — chặn số liệu không có căn cứ

- **Mục tiêu:** số liệu trình bày cho khách truy được catalog hoặc tool.
- **Việc frontend:** chỉ render thông số khi payload có bản ghi nguồn/nhãn minh họa hợp lệ; báo thiếu căn cứ thay vì điền số dự phòng.
- **Nghiệm thu:** dữ liệu thiếu nguồn không xuất hiện như thông số đã xác minh.
- **Phụ thuộc:** backend kiểm soát dữ liệu và quyền tool; frontend chỉ là lớp hiển thị bổ sung.
