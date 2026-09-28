# Frontend Xe X — spec P0

**Mục tiêu P0 sau khi rút gọn:** chatbot web tiếng Việt hỏi nhu cầu từng lượt, giữ state phiên → nhận 1–3 đề xuất có nguồn/lý do → hiểu thông số → so sánh chi phí. Thiết kế theo `P-148/Tài liệu/Brief.md`, `PRD.md`, workbook quản lý dự án (User Story, đặc tả, backlog, M4) và workbook Project Charter (phạm vi, mốc, rủi ro); giữ lại thành phần P0 có thể tái dùng và bỏ phần ngoài phạm vi. Ảnh workspace 2/4 là tham chiếu cấu trúc folder.

| US | Một việc frontend | Nghiệm thu |
| --- | --- | --- |
| US-001 | Chat hỏi lần lượt mục đích, km/ngày, ngân sách, chỗ sạc; nhớ câu trước và cho bắt đầu lại. | Thiếu/sai câu trả lời được hỏi lại; không hỏi lại dữ liệu đã có; chỉ đề xuất khi đủ bốn thông tin. |
| US-002 | Hiện catalog theo mẫu/phiên bản. | Tìm và lọc theo tên mẫu/phiên bản, danh sách xếp theo tên mẫu; không lọc theo cách dùng. Giá, pin, sạc, quãng đường có nguồn/ngày hoặc nhãn minh họa; chi tiết chỉ dẫn đến đúng trang xe VinFast khi có `official_url` đã xác minh; có tải/rỗng/lỗi. Dữ liệu demo có sẵn không thêm thời gian chờ giả. |
| US-003 | Hiện 1–3 xe và lý do theo nhu cầu. | Chỉ gợi ý xe hợp mục đích, ngân sách và cự ly; khi khó sạc ưu tiên quãng đường công bố cao hơn; không có xe được báo rõ. |
| US-004 | Giải thích pin, sạc, quãng đường. | Nêu điều kiện sử dụng; không cam kết quãng đường thực tế. |
| US-006 | So sánh chi phí điện/xăng. | Code/tool tính theo km và tháng, giả định chỉnh được; input sai bị chặn. |
| US-013 | Trong chat, từ chối câu ngoài phạm vi. | Từ chối ngắn/chuyển nhân viên; không trả lời suy đoán. |
| US-014 | Kiểm soát số liệu khi hiển thị. | Không hiện số thiếu nguồn như thông số đã xác minh; backend vẫn phải kiểm soát nguồn. |
| US-015 | Hiện cảnh báo ước tính. | Cảnh báo và giả định nằm cạnh quãng đường/chi phí ước tính. |
| US-027 | Chat web tiếng Việt, responsive và dùng được bằng bàn phím. | Dùng được trên màn hình nhỏ; trang chủ giữ khối giới thiệu; /advisor, /vehicles, /cost, /staff đi thẳng vào chức năng chính; chữ tiếng Việt dễ đọc, không viết hoa/giãn chữ quá mức; trạng thái tải/lỗi/thử lại rõ. Chuyển route cuộn đến nội dung đầu trang mà header sticky vẫn hoạt động, không có cảnh báo cuộn của Next.js. Trong `pnpm dev`, route đã xem gần đây không phải biên dịch lại ngay khi quay lại. |

**Ranh giới và cổng P0:** chatbot hiện là giao diện/kịch bản demo cục bộ, chỉ thu dữ liệu tối thiểu. Demo 1 chỉ đạt khi frontend nối API chat có state phiên, đề xuất từ catalog có nguồn, từ chối ngoài phạm vi và fallback lỗi/timeout theo [contract đề xuất](api-contracts.md); cần test tích hợp/eval trước khi gọi là AI Agent. Fixture không phải catalog chính hãng.

**Một trang nhân viên làm sớm theo yêu cầu:** `/staff` với layout riêng cho xem hàng đợi và tóm tắt hồ sơ minh họa; nhân viên đổi trạng thái trả góp/cọc trong bộ nhớ trang. Trang ghi rõ là demo, không có hồ sơ thật, đăng nhập, phân quyền hay quyết định được lưu. Đây là bản xem trước UI cho US-009, US-011, US-021, US-026, chưa nghiệm thu các US vận hành. Mỗi US có task riêng.

**Sau P0:** P1 hoàn thiện so sánh nhiều xe, tạo yêu cầu trả góp/cọc, xác thực/phân quyền và HITL thật, cửa hàng. P2 là lịch sử, dashboard và cá nhân hóa sâu. Ngoài phạm vi demo: thanh toán/cọc thật, tự duyệt tín dụng, CCCD, app native, ERP/CRM.

**Luồng hai giao diện theo kiến trúc dự kiến:** từ một gợi ý xe, khách có thể xem bản tóm tắt bàn giao demo ở `/staff` sau khi chọn vai nhân viên trong cùng tab. Bản tóm tắt chỉ gồm bốn nhu cầu và mẫu xe, có nút xóa; không tạo lead, không gửi dữ liệu và không thay thế xác thực nhân viên. Nghiệm thu vận hành US-026/021/009/011 vẫn phụ thuộc API và phân quyền. Xem [sơ đồ trách nhiệm frontend](../docs/frontend-architecture.md).
