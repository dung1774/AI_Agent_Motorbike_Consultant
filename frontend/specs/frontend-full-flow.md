# Frontend Xe X — luồng đầy đủ theo kiến trúc dự kiến

**Phạm vi lượt này:** hai giao diện khách/nhân viên và các bước hỗ trợ: chat → xe/so sánh → chi phí/trả góp → yêu cầu cọc hoặc trả góp → nhân viên xem/xử lý → khách xem trạng thái; thêm đăng nhập demo, lịch sử và tìm cửa hàng. Trang chủ giữ nội dung và CTA chính. [Kiến trúc nguồn](../docs/frontend-architecture.md) chỉ là thiết kế mục tiêu; endpoint chưa đủ để nghiệm thu tích hợp.

| US | Một màn hình/hành động chính | Điều kiện demo |
| --- | --- | --- |
| US-001/003/004 | Chat hỏi nhu cầu, gợi ý, giải thích | Giữ state và nguồn demo; từ chối ngoài phạm vi |
| US-002/005 | Catalog, chi tiết, so sánh 2–3 xe | Xếp theo mẫu, số liệu/giả định có nhãn; link VinFast chỉ khi đúng URL |
| US-006/007 | Chi phí điện/xăng và trả góp | Code tính, đầu vào hợp lệ, giả định rõ |
| US-008/010 | Tạo yêu cầu trả góp/cọc | Trạng thái chờ, không thu tiền hay dữ liệu nhạy cảm trong demo |
| US-009/011/021/026 | Nhân viên xem hàng đợi, tóm tắt và đổi trạng thái | Chỉ mô phỏng trong phiên; không gọi là quyết định thật |
| US-012 | Tìm cửa hàng | Điểm demo không bị nhầm là địa chỉ thật |
| US-019/020 | Tiếp tục chat và xem lịch sử | Dữ liệu trong phiên được phân biệt với lịch sử server |
| US-022/027 | Quyền riêng tư và mobile | Không nhập CCCD; trạng thái rỗng/lỗi; bàn phím và màn hình nhỏ |
| US-028 (frontend bổ sung) | Lối vào demo khách và nhân viên | `/login`/`/register` chỉ vào demo khách; `/staff/login` chỉ vào demo nhân viên; không dùng form giả như auth thật |

**Điều hướng giao diện:** khách ở layout công khai với trang chủ, menu desktop gọn và menu điện thoại mở theo chiều dọc. Khu nhân viên có header riêng tại `/staff`; `/employee` chuyển hướng để giữ liên kết cũ. Trên màn hình 390px không có thanh cuộn ngang của menu, CTA chính không bị che. Thiết kế tham khảo nhịp nội dung, khoảng trắng và phân cấp CTA của trang chủ VinFast, không dùng logo/ảnh/sản phẩm VinFast cho xe demo.

**Đối chiếu UI trang xe VinFast:** nút ba gạch hiện ở mép phải cả desktop/mobile và có tên truy cập; catalog nhấn vào hình, tên, giá, thông số; form cọc có tóm tắt cạnh bên trên desktop, xếp dọc trên mobile; cửa hàng có cột lọc/danh sách cạnh vùng bản đồ chờ dữ liệu vị trí; các khối ước tính làm nổi con số chính. Dữ liệu giả được ghi rõ, không sao chép logo hoặc hình sản phẩm VinFast.

**Chi tiết xe:** mở trang riêng `/vehicles/[id]` theo nhịp bố cục trang sản phẩm VinFast: ảnh xe lớn, tên và thông số nổi bật, giá và CTA, bảng thông số/nguồn bên dưới. Mẫu Xe X và thông số vẫn là demo. CTA sang cọc/trả góp giữ mẫu đang xem; link sản phẩm VinFast chỉ hiện khi dữ liệu API có URL chính thức hợp lệ.

**Đối chiếu VinFast 27/09:** trang đăng nhập VinFast là form giữa trang, sau khi đã đăng nhập có đường vào khu tài khoản với thanh bên và lịch sử giao dịch; chưa quan sát chính xác redirect ngay sau khi gửi form. Demo Xe X dùng một nút vào vai khách, chuyển `/account` và hiển thị thanh bên/lịch sử trong phiên; không giả lập email/mật khẩu hay thông tin cá nhân thật. Trang xe VinFast dùng ảnh xe lớn gần toàn chiều rộng; catalog/chi tiết Xe X dùng ảnh xe demo riêng từng mẫu. Trang đặt xe có rail mẫu, ảnh xe trái và bước bên phải; demo Xe X giữ cọc là yêu cầu chờ nhân viên. Công cụ chi phí dùng form trái và dải kết quả xanh bên phải; khuyến mãi/chính sách VinFast không áp vào Xe X.

**API mode sau này:** auth/register/login, chat SSE + conversations, vehicles list/detail/compare/cost-compare, leads create/list/detail/review, stores. Khi có cấu hình API, mỗi service phải map schema, giữ `conversation_id`/JWT, xử lý 401/403/timeout và nguồn số liệu. Không tự động chuyển fixture thành dữ liệu chính hãng. Các thao tác staff và dữ liệu cá nhân chỉ nghiệm thu khi backend thực thi RBAC theo cửa hàng.
