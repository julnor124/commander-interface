import { useEffect, useState } from "react";
import { ACTIVITY_LOG_EVENT, ActivityEntry } from "../activityLogBus";

export function useActivityLogEntries(selectedAntennaId: string) {
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [isLogUpdated, setIsLogUpdated] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<ActivityEntry>;
      const payload = custom.detail;
      if (!payload?.message) return;
      setEntries((prev) => [...prev, payload].slice(-50));
      setIsLogUpdated(true);
    };

    window.addEventListener(ACTIVITY_LOG_EVENT, handler);
    return () => window.removeEventListener(ACTIVITY_LOG_EVENT, handler);
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
