// API DTO contract definitions.
import { OffsetKey } from "../types";

export interface OffsetStateDto {
  Time: number;
  El: number;
  Az: number;
  Step: number;
}

export interface UpdateOffsetRequestDto {
  key: OffsetKey;
  value: number;
}
