import React, { useState } from 'react';
import { ResourceItem } from '../types';

interface ResourceInventoryViewProps {
  resources: ResourceItem[];
  onOpenLogShipmentModal: () => void;
  onExportData: () => void;
}

export const ResourceInventoryView: React.FC<ResourceInventoryViewProps> = ({
  resources,
  onOpenLogShipmentModal,
  onExportData,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('All Zones');

  const filteredResources = resources.filter((res) => {
    if (selectedZone === 'All Zones') return true;
    return res.zone === selectedZone || res.zone === 'All Zones';
  });

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 grid-bg relative w-full pb-28 md:pb-12 max-w-7xl mx-auto">
      <div className="space-y-6 relative z-10">
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d1c2e] tracking-tight mb-1">
              Resource Inventory
            </h2>
            <p className="text-sm text-[#43474e]">
              Live tracking of vital supplies across distribution nodes.
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={onExportData}
              className="flex items-center gap-1.5 px-4 py-2 border border-[#1a365d] rounded-xl text-[#1a365d] text-xs font-bold bg-white hover:bg-[#eff4ff] transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              <span>Export Data</span>
            </button>
            <button
              onClick={onOpenLogShipmentModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1a365d] text-white rounded-xl text-xs font-bold hover:bg-[#002045] transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Log Shipment</span>
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Overview Stats (4 Cards) */}
          <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Available */}
            <div className="bg-white p-5 rounded-2xl border border-[#c4c6cf]/70 shadow-sm flex flex-col gap-1">
              <span className="text-xs font-bold text-[#43474e] uppercase tracking-wider">
                Total Available
              </span>
              <span className="text-4xl sm:text-5xl font-black text-[#002045]">
                124k
              </span>
              <span className="text-xs font-bold text-[#005231] flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">
                  arrow_upward
                </span>
                +5% vs yesterday
              </span>
            </div>

            {/* Reserved Allocation */}
            <div className="bg-white p-5 rounded-2xl border border-[#c4c6cf]/70 shadow-sm flex flex-col gap-1">
              <span className="text-xs font-bold text-[#43474e] uppercase tracking-wider">
                Reserved Allocation
              </span>
              <span className="text-4xl sm:text-5xl font-black text-[#b51822]">
                38k
              </span>
              <span className="text-xs text-[#43474e] flex items-center gap-1 mt-1">
                Awaiting dispatch
              </span>
            </div>

            {/* In Transit */}
            <div className="bg-white p-5 rounded-2xl border border-[#c4c6cf]/70 shadow-sm flex flex-col gap-1">
              <span className="text-xs font-bold text-[#43474e] uppercase tracking-wider">
                In Transit
              </span>
              <span className="text-4xl sm:text-5xl font-black text-[#455f88]">
                45k
              </span>
              <span className="text-xs font-mono text-[#43474e] flex items-center gap-1 mt-1">
                DTN synced 2m ago
              </span>
            </div>

            {/* Critical Shortages */}
            <div className="bg-white p-5 rounded-2xl border border-[#c4c6cf]/70 shadow-sm flex flex-col gap-1">
              <span className="text-xs font-bold text-[#43474e] uppercase tracking-wider">
                Critical Shortages
              </span>
              <span className="text-4xl sm:text-5xl font-black text-[#ba1a1a]">
                2
              </span>
              <span className="text-xs font-bold text-[#ba1a1a] flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">warning</span>
                Action required
              </span>
            </div>
          </div>

          {/* Main Inventory Flow Chart (Complex UI Pattern) */}
          <div className="lg:col-span-12 bg-white rounded-2xl border border-[#c4c6cf]/70 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#c4c6cf]/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#eff4ff]">
              <h3 className="text-base font-bold text-[#0d1c2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1a365d]">
                  flowsheet
                </span>
                Real-Time Logistics Flow
              </h3>
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-[#43474e]">Zone Filter:</label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  aria-label="Zone Filter"
                  className="bg-white border border-[#c4c6cf] rounded-lg text-xs font-semibold py-1 px-3 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d] text-[#0d1c2e]"
                >
                  <option value="All Zones">All Zones</option>
                  <option value="Zone Alpha">Zone Alpha (Valley Core)</option>
                  <option value="Sector 4">Sector 4 (High Altitude)</option>
                </select>
              </div>
            </div>

            <div className="p-6 overflow-x-auto space-y-8">
              {filteredResources.map((res) => {
                const total = res.totalManaged || (res.available + res.reserved + res.allocated + res.dispatched + res.delivered);
                const pAvail = Math.round((res.available / total) * 100);
                const pRes = Math.round((res.reserved / total) * 100);
                const pAlloc = Math.round((res.allocated / total) * 100);
                const pDisp = Math.round((res.dispatched / total) * 100);
                const pDeliv = Math.round((res.delivered / total) * 100);

                return (
                  <div key={res.id} className="min-w-[760px] pb-6 border-b border-[#c4c6cf]/40 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-end mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1a365d] flex items-center justify-center text-white shadow-sm">
                          <span className="material-symbols-outlined text-[22px]">
                            {res.icon}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-[#0d1c2e] leading-tight">
                            {res.name}
                          </h4>
                          <span className="font-mono text-xs text-[#74777f]">
                            {res.sku} • {res.priorityLabel}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        {res.isCritical && (
                          <span className="text-xs text-[#ba1a1a] font-bold flex items-center gap-1 justify-end mb-0.5">
                            <span className="material-symbols-outlined text-sm">
                              warning
                            </span>
                            Low Stock Warning
                          </span>
                        )}
                        <div className="text-xs text-[#43474e]">
                          Total Managed:{' '}
                          <span className="text-[#0d1c2e] font-black">
                            {total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pipeline Bar */}
                    <div className="flex w-full h-8 rounded-lg overflow-hidden bg-[#e5eeff] mb-2 shadow-inner">
                      <div
                        className="bg-[#455f88] h-full transition-all duration-500 hover:opacity-90"
                        style={{ width: `${pAvail}%` }}
                        title={`Available: ${res.available.toLocaleString()} (${pAvail}%)`}
                      />
                      <div
                        className="bg-[#d93537] h-full transition-all duration-500 hover:opacity-90"
                        style={{ width: `${pRes}%` }}
                        title={`Reserved: ${res.reserved.toLocaleString()} (${pRes}%)`}
                      />
                      <div
                        className="bg-[#D69E2E] h-full transition-all duration-500 hover:opacity-90"
                        style={{ width: `${pAlloc}%` }}
                        title={`Allocated: ${res.allocated.toLocaleString()} (${pAlloc}%)`}
                      />
                      <div
                        className="bg-[#3182CE] h-full transition-all duration-500 hover:opacity-90"
                        style={{ width: `${pDisp}%` }}
                        title={`Dispatched: ${res.dispatched.toLocaleString()} (${pDisp}%)`}
                      />
                      <div
                        className="bg-[#38A169] h-full transition-all duration-500 hover:opacity-90"
                        style={{ width: `${pDeliv}%` }}
                        title={`Delivered: ${res.delivered.toLocaleString()} (${pDeliv}%)`}
                      />
                    </div>

                    {/* Legend/Metrics */}
                    <div className="flex justify-between font-mono text-xs text-[#43474e] pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-[#455f88]" />
                        <span>Available:</span>
                        <span className="text-[#0d1c2e] font-bold">
                          {res.available.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-[#d93537]" />
                        <span>Reserved:</span>
                        <span className="text-[#0d1c2e] font-bold">
                          {res.reserved.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-[#D69E2E]" />
                        <span>Allocated:</span>
                        <span className="text-[#0d1c2e] font-bold">
                          {res.allocated.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-[#3182CE]" />
                        <span>Dispatched:</span>
                        <span className="text-[#0d1c2e] font-bold">
                          {res.dispatched.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-[#38A169]" />
                        <span>Delivered:</span>
                        <span className="text-[#0d1c2e] font-bold">
                          {res.delivered.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
