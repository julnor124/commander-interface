interface AllocationInput {
  selectedAntennaId: string;
  existingAllocations: Record<string, string[]>;
  cortexCardIds: string[];
  cortexPerPass: number;
}

export function allocateCortexForAntenna(input: AllocationInput): string[] {
  const { selectedAntennaId, existingAllocations, cortexCardIds, cortexPerPass } = input;
  const inUse = new Set(
    Object.entries(existingAllocations)
      .filter(([antennaId]) => antennaId !== selectedAntennaId)
      .flatMap(([, cortexIds]) => cortexIds),
  );

  return cortexCardIds.filter((id) => !inUse.has(id)).slice(0, cortexPerPass);
}
