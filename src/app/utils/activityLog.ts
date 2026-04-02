export const ACTIVITY_LOG_EVENT = 'activity-log-entry';

interface ActivityContext {
  antennaId: string;
  antennaName: string;
}

let currentActivityContext: ActivityContext | null = null;

export interface ActivityEntry {
  timestamp: string;
  message: string;
  antennaId?: string;
  antennaName?: string;
}

export function setActivityAntennaContext(context: ActivityContext) {
  currentActivityContext = context;
}

export function logActivity(message: string) {
  const payload: ActivityEntry = {
    message,
    timestamp: new Date().toLocaleTimeString(),
    antennaId: currentActivityContext?.antennaId,
    antennaName: currentActivityContext?.antennaName,
  };

  window.dispatchEvent(
    new CustomEvent(ACTIVITY_LOG_EVENT, {
      detail: payload,
    }),
  );
}
