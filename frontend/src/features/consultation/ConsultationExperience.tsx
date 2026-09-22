"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { VehicleVisual } from "@/shared/ui/VehicleVisual";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { mockAgentService, mockLeadService } from "@/services/mock-services";
import { vehicles } from "@/data/mock/vehicles";
import { formatVnd } from "@/lib/format";
import { calculateOwnershipCost } from "@/lib/calculators";
import type { ChatMessage, ConsultationProfile, Recommendation, UseCase, Vehicle } from "@/lib/types";

type Step = "purpose" | "distance" | "budget" | "charging" | "complete";

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "agent",
    content: "Chào bạn! Mình có thể giúp bạn chọn xe, so sánh mẫu, tính chi phí hoặc giải đáp về pin/sạc/bảo hành. Hôm nay bạn cần hỗ trợ gì?",
    createdAt: new Date().toISOString(),
  },
];

const quickTopics = [
  { label: "Tư vấn chọn xe", action: "start-discovery" },
  { label: "So sánh xe", action: "compare" },
  { label: "Hỏi về pin & sạc", action: "battery-faq" },
  { label: "Tính chi phí xăng vs điện", action: "cost" },
];

const options: Record<Exclude<Step, "complete">, Array<{ label: string; value: string }>> = {
  purpose: ["Đi học", "Đi làm", "Giao hàng", "Đi phố"].map((value) => ({ label: value, value })),
  distance: [
    { label: "Dưới 20 km", value: "15" },
    { label: "20–50 km", value: "35" },
    { label: "50–80 km", value: "65" },
    { label: "Trên 80 km", value: "90" },
  ],
  budget: [
    { label: "Dưới 20 triệu", value: "20000000" },
    { label: "20–30 triệu", value: "30000000" },
    { label: "30–45 triệu", value: "45000000" },
    { label: "Trên 45 triệu", value: "60000000" },
  ],
  charging: [
    { label: "Sạc tại nhà", value: "home" },
    { label: "Sạc tại nơi làm việc", value: "work" },
    { label: "Khó sạc thường xuyên", value: "limited" },
  ],
};

const nextPrompts: Record<Exclude<Step, "complete">, string> = {
  purpose: "Bạn đi khoảng bao nhiêu km mỗi ngày?",
  distance: "Ngân sách dự kiến của bạn khoảng bao nhiêu?",
  budget: "Bạn có chỗ sạc thuận tiện tại nhà hoặc nơi làm việc không?",
  charging: "Dựa trên ngân sách và nhu cầu bạn đã cung cấp, đây là gợi ý phù hợp nhất:",
};

