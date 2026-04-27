/** @vitest-environment jsdom */
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useActivityLogEntries } from "./useActivityLogEntries";
import { ACTIVITY_LOG_EVENT } from "../activityLogBus";

describe("useActivityLogEntries", () => {
  it("appends emitted entries from log event bus", () => {
    const { result } = renderHook(() => useActivityLogEntries("maja"));

    act(() => {
      window.dispatchEvent(
        new CustomEvent(ACTIVITY_LOG_EVENT, {
          detail: {
            timestamp: "10:00:00",
            message: "Event one",
            type: "activity",
            antennaId: "maja",
            antennaName: "Maja",
          },
        }),
      );
    });

    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0].message).toBe("Event one");
  });

  it("resets only selected antenna entries for antenna scope", () => {
    const { result } = renderHook(() => useActivityLogEntries("maja"));

    act(() => {
      window.dispatchEvent(
        new CustomEvent(ACTIVITY_LOG_EVENT, {
          detail: { timestamp: "10:00:00", message: "Maja", antennaId: "maja", antennaName: "Maja" },
        }),
      );
      window.dispatchEvent(
        new CustomEvent(ACTIVITY_LOG_EVENT, {
          detail: { timestamp: "10:01:00", message: "Elin", antennaId: "elin", antennaName: "Elin" },
        }),
      );
      result.current.resetEntries("antenna");
    });

    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0].antennaId).toBe("elin");
  });
});
