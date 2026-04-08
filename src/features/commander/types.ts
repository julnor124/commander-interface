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

