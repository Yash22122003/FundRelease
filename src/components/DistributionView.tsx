import React, { useState } from 'react';
import { Delivery } from '../types';

interface DistributionViewProps {
  deliveries: Delivery[];
  selectedDeliveryId: string;
  onSelectDelivery: (id: string) => void;
  onAdvanceDelivery: (id: string) => void;
  onContactField: (delivery: Delivery) => void;
  onExportLog: () => void;
}

export const DistributionView: React.FC<DistributionViewProps> = ({
  deliveries,
  selectedDeliveryId,
  onSelectDelivery,
  onAdvanceDelivery,
  onContactField,
  onExportLog,
}) => {
  const currentDelivery =
    deliveries.find((d) => d.id === selectedDeliveryId) || deliveries[0];

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f8f9ff] pb-28 md:pb-12 max-w-7xl mx-auto w-full">
      {/* Persistent Top Bar for Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight mb-1">
            Active Deliveries & Fleet Tracking
          </h1>
          <p className="text-sm text-[#43474e]">
            Real-time GPS & delay-tolerant telemetry for mountain aid convoys.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#eff4ff] px-3.5 py-1.5 rounded-full border border-[#c4c6cf]">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-xs text-[#0d1c2e] font-semibold">
              Sync: DTN Mesh Active
            </span>
          </div>
          <button
            onClick={onExportLog}
            className="bg-[#1a365d] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#002045] transition-colors shadow-sm"
          >
            Export Log
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Delivery List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white border border-[#c4c6cf]/70 rounded-2xl p-5 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 border-b border-[#c4c6cf]/60 pb-3">
              <h3 className="text-base font-bold text-[#002045]">
                Active Deliveries ({deliveries.length})
              </h3>
              <span className="material-symbols-outlined text-[#74777f]">
                filter_list
              </span>
            </div>

            <div className="space-y-4">
              {deliveries.map((del) => {
                const isSelected = del.id === currentDelivery.id;

                return (
                  <div
                    key={del.id}
                    onClick={() => onSelectDelivery(del.id)}
                    className={`rounded-xl p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#e5eeff] border-2 border-[#1a365d] shadow-sm'
                        : del.isOfflineSyncPending
                        ? 'bg-white border border-[#c4c6cf] offline-pattern'
                        : 'bg-white border border-[#c4c6cf]/80 hover:border-[#1a365d]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-mono text-sm font-black text-[#1a365d]">
                          {del.id}
                        </span>
                        <span className="text-xs text-[#74777f] block font-mono">
                          Ref: {del.refRequest}
                        </span>
                      </div>

                      {del.status === 'In Transit' ? (
                        <span className="bg-[#003f25] text-[#9ff5c1] px-2.5 py-1 rounded-md text-[11px] font-bold uppercase">
                          In Transit
                        </span>
                      ) : del.isOfflineSyncPending ? (
                        <div className="flex items-center gap-1 bg-[#ffdad6] text-[#ba1a1a] px-2 py-0.5 rounded-md text-[11px] font-bold uppercase">
                          <span className="material-symbols-outlined text-[14px]">
                            wifi_off
                          </span>
                          <span>Sync Pending</span>
                        </div>
                      ) : (
                        <span className="bg-[#d4e4fc] text-[#002045] px-2.5 py-1 rounded-md text-[11px] font-bold uppercase">
                          {del.status}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#0d1c2e] mb-2 font-medium">
                      <strong>Route:</strong> {del.route.from} ➔ {del.route.to}
                    </div>

                    <div className="flex gap-1.5 flex-wrap">
                      {del.items.map((it, idx) => (
                        <span
                          key={idx}
                          className="bg-white px-2 py-0.5 border border-[#c4c6cf] rounded-md text-[11px] font-mono text-[#43474e]"
                        >
                          {it}
                        </span>
                      ))}
                    </div>

                    {del.isOfflineSyncPending && (
                      <div className="text-[11px] text-[#ba1a1a] mt-2 italic font-mono">
                        Last known: {del.lastKnownLocation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detail View & Interactive Timeline (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Map/Tracker Satellite View */}
          <div className="bg-white border border-[#c4c6cf]/70 rounded-2xl overflow-hidden h-64 relative shadow-sm">
            <div
              className="bg-cover bg-center w-full h-full opacity-65"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBICqGD_Tm9abH0PxPR6PsRcnAMD8SYxIy0F2-AU3_wwjeyfM6XaA_sS_9IC-_mByXZic-RcQUgjgEwX3Srdy72PyuGo9qQBW-lvsXfdvRZ9OLbiz5eQjhIrf-7CDa9BNKlDN9kP72f2vRdhTml-ApxZxHqO640DV6N96wdQx-CiumRz5vd3QZ7GGqKbXoQqiuIpPYawKd_sgmC1ozo91--cAtEk1-v1iYVfg7d_YECAxO00eQpkTfLZg')`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/95 backdrop-blur border border-[#1a365d] px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-lg animate-bounce">
                <span className="material-symbols-outlined text-[#1a365d]">
                  local_shipping
                </span>
                <span className="font-mono text-xs font-bold text-[#002045]">
                  Unit Active: {currentDelivery.id} (GPS + DTN Ping)
                </span>
              </div>
            </div>

            {/* Coordinates / Terrain tag */}
            <div className="absolute bottom-2 left-2 bg-[#002045]/80 text-white font-mono text-[10px] px-2 py-1 rounded backdrop-blur">
              30.4128° N, 79.3242° E • Sector Elevation 2,140m
            </div>
          </div>

          {/* Timeline & Details Card */}
          <div className="bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 flex-1 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#c4c6cf]/60 pb-4 mb-5 gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-[#002045] mb-1">
                  Delivery {currentDelivery.id}
                </h2>
                <p className="text-xs text-[#43474e]">
                  Assigned to: <strong>{currentDelivery.assignedTo}</strong> | Vehicle:{' '}
                  <strong>{currentDelivery.vehicle}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onContactField(currentDelivery)}
                  className="border border-[#1a365d] text-[#1a365d] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#eff4ff] transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    call
                  </span>
                  <span>Contact Field</span>
                </button>
                <button
                  onClick={() => onAdvanceDelivery(currentDelivery.id)}
                  className="bg-[#1a365d] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#002045] transition-colors"
                >
                  Next Step ➔
                </button>
              </div>
            </div>

            <div className="pl-2 pt-1">
              <h4 className="text-xs font-bold text-[#74777f] uppercase mb-4 tracking-wider">
                Distribution Timeline
              </h4>

              {/* Timeline Stepper */}
              <div className="relative pl-3 space-y-6">
                {currentDelivery.timeline.map((step, idx) => {
                  const isDone = step.completed;
                  const isActive = step.active;

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Vertical line connecting nodes */}
                      {idx < currentDelivery.timeline.length - 1 && (
                        <div
                          className={`absolute left-[11px] top-6 bottom-[-24px] w-0.5 ${
                            isDone ? 'bg-[#1a365d]' : 'bg-[#c4c6cf]'
                          }`}
                        />
                      )}

                      <div
                        className={`w-6 h-6 rounded-full border-2 relative z-10 flex items-center justify-center shrink-0 ${
                          isDone
                            ? 'bg-[#1a365d] border-[#1a365d] text-white'
                            : isActive
                            ? 'bg-[#1a365d] border-[#1a365d] text-white animate-pulse'
                            : 'bg-white border-[#c4c6cf] text-transparent'
                        }`}
                      >
                        {isDone ? (
                          <span className="material-symbols-outlined text-[14px]">
                            check
                          </span>
                        ) : isActive ? (
                          <span className="material-symbols-outlined text-[14px]">
                            local_shipping
                          </span>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#c4c6cf]" />
                        )}
                      </div>

                      <div>
                        <div
                          className={`text-sm font-bold ${
                            isActive
                              ? 'text-[#1a365d]'
                              : isDone
                              ? 'text-[#0d1c2e]'
                              : 'text-[#74777f]'
                          }`}
                        >
                          {step.step}
                        </div>
                        <div className="font-mono text-xs text-[#74777f] mt-0.5">
                          {step.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
