// ActionsPanel UI component.
import React from 'react';
import { ChevronDown, ChevronUp, ListChecks } from 'lucide-react';
import { publishActivity } from '../../activityLog/api/activityLogApi';
import { runAction } from '../api/actionsApi';
import { useOffsetControls } from '../../offsets/hooks/useOffsetControls';
import { usePanelCollapse } from '../../ui/hooks/usePanelCollapse';
import { useActionsConfig } from '../hooks/useActionsConfig';
import { useActionsTabs } from '../hooks/useActionsTabs';

interface ActionsPanelProps {
  isUnavailable?: boolean;
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

export default function ActionsPanel({
  isUnavailable = false,
  forceCollapsed = false,
  forceExpanded = false,
}: ActionsPanelProps) {
  const { isCollapsed, setIsCollapsed } = usePanelCollapse({
    forceCollapsed,
    forceExpanded,
  });
  const clickFeedbackClass =
    'cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';
  const buttonClass = `w-full bg-[#3a5268] border border-[#4f6a82] text-[#e7edf2] rounded-md text-[10px] font-medium py-1 leading-none ${clickFeedbackClass}`;
  const { sections, menuOptions, menuOrder, hiddenSectionTitles } = useActionsConfig();
  const {
    activeActionTab,
    setActiveActionTab,
    visibleSections,
    activeSection,
    activeMenuOptions,
  } = useActionsTabs({
    sections,
    menuOptions,
    hiddenSectionTitles,
  });
  const { controls: offsetControls, increment, decrement, reset } = useOffsetControls({
    onIncrement: (key) => publishActivity(`Offset ${key} increased`),
    onDecrement: (key) => publishActivity(`Offset ${key} decreased`),
    onReset: () => publishActivity('Offsets reset to 0'),
  });
  const handleResetOffsets = () => {
    if (!window.confirm('Are you sure you want to reset?')) {
      publishActivity('Offset reset cancelled');
      return;
    }
    reset();
  };
  const handleRunAction = async (message: string) => {
    await runAction(message);
    publishActivity(message);
  };

  return (
    <div className={`relative ${isUnavailable ? 'grayscale' : ''}`}>
      <div className="flex items-center justify-between gap-2 mb-2 bg-[#213b54] rounded px-2.5 py-1">
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="w-full relative flex items-center justify-end text-[14px] text-[#e7edf2] font-medium py-1 cursor-pointer"
        >
          <span className="absolute inset-x-0 flex items-center justify-center gap-1.5">
            <ListChecks size={13} />
            Actions
          </span>
          {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>

      {isCollapsed ? null : (
        <div className="bg-[#173148] border border-[#2a4864] rounded p-2">
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {[...visibleSections.map((section) => section.title), ...menuOrder, 'Offset'].map((tabName) => (
              <button
                key={tabName}
                onClick={() => setActiveActionTab(tabName)}
                className={`px-1.5 py-0.5 rounded text-[11px] leading-none border ${clickFeedbackClass} ${
                  activeActionTab === tabName
                    ? 'bg-[#3ABEFF] text-[#0f1c28] border-[#3ABEFF]'
                    : 'bg-[#21415b] text-[#e7edf2] border-[#2e4a66]'
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>

          <div className="bg-[#1a364f] border border-[#2a4864] rounded p-2 min-h-[74px]">
            <div className="text-[11px] tracking-wide uppercase text-[#d7e3ed] mb-2">
              {activeActionTab}
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-1.5">
              {activeSection
                ? activeSection.actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => void handleRunAction(action.log)}
                      className={buttonClass}
                    >
                      {action.label}
                    </button>
                  ))
                : activeActionTab === 'Offset'
                  ? (
                    <div className="col-span-2 xl:col-span-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] text-[#c4d0da]">Adjust offsets</div>
                        <button
                          onClick={handleResetOffsets}
                          className={`px-1.5 h-4 bg-[#3a5268] text-[#e7edf2] rounded text-[9px] ${clickFeedbackClass}`}
                        >
                          Reset
                        </button>
                      </div>
                      {offsetControls.map((control) => (
                        <div key={control.label} className="flex items-center gap-2">
                          <span className="text-[11px] text-[#c4d0da] w-8">{control.label}</span>
                          <div className="w-4 h-4 bg-[#d0d0d0] rounded text-center leading-4 text-[#223446] text-[10px]">
                            {isUnavailable ? '' : control.value}
                          </div>
                          <button
                            onClick={() => decrement(control.label)}
                            className={`w-4 h-4 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] leading-4 ${clickFeedbackClass}`}
                          >
                            -
                          </button>
                          <button
                            onClick={() => increment(control.label)}
                            className={`w-4 h-4 bg-[#3a5268] text-[#e7edf2] rounded text-[10px] leading-4 ${clickFeedbackClass}`}
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                  : activeMenuOptions?.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        void handleRunAction(`${activeActionTab}: ${option}`)
                      }
                      className={buttonClass}
                    >
                      {option}
                    </button>
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
