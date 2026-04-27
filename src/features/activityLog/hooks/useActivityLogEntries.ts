// useActivityLogEntries hook logic.
import { useEffect, useState } from "react";
import {
  getActivityLogSeed,
  subscribeToActivityLog,
} from "../api/activityLogApi";
import { ActivityEntry } from "../types";

export function useActivityLogEntries(selectedAntennaId: string) {
  const [entries, setEntries] = useState<ActivityEntry[]>(() =>
    getActivityLogSeed(),
  );
  const [isLogUpdated, setIsLogUpdated] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToActivityLog((payload) => {
      if (!payload?.message) return;
      setEntries((prev) => [...prev, payload].slice(-50));
      setIsLogUpdated(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isLogUpdated) return;
    const timer = window.setTimeout(() => setIsLogUpdated(false), 550);
    return () => window.clearTimeout(timer);
  }, [isLogUpdated]);

  const resetEntries = (scope: "antenna" | "all") => {
    if (scope === "antenna") {
      setEntries((prev) => prev.filter((entry) => entry.antennaId !== selectedAntennaId));
      return;
    }
    setEntries([]);
  };

  return {
    entries,
    isLogUpdated,
    resetEntries,
  };
}
