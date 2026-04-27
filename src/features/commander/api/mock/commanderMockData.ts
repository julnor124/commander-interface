import { Antenna } from "../../types";

export const MOCK_DEFAULT_SELECTED_ANTENNA = "maja";
export const MOCK_ACTIVE_HDR_IDS: string[] = [];

export const MOCK_HDR_UNITS_BASE = Array.from({ length: 12 }, (_, idx) => ({
  id: `hdr-rtt-${idx + 1}`,
  label: `Hdr/Rtt ${idx + 1}`,
}));

export const MOCK_ANTENNAS: Antenna[] = [
  { id: "maja", name: "Maja", color: "#3ABEFF", status: "inactive" },
  { id: "elin", name: "Elin", color: "#B8963E", status: "inactive" },
  { id: "bella", name: "Bella", color: "#B8963E", status: "inactive" },
  { id: "camilla", name: "Camilla", color: "#6B7C8F", status: "inactive" },
  { id: "peter", name: "Peter", color: "#3ABEFF", status: "inactive" },
  { id: "vilma", name: "Vilma", color: "#B8963E", status: "active" },
  { id: "emma", name: "Emma", color: "#B8963E", status: "inactive" },
  { id: "malin", name: "Malin", color: "#B8963E", status: "inactive" },
  { id: "frida", name: "Frida", color: "#B8963E", status: "inactive" },
  { id: "amanda", name: "Amanda", color: "#3ABEFF", status: "inactive" },
  { id: "hanna", name: "Hanna", color: "#6B7C8F", status: "inactive" },
  { id: "hugo", name: "Hugo", color: "#6B7C8F", status: "inactive" },
];

export const MOCK_MISSION_NOTE_BY_ANTENNA: Record<string, string> = {
  maja: "2026-04-13 Prepare_pass Aurora",
  elin: "2026-04-13 Prepare_pass Borealis",
  bella: "2026-04-13 Prepare_pass Cinder",
  camilla: "2026-04-13 Prepare_pass Drift",
  peter: "2026-04-13 Prepare_pass Eclipse",
  vilma: "2026-04-13 Prepare_pass Falcon",
  emma: "2026-04-13 Prepare_pass Glacier",
  malin: "2026-04-13 Prepare_pass Horizon",
  frida: "2026-04-13 Prepare_pass Ion",
  amanda: "2026-04-13 Prepare_pass Juno",
  hanna: "2026-04-13 Prepare_pass Kestrel",
  hugo: "2026-04-13 Prepare_pass Lynx",
};
