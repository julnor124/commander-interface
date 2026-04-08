import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AntennaSelector from '../../app/components/AntennaSelector';
import CortexCard from '../../app/components/CortexCard';
import HDRCard from '../../app/components/HDRCard';
import PassInfoCard from '../../app/components/PassInfoCard';
import AntennaStatusPanel from '../../app/components/AntennaStatusPanel';
import SignalPanel from '../../app/components/SignalPanel';
import ControlPanel from '../../app/components/ControlPanel';
import ActionsPanel from '../../app/components/ActionsPanel';
import TrackingPanel from '../../app/components/TrackingPanel';
import ActivityLogPanel from '../activityLog/ActivityLogPanel';
import { Antenna, CortexData, HdrUnit } from './types';

const getTrailingNumber = (id: string) => id.split('-').pop() ?? id;

export interface CommanderPageModel {
  antennas: Antenna[];
  selectedAntenna: string;
  selectedAntennaName: string;
  setSelectedAntenna: (id: string) => void;

  activeCommanderView: 'commander1' | 'commander2';
  setActiveCommanderView: (updater: (prev: 'commander1' | 'commander2') => 'commander1' | 'commander2') => void;

  isActivePass: boolean;
  isUnavailable: boolean;
  activePassAntennaIds: string[];

  clickFeedbackClass: string;

  // Left panel state
  isCortexDropdownOpen: boolean;
  setIsCortexDropdownOpen: (updater: (prev: boolean) => boolean) => void;
  isHdrDropdownOpen: boolean;
  setIsHdrDropdownOpen: (updater: (prev: boolean) => boolean) => void;
  isLeftPanelCollapsedC2: boolean;
  setIsLeftPanelCollapsedC2: (updater: (prev: boolean) => boolean) => void;

  // Cortex/HDR data
  cortexCards: CortexData[];
  hdrUnits: HdrUnit[];
  openCortexIds: string[];
  setOpenCortexIds: (updater: (prev: string[]) => string[]) => void;
  openHdrIds: string[];
  effectiveActiveCortexIds: string[];

  toggleCortexCard: (id: string) => void;
  toggleHdrCard: (id: string) => void;

  // Pass & view flags
  c2LayoutKey: string;
  isPendingPassStart: boolean;
  msUntilPassStart: number;
  passStartsAtLabel: string;
  passEndsAtLabel: string;
  timeLeftLabel: string;
  countdownLabel: string;
  missionNote: string;
  missionName: string;
  passProgress: number;

  isC2PreparingView: boolean;
  isC2UnavailableView: boolean;
  isC2FocusedPassView: boolean;
  isC2DefaultCountdownView: boolean;
  isC2PreparingFinalWindow: boolean;
}

