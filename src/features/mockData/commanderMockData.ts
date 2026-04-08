import { Antenna, CortexData } from '../commander/types';

export const MOCK_DEFAULT_SELECTED_ANTENNA = 'maja';
export const MOCK_ACTIVE_HDR_IDS: string[] = [];

export const MOCK_ANTENNAS: Antenna[] = [
  { id: 'maja', name: 'Maja', color: '#3ABEFF', status: 'inactive' },
  { id: 'elin', name: 'Elin', color: '#B8963E', status: 'inactive' },
  { id: 'bella', name: 'Bella', color: '#B8963E', status: 'inactive' },
  { id: 'camilla', name: 'Camilla', color: '#6B7C8F', status: 'inactive' },
  { id: 'peter', name: 'Peter', color: '#3ABEFF', status: 'inactive' },
  { id: 'vilma', name: 'Vilma', color: '#B8963E', status: 'active' },
  { id: 'emma', name: 'Emma', color: '#B8963E', status: 'inactive' },
  { id: 'malin', name: 'Malin', color: '#B8963E', status: 'inactive' },
  { id: 'frida', name: 'Frida', color: '#B8963E', status: 'inactive' },
  { id: 'amanda', name: 'Amanda', color: '#3ABEFF', status: 'inactive' },
  { id: 'hanna', name: 'Hanna', color: '#6B7C8F', status: 'inactive' },
  { id: 'hugo', name: 'Hugo', color: '#6B7C8F', status: 'inactive' },
];

export const MOCK_CORTEX_CARDS: CortexData[] = [
  { id: 'cortex-1', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '20', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-2', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '40', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-3', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '48', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-4', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '50', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-5', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '22', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-6', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '11', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-7', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '18', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-8', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '35', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-9', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '44', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-10', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '29', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-11', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '15', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
  { id: 'cortex-12', name: 'CORTEX X', sifQulefx: 'SIF-QULEFX', sifQuleftx: 'SIF-QULEFTX', sifQuleftxAlt: 'INFO', sdmFa: 'SIM 1', sdmFas: 'FA', sdmFasn: 'FAS', monJ: 'MON-J', mosN: 'MOD_4', hdrJ: 'TM-B', dspO: 'DOP-0', img: '08', pll: 'PLL', sweep: 'SWEEP', rec: 'REC', carrier: 'CARRIER' },
];

export const MOCK_PASS_DURATION_MINUTES = 15;
export const MOCK_DEFAULT_PASS_DURATION_MS = MOCK_PASS_DURATION_MINUTES * 60_000;
export const MOCK_PASS_DURATION_MS_BY_ANTENNA: Record<string, number> = {};

export const MOCK_ROLLOVER_GAP_MINUTES_BY_ANTENNA: Record<string, number> = {
  maja: 0,
  elin: 22,
  bella: 26,
  camilla: 30,
  peter: 0,
  vilma: 24,
  emma: 28,
  malin: 32,
  frida: 20,
  amanda: 0,
  hanna: 34,
  hugo: 38,
};

export const MOCK_START_OFFSET_MINUTES_BY_ANTENNA: Record<string, number> = {
  maja: -2,
  elin: 22,
  bella: 26,
  camilla: 35,
  peter: -3,
  vilma: 24,
  emma: 28,
  malin: 30,
  frida: 32,
  amanda: 0,
  hanna: 40,
  hugo: 45,
};

export const MOCK_MISSION_NOTE_BY_ANTENNA: Record<string, string> = {
  maja: '2026-04-13 Prepare_pass Aurora',
  elin: '2026-04-13 Prepare_pass Borealis',
  bella: '2026-04-13 Prepare_pass Cinder',
  camilla: '2026-04-13 Prepare_pass Drift',
  peter: '2026-04-13 Prepare_pass Eclipse',
  vilma: '2026-04-13 Prepare_pass Falcon',
  emma: '2026-04-13 Prepare_pass Glacier',
  malin: '2026-04-13 Prepare_pass Horizon',
  frida: '2026-04-13 Prepare_pass Ion',
  amanda: '2026-04-13 Prepare_pass Juno',
  hanna: '2026-04-13 Prepare_pass Kestrel',
  hugo: '2026-04-13 Prepare_pass Lynx',
};

