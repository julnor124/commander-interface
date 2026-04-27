import React from 'react';
import { Antenna } from '../types';

interface AntennaSelectorProps {
  antennas: Antenna[];
  selectedId: string;
  onSelect: (id: string) => void;
  activeAntennaIds?: string[];
}

export default function AntennaSelector({
  antennas,
  selectedId,
  onSelect,
  activeAntennaIds = [],
}: AntennaSelectorProps) {
  return (
    <div className="grid grid-cols-12 gap-1.5 w-full">
      {antennas.map((antenna) => {
        const isSelected = antenna.id === selectedId;
        const isActivePass = activeAntennaIds.includes(antenna.id);
        const dotColor = isActivePass ? '#3ABEFF' : antenna.color === '#6B7C8F' ? '#6B7C8F' : '#B8963E';
        return (
          <button
            key={antenna.id}
            onClick={() => onSelect(antenna.id)}
            className={`
              min-w-0 flex items-center justify-center gap-1.5 px-1.5 py-1 rounded-[14px] border border-white/70
              cursor-pointer transition-all duration-150 active:scale-95 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABEFF]/70
              ${isActivePass ? 'shadow-[0_0_0_1px_rgba(58,190,255,0.5),0_0_0_2px_rgba(58,190,255,0.22),0_0_16px_rgba(58,190,255,0.42)] border-[#9ee1ff]' : ''}
              ${isSelected ? 'bg-[#F4B740]' : 'bg-[#2a4258]'}
            `}
          >
            <div className="w-2.5 h-2.5 rounded-full border border-white/80" style={{ backgroundColor: dotColor }} />
            <span className={`text-[11px] leading-none font-normal whitespace-nowrap truncate ${isSelected ? 'text-[#0f1c28]' : 'text-[#f2f2f2]'}`}>
              {antenna.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
