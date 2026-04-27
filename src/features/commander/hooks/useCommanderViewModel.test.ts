/** @vitest-environment jsdom */
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCommanderViewModel } from "./useCommanderViewModel";

describe("useCommanderViewModel", () => {
  it("lets dismissed cortex be re-opened from dropdown selection", () => {
    const { result } = renderHook(() => useCommanderViewModel());
    const cortexId = result.current.cortexCards[0]?.id;

    expect(cortexId).toBeDefined();
    if (!cortexId) return;

    act(() => {
      result.current.dismissCortexCard(cortexId);
    });

    expect(result.current.dismissedCortexIds.includes(cortexId)).toBe(true);

    act(() => {
      result.current.toggleCortexCard(cortexId);
    });

    expect(result.current.dismissedCortexIds.includes(cortexId)).toBe(false);
    expect(result.current.openCortexIds.includes(cortexId)).toBe(true);
  });
});
