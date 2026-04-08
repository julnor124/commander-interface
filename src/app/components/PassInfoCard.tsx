import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Clock3 } from 'lucide-react';

interface PassInfoCardProps {
  isActivePass?: boolean;
  isUnavailable?: boolean;
  isPendingPassStart?: boolean;
  passStartsInSeconds?: number;
  passStartsAtLabel?: string;
  passEndsAtLabel?: string;
  timeLeftLabel?: string;
  countdownLabel?: string;
  missionNote?: string;
  commanderView?: 'commander1' | 'commander2';
  forceExpanded?: boolean;
  forceCollapsed?: boolean;
}

const PASS_INFO_METRICS = [
  { label: 'AOS' },
  { label: '5°' },
  { label: 'Max El' },
  { label: '5°' },
  { label: 'LOS' },
];

export default function PassInfoCard({
  isActivePass = false,
  isUnavailable = false,
  isPendingPassStart = false,
  passStartsInSeconds = 0,
  passStartsAtLabel = '--:--',
  passEndsAtLabel = '--:--',
  timeLeftLabel = '0min 00s',
  countdownLabel = '0min 00s',
  missionNote = '2026-04-13 Prepare_pass',
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

  const isCountdownMode = !isUnavailable && !isActivePass;
  const primaryLabel = isUnavailable
    ? null
    : isPendingPassStart
      ? 'Pass starts in:'
      : isActivePass
        ? 'Time Left:'
        : 'Countdown:';
  const primaryValue = isUnavailable
    ? 'Unavailable'
    : isPendingPassStart || !isActivePass
      ? countdownLabel
      : timeLeftLabel;
  const primaryValueClass = isUnavailable
    ? 'text-[#f4c65d]'
    : isActivePass
      ? 'px-2 py-0.5 rounded bg-[#0e3147] text-[#7cd7ff] drop-shadow-[0_0_6px_rgba(58,190,255,0.28)]'
      : `text-[#f6d46b] ${
          isFinalCountdownAlert
            ? 'font-extrabold animate-pulse [animation-duration:300ms] drop-shadow-[0_0_8px_rgba(246,212,107,0.55)]'
            : ''
        }`;

  const passStatusText = isUnavailable
    ? 'UPCOMING'
    : isActivePass
      ? 'ACTIVE'
      : 'UPCOMING';
  const passStatusClass = isActivePass
    ? 'bg-[#17455f] text-[#7cd7ff] border border-[#3ABEFF]/60'
    : 'bg-[#7a6624] text-[#f6d46b] border border-[#9b8440]';
  const isC2UnavailableLayout = commanderView === 'commander2' && isUnavailable;

  return (
    <div>
      {commanderView === 'commander2' ? (
        <button
          onClick={() => {
            if (isLockedOpen) return;
            setIsCollapsed((prev) => !prev);
          }}
          className="w-full relative flex items-center justify-end text-[16px] font-medium mb-2 bg-[#213b54] rounded px-3 py-2 cursor-pointer"
        >
          <span className="absolute inset-x-0 flex items-center justify-center gap-1.5">
            <Clock3 size={16} />
            Pass Information
          </span>
          {isCollapsed && !isLockedOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      ) : (
        <h2 className="text-[18px] font-medium mb-3 text-center bg-[#213b54] rounded px-3 py-1">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} />
            Pass Information
          </span>
        </h2>
      )}
      {showContent ? (
      <div
        className={`relative rounded-sm p-3 ${isC2UnavailableLayout ? 'grid grid-cols-1' : 'grid grid-cols-[1fr_auto]'} gap-3 ${
          isUnavailable
            ? 'border border-[#7f8f9d] bg-[#13202c]'
            : isActivePass
              ? 'border border-[#3ABEFF] bg-[#112433] shadow-[0_0_0_1px_rgba(58,190,255,0.25),0_0_22px_rgba(58,190,255,0.18)]'
              : 'border border-[#8f7a43] bg-[#141f2a]'
        }`}
      >
        <div className="space-y-2">
          <div className={`${isC2UnavailableLayout ? 'min-h-[120px] flex items-center justify-center text-center' : 'min-h-[92px]'}`}>
            <div className="mb-0.5">
              {primaryLabel && (
                <div className="text-[clamp(14px,1.05vw,22px)] text-[#8ea2b3]">
                  {primaryLabel}
                </div>
              )}
              <span
                className={`inline-block mt-1 text-[clamp(30px,2.6vw,52px)] font-extrabold tracking-tight leading-none ${primaryValueClass}`}
              >
                {primaryValue}
              </span>
              {isUnavailable && (
                <div className="mt-2 text-[clamp(12px,1vw,16px)] leading-[1.25] text-[#c9d4de]">
                  <div>Reason: Maintenance</div>
                  <div>Back: 26-05-19</div>
                </div>
              )}
            </div>
          </div>

          {!isUnavailable && (
            <div className="flex items-center justify-between gap-2 border-t border-[#2e4a66] pt-2">
              <p className="text-[clamp(12px,1vw,16px)] leading-[1.12] text-[#a4b6c5]">
                {missionNote}
              </p>
              <span className={`inline-flex items-center rounded px-2.5 py-1 text-[12px] font-bold uppercase tracking-wide mr-2 ${passStatusClass}`}>
                {passStatusText}
              </span>
            </div>
          )}
        </div>

        {!isC2UnavailableLayout && (
        <div className="space-y-1.5 min-w-[120px]">
          <div className="flex items-center justify-between mb-1">
            <span className="min-w-[68px]" />
            <div className="w-[64px] text-[11px] text-[#d9dfe5] text-center">Time</div>
          </div>
          {PASS_INFO_METRICS.map((metric, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <span className="text-[clamp(11px,0.85vw,15px)] text-[#d9dfe5] min-w-[68px]">{metric.label}</span>
              <div className="w-[64px] h-4 bg-[#c8cdd4] rounded-[2px]">
                {isUnavailable ? (
                  <span className="block text-[10px] leading-4 text-center text-[#223446]">&nbsp;</span>
                ) : isActivePass && (
                  <span className="block text-[11px] font-semibold leading-4 text-center text-[#223446]">
                    {[passStartsAtLabel, passStartsAtLabel, passEndsAtLabel, passEndsAtLabel, passEndsAtLabel][index]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        )}
        {!isUnavailable && (
          <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[178px] rounded-md border border-[#2f4a61] bg-[#102736]/70 px-2 py-1.5 text-center">
              <div className="text-[clamp(11px,0.95vw,14px)] leading-[1.25] text-[#9fb0bf]">
                {isActivePass ? 'Started' : isCountdownMode ? 'Starts' : 'Started'}:{' '}
                <span className="text-[#e7eff6] font-semibold">{passStartsAtLabel}</span>
              </div>
              <div className="text-[clamp(11px,0.95vw,14px)] leading-[1.25] text-[#9fb0bf]">
                Ends: <span className="text-[#e7eff6] font-semibold">{passEndsAtLabel}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      ) : null}
    </div>
  );
}
