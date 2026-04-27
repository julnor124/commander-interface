// API DTO contract definitions.
export type MatrixStateDto = "ON" | "OFF";
export type RfTargetDto = "RF" | "X RF";
export type RfStateDto = "ON" | "OFF";

export interface SetMatrixStateRequestDto {
  state: MatrixStateDto;
}

export interface SetMatrixStateResponseDto {
  state: MatrixStateDto;
}

export interface SetRfStateRequestDto {
  target: RfTargetDto;
  state: RfStateDto;
}

export interface SetRfStateResponseDto {
  target: RfTargetDto;
  state: RfStateDto;
}

export interface CalibrateRfRequestDto {
  target: RfTargetDto;
}

export interface CalibrateRfResponseDto {
  target: RfTargetDto;
  status: "ok";
}
