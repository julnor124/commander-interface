import { Antenna, CortexData } from "../types";
import {
  MOCK_ACTIVE_HDR_IDS,
  MOCK_ANTENNAS,
  MOCK_DEFAULT_SELECTED_ANTENNA,
  MOCK_HDR_UNITS_BASE,
  MOCK_MISSION_NOTE_BY_ANTENNA,
} from "./mock/commanderMockData";
import { MOCK_CORTEX_CARDS } from "../../cortex/api/mock/cortexMockData";

export function getAntennas(): Antenna[] {
  return MOCK_ANTENNAS;
}

export function getCortexCards(): CortexData[] {
  return MOCK_CORTEX_CARDS;
}

export function getDefaultSelectedAntennaId(): string {
  return MOCK_DEFAULT_SELECTED_ANTENNA;
}

export function getHdrUnitsBase() {
  return MOCK_HDR_UNITS_BASE;
}

export function getActiveHdrIds(): string[] {
  return MOCK_ACTIVE_HDR_IDS;
}

export function getMissionNoteByAntenna(): Record<string, string> {
  return MOCK_MISSION_NOTE_BY_ANTENNA;
}
