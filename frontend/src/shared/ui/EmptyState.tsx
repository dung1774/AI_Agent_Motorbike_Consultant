import type { ReactNode } from "react";

interface EmptyStateProps {
  mark?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ mark = "⌕", title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-mark">{mark}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action && <div style={{ marginTop: 14 }}>{action}</div>}
    </div>
  );
}
