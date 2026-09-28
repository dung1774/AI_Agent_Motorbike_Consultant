# US-009 — nhân viên duyệt hoặc từ chối trả góp

- **Mục tiêu:** quyết định trả góp chỉ do nhân viên thực hiện trong hàng đợi HITL.
- **Việc frontend trước mắt:** trên hồ sơ trả góp giả, hiển thị tóm tắt và nút quyết định mô phỏng; trạng thái đổi trong bộ nhớ trang.
- **Nghiệm thu UI demo:** chỉ yêu cầu trả góp có hai quyết định; nhãn giải thích rõ không có duyệt tín dụng, lưu hồ sơ hay thông báo thật.
- **Chưa nghiệm thu vận hành:** xác thực nhân viên, kiểm quyền backend, lưu quyết định và phản hồi cho khách.
- **Bổ sung demo:** yêu cầu trả góp từ `/installment` vào hàng đợi cùng tab; nhân viên demo đổi `pending_review` sang duyệt/từ chối; khách xem nhãn trạng thái trên `/history`. Quyết định không gửi máy chủ.
