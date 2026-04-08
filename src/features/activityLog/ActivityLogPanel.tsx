import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, List } from 'lucide-react';
import { ACTIVITY_LOG_EVENT, ActivityEntry } from './activityLogBus';

interface ActivityLogPanelProps {
  selectedAntennaId: string;
  selectedAntennaName: string;
  commanderView?: 'commander1' | 'commander2';
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

export default function ActivityLogPanel({
  selectedAntennaId,
  selectedAntennaName,
  commanderView = 'commander1',
  forceCollapsed = false,
  forceExpanded = false,
}: ActivityLogPanelProps) {
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [isLogUpdated, setIsLogUpdated] = useState(false);
  const [viewMode, setViewMode] = useState<'antenna' | 'all'>('antenna');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const pressFeedbackClass =
    'press-feedback cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';

  useEffect(() => {
    if (commanderView === 'commander2') {
      setIsCollapsed(true);
    }
  }, [commanderView]);

  useEffect(() => {
    if (forceCollapsed) {
      setIsCollapsed(true);
    }
  }, [forceCollapsed]);
  useEffect(() => {
    if (forceExpanded) {
      setIsCollapsed(false);
    }
  }, [forceExpanded]);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<ActivityEntry>;
      const payload = custom.detail;
      if (!payload?.message) return;
      setEntries((prev) => [...prev, payload].slice(-50));
      setIsLogUpdated(true);
    };

    window.addEventListener(ACTIVITY_LOG_EVENT, handler);
    return () => window.removeEventListener(ACTIVITY_LOG_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!isLogUpdated) return;
    const timer = window.setTimeout(() => setIsLogUpdated(false), 550);
    return () => window.clearTimeout(timer);
  }, [isLogUpdated]);

  useEffect(() => {
    if (!logContainerRef.current) return;
    logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [entries, viewMode, selectedAntennaId]);

  const filteredEntries =
    viewMode === 'antenna'
      ? entries.filter((entry) => entry.antennaId === selectedAntennaId)
      : entries;

  const resetTargetLabel =
    viewMode === 'antenna'
      ? `activity for antenna ${selectedAntennaName}`
      : 'activity for all antennas';

  const handleConfirmReset = () => {
    if (viewMode === 'antenna') {
      setEntries((prev) => prev.filter((entry) => entry.antennaId !== selectedAntennaId));
    } else {
      setEntries([]);
    }
    setIsResetDialogOpen(false);
  };

  const getEntryToneClass = (message: string) => {
    const normalized = message.toLowerCase();
    if (normalized.includes('pass started') || normalized.includes('started pass')) {
      return 'text-[#74cfff]';
    }
    if (normalized.includes('unavailable') || normalized.includes('no available')) {
      return 'text-[#f4c65d]';
    }
    if (normalized.includes('pass ended') || normalized.includes('ended')) {
      return 'text-[#aab8c6]';
    }
    return 'text-[#aab8c6]';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {commanderView === 'commander2' ? (
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="relative flex items-center justify-end w-full text-lg font-medium bg-[#213b54] rounded px-3 py-1 cursor-pointer"
          >
            <span className="absolute inset-x-0 flex items-center justify-center gap-1.5">
              <List size={14} />
              Activity log
            </span>
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          </button>
        ) : (
          <h2
            className={`text-base font-medium transition-colors duration-300 ${
              isLogUpdated ? 'text-[#7cd7ff]' : 'text-[#9fb0bf]'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <List size={14} />
              Activity log
            </span>
          </h2>
        )}
        {commanderView === 'commander1' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode((prev) => (prev === 'antenna' ? 'all' : 'antenna'))}
              className={`px-2 py-0.5 bg-[#d0d0d0] text-[#223446] rounded text-[10px] ${pressFeedbackClass}`}
            >
              {viewMode === 'antenna' ? 'Show all antennas' : 'Show this antenna'}
            </button>
            <button
              onClick={() => setIsResetDialogOpen(true)}
              className={`px-2 py-0.5 bg-[#d0d0d0] text-[#223446] rounded text-[10px] ${pressFeedbackClass}`}
            >
              Reset
            </button>
          </div>
        )}
      </div>
      {commanderView === 'commander2' && isCollapsed ? null : (
        <>
          {commanderView === 'commander2' && (
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setViewMode((prev) => (prev === 'antenna' ? 'all' : 'antenna'))}
                className={`px-2 py-0.5 bg-[#d0d0d0] text-[#223446] rounded text-[10px] ${pressFeedbackClass}`}
              >
                {viewMode === 'antenna' ? 'Show all antennas' : 'Show this antenna'}
              </button>
              <button
                onClick={() => setIsResetDialogOpen(true)}
                className={`px-2 py-0.5 bg-[#d0d0d0] text-[#223446] rounded text-[10px] ${pressFeedbackClass}`}
              >
                Reset
              </button>
            </div>
          )}
          <p className="text-[10px] text-[#7f92a3] -mt-2 mb-2">
            Showing: {viewMode === 'antenna' ? `Antenna ${selectedAntennaName}` : 'All antennas'}
          </p>
          <div
            ref={logContainerRef}
            className={`bg-[#162535] border rounded-lg h-[300px] overflow-y-auto transition-all duration-300 ${
              isLogUpdated
                ? 'border-[#3ABEFF] shadow-[0_0_0_1px_rgba(58,190,255,0.35),0_0_14px_rgba(58,190,255,0.25)]'
                : 'border-[#243b52]'
            }`}
          >
            <div className="p-4 space-y-2">
              {filteredEntries.length === 0 && (
                <p className="text-xs text-[#9aabbb] leading-relaxed">
                  No activity yet in this view.
                </p>
              )}
              {filteredEntries.map((entry, index) => (
                <div
                  key={`${entry.timestamp}-${index}`}
                  className={`text-[11px] text-[#aab8c6] transition-colors duration-300 ${
                    isLogUpdated && index === filteredEntries.length - 1 ? 'text-[#d8ecf9]' : ''
                  }`}
                >
                  <span className="text-[#74889b] mr-2">[{entry.timestamp}]</span>
                  {viewMode === 'all' && (
                    <span className="text-[#87a8bf] mr-2">{entry.antennaName ?? 'Unknown'}:</span>
                  )}
                  <span className={getEntryToneClass(entry.message)}>{entry.message}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {isResetDialogOpen && (
        <div className="fixed inset-0 z-50 bg-[#06111b]/70 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1c2f42] border border-[#2e4a66] rounded-lg p-4">
            <h3 className="text-[15px] text-[#f2f2f2] mb-2">Reset activity log?</h3>
            <p className="text-[12px] text-[#c6d2de] mb-4">
              This will clear {resetTargetLabel}. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsResetDialogOpen(false)}
                className="px-3 py-1 rounded bg-[#2a4258] text-[#f2f2f2] text-[11px] cursor-pointer transition-all duration-150 hover:brightness-110"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-3 py-1 rounded bg-[#3ABEFF] text-[#0f1c28] text-[11px] font-medium cursor-pointer transition-all duration-150 hover:brightness-110"
              >
                Confirm reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

