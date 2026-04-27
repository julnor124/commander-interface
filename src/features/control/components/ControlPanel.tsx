// ControlPanel UI component.
import React from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { publishActivity } from '../../activityLog/api/activityLogApi';
import { useOffsetControls } from '../../offsets/hooks/useOffsetControls';
import { usePanelCollapse } from '../../ui/hooks/usePanelCollapse';
import { useControlState } from '../hooks/useControlState';
import { useControlOperations } from '../hooks/useControlOperations';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';

interface ControlPanelProps {
  isUnavailable?: boolean;
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

export default function ControlPanel({
  isUnavailable = false,
  forceCollapsed = false,
  forceExpanded = false,
}: ControlPanelProps) {
  const { isCollapsed, setIsCollapsed } = usePanelCollapse({
    forceCollapsed,
    forceExpanded,
  });
  const {
    matrixSelection,
    rfSelection,
    xRfSelection,
    isMatrixOffDialogOpen,
    setIsMatrixOffDialogOpen,
    rfOffDialogTarget,
    setRfOffDialogTarget,
    matrixOptions,
    handleMatrixOptionSelect,
    handleRfOn,
    handleXRfOn,
    requestRfOff,
    confirmMatrixOff,
    confirmRfOff,
    runRfCalibration,
  } = useControlState();
  const clickFeedbackClass =
    'press-feedback cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';
  const movedActionGroups = useControlOperations();

  const { controls: offsetControls, increment, decrement, reset } = useOffsetControls({
    onIncrement: (key) => publishActivity(`Offset ${key} increased`),
    onDecrement: (key) => publishActivity(`Offset ${key} decreased`),
    onReset: () => publishActivity('Offsets reset to 0'),
  });

  const handleResetOffsets = () => {
    const shouldReset = window.confirm('Are you sure you want to reset?');
    if (!shouldReset) {
      publishActivity('Offset reset cancelled');
      return;
    }

    reset();
  };

  return (
    <div>
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

      {isCollapsed ? null : (
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-start justify-center gap-2.5">
        <div className="space-y-2 bg-[#173148] rounded p-2 min-h-[96px] w-full max-w-[320px]">
          <div>
            <h3 className="text-[10px] tracking-wide uppercase text-[#8ea2b3] mb-1.5 text-center">Matrix</h3>
            <div className="grid grid-cols-1 gap-2">
              {matrixOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleMatrixOptionSelect(option.id)}
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

        <div className="space-y-2 bg-[#173148] rounded p-2 min-h-[96px] w-full max-w-[320px]">
          <h3 className="text-[10px] tracking-wide uppercase text-[#8ea2b3] text-left">RF</h3>
          <div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => {
                  void handleRfOn();
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
                  void handleXRfOn();
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
                  requestRfOff('RF');
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
                  requestRfOff('X RF');
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
                onClick={() => void runRfCalibration('RF')}
                className={`w-full px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${clickFeedbackClass}`}
              >
                Calibrate
              </button>
              <button
                onClick={() => void runRfCalibration('X RF')}
                className={`w-full px-2 py-0.5 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] ${clickFeedbackClass}`}
              >
                Calibrate Xb
              </button>
            </div>
          </div>
        </div>
        </div>

          <div className="space-y-2 bg-[#173148] border border-[#2a4864] rounded p-2.5">
            <h3 className="text-[10px] tracking-wide uppercase text-[#8ea2b3] text-left">Operations</h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
              {movedActionGroups.map((group) => (
                <div
                  key={group.title}
                  className="bg-[#1a364f] border border-[#2f5370] rounded-md p-2 shadow-[inset_0_1px_0_rgba(120,170,210,0.08)]"
                >
                  <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#213f58] text-[9px] tracking-wide uppercase text-[#c7d7e5] mb-2">
                    {group.title}
                  </div>
                  <div className="space-y-1">
                    {group.actions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => publishActivity(action.log)}
                        className={`w-full px-2 py-1 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] leading-tight text-left ${clickFeedbackClass}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
      )}

      <ConfirmDialog
        isOpen={isMatrixOffDialogOpen}
        title="Are you sure you want to turn off the matrix?"
        description="This will disable matrix output until it is turned on again."
        onCancel={() => setIsMatrixOffDialogOpen(false)}
        onConfirm={confirmMatrixOff}
      />

      <ConfirmDialog
        isOpen={Boolean(rfOffDialogTarget)}
        title={`Are you sure you want to turn off ${rfOffDialogTarget?.toLowerCase() ?? ''}?`}
        description={`This will disable ${rfOffDialogTarget?.toLowerCase() ?? ''} output until it is turned on again.`}
        onCancel={() => setRfOffDialogTarget(null)}
        onConfirm={confirmRfOff}
      />
    </div>
  );
}
