import React, { useState } from 'react';
import { X } from 'lucide-react';

const TOP_LABELS = ['BSI', 'BSQ', 'PLL', 'ViT', 'Fs', 'Avai', 'CTX', 'ACQ'];
const METRICS = ['Total', 'Bad', 'Connected', 'Discontinuity'];

interface HDRCardProps {
  title?: string;
  isActive?: boolean;
  usageLabel?: string;
}

export default function HDRCard({
  title,
  isActive = false,
  usageLabel,
}: HDRCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1c2f42] border border-[#2e4a66] rounded-2xl p-3 lg:p-4 relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#3a5268] hover:bg-[#4a637a] cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70 flex items-center justify-center"
      >
        <X className="w-4 h-4 text-[#e7edf2]" />
      </button>
      {usageLabel && (
        <div
          className={`absolute top-2 right-10 inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold border ${
            isActive
              ? 'text-[#7cd7ff] bg-[#15354a] border-[#3ABEFF]/45'
              : 'text-[#b7c3ce] bg-[#26323d] border-[#4f5d6a]'
          }`}
        >
          {usageLabel}
        </div>
      )}

      <div className="mb-2">
        <h3 className="text-[14px] leading-none text-[#f2f2f2] underline underline-offset-4">
          {title ?? 'Hdr/Rtt'}
        </h3>
      </div>

      <div className="grid grid-cols-8 gap-x-1.5 gap-y-1.5 text-[#f2f2f2] mb-3">
        {TOP_LABELS.map((label) => (
          <div key={label} className="text-[10px] leading-none">
            {label}
          </div>
        ))}

        {[0, 1].map((row) => (
          <div key={row} className="col-span-5 grid grid-cols-5 gap-1.5">
            {[0, 1, 2, 3, 4].map((dot) => (
              <div key={dot} className="w-5 h-5 rounded-full bg-[#d0d0d0]" />
            ))}
          </div>
        ))}

        <div className="row-span-2 col-start-6 row-start-2 w-8 h-[54px] rounded-[14px] bg-[#d0d0d0]" />
        <div className="row-span-2 col-start-7 row-start-2 w-5 h-5 rounded-full bg-[#d0d0d0]" />
        <div className="row-span-2 col-start-8 row-start-2 flex items-center">
          <div className="relative w-7 h-[54px]">
            <div className="absolute left-0 top-0 bottom-0 w-2 rounded-full bg-[#d0d0d0]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-2 rounded-full bg-[#d0d0d0]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 mb-1">
        <div />
        <div className="text-[12px] text-[#f2f2f2] text-center leading-tight">Channel<br />1</div>
        <div className="text-[12px] text-[#f2f2f2] text-center leading-tight">Channel<br />2</div>
      </div>

      <div className="space-y-1.5">
        {METRICS.map((metric) => (
          <div key={metric} className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2">
            <div className="text-[10px] text-[#f2f2f2]">{metric}</div>
            <div className="h-8 rounded-2xl bg-[#d0d0d0] text-[#49505a] text-[11px] flex items-center justify-center">
              0.00
            </div>
            <div className="h-8 rounded-2xl bg-[#d0d0d0] text-[#49505a] text-[11px] flex items-center justify-center">
              0.00
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
