// API DTO contract definitions.
import { z } from "zod";

export interface AntennaDto {
  id: string;
  name: string;
  color: string;
  status: "active" | "inactive" | "standby";
}

export interface HdrUnitBaseDto {
  id: string;
  label: string;
}

export interface MissionNoteByAntennaIdDto {
  [antennaId: string]: string;
}

export const antennaDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  status: z.union([z.literal("active"), z.literal("inactive"), z.literal("standby")]),
});

export const hdrUnitBaseDtoSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export const missionNoteByAntennaIdDtoSchema = z.record(z.string(), z.string());
