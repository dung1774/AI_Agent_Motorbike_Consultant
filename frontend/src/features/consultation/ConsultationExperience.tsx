"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { answerCatalogQuestion, nextField, optionsFor, parseAnswer, questionFor } from "@/lib/demo-chat";
import { formatVnd } from "@/lib/format";
import { clearDemoHandoff, saveDemoHandoff } from "@/lib/demo-handoff";
import { recommendVehicles } from "@/lib/recommendations";
import { mockVehicleService } from "@/services/mock-services";
import { VehicleCard } from "@/features/vehicles/VehicleCard";
import type { ConsultationProfile, Recommendation, Vehicle } from "@/lib/types";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  recommendations?: Recommendation[];
  action?: "cost";
};
type NewMessage = Omit<ChatMessage, "id">;

const firstMessage: ChatMessage = {
  id: 1,
  role: "assistant",
  text: `Chào bạn! Mình là trợ lý tư vấn Xe X trong bản demo. Mình sẽ hỏi bốn điều để chọn xe từ catalog minh họa. ${questionFor("purpose")}`,
};
const conversationStorageKey = "xe-x-demo-conversation";

export function ConsultationExperience() {
  const router = useRouter();
  const [profile, setProfile] = useState<ConsultationProfile>({});
  const [messages, setMessages] = useState<ChatMessage[]>([firstMessage]);
  const [draft, setDraft] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [catalogError, setCatalogError] = useState("");
  const [handoffError, setHandoffError] = useState("");
  const [conversationReady, setConversationReady] = useState(false);
  const nextId = useRef(2);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(conversationStorageKey);
      if (raw) {
        const saved: unknown = JSON.parse(raw);
        if (saved && typeof saved === "object") {
          const value = saved as { profile?: ConsultationProfile; messages?: ChatMessage[] };
          if (value.profile && typeof value.profile === "object" &&
              Array.isArray(value.messages) && value.messages.length > 0 && value.messages.length <= 100 &&
              value.messages.every((item) => typeof item.id === "number" && typeof item.text === "string" &&
                (item.role === "assistant" || item.role === "user"))) {
            setProfile(value.profile);
            setMessages(value.messages);
            nextId.current = Math.max(...value.messages.map((item) => item.id)) + 1;
          }
        }
      }
    } catch {
      // Session storage can be unavailable; the chat still works in page memory.
    } finally {
      setConversationReady(true);
    }
  }, []);
  useEffect(() => {
    if (!conversationReady) return;
    try {
      window.sessionStorage.setItem(conversationStorageKey, JSON.stringify({ profile, messages }));
    } catch {
      // Keeping the current page functional is enough for the demo.
    }
  }, [conversationReady, profile, messages]);

  const loadCatalog = async () => {
    setLoading(true);
    setCatalogError("");
    try {
      setVehicles((await mockVehicleService.getVehicles()).data);
    } catch {
      setCatalogError("Không thể tải catalog minh họa. Thử lại để tiếp tục hội thoại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadCatalog(); }, []);
  useEffect(() => {
    if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [messages]);

  const addMessages = (...next: NewMessage[]) => {
    const withIds = next.map((message) => ({ ...message, id: nextId.current++ }));
    setMessages((current) => [...current, ...withIds]);
  };

  const resetConversation = () => {
    try { window.sessionStorage.removeItem(conversationStorageKey); } catch {}
    setProfile({});
    setMessages([{ ...firstMessage, id: nextId.current++ }]);
    setDraft("");
    inputRef.current?.focus();
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || loading || catalogError) return;
    setDraft("");
    if (/cccd|căn cước|\b\d{12}\b/i.test(text)) {
      addMessages({ role: "assistant", text: "Vui lòng không nhập CCCD hoặc dữ liệu nhận dạng cá nhân vào bản demo. Mình chỉ cần mục đích, km/ngày, ngân sách và chỗ sạc để tư vấn xe." });
      return;
    }
    const user: NewMessage = { role: "user", text };
    const field = nextField(profile);

    if (field !== "complete") {
      const update = parseAnswer(field, text);
      if (update) {
        const updatedProfile = { ...profile, ...update };
        setProfile(updatedProfile);
        const next = nextField(updatedProfile);
        if (next === "complete") {
          const recommendations = recommendVehicles(vehicles, updatedProfile);
          addMessages(user, recommendations.length
            ? { role: "assistant", text: "Mình đã ghi đủ nhu cầu. Đây là các mẫu trong catalog demo phù hợp với những điều bạn vừa cho biết. Mỗi thẻ ghi rõ nguồn và giới hạn số liệu.", recommendations }
            : { role: "assistant", text: "Mình chưa tìm được mẫu demo đáp ứng đồng thời mục đích, ngân sách và cự ly này. Bạn có thể bắt đầu lại để sửa nhu cầu hoặc hỏi nhân viên khi có catalog được xác minh." });
        } else {
          addMessages(user, { role: "assistant", text: questionFor(next) });
        }
      } else {
        const topic = answerCatalogQuestion(text, vehicles);
        if (topic) {
          addMessages(user, { role: "assistant", ...topic }, { role: "assistant", text: `Để tiếp tục chọn xe: ${questionFor(field)}` });
        } else {
          addMessages(user, { role: "assistant", text: `Mình chưa ghi nhận được câu trả lời này. ${questionFor(field)}` });
        }
      }
      return;
    }

    if (/xem lại gợi ý|xem lai goi y|đề xuất|de xuat|xe nào|xe nao/i.test(text)) {
      const recommendations = recommendVehicles(vehicles, profile);
      addMessages(user, recommendations.length
        ? { role: "assistant", text: "Đây là gợi ý từ catalog minh họa theo nhu cầu đã ghi:", recommendations }
        : { role: "assistant", text: "Hiện không có mẫu demo phù hợp. Bạn có thể bắt đầu lại để sửa nhu cầu." });
      return;
    }
    const topic = answerCatalogQuestion(text, vehicles);
    addMessages(user, topic
      ? { role: "assistant", ...topic }
      : { role: "assistant", text: "Mình chỉ tư vấn xe Xe X dựa trên catalog demo và công cụ chi phí. Mình không hỗ trợ câu hỏi này. Nếu cần xác minh thông tin xe, bạn có thể hỏi nhân viên; bản demo chưa kết nối nhân viên thật." });
  };

  const prepareHandoff = (vehicle: Vehicle) => {
    try {
      saveDemoHandoff(vehicle, profile);
      setHandoffError("");
      router.push("/staff/login");
    } catch {
      setHandoffError("Không thể tạo bản bàn giao demo trong trình duyệt này.");
    }
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(draft);
  };
  const field = nextField(profile);
  const chargingLabel = profile.charging === "home" ? "Tại nhà" : profile.charging === "work" ? "Nơi làm việc" : profile.charging === "limited" ? "Khó sạc thường xuyên" : "Chưa có";

  return (
    <div className="chat-layout">
      <section className="chat-panel" aria-label="Hội thoại tư vấn Xe X">
        <div className="chat-head">
          <div><span className="eyebrow">Hội thoại tư vấn</span><h1>Trợ lý Xe X</h1></div>
          <span className="badge">Kịch bản demo · chưa kết nối AI</span>
        </div>
        <div className="chat-transcript" ref={transcriptRef} role="log" aria-label="Tin nhắn tư vấn" aria-live="polite" aria-relevant="additions">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message chat-message--${message.role} ${message.recommendations?.length ? "chat-message--wide" : ""}`}>
              <span className="chat-speaker">{message.role === "assistant" ? "Trợ lý demo" : "Bạn"}</span>
              <p>{message.text}</p>
              {message.recommendations && (
                <div className="recommendation-grid">
                  {message.recommendations.map(({ vehicle, reasons }) => (
                    <div key={vehicle.id}>
                      <VehicleCard vehicle={vehicle} />
                      <ul className="reason-list">{reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
                      <button className="button button-secondary" type="button" onClick={() => prepareHandoff(vehicle)}>Chuẩn bị bàn giao demo</button>
                    </div>
                  ))}
                </div>
              )}
              {(message.action === "cost" || message.recommendations?.length) && (
                <div className="cluster chat-next-actions">
                  <Link className="button button-secondary" href={`/cost?dailyKm=${profile.dailyKm ?? 30}`}>Chi phí</Link>
                  {message.recommendations?.length && <>
                    <Link className="button button-secondary" href="/compare">So sánh xe</Link>
                    <Link className="button button-secondary" href="/installment">Trả góp</Link>
                    <Link className="button button-secondary" href="/stores">Cửa hàng</Link>
                  </>}
                </div>
              )}
            </div>
          ))}
          {handoffError && <p className="field-error" role="alert">{handoffError}</p>}
          {loading && <p className="chat-status" role="status">Đang tải catalog demo...</p>}
          {catalogError && <div className="chat-status" role="alert"><p>{catalogError}</p><button className="button button-secondary" type="button" onClick={() => void loadCatalog()}>Thử lại</button></div>}
        </div>
        <div className="chat-controls">
          <div className="chat-suggestions" aria-label="Gợi ý trả lời">
            {optionsFor(field).map((option) => <button className="chat-chip" type="button" key={option} onClick={() => send(option)} disabled={loading || Boolean(catalogError)}>{option}</button>)}
          </div>
          <form className="chat-composer" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="chat-input">Tin nhắn của bạn</label>
            <input ref={inputRef} id="chat-input" className="input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={field === "complete" ? "Hỏi về xe, pin, sạc hoặc chi phí..." : "Nhập câu trả lời của bạn..."} maxLength={180} disabled={loading || Boolean(catalogError)} />
            <button className="button button-primary" type="submit" disabled={!draft.trim() || loading || Boolean(catalogError)}>Gửi</button>
          </form>
        </div>
      </section>

      <aside className="panel chat-sidebar" aria-label="Nhu cầu đã ghi">
        <span className="eyebrow">Trong phiên này</span>
        <h2>Nhu cầu của bạn</h2>
        <dl className="profile-list">
          <div><dt>Mục đích</dt><dd>{profile.purpose ?? "Chưa có"}</dd></div>
          <div><dt>Km mỗi ngày</dt><dd>{profile.dailyKm ? `${profile.dailyKm} km` : "Chưa có"}</dd></div>
          <div><dt>Ngân sách tối đa</dt><dd>{profile.budgetMax ? formatVnd(profile.budgetMax) : "Chưa có"}</dd></div>
          <div><dt>Chỗ sạc</dt><dd>{chargingLabel}</dd></div>
        </dl>
        <button className="button button-secondary" type="button" onClick={resetConversation}>Bắt đầu lại</button>
        <p className="microcopy">Hội thoại demo giữ trong tab đang mở. Câu trả lời và thông số theo quy tắc, chưa phải Agent AI hoặc catalog chính hãng.</p>
      </aside>
    </div>
  );
}
