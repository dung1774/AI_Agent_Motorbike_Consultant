# US-013 — câu hỏi ngoài phạm vi

- **Mục tiêu:** khách không nhận câu trả lời suy đoán ngoài catalog Xe X.
- **Việc frontend:** hiển thị lời từ chối ngắn trong chat và hướng dẫn hỏi nhân viên khi cần xác minh.
- **Nghiệm thu:** không hiện thông số của hãng/xe ngoài phạm vi; demo chỉ trả lời các kịch bản catalog được nhận diện rõ và từ chối câu khác.
- **Phụ thuộc:** backend/agent phải xác định phạm vi và guardrail trước khi tích hợp thật; logic demo không thay thế kiểm soát này.
