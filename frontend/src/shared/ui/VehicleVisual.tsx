import Image from "next/image";
import type { Vehicle } from "@/lib/types";

const vehicleImages: Record<string, string> = {
  "xe-x-lite": "/images/xe-x-lite.png",
  "xe-x-city": "/images/xe-x-city.png",
  "xe-x-flow": "/images/xe-x-flow.png",
  "xe-x-pro": "/images/xe-x-pro.png",
};

export function VehicleVisual({ vehicle, compact = false, priority = false }: { vehicle: Vehicle; compact?: boolean; priority?: boolean }) {
  return (
    <div className={`vehicle-visual ${compact ? "vehicle-visual--compact" : ""}`}>
      <Image
        src={vehicleImages[vehicle.id] ?? vehicleImages["xe-x-city"]}
        alt={`Hình minh họa ${vehicle.name}`}
        fill
        sizes={compact ? "(max-width: 640px) 100vw, 360px" : "(max-width: 900px) 100vw, 740px"}
        priority={priority}
      />
    </div>
  );
}
