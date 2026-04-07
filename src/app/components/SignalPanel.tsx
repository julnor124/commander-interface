import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SignalPanelProps {
  isUnavailable?: boolean;
  isActivePass?: boolean;
  commanderView?: 'commander1' | 'commander2';
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

export default function SignalPanel({
  isUnavailable = false,
  isActivePass = false,
  commanderView = 'commander1',
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

  const barFillClass = isActivePass && !isUnavailable ? 'bg-[#3ABEFF]' : 'bg-[#dce3ea]';

  return (
    <div>
      {commanderView === 'commander2' ? (
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="w-full relative flex items-center justify-end text-[16px] font-medium mb-3 bg-[#213b54] rounded px-2 py-1 cursor-pointer"
        >
          <span className="absolute inset-x-0 text-center">Signal</span>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
      ) : (
        <h2 className="text-[16px] font-medium mb-3 text-center bg-[#213b54] rounded px-2 py-1">Signal</h2>
      )}

      {commanderView === 'commander2' && isCollapsed ? null : (
      <div className="grid grid-cols-2 gap-4">
        {/* S-band */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-[#c4d0da] mb-2">S-band</span>
          <div className="relative w-8 h-28 bg-[#1e3146] border border-[#8fa4b8] rounded-sm overflow-hidden">
            <div className="absolute inset-x-[6px] top-[8px] bottom-[8px] border border-[#dce3ea] overflow-hidden">
              <div
                className={`absolute inset-x-0 bottom-0 transition-all duration-700 ${barFillClass}`}
                style={{ height: `${sBandLevel}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-[#8a9ba8] mt-1">
            {isUnavailable ? '' : isActivePass ? Math.round(sBandLevel / 10).toString() : '0'}
          </span>
        </div>

        {/* X-band */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-[#c4d0da] mb-2">X-band</span>
          <div className="relative w-8 h-28 bg-[#1e3146] border border-[#8fa4b8] rounded-sm overflow-hidden">
            <div className="absolute inset-x-[6px] top-[8px] bottom-[8px] border border-[#dce3ea] overflow-hidden">
              <div
                className={`absolute inset-x-0 bottom-0 transition-all duration-700 ${barFillClass}`}
                style={{ height: `${xBandLevel}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-[#8a9ba8] mt-1">
            {isUnavailable ? '' : isActivePass ? Math.round(xBandLevel / 10).toString() : '1'}
          </span>
        </div>
      </div>
      )}
    </div>
  );
}
