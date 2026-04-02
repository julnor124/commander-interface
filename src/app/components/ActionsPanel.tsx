import { useState } from 'react';
import { logActivity } from '../utils/activityLog';

interface ActionsPanelProps {
  isUnavailable?: boolean;
}

export default function ActionsPanel({ isUnavailable = false }: ActionsPanelProps) {
  const [openMenu, setOpenMenu] = useState<null | 'Session' | 'Utility' | 'Macro' | 'Mode' | 'Color'>(null);
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

  return (
    <div className={`relative ${isUnavailable ? 'grayscale' : ''}`}>
      <div className="flex items-center justify-between gap-2 mb-2 bg-[#213b54] rounded px-2.5 py-1">
        <div className="text-[11px] text-[#e7edf2] font-medium">Actions</div>
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
      </div>

      {openMenu && (
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
    </div>
  );
}
