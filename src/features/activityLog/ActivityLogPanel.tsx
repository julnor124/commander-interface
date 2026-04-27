// ActivityLogPanel module.
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import { usePanelCollapse } from '../ui/hooks/usePanelCollapse';
import { useActivityLogEntries } from './hooks/useActivityLogEntries';
import { useActivityLogFilters } from './hooks/useActivityLogFilters';

interface ActivityLogPanelProps {
  selectedAntennaId: string;
  selectedAntennaName: string;
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

const ACTIVITY_LOG_HEIGHT_CLASS = 'h-[264px]';

export default function ActivityLogPanel({
  selectedAntennaId,
  selectedAntennaName,
  forceCollapsed = false,
  forceExpanded = false,
}: ActivityLogPanelProps) {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const { entries, isLogUpdated, resetEntries } = useActivityLogEntries(selectedAntennaId);
  const {
    viewMode,
    setViewMode,
    logTab,
    setLogTab,
    filteredEntries,
    resetTargetLabel,
    emptyStateLabel,
    scopeBadgeLabel,
    scopeHelperLabel,
  } = useActivityLogFilters({
    entries,
    selectedAntennaId,
    selectedAntennaName,
  });
  const { isCollapsed, setIsCollapsed } = usePanelCollapse({
    forceCollapsed,
    forceExpanded,
  });
  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const pressFeedbackClass =
    'press-feedback cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';

  useEffect(() => {
    if (!logContainerRef.current) return;
    logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [entries, viewMode, selectedAntennaId]);

  const handleConfirmReset = () => {
    resetEntries(viewMode);
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
      </div>
      {isCollapsed ? null : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex items-center p-0.5 rounded bg-[#1a2c3c] border border-[#2e4a66]">
              <button
                onClick={() => setLogTab('activity')}
                className={`px-2 py-0.5 rounded text-[10px] ${
                  logTab === 'activity' ? 'bg-[#3a5268] text-[#e7edf2]' : 'text-[#9fb0bf]'
                } ${pressFeedbackClass}`}
              >
                Activity
              </button>
              <button
                onClick={() => setLogTab('alarms')}
                className={`px-2 py-0.5 rounded text-[10px] ${
                  logTab === 'alarms' ? 'bg-[#3a5268] text-[#e7edf2]' : 'text-[#9fb0bf]'
                } ${pressFeedbackClass}`}
              >
                ALARMS
              </button>
            </div>
            <button
              onClick={() => setViewMode((prev) => (prev === 'antenna' ? 'all' : 'antenna'))}
              className={`px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${pressFeedbackClass}`}
            >
              {viewMode === 'antenna' ? 'Switch to ALL antennas' : 'Switch to THIS antenna'}
            </button>
            <button
              onClick={() => setIsResetDialogOpen(true)}
              className={`px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${pressFeedbackClass}`}
            >
              Reset
            </button>
          </div>
          <div className="mb-2 -mt-1 flex items-center justify-between gap-2">
            <div
              className={`inline-flex items-center rounded px-2 py-1 text-[10px] font-semibold tracking-wide border ${
                viewMode === 'antenna'
                  ? 'bg-[#1c3850] text-[#c1e9ff] border-[#3ABEFF]'
                  : 'bg-[#2a3340] text-[#dce4ed] border-[#667789]'
              }`}
            >
              {scopeBadgeLabel}
            </div>
            <p className="text-[10px] text-[#8da0b2]">{scopeHelperLabel}</p>
          </div>
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
                  {emptyStateLabel}
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