export default function CommanderPage({ model }: { model: CommanderPageModel }) {
  const {
    antennas,
    selectedAntenna,
    selectedAntennaName,
    setSelectedAntenna,
    activeCommanderView,
    setActiveCommanderView,
    isActivePass,
    isUnavailable,
    activePassAntennaIds,
    clickFeedbackClass,
    isCortexDropdownOpen,
    setIsCortexDropdownOpen,
    isHdrDropdownOpen,
    setIsHdrDropdownOpen,
    isLeftPanelCollapsedC2,
    setIsLeftPanelCollapsedC2,
    cortexCards,
    hdrUnits,
    openCortexIds,
    setOpenCortexIds,
    openHdrIds,
    effectiveActiveCortexIds,
    toggleCortexCard,
    toggleHdrCard,
    c2LayoutKey,
    isPendingPassStart,
    msUntilPassStart,
    passStartsAtLabel,
    passEndsAtLabel,
    timeLeftLabel,
    countdownLabel,
    missionNote,
    missionName,
    passProgress,
    isC2PreparingView,
    isC2UnavailableView,
    isC2FocusedPassView,
    isC2DefaultCountdownView,
    isC2PreparingFinalWindow,
  } = model;
  const hdrUnitsById = new Map(hdrUnits.map((unit) => [unit.id, unit]));

  return (
    <div className="min-h-screen bg-[#0f1c28] text-white">
      {/* Top Navigation */}
      <div className="bg-[#1c2f42] border-b border-[#2e4a66] px-3">
        <div className="flex items-center justify-between h-11 gap-3">
          <div className="flex items-center gap-2">
            <div
              className="text-sm font-medium whitespace-nowrap transition-colors duration-300"
              style={{ color: isActivePass ? '#3ABEFF' : isUnavailable ? '#6B7C8F' : '#B8963E' }}
            >
              Antenna {selectedAntennaName}
            </div>
            <button
              onClick={() =>
                setActiveCommanderView((prev) => (prev === 'commander1' ? 'commander2' : 'commander1'))
              }
              className="text-[9px] text-[#7f94a6] hover:text-[#3ABEFF] cursor-pointer transition-colors"
              title={activeCommanderView === 'commander1' ? 'Switch to Commander 2' : 'Switch to Commander 1'}
            >
              {activeCommanderView === 'commander1' ? 'c2' : 'c1'}
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <AntennaSelector antennas={antennas} selectedId={selectedAntenna} onSelect={setSelectedAntenna} activeAntennaIds={activePassAntennaIds} />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div
        className={`grid ${
          isC2UnavailableView
            ? 'grid-cols-1'
            : 'grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)_320px]'
        } gap-4 p-4 transition-all duration-700 ${isUnavailable ? 'opacity-60 saturate-0' : ''}`}
      >
        {/* Left Sidebar */}
        {!isC2UnavailableView && (
          <div className="space-y-6">
            <div>
              {activeCommanderView === 'commander2' ? (
                <button
                  onClick={() => setIsLeftPanelCollapsedC2((prev) => !prev)}
                  className="w-full relative flex items-center justify-end text-[16px] font-medium mb-2 bg-[#213b54] rounded px-3 py-2 cursor-pointer"
                >
                  <span className="absolute inset-x-0 text-center">Cortex and Hdr/Rtt</span>
                  {isLeftPanelCollapsedC2 ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              ) : (
                <h2 className="text-[18px] font-medium mb-3 text-center bg-[#213b54] rounded px-3 py-1">
                  Cortex and Hdr/Rtt
                </h2>
              )}

              {activeCommanderView === 'commander2' && isLeftPanelCollapsedC2 ? null : (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      className={`w-full flex items-center justify-between text-[16px] font-medium bg-[#1c2f42] px-2.5 py-2 rounded-md border border-[#2e4a66] ${clickFeedbackClass}`}
                      onClick={() => setIsCortexDropdownOpen((prev) => !prev)}
                    >
                      <span>Cortex</span>
                      {isCortexDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <button
                      className={`w-full flex items-center justify-between text-[16px] font-medium bg-[#1c2f42] px-2.5 py-2 rounded-md border border-[#2e4a66] ${clickFeedbackClass}`}
                      onClick={() => setIsHdrDropdownOpen((prev) => !prev)}
                    >
                      <span>Hdr/Rtt</span>
                      {isHdrDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      {isCortexDropdownOpen && (
                        <div className="bg-[#132434] border border-[#2e4a66] rounded-md p-2 space-y-1">
                          {cortexCards.map((card) => {
                            const isActive = effectiveActiveCortexIds.includes(card.id);
                            return (
                              <button
                                key={card.id}
                                className={`w-full text-left text-xs text-[#d4dde6] flex items-center px-2 py-1 rounded hover:bg-[#1c2f42] ${clickFeedbackClass}`}
                                onClick={() => toggleCortexCard(card.id)}
                              >
                                <span className="flex items-center gap-2">
                                  <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#3ABEFF]' : 'bg-[#6B7C8F]'}`} />
                                  {`Cortex ${getTrailingNumber(card.id)}`}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div>
                      {isHdrDropdownOpen && (
                        <div className="bg-[#132434] border border-[#2e4a66] rounded-md p-2 space-y-1">
                          {hdrUnits.map((unit) => (
                            <button
                              key={unit.id}
                              className={`w-full text-left text-xs text-[#d4dde6] flex items-center px-2 py-1 rounded hover:bg-[#1c2f42] ${clickFeedbackClass}`}
                              onClick={() => toggleHdrCard(unit.id)}
                            >
                              <span className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#6B7C8F]" />
                                {unit.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {cortexCards
                      .filter((card) => openCortexIds.includes(card.id))
                      .map((card) => (
                        <React.Fragment key={card.id}>
                          <CortexCard
                            data={card}
                            title={`Cortex ${getTrailingNumber(card.id)}`}
                            isActive={effectiveActiveCortexIds.includes(card.id)}
                            usageLabel={
                              effectiveActiveCortexIds.includes(card.id)
                                ? isActivePass
                                  ? 'Used this pass'
                                  : 'Will be used'
                                : 'Not used here'
                            }
                            onRemove={() => setOpenCortexIds((prev) => prev.filter((id) => id !== card.id))}
                          />
                        </React.Fragment>
                      ))}
                  </div>

                  <div className={`space-y-3 ${openCortexIds.length > 0 ? 'mt-6' : 'mt-0'}`}>
                    {openHdrIds.map((id) => (
                      <React.Fragment key={id}>
                        {(() => {
                          const hdrUnit = hdrUnitsById.get(id);
                          if (!hdrUnit) return null;
                          return (
                            <HDRCard
                              title={`Hdr/Rtt ${getTrailingNumber(id)}`}
                              isActive={hdrUnit.active}
                              usageLabel={hdrUnit.active ? 'Used this pass' : 'Not used here'}
                            />
                          );
                        })()}
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Center Panel */}
        <div
          className={`space-y-3 w-full ${
            isC2UnavailableView ? 'flex flex-col items-center justify-center min-h-[68vh]' : ''
          }`}
        >
          <div className={isC2UnavailableView ? 'w-full max-w-[520px]' : ''}>
            <PassInfoCard
              isActivePass={isActivePass}
              isUnavailable={isUnavailable}
              isPendingPassStart={isPendingPassStart}
              passStartsInSeconds={Math.ceil(msUntilPassStart / 1000)}
              passStartsAtLabel={passStartsAtLabel}
              passEndsAtLabel={passEndsAtLabel}
              timeLeftLabel={timeLeftLabel}
              countdownLabel={countdownLabel}
              missionNote={missionNote}
              commanderView={activeCommanderView}
              forceExpanded={isC2PreparingView || isC2UnavailableView || isC2FocusedPassView || isC2DefaultCountdownView}
              forceCollapsed={false}
            />
          </div>

          {!isC2UnavailableView && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AntennaStatusPanel
                isUnavailable={isUnavailable}
                missionName={missionName}
                commanderView={activeCommanderView}
                forceExpanded={isC2PreparingView || isC2FocusedPassView || isC2DefaultCountdownView}
                forceCollapsed={false}
              />
              <SignalPanel
                isUnavailable={isUnavailable}
                isActivePass={isActivePass}
                commanderView={activeCommanderView}
                forceCollapsed={isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
                forceExpanded={isC2FocusedPassView}
              />
            </div>
          )}

          {!isC2UnavailableView && (
            <>
              <ControlPanel
                isUnavailable={isUnavailable}
                commanderView={activeCommanderView}
                forceCollapsed={isC2FocusedPassView || isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
                forceExpanded={false}
              />
              <ActionsPanel
                isUnavailable={isUnavailable}
                commanderView={activeCommanderView}
                forceCollapsed={isC2FocusedPassView || isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
                forceExpanded={false}
              />
            </>
          )}
        </div>

        {/* Right Panel */}
        {!isC2UnavailableView && (
          <div className="space-y-4">
            <TrackingPanel
              isActivePass={isActivePass}
              isUnavailable={isUnavailable}
              passProgress={passProgress}
              commanderView={activeCommanderView}
              forceCollapsed={isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
              forceExpanded={isC2FocusedPassView}
            />
            <ActivityLogPanel
              selectedAntennaId={selectedAntenna}
              selectedAntennaName={selectedAntennaName}
              commanderView={activeCommanderView}
              forceCollapsed={isC2FocusedPassView || isC2DefaultCountdownView || (isC2PreparingView && !isC2PreparingFinalWindow)}
              forceExpanded={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

