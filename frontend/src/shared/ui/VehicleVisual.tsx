import type { CSSProperties } from "react";

export function VehicleVisual({ accent = "#95e949", compact = false }: { accent?: string; compact?: boolean }) {
  return (
    <div
      className={`vehicle-visual ${compact ? "vehicle-visual--compact" : ""}`}
      style={{ "--vehicle-accent": accent } as CSSProperties}
      aria-hidden="true"
    >
      <span className="vehicle-glow" />
      <span className="wheel wheel-left" />
      <span className="wheel wheel-right" />
      <span className="scooter-body" />
      <span className="scooter-deck" />
      <span className="scooter-seat" />
      <span className="scooter-stem" />
      <span className="scooter-handle" />
      <span className="scooter-light" />
    </div>
  );
}
