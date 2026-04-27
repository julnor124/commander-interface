import React, { useEffect, useState } from "react";
import {
  logActivity,
  logAlarm,
  setActivityAntennaContext,
} from "../features/activityLog/activityLogBus";
import CommanderPage, { CommanderPageModel } from "../features/commander/CommanderPage";
import { Antenna } from "../features/commander/types";
import { usePassSchedule } from "../features/passes/usePassSchedule";
import { useCortexAllocation } from "../features/cortex/useCortexAllocation";
import {
  MOCK_ACTIVE_HDR_IDS,
  MOCK_ANTENNAS,
  MOCK_CORTEX_CARDS,
  MOCK_DEFAULT_SELECTED_ANTENNA,
  MOCK_HDR_UNITS_BASE,
  MOCK_MISSION_NOTE_BY_ANTENNA,
} from "../features/mockData/commanderMockData";

const ANTENNAS: Antenna[] = MOCK_ANTENNAS;

function App() {
  const CORTEX_PER_PASS = 2;
  const [selectedAntenna, setSelectedAntenna] = useState<string>(
    MOCK_DEFAULT_SELECTED_ANTENNA,
  );
  const [isCortexDropdownOpen, setIsCortexDropdownOpen] = useState(false);
  const [isHdrDropdownOpen, setIsHdrDropdownOpen] = useState(false);

  const cortexCards = MOCK_CORTEX_CARDS;

  const activeHdrIds =
    MOCK_ACTIVE_HDR_IDS.length > 0
      ? MOCK_ACTIVE_HDR_IDS
      : MOCK_HDR_UNITS_BASE.slice(0, CORTEX_PER_PASS).map((unit) => unit.id);
  const [openHdrIds, setOpenHdrIds] = useState<string[]>([]);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [loggedStartedPasses, setLoggedStartedPasses] = useState<
    Record<string, boolean>
  >({});
  const [loggedIncomingAlarmWindowStartByAntenna, setLoggedIncomingAlarmWindowStartByAntenna] =
    useState<Record<string, number>>({});
  const clickFeedbackClass =
    "press-feedback cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70";

  const toggleHdrCard = (id: string) => {
    setOpenHdrIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 2) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };
  const selectedAntennaData = ANTENNAS.find(
    (antenna) => antenna.id === selectedAntenna,
  );
  const isUnavailable = selectedAntennaData?.color === "#6B7C8F";
  const {
    passScheduleByAntenna,
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
    antennas: ANTENNAS,
    selectedAntennaId: selectedAntenna,
  });
  const isActiveView = isActivePass;
  const isPreparingView = isPendingPassStart && !isUnavailable;
  const isPreparingFinalWindowView = isPreparingView && isPreparingFinalWindow;
  const isUnavailableView = isUnavailable;
  const isFocusedPassView = isPreparingFinalWindowView || isActiveView;
  const isDefaultCountdownView = !isUnavailableView && !isFocusedPassView;
  const isCortexEngaged = isActivePass || isPreparingFinalWindow;
  const hdrUnits = MOCK_HDR_UNITS_BASE.map((unit) => ({
    ...unit,
    active: isActivePass && activeHdrIds.includes(unit.id),
  }));
  const selectedAntennaName = selectedAntennaData?.name ?? selectedAntenna;
  const selectedMissionNote =
    MOCK_MISSION_NOTE_BY_ANTENNA[selectedAntenna] ??
    "2026-04-13 Prepare_pass";
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

    const passStartedMessage = `Pass started for ${
      selectedAntennaData?.name ?? selectedAntenna
    }`;
    logActivity(passStartedMessage);
    logAlarm(passStartedMessage, {
      antennaId: selectedAntenna,
      antennaName: selectedAntennaData?.name ?? selectedAntenna,
    });
    setLoggedStartedPasses((prev) => ({ ...prev, [selectedAntenna]: true }));
  }, [
    isActivePass,
    loggedStartedPasses,
    selectedAntenna,
    selectedAntennaData?.name,
  ]);

  useEffect(() => {
    if (!isPreparingView) return;
    setIsLeftPanelCollapsed(false);
    setIsCortexDropdownOpen(false);
    setIsHdrDropdownOpen(false);
    setOpenHdrIds([]);
    setOpenCortexIds([]);
  }, [isPreparingView, selectedAntenna]);

  useEffect(() => {
    if (!isDefaultCountdownView) return;
    setIsLeftPanelCollapsed(false);
    setIsCortexDropdownOpen(false);
    setIsHdrDropdownOpen(false);
    setOpenHdrIds([]);
    setOpenCortexIds([]);
  }, [isDefaultCountdownView, selectedAntenna]);

  useEffect(() => {
    if (!isActiveView) return;
    setIsLeftPanelCollapsed(false);
  }, [isActiveView, selectedAntenna]);

  useEffect(() => {
    const now = Date.now();
    const incomingAlarmWindowMs = 5 * 60 * 1000;
    const newAlarmStartsByAntenna: Record<string, number> = {};

    for (const antenna of ANTENNAS) {
      const passWindow = passScheduleByAntenna[antenna.id];
      if (!passWindow) continue;

      const msUntilStart = passWindow.startAt - now;
      const isInIncomingWindow = msUntilStart > 0 && msUntilStart <= incomingAlarmWindowMs;
      if (!isInIncomingWindow) continue;

      newAlarmStartsByAntenna[antenna.id] = passWindow.startAt;
      if (loggedIncomingAlarmWindowStartByAntenna[antenna.id] === passWindow.startAt) continue;

      const minutesUntilStart = Math.ceil(msUntilStart / 60_000);
      logAlarm(`Incoming pass for ${antenna.name} in ${minutesUntilStart} min`, {
        antennaId: antenna.id,
        antennaName: antenna.name,
      });
    }

    setLoggedIncomingAlarmWindowStartByAntenna((prev) => {
      const hasChanged =
        Object.keys(prev).length !== Object.keys(newAlarmStartsByAntenna).length ||
        Object.entries(newAlarmStartsByAntenna).some(([antennaId, startAt]) => prev[antennaId] !== startAt);
      return hasChanged ? newAlarmStartsByAntenna : prev;
    });
  }, [loggedIncomingAlarmWindowStartByAntenna, passScheduleByAntenna]);

  const commanderModel: CommanderPageModel = {
    antennas: ANTENNAS,
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

  return <CommanderPage model={commanderModel} />;
}

export default App;
