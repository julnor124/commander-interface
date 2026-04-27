// Feature type definitions.
export interface ActivityEntry {
  timestamp: string;
  message: string;
  type?: "activity" | "alarm";
  antennaId?: string;
  antennaName?: string;
}
