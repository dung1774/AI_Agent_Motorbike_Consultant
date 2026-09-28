# Kế hoạch frontend theo kiến trúc đầy đủ

**Thứ tự một US một việc:** giữ P0 đang có → [US-005](../tasks/US-005-compare.md) → [US-007](../tasks/US-007-installment-estimate.md) → [US-008](../tasks/US-008-installment-request.md) → [US-012](../tasks/US-012-stores.md) → [US-010](../tasks/US-010-deposit-request.md) → [US-021](../tasks/US-021-employee-screen.md)/[US-026](../tasks/US-026-handoff-summary.md) → [US-020](../tasks/US-020-history.md)/[US-019](../tasks/US-019-resume-chat.md). Mỗi mục có file task riêng; [spec đầy đủ](../specs/frontend-full-flow.md) là chuẩn.

**Mốc demo:** mọi route dùng fixture/logic cục bộ có nhãn và chạy từ đầu tới cuối, không thu tiền/CCCD, không giả vờ bảo mật bằng role ở browser. **Mốc tích hợp:** chốt schema/event SSE và JWT, map API theo `specs/api-contracts.md`, thay từng service khi backend thật có endpoint, test quyền chéo và lỗi mạng. Không gọi mốc demo là nghiệm thu API.

**Chỉnh UI theo phản hồi:** [US-028](../tasks/US-028-demo-access.md) tách hai lối vào demo → [US-021](../tasks/US-021-employee-screen.md) đưa hàng đợi sang `/staff`/header riêng → [US-027](../tasks/US-027-responsive.md) làm lại menu, màu chữ, khoảng trắng và kiểm tra desktop/390px. Sau đó typecheck/build và chạy thử vào vai khách/nhân viên cùng chuyển hướng `/employee`.

**Lượt UI hiện tại:** [US-027](../tasks/US-027-responsive.md) rút menu còn ba gạch → [US-002](../tasks/US-002-catalog-source.md) tăng độ rõ thẻ xe → [US-010](../tasks/US-010-deposit-request.md) thêm tóm tắt cọc → [US-012](../tasks/US-012-stores.md) làm lại tìm cửa hàng. Kiểm tra desktop/390px và build; dữ liệu vẫn là demo.

**Chi tiết sản phẩm theo VinFast:** tái hiện lỗi lớp phủ bị cắt → thay bằng route `/vehicles/[id]` trong US-002 → dựng hero/thông số/giá/CTA theo bố cục trang sản phẩm tham khảo → truyền mẫu sang cọc/trả góp → kiểm tra desktop/mobile, route sai, typecheck/build. Giữ Xe X demo và không ghép xe giả với URL VinFast thật.

**Trang tương ứng VinFast:** với US-012, chuyển danh sách điểm demo sang bố cục lọc/danh sách trái + vùng bản đồ phải; không đặt tọa độ/ghim giả. Giữ trang chủ theo yêu cầu trước, còn tư vấn chatbot và nhân viên dùng giao diện riêng vì VinFast không có hai luồng demo này.

**Lượt đối chiếu sâu 27/09:** US-028/020: đăng nhập demo giữa trang → `/account` với thanh bên/lịch sử, header đổi theo vai; US-002: ảnh xe demo từng mẫu và hero chi tiết rộng như sản phẩm VinFast; US-010: chọn mẫu/ảnh xe trái, bước yêu cầu phải; US-006: form trái, kết quả xanh phải. Sau mỗi phần kiểm tra PC/390px, giữ cùng dữ liệu demo và chạy typecheck/build. Chưa tuyên bố biết chính xác redirect của VinFast khi gửi form đăng nhập.
