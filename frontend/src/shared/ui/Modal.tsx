"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-shell" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2 id="modal-title" style={{ margin: 0, fontSize: "1.25rem" }}>{title}</h2>
          <button className="button button-ghost button-small" onClick={onClose} aria-label="Đóng">✕</button>
        </div>
        <div className="modal-body" style={{ padding: "16px 20px" }}>
          {children}
        </div>
        {footer && (
          <div className="modal-footer" style={{ padding: "12px 20px", borderTop: "1px solid var(--line)" }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
