// Maps DTOs and domain models.
import { PassWindow } from "../types";
import {
  GetInitialPassScheduleResponseDto,
  initialPassScheduleResponseDtoSchema,
  passWindowDtoSchema,
  PassWindowDto,
} from "./contracts";

function mapPassWindowFromDto(dto: PassWindowDto): PassWindow {
  const validated = passWindowDtoSchema.parse(dto);
  return {
    startAt: Date.parse(validated.startAtIso),
    endAt: Date.parse(validated.endAtIso),
  };
}

export function mapInitialPassScheduleFromDto(
  dto: GetInitialPassScheduleResponseDto,
): Record<string, PassWindow> {
  const validated = initialPassScheduleResponseDtoSchema.parse(dto);
  return Object.fromEntries(
    Object.entries(validated.passWindowsByAntennaId).map(([antennaId, passWindowDto]) => [
      antennaId,
      mapPassWindowFromDto(passWindowDto),
    ]),
  );
}
