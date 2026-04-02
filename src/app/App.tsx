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

const ANTENNAS: Antenna[] = [
  { id: 'maja', name: 'Maja', color: '#3ABEFF', status: 'inactive' },
  { id: 'ella', name: 'Elin', color: '#B8963E', status: 'inactive' },
  { id: 'sina', name: 'Sina', color: '#B8963E', status: 'inactive' },
  { id: 'olivia', name: 'Olivia', color: '#6B7C8F', status: 'inactive' },
  { id: 'vickan', name: 'Vickan', color: '#3ABEFF', status: 'inactive' },
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
  const PASS_START_DELAY_MS = 8000;
  const PASS_DURATION_MS = 120000;
  const [selectedAntenna, setSelectedAntenna] = useState<string>('vilma');
  const [isCortexDropdownOpen, setIsCortexDropdownOpen] = useState(false);
  const [isHdrDropdownOpen, setIsHdrDropdownOpen] = useState(false);

  const [cortexCards] = useState<CortexData[]>([
    {
      id: 'cortex-1',
      name: 'CORTEX X',
      sifQulefx: 'SIF-QULEFX',
      sifQuleftx: 'SIF-QULEFTX',
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
      sifQuleftxAlt: 'ADRAA-J',
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
  const [passStartAtByAntenna, setPassStartAtByAntenna] = useState<Record<string, number>>({});
  const [currentTimeMs, setCurrentTimeMs] = useState(Date.now());
  const [loggedStartedPasses, setLoggedStartedPasses] = useState<Record<string, boolean>>({});
  const clickFeedbackClass =
    'cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';

  const hdrUnits = Array.from({ length: 12 }, (_, idx) => ({
    id: `hdr-${idx + 1}`,
    label: `Hdr/Rtt ${idx + 1}`,
    active: activeHdrIds.includes(`hdr-${idx + 1}`),
  }));

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
  const isBlueAntenna = selectedAntennaData?.color === '#3ABEFF';
  const passStartAt = passStartAtByAntenna[selectedAntenna];
  const msUntilPassStart = isBlueAntenna && passStartAt ? Math.max(0, passStartAt - currentTimeMs) : 0;
  const isActivePass = Boolean(isBlueAntenna && passStartAt && msUntilPassStart === 0);
  const isPendingPassStart = Boolean(isBlueAntenna && passStartAt && msUntilPassStart > 0);
  const passProgress =
    isBlueAntenna && passStartAt
      ? Math.min(1, Math.max(0, (currentTimeMs - passStartAt) / PASS_DURATION_MS))
      : 0;
  const isUnavailable = selectedAntennaData?.color === '#6B7C8F';

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
    if (!isBlueAntenna) return;
    if (passStartAtByAntenna[selectedAntenna]) return;

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

    setPassStartAtByAntenna((prev) => ({
      ...prev,
      [selectedAntenna]: Date.now() + PASS_START_DELAY_MS,
    }));

    if (allocatedCortex.length > 0) {
      setOpenCortexIds(allocatedCortex);
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
    CORTEX_PER_PASS,
    cortexCards,
    isBlueAntenna,
    passStartAtByAntenna,
    selectedAntenna,
    selectedAntennaData?.name,
  ]);

  useEffect(() => {
    if (!isBlueAntenna) return;
    const assignedForSelected = assignedCortexByAntenna[selectedAntenna] ?? [];
    setOpenCortexIds(assignedForSelected);
  }, [assignedCortexByAntenna, isBlueAntenna, selectedAntenna]);

  useEffect(() => {
    if (!isActivePass) return;
    if (loggedStartedPasses[selectedAntenna]) return;

    logActivity(`Pass started for ${selectedAntennaData?.name ?? selectedAntenna}`);
    setLoggedStartedPasses((prev) => ({ ...prev, [selectedAntenna]: true }));
  }, [isActivePass, loggedStartedPasses, selectedAntenna, selectedAntennaData?.name]);

  return (
    <div className="min-h-screen bg-[#0f1c28] text-white">
      {/* Top Navigation */}
      <div className="bg-[#1c2f42] border-b border-[#2e4a66] px-3">
        <div className="flex items-center justify-between h-11 gap-3">
          <div
            className="text-sm font-medium whitespace-nowrap transition-colors duration-300"
            style={{ color: isActivePass ? '#3ABEFF' : selectedAntennaData?.color ?? '#B8963E' }}
          >
            Antenna {ANTENNAS.find(a => a.id === selectedAntenna)?.name}
          </div>
          <div className="flex-1 min-w-0">
            <AntennaSelector
              antennas={ANTENNAS}
              selectedId={selectedAntenna}
              onSelect={setSelectedAntenna}
            />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className={`grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)_320px] gap-4 p-4 transition-all duration-700 ${isUnavailable ? 'opacity-60 saturate-0' : ''} ${isActivePass ? 'shadow-[inset_0_0_0_1px_rgba(58,190,255,0.4)]' : ''}`}>
        {/* Left Sidebar */}
        <div className="space-y-6">
          <div>
            <h2 className="text-[16px] font-medium mb-2 text-center bg-[#213b54] rounded px-3 py-1">
              Cortex and Hdr/Rtt
            </h2>

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
                      const isActive = activeCortexIds.includes(card.id);
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
                              className={`w-2.5 h-2.5 rounded-full ${
                                unit.active ? 'bg-[#3ABEFF]' : 'bg-[#6B7C8F]'
                              }`}
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
                    isActive={activeCortexIds.includes(card.id)}
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
          </div>
        </div>

        {/* Center Panel */}
        <div className="space-y-3 w-full">
          <PassInfoCard
            isActivePass={isActivePass}
            isUnavailable={isUnavailable}
            isPendingPassStart={isPendingPassStart}
            passStartsInSeconds={Math.ceil(msUntilPassStart / 1000)}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AntennaStatusPanel isUnavailable={isUnavailable} />
            <SignalPanel isUnavailable={isUnavailable} isActivePass={isActivePass} />
          </div>
          <ControlPanel isUnavailable={isUnavailable} />
          <ActionsPanel isUnavailable={isUnavailable} />
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          <TrackingPanel isActivePass={isActivePass} isUnavailable={isUnavailable} passProgress={passProgress} />
          <ActivityLog
            selectedAntennaId={selectedAntenna}
            selectedAntennaName={selectedAntennaData?.name ?? selectedAntenna}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
