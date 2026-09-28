# ADR-0003 — Một repo, context ở gốc

- **Trạng thái:** Áp dụng cho khung tài liệu; vị trí code frontend mới sẽ chốt khi triển khai.
- **Bối cảnh:** team và AI cần đọc cùng một nguồn để không phân tán quyết định, phạm vi và tiến độ.
- **Quyết định:** `frontend/specs` giữ yêu cầu; `frontend/adrs` giữ quyết định; `frontend/planning` giữ backlog/sprint; `frontend/tasks` giữ việc có nghiệm thu; `frontend/src` là codebase hiện có; `frontend/docs` giữ hướng dẫn của phần frontend; `frontend/AGENTS.md` và `frontend/WORK_STATUS.md` ở gốc phần việc này.
- **Hệ quả:** các file liên kết theo mã US/task; không di chuyển hoặc xóa code hiện có chỉ để khớp hình minh họa. Các file nhóm ngoài `frontend/` không thuộc phạm vi chỉnh sửa.
