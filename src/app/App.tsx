import React, { useEffect, useState } from "react";
import {
  logActivity,
  setActivityAntennaContext,
} from "../features/activityLog/activityLogBus";
import { CommanderPageModel } from "../features/commander/CommanderPage";
import Commander1Page from "../features/commander1/Commander1Page";
import Commander2Page from "../features/commander2/Commander2Page";
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
  const [activeCommanderView, setActiveCommanderView] = useState<
    "commander1" | "commander2"
  >("commander1");
  const [isCortexDropdownOpen, setIsCortexDropdownOpen] = useState(false);
  const [isHdrDropdownOpen, setIsHdrDropdownOpen] = useState(false);

  const cortexCards = MOCK_CORTEX_CARDS;

  const activeHdrIds = MOCK_ACTIVE_HDR_IDS;
  const [openHdrIds, setOpenHdrIds] = useState<string[]>([]);
  const [isLeftPanelCollapsedC2, setIsLeftPanelCollapsedC2] = useState(false);
  const [loggedStartedPasses, setLoggedStartedPasses] = useState<
    Record<string, boolean>
  >({});
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
    setIsHdrDropdownOpen(false);
  };
  const selectedAntennaData = ANTENNAS.find(
    (antenna) => antenna.id === selectedAntenna,
  );
  const isUnavailable = selectedAntennaData?.color === "#6B7C8F";
  const {
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
  const isC2ActiveView = activeCommanderView === "commander2" && isActivePass;
  const isC2PreparingView =
    activeCommanderView === "commander2" &&
    isPendingPassStart &&
    !isUnavailable;
  const isC2PreparingFinalWindow = isC2PreparingView && isPreparingFinalWindow;
  const isC2UnavailableView =
    activeCommanderView === "commander2" && isUnavailable;
  const isC2FocusedPassView =
    activeCommanderView === "commander2" &&
    (isC2PreparingFinalWindow || isC2ActiveView);
  const isC2DefaultCountdownView =
    activeCommanderView === "commander2" &&
    !isC2UnavailableView &&
    !isC2FocusedPassView;
  const c2LayoutKey =
    activeCommanderView === "commander2"
      ? `${selectedAntenna}-${isC2PreparingView ? "preparing" : isC2UnavailableView ? "unavailable" : isC2ActiveView ? "active" : "idle"}`
      : "commander1";
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
    commanderView: activeCommanderView,
    log: logActivity,
  });

  const toggleCortexCardAndClose = (id: string) => {
    toggleCortexCard(id);
    setIsCortexDropdownOpen(false);
  };

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

    logActivity(
      `Pass started for ${selectedAntennaData?.name ?? selectedAntenna}`,
    );
    setLoggedStartedPasses((prev) => ({ ...prev, [selectedAntenna]: true }));
  }, [
    isActivePass,
    loggedStartedPasses,
    selectedAntenna,
    selectedAntennaData?.name,
  ]);

  useEffect(() => {
    if (!isC2PreparingView) return;
    setIsLeftPanelCollapsedC2(true);
    setIsCortexDropdownOpen(false);
    setIsHdrDropdownOpen(false);
    setOpenHdrIds([]);
    setOpenCortexIds([]);
  }, [activeCommanderView, isC2PreparingView, selectedAntenna]);

  useEffect(() => {
    if (!isC2DefaultCountdownView) return;
    setIsLeftPanelCollapsedC2(true);
    setIsCortexDropdownOpen(false);
    setIsHdrDropdownOpen(false);
    setOpenHdrIds([]);
    setOpenCortexIds([]);
  }, [isC2DefaultCountdownView, selectedAntenna]);

  useEffect(() => {
    if (!isC2ActiveView) return;
    setIsLeftPanelCollapsedC2(true);
  }, [isC2ActiveView, selectedAntenna]);

  useEffect(() => {
    if (activeCommanderView !== "commander2") return;
    setIsCortexDropdownOpen(false);
  }, [activeCommanderView, selectedAntenna]);

  const commanderModel: CommanderPageModel = {
    antennas: ANTENNAS,
    selectedAntenna,
    selectedAntennaName,
    setSelectedAntenna,
    activeCommanderView,
    setActiveCommanderView,
    isActivePass,
    isUnavailable,
    activePassAntennaIds,
    clickFeedbackClass,
    isCortexDropdownOpen,
    setIsCortexDropdownOpen,
    isHdrDropdownOpen,
    setIsHdrDropdownOpen,
    isLeftPanelCollapsedC2,
    setIsLeftPanelCollapsedC2,
    cortexCards,
    hdrUnits,
    openCortexIds,
    setOpenCortexIds,
    openHdrIds,
    effectiveActiveCortexIds,
    toggleCortexCard: toggleCortexCardAndClose,
    toggleHdrCard,
    c2LayoutKey,
    isPendingPassStart,
    msUntilPassStart,
    passStartsAtLabel,
    passEndsAtLabel,
    timeLeftLabel,
    countdownLabel,
    missionNote: selectedMissionNote,
    missionName: selectedMissionName,
    passProgress,
    isC2PreparingView,
    isC2UnavailableView,
    isC2FocusedPassView,
    isC2DefaultCountdownView,
    isC2PreparingFinalWindow,
  };

  return activeCommanderView === "commander1" ? (
    <Commander1Page model={commanderModel} />
  ) : (
    <Commander2Page model={commanderModel} />
  );
}

export default App;
