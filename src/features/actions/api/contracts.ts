// API DTO contract definitions.
export interface RunActionRequestDto {
  actionName: string;
}

export interface RunActionResponseDto {
  actionName: string;
  status: "ok";
}
