// usePassSchedule hook logic.
import { useEffect, useMemo, useState } from 'react';
import { PassWindow } from '../types';
import {
  getInitialPassSchedule,
  getPassDurationMs,
  getRolloverGapMinutes,
} from '../api/passScheduleMockApi';

interface AntennaLike {
  id: string;
  color: string;
}

const formatClockTime = (timestampMs: number) =>
  new Date(timestampMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

const formatDuration = (durationMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}min ${seconds.toString().padStart(2, '0')}s`;
};

function createInitialSchedule(antennas: AntennaLike[]): Record<string, PassWindow> {
  return getInitialPassSchedule(antennas);
}

export function usePassSchedule(params: {
  antennas: AntennaLike[];
  selectedAntennaId: string;
}) {
  const { antennas, selectedAntennaId } = params;
  const [passWindowsByAntennaId, setPassWindowsByAntennaId] = useState<Record<string, PassWindow>>(() =>
    createInitialSchedule(antennas),
  );
  const [currentTimeMs, setCurrentTimeMs] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTimeMs(Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setPassWindowsByAntennaId((prev) => {
      let changed = false;
      const next: Record<string, PassWindow> = { ...prev };
      const minute = 60_000;

      for (const antenna of antennas) {
        const currentWindow = prev[antenna.id];
        if (!currentWindow) continue;
        if (currentTimeMs < currentWindow.endAt) continue;

        const gapMinutes = getRolloverGapMinutes(antenna.id);
        const durationMs = getPassDurationMs(antenna.id);
        let nextStartAt = currentWindow.endAt + gapMinutes * minute;
        let nextEndAt = nextStartAt + durationMs;

        while (currentTimeMs >= nextEndAt) {
          nextStartAt = nextEndAt + gapMinutes * minute;
          nextEndAt = nextStartAt + durationMs;
        }

        next[antenna.id] = { startAt: nextStartAt, endAt: nextEndAt };
        changed = true;
      }

      return changed ? next : prev;
    });
  }, [antennas, currentTimeMs]);

  const selectedPassWindow = passWindowsByAntennaId[selectedAntennaId];
  const hasScheduledPass = Boolean(selectedPassWindow);

  const msUntilPassStart =
    hasScheduledPass && selectedPassWindow.startAt > currentTimeMs ? selectedPassWindow.startAt - currentTimeMs : 0;
  const msUntilPassEnd =
    hasScheduledPass && selectedPassWindow.endAt > currentTimeMs ? selectedPassWindow.endAt - currentTimeMs : 0;

  const isPendingPassStart = hasScheduledPass && currentTimeMs < selectedPassWindow.startAt;
  const isPreparingFinalWindow = isPendingPassStart && msUntilPassStart <= 5 * 60 * 1000;
  const isActivePass =
    hasScheduledPass && currentTimeMs >= selectedPassWindow.startAt && currentTimeMs < selectedPassWindow.endAt;

  const passDurationMs = hasScheduledPass ? Math.max(1, selectedPassWindow.endAt - selectedPassWindow.startAt) : 1;
  const passProgress = isActivePass
    ? Math.min(1, Math.max(0, (currentTimeMs - selectedPassWindow.startAt) / passDurationMs))
    : 0;

  const passStartsAtLabel = selectedPassWindow ? formatClockTime(selectedPassWindow.startAt) : '--:--';
  const passEndsAtLabel = selectedPassWindow ? formatClockTime(selectedPassWindow.endAt) : '--:--';
  const timeLeftLabel = formatDuration(msUntilPassEnd);
  const countdownLabel = formatDuration(msUntilPassStart);

  const activePassAntennaIds = useMemo(
    () =>
      antennas
        .filter((antenna) => {
          const window = passWindowsByAntennaId[antenna.id];
          if (!window) return false;
          return currentTimeMs >= window.startAt && currentTimeMs < window.endAt;
        })
        .map((antenna) => antenna.id),
    [antennas, currentTimeMs, passWindowsByAntennaId],
  );

  return {
    passWindowsByAntennaId,
    selectedPassWindow,
    hasScheduledPass,
    msUntilPassStart,
    msUntilPassEnd,
    isPendingPassStart,
    isPreparingFinalWindow,
    isActivePass,
    passProgress,
    passStartsAtLabel,
    passEndsAtLabel,
    timeLeftLabel,
    countdownLabel,
    activePassAntennaIds,
  };
}
