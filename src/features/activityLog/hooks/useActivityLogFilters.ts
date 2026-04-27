// useActivityLogFilters hook logic.
import { useMemo, useState } from "react";
import { ActivityEntry } from "../types";

export function useActivityLogFilters(params: {
  entries: ActivityEntry[];
  selectedAntennaId: string;
  selectedAntennaName: string;
}) {
  const { entries, selectedAntennaId, selectedAntennaName } = params;
  const [viewMode, setViewMode] = useState<"antenna" | "all">("antenna");
  const [logTab, setLogTab] = useState<"activity" | "alarms">("activity");

  const filteredEntries = useMemo(() => {
    const scopedEntries =
      viewMode === "antenna"
        ? entries.filter((entry) => entry.antennaId === selectedAntennaId)
        : entries;

    return scopedEntries.filter((entry) =>
      logTab === "alarms" ? entry.type === "alarm" : entry.type !== "alarm",
    );
  }, [entries, logTab, selectedAntennaId, viewMode]);

  const resetTargetLabel =
    viewMode === "antenna"
      ? `${logTab === "alarms" ? "alarms" : "activity"} for antenna ${selectedAntennaName}`
      : `${logTab === "alarms" ? "alarms" : "activity"} for all antennas`;

  const emptyStateLabel =
    logTab === "alarms" ? "No alarms yet in this view." : "No activity yet in this view.";

  const scopeBadgeLabel =
    viewMode === "antenna"
      ? `THIS ANTENNA: ${selectedAntennaName.toUpperCase()}`
      : "ALL ANTENNAS";

  const scopeHelperLabel =
    viewMode === "antenna" ? "Only current antenna events" : "Combined feed from every antenna";

  return {
    viewMode,
    setViewMode,
    logTab,
    setLogTab,
    filteredEntries,
    resetTargetLabel,
    emptyStateLabel,
    scopeBadgeLabel,
    scopeHelperLabel,
  };
}
