export const ACTIVITY_LOG_EVENT = 'activity-log-entry';

export interface ActivityEntry {
  timestamp: string;
  message: string;
  type?: 'activity' | 'alarm';
  antennaId?: string;
  antennaName?: string;
}

interface ActivityContext {
  antennaId: string;
  antennaName: string;
}

let currentActivityContext: ActivityContext | null = null;

export function setActivityAntennaContext(context: ActivityContext) {
  currentActivityContext = context;
}

interface LogOptions {
  antennaId?: string;
  antennaName?: string;
}

function dispatchLogEntry(message: string, type: 'activity' | 'alarm', options?: LogOptions) {
  const payload: ActivityEntry = {
    message,
    timestamp: new Date().toLocaleTimeString(),
    type,
    antennaId: options?.antennaId ?? currentActivityContext?.antennaId,
    antennaName: options?.antennaName ?? currentActivityContext?.antennaName,
  };

  window.dispatchEvent(
    new CustomEvent(ACTIVITY_LOG_EVENT, {
      detail: payload,
    }),
  );
}

export function logActivity(message: string, options?: LogOptions) {
  dispatchLogEntry(message, 'activity', options);
}

export function logAlarm(message: string, options?: LogOptions) {
  dispatchLogEntry(message, 'alarm', options);
}

