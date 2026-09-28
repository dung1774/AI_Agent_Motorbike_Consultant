# ADR-0002 — Tech stack frontend P0

- **Trạng thái:** Chấp nhận cho P0.
- **Bối cảnh:** Người dùng yêu cầu giữ phần code P0 dùng được và bỏ các màn hình ngoài phạm vi.
- **Quyết định:** Giữ Next.js 15.5.10, React 19.1.1 và TypeScript đang có; không thêm thư viện. Dùng App Router và CSS hiện tại đã được rút gọn.
- **Lý do:** Dùng được các route P0 hiện có, giữ lockfile và giảm công sức chuyển stack. Quyết định này không đồng nghĩa backend/AI đã tích hợp.
- **Hệ quả:** Chạy typecheck, build và kiểm tra luồng P0 sau thay đổi. Contract API vẫn cần chốt trước khi thay fixture.
