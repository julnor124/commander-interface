// Maps DTOs and domain models.
import { ActivityEntry } from "../types";
import { ActivityEntryDto, PublishLogEntryRequestDto } from "./contracts";

export function mapActivityEntryFromDto(dto: ActivityEntryDto): ActivityEntry {
  return {
    timestamp: dto.timestamp,
    message: dto.message,
    type: dto.type,
    antennaId: dto.antennaId,
    antennaName: dto.antennaName,
  };
}

export function mapActivityEntriesFromDto(dtos: ActivityEntryDto[]): ActivityEntry[] {
  return dtos.map(mapActivityEntryFromDto);
}

export function mapPublishLogEntryRequest(
  message: string,
  type: "activity" | "alarm",
  options?: { antennaId?: string; antennaName?: string },
): PublishLogEntryRequestDto {
  return {
    message,
    type,
    antennaId: options?.antennaId,
    antennaName: options?.antennaName,
  };
}
