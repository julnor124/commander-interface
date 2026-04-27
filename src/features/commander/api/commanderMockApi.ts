// commanderMockApi API layer.
import { Antenna, CortexData, HdrUnit } from "../types";
import {
  MOCK_ACTIVE_HDR_IDS,
  MOCK_ANTENNAS_DTO,
  MOCK_DEFAULT_SELECTED_ANTENNA,
  MOCK_HDR_UNITS_BASE_DTO,
  MOCK_MISSION_NOTE_BY_ANTENNA_DTO,
} from "./mock/commanderMockData";
import { MOCK_CORTEX_CARDS } from "../../cortex/api/cortexApi";
import {
  mapAntennasFromDto,
  mapHdrUnitsBaseFromDto,
  mapMissionNoteByAntennaIdFromDto,
} from "./mappers";

export function getAntennas(): Antenna[] {
  return mapAntennasFromDto(MOCK_ANTENNAS_DTO);
}

export function getCortexCards(): CortexData[] {
  return MOCK_CORTEX_CARDS;
}

export function getDefaultSelectedAntennaId(): string {
  return MOCK_DEFAULT_SELECTED_ANTENNA;
}

export function getHdrUnitsBase(): HdrUnit[] {
  return mapHdrUnitsBaseFromDto(MOCK_HDR_UNITS_BASE_DTO);
}

export function getActiveHdrIds(): string[] {
  return MOCK_ACTIVE_HDR_IDS;
}

export function getMissionNoteByAntenna(): Record<string, string> {
  return mapMissionNoteByAntennaIdFromDto(MOCK_MISSION_NOTE_BY_ANTENNA_DTO);
}
