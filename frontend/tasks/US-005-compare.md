# US-005 — so sánh nhiều mẫu xe

- **Một việc:** khách chọn 2–3 mẫu, xem giá, pin, sạc, quãng đường và chi phí điện/km trên cùng giả định.
- **Nghiệm thu demo:** chỉ so sánh dữ liệu minh họa có nhãn/nguồn; giá điện và phép tính được nêu rõ; thiếu nguồn thì không hiện số như đã xác minh.
- **Nghiệm thu API:** dùng `POST /api/v1/vehicles/compare` sau khi có auth và schema; xử lý tải, rỗng, lỗi.
