# Kiến trúc frontend Xe X

**Nguồn:** `C:/Users/DELL/Downloads/architecture_diagram.md` là kiến trúc **dự kiến**. Frontend chỉ sở hữu tầng Web; FastAPI, Agent, guardrails, DB và phân quyền ở backend.

| Luồng | Web cần hiển thị | API dự kiến | Hiện tại |
| --- | --- | --- | --- |
| Tư vấn khách | Chat tiếng Việt, state phiên, gợi ý có nguồn, cảnh báo, lỗi/thử lại | `POST /api/v1/chat` (SSE), hội thoại | Kịch bản demo lưu trong tab; chưa dùng Agent |
| Mẫu xe | Danh sách theo tên mẫu, chi tiết nguồn/ngày và link chính thức đúng mẫu | `GET /api/v1/vehicles`, `GET /api/v1/vehicles/{id}` | Bốn xe giả; chưa có endpoint catalog |
| Chi phí | Nhập giả định, tính bằng code, cảnh báo ước tính | `POST /api/v1/vehicles/cost-compare` | Phép tính demo cục bộ; quyền API chưa chốt |
| So sánh/trả góp | 2–3 xe trên cùng tiêu chí; phương án trả góp có giả định | `POST /api/v1/vehicles/compare`, lead installment | UI và phép tính demo; chưa có API |
| Bàn giao/nhân viên | Tóm tắt nhu cầu, hàng đợi và quyết định có trạng thái | `GET /api/v1/leads`, `PATCH /api/v1/leads/{id}/review` | Yêu cầu ẩn danh cùng tab + hồ sơ giả; chưa gửi/lưu/duyệt thật |
| Đăng nhập/cọc/cửa hàng/lịch sử | Vai trò khách/nhân viên, cọc mô phỏng, tìm khu vực và xem trạng thái | Auth, leads, stores, conversations | Có route demo; chưa có xác thực, địa chỉ cửa hàng hay lịch sử server |

## Cấu trúc mã

- `src/app/`: route và layout; khách có `/`, `/advisor`, `/vehicles`, `/compare`, `/cost`, `/installment`, `/deposit`, `/stores`, `/history`, `/login`, `/register`; nhân viên có `/staff` và `/staff/login`, còn `/employee` chuyển hướng tương thích.
- `src/features/`: UI theo nghiệp vụ, không tự tạo dữ liệu nguồn hay quyền.
- `src/lib/`: kiểu dữ liệu, logic tính chi phí và state demo; `src/services/`: ranh giới giữa fixture và API sau này; `src/data/mock/`: chỉ chứa minh họa.
- `specs/` → `tasks/US-*.md` → `planning/` là đường dẫn từ yêu cầu đến từng việc. Mỗi US có một file task.

## Cổng nối API

Backend hiện chỉ có `POST /api/v1/chat` scaffold trả JSON `response/analysis` và `GET /api/v1/status`; chưa có SSE/state phiên, catalog, auth hoặc leads. Trước khi bật API trong UI cần chốt event SSE, schema nguồn/ngày/`official_url`, mã lỗi, timeout, token và quyền staff. Không cho trạng thái `ready` của scaffold được hiểu là Agent tư vấn đã chạy đủ luồng.

State demo dùng `sessionStorage` của tab đang mở; bản bàn giao/yêu cầu chỉ chứa nhu cầu, xe và giả định tài chính, không chứa tên/SĐT/CCCD. Vai trò demo không phải bảo mật. Nhân viên phải xác minh lại trước mọi quyết định. Dữ liệu không đồng bộ giữa người dùng/thiết bị.
