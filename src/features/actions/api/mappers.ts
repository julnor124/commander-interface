// Maps DTOs and domain models.
import { RunActionRequestDto, RunActionResponseDto } from "./contracts";
import { ActionRunResult } from "../types";

export function mapRunActionRequest(actionName: string): RunActionRequestDto {
  return { actionName };
}

export function mapRunActionResponse(dto: RunActionResponseDto): ActionRunResult {
  return { actionName: dto.actionName, status: dto.status };
}
