# Kế hoạch frontend — rút gọn về P0

**Đích:** Demo 1 chạy chatbot hỏi nhu cầu từng lượt → đề xuất có nguồn → giải thích → so sánh chi phí. Giữ các thành phần P0 dùng được, thêm đúng một trang nhân viên demo theo yêu cầu; spec vẫn là chuẩn nghiệm thu. [Spec P0](../specs/frontend-mvp.md) là điều kiện nghiệm thu.

**Trạng thái hiện tại:** đã đổi trang tư vấn thành chatbot demo P0 có state trong phiên; catalog và phép tính dùng fixture/giả định có nhãn minh họa. Trước khi nối backend thật, chốt wireframe, schema/đơn vị/lỗi API, nguồn catalog và giả định chi phí.

| Thứ tự | Task một US | Xong khi |
| --- | --- | --- |
| 1 | [US-001](../tasks/US-001-intake.md) | Hỏi từng lượt, giữ state, hỏi lại giá trị sai; bắt đầu lại được. |
| 2 | [US-002](../tasks/US-002-catalog-source.md) | Catalog xếp/lọc theo mẫu xe, có nguồn/ngày hoặc nhãn minh họa; link chính thức chỉ khi đúng mẫu. |
| 3 | [US-014](../tasks/US-014-grounded-numbers.md) | Không render số liệu vô căn cứ. |
| 4 | [US-003](../tasks/US-003-recommendation.md) | 1–3 xe có lý do, xử lý không có xe. |
| 5 | [US-004](../tasks/US-004-battery-range.md) | Giải thích thông số kèm điều kiện. |
| 6 | [US-013](../tasks/US-013-out-of-scope.md) | Ngoài phạm vi được từ chối/chuyển người. |
| 7 | [US-006](../tasks/US-006-cost.md) | Có chi phí/km, tháng và giả định. |
| 8 | [US-015](../tasks/US-015-estimate-warning.md) | Ước tính có nhãn ngay cạnh kết quả. |
| 9 | [US-027](../tasks/US-027-responsive.md) | Luồng tiếng Việt dùng được trên màn hình nhỏ. |

**Cổng Demo 1 còn thiếu:** chốt schema `POST /chat` và state phiên với backend; thay bộ điều khiển demo bằng API Agent/RAG có nguồn; kiểm tra desktop/mobile, bàn phím, input sai, không kết quả, ngoài phạm vi, mạng lỗi/timeout và build; đối chiếu bộ eval. Ghi rõ phần fixture, API đã tích hợp và bằng chứng test. Trang nhân viên demo được ưu tiên xem trước theo yêu cầu; bốn US liên quan vẫn chưa đạt điều kiện vận hành. Các phần P1/P2 khác mở sau cổng P0.

**Một trang nhân viên:** US-021 hàng đợi → US-026 tóm tắt bàn giao → US-009 quyết định trả góp → US-011 xử lý cọc; mỗi US có một file task riêng ở `tasks/`. UI demo dùng hồ sơ giả và state tạm. Trước nghiệm thu thật: có luồng tạo yêu cầu từ khách, xác thực nhân viên, giới hạn theo cửa hàng, API lưu quyết định và trả trạng thái cho khách.

**Bổ sung theo sơ đồ kiến trúc:** [phân vai frontend/API](../docs/frontend-architecture.md). Đã nối bản xem trước chat → nhân viên cho [US-026](../tasks/US-026-handoff-summary.md) bằng dữ liệu ẩn danh cùng tab. Tiếp theo vẫn là chốt contract SSE/catalog, rồi tích hợp lần lượt chat → xe/nguồn → chi phí → hàng đợi có auth; không bật luồng P1 bằng dữ liệu giả như đã hoàn tất.