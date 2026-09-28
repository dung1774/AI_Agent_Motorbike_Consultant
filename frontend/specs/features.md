# Danh mục tính năng frontend

Mỗi dòng P0 là một User Story và tương ứng **một file** trong `tasks/`. [Spec P0](frontend-mvp.md) là chuẩn nghiệm thu; [backlog](../planning/backlog.md) xác định thứ tự.

| US | Mức | Một nhiệm vụ | Điều kiện đạt |
| --- | --- | --- | --- |
| US-001 | P0 | Hỏi nhu cầu qua chat | Hỏi từng lượt 4 thông tin; hỏi lại câu sai và cho bắt đầu lại. |
| US-002 | P0 | Catalog có nguồn | Thông số có nguồn/ngày hoặc nhãn minh họa. |
| US-003 | P0 | Đề xuất xe | 1–3 lựa chọn có lý do; xử lý không có xe. |
| US-004 | P0 | Giải thích pin/sạc/quãng đường | Có điều kiện sử dụng và giới hạn. |
| US-006 | P0 | So sánh chi phí | Theo km/tháng, giả định rõ, input hợp lệ. |
| US-013 | P0 | Câu ngoài phạm vi | Từ chối hoặc chuyển nhân viên, không suy đoán. |
| US-014 | P0 | Số liệu có căn cứ | Không hiện số vô nguồn như số đã xác minh. |
| US-015 | P0 | Cảnh báo ước tính | Cảnh báo gần số ước tính. |
| US-027 | P0 | Chat web tiếng Việt, responsive | Tin nhắn, ô nhập và kết quả dùng được trên màn hình nhỏ và khi lỗi. |

**P1 sau Demo 1:** US-005, 007–012, 021, 026 (so sánh nhiều xe, trả góp, HITL, cọc mô phỏng, cửa hàng). **P2 sau P1:** lịch sử/cá nhân hóa, dashboard, tối ưu phân khúc. Đã tạo riêng task US-009, US-011, US-021, US-026 và làm bản xem trước một trang nhân viên bằng dữ liệu giả; các điều kiện vận hành P1 vẫn còn. Với US khác, khi lên lịch tạo một file task cho từng US; không gộp.

Theo yêu cầu mở rộng, UI demo của các luồng trên và lịch sử đã được đưa vào [spec đầy đủ](frontend-full-flow.md). Mức P1/P2 còn thể hiện điều kiện tích hợp API, xác thực và nguồn dữ liệu thật.

