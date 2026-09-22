import { ConsultationExperience } from "./ConsultationExperience";

export function ConsultationView() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-title">
          <span className="eyebrow">Tư vấn cá nhân hóa</span>
          <h1>Chào bạn, hôm nay mình đi đâu?</h1>
          <p>
            Chia sẻ nhu cầu qua cuộc trò chuyện ngắn để nhận đề xuất mẫu xe phù hợp nhất, kèm phân tích pin, cự ly và chi phí.
          </p>
        </header>
        <ConsultationExperience />
      </div>
    </div>
  );
}
