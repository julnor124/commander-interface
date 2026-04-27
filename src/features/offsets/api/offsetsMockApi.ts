export type OffsetKey = "Time" | "El" | "Az" | "Step";

export type OffsetState = Record<OffsetKey, number>;

export const INITIAL_OFFSET_STATE: OffsetState = {
  Time: 0,
  El: 0,
  Az: 0,
  Step: 0,
};

export function incrementOffsetValue(currentValue: number): number {
  return currentValue + 1;
}

export function decrementOffsetValue(currentValue: number): number {
  return Math.max(0, currentValue - 1);
}

export function resetOffsetState(): OffsetState {
  return { ...INITIAL_OFFSET_STATE };
}
