// CortexCard UI component.
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { CortexData } from '../types';
import { publishActivity } from '../../activityLog/api/activityLogApi';

interface CortexCardProps {
  data: CortexData;
  title?: string;
  isActive?: boolean;
  usageLabel?: string;
  onRemove: () => void;
}

export default function CortexCard({
  data,
  title,
  isActive = false,
  usageLabel,
  onRemove,
}: CortexCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isInterfaceModalOpen, setIsInterfaceModalOpen] = useState(false);

  const cardLabel = title ?? data.name;

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 300);
  };

  const handleSweepClick = () => {
    publishActivity(`${cardLabel}: SWEEP pressed`);
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={isRemoving ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1c2f42] border border-[#2e4a66] rounded-2xl p-3 lg:p-4 relative"
    >
      <button
        onClick={handleRemove}
        aria-label="Remove cortex card"
        className="absolute top-2 right-2 w-6 h-6 rounded-full border border-[#4f6a82] bg-[#3a5268] hover:bg-[#4a637a] hover:border-[#64829d] cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70 flex items-center justify-center"
      >
        <X className="w-3.5 h-3.5 text-[#e7edf2]" />
      </button>
      {usageLabel && (
        <div
          className={`absolute top-2 right-10 inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold border ${
            isActive
              ? 'text-[#7cd7ff] bg-[#15354a] border-[#3ABEFF]/45'
              : 'text-[#b7c3ce] bg-[#26323d] border-[#4f5d6a]'
          }`}
        >
          {usageLabel}
        </div>
      )}

      <div className="mb-2">
        <button
          onClick={() => setIsInterfaceModalOpen(true)}
          className={`text-[16px] leading-none underline underline-offset-4 cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70 ${
            isActive ? 'text-[#3ABEFF]' : 'text-[#f2f2f2]'
          }`}
        >
          {cardLabel}
        </button>
      </div>

      <div className="grid grid-cols-[1fr_112px] gap-2">
        <div>
          <div className="grid grid-cols-2 gap-2 mb-2 text-[10px] leading-none text-[#f2f2f2]">
            <div>{data.sifQulefx.replace('QULEFX', 'DLI:ETX')}</div>
            <div>{data.sifQuleftx.replace('QULEFTX', 'DLZ:ETX')}</div>
          </div>

          <div className="grid grid-cols-[70px_30px_34px_34px_34px] gap-2 mb-2 text-[10px] text-[#e8ecef]">
            <div />
            <div />
            <div>EbNo</div>
            <div>Fs</div>
            <div>EbNo</div>
          </div>

          <div className="space-y-2">
            {[
              { left: '-128.00', mid: '0.00' },
              { left: '-65.00', mid: '-128' },
              { left: '-128.00', mid: '' },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-[70px_30px_34px_34px_34px] gap-2 items-center">
                <div className="bg-[#b8963e] text-[#283647] rounded-lg h-8 flex items-center justify-center text-[11px]">
                  {row.left}
                </div>
                <div className="text-[10px] text-[#f2f2f2]">PLL</div>
                <div className="bg-[#b8963e] rounded-lg h-8" />
                <div className="bg-[#d9d9d9] rounded-lg h-8 flex items-center justify-center text-[11px] text-[#3a4450]">
                  {row.mid}
                </div>
                <div className="bg-[#b8963e] rounded-lg h-8" />
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-4 text-[10px] text-[#f2f2f2]">
            <div>RNG</div>
            <div>20 1</div>
            <button
              onClick={handleSweepClick}
              className="justify-self-start cursor-pointer rounded px-1.5 py-0.5 border border-[#4f6a82] bg-[#2d4359] text-[#e7edf2] transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70"
            >
              SWEEP
            </button>
            <div>REC</div>
          </div>
        </div>

        <div className="pt-4">
          <div className="text-[14px] text-[#f2f2f2] mb-2">INFO</div>
          <div className="text-[10px] leading-[1.3] text-[#f2f2f2]">
            <div>MON: 4</div>
            <div>TC: 0</div>
            <div>TMA: 0</div>
            <div>TMB: 0</div>
            <div>RNG: 0</div>
            <div>MEAS: 0</div>
            <div>DOP: 0</div>
          </div>
          <div className="mt-2 text-[10px] text-[#f2f2f2]">CARRIER</div>
        </div>
      </div>

      {isInterfaceModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#06111b]/70 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1c2f42] border border-[#2e4a66] rounded-lg p-4">
            <p className="text-[14px] text-[#e7edf2] mb-4">
              det här skulle representera det andra cortex interfacet
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsInterfaceModalOpen(false)}
                className="px-3 py-1 rounded bg-[#3ABEFF] text-[#0f1c28] text-[11px] font-medium cursor-pointer transition-all duration-150 hover:brightness-110"
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
