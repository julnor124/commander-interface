import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AntennaSelector from './AntennaSelector';
import CortexCard from './CortexCard';
import HDRCard from './HDRCard';
import PassInfoCard from '../../passes/components/PassInfoCard';
import AntennaStatusPanel from './AntennaStatusPanel';
import SignalPanel from '../../signal/components/SignalPanel';
import ControlPanel from '../../control/components/ControlPanel';
import ActionsPanel from '../../actions/components/ActionsPanel';
import TrackingPanel from '../../tracking/components/TrackingPanel';
import ActivityLogPanel from '../../activityLog/ActivityLogPanel';
import { Antenna, CortexData, HdrUnit } from '../types';

const getTrailingNumber = (id: string) => id.split('-').pop() ?? id;

export interface CommanderPageModel {
  antennas: Antenna[];
  selectedAntenna: string;
  selectedAntennaName: string;
  setSelectedAntenna: (id: string) => void;

  isActivePass: boolean;
  isUnavailable: boolean;
  activePassAntennaIds: string[];

  clickFeedbackClass: string;

  // Left panel state
  isCortexDropdownOpen: boolean;
  setIsCortexDropdownOpen: (updater: (prev: boolean) => boolean) => void;
  isHdrDropdownOpen: boolean;
  setIsHdrDropdownOpen: (updater: (prev: boolean) => boolean) => void;
  isLeftPanelCollapsed: boolean;
  setIsLeftPanelCollapsed: (updater: (prev: boolean) => boolean) => void;

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
  isPendingPassStart: boolean;
  msUntilPassStart: number;
  passStartsAtLabel: string;
  passEndsAtLabel: string;
  timeLeftLabel: string;
  countdownLabel: string;
  missionNote: string;
  missionName: string;
  passProgress: number;

  isPreparingView: boolean;
  isUnavailableView: boolean;
  isFocusedPassView: boolean;
  isDefaultCountdownView: boolean;
  isPreparingFinalWindowView: boolean;
}

export default function CommanderPage({ model }: { model: CommanderPageModel }) {
  const {
    antennas,
    selectedAntenna,
    selectedAntennaName,
    setSelectedAntenna,
    isActivePass,
    isUnavailable,
    activePassAntennaIds,
    clickFeedbackClass,
    isCortexDropdownOpen,
    setIsCortexDropdownOpen,
    isHdrDropdownOpen,
    setIsHdrDropdownOpen,
    isLeftPanelCollapsed,
    setIsLeftPanelCollapsed,
    cortexCards,
    hdrUnits,
    openCortexIds,
    setOpenCortexIds,
    openHdrIds,
    effectiveActiveCortexIds,
    toggleCortexCard,
    toggleHdrCard,
    isPendingPassStart,
    msUntilPassStart,
    passStartsAtLabel,
    passEndsAtLabel,
    timeLeftLabel,
    countdownLabel,
    missionNote,
    missionName,
    passProgress,
    isPreparingView,
    isUnavailableView,
    isFocusedPassView,
    isDefaultCountdownView,
    isPreparingFinalWindowView,
  } = model;
  const hdrUnitsById = new Map(hdrUnits.map((unit) => [unit.id, unit]));
  const activeHdrIds = hdrUnits.filter((unit) => unit.active).map((unit) => unit.id);
  const visibleCortexIds = Array.from(new Set([...(isActivePass ? effectiveActiveCortexIds : [])]));
  const visibleHdrIds = Array.from(new Set([...(isActivePass ? activeHdrIds : [])]));

  return (
    <div className="min-h-screen bg-[#0f1c28] text-white">
      <div className="bg-[#1c2f42] border-b border-[#2e4a66] px-3">
        <div className="flex items-center justify-between h-11 gap-3">
          <div className="flex items-center gap-2">
            <div
              className="text-sm font-medium whitespace-nowrap transition-colors duration-300"
              style={{ color: isActivePass ? '#3ABEFF' : isUnavailable ? '#6B7C8F' : '#B8963E' }}
            >
              Antenna {selectedAntennaName}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <AntennaSelector antennas={antennas} selectedId={selectedAntenna} onSelect={setSelectedAntenna} activeAntennaIds={activePassAntennaIds} />
          </div>
        </div>
      </div>

      <div
        className={`grid ${
          isUnavailableView
            ? 'grid-cols-1'
            : 'grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)_320px]'
        } gap-4 p-4 transition-all duration-700 ${isUnavailable ? 'opacity-60 saturate-0' : ''}`}
      >
        {!isUnavailableView && (
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setIsLeftPanelCollapsed(() => false)}
                className="w-full relative flex items-center justify-end text-[16px] font-medium mb-2 bg-[#213b54] rounded px-3 py-2"
              >
                <span className="absolute inset-x-0 text-center">Cortex and Hdr/Rtt</span>
                <ChevronUp size={16} />
              </button>

              {isLeftPanelCollapsed ? null : (
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
                      .filter((card) => visibleCortexIds.includes(card.id))
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

                  <div className={`space-y-3 ${visibleCortexIds.length > 0 ? 'mt-6' : 'mt-0'}`}>
                    {visibleHdrIds.map((id) => (
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

        <div
          className={`space-y-3 w-full ${
            isUnavailableView ? 'flex flex-col items-center justify-center min-h-[68vh]' : ''
          }`}
        >
          <div className={isUnavailableView ? 'w-full max-w-[520px]' : ''}>
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
              forceExpanded={isPreparingView || isUnavailableView || isFocusedPassView || isDefaultCountdownView}
              forceCollapsed={false}
            />
          </div>

          {!isUnavailableView && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AntennaStatusPanel
                isUnavailable={isUnavailable}
                missionName={missionName}
                forceExpanded={isPreparingView || isFocusedPassView || isDefaultCountdownView}
                forceCollapsed={false}
              />
              <SignalPanel
                isUnavailable={isUnavailable}
                isActivePass={isActivePass}
                forceCollapsed={isDefaultCountdownView || (isPreparingView && !isPreparingFinalWindowView)}
                forceExpanded={isFocusedPassView}
              />
            </div>
          )}

          {!isUnavailableView && (
            <>
              <ControlPanel
                isUnavailable={isUnavailable}
                forceCollapsed={isFocusedPassView || isDefaultCountdownView || (isPreparingView && !isPreparingFinalWindowView)}
                forceExpanded={false}
              />
              <ActionsPanel
                isUnavailable={isUnavailable}
                forceCollapsed={isFocusedPassView || isDefaultCountdownView || (isPreparingView && !isPreparingFinalWindowView)}
                forceExpanded={false}
              />
            </>
          )}
        </div>

        {!isUnavailableView && (
          <div className="space-y-4">
            <TrackingPanel
              isActivePass={isActivePass}
              isUnavailable={isUnavailable}
              passProgress={passProgress}
              forceCollapsed={isDefaultCountdownView || (isPreparingView && !isPreparingFinalWindowView)}
              forceExpanded={isFocusedPassView}
            />
            <ActivityLogPanel
              selectedAntennaId={selectedAntenna}
              selectedAntennaName={selectedAntennaName}
              forceCollapsed={false}
              forceExpanded={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
