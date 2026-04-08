import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { logActivity } from '../../features/activityLog/activityLogBus';

interface ActionsPanelProps {
  isUnavailable?: boolean;
  commanderView?: 'commander1' | 'commander2';
  forceCollapsed?: boolean;
  forceExpanded?: boolean;
}

export default function ActionsPanel({
  isUnavailable = false,
  commanderView = 'commander1',
  forceCollapsed = false,
  forceExpanded = false,
}: ActionsPanelProps) {
  const [openMenu, setOpenMenu] = useState<null | 'Session' | 'Utility' | 'Macro' | 'Mode' | 'Color'>(null);
  const [timeValue, setTimeValue] = useState(0);
  const [elValue, setElValue] = useState(0);
  const [stepValue, setStepValue] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    if (commanderView === 'commander2') {
      setIsCollapsed(true);
    }
  }, [commanderView]);
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
  const clickFeedbackClass =
    'cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70';
  const buttonClass = `w-full bg-[#d8dde3] border border-[#9aa9b8] text-[#1f2d3a] rounded-md text-[10px] font-medium py-1 leading-none ${clickFeedbackClass}`;
  const menuOptions: Record<'Session' | 'Utility' | 'Macro' | 'Mode' | 'Color', string[]> = {
    Session: ['Select Pass', 'Graph', 'Quit'],
    Utility: ['Satangle', 'Time Shift'],
    Macro: ['Macro execution', 'Supermacro'],
    Mode: ['Automatic Mode', 'Manual Mode'],
    Color: ['Standard color mode', 'Color Mode 2'],
  };
  const menuOrder: Array<'Session' | 'Utility' | 'Macro' | 'Mode' | 'Color'> = ['Session', 'Utility', 'Macro', 'Mode', 'Color'];
  const sections = [
    {
      title: 'Mission',
      actions: [{ label: 'Prepare mission', log: 'Action: Prepare mission' }],
    },
    {
      title: 'File Transfer',
      actions: [
        { label: 'Send Matrix', log: 'Action: Send Matrix' },
        { label: 'Send Satangle', log: 'Action: Send Satangle' },
      ],
    },
    {
      title: 'Pass',
      actions: [
        { label: 'Prepare pass', log: 'Action: Prepare pass' },
        { label: 'Acquire', log: 'Action: Acquire' },
        { label: 'End Pass', log: 'Action: End Pass' },
      ],
    },
    {
      title: 'Position',
      actions: [
        { label: 'Position to', log: 'Action: Position to' },
        { label: 'Sun', log: 'Action: Sun' },
        { label: 'Stow', log: 'Action: Stow' },
      ],
    },
    {
      title: 'Slaving',
      actions: [{ label: 'Slave to', log: 'Action: Slave to' }],
    },
    {
      title: 'Tracking',
      actions: [
        { label: 'Enable Autotrack', log: 'Action: Enable Autotrack' },
        { label: 'Force Autotrack', log: 'Action: Force Autotrack' },
      ],
    },
  ];
  const [activeActionTab, setActiveActionTab] = useState<string>(sections[0].title);
  const activeSection = sections.find((section) => section.title === activeActionTab);
  const activeMenuOptions = menuOptions[activeActionTab as keyof typeof menuOptions];
  const handleOffsetIncrement = (setter: Dispatch<SetStateAction<number>>, label: string) => {
    setter((prev) => prev + 1);
    logActivity(`Offset ${label} increased`);
  };
  const handleOffsetDecrement = (setter: Dispatch<SetStateAction<number>>, label: string) => {
    setter((prev) => Math.max(0, prev - 1));
    logActivity(`Offset ${label} decreased`);
  };
  const handleResetOffsets = () => {
    if (!window.confirm('Are you sure you want to reset?')) {
      logActivity('Offset reset cancelled');
      return;
    }
    setTimeValue(0);
    setElValue(0);
    setStepValue(0);
    logActivity('Offsets reset to 0');
  };

  return (
    <div className={`relative ${isUnavailable ? 'grayscale' : ''}`}>
      <div className="flex items-center justify-between gap-2 mb-2 bg-[#213b54] rounded px-2.5 py-1">
        {commanderView === 'commander2' ? (
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="w-full relative flex items-center justify-end text-[11px] text-[#e7edf2] font-medium cursor-pointer"
          >
            <span className="absolute inset-x-0 text-center">Actions</span>
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          </button>
        ) : (
          <div className="text-[11px] text-[#e7edf2] font-medium">Actions</div>
        )}
        {commanderView === 'commander1' && (
          <div className="flex items-center gap-1 text-[11px] text-[#c8d4de]">
            {menuOrder.map((menuName) => (
              <button
                key={menuName}
                onClick={() => setOpenMenu((prev) => (prev === menuName ? null : menuName))}
                className={`bg-[#173148] px-1 py-0.5 rounded text-[#e7edf2] text-[11px] leading-none ${clickFeedbackClass}`}
              >
                {menuName}
              </button>
            ))}
          </div>
        )}
      </div>

      {commanderView === 'commander1' && openMenu && (
        <div className="absolute top-[30px] right-2.5 z-20 min-w-[160px] bg-[#1f3a53] border border-[#2e4a66] rounded-md p-1.5 shadow-xl">
          <div className="text-[10px] text-[#f2f2f2] mb-1.5">{openMenu}</div>
          <div className="space-y-1">
            {menuOptions[openMenu].map((option) => (
              <button
                key={option}
                onClick={() => {
                  logActivity(`${openMenu}: ${option}`);
                  setOpenMenu(null);
                }}
                className="w-full text-left bg-[#2f4f6c] text-[#f2f2f2] rounded px-1.5 py-0.5 text-[10px] leading-tight cursor-pointer transition-all duration-150 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {commanderView === 'commander2' && isCollapsed ? null : commanderView === 'commander2' ? (
        <div className="bg-[#173148] border border-[#2a4864] rounded p-2">
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {[...sections.map((section) => section.title), ...menuOrder, 'Offset'].map((tabName) => (
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
                      onClick={() => logActivity(action.log)}
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
                            onClick={() => handleOffsetDecrement(control.setter, control.label)}
                            className={`w-4 h-4 bg-[#d0d0d0] text-[#223446] rounded text-[10px] leading-4 ${clickFeedbackClass}`}
                          >
                            -
                          </button>
                          <button
                            onClick={() => handleOffsetIncrement(control.setter, control.label)}
                            className={`w-4 h-4 bg-[#d0d0d0] text-[#223446] rounded text-[10px] leading-4 ${clickFeedbackClass}`}
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
                      onClick={() => logActivity(`${activeActionTab}: ${option}`)}
                      className={buttonClass}
                    >
                      {option}
                    </button>
                  ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-6 gap-2">
          {sections.map((section) => (
            <div key={section.title} className="bg-[#173148] border border-[#2a4864] rounded p-2 min-h-[106px] flex flex-col">
              <div className="text-[11px] tracking-wide uppercase text-[#d7e3ed] mb-2">{section.title}</div>
              <div className="space-y-1.5">
                {section.actions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => logActivity(action.log)}
                    className={buttonClass}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
