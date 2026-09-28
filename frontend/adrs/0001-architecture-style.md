# ADR-0001 — Tách frontend và backend qua contract

- **Trạng thái:** Đề xuất.
- **Bối cảnh:** Demo 1 cần frontend độc lập về trình bày nhưng dữ liệu catalog, đề xuất và phép tính phải có căn cứ.
- **Quyết định đề xuất:** UI dùng service adapter có kiểu dữ liệu; backend sở hữu nguồn catalog/quy tắc đề xuất, tool code sở hữu phép tính. UI không tự tạo thông số hoặc quyết định HITL.
- **Hệ quả:** chốt [contract](../specs/api-contracts.md) trước tích hợp; fixture chỉ để phát triển và phải gắn nhãn minh họa.
- **Cần chốt:** schema/route, nơi chạy phép tính trong Demo 1, cách xử lý nguồn cũ và timeout.
