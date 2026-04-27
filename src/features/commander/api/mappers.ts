// Maps DTOs and domain models.
import { Antenna, HdrUnit } from "../types";
import {
  antennaDtoSchema,
  AntennaDto,
  hdrUnitBaseDtoSchema,
  HdrUnitBaseDto,
  missionNoteByAntennaIdDtoSchema,
} from "./contracts";

export function mapAntennaFromDto(dto: AntennaDto): Antenna {
  const validated = antennaDtoSchema.parse(dto);
  return {
    id: validated.id,
    name: validated.name,
    color: validated.color,
    status: validated.status,
  };
}

export function mapAntennasFromDto(dtos: AntennaDto[]): Antenna[] {
  return dtos.map(mapAntennaFromDto);
}

export function mapHdrUnitsBaseFromDto(dtos: HdrUnitBaseDto[]): HdrUnit[] {
  return dtos.map((dto) => {
    const validated = hdrUnitBaseDtoSchema.parse(dto);
    return {
      id: validated.id,
      label: validated.label,
      active: false,
    };
  });
}

export function mapMissionNoteByAntennaIdFromDto(dto: Record<string, string>) {
  return missionNoteByAntennaIdDtoSchema.parse(dto);
}
