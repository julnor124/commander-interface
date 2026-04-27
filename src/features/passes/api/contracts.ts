// API DTO contract definitions.
import { z } from "zod";

export interface PassWindowDto {
  startAtIso: string;
  endAtIso: string;
}

export interface GetInitialPassScheduleResponseDto {
  passWindowsByAntennaId: Record<string, PassWindowDto>;
}

export const passWindowDtoSchema = z.object({
  startAtIso: z.string().datetime(),
  endAtIso: z.string().datetime(),
});

export const initialPassScheduleResponseDtoSchema = z.object({
  passWindowsByAntennaId: z.record(z.string(), passWindowDtoSchema),
});
