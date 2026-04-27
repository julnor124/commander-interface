// Maps DTOs and domain models.
import { AllocateCortexRequestDto, AllocateCortexResponseDto } from "./contracts";

export function mapAllocateCortexRequest(params: {
  selectedAntennaId: string;
  existingAllocations: Record<string, string[]>;
  cortexCardIds: string[];
  cortexPerPass: number;
}): AllocateCortexRequestDto {
  return {
    selectedAntennaId: params.selectedAntennaId,
    existingAllocations: params.existingAllocations,
    cortexCardIds: params.cortexCardIds,
    cortexPerPass: params.cortexPerPass,
  };
}

export function mapAllocateCortexResponse(dto: AllocateCortexResponseDto): string[] {
  return dto.allocatedCortexIds;
}
