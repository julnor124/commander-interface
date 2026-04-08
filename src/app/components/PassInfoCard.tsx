import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface PassInfoCardProps {
  isActivePass?: boolean;
  isUnavailable?: boolean;
  isPendingPassStart?: boolean;
  passStartsInSeconds?: number;
  passStartsAtLabel?: string;
  passEndsAtLabel?: string;
  timeLeftLabel?: string;
  countdownLabel?: string;
  commanderView?: 'commander1' | 'commander2';
  forceExpanded?: boolean;
  forceCollapsed?: boolean;
}

export default function PassInfoCard({
  isActivePass = false,
  isUnavailable = false,
  isPendingPassStart = false,
  passStartsInSeconds = 0,
  passStartsAtLabel = '--:--',
  passEndsAtLabel = '--:--',
  timeLeftLabel = '0min 00s',
  countdownLabel = '0min 00s',
  commanderView = 'commander1',
  forceExpanded = false,
  forceCollapsed = false,
}: PassInfoCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isLockedOpen = commanderView === 'commander2' && forceExpanded;
  const showContent = !isCollapsed || isLockedOpen;
  const isFinalCountdownAlert = isPendingPassStart && passStartsInSeconds <= 15;
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
  const metrics = [
    { label: 'Time pending' },
    { label: 'AOS' },
    { label: '5°' },
    { label: 'Max El' },
    { label: '5°' },
    { label: 'LOS' },
  ];

  return (
    <div>
      {commanderView === 'commander2' ? (
        <button
          onClick={() => {
            if (isLockedOpen) return;
            setIsCollapsed((prev) => !prev);
          }}
          className="w-full relative flex items-center justify-end text-[18px] font-medium mb-3 bg-[#213b54] rounded px-3 py-1 cursor-pointer"
        >
          <span className="absolute inset-x-0 text-center">Pass Information</span>
          {isCollapsed && !isLockedOpen ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
      ) : (
        <h2 className="text-[18px] font-medium mb-3 text-center bg-[#213b54] rounded px-3 py-1">
          Pass Information
        </h2>
      )}
      {showContent ? (
      <div className={`rounded-sm p-3 grid grid-cols-[1fr_auto] gap-3 ${isUnavailable ? 'border border-[#8fa4b8]' : isActivePass ? 'border border-[#3ABEFF]' : 'border border-[#b8963e]'}`}>
        <div className="space-y-2">
          <div className="mb-0.5">
            {isUnavailable ? (
              <span className="text-[clamp(15px,1.35vw,28px)] text-[#d9d9d9]">Unavailable</span>
            ) : isPendingPassStart ? (
              <>
                <span className="text-[clamp(15px,1.35vw,28px)] text-[#d9d9d9]">Pass starts in: </span>
                <span
                  className={`text-[clamp(15px,1.35vw,28px)] font-normal ${
                    isFinalCountdownAlert
                      ? 'text-[#B8963E] font-extrabold animate-pulse [animation-duration:300ms] drop-shadow-[0_0_10px_rgba(184,150,62,0.95)]'
                      : 'text-[#B8963E]'
                  }`}
                >
                  {countdownLabel}
                </span>
              </>
            ) : isActivePass ? (
              <>
                <span className="text-[clamp(15px,1.35vw,28px)] text-[#d9d9d9]">Time Left: </span>
                <span className="text-[clamp(15px,1.35vw,28px)] font-normal text-[#3ABEFF]">
                  {timeLeftLabel}
                </span>
              </>
            ) : (
              <>
                <span className="text-[clamp(15px,1.4vw,30px)] text-[#d9d9d9]">Countdown: </span>
                <span className="text-[clamp(15px,1.4vw,30px)] font-normal text-[#B8963E]">
                  {countdownLabel}
                </span>
              </>
            )}
          </div>

          <div className="space-y-0 text-[clamp(13px,1.1vw,22px)] leading-[1.12] min-h-[56px]">
            {!isUnavailable && (
              isActivePass ? (
                <>
                  <div className="text-[#f2f2f2]">Started: {passStartsAtLabel}</div>
                  <div className="text-[#f2f2f2]">Ends: {passEndsAtLabel}</div>
                </>
              ) : (
                <>
                  <div className="text-[#f2f2f2]">Starts: {passStartsAtLabel}</div>
                  <div className="text-[#f2f2f2]">Ends: {passEndsAtLabel}</div>
                </>
              )
            )}
          </div>

          {!isUnavailable && (
            <p className="text-[clamp(12px,1vw,18px)] leading-[1.12] text-[#f2f2f2] border-t border-[#2e4a66] pt-2">
              2026-04-13 Prepare_pass hejsan
            </p>
          )}
        </div>

        <div className="space-y-1.5 min-w-[120px]">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <span className="text-[clamp(11px,0.85vw,15px)] text-[#d9dfe5] min-w-[68px]">{metric.label}</span>
              <div className="w-[64px] h-4 bg-[#c8cdd4] rounded-[2px]">
                {isUnavailable ? (
                  <span className="block text-[9px] leading-4 text-center text-[#223446]">&nbsp;</span>
                ) : isActivePass && (
                  <span className="block text-[9px] leading-4 text-center text-[#223446]">
                    {[passStartsAtLabel, passStartsAtLabel, passStartsAtLabel, passEndsAtLabel, passEndsAtLabel, passEndsAtLabel][index]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      ) : null}
    </div>
  );
}
