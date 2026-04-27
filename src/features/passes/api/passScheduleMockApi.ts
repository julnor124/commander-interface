import { PassWindow } from "../types";
import {
  MOCK_DEFAULT_PASS_DURATION_MS,
  MOCK_PASS_DURATION_MS_BY_ANTENNA,
  MOCK_ROLLOVER_GAP_MINUTES_BY_ANTENNA,
  MOCK_START_OFFSET_MINUTES_BY_ANTENNA,
} from "./mock/passScheduleMockData";

interface AntennaLike {
  id: string;
}

export function getInitialPassSchedule(antennas: AntennaLike[]): Record<string, PassWindow> {
  const now = Date.now();
  const minute = 60_000;
  const schedule: Record<string, PassWindow> = {};

  for (const antenna of antennas) {
    const startOffsetMinutes = MOCK_START_OFFSET_MINUTES_BY_ANTENNA[antenna.id] ?? 20;
    const durationMs = MOCK_PASS_DURATION_MS_BY_ANTENNA[antenna.id] ?? MOCK_DEFAULT_PASS_DURATION_MS;
    const startAt = now + startOffsetMinutes * minute;
    schedule[antenna.id] = {
      startAt,
      endAt: startAt + durationMs,
    };
  }

  return schedule;
}

export function getPassDurationMs(antennaId: string): number {
  return MOCK_PASS_DURATION_MS_BY_ANTENNA[antennaId] ?? MOCK_DEFAULT_PASS_DURATION_MS;
}

export function getRolloverGapMinutes(antennaId: string): number {
  return MOCK_ROLLOVER_GAP_MINUTES_BY_ANTENNA[antennaId] ?? 20;
}
