import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Signal as SignalIcon } from 'lucide-react';

interface SignalPanelProps {
  isUnavailable?: boolean;
  isActivePass?: boolean;
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

export default function SignalPanel({
  isUnavailable = false,
  isActivePass = false,
  forceCollapsed = false,
  forceExpanded = false,
}: SignalPanelProps) {
  const [sBandLevel, setSBandLevel] = useState(22);
  const [xBandLevel, setXBandLevel] = useState(36);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isActivePass || isUnavailable) {
      setSBandLevel(0);
      setXBandLevel(0);
      return;
    }

    const timer = window.setInterval(() => {
      setSBandLevel(Math.floor(20 + Math.random() * 55));
      setXBandLevel(Math.floor(30 + Math.random() * 55));
    }, 800);

    return () => window.clearInterval(timer);
  }, [isActivePass, isUnavailable]);

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

  const barFillClass = isActivePass && !isUnavailable ? 'bg-[#4dc5ff]' : 'bg-[#c8d2db]';

  return (
    <div>
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="w-full relative flex items-center justify-end text-[18px] font-medium mb-3 bg-[#213b54] rounded px-3 py-1.5 cursor-pointer"
      >
        <span className="absolute inset-x-0 flex items-center justify-center gap-1.5">
          <SignalIcon size={16} />
          Signal
        </span>
        {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      {isCollapsed ? null : (
      <div className="grid grid-cols-2 gap-4">
        {/* S-band */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-[#9db0be] mb-2">S-band</span>
          <div className="relative w-8 h-28 bg-[#162a3d] border border-[#6f8799] rounded-sm overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-x-[6px] top-[8px] bottom-[8px] border border-[#a4b7c6] overflow-hidden">
              <div
                className={`absolute inset-x-0 bottom-0 transition-all duration-700 ${barFillClass} ${isActivePass && !isUnavailable ? 'shadow-[0_0_12px_rgba(77,197,255,0.55)]' : ''}`}
                style={{ height: `${sBandLevel}%` }}
              />
            </div>
          </div>
          <span className="text-[13px] font-semibold text-[#d6e8f3] mt-1 tabular-nums">
            {isUnavailable ? '' : isActivePass ? Math.round(sBandLevel / 10).toString() : '0'}
          </span>
        </div>

        {/* X-band */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-[#9db0be] mb-2">X-band</span>
          <div className="relative w-8 h-28 bg-[#162a3d] border border-[#6f8799] rounded-sm overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-x-[6px] top-[8px] bottom-[8px] border border-[#a4b7c6] overflow-hidden">
              <div
                className={`absolute inset-x-0 bottom-0 transition-all duration-700 ${barFillClass} ${isActivePass && !isUnavailable ? 'shadow-[0_0_12px_rgba(77,197,255,0.55)]' : ''}`}
                style={{ height: `${xBandLevel}%` }}
              />
            </div>
          </div>
          <span className="text-[13px] font-semibold text-[#d6e8f3] mt-1 tabular-nums">
            {isUnavailable ? '' : isActivePass ? Math.round(xBandLevel / 10).toString() : '1'}
          </span>
        </div>
      </div>
      )}
    </div>
  );
}
