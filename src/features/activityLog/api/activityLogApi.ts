// activityLogApi API layer.
import {
  ACTIVITY_LOG_EVENT,
  logActivity,
  logAlarm,
  setActivityAntennaContext,
} from "../activityLogBus";
import { ActivityEntry } from "../types";
import { MOCK_ACTIVITY_LOG_FEED } from "./mock/activityLogMockFeed";
import {
  mapActivityEntriesFromDto,
  mapActivityEntryFromDto,
  mapPublishLogEntryRequest,
} from "./mappers";

export function getActivityLogSeed(): ActivityEntry[] {
  return mapActivityEntriesFromDto(MOCK_ACTIVITY_LOG_FEED);
}

export function subscribeToActivityLog(handler: (entry: ActivityEntry) => void): () => void {
  const listener = (event: Event) => {
    const custom = event as CustomEvent<ActivityEntry>;
    if (custom.detail) handler(mapActivityEntryFromDto(custom.detail));
  };

  window.addEventListener(ACTIVITY_LOG_EVENT, listener);
  return () => window.removeEventListener(ACTIVITY_LOG_EVENT, listener);
}

export function publishActivity(message: string, options?: { antennaId?: string; antennaName?: string }) {
  const request = mapPublishLogEntryRequest(message, "activity", options);
  logActivity(request.message, {
    antennaId: request.antennaId,
    antennaName: request.antennaName,
  });
}

export function publishAlarm(message: string, options?: { antennaId?: string; antennaName?: string }) {
  const request = mapPublishLogEntryRequest(message, "alarm", options);
  logAlarm(request.message, {
    antennaId: request.antennaId,
    antennaName: request.antennaName,
  });
}

export function setActivityContext(context: { antennaId: string; antennaName: string }) {
  setActivityAntennaContext(context);
}
