# Backlog frontend

**Quy tắc:** mỗi dòng là một User Story, một file task. P0 phải nghiệm thu trước P1/P2. Mã US lấy từ Excel quản lý dự án; đây là backlog riêng của frontend, không thay file nhóm.

| Thứ tự | US | Mức | Nhiệm vụ | Phụ thuộc |
| --- | --- | --- | --- | --- |
| 1 | US-001 | P0 | [Hỏi nhu cầu qua chat](../tasks/US-001-intake.md) | Contract profile |
| 2 | US-002 | P0 | [Catalog có nguồn](../tasks/US-002-catalog-source.md) | Nguồn/schema catalog |
| 3 | US-014 | P0 | [Số liệu có căn cứ](../tasks/US-014-grounded-numbers.md) | US-002, quy tắc nguồn |
| 4 | US-003 | P0 | [Đề xuất xe](../tasks/US-003-recommendation.md) | US-001–002 |
| 5 | US-004 | P0 | [Giải thích pin/sạc/quãng đường](../tasks/US-004-battery-range.md) | US-002 |
| 6 | US-013 | P0 | [Câu ngoài phạm vi](../tasks/US-013-out-of-scope.md) | Contract phản hồi agent |
| 7 | US-006 | P0 | [So sánh chi phí](../tasks/US-006-cost.md) | Giả định và công thức |
| 8 | US-015 | P0 | [Cảnh báo ước tính](../tasks/US-015-estimate-warning.md) | US-004, US-006 |
| 9 | US-027 | P0 | [Web tiếng Việt, responsive](../tasks/US-027-responsive.md) | Các màn hình P0 |

**Cổng Demo 1:** chốt wireframe/contract trước khi code; sau 9 US, kiểm tra luồng từ đầu tới cuối, lỗi/timeout, màn hình nhỏ và build. Đây là bước nghiệm thu chung, không gộp vào một User Story.

**Trang nhân viên ưu tiên xem trước (dữ liệu giả):** [US-021 — một màn hình hàng đợi](../tasks/US-021-employee-screen.md), [US-026 — tóm tắt bàn giao](../tasks/US-026-handoff-summary.md), [US-009 — quyết định trả góp](../tasks/US-009-installment-review.md), [US-011 — xử lý cọc](../tasks/US-011-deposit-review.md). Bốn task độc lập cùng được thể hiện trên `/staff`; UI demo không nghiệm thu đăng nhập, phân quyền, đồng bộ hồ sơ hoặc lưu quyết định.

**Sau P0:** P1 = US-005, 007–012, 021, 026; P2 = lịch sử, dashboard và cá nhân hóa sâu theo `specs/features.md`. Hoàn thiện từng US với API và bảo vệ quyền rồi mới nghiệm thu; không gộp nhiều US trong một file.

**Phạm vi được mở rộng theo yêu cầu mới:** đã có [spec](../specs/frontend-full-flow.md) và [kế hoạch luồng đầy đủ](frontend-full-flow.md) cho bản demo UI của US-005, 007, 008, 010, 012, 019, 020, 022 cùng các US nhân viên. Trạng thái P1/P2 ở trên vẫn là mốc nghiệm thu API/vận hành, không phải cấm dựng demo sớm.

**Bổ sung frontend theo phản hồi UI (không phải mã từ Excel):** [US-028 — lối vào demo theo vai trò](../tasks/US-028-demo-access.md). Tách `/staff` và responsive tiếp tục thuộc US-021 và US-027; không gộp chúng vào US-028.

