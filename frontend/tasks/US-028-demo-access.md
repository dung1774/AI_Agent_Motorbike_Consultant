# US-028 — lối vào demo theo vai trò (bổ sung frontend)

- **Mục tiêu:** khách và nhân viên biết chính xác mình đang vào bản demo, không nhầm form giả với tài khoản thật.
- **Việc frontend:** `/login` và `/register` dùng một nút vào vai khách trong bố cục đăng nhập VinFast dạng cột giữa; `/staff/login` dùng một nút vào vai nhân viên. Sau khi vào demo khách, chuyển sang `/account` có thanh bên; header đổi từ đăng nhập sang tài khoản. Không hỏi số điện thoại/mật khẩu khi auth API chưa có.
- **Nghiệm thu demo:** từng nút vào đúng khu vực; thông báo rõ phiên chỉ trong tab và không có xác thực thật; đổi vai không giữ nhầm role; link từ khu nhân viên về trang khách hoạt động.
- **Phụ thuộc tích hợp:** khi backend có auth, thay bằng form và JWT/RBAC đúng contract; không dùng role trong `sessionStorage` làm bảo vệ dữ liệu.
