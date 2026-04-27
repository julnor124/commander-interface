// API DTO contract definitions.
export interface ActivityEntryDto {
  timestamp: string;
  message: string;
  type?: "activity" | "alarm";
  antennaId?: string;
  antennaName?: string;
}

export interface PublishLogEntryRequestDto {
  message: string;
  type: "activity" | "alarm";
  antennaId?: string;
  antennaName?: string;
}
