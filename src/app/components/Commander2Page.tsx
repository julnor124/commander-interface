import AntennaSelector from './AntennaSelector';
import { Antenna } from '../App';

interface Commander2PageProps {
  antennas: Antenna[];
  selectedAntenna: string;
  onSelectAntenna: (id: string) => void;
  isUnavailable: boolean;
  onBack: () => void;
}

export default function Commander2Page({
  antennas,
  selectedAntenna,
  onSelectAntenna,
  isUnavailable,
  onBack,
}: Commander2PageProps) {
  const selectedAntennaData = antennas.find((antenna) => antenna.id === selectedAntenna);

  return (
    <div className="min-h-screen bg-[#0f1c28] text-white">
      <div className="bg-[#1c2f42] border-b border-[#2e4a66] px-3">
        <div className="flex items-center justify-between h-11 gap-3">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium whitespace-nowrap text-[#B8963E]">
              Antenna {selectedAntennaData?.name ?? selectedAntenna}
            </div>
            <span className="text-[9px] text-[#3ABEFF]">c2</span>
          </div>
          <div className="flex-1 min-w-0">
            <AntennaSelector
              antennas={antennas}
              selectedId={selectedAntenna}
              onSelect={onSelectAntenna}
            />
          </div>
          <button
            onClick={onBack}
            className="text-[10px] px-2 py-1 rounded bg-[#173148] border border-[#2a4d68] text-[#e7edf2] cursor-pointer transition-all duration-150 hover:brightness-110"
          >
            c1
          </button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)_320px] gap-4 p-4 transition-all duration-700 ${
          isUnavailable ? 'opacity-60 saturate-0' : ''
        }`}
      >
        <div className="space-y-6">
          <div className="bg-[#132434] border border-[#2e4a66] rounded-md p-3">
            <h2 className="text-[14px] font-medium mb-2 text-[#dce7f0]">Commander 2 Overview</h2>
            <div className="space-y-1 text-[12px] text-[#c7d6e3]">
              <div>Mode: Reduced information</div>
              <div>Only core pass and link status are shown</div>
              <div>Detailed Cortex/HDR controls hidden in c2</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 w-full">
          <div className="bg-[#1c2f42] border border-[#2e4a66] rounded-md p-3">
            <h2 className="text-[14px] font-medium text-[#dce7f0]">Pass Status</h2>
            <div className="mt-2 text-[12px] text-[#c7d6e3]">
              {isUnavailable ? 'Antenna unavailable' : 'Awaiting/handling pass'}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#1c2f42] border border-[#2e4a66] rounded-md p-3">
              <h3 className="text-[13px] font-medium text-[#dce7f0]">Link Quality</h3>
              <div className="mt-2 h-2 rounded bg-[#1d3b53] overflow-hidden">
                <div className="h-full w-[62%] bg-[#3ABEFF]" />
              </div>
            </div>
            <div className="bg-[#1c2f42] border border-[#2e4a66] rounded-md p-3">
              <h3 className="text-[13px] font-medium text-[#dce7f0]">Tracking</h3>
              <div className="mt-2 h-2 rounded bg-[#1d3b53] overflow-hidden">
                <div className="h-full w-[74%] bg-[#3ABEFF]" />
              </div>
            </div>
          </div>

          <div className="bg-[#1c2f42] border border-[#2e4a66] rounded-md p-3">
            <h3 className="text-[13px] font-medium text-[#dce7f0]">Actions</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {['Acquire', 'Autotrack', 'Stow', 'End Pass'].map((action) => (
                <button
                  key={action}
                  className="text-[11px] px-2 py-2 rounded bg-[#173148] border border-[#2a4d68] text-[#e7edf2] cursor-pointer transition-all duration-150 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(58,190,255,0.35)]"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#1c2f42] border border-[#2e4a66] rounded-md p-3">
            <h2 className="text-[13px] font-medium text-[#dce7f0]">Event Feed</h2>
            <div className="mt-2 space-y-1 text-[11px] text-[#c7d6e3]">
              <div>[17:11:04] RF ON</div>
              <div>[17:11:18] Autotrack enabled</div>
              <div>[17:12:07] Tracking stable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
