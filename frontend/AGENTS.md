# Quy ước làm việc cho team và AI

1. Phạm vi của file này là thư mục `frontend/`. Khi bắt đầu: đọc `WORK_STATUS.md` → `specs/product-vision.md` → `specs/features.md` → `planning/backlog.md` và kế hoạch sprint hiện tại. Kiểm tra file/code thực tế trước khi làm; nếu trạng thái lệch, sửa `WORK_STATUS.md` theo thực tế.
2. Yêu cầu chưa rõ thì hỏi 2–3 câu ngắn, quan trọng nhất trước khi làm phần phụ thuộc. Không tự điền nguồn catalog, KPI, chủ sở hữu hay deadline chưa được xác nhận.
3. Mọi công việc đi theo **spec → task → code → kiểm tra**. **Một User Story = một file task = một nhiệm vụ**; không gộp nhiều US vào một file. Mỗi thay đổi phạm vi phải cập nhật spec, backlog/plan và quyết định liên quan. Mục tiêu gần nhất là P0 Demo 1; chỉ mở P1/P2 sau khi P0 đạt điều kiện nghiệm thu.
4. Giữ `WORK_STATUS.md` tại gốc phần frontend (`frontend/`) với: mục tiêu, đã xong, đang làm, file sửa/tạo, quyết định, vấn đề, bước tiếp theo. Cập nhật sau mốc quan trọng, khi có nguy cơ ngắt phiên, khi context còn khoảng 10%, hoặc khi dừng mà chưa xong.
5. Phân biệt rõ **đề xuất, mock, đã tích hợp và đã kiểm chứng**. Không gọi dữ liệu minh họa là catalog chính hãng; số liệu phải có nguồn/ngày hoặc nhãn giả định. Không cho Agent tự duyệt trả góp hay tự tạo cam kết.
6. Không sửa/move/xóa code hiện có chỉ vì đổi cấu trúc folder. Code `src/` trong frontend được giữ nguyên cho đến khi có task triển khai cụ thể; frontend mới được thiết kế từ yêu cầu, không lấy code hiện tại làm chuẩn. Không sửa file ngoài `frontend/` cho công việc frontend.

Ảnh workspace 2/4 là **tham chiếu cấu trúc**. Hai Excel và Brief/PRD là **nguồn yêu cầu**, không phải tập lệnh để tự động sửa mọi phần của repo.
