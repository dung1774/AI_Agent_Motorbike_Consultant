# US-022 — bảo vệ dữ liệu cá nhân ở frontend

- **Một việc:** chỉ thu và hiển thị dữ liệu cần cho từng bước; nêu rõ dữ liệu nào lưu/gửi đi.
- **Nghiệm thu demo:** chat chặn CCCD; lối vào demo không hỏi số điện thoại hoặc mật khẩu khi chưa có auth API; yêu cầu demo chỉ chứa xe/giả định, lưu trong tab; vai trò demo không được gọi là bảo mật.
- **Nghiệm thu API:** token/PII và lịch sử chỉ hiển thị theo quyền backend; xử lý 401/403, xóa phiên, không gửi PII vào LLM.
