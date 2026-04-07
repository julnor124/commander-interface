import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import AntennaSelector from './components/AntennaSelector';
import CortexCard from './components/CortexCard';
import HDRCard from './components/HDRCard';
import PassInfoCard from './components/PassInfoCard';
import AntennaStatusPanel from './components/AntennaStatusPanel';
import SignalPanel from './components/SignalPanel';
import ControlPanel from './components/ControlPanel';
import ActionsPanel from './components/ActionsPanel';
import TrackingPanel from './components/TrackingPanel';
import ActivityLog from './components/ActivityLog';
import { logActivity, setActivityAntennaContext } from './utils/activityLog';

export interface Antenna {
  id: string;
  name: string;
  color: string;
  status: 'active' | 'inactive' | 'standby';
}

export interface CortexData {
  id: string;
  name: string;
  sifQulefx: string;
  sifQuleftx: string;
  sifQuleftxAlt: string;
  sdmFa: string;
  sdmFas: string;
  sdmFasn: string;
  monJ: string;
  mosN: string;
  hdrJ: string;
  dspO: string;
  img: string;
  pll: string;
  sweep: string;
  rec: string;
  carrier: string;
}

interface PassWindow {
  startAt: number;
  endAt: number;
}

const PASS_DURATION_MINUTES = 15;
const DEFAULT_PASS_DURATION_MS = PASS_DURATION_MINUTES * 60_000;
const PASS_DURATION_MS_BY_ANTENNA: Record<string, number> = {};
const ROLLOVER_GAP_MINUTES_BY_ANTENNA: Record<string, number> = {
  maja: 0,
  ella: 22,
  sina: 26,
  olivia: 30,
  vickan: 0,
  vilma: 24,
  emma: 28,
  malin: 32,
  frida: 20,
  amanda: 0,
  hanna: 34,
  hugo: 38,
};

const ANTENNAS: Antenna[] = [
  { id: 'maja', name: 'Maja', color: '#3ABEFF', status: 'inactive' },
  { id: 'ella', name: 'Elin', color: '#B8963E', status: 'inactive' },
  { id: 'sina', name: 'Bella', color: '#B8963E', status: 'inactive' },
  { id: 'olivia', name: 'Camilla', color: '#6B7C8F', status: 'inactive' },
  { id: 'vickan', name: 'Peter', color: '#3ABEFF', status: 'inactive' },
  { id: 'vilma', name: 'Vilma', color: '#B8963E', status: 'active' },
  { id: 'emma', name: 'Emma', color: '#B8963E', status: 'inactive' },
  { id: 'malin', name: 'Malin', color: '#B8963E', status: 'inactive' },
  { id: 'frida', name: 'Frida', color: '#B8963E', status: 'inactive' },
  { id: 'amanda', name: 'Amanda', color: '#3ABEFF', status: 'inactive' },
  { id: 'hanna', name: 'Hanna', color: '#6B7C8F', status: 'inactive' },
  { id: 'hugo', name: 'Hugo', color: '#6B7C8F', status: 'inactive' },
];

