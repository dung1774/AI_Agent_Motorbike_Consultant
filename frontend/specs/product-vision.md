# Product vision — Xe X

**Ai:** khách cần chọn xe máy điện theo mục đích, ngân sách, quãng đường và chỗ sạc; nhân viên nhận những việc cần xác minh/chốt bán.

**Vấn đề:** khách phải tự đối chiếu thông số và chi phí giữa nhiều lựa chọn; thông tin kỹ thuật cần được giải thích trong bối cảnh sử dụng của họ.

**Kết quả cần tạo:** một chatbot web tiếng Việt: hỏi nhu cầu từng lượt → đề xuất mẫu/phiên bản có căn cứ → hiểu pin/sạc/quãng đường → so sánh chi phí → chuyển nhân viên ở bước cần người thật.

**Mốc đầu:** Demo 1 chỉ gồm P0 trong [frontend spec](frontend-mvp.md). Thành công khi người dùng đi hết luồng trên màn hình nhỏ, biết nguồn/giả định của mọi số liệu và nhận trạng thái rõ khi không có kết quả hoặc dịch vụ lỗi. Không tự nhận đạt chỉ số hiệu năng/độ chính xác nếu chưa đo.

**Giới hạn:** không thanh toán/cọc thật, không tự duyệt tín dụng, không thu CCCD cho demo, không tư vấn ngoài catalog được xác nhận. Nguồn dữ liệu chính hãng và giả định chi phí cần team xác nhận trước khi tuyên bố số liệu là thật.
