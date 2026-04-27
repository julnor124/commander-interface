// Feature type definitions.
export interface AllocationInput {
  selectedAntennaId: string;
  existingAllocations: Record<string, string[]>;
  cortexCardIds: string[];
  cortexPerPass: number;
}
