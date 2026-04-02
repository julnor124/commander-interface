interface PassInfoCardProps {
  isActivePass?: boolean;
  isUnavailable?: boolean;
  isPendingPassStart?: boolean;
  passStartsInSeconds?: number;
}

export default function PassInfoCard({
  isActivePass = false,
  isUnavailable = false,
  isPendingPassStart = false,
  passStartsInSeconds = 0,
}: PassInfoCardProps) {
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
      <h2 className="text-[18px] font-medium mb-3 text-center bg-[#213b54] rounded px-3 py-1">
        Pass Information
      </h2>
      <div className={`rounded-sm p-3 grid grid-cols-[1fr_auto] gap-3 ${isUnavailable ? 'border border-[#8fa4b8]' : isActivePass || isPendingPassStart ? 'border border-[#3ABEFF]' : 'border border-[#b8963e]'}`}>
        <div className="space-y-2">
          <div className="mb-0.5">
            {isUnavailable ? (
              <span className="text-[clamp(15px,1.35vw,28px)] text-[#d9d9d9]">Unavailable</span>
            ) : isPendingPassStart ? (
              <>
                <span className="text-[clamp(15px,1.35vw,28px)] text-[#d9d9d9]">Pass starts in: </span>
                <span className="text-[clamp(15px,1.35vw,28px)] font-normal text-[#3ABEFF]">
                  {passStartsInSeconds}s
                </span>
              </>
            ) : isActivePass ? (
              <>
                <span className="text-[clamp(15px,1.35vw,28px)] text-[#d9d9d9]">Time Left: </span>
                <span className="text-[clamp(15px,1.35vw,28px)] font-normal text-[#3ABEFF]">
                  9min 12s
                </span>
              </>
            ) : (
              <>
                <span className="text-[clamp(15px,1.4vw,30px)] text-[#d9d9d9]">Countdown: </span>
                <span className="text-[clamp(15px,1.4vw,30px)] font-normal text-[#B8963E]">
                  20min 10s
                </span>
              </>
            )}
          </div>

          <div className="space-y-0 text-[clamp(13px,1.1vw,22px)] leading-[1.12] min-h-[56px]">
            {isActivePass ? (
              <>
                <div className="text-[#f2f2f2]">Started: 17:10</div>
                <div className="text-[#f2f2f2]">Ends: 17:25</div>
              </>
            ) : (
              <>
                <div className="text-[#f2f2f2]">Starts: 17:00</div>
                <div className="text-[#f2f2f2]">Ends: 17:15</div>
              </>
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
                    {['17:10:00', '17:13:40', '17:16:45', '17:22:05', '17:25:14', '17:25:14'][index]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
