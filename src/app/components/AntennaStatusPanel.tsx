import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AntennaStatusPanelProps {
  isUnavailable?: boolean;
  commanderView?: 'commander1' | 'commander2';
  forceExpanded?: boolean;
  forceCollapsed?: boolean;
}

export default function AntennaStatusPanel({
  isUnavailable = false,
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
          <span className="absolute inset-x-0 text-center">Antenna Status</span>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
      ) : (
        <h2 className="text-[16px] font-medium mb-3 text-center bg-[#213b54] rounded px-2 py-1">
          Antenna Status
        </h2>
      )}

      {showContent ? (
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#173148] rounded-xl p-3 space-y-3">
          {[
            { label: 'El', value: elValue.toFixed(2) },
            { label: 'Az', value: azValue.toFixed(2) },
            { label: 'Mode', value: 'Standby' },
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-[46px_1fr] gap-2 items-center">
              <span className="text-[11px] text-[#e7edf2] text-center">{row.label}</span>
              <div className="bg-[#3b68a8] text-[#f2f2f2] rounded px-2 py-1 text-center text-[11px] leading-none">
                {isUnavailable ? '' : row.value}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#173148] rounded-xl p-3 space-y-3">
          {[
            { label: 'Ded', value: 'Remote', tone: 'green' },
            { label: 'CM', value: 'Enabled', tone: 'green' },
            { label: 'Mission', value: 'Hejhopp', tone: 'blue' },
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-[58px_1fr] gap-2 items-center">
              <span className="text-[11px] text-[#e7edf2] text-center">{row.label}</span>
              <div
                className={`rounded px-2 py-1 text-center text-[11px] leading-none ${
                  row.tone === 'green'
                    ? 'bg-[#0fd041] text-[#e7f7ea]'
                    : 'bg-[#3b68a8] text-[#f2f2f2]'
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
