/** @vitest-environment jsdom */
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePassSchedule } from "./usePassSchedule";

describe("usePassSchedule", () => {
  const antennas = [
    { id: "maja", color: "#3ABEFF" },
    { id: "elin", color: "#B8963E" },
  ];

  it("returns schedule state with selected window and labels", () => {
    const { result } = renderHook(() =>
      usePassSchedule({
        antennas,
        selectedAntennaId: "maja",
      }),
    );

    expect(result.current.selectedPassWindow).toBeDefined();
    expect(result.current.passStartsAtLabel).not.toBe("--:--");
    expect(Array.isArray(result.current.activePassAntennaIds)).toBe(true);
  });
});
