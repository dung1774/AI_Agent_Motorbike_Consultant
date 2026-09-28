# Xe X frontend — luồng demo theo kiến trúc

Frontend có luồng khách từ tư vấn, catalog, so sánh, chi phí, trả góp/cọc mô phỏng, cửa hàng, lịch sử đến màn hình nhân viên riêng tại `/staff`. Trang chủ giữ nội dung chính và đã cải thiện bố cục. Các trang đăng nhập/đăng ký chỉ có nút vào demo khách; `/staff/login` có nút vào demo nhân viên. Chưa có tài khoản, phân quyền hay API auth thật. [Spec luồng đầy đủ](specs/frontend-full-flow.md) và [kế hoạch](planning/frontend-full-flow.md) ghi các bước nghiệm thu.

## Bắt đầu

Đọc [WORK_STATUS.md](WORK_STATUS.md) → [AGENTS.md](AGENTS.md) → [spec luồng đầy đủ](specs/frontend-full-flow.md) → [kế hoạch](planning/frontend-full-flow.md). Mỗi User Story có [một file task riêng](tasks/README.md).

## Chạy trên Windows

Mở PowerShell tại thư mục frontend:

    pnpm install --frozen-lockfile
    pnpm dev

Mở URL Local do Next.js in ra, thường là http://localhost:3000. Kiểm tra bằng pnpm run typecheck và pnpm run build. Nếu cổng 3000 bận, chạy pnpm exec next dev -p 3001. Dự án dùng Next.js 15.5.10, React 19.1.1 theo package.json; không cần cài Next.js toàn cục.

`pnpm dev` biên dịch mỗi route ở lần mở đầu. Dev giữ tối đa 12 route đã xem và cache điều hướng trong 10 phút để khi quay lại không phải biên dịch/tải dữ liệu trang lần nữa. Dev dùng cache `.next-dev`, còn `pnpm run build`/`pnpm start` dùng `.next`, nên hai chế độ không ghi đè cache của nhau. Muốn đánh giá tốc độ bản chạy thực tế, dùng `pnpm run build` rồi `pnpm start`.

## Ranh giới dữ liệu

Bản demo chạy độc lập bằng src/data/mock/vehicles.ts và src/services/mock-services.ts. Giá, pin, sạc, quãng đường và giả định điện/xăng là minh họa; chưa kết nối catalog chính hãng, FastAPI hoặc LLM. Bộ lọc đề xuất dùng mục đích, ngân sách và so sánh quãng đường công bố với km/ngày; đây là logic demo, không bảo đảm quãng đường thực tế. Chatbot demo nhận câu trả lời từng lượt, giữ profile trong trang đang mở, trả lời những câu hỏi catalog nhận diện rõ và từ chối câu khác. Đây là logic theo quy tắc, chưa có LLM/RAG, phân loại tự do tin cậy hoặc chuyển nhân viên thật. Chi tiết xe chỉ có nút mở trang VinFast khi bản ghi chứa URL chính thức đến đúng mẫu; bốn xe Xe X hiện là giả nên không có nút này.

Code theo Next.js App Router ở src/app; UI theo tính năng ở src/features; kiểu dữ liệu và phép tính ở src/lib. API contract dự kiến nằm trong [specs/api-contracts.md](specs/api-contracts.md). Yêu cầu trả góp/cọc chỉ lưu ẩn danh trong `sessionStorage` và có trạng thái demo; nhân viên xem/xử lý trong cùng tab. Chưa có JWT, nguồn cửa hàng, API hàng đợi hoặc quyết định thật.

## Đối chiếu kiến trúc

Xem [kiến trúc frontend](docs/frontend-architecture.md) để biết UI nào tương ứng API dự kiến và trạng thái thực tế. Từ gợi ý trong chat có thể mở bản bàn giao demo ẩn danh tại `/staff` qua lối vào `/staff/login`; bản này chỉ nằm trong tab, không tạo lead hay gửi cho nhân viên.