export function ConsultationExperience() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [profile, setProfile] = useState<ConsultationProfile>({});
  const [step, setStep] = useState<Step>("purpose");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [handoffActive, setHandoffActive] = useState(false);
  const [handoffSubmitting, setHandoffSubmitting] = useState(false);
  const [inChatComparison, setInChatComparison] = useState<Vehicle[] | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const { toggleComparison, comparisonIds, showToast, selectVehicle } = useApp();
  const { user } = useAuth();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, handoffActive, inChatComparison]);

  const appendUser = (content: string) =>
    setMessages((curr) => [
      ...curr,
      { id: `user-${Date.now()}`, role: "user", content, createdAt: new Date().toISOString() },
    ]);

  const appendAgent = (content: string, source?: string) =>
    setMessages((curr) => [
      ...curr,
      { id: `agent-${Date.now()}`, role: "agent", content, createdAt: new Date().toISOString(), source },
    ]);

  const askAgent = async (content: string, updatedProfile: ConsultationProfile) => {
    setLoading(true);
    setError("");
    const lower = content.toLowerCase();

    // Out-of-scope check (State 08 from wireframe)
    if (lower.includes("hãng y") || lower.includes("honda") || lower.includes("yamaha") || lower.includes("vinfast")) {
      await new Promise((r) => setTimeout(r, 600));
      appendAgent(
        "Bản demo hiện chỉ có dữ liệu minh họa cho dòng Xe X nên mình không đủ cơ sở để đánh giá sản phẩm hãng khác. Mình có thể tiếp tục với catalog demo hoặc chuyển câu hỏi cho tư vấn viên.",
        "Giới hạn phạm vi của catalog demo"
      );
      setLoading(false);
      return;
    }

    // Battery & Warranty Q&A (State 05 from wireframe)
    if (lower.includes("pin") || lower.includes("bảo hành") || lower.includes("sạc")) {
      await new Promise((r) => setTimeout(r, 650));
      appendAgent(
        "Catalog demo đang minh họa thời gian sạc từ 5,5 đến 7 giờ tùy mẫu. Dự án chưa có chính sách bảo hành chính thức, vì vậy mình không khẳng định thời hạn bảo hành; tư vấn viên cần xác nhận mục này khi có nguồn đã kiểm chứng.",
        "Catalog demo Xe X · chưa có nguồn chính sách bảo hành"
      );
      setLoading(false);
      return;
    }

    // Cost estimation request (State 06 from wireframe)
    if (lower.includes("chi phí") || lower.includes("tiết kiệm")) {
      await new Promise((r) => setTimeout(r, 600));
      const daily = profile.dailyKm || 30;
      const estimate = calculateOwnershipCost({
        dailyKm: daily,
        daysPerMonth: 26,
        electricityPrice: 3000,
        petrolPrice: 24000,
        petrolLitresPer100Km: 2.2,
        electricKwhPer100Km: 3.2,
      });
      appendAgent(
        `Với cự ly ${daily} km/ngày (${estimate.monthlyKm} km/tháng), chi phí điện ước tính là ${formatVnd(estimate.electricMonthly)}/tháng và chi phí xăng tham chiếu là ${formatVnd(estimate.petrolMonthly)}/tháng. Chênh lệch ước tính: ${formatVnd(estimate.savingMonthly)}/tháng.`,
        "Giả định chỉnh được: điện 3.000đ/kWh, xăng 24.000đ/lít, 26 ngày/tháng"
      );
      setLoading(false);
      return;
    }

    // Comparison in chat (State 04 from wireframe)
    if (lower.includes("so sánh")) {
      await new Promise((r) => setTimeout(r, 600));
      setInChatComparison(vehicles.slice(0, 2));
      appendAgent(
        "Mình đã lập bảng so sánh nhanh giữa Xe X Lite và Xe X City từ dữ liệu minh họa. Lite có giá demo thấp hơn; City có phạm vi demo dài hơn. Bạn nên xác nhận thông số thật trước khi quyết định.",
        "Catalog demo Xe X"
      );
      setLoading(false);
      return;
    }

    try {
      const response = (await mockAgentService.sendMessage(content, updatedProfile)).data;
      setMessages((curr) => [...curr, response.message]);
      if (response.recommendations) setRecommendations(response.recommendations);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Đã có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  const selectOption = async (label: string, value: string) => {
    appendUser(label);
    const updated = { ...profile };
    let upcoming: Step = "complete";

    if (step === "purpose") {
      updated.purpose = value as UseCase;
      upcoming = "distance";
    }
    if (step === "distance") {
      updated.dailyKm = Number(value);
      upcoming = "budget";
    }
    if (step === "budget") {
      updated.budgetMax = Number(value);
      upcoming = "charging";
    }
    if (step === "charging") {
      updated.charging = value as ConsultationProfile["charging"];
      upcoming = "complete";
    }

    const currentStep = step;
    setProfile(updated);
    setStep(upcoming);
    setLoading(true);
    setError("");

    try {
      const response = (await mockAgentService.sendMessage(label, updated)).data;
      const promptMessage: ChatMessage = {
        id: `prompt-${Date.now()}`,
        role: "agent",
        content: nextPrompts[currentStep as Exclude<Step, "complete">],
        createdAt: new Date().toISOString(),
      };
      setMessages((curr) => [...curr, ...(upcoming === "complete" ? [response.message] : [promptMessage])]);
      if (response.recommendations) setRecommendations(response.recommendations);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Đã có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  const submitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || loading) return;
    appendUser(content);
    setInput("");
    await askAgent(content, profile);
  };

  const handleQuickTopic = async (topic: { label: string; action: string }) => {
    appendUser(topic.label);
    if (topic.action === "start-discovery") {
      setStep("purpose");
      appendAgent("Rất vui được hỗ trợ! Đầu tiên, bạn thường dùng xe cho mục đích nào?");
    } else if (topic.action === "battery-faq") {
      await askAgent("Pin và bảo hành như thế nào?", profile);
    } else if (topic.action === "cost") {
      await askAgent("Tính chi phí sử dụng", profile);
    } else if (topic.action === "compare") {
      await askAgent("So sánh xe giúp mình", profile);
    }
  };

  const handleConfirmHandoff = async () => {
    setHandoffSubmitting(true);
    setError("");
    try {
      const lead = (await mockLeadService.createLead({
        customerName: user?.name ?? "Khách hàng demo",
        phone: user?.phone ?? "Chưa cung cấp",
        purpose: profile.purpose ?? "Đi phố",
        budgetLabel: profile.budgetMax ? `${profile.budgetMax / 1000000} triệu` : "Chưa xác định",
        dailyKm: profile.dailyKm ?? 0,
        interestedVehicleIds: recommendations.map((item) => item.vehicle.id),
        summary: "Khách yêu cầu nhân viên tiếp tục hỗ trợ từ phiên tư vấn AI demo.",
        unresolvedQuestions: ["Xác nhận nhu cầu còn thiếu", "Tư vấn bước tiếp theo phù hợp"],
      })).data;
      setHandoffActive(false);
      appendAgent(
        `Yêu cầu đã được chuyển vào hàng đợi nhân viên với mã #${lead.id.replace("LD-", "")}. Nhân viên có thể xem bản tóm tắt nhu cầu và tiếp tục xử lý.`,
        "Mock HITL service"
      );
      showToast("Đã chuyển hồ sơ sang hàng đợi tư vấn viên.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Chưa thể tạo yêu cầu hỗ trợ.");
    } finally {
      setHandoffSubmitting(false);
    }
  };

  const progress = Object.values(profile).filter(Boolean).length;

  return (
    <div className="chat-layout">
      <section className="chat-shell" aria-label="Cuộc trò chuyện với trợ lý Xe X">
        <header className="chat-header">
          <div className="chat-agent">
            <span className="brand-mark" aria-hidden="true">ϟ</span>
            <div>
              <strong>Trợ lý Xe X</strong>
              <small>
                {step === "complete"
                  ? "Gợi ý phù hợp · Dữ liệu demo"
                  : progress > 0
                  ? "Đang hoàn thiện nhu cầu"
                  : "AI tư vấn xe máy điện"}
              </small>
            </div>
          </div>
          <div className="chat-progress">
            <strong>{progress}/4</strong> thông tin
          </div>
        </header>

        <div className="chat-messages" aria-live="polite">
          {/* Quick topic pills on start */}
          {messages.length === 1 && (
            <div className="cluster" style={{ gap: 8, margin: "6px 0 12px" }}>
              {quickTopics.map((topic) => (
                <button
                  key={topic.action}
                  className="pill"
                  style={{ cursor: "pointer", fontSize: "0.8rem", borderColor: "var(--forest-2)" }}
                  onClick={() => void handleQuickTopic(topic)}
                >
                  ⚡ {topic.label}
                </button>
              ))}
            </div>
          )}

          {messages.map((message) => (
            <div className={`message message-${message.role}`} key={message.id}>
              {message.content}
              {message.source && <span className="message-source">↗ Nguồn: {message.source}</span>}
            </div>
          ))}

          {/* In-chat Comparison Table (State 04 Wireframe) */}
          {inChatComparison && (
            <div
              style={{
                background: "white",
                borderRadius: 16,
                padding: "14px",
                border: "1px solid var(--line)",
                margin: "8px 0",
              }}
            >
              <span className="eyebrow" style={{ fontSize: "0.7rem" }}>So sánh trực quan</span>
              <table style={{ width: "100%", fontSize: "0.82rem", borderCollapse: "collapse", marginTop: 8 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", textAlign: "left" }}>
                    <th style={{ padding: "6px 4px" }}>Tiêu chí</th>
                    {inChatComparison.map((v) => (
                      <th key={v.id} style={{ padding: "6px 4px" }}>{v.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "6px 4px", color: "var(--ink-soft)" }}>Giá</td>
                    {inChatComparison.map((v) => (
                      <td key={v.id} style={{ padding: "6px 4px", fontWeight: 700 }}>
                        {formatVnd(v.price).replace("₫", "đ")}
                      </td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "6px 4px", color: "var(--ink-soft)" }}>Tầm hoạt động</td>
                    {inChatComparison.map((v) => (
                      <td key={v.id} style={{ padding: "6px 4px" }}>~{v.rangeKm} km</td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 4px", color: "var(--ink-soft)" }}>Thời gian sạc</td>
                    {inChatComparison.map((v) => (
                      <td key={v.id} style={{ padding: "6px 4px" }}>{v.chargeHours} giờ</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* In-chat Human Handoff Card (State 07 Wireframe) */}
          {handoffActive && (
            <div
              style={{
                background: "#fbfdfa",
                border: "2px dashed #9cd188",
                borderRadius: 16,
                padding: 16,
                margin: "10px 0",
              }}
            >
              <div className="cluster" style={{ justifyContent: "space-between", marginBottom: 8 }}>
                <span className="badge badge-warning" style={{ fontSize: "0.72rem" }}>
                  HUMAN HANDOFF
                </span>
                <span className="microcopy">Tư vấn viên showroom</span>
              </div>
              <h4 style={{ margin: "4px 0 8px", fontSize: "0.95rem" }}>
                Chuyển cuộc tư vấn cho nhân viên hỗ trợ
              </h4>
              <div style={{ background: "white", padding: "10px 12px", borderRadius: 10, fontSize: "0.8rem", color: "var(--ink-soft)", lineHeight: 1.5 }}>
                <strong>Thông tin sẽ được chuyển:</strong>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  <li>Nhu cầu đã xác nhận: {profile.purpose ?? "Chưa rõ"} · {profile.dailyKm ? `${profile.dailyKm} km/ngày` : ""}</li>
                  <li>Mẫu xe quan tâm: {recommendations.map((r) => r.vehicle.name).join(", ") || "Dòng xe phổ thông"}</li>
                  <li>Tóm tắt lịch sử trò chuyện & câu hỏi chưa giải quyết</li>
                </ul>
              </div>
              <div className="cluster" style={{ marginTop: 12, gap: 8 }}>
                <button className="button button-lime button-small" disabled={handoffSubmitting} onClick={() => void handleConfirmHandoff()}>
                  {handoffSubmitting ? "Đang chuyển yêu cầu..." : "Xác nhận yêu cầu tư vấn viên"}
                </button>
                <button
                  className="button button-ghost button-small"
                  onClick={() => setHandoffActive(false)}
                >
                  Tiếp tục chat với AI
                </button>
              </div>
            </div>
          )}

          {/* Multiple choice quick options for current step */}
          {step !== "complete" && !loading && !handoffActive && (
            <div className="quick-options">
              {options[step].map((option) => (
                <button key={option.value} onClick={() => void selectOption(option.label, option.value)}>
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="message message-agent">
              <span className="typing" aria-label="AI đang phân tích">
                <i />
                <i />
                <i />
              </span>
            </div>
          )}

          {error && (
            <div className="message message-agent">
              <strong>Chưa thể phản hồi.</strong>
              <br />
              {error}{" "}
              <button className="button button-ghost button-small" onClick={() => setError("")}>
                Đóng
              </button>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="chat-composer">
          <form onSubmit={submitMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                step === "complete"
                  ? "Hỏi thêm về pin, chi phí, hoặc gõ 'so sánh'..."
                  : "Nhập câu trả lời hoặc chọn gợi ý bên trên..."
              }
              aria-label="Tin nhắn"
            />
            <button className="icon-button" disabled={!input.trim() || loading} aria-label="Gửi tin nhắn">
              →
            </button>
          </form>
        </div>
      </section>

      {/* Sidebar: Profile Summary & Recommendations */}
      <aside className="profile-panel">
        <section className="profile-card">
          <div className="cluster" style={{ justifyContent: "space-between" }}>
            <h3 style={{ margin: 0 }}>Hồ sơ nhu cầu</h3>
            {progress === 4 && <span className="badge">Đủ dữ liệu</span>}
          </div>
          <div className="profile-list" style={{ marginTop: 12 }}>
            <div className="profile-item">
              <span>Mục đích</span>
              <strong>{profile.purpose ?? "Chưa chọn"}</strong>
            </div>
            <div className="profile-item">
              <span>Quãng đường</span>
              <strong>{profile.dailyKm ? `${profile.dailyKm} km/ngày` : "Chưa chọn"}</strong>
            </div>
            <div className="profile-item">
              <span>Ngân sách</span>
              <strong>{profile.budgetMax ? `${profile.budgetMax / 1000000} triệu` : "Chưa chọn"}</strong>
            </div>
            <div className="profile-item">
              <span>Điều kiện sạc</span>
              <strong>
                {profile.charging === "home"
                  ? "Tại nhà"
                  : profile.charging === "work"
                  ? "Nơi làm việc"
                  : profile.charging === "limited"
                  ? "Hạn chế"
                  : "Chưa chọn"}
              </strong>
            </div>
          </div>
          {progress > 0 && (
            <button
              className="button button-ghost button-block"
              style={{ marginTop: 10, fontSize: "0.8rem" }}
              onClick={() => {
                setProfile({});
                setStep("purpose");
                setRecommendations([]);
                setMessages(initialMessages);
                setInChatComparison(null);
                setHandoffActive(false);
              }}
            >
              Làm lại tư vấn
            </button>
          )}
        </section>

        {/* Recommendations list */}
        {recommendations.length > 0 && (
          <section className="profile-card">
            <div className="cluster" style={{ justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>Đề xuất phù hợp</h3>
              <span className="badge">AI Match</span>
            </div>
            <div className="stack" style={{ marginTop: 14 }}>
              {recommendations.map((item) => (
                <div className="recommend-mini" key={item.vehicle.id}>
                  <VehicleVisual accent={item.vehicle.accent} compact />
                  <div>
                    <span className="eyebrow">{item.score}% phù hợp</span>
                    <h4>{item.vehicle.name}</h4>
                    <p>{item.reasons[0]}</p>
                    <div className="cluster" style={{ gap: 6, marginTop: 4 }}>
                      <button
                        className="button button-ghost button-small"
                        onClick={() => {
                          if (!comparisonIds.includes(item.vehicle.id)) {
                            toggleComparison(item.vehicle.id);
                          }
                          showToast(`Đã thêm ${item.vehicle.name} vào danh sách so sánh.`);
                        }}
                      >
                        + So sánh
                      </button>
                      <Link
                        href="/deposit"
                        className="button button-lime button-small"
                        onClick={() => selectVehicle(item.vehicle.id)}
                      >
                        Giữ xe
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/compare" className="button button-secondary button-block" style={{ marginTop: 14 }}>
              Xem bảng so sánh chi tiết →
            </Link>
          </section>
        )}

        {/* Human Handoff Card */}
        <section className="profile-card">
          <span className="eyebrow">Tư vấn viên trực tiếp</span>
          <h3 style={{ marginTop: 8 }}>Cần hỗ trợ từ người thật?</h3>
          <p className="microcopy">
            Hệ thống sẽ chuyển toàn bộ thông tin đã thu thập cho nhân viên showroom để giải đáp thêm hoặc hỗ trợ thủ tục.
          </p>
          <button
            className="button button-lime button-block"
            onClick={() => setHandoffActive(true)}
          >
            Yêu cầu tư vấn viên
          </button>
        </section>
      </aside>
    </div>
  );
}
