import {
  ACTIVITY_LOG_EVENT,
  ActivityEntry,
  logActivity,
  logAlarm,
} from "../activityLogBus";
import { MOCK_ACTIVITY_LOG_FEED } from "./mock/activityLogMockFeed";

export function getActivityLogSeed(): ActivityEntry[] {
  return MOCK_ACTIVITY_LOG_FEED;
}

export function subscribeToActivityLog(handler: (entry: ActivityEntry) => void): () => void {
  const listener = (event: Event) => {
    const custom = event as CustomEvent<ActivityEntry>;
    if (custom.detail) handler(custom.detail);
  };

  window.addEventListener(ACTIVITY_LOG_EVENT, listener);
  return () => window.removeEventListener(ACTIVITY_LOG_EVENT, listener);
}

export function publishActivity(message: string, options?: { antennaId?: string; antennaName?: string }) {
  logActivity(message, options);
}

export function publishAlarm(message: string, options?: { antennaId?: string; antennaName?: string }) {
  logAlarm(message, options);
}
