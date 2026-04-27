/** @vitest-environment jsdom */
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCortexAllocation } from "./useCortexAllocation";

describe("useCortexAllocation", () => {
  const cortexCards = [
    { id: "cortex-1" },
    { id: "cortex-2" },
    { id: "cortex-3" },
  ];

  it("allocates and opens cortex cards when engaged", () => {
    const log = vi.fn();
    const { result } = renderHook(() =>
      useCortexAllocation({
        cortexCards,
        cortexPerPass: 2,
        selectedAntennaId: "maja",
        selectedAntennaName: "Maja",
        hasScheduledPass: true,
        isCortexEngaged: true,
        log,
      }),
    );

    expect(result.current.effectiveActiveCortexIds.length).toBeGreaterThan(0);
    expect(result.current.openCortexIds.length).toBeGreaterThan(0);
  });

  it("toggles cortex cards in open state", () => {
    const { result } = renderHook(() =>
      useCortexAllocation({
        cortexCards,
        cortexPerPass: 2,
        selectedAntennaId: "maja",
        selectedAntennaName: "Maja",
        hasScheduledPass: true,
        isCortexEngaged: true,
        log: () => undefined,
      }),
    );

    act(() => {
      result.current.toggleCortexCard("cortex-3");
    });

    expect(result.current.openCortexIds.includes("cortex-3")).toBe(true);
  });
});
