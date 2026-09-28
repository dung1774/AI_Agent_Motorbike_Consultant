# US-019 — tiếp tục hội thoại

- **Một việc:** khách mở lại phiên tư vấn của chính mình mà không khai lại nhu cầu.
- **Nghiệm thu demo:** chỉ giữ state trong tab; bắt đầu lại xóa state; không gọi đây là lịch sử server.
- **Nghiệm thu API:** dùng `conversation_id` và `GET /api/v1/chat/conversations/{id}` sau khi có auth/owner check.