function App() {
  const CORTEX_PER_PASS = 2;
  const [selectedAntenna, setSelectedAntenna] = useState<string>('maja');
  const [activeCommanderView, setActiveCommanderView] = useState<'commander1' | 'commander2'>('commander1');
  const [isCortexDropdownOpen, setIsCortexDropdownOpen] = useState(false);
  const [isHdrDropdownOpen, setIsHdrDropdownOpen] = useState(false);

  const [cortexCards] = useState<CortexData[]>([
    {
      id: 'cortex-1',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '20',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-2',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '40',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-3',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '48',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-4',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '50',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-5',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '22',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-6',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '11',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-7',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '18',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-8',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '35',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-9',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '44',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-10',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '29',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-11',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '15',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
    {
      id: 'cortex-12',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'INFO',
      sdmFa: 'SIM 1',
      sdmFas: 'FA',
      sdmFasn: 'FAS',
      monJ: 'MON-J',
      mosN: 'MOD_4',
      hdrJ: 'TM-B',
      dspO: 'DOP-0',
      img: '08',
      pll: 'PLL',
      sweep: 'SWEEP',
      rec: 'REC',
      carrier: 'CARRIER',
    },
  ]);

  const [assignedCortexByAntenna, setAssignedCortexByAntenna] = useState<Record<string, string[]>>({});
  const activeCortexIds = assignedCortexByAntenna[selectedAntenna] ?? [];
  const activeHdrIds = ['hdr-1', 'hdr-2'];
  const [openCortexIds, setOpenCortexIds] = useState<string[]>([]);
  const [openHdrIds, setOpenHdrIds] = useState<string[]>([]);
  const [isLeftPanelCollapsedC2, setIsLeftPanelCollapsedC2] = useState(false);
  const [passScheduleByAntenna, setPassScheduleByAntenna] = useState<Record<string, PassWindow>>(() => {
    const now = Date.now();
    const minute = 60_000;
    const createWindow = (antennaId: string, startOffsetMinutes: number): PassWindow => {
      const durationMs = PASS_DURATION_MS_BY_ANTENNA[antennaId] ?? DEFAULT_PASS_DURATION_MS;
      const startAt = now + startOffsetMinutes * minute;
      return {
        startAt,
        endAt: startAt + durationMs,
      };
    };

    return {
      maja: createWindow('maja', -2),
      ella: createWindow('ella', 22),
      sina: createWindow('sina', 26),
      olivia: createWindow('olivia', 35),
      vickan: createWindow('vickan', -3),
      vilma: createWindow('vilma', 24),
      emma: createWindow('emma', 28),
      malin: createWindow('malin', 30),
      frida: createWindow('frida', 32),
      amanda: createWindow('amanda', 0),
      hanna: createWindow('hanna', 40),
      hugo: createWindow('hugo', 45),
    };
  });
  const [currentTimeMs, setCurrentTimeMs] = useState(Date.now());
  const [loggedStartedPasses, setLoggedStartedPasses] = useState<Record<string, boolean>>({});
  const clickFeedbackClass =
    'cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';

  const toggleCortexCard = (id: string) => {
    setOpenCortexIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
    setIsCortexDropdownOpen(false);
  };

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
  const selectedAntennaData = ANTENNAS.find((antenna) => antenna.id === selectedAntenna);
  const isUnavailable = selectedAntennaData?.color === '#6B7C8F';
  const selectedPassWindow = passScheduleByAntenna[selectedAntenna];
  const hasScheduledPass = Boolean(selectedPassWindow) && !isUnavailable;
  const msUntilPassStart =
    hasScheduledPass && selectedPassWindow.startAt > currentTimeMs
      ? selectedPassWindow.startAt - currentTimeMs
      : 0;
  const msUntilPassEnd =
    hasScheduledPass && selectedPassWindow.endAt > currentTimeMs
      ? selectedPassWindow.endAt - currentTimeMs
      : 0;
  const isPendingPassStart =
    hasScheduledPass &&
    currentTimeMs < selectedPassWindow.startAt;
  const isPreparingFinalWindow = isPendingPassStart && msUntilPassStart <= 5 * 60 * 1000;
  const isActivePass =
    hasScheduledPass &&
    currentTimeMs >= selectedPassWindow.startAt &&
    currentTimeMs < selectedPassWindow.endAt;
  const passDurationMs = hasScheduledPass
    ? Math.max(1, selectedPassWindow.endAt - selectedPassWindow.startAt)
    : 1;
  const passProgress = isActivePass
    ? Math.min(
        1,
        Math.max(0, (currentTimeMs - selectedPassWindow.startAt) / passDurationMs),
      )
    : 0;
  const formatClockTime = (timestampMs: number) =>
    new Date(timestampMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDuration = (durationMs: number) => {
    const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}min ${seconds.toString().padStart(2, '0')}s`;
  };
  const passStartsAtLabel = selectedPassWindow ? formatClockTime(selectedPassWindow.startAt) : '--:--';
  const passEndsAtLabel = selectedPassWindow ? formatClockTime(selectedPassWindow.endAt) : '--:--';
  const timeLeftLabel = formatDuration(msUntilPassEnd);
  const countdownLabel = formatDuration(msUntilPassStart);
  const isC2ActiveView = activeCommanderView === 'commander2' && isActivePass;
  const isC2PreparingView = activeCommanderView === 'commander2' && isPendingPassStart && !isUnavailable;
  const isC2PreparingFinalWindow = isC2PreparingView && isPreparingFinalWindow;
  const isC2UnavailableView = activeCommanderView === 'commander2' && isUnavailable;
  const isC2FocusedPassView = activeCommanderView === 'commander2' && (isC2PreparingFinalWindow || isC2ActiveView);
  const isC2DefaultCountdownView =
    activeCommanderView === 'commander2' && !isC2UnavailableView && !isC2FocusedPassView;
  const activePassAntennaIds = ANTENNAS
    .filter((antenna) => {
      if (antenna.color === '#6B7C8F') return false;
      const window = passScheduleByAntenna[antenna.id];
      if (!window) return false;
      return currentTimeMs >= window.startAt && currentTimeMs < window.endAt;
    })
    .map((antenna) => antenna.id);
  const c2LayoutKey =
    activeCommanderView === 'commander2'
      ? `${selectedAntenna}-${isC2PreparingView ? 'preparing' : isC2UnavailableView ? 'unavailable' : isC2ActiveView ? 'active' : 'idle'}`
      : 'commander1';
  const isCortexEngaged = isActivePass || isPreparingFinalWindow;
  const effectiveActiveCortexIds = isCortexEngaged ? activeCortexIds : [];
  const hdrUnits = Array.from({ length: 12 }, (_, idx) => ({
    id: `hdr-${idx + 1}`,
    label: `Hdr/Rtt ${idx + 1}`,
    active: isActivePass && activeHdrIds.includes(`hdr-${idx + 1}`),
  }));

  useEffect(() => {
    if (!selectedAntennaData) return;
    setActivityAntennaContext({
      antennaId: selectedAntennaData.id,
      antennaName: selectedAntennaData.name,
    });
  }, [selectedAntennaData]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTimeMs(Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setPassScheduleByAntenna((prev) => {
      let changed = false;
      const next: Record<string, PassWindow> = { ...prev };
      const minute = 60_000;

      for (const antenna of ANTENNAS) {
        if (antenna.color === '#6B7C8F') continue;
        const currentWindow = prev[antenna.id];
        if (!currentWindow) continue;

        if (currentTimeMs < currentWindow.endAt) continue;

        const gapMinutes = ROLLOVER_GAP_MINUTES_BY_ANTENNA[antenna.id] ?? 20;
        const durationMs = PASS_DURATION_MS_BY_ANTENNA[antenna.id] ?? DEFAULT_PASS_DURATION_MS;
        let nextStartAt = currentWindow.endAt + gapMinutes * minute;
        let nextEndAt = nextStartAt + durationMs;

        while (currentTimeMs >= nextEndAt) {
          nextStartAt = nextEndAt + gapMinutes * minute;
          nextEndAt = nextStartAt + durationMs;
        }

        next[antenna.id] = { startAt: nextStartAt, endAt: nextEndAt };
        changed = true;
      }

      return changed ? next : prev;
    });
  }, [currentTimeMs]);

  useEffect(() => {
    if (!hasScheduledPass) return;

    let allocatedCortex: string[] = [];
    setAssignedCortexByAntenna((prev) => {
      if (prev[selectedAntenna]) {
        allocatedCortex = prev[selectedAntenna];
        return prev;
      }

      const inUse = new Set(
        Object.entries(prev)
          .filter(([antennaId]) => antennaId !== selectedAntenna)
          .flatMap(([, cortexIds]) => cortexIds),
      );
      const available = cortexCards.map((card) => card.id).filter((id) => !inUse.has(id));
      allocatedCortex = available.slice(0, CORTEX_PER_PASS);

      return {
        ...prev,
        [selectedAntenna]: allocatedCortex,
      };
    });

    if (allocatedCortex.length > 0) {
      logActivity(
        `Allocated ${allocatedCortex
          .map((id) => `Cortex ${cortexCards.findIndex((card) => card.id === id) + 1}`)
          .join(', ')} to ${selectedAntennaData?.name ?? selectedAntenna}`,
      );
    } else {
      logActivity(`No available Cortex for ${selectedAntennaData?.name ?? selectedAntenna}`);
    }
    logActivity(`Pass queued for ${selectedAntennaData?.name ?? selectedAntenna}`);
  }, [
    activeCommanderView,
    CORTEX_PER_PASS,
    cortexCards,
    hasScheduledPass,
    selectedAntenna,
    selectedAntennaData?.name,
  ]);

  useEffect(() => {
    if (activeCommanderView === 'commander2') {
      setOpenCortexIds([]);
      return;
    }
    if (!hasScheduledPass || !isCortexEngaged) {
      setOpenCortexIds([]);
      return;
    }
    const assignedForSelected = assignedCortexByAntenna[selectedAntenna] ?? [];
    setOpenCortexIds(assignedForSelected);
  }, [activeCommanderView, assignedCortexByAntenna, hasScheduledPass, isCortexEngaged, selectedAntenna]);

  useEffect(() => {
    if (!isActivePass) return;
    if (loggedStartedPasses[selectedAntenna]) return;

    logActivity(`Pass started for ${selectedAntennaData?.name ?? selectedAntenna}`);
    setLoggedStartedPasses((prev) => ({ ...prev, [selectedAntenna]: true }));
  }, [isActivePass, loggedStartedPasses, selectedAntenna, selectedAntennaData?.name]);

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
    if (activeCommanderView !== 'commander2') return;
    setIsCortexDropdownOpen(false);
  }, [activeCommanderView, selectedAntenna]);

  return (
    <div className="min-h-screen bg-[#0f1c28] text-white">
      {/* Top Navigation */}
      <div className="bg-[#1c2f42] border-b border-[#2e4a66] px-3">
        <div className="flex items-center justify-between h-11 gap-3">
          <div className="flex items-center gap-2">
            <div
              className="text-sm font-medium whitespace-nowrap transition-colors duration-300"
              style={{ color: isActivePass ? '#3ABEFF' : isUnavailable ? '#6B7C8F' : '#B8963E' }}
            >
              Antenna {ANTENNAS.find(a => a.id === selectedAntenna)?.name}
            </div>
            <button
              onClick={() =>
                setActiveCommanderView((prev) =>
                  prev === 'commander1' ? 'commander2' : 'commander1'
                )
              }
              className="text-[9px] text-[#7f94a6] hover:text-[#3ABEFF] cursor-pointer transition-colors"
              title={
                activeCommanderView === 'commander1'
                  ? 'Switch to Commander 2'
                  : 'Switch to Commander 1'
              }
            >
              {activeCommanderView === 'commander1' ? 'c2' : 'c1'}
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <AntennaSelector
              antennas={ANTENNAS}
              selectedId={selectedAntenna}
              onSelect={setSelectedAntenna}
              activeAntennaIds={activePassAntennaIds}
            />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className={`grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)_320px] gap-4 p-4 transition-all duration-700 ${isUnavailable ? 'opacity-60 saturate-0' : ''}`}>
        {/* Left Sidebar */}
        {!isC2UnavailableView && (
        <div className="space-y-6">
          <div>
            {activeCommanderView === 'commander2' ? (
              <button
                onClick={() => setIsLeftPanelCollapsedC2((prev) => !prev)}
                className="w-full relative flex items-center justify-end text-[16px] font-medium mb-2 bg-[#213b54] rounded px-3 py-1 cursor-pointer"
              >
                <span className="absolute inset-x-0 text-center">Cortex and Hdr/Rtt</span>
                {isLeftPanelCollapsedC2 ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
              </button>
            ) : (
              <h2 className="text-[16px] font-medium mb-2 text-center bg-[#213b54] rounded px-3 py-1">
                Cortex and Hdr/Rtt
              </h2>
            )}

            {activeCommanderView === 'commander2' && isLeftPanelCollapsedC2 ? null : (
            <>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                className={`w-full flex items-center justify-between text-[13px] font-medium bg-[#1c2f42] px-2 py-1.5 rounded-md border border-[#2e4a66] ${clickFeedbackClass}`}
                onClick={() => setIsCortexDropdownOpen((prev) => !prev)}
              >
                <span>Cortex</span>
                {isCortexDropdownOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              <button
                className={`w-full flex items-center justify-between text-[13px] font-medium bg-[#1c2f42] px-2 py-1.5 rounded-md border border-[#2e4a66] ${clickFeedbackClass}`}
                onClick={() => setIsHdrDropdownOpen((prev) => !prev)}
              >
                <span>Hdr/Rtt</span>
                {isHdrDropdownOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                {isCortexDropdownOpen && (
                  <div className="bg-[#132434] border border-[#2e4a66] rounded-md p-2 space-y-1">
                    {cortexCards.map((card, idx) => {
                      const isActive = effectiveActiveCortexIds.includes(card.id);
                      return (
                        <button
                          key={card.id}
                          className={`w-full text-left text-xs text-[#d4dde6] flex items-center px-2 py-1 rounded hover:bg-[#1c2f42] ${clickFeedbackClass}`}
                          onClick={() => toggleCortexCard(card.id)}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${
                                isActive ? 'bg-[#3ABEFF]' : 'bg-[#6B7C8F]'
                              }`}
                            />
                            {`Cortex ${idx + 1}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <div>
                {isHdrDropdownOpen && (
                  <div className="bg-[#132434] border border-[#2e4a66] rounded-md p-2 space-y-1">
                    {hdrUnits.map((unit) => {
                      return (
                        <button
                          key={unit.id}
                          className={`w-full text-left text-xs text-[#d4dde6] flex items-center px-2 py-1 rounded hover:bg-[#1c2f42] ${clickFeedbackClass}`}
                          onClick={() => toggleHdrCard(unit.id)}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full bg-[#6B7C8F]"
                            />
                            {unit.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {cortexCards
                .filter((card) => openCortexIds.includes(card.id))
                .map((card) => (
                  <CortexCard
                    key={card.id}
                    data={card}
                    title={`Cortex ${cortexCards.findIndex((item) => item.id === card.id) + 1}`}
                    isActive={effectiveActiveCortexIds.includes(card.id)}
                    onRemove={() =>
                      setOpenCortexIds((prev) => prev.filter((id) => id !== card.id))
                    }
                  />
                ))}
            </div>

            <div className={`space-y-3 ${openCortexIds.length > 0 ? 'mt-6' : 'mt-0'}`}>
              {openHdrIds.map((id) => (
                <HDRCard
                  key={id}
                  title={`Hdr/Rtt ${hdrUnits.findIndex((unit) => unit.id === id) + 1}`}
                />
              ))}
            </div>
            </>
            )}
          </div>
        </div>
        )}

        {/* Center Panel */}
        <div className="space-y-3 w-full">
          <PassInfoCard
            key={`${c2LayoutKey}-passinfo`}
            isActivePass={isActivePass}
            isUnavailable={isUnavailable}
            isPendingPassStart={isPendingPassStart}
            passStartsInSeconds={Math.ceil(msUntilPassStart / 1000)}
            passStartsAtLabel={passStartsAtLabel}
            passEndsAtLabel={passEndsAtLabel}
            timeLeftLabel={timeLeftLabel}
            countdownLabel={countdownLabel}
            commanderView={activeCommanderView}
            forceExpanded={isC2PreparingView || isC2UnavailableView || isC2FocusedPassView || isC2DefaultCountdownView}
            forceCollapsed={false}
          />
          {!isC2UnavailableView && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AntennaStatusPanel
                key={`${c2LayoutKey}-antenna-status`}
                isUnavailable={isUnavailable}
                commanderView={activeCommanderView}
                forceExpanded={isC2PreparingView || isC2FocusedPassView || isC2DefaultCountdownView}
                forceCollapsed={false}
              />
              <SignalPanel
                key={`${c2LayoutKey}-signal`}
                isUnavailable={isUnavailable}
                isActivePass={isActivePass}
                commanderView={activeCommanderView}
                forceCollapsed={isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
                forceExpanded={isC2FocusedPassView}
              />
            </div>
          )}
          {!isC2UnavailableView && (
            <>
              <ControlPanel
                key={`${c2LayoutKey}-control`}
                isUnavailable={isUnavailable}
                commanderView={activeCommanderView}
                forceCollapsed={isC2FocusedPassView || isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
                forceExpanded={false}
              />
              <ActionsPanel
                key={`${c2LayoutKey}-actions`}
                isUnavailable={isUnavailable}
                commanderView={activeCommanderView}
                forceCollapsed={isC2FocusedPassView || isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
                forceExpanded={false}
              />
            </>
          )}
        </div>

        {/* Right Panel */}
        {!isC2UnavailableView && (
          <div className="space-y-4">
            <TrackingPanel
              key={`${c2LayoutKey}-tracking`}
              isActivePass={isActivePass}
              isUnavailable={isUnavailable}
              passProgress={passProgress}
              commanderView={activeCommanderView}
              forceCollapsed={isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
              forceExpanded={isC2FocusedPassView}
            />
            <ActivityLog
              key={`${c2LayoutKey}-activity`}
              selectedAntennaId={selectedAntenna}
              selectedAntennaName={selectedAntennaData?.name ?? selectedAntenna}
              commanderView={activeCommanderView}
              forceCollapsed={isC2FocusedPassView || isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
              forceExpanded={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
