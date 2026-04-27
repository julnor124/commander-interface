// API DTO contract definitions.
export interface AllocateCortexRequestDto {
  selectedAntennaId: string;
  existingAllocations: Record<string, string[]>;
  cortexCardIds: string[];
  cortexPerPass: number;
}

export interface AllocateCortexResponseDto {
  allocatedCortexIds: string[];
}
