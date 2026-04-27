// commanderMockData API layer.
import {
  AntennaDto,
  HdrUnitBaseDto,
  MissionNoteByAntennaIdDto,
} from "../contracts";

const todayIsoDate = new Date().toISOString().slice(0, 10);
const missionNote = (missionName: string) => `${todayIsoDate} Prepare_pass ${missionName}`;

export const MOCK_DEFAULT_SELECTED_ANTENNA = "maja";
export const MOCK_ACTIVE_HDR_IDS: string[] = [];

export const MOCK_HDR_UNITS_BASE_DTO: HdrUnitBaseDto[] = Array.from({ length: 12 }, (_, idx) => ({
  id: `hdr-rtt-${idx + 1}`,
  label: `Hdr/Rtt ${idx + 1}`,
}));

export const MOCK_ANTENNAS_DTO: AntennaDto[] = [
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

export const MOCK_MISSION_NOTE_BY_ANTENNA_DTO: MissionNoteByAntennaIdDto = {
  maja: missionNote("Aurora"),
  elin: missionNote("Borealis"),
  bella: missionNote("Cinder"),
  camilla: missionNote("Drift"),
  peter: missionNote("Eclipse"),
  vilma: missionNote("Falcon"),
  emma: missionNote("Glacier"),
  malin: missionNote("Horizon"),
  frida: missionNote("Ion"),
  amanda: missionNote("Juno"),
  hanna: missionNote("Kestrel"),
  hugo: missionNote("Lynx"),
};
