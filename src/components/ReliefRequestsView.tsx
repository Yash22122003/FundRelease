import React, { useState } from 'react';
import { ReliefRequest, RequestStatus } from '../types';

interface ReliefRequestsViewProps {
  requests: ReliefRequest[];
  selectedRequestId: string;
  onSelectRequestId: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: RequestStatus) => void;
  onOpenNewRequestModal: () => void;
  onOpenMapModal: (locationName: string) => void;
  onExport: () => void;
  onEditRequest: (req: ReliefRequest) => void;
}

export const ReliefRequestsView: React.FC<ReliefRequestsViewProps> = ({
  requests,
  selectedRequestId,
  onSelectRequestId,
  onUpdateStatus,
  onOpenNewRequestModal,
  onOpenMapModal,
  onExport,
  onEditRequest,
}) => {
  const currentRequest =
    requests.find((r) => r.id === selectedRequestId) || requests[0];

  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredRequests = requests.filter((r) => {
    if (filterPriority === 'all') return true;
    return r.priority.toLowerCase() === filterPriority.toLowerCase();
  });

  const advanceStatus = () => {
    if (!currentRequest) return;
    const stages: RequestStatus[] = [
      'Created',
      'Received',
      'Verified',
      'Allocated',
      'Dispatched',
      'Delivered',
    ];
    const currentIndex = stages.indexOf(currentRequest.status);
    if (currentIndex < stages.length - 1) {
      const nextStatus = stages[currentIndex + 1];
      onUpdateStatus(currentRequest.id, nextStatus);
    }
  };

  if (!currentRequest) {
    return (
      <div className="p-8 text-center">
        <p>No requests available.</p>
        <button
          onClick={onOpenNewRequestModal}
          className="mt-4 bg-[#1a365d] text-white px-4 py-2 rounded-lg"
        >
          Create Request
        </button>
      </div>
    );
  }

  const isCritical = currentRequest.priority === 'Critical';

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f8f9ff] pb-28 md:pb-12 max-w-7xl mx-auto w-full">
      {/* Request Switcher Bar */}
      <div className="flex items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-[#c4c6cf]/60 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#43474e] uppercase px-2">
            Select Request:
          </span>
          <div className="flex items-center gap-2">
            {filteredRequests.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRequestId(r.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  r.id === currentRequest.id
                    ? 'bg-[#1a365d] text-white shadow-sm'
                    : 'bg-[#eff4ff] text-[#002045] hover:bg-[#d4e4fc]'
                }`}
              >
                <span>{r.id}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    r.priority === 'Critical'
                      ? 'bg-red-500'
                      : r.priority === 'High'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenNewRequestModal}
          className="bg-[#002045] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl hover:bg-[#1a365d] transition-colors flex items-center gap-1 shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New Request</span>
        </button>
      </div>

      {/* Page Header: Breadcrumb & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[#43474e] mb-1 text-xs">
            <span
              onClick={() => onSelectRequestId(requests[0].id)}
              className="font-semibold cursor-pointer hover:text-[#002045] transition-colors"
            >
              Relief Requests
            </span>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="font-mono font-bold text-[#002045]">
              {currentRequest.id}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002045] tracking-tight">
            Request Details
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#1a365d] text-[#1a365d] rounded-lg text-xs font-bold hover:bg-[#eff4ff] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export</span>
          </button>
          <button
            onClick={() => onEditRequest(currentRequest)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1a365d] text-white rounded-lg text-xs font-bold hover:bg-[#002045] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Request</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Section 1: Basic Info (Spans 4 cols on desktop) */}
        <section className="md:col-span-4 bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          {/* Red Accent for Critical Priority */}
          <div
            className={`absolute top-0 left-0 w-full h-1.5 ${
              isCritical ? 'bg-[#b51822]' : 'bg-[#1a365d]'
            }`}
          />

          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-base font-bold text-[#002045] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px]">info</span>
                Basic Information
              </h3>
              <span
                className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1 ${
                  isCritical
                    ? 'bg-[#ffdad6] text-[#93000a]'
                    : 'bg-[#d4e4fc] text-[#002045]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  warning
                </span>
                {currentRequest.priority}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#43474e] block mb-1">
                  Location
                </label>
                <div className="text-base font-semibold text-[#0d1c2e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#74777f]">
                    location_on
                  </span>
                  {currentRequest.location}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#43474e] block mb-1">
                  Affected Population
                </label>
                <div className="text-2xl font-black text-[#002045]">
                  {currentRequest.affectedPopulation}{' '}
                  <span className="text-sm font-normal text-[#43474e]">
                    People
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#43474e] block mb-1">
                  Request ID
                </label>
                <div className="font-mono text-sm text-[#0d1c2e] bg-[#e5eeff] px-3 py-1 rounded-md inline-block font-semibold">
                  {currentRequest.id}
                </div>
              </div>

              {currentRequest.urgencyReason && (
                <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#c4c6cf]/60 text-xs text-[#43474e]">
                  <span className="font-bold text-[#002045] block mb-0.5">
                    Field Notes:
                  </span>
                  {currentRequest.urgencyReason}
                </div>
              )}
            </div>
          </div>

          {/* Action Button inside card */}
          <button
            onClick={() => onOpenMapModal(currentRequest.location)}
            className="w-full mt-6 px-4 py-2.5 bg-[#d4e4fc] text-[#002045] font-bold rounded-xl text-xs border border-[#c4c6cf] hover:bg-[#c4c6cf]/40 transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>View Map Location</span>
          </button>
        </section>

        {/* Section 2: Requested Resources (Spans 8 cols on desktop) */}
        <section className="md:col-span-8 bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#002045] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px]">
                  inventory_2
                </span>
                Requested Resources
              </h3>
              <span className="text-xs font-mono text-[#43474e] font-semibold">
                4 Categories
              </span>
            </div>

            {/* Dense Data Grid for Resources */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              {/* Water */}
              <div className="bg-[#e5eeff] p-4 rounded-xl border border-[#c4c6cf]/60 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#adc7f7] flex items-center justify-center mb-2 shadow-inner">
                  <span className="material-symbols-outlined text-[#001b3c] text-[22px]">
                    water_drop
                  </span>
                </div>
                <div className="text-2xl font-black text-[#002045]">
                  {currentRequest.resources.water}
                </div>
                <div className="text-xs text-[#43474e] font-medium">
                  Water (Liters)
                </div>
              </div>

              {/* Food */}
              <div className="bg-[#e5eeff] p-4 rounded-xl border border-[#c4c6cf]/60 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#d4e4fc] flex items-center justify-center mb-2 shadow-inner">
                  <span className="material-symbols-outlined text-[#1a365d] text-[22px]">
                    restaurant
                  </span>
                </div>
                <div className="text-2xl font-black text-[#002045]">
                  {currentRequest.resources.food}
                </div>
                <div className="text-xs text-[#43474e] font-medium">
                  Food (Rations)
                </div>
              </div>

              {/* Medical */}
              <div className="bg-[#e5eeff] p-4 rounded-xl border border-[#c4c6cf]/60 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#ffdad7] flex items-center justify-center mb-2 shadow-inner">
                  <span className="material-symbols-outlined text-[#930013] text-[22px]">
                    medical_services
                  </span>
                </div>
                <div className="text-2xl font-black text-[#002045]">
                  {currentRequest.resources.medical}
                </div>
                <div className="text-xs text-[#43474e] font-medium">
                  Medical Kits
                </div>
              </div>

              {/* Blankets */}
              <div className="bg-[#e5eeff] p-4 rounded-xl border border-[#c4c6cf]/60 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#9ff5c1] flex items-center justify-center mb-2 shadow-inner">
                  <span className="material-symbols-outlined text-[#005231] text-[22px]">
                    bed
                  </span>
                </div>
                <div className="text-2xl font-black text-[#002045]">
                  {currentRequest.resources.blankets}
                </div>
                <div className="text-xs text-[#43474e] font-medium">
                  Blankets
                </div>
              </div>
            </div>
          </div>

          {/* Progress indicator for allocation */}
          <div className="mt-6 pt-4 border-t border-[#c4c6cf]/60">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-[#43474e]">
                Overall Resource Fulfillment
              </span>
              <span className="font-mono text-xs font-bold text-[#002045]">
                {currentRequest.fulfillmentPercentage}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#d4e4fc] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1a365d] rounded-full transition-all duration-500"
                style={{ width: `${currentRequest.fulfillmentPercentage}%` }}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Request Lifecycle Timeline (Spans 12 cols) */}
        <section className="md:col-span-12 bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 shadow-sm overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-[#002045] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px]">
                timeline
              </span>
              Lifecycle Timeline
            </h3>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#43474e]">
                Current Status:{' '}
                <strong className="text-[#002045]">{currentRequest.status}</strong>
              </span>
              <button
                onClick={advanceStatus}
                className="bg-[#1a365d] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#002045] transition-colors"
              >
                Advance Stage ➔
              </button>
            </div>
          </div>

          {/* Horizontal Timeline */}
          <div className="min-w-[720px] py-4">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line Background */}
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#c4c6cf] -z-0 -translate-y-1/2" />

              {/* Step Nodes */}
              {currentRequest.timeline.map((step, idx) => {
                const isCurrent = step.active;
                const isDone = step.completed && !step.active;

                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center w-28 relative z-10"
                  >
                    {isCurrent && (
                      <div className="absolute top-0 w-9 h-9 rounded-full bg-[#1a365d] opacity-25 animate-ping" />
                    )}

                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 font-mono text-xs font-bold transition-all ${
                        isDone
                          ? 'bg-[#1a365d] border-[#1a365d] text-white shadow-sm'
                          : isCurrent
                          ? 'bg-white border-[#1a365d] text-[#1a365d] shadow-md'
                          : 'bg-[#f8f9ff] border-[#c4c6cf] text-[#74777f]'
                      }`}
                    >
                      {isDone ? (
                        <span className="material-symbols-outlined text-[16px]">
                          check
                        </span>
                      ) : isCurrent ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1a365d]" />
                      ) : (
                        <span className="text-[11px]">{idx + 1}</span>
                      )}
                    </div>

                    <div
                      className={`text-xs font-bold text-center ${
                        isCurrent
                          ? 'text-[#1a365d]'
                          : isDone
                          ? 'text-[#002045]'
                          : 'text-[#74777f]'
                      }`}
                    >
                      {step.step}
                    </div>
                    <div className="font-mono text-[10px] text-[#74777f] mt-0.5">
                      {step.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: DTN Metadata (Spans 12 cols, distinct technical look) */}
        <section className="md:col-span-12 bg-[#223144] text-[#eaf1ff] rounded-2xl p-6 shadow-md border border-[#43474e]/40">
          <div className="flex justify-between items-center mb-4 border-b border-[#74777f]/30 pb-3">
            <h3 className="font-mono text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#adc7f7]">
                hub
              </span>
              DTN Network Metadata
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#9ff5c1]">
              <span className="w-2 h-2 rounded-full bg-[#38A169] animate-pulse" />
              Connection Secured (P2P Mesh)
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="flex flex-col bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-[#adc7f7]/70 text-[11px] mb-1">Source Node</span>
              <span className="font-bold text-white">
                {currentRequest.dtnMetadata.sourceNode}
              </span>
            </div>
            <div className="flex flex-col bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-[#adc7f7]/70 text-[11px] mb-1">
                Transport Protocol
              </span>
              <span className="font-bold text-white">
                {currentRequest.dtnMetadata.transportProtocol}
              </span>
            </div>
            <div className="flex flex-col bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-[#adc7f7]/70 text-[11px] mb-1">Message ID</span>
              <span className="font-bold text-white">
                {currentRequest.dtnMetadata.messageId}
              </span>
            </div>
            <div className="flex flex-col bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-[#adc7f7]/70 text-[11px] mb-1">Hop Count</span>
              <span className="font-bold text-white">
                {currentRequest.dtnMetadata.hopCount} Hops (Verified)
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
