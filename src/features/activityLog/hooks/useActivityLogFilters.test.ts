/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useActivityLogFilters } from "./useActivityLogFilters";

describe("useActivityLogFilters", () => {
  const entries = [
    { timestamp: "10:00:00", message: "A", type: "activity" as const, antennaId: "maja", antennaName: "Maja" },
    { timestamp: "10:01:00", message: "B", type: "alarm" as const, antennaId: "maja", antennaName: "Maja" },
    { timestamp: "10:02:00", message: "C", type: "alarm" as const, antennaId: "elin", antennaName: "Elin" },
  ];

  it("filters to current antenna and activity by default", () => {
    const { result } = renderHook(() =>
      useActivityLogFilters({
        entries,
        selectedAntennaId: "maja",
        selectedAntennaName: "Maja",
      }),
    );

    expect(result.current.filteredEntries).toHaveLength(1);
    expect(result.current.filteredEntries[0].message).toBe("A");
  });

  it("shows alarms for all antennas when modes are toggled", () => {
    const { result } = renderHook(() =>
      useActivityLogFilters({
        entries,
        selectedAntennaId: "maja",
        selectedAntennaName: "Maja",
      }),
    );

    act(() => {
      result.current.setLogTab("alarms");
      result.current.setViewMode("all");
    });

    expect(result.current.filteredEntries).toHaveLength(2);
  });
});
