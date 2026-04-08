import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Crosshair } from 'lucide-react';

interface AntennaStatusPanelProps {
  isUnavailable?: boolean;
  missionName?: string;
  commanderView?: 'commander1' | 'commander2';
  forceExpanded?: boolean;
  forceCollapsed?: boolean;
}

export default function AntennaStatusPanel({
  isUnavailable = false,
  missionName = 'Unknown',
  commanderView = 'commander1',
  forceExpanded = false,
  forceCollapsed = false,
}: AntennaStatusPanelProps) {
  const [elValue, setElValue] = useState(80.0);
  const [azValue, setAzValue] = useState(268.82);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const showContent = !isCollapsed;
  useEffect(() => {
    if (forceExpanded) {
      setIsCollapsed(false);
    }
  }, [forceExpanded]);
  useEffect(() => {
    if (forceCollapsed) {
      setIsCollapsed(true);
    }
  }, [forceCollapsed]);

  useEffect(() => {
    if (isUnavailable) return;

    const timer = window.setInterval(() => {
      setElValue((prev) => {
        const next = prev + (Math.random() * 8 - 4);
        return Math.max(0, Math.min(180, next));
      });

      setAzValue((prev) => {
        const next = prev + (Math.random() * 12 - 6);
        if (next < 0) return next + 360;
        if (next > 360) return next - 360;
        return next;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isUnavailable]);

  return (
    <div>
      {commanderView === 'commander2' ? (
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="w-full relative flex items-center justify-end text-[16px] font-medium mb-3 bg-[#213b54] rounded px-2 py-1 cursor-pointer"
        >
          <span className="absolute inset-x-0 flex items-center justify-center gap-1.5">
            <Crosshair size={14} />
            Antenna Status
          </span>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
      ) : (
        <h2 className="text-[16px] font-medium mb-3 text-center bg-[#213b54] rounded px-2 py-1">
          <span className="inline-flex items-center gap-1.5">
            <Crosshair size={14} />
            Antenna Status
          </span>
        </h2>
      )}

      {showContent ? (
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#173148] rounded-xl p-3 space-y-3 border border-[#2e4a66]">
          {[
            { label: 'El', value: elValue.toFixed(2) },
            { label: 'Az', value: azValue.toFixed(2) },
            { label: 'Mode', value: 'Standby' },
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-[50px_minmax(0,1fr)] gap-2 items-center">
              <span className="text-[11px] tracking-wide text-[#a9bdcc] text-center uppercase">{row.label}</span>
              <div className="min-w-0 bg-[#315b8d] text-[#f2f2f2] rounded px-2 py-1.5 text-center text-[13px] font-bold leading-none tabular-nums shadow-[0_0_0_1px_rgba(255,255,255,0.06)] truncate">
                {isUnavailable ? '' : row.value}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#173148] rounded-xl p-3 space-y-3 border border-[#2e4a66]">
          {[
            { label: 'Ded', value: 'Remote', tone: 'green' },
            { label: 'CM', value: 'Enabled', tone: 'green' },
            { label: 'Mission', value: missionName, tone: 'blue' },
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-[60px_minmax(0,1fr)] gap-2 items-center">
              <span className="text-[11px] tracking-wide text-[#a9bdcc] text-center uppercase">{row.label}</span>
              <div
                className={`min-w-0 rounded px-2 py-1.5 text-center text-[12px] font-bold leading-none shadow-[0_0_0_1px_rgba(255,255,255,0.06)] truncate ${
                  row.tone === 'green'
                    ? 'bg-[#0fbf44] text-[#f2fff5] font-semibold'
                    : 'bg-[#315b8d] text-[#f2f2f2] font-semibold'
                }`}
              >
                {isUnavailable ? '' : row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
      ) : null}
    </div>
  );
}
