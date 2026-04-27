// ConfirmDialog UI component.
import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#06111b]/70 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1c2f42] border border-[#2e4a66] rounded-lg p-4">
        <h3 className="text-[15px] text-[#f2f2f2] mb-2">{title}</h3>
        <p className="text-[12px] text-[#c6d2de] mb-4">{description}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded bg-[#2a4258] text-[#f2f2f2] text-[11px] cursor-pointer transition-all duration-150 hover:brightness-110"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-[#3ABEFF] text-[#0f1c28] text-[11px] font-medium cursor-pointer transition-all duration-150 hover:brightness-110"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
