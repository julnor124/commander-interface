// Feature type definitions.
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

export interface HdrUnit {
  id: string;
  label: string;
  active: boolean;
}

export interface CommanderPageModel {
  antennas: Antenna[];
  selectedAntenna: string;
  selectedAntennaName: string;
  setSelectedAntenna: (id: string) => void;

  isActivePass: boolean;
  isUnavailable: boolean;
  activePassAntennaIds: string[];

  clickFeedbackClass: string;

  isCortexDropdownOpen: boolean;
  setIsCortexDropdownOpen: (updater: (prev: boolean) => boolean) => void;
  isHdrDropdownOpen: boolean;
  setIsHdrDropdownOpen: (updater: (prev: boolean) => boolean) => void;
  isLeftPanelCollapsed: boolean;
  setIsLeftPanelCollapsed: (updater: (prev: boolean) => boolean) => void;

  cortexCards: CortexData[];
  hdrUnits: HdrUnit[];
  openCortexIds: string[];
  openHdrIds: string[];
  dismissedCortexIds: string[];
  effectiveActiveCortexIds: string[];

  toggleCortexCard: (id: string) => void;
  toggleHdrCard: (id: string) => void;
  dismissCortexCard: (id: string) => void;

  isPendingPassStart: boolean;
  msUntilPassStart: number;
  passStartsAtLabel: string;
  passEndsAtLabel: string;
  timeLeftLabel: string;
  countdownLabel: string;
  missionNote: string;
  missionName: string;
  passProgress: number;

  isPreparingView: boolean;
  isUnavailableView: boolean;
  isFocusedPassView: boolean;
  isDefaultCountdownView: boolean;
  isPreparingFinalWindowView: boolean;
}

