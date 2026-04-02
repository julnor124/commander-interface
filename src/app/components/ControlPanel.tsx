import { useState } from 'react';
import { logActivity } from '../utils/activityLog';

interface ControlPanelProps {
  isUnavailable?: boolean;
}

export default function ControlPanel({ isUnavailable = false }: ControlPanelProps) {
  const [matrixSelection, setMatrixSelection] = useState<'ON' | 'OFF'>('ON');
  const [rfSelection, setRfSelection] = useState<'ON' | 'OFF'>('OFF');
  const [xRfSelection, setXRfSelection] = useState<'ON' | 'OFF'>('OFF');
  const [timeValue, setTimeValue] = useState(0);
  const [elValue, setElValue] = useState(0);
  const [stepValue, setStepValue] = useState(0);

  const matrixOptions = [
    { id: 'ON', label: 'ON' },
    { id: 'OFF', label: 'OFF' },
  ];
  const clickFeedbackClass =
    'cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => prev + 1);
  };

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => Math.max(0, prev - 1));
  };

  const handleResetOffsets = () => {
    const shouldReset = window.confirm('Are you sure you want to reset?');
    if (!shouldReset) {
      logActivity('Offset reset cancelled');
      return;
    }

    setTimeValue(0);
    setElValue(0);
    setStepValue(0);
    logActivity('Offsets reset to 0');
  };

  return (
    <div>
      <h2 className="text-[14px] font-medium mb-2 bg-[#213b54] rounded px-3 py-1.5">Control</h2>

      <div className="grid grid-cols-3 gap-2.5">
        {/* Left: Matrix Controls */}
        <div className="space-y-2 bg-[#173148] rounded p-2 min-h-[96px]">
          <div>
            <h3 className="text-[11px] text-[#c4d0da] mb-1.5 text-center">Matrix</h3>
            <div className="grid grid-cols-1 gap-2">
              {matrixOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
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
          <h3 className="text-[11px] text-[#c4d0da] text-left">RF</h3>
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
                  setRfSelection('OFF');
                  logActivity('RF set to OFF');
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
                  setXRfSelection('OFF');
                  logActivity('X RF set to OFF');
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
                className={`w-full px-2 py-0.5 bg-[#d0d0d0] text-[#223446] rounded text-[10px] ${clickFeedbackClass}`}
              >
                Calibrate
              </button>
              <button
                onClick={() => logActivity('RF Calibrate Xb pressed')}
                className={`w-full px-2 py-0.5 bg-[#d0d0d0] text-[#223446] rounded text-[10px] ${clickFeedbackClass}`}
              >
                Calibrate Xb
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 bg-[#173148] rounded p-2 min-h-[96px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] text-[#c4d0da] text-left">Offset</h3>
            <button
              onClick={handleResetOffsets}
              className={`px-1.5 h-4 bg-[#d0d0d0] text-[#223446] rounded text-[9px] ${clickFeedbackClass}`}
            >
              Reset
            </button>
          </div>
          {[
            { label: 'Time', value: timeValue, setter: setTimeValue },
            { label: 'El', value: elValue, setter: setElValue },
            { label: 'Az', value: 0, setter: setElValue },
            { label: 'Step', value: stepValue, setter: setStepValue },
          ].map((control) => (
            <div key={control.label} className="flex items-center gap-2">
              <span className="text-[11px] text-[#c4d0da] w-8">{control.label}</span>
              <div className="w-4 h-4 bg-[#d0d0d0] rounded text-center leading-4 text-[#223446] text-[10px]">
                {isUnavailable ? '' : control.value}
              </div>
              <button
                onClick={() => {
                  handleDecrement(control.setter);
                  logActivity(`Offset ${control.label} decreased`);
                }}
                className={`w-4 h-4 bg-[#d0d0d0] text-[#223446] rounded text-[10px] leading-4 ${clickFeedbackClass}`}
              >
                -
              </button>
              <button
                onClick={() => {
                  handleIncrement(control.setter);
                  logActivity(`Offset ${control.label} increased`);
                }}
                className={`w-4 h-4 bg-[#d0d0d0] text-[#223446] rounded text-[10px] leading-4 ${clickFeedbackClass}`}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
