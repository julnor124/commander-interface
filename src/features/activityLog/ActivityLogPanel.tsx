import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { ACTIVITY_LOG_EVENT, ActivityEntry } from './activityLogBus';
import ConfirmDialog from '../../app/components/ConfirmDialog';
import { usePanelCollapse } from '../ui/usePanelCollapse';

interface ActivityLogPanelProps {
  selectedAntennaId: string;
  selectedAntennaName: string;
  commanderView?: 'commander1' | 'commander2';
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

const ACTIVITY_LOG_HEIGHT_CLASS = 'h-[264px]';

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
  const { isCollapsed, setIsCollapsed } = usePanelCollapse({
    commanderView,
    forceCollapsed,
    forceExpanded,
  });
  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const pressFeedbackClass =
    'press-feedback cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';

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
    return 'text-[#aab8c6]';
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-4">
        {commanderView === 'commander2' ? (
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="relative flex items-center justify-end w-full text-[18px] font-medium bg-[#213b54] rounded px-3 py-1.5 cursor-pointer"
          >
            <span className="absolute inset-x-0 flex items-center justify-center gap-1.5">
              <List size={16} />
              Activity log
            </span>
            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
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
              className={`px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${pressFeedbackClass}`}
            >
              {viewMode === 'antenna' ? 'Show all antennas' : 'Show this antenna'}
            </button>
            <button
              onClick={() => setIsResetDialogOpen(true)}
              className={`px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${pressFeedbackClass}`}
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
                className={`px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${pressFeedbackClass}`}
              >
                {viewMode === 'antenna' ? 'Show all antennas' : 'Show this antenna'}
              </button>
              <button
                onClick={() => setIsResetDialogOpen(true)}
                className={`px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${pressFeedbackClass}`}
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
            className={`bg-[#162535] border rounded-lg ${ACTIVITY_LOG_HEIGHT_CLASS} overflow-y-auto transition-all duration-300 ${
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

      <ConfirmDialog
        isOpen={isResetDialogOpen}
        title="Reset activity log?"
        description={`This will clear ${resetTargetLabel}. This action cannot be undone.`}
        confirmLabel="Confirm reset"
        onCancel={() => setIsResetDialogOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}

