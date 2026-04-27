import { useEffect, useState } from "react";
import {
  logActivity,
  logAlarm,
  setActivityAntennaContext,
} from "../../activityLog/activityLogBus";
import { CommanderPageModel } from "../components/CommanderPage";
import { usePassSchedule } from "../../passes/hooks/usePassSchedule";
import { useCortexAllocation } from "../../cortex/hooks/useCortexAllocation";
import {
  getActiveHdrIds,
  getAntennas,
  getCortexCards,
  getDefaultSelectedAntennaId,
  getHdrUnitsBase,
  getMissionNoteByAntenna,
} from "../api/commanderMockApi";

const CORTEX_PER_PASS = 2;

export function useCommanderViewModel(): CommanderPageModel {
  const antennas = getAntennas();
  const cortexCards = getCortexCards();
  const missionNoteByAntennaId = getMissionNoteByAntenna();
  const defaultSelectedAntenna = getDefaultSelectedAntennaId();
  const hdrUnitsBase = getHdrUnitsBase();
  const configuredActiveHdrIds = getActiveHdrIds();

  const [selectedAntenna, setSelectedAntenna] = useState<string>(defaultSelectedAntenna);
  const [isCortexDropdownOpen, setIsCortexDropdownOpen] = useState(false);
  const [isHdrDropdownOpen, setIsHdrDropdownOpen] = useState(false);
  const [openHdrIds, setOpenHdrIds] = useState<string[]>([]);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [loggedStartedPasses, setLoggedStartedPasses] = useState<Record<string, boolean>>({});
  const [loggedIncomingAlarmWindowStartByAntennaId, setLoggedIncomingAlarmWindowStartByAntennaId] =
    useState<Record<string, number>>({});

  const clickFeedbackClass =
    "press-feedback cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70";

  const activeHdrIds =
    configuredActiveHdrIds.length > 0
      ? configuredActiveHdrIds
      : hdrUnitsBase.slice(0, CORTEX_PER_PASS).map((unit) => unit.id);

  const toggleHdrCard = (id: string) => {
    setOpenHdrIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 2) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const selectedAntennaData = antennas.find((antenna) => antenna.id === selectedAntenna);
  const selectedAntennaName = selectedAntennaData?.name ?? selectedAntenna;
  const isUnavailable = selectedAntennaData?.color === "#6B7C8F";

  const {
    passWindowsByAntennaId,
    hasScheduledPass,
    msUntilPassStart,
    isPendingPassStart,
    isPreparingFinalWindow,
    isActivePass,
    passProgress,
    passStartsAtLabel,
    passEndsAtLabel,
    timeLeftLabel,
    countdownLabel,
    activePassAntennaIds,
  } = usePassSchedule({
    antennas,
    selectedAntennaId: selectedAntenna,
  });

  const isActiveView = isActivePass;
  const isPreparingView = isPendingPassStart && !isUnavailable;
  const isPreparingFinalWindowView = isPreparingView && isPreparingFinalWindow;
  const isUnavailableView = isUnavailable;
  const isFocusedPassView = isPreparingFinalWindowView || isActiveView;
  const isDefaultCountdownView = !isUnavailableView && !isFocusedPassView;
  const isCortexEngaged = isActivePass || isPreparingFinalWindow;

  const hdrUnits = hdrUnitsBase.map((unit) => ({
    ...unit,
    active: isActivePass && activeHdrIds.includes(unit.id),
  }));

  const selectedMissionNote =
    missionNoteByAntennaId[selectedAntenna] ?? "2026-04-13 Prepare_pass";
  const selectedMissionName =
    selectedMissionNote.split("Prepare_pass ")[1] ?? selectedMissionNote;

  const {
    effectiveActiveCortexIds,
    openCortexIds,
    setOpenCortexIds,
    toggleCortexCard,
  } = useCortexAllocation({
    cortexCards,
    cortexPerPass: CORTEX_PER_PASS,
    selectedAntennaId: selectedAntenna,
    selectedAntennaName,
    hasScheduledPass,
    isCortexEngaged,
    log: logActivity,
  });

  useEffect(() => {
    if (!selectedAntennaData) return;
    setActivityAntennaContext({
      antennaId: selectedAntennaData.id,
      antennaName: selectedAntennaData.name,
    });
  }, [selectedAntennaData]);

  useEffect(() => {
    if (!isActivePass) return;
    if (loggedStartedPasses[selectedAntenna]) return;

    const passStartedMessage = `Pass started for ${selectedAntennaName}`;
    logActivity(passStartedMessage);
    logAlarm(passStartedMessage, {
      antennaId: selectedAntenna,
      antennaName: selectedAntennaName,
    });
    setLoggedStartedPasses((prev) => ({ ...prev, [selectedAntenna]: true }));
  }, [isActivePass, loggedStartedPasses, selectedAntenna, selectedAntennaName]);

  useEffect(() => {
    if (!isPreparingView && !isDefaultCountdownView) return;
    setIsLeftPanelCollapsed(false);
    setIsCortexDropdownOpen(false);
    setIsHdrDropdownOpen(false);
    setOpenHdrIds([]);
    setOpenCortexIds([]);
  }, [isPreparingView, isDefaultCountdownView, selectedAntenna, setOpenCortexIds]);

  useEffect(() => {
    if (!isActiveView) return;
    setIsLeftPanelCollapsed(false);
  }, [isActiveView, selectedAntenna]);

  useEffect(() => {
    const now = Date.now();
    const incomingAlarmWindowMs = 5 * 60 * 1000;
    const newAlarmStartsByAntenna: Record<string, number> = {};

    for (const antenna of antennas) {
      const passWindow = passWindowsByAntennaId[antenna.id];
      if (!passWindow) continue;

      const msUntilStart = passWindow.startAt - now;
      const isInIncomingWindow = msUntilStart > 0 && msUntilStart <= incomingAlarmWindowMs;
      if (!isInIncomingWindow) continue;

      newAlarmStartsByAntenna[antenna.id] = passWindow.startAt;
      if (loggedIncomingAlarmWindowStartByAntennaId[antenna.id] === passWindow.startAt) continue;

      const minutesUntilStart = Math.ceil(msUntilStart / 60_000);
      logAlarm(`Incoming pass for ${antenna.name} in ${minutesUntilStart} min`, {
        antennaId: antenna.id,
        antennaName: antenna.name,
      });
    }

    setLoggedIncomingAlarmWindowStartByAntennaId((prev) => {
      const hasChanged =
        Object.keys(prev).length !== Object.keys(newAlarmStartsByAntenna).length ||
        Object.entries(newAlarmStartsByAntenna).some(([antennaId, startAt]) => prev[antennaId] !== startAt);
      return hasChanged ? newAlarmStartsByAntenna : prev;
    });
  }, [loggedIncomingAlarmWindowStartByAntennaId, passWindowsByAntennaId, antennas]);

  return {
    antennas,
    selectedAntenna,
    selectedAntennaName,
    setSelectedAntenna,
    isActivePass,
    isUnavailable,
    activePassAntennaIds,
    clickFeedbackClass,
    isCortexDropdownOpen,
    setIsCortexDropdownOpen,
    isHdrDropdownOpen,
    setIsHdrDropdownOpen,
    isLeftPanelCollapsed,
    setIsLeftPanelCollapsed,
    cortexCards,
    hdrUnits,
    openCortexIds,
    setOpenCortexIds,
    openHdrIds,
    effectiveActiveCortexIds,
    toggleCortexCard,
    toggleHdrCard,
    isPendingPassStart,
    msUntilPassStart,
    passStartsAtLabel,
    passEndsAtLabel,
    timeLeftLabel,
    countdownLabel,
    missionNote: selectedMissionNote,
    missionName: selectedMissionName,
    passProgress,
    isPreparingView,
    isUnavailableView,
    isFocusedPassView,
    isDefaultCountdownView,
    isPreparingFinalWindowView,
  };
}
