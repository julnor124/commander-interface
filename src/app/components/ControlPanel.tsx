import React, { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { logActivity } from '../../features/activityLog/activityLogBus';
import { useOffsetControls } from '../../features/offsets/useOffsetControls';
import { usePanelCollapse } from '../../features/ui/usePanelCollapse';
import ConfirmDialog from './ConfirmDialog';

interface ControlPanelProps {
  isUnavailable?: boolean;
  commanderView?: 'commander1' | 'commander2';
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

export default function ControlPanel({
  isUnavailable = false,
  commanderView = 'commander1',
  forceCollapsed = false,
  forceExpanded = false,
}: ControlPanelProps) {
  const [matrixSelection, setMatrixSelection] = useState<'ON' | 'OFF'>('ON');
  const [rfSelection, setRfSelection] = useState<'ON' | 'OFF'>('OFF');
  const [xRfSelection, setXRfSelection] = useState<'ON' | 'OFF'>('OFF');
  const { isCollapsed, setIsCollapsed } = usePanelCollapse({
    commanderView,
    forceCollapsed,
    forceExpanded,
  });
  const [isMatrixOffDialogOpen, setIsMatrixOffDialogOpen] = useState(false);
  const [rfOffDialogTarget, setRfOffDialogTarget] = useState<null | 'RF' | 'X RF'>(
    null,
  );

  const matrixOptions = [
    { id: 'ON', label: 'ON' },
    { id: 'OFF', label: 'OFF' },
  ];
  const clickFeedbackClass =
    'press-feedback cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';

  const { controls: offsetControls, increment, decrement, reset } = useOffsetControls({
    onIncrement: (key) => logActivity(`Offset ${key} increased`),
    onDecrement: (key) => logActivity(`Offset ${key} decreased`),
    onReset: () => logActivity('Offsets reset to 0'),
  });

  const handleResetOffsets = () => {
    const shouldReset = window.confirm('Are you sure you want to reset?');
    if (!shouldReset) {
      logActivity('Offset reset cancelled');
      return;
    }

    reset();
  };

  return (
    <div>
      {commanderView === 'commander2' ? (
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="w-full relative flex items-center justify-end text-[16px] font-medium mb-2 bg-[#213b54] rounded px-3 py-1.5 cursor-pointer"
        >
          <span className="absolute inset-x-0 flex items-center justify-center gap-1.5">
            <SlidersHorizontal size={16} />
            Control
          </span>
          {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      ) : (
        <h2 className="text-[14px] font-medium mb-2 bg-[#213b54] rounded px-3 py-1.5 text-center">
          <span className="inline-flex items-center justify-center gap-1.5 w-full">
            <SlidersHorizontal size={14} />
            Control
          </span>
        </h2>
      )}

      {commanderView === 'commander2' && isCollapsed ? null : (
      <div className={`grid gap-2.5 ${commanderView === 'commander2' ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {/* Left: Matrix Controls */}
        <div className="space-y-2 bg-[#173148] rounded p-2 min-h-[96px]">
          <div>
            <h3 className="text-[10px] tracking-wide uppercase text-[#8ea2b3] mb-1.5 text-center">Matrix</h3>
            <div className="grid grid-cols-1 gap-2">
              {matrixOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    if (option.id === 'OFF') {
                      setIsMatrixOffDialogOpen(true);
                      return;
                    }
                    setMatrixSelection(option.id as 'ON' | 'OFF');
                    logActivity(`Matrix set to ${option.id}`);
                  }}
                  className={`px-2 py-0.5 rounded-full transition-colors text-[10px] ${clickFeedbackClass} ${
                    matrixSelection === option.id
                      ? 'bg-[#3ABEFF] text-[#0f1c28]'
                      : 'bg-[#2a4258] text-[#f2f2f2]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right: RF Controls and Inputs */}
        <div className="space-y-2 bg-[#173148] rounded p-2 min-h-[96px]">
          <h3 className="text-[10px] tracking-wide uppercase text-[#8ea2b3] text-left">RF</h3>
          <div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => {
                  setRfSelection('ON');
                  logActivity('RF set to ON');
                }}
                className={`px-2 py-0.5 rounded transition-colors text-[10px] ${clickFeedbackClass} ${
                  rfSelection === 'ON'
                    ? 'bg-[#3ABEFF] text-[#0f1c28] font-medium'
                    : 'bg-[#2a4258] text-[#f2f2f2]'
                }`}
              >
                RF ON
              </button>
              <button
                onClick={() => {
                  setXRfSelection('ON');
                  logActivity('X RF set to ON');
                }}
                className={`px-2 py-0.5 rounded transition-colors text-[10px] ${clickFeedbackClass} ${
                  xRfSelection === 'ON'
                    ? 'bg-[#3ABEFF] text-[#0f1c28] font-medium'
                    : 'bg-[#2a4258] text-[#f2f2f2]'
                }`}
              >
                X RF ON
              </button>
              <button
                onClick={() => {
                  setRfOffDialogTarget('RF');
                }}
                className={`px-2 py-0.5 rounded transition-colors text-[10px] ${clickFeedbackClass} ${
                  rfSelection === 'OFF'
                    ? 'bg-[#3ABEFF] text-[#0f1c28] font-medium'
                    : 'bg-[#2a4258] text-[#f2f2f2]'
                }`}
              >
                RF OFF
              </button>
              <button
                onClick={() => {
                  setRfOffDialogTarget('X RF');
                }}
                className={`px-2 py-0.5 rounded transition-colors text-[10px] ${clickFeedbackClass} ${
                  xRfSelection === 'OFF'
                    ? 'bg-[#3ABEFF] text-[#0f1c28] font-medium'
                    : 'bg-[#2a4258] text-[#f2f2f2]'
                }`}
              >
                X RF OFF
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => logActivity('RF Calibrate pressed')}
                className={`w-full px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${clickFeedbackClass}`}
              >
                Calibrate
              </button>
              <button
                onClick={() => logActivity('RF Calibrate Xb pressed')}
                className={`w-full px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${clickFeedbackClass}`}
              >
                Calibrate Xb
              </button>
            </div>
          </div>
        </div>

        {commanderView !== 'commander2' && (
          <div className="space-y-1.5 bg-[#173148] rounded p-2 min-h-[96px]">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] tracking-wide uppercase text-[#8ea2b3] text-left">Offset</h3>
              <button
                onClick={handleResetOffsets}
                className={`px-1.5 h-4 bg-[#3a5268] text-[#e7edf2] rounded text-[9px] ${clickFeedbackClass}`}
              >
                Reset
              </button>
            </div>
            {offsetControls.map((control) => (
              <div key={control.label} className="flex items-center gap-2">
                <span className="text-[10px] text-[#8ea2b3] w-8">{control.label}</span>
                <div className="w-4 h-4 bg-[#d0d0d0] rounded text-center leading-4 text-[#223446] text-[10px]">
                  {isUnavailable ? '' : control.value}
                </div>
                <button
                  onClick={() => {
                    decrement(control.label);
                  }}
                  className={`w-4 h-4 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] leading-4 ${clickFeedbackClass}`}
                >
                  -
                </button>
                <button
                  onClick={() => {
                    increment(control.label);
                  }}
                  className={`w-4 h-4 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] leading-4 ${clickFeedbackClass}`}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      )}

      <ConfirmDialog
        isOpen={isMatrixOffDialogOpen}
        title="Are you sure you want to turn off the matrix?"
        description="This will disable matrix output until it is turned on again."
        onCancel={() => setIsMatrixOffDialogOpen(false)}
        onConfirm={() => {
          setMatrixSelection('OFF');
          logActivity('Matrix was disabled');
          setIsMatrixOffDialogOpen(false);
        }}
      />

      <ConfirmDialog
        isOpen={Boolean(rfOffDialogTarget)}
        title={`Are you sure you want to turn off ${rfOffDialogTarget?.toLowerCase() ?? ''}?`}
        description={`This will disable ${rfOffDialogTarget?.toLowerCase() ?? ''} output until it is turned on again.`}
        onCancel={() => setRfOffDialogTarget(null)}
        onConfirm={() => {
          if (rfOffDialogTarget === 'RF') {
            setRfSelection('OFF');
            logActivity('RF was disabled');
          } else if (rfOffDialogTarget === 'X RF') {
            setXRfSelection('OFF');
            logActivity('X RF was disabled');
          }
          setRfOffDialogTarget(null);
        }}
      />
    </div>
  );
}
