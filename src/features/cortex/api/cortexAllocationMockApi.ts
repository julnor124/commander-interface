// cortexAllocationMockApi API layer.
import { mapAllocateCortexRequest, mapAllocateCortexResponse } from "./mappers";
import { AllocationInput } from "../types";

export function allocateCortexForAntenna(input: AllocationInput): string[] {
  const request = mapAllocateCortexRequest(input);
  const { selectedAntennaId, existingAllocations, cortexCardIds, cortexPerPass } = request;
  const inUse = new Set(
    Object.entries(existingAllocations)
      .filter(([antennaId]) => antennaId !== selectedAntennaId)
      .flatMap(([, cortexIds]) => cortexIds),
  );

  return mapAllocateCortexResponse({
    allocatedCortexIds: cortexCardIds.filter((id) => !inUse.has(id)).slice(0, cortexPerPass),
  });
}
