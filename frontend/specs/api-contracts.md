# API contracts — khung cần chốt với backend

**Trạng thái:** đề xuất, chưa phải endpoint tư vấn đã triển khai. `/api/v1/chat` trong backend hiện là ví dụ trả lời mẫu, chưa có state/catalog/nguồn. Frontend demo dùng bộ điều khiển hội thoại cục bộ; khi có agent thật, thay qua service adapter.

| Nhu cầu P0 | Input tối thiểu | Output tối thiểu | Lỗi cần xử lý |
| --- | --- | --- | --- |
| Chat tư vấn | `conversationId?`, `message`, profile hiện có | `conversationId`, tin trả lời, profile cập nhật, câu hỏi tiếp theo hoặc đề xuất kèm nguồn | câu sai/thiếu, ngoài phạm vi, timeout, mất kết nối |
| Lấy catalog | bộ lọc mẫu/phiên bản tùy chọn | ID, tên/phiên bản, thông số, `source`, `updatedAt` | không có dữ liệu, nguồn thiếu/cũ, mạng lỗi |
| Nhận đề xuất | profile đủ mục đích, km/ngày, ngân sách, chỗ sạc | 1–3 ID xe, lý do, giải thích, nguồn/giới hạn | không phù hợp, nguồn không hợp lệ, timeout |
| So sánh chi phí | km/ngày, ngày/tháng, giá và mức tiêu hao | điện/xăng theo km và tháng, chênh lệch, giả định dùng | tham số không hợp lệ, timeout |

**Trước khi tích hợp:** FE và BE thống nhất route, schema, state phiên, đơn vị (`VND`, `km`, `kWh`, `lít`), mã lỗi, chính sách nguồn cũ và timeout. Không dùng endpoint scaffold như agent Xe X đã hoàn chỉnh. Các hành động HITL thuộc contract riêng ở P1 và phải kiểm quyền ở backend.


## Đối chiếu với architecture_diagram.md được cung cấp (đề xuất, chưa triển khai)

- Prefix `/api/v1`: `GET /vehicles` công khai trả danh sách; `GET /vehicles/{id}` công khai trả chi tiết, nguồn và ngày cập nhật. FE cần map schema snake_case sang `Vehicle` trước khi thay mock service.
- Đề xuất bổ sung `official_url?: string | null` vào `VehicleDetail` (và summary nếu muốn mở link từ thẻ). URL phải trỏ trực tiếp đến **đúng mẫu xe** trên tên miền VinFast chính thức, do catalog/backend cung cấp và được xác minh; FE không đoán URL từ tên xe. FE chỉ hiện link khi URL hợp lệ; mẫu Xe X giả hiện không có link tương ứng.
- `POST /chat` dự kiến stream SSE và có `conversation_id`, `sources`, `warnings`; định dạng event, auth, lỗi và fallback còn phải chốt. `POST /vehicles/cost-compare` trong sơ đồ yêu cầu Customer/Staff, khác công cụ chi phí công khai hiện tại; chưa nối API khi chưa thống nhất quyền.
- `GET /leads`, `GET /leads/{id}` và `PATCH /leads/{id}/review` là P1/HITL; chỉ dùng sau khi backend có JWT và kiểm quyền theo cửa hàng. Trang `/staff` hiện vẫn là demo dữ liệu giả.

## Chuẩn bị kết nối cho luồng đầy đủ

`src/services/proposed-api.ts` chứa DTO và đường dẫn dự kiến cho auth, chat, xe, so sánh, chi phí, leads và cửa hàng; `requestProposedApi` xử lý JSON, Bearer token và timeout. UI vẫn chạy demo và **chưa gọi** client này. Chat SSE cần chốt tên event, payload từng chunk, kết thúc và lỗi trước khi viết parser; không dùng `EventSource` mặc định cho POST có JWT. Bộ schema trong file kiến trúc mới là bản nháp; phải xác nhận với backend trước khi bật.
