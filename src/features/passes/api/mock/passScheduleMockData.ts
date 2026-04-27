// passScheduleMockData API layer.
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
