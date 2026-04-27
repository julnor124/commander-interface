// Tests for cardVisibility behavior.
import { describe, expect, it } from "vitest";
import { buildVisibleIds } from "./cardVisibility";

describe("buildVisibleIds", () => {
  it("merges active and open ids without duplicates", () => {
    const visible = buildVisibleIds({
      activeIds: ["c1", "c2"],
      openIds: ["c2", "c3"],
    });

    expect(visible).toEqual(["c1", "c2", "c3"]);
  });

  it("filters out dismissed ids", () => {
    const visible = buildVisibleIds({
      activeIds: ["c1", "c2"],
      openIds: ["c3"],
      dismissedIds: ["c2"],
    });

    expect(visible).toEqual(["c1", "c3"]);
  });
});
