// cortexApi API layer.
export { allocateCortexForAntenna } from "./cortexAllocationMockApi";
export { MOCK_CORTEX_CARDS } from "./mock/cortexMockData";
export type { AllocateCortexRequestDto, AllocateCortexResponseDto } from "./contracts";
export { mapAllocateCortexRequest, mapAllocateCortexResponse } from "./mappers";
