// Maps DTOs and domain models.
import {
  CalibrateRfRequestDto,
  CalibrateRfResponseDto,
  SetMatrixStateRequestDto,
  SetMatrixStateResponseDto,
  SetRfStateRequestDto,
  SetRfStateResponseDto,
} from "./contracts";

export function mapSetMatrixStateRequest(nextState: "ON" | "OFF"): SetMatrixStateRequestDto {
  return { state: nextState };
}

export function mapSetMatrixStateResponse(dto: SetMatrixStateResponseDto) {
  return { state: dto.state };
}

export function mapSetRfStateRequest(
  target: "RF" | "X RF",
  nextState: "ON" | "OFF",
): SetRfStateRequestDto {
  return { target, state: nextState };
}

export function mapSetRfStateResponse(dto: SetRfStateResponseDto) {
  return { target: dto.target, state: dto.state };
}

export function mapCalibrateRfRequest(target: "RF" | "X RF"): CalibrateRfRequestDto {
  return { target };
}

export function mapCalibrateRfResponse(dto: CalibrateRfResponseDto) {
  return { target: dto.target, status: dto.status };
}
