import React from 'react';
import { DisasterMeta, ReliefRequest, ActivityFeedItem } from '../types';

interface DashboardViewProps {
  meta: DisasterMeta;
  requests: ReliefRequest[];
  activityFeed: ActivityFeedItem[];
  onSelectRequest: (reqId: string) => void;
  onDeployAid: (village: string, reqId: string) => void;
  onOpenMap: () => void;
  onNavigateTab: (tab: 'requests' | 'dtn' | 'resources' | 'allocations') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  meta,
  requests,
  activityFeed,
  onSelectRequest,
  onDeployAid,
  onOpenMap,
  onNavigateTab,
}) => {
  return (
    <main className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 gap-6 pb-28 md:pb-10 overflow-y-auto w-full max-w-7xl mx-auto">
      {/* Dashboard Header & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-xs font-bold font-mono text-[#43474e] uppercase tracking-wider mb-1">
            Current Disaster
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            {meta.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-[#eff4ff] border border-[#c4c6cf] rounded-full px-4 py-2 shadow-sm">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              meta.isOnline ? 'bg-[#38A169] animate-pulse' : 'bg-[#d93537] animate-ping'
            }`}
          />
          <span className="font-mono text-xs text-[#0d1c2e] font-bold tracking-wide">
            {meta.isOnline ? 'ONLINE' : 'OFFLINE (DTN ACTIVE)'}
          </span>
        </div>
      </div>

      {/* Bento Grid: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div
          onClick={() => onNavigateTab('requests')}
          className="bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer hover:border-[#1a365d] transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-base font-bold text-[#0d1c2e]">
              Active Relief Requests
            </h3>
            <span className="material-symbols-outlined text-[#b51822] bg-[#ffdad6] p-2.5 rounded-xl text-[22px]">
              assignment_late
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-5xl font-black text-[#002045] tracking-tight">
              {meta.activeRequestsCount}
            </p>
            <span className="text-xs text-[#b51822] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-sm">priority_high</span>
              4 Critical
            </span>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#b51822]/5 rounded-tl-full transform translate-x-4 translate-y-4 group-hover:scale-125 transition-transform duration-500" />
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => onNavigateTab('resources')}
          className="bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer hover:border-[#1a365d] transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-base font-bold text-[#0d1c2e]">
              Resources Allocated
            </h3>
            <span className="material-symbols-outlined text-[#003f25] bg-[#d4e4fc] p-2.5 rounded-xl text-[22px]">
              inventory_2
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <p className="text-5xl font-black text-[#002045] tracking-tight">
                {meta.resourcesAllocatedPercentage}
                <span className="text-2xl font-bold">%</span>
              </p>
            </div>
            <div className="w-full bg-[#d4e4fc] h-2.5 mt-3 rounded-full overflow-hidden">
              <div
                className="bg-[#1a365d] h-full rounded-full transition-all duration-700"
                style={{ width: `${meta.resourcesAllocatedPercentage}%` }}
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#1a365d]/5 rounded-tl-full transform translate-x-4 translate-y-4 group-hover:scale-125 transition-transform duration-500" />
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onNavigateTab('dtn')}
          className="bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer hover:border-[#1a365d] transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-base font-bold text-[#0d1c2e]">
              Connected DTN Nodes
            </h3>
            <span className="material-symbols-outlined text-[#002045] bg-[#d6e3ff] p-2.5 rounded-xl text-[22px]">
              hub
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-5xl font-black text-[#002045] tracking-tight">
              {meta.connectedDTNNodesCount}
            </p>
            <span className="text-xs text-[#005231] font-semibold bg-[#9ff5c1]/30 px-2 py-0.5 rounded-full">
              Mesh Synced
            </span>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#002045]/5 rounded-tl-full transform translate-x-4 translate-y-4 group-hover:scale-125 transition-transform duration-500" />
        </div>
      </div>

      {/* Two Column Layout for Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Col: Critical Situation Areas (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#c4c6cf]/70 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-[#c4c6cf]/60 flex justify-between items-center bg-[#eff4ff]">
            <h3 className="text-base font-bold text-[#002045] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">
                warning
              </span>
              Critical Situation Areas
            </h3>
            <button
              onClick={onOpenMap}
              className="text-xs font-bold text-[#1a365d] hover:underline flex items-center gap-1"
            >
              <span>View Tactical Map</span>
              <span className="material-symbols-outlined text-sm">map</span>
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {/* Area Item 1: Village A */}
            <div className="p-4 border border-[#c4c6cf]/80 rounded-xl hover:border-[#1a365d] transition-all bg-[#f8f9ff] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-base font-bold text-[#0d1c2e]">
                    Village A
                  </h4>
                  <span className="bg-[#ffdad6] text-[#93000a] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Critical
                  </span>
                  <span className="text-xs text-[#74777f] font-mono">
                    320 People
                  </span>
                </div>
                <div className="text-xs text-[#43474e] flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-[#b51822]">restaurant</span>
                    Food (320)
                  </span>
                  <span className="w-1 h-1 bg-[#74777f] rounded-full" />
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-[#1a365d]">water_drop</span>
                    Water (500L)
                  </span>
                  <span className="w-1 h-1 bg-[#74777f] rounded-full" />
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-[#b51822]">medical_services</span>
                    Medical (80)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onSelectRequest('REQ-1042')}
                  className="border border-[#1a365d] text-[#1a365d] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#eff4ff] transition-colors whitespace-nowrap"
                >
                  View Details
                </button>
                <button
                  onClick={() => onDeployAid('Village A', 'REQ-1042')}
                  className="bg-[#1a365d] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#002045] transition-colors whitespace-nowrap shadow-sm"
                >
                  Deploy Aid
                </button>
              </div>
            </div>

            {/* Area Item 2: Village B */}
            <div className="p-4 border border-[#c4c6cf]/80 rounded-xl hover:border-[#1a365d] transition-all bg-[#f8f9ff] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-base font-bold text-[#0d1c2e]">
                    Village B (Sector 4)
                  </h4>
                  <span className="bg-[#d4e4fc] text-[#002045] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase border border-[#c4c6cf]">
                    High
                  </span>
                  <span className="text-xs text-[#74777f] font-mono">
                    450 People
                  </span>
                </div>
                <div className="text-xs text-[#43474e] flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-[#1a365d]">water_drop</span>
                    Water (900L)
                  </span>
                  <span className="w-1 h-1 bg-[#74777f] rounded-full" />
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-[#43474e]">home</span>
                    Shelter & Tents
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onSelectRequest('REQ-1045')}
                  className="border border-[#1a365d] text-[#1a365d] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#eff4ff] transition-colors whitespace-nowrap"
                >
                  Assess Needs
                </button>
              </div>
            </div>

            {/* Area Item 3: Camp Alpha */}
            <div className="p-4 border border-[#c4c6cf]/80 rounded-xl hover:border-[#1a365d] transition-all bg-[#f8f9ff] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-base font-bold text-[#0d1c2e]">
                    Camp Alpha (Joshimath)
                  </h4>
                  <span className="bg-[#d4e4fc] text-[#002045] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase border border-[#c4c6cf]">
                    Allocated
                  </span>
                  <span className="text-xs text-[#74777f] font-mono">
                    210 People
                  </span>
                </div>
                <div className="text-xs text-[#43474e] flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-[#b51822]">medical_services</span>
                    Purification Kits
                  </span>
                  <span className="w-1 h-1 bg-[#74777f] rounded-full" />
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-[#43474e]">bed</span>
                    Thermal Blankets
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onSelectRequest('REQ-1048')}
                  className="border border-[#1a365d] text-[#1a365d] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#eff4ff] transition-colors whitespace-nowrap"
                >
                  Review Dispatch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Activity Feed (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#c4c6cf]/70 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-[#c4c6cf]/60 flex justify-between items-center bg-[#eff4ff]">
            <h3 className="text-base font-bold text-[#002045] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1a365d] text-[20px]">
                history
              </span>
              Recent Activity Feed
            </h3>
            <span className="text-xs font-mono text-[#74777f]">Live Log</span>
          </div>

          <div className="p-5 flex-1 overflow-y-auto">
            <div className="relative border-l-2 border-[#d4e4fc] ml-3 space-y-6">
              {activityFeed.map((item) => (
                <div key={item.id} className="relative pl-6">
                  <span
                    className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: item.iconColor }}
                  />
                  <p className="text-sm font-semibold text-[#0d1c2e]">
                    {item.title}
                  </p>
                  <p className="font-mono text-xs text-[#74777f] mt-0.5">
                    {item.timestamp} • {item.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
