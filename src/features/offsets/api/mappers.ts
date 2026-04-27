// Maps DTOs and domain models.
import { OffsetState } from "../types";
import { OffsetStateDto } from "./contracts";

export function mapOffsetStateFromDto(dto: OffsetStateDto): OffsetState {
  return {
    Time: dto.Time,
    El: dto.El,
    Az: dto.Az,
    Step: dto.Step,
  };
}

export function mapOffsetStateToDto(state: OffsetState): OffsetStateDto {
  return {
    Time: state.Time,
    El: state.El,
    Az: state.Az,
    Step: state.Step,
  };
}
