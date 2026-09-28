# Domains và ranh giới dữ liệu

| Domain | Dữ liệu chịu trách nhiệm | Quy tắc |
| --- | --- | --- |
| Nhu cầu | mục đích, km/ngày, ngân sách, chỗ sạc | Chỉ 4 trường cần cho P0; có thể sửa trước khi đề xuất. |
| Catalog | mẫu, phiên bản, giá, pin, sạc, quãng đường, nguồn, ngày cập nhật | Mọi thông số hiển thị phải truy được bản ghi nguồn hoặc ghi rõ minh họa. |
| Tư vấn | lựa chọn 1–3 xe và lý do, giải thích, câu ngoài phạm vi | Không tự bịa số liệu; thiếu dữ liệu thì hỏi lại hoặc báo không đủ căn cứ. |
| Chi phí | km, ngày/tháng, giá điện/xăng, mức tiêu hao, kết quả | Code/tool tính; giao diện hiện giả định và nhãn ước tính. |
| Bàn giao (sau P0) | tóm tắt nhu cầu, yêu cầu, trạng thái, người xử lý | Agent chỉ tạo yêu cầu chờ; nhân viên mới quyết định. |

P0 chỉ cần bốn domain đầu. Contract cụ thể ghi tại [api-contracts.md](api-contracts.md); đây là ranh giới dữ liệu đề xuất, chưa phải API đang chạy.
