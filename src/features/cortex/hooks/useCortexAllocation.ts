// useCortexAllocation hook logic.
import { useEffect, useMemo, useState } from 'react';
import { allocateCortexForAntenna } from '../api/cortexAllocationMockApi';

interface CortexCardLike {
  id: string;
}

export function useCortexAllocation(params: {
  cortexCards: CortexCardLike[];
  cortexPerPass: number;
  selectedAntennaId: string;
  selectedAntennaName: string;
  hasScheduledPass: boolean;
  isCortexEngaged: boolean;
  log: (message: string) => void;
}) {
  const {
    cortexCards,
    cortexPerPass,
    selectedAntennaId,
    selectedAntennaName,
    hasScheduledPass,
    isCortexEngaged,
    log,
  } = params;

  const [assignedCortexIdsByAntennaId, setAssignedCortexIdsByAntennaId] = useState<Record<string, string[]>>({});
  const [openCortexIds, setOpenCortexIds] = useState<string[]>([]);

  const activeCortexIds = assignedCortexIdsByAntennaId[selectedAntennaId] ?? [];
  const effectiveActiveCortexIds = useMemo(() => (isCortexEngaged ? activeCortexIds : []), [activeCortexIds, isCortexEngaged]);

  useEffect(() => {
    if (!hasScheduledPass) return;
    if (assignedCortexIdsByAntennaId[selectedAntennaId]) return;

    const allocatedCortex = allocateCortexForAntenna({
      selectedAntennaId,
      existingAllocations: assignedCortexIdsByAntennaId,
      cortexCardIds: cortexCards.map((card) => card.id),
      cortexPerPass,
    });

    setAssignedCortexIdsByAntennaId((prev) => {
      if (prev[selectedAntennaId]) return prev;
      return {
        ...prev,
        [selectedAntennaId]: allocatedCortex,
      };
    });

    log(
      allocatedCortex.length > 0
        ? `Allocated ${allocatedCortex.join(', ')} to ${selectedAntennaName}`
        : `No available Cortex for ${selectedAntennaName}`,
    );
    log(`Pass queued for ${selectedAntennaName}`);
  }, [
    assignedCortexIdsByAntennaId,
    cortexCards,
    cortexPerPass,
    hasScheduledPass,
    log,
    selectedAntennaId,
    selectedAntennaName,
  ]);

  useEffect(() => {
    if (!hasScheduledPass || !isCortexEngaged) {
      setOpenCortexIds([]);
      return;
    }
    const assignedForSelected = assignedCortexIdsByAntennaId[selectedAntennaId] ?? [];
    setOpenCortexIds(assignedForSelected);
  }, [assignedCortexIdsByAntennaId, hasScheduledPass, isCortexEngaged, selectedAntennaId]);

  const toggleCortexCard = (id: string) => {
    setOpenCortexIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 4) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  return {
    effectiveActiveCortexIds,
    openCortexIds,
    setOpenCortexIds,
    toggleCortexCard,
  };
}
