import { useEffect, useMemo, useState } from 'react';

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
  commanderView: 'commander1' | 'commander2';
  log: (message: string) => void;
}) {
  const {
    cortexCards,
    cortexPerPass,
    selectedAntennaId,
    selectedAntennaName,
    hasScheduledPass,
    isCortexEngaged,
    commanderView,
    log,
  } = params;

  const [assignedCortexByAntenna, setAssignedCortexByAntenna] = useState<Record<string, string[]>>({});
  const [openCortexIds, setOpenCortexIds] = useState<string[]>([]);

  const activeCortexIds = assignedCortexByAntenna[selectedAntennaId] ?? [];
  const effectiveActiveCortexIds = useMemo(() => (isCortexEngaged ? activeCortexIds : []), [activeCortexIds, isCortexEngaged]);

  useEffect(() => {
    if (!hasScheduledPass) return;

    let allocatedCortex: string[] = [];
    setAssignedCortexByAntenna((prev) => {
      if (prev[selectedAntennaId]) {
        allocatedCortex = prev[selectedAntennaId];
        return prev;
      }

      const inUse = new Set(
        Object.entries(prev)
          .filter(([antennaId]) => antennaId !== selectedAntennaId)
          .flatMap(([, cortexIds]) => cortexIds),
      );
      const available = cortexCards.map((card) => card.id).filter((id) => !inUse.has(id));
      allocatedCortex = available.slice(0, cortexPerPass);

      return {
        ...prev,
        [selectedAntennaId]: allocatedCortex,
      };
    });

    if (allocatedCortex.length > 0) {
      log(`Allocated ${allocatedCortex.join(', ')} to ${selectedAntennaName}`);
    } else {
      log(`No available Cortex for ${selectedAntennaName}`);
    }
    log(`Pass queued for ${selectedAntennaName}`);
  }, [cortexCards, cortexPerPass, hasScheduledPass, log, selectedAntennaId, selectedAntennaName]);

  useEffect(() => {
    if (commanderView === 'commander2') {
      setOpenCortexIds([]);
      return;
    }
    if (!hasScheduledPass || !isCortexEngaged) {
      setOpenCortexIds([]);
      return;
    }
    const assignedForSelected = assignedCortexByAntenna[selectedAntennaId] ?? [];
    setOpenCortexIds(assignedForSelected);
  }, [assignedCortexByAntenna, commanderView, hasScheduledPass, isCortexEngaged, selectedAntennaId]);

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

