"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface AppContextValue {
  comparisonIds: string[];
  toggleComparison: (vehicleId: string) => void;
  clearComparison: () => void;
  selectedVehicleId: string;
  selectVehicle: (vehicleId: string) => void;
  toast: string;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("xe-x-city");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("xe-x-comparison");
    if (!saved) return;
    try {
      const parsed: unknown = JSON.parse(saved);
      setComparisonIds(
        Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : []
      );
    } catch {
      window.localStorage.removeItem("xe-x-comparison");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("xe-x-comparison", JSON.stringify(comparisonIds));
  }, [comparisonIds]);

  const value = useMemo<AppContextValue>(() => ({
    comparisonIds,
    toggleComparison(vehicleId) {
      setComparisonIds((current) => current.includes(vehicleId)
        ? current.filter((id) => id !== vehicleId)
        : current.length >= 3 ? current : [...current, vehicleId]);
    },
    clearComparison: () => setComparisonIds([]),
    selectedVehicleId,
    selectVehicle: setSelectedVehicleId,
    toast,
    showToast(message) {
      setToast(message);
      window.setTimeout(() => setToast(""), 2800);
    },
  }), [comparisonIds, selectedVehicleId, toast]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
