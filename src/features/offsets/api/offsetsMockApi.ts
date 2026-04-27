// offsetsMockApi API layer.
import { OffsetKey, OffsetState } from "../types";

export const INITIAL_OFFSET_STATE: OffsetState = {
  Time: 0,
  El: 0,
  Az: 0,
  Step: 0,
};

export type { OffsetKey, OffsetState };

export function incrementOffsetValue(currentValue: number): number {
  return currentValue + 1;
}

export function decrementOffsetValue(currentValue: number): number {
  return Math.max(0, currentValue - 1);
}

export function resetOffsetState(): OffsetState {
  return { ...INITIAL_OFFSET_STATE };
}
