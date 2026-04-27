import React, { useEffect, useState } from 'react';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { TrackingPanelProps } from '../types';

export default function TrackingPanel({
  isActivePass = false,
  isUnavailable = false,
  passProgress = 0,
  forceCollapsed = false,
  forceExpanded = false,
}: TrackingPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
  const quadraticPath = (() => {
    const maxX = 100;
    const peakY = 20;
    const edgeY = 98;
    const midX = maxX / 2;
    const curvature = (edgeY - peakY) / (midX * midX);
    const step = 2;
    const points = Array.from({ length: Math.floor(maxX / step) + 1 }, (_, idx) => {
      const x = idx * step;
      const y = peakY + curvature * (x - midX) * (x - midX);
      return `${x},${y.toFixed(2)}`;
    });
    return points.join(' ');
  })();

  const renderTrackBox = (title: string, height: string) => {
    return (
      <div className="bg-[#1c2f42] border border-[#2e4a66] rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[12px] font-medium text-[#a8b8c6]">{title}</h3>
          <div className="h-3 w-20 bg-[#d9d9d9]">
            {isActivePass && !isUnavailable && (
              <span className="block text-[10px] font-semibold text-[#223446] leading-3 text-center">0.5</span>
            )}
          </div>
        </div>
        <div className={`w-full bg-[#0f1c28] rounded border border-[#8fa4b8] relative overflow-hidden ${height}`}>
          {isActivePass && title === 'Time error' && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#3ABEFF"
                strokeWidth="1.2"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1 - passProgress,
                  transition: 'stroke-dashoffset 900ms linear',
                }}
                points={quadraticPath}
              />
            </svg>
          )}
          {isActivePass && (title === 'El delta' || title === 'Az delta') && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="#3ABEFF"
                strokeWidth="1.2"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1 - passProgress,
                  transition: 'stroke-dashoffset 900ms linear',
                }}
              />
            </svg>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="w-full relative flex items-center justify-end text-[16px] font-medium mb-2 bg-[#213b54] rounded px-3 py-2 cursor-pointer"
      >
        <span className="absolute inset-x-0 flex items-center justify-center gap-1.5">
          <Activity size={16} />
          Real Time Tracking
        </span>
        {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>
      {isCollapsed ? null : (
        <div className="space-y-4">
          {renderTrackBox('Time error', 'h-[220px]')}
          {renderTrackBox('El delta', 'h-[42px]')}
          {renderTrackBox('Az delta', 'h-[42px]')}
        </div>
      )}
    </div>
  );
}
