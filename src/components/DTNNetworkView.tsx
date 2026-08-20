import React, { useState } from 'react';
import { DTNNode } from '../types';

interface DTNNetworkViewProps {
  nodes: DTNNode[];
  onTriggerSync: () => void;
  onSimulatePacket: (source: string, destination: string) => void;
}

export const DTNNetworkView: React.FC<DTNNetworkViewProps> = ({
  nodes,
  onTriggerSync,
  onSimulatePacket,
}) => {
  const [activeStep, setActiveStep] = useState<number>(3); // 1: Store, 2: Carry, 3: Forward, 4: Deliver
  const [selectedNode, setSelectedNode] = useState<string>('phone-B');
  const [isRelaying, setIsRelaying] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([
    '[11:42:01] DTN daemon bound to rfcomm0 & wlan-mesh-p2p',
    '[11:43:15] Bundle #B-9021 received from tablet-A (3.4 KB)',
    '[11:45:00] Custody transfer acknowledged to phone-B',
    '[11:47:30] Beacon ping reply from drone-Relay-1: SNR 28dB',
  ]);

  const handleSimulateRelay = () => {
    setIsRelaying(true);
    setActiveStep(1);
    const newLog = `[${new Date().toLocaleTimeString()}] Initiating Store-Carry-Forward packet bundle from ${selectedNode}...`;
    setLogMessages((prev) => [newLog, ...prev.slice(0, 5)]);

    setTimeout(() => {
      setActiveStep(2);
      setLogMessages((prev) => [
        `[${new Date().toLocaleTimeString()}] Carrier device traversing valley pass (GPS: Sector 4)...`,
        ...prev,
      ]);
    }, 900);

    setTimeout(() => {
      setActiveStep(3);
      setLogMessages((prev) => [
        `[${new Date().toLocaleTimeString()}] Proximity beacon detected! Forwarding 4 bundles via WiFi-Direct...`,
        ...prev,
      ]);
    }, 1800);

    setTimeout(() => {
      setActiveStep(4);
      setLogMessages((prev) => [
        `[${new Date().toLocaleTimeString()}] Bundle delivered & cryptographic receipt generated!`,
        ...prev,
      ]);
      setIsRelaying(false);
      onTriggerSync();
    }, 2700);
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#002045] text-[#d6e3ff] bg-stripe-pattern pb-28 md:pb-12 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            DTN Network Management
          </h2>
          <span className="font-mono text-xs text-[#9ff5c1] bg-[#003f25] border border-[#5caf81]/40 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#38A169] animate-pulse" />
            <span>Store-Carry-Forward Engine Active</span>
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30">
          <span className="material-symbols-outlined text-[18px]">
            wifi_off
          </span>
          <p className="text-xs sm:text-sm font-bold">
            OFFLINE MODE: Internet connectivity unavailable. Nearby peer-to-peer communication active.
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Stats Overview Card (Col Span 12, Row 1) */}
        <div className="md:col-span-12 bg-[#455f88]/15 border border-white/15 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 backdrop-blur-md shadow-lg">
          {/* Connected Nodes */}
          <div className="flex flex-col items-center md:items-start flex-1 w-full border-b md:border-b-0 md:border-r border-white/15 pb-3 md:pb-0 md:pr-4">
            <span className="text-xs font-bold text-[#c4c6cf] uppercase tracking-wider">
              Connected Nodes
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {nodes.filter((n) => n.status === 'Connected').length}
              </span>
              <span className="text-xs font-bold text-[#38A169] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#38A169]" /> Active
              </span>
            </div>
          </div>

          {/* Messages Stored */}
          <div className="flex flex-col items-center md:items-start flex-1 w-full border-b md:border-b-0 md:border-r border-white/15 pb-3 md:pb-0 md:pr-4">
            <span className="text-xs font-bold text-[#c4c6cf] uppercase tracking-wider">
              Messages Stored
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-white">
                5
              </span>
              <span className="text-xs text-[#c4c6cf]">Awaiting relay</span>
            </div>
          </div>

          {/* Messages Forwarded */}
          <div className="flex flex-col items-center md:items-start flex-1 w-full border-b md:border-b-0 md:border-r border-white/15 pb-3 md:pb-0 md:pr-4">
            <span className="text-xs font-bold text-[#c4c6cf] uppercase tracking-wider">
              Messages Forwarded
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black text-white">
                8
              </span>
              <span className="text-xs text-[#c4c6cf]">Total relayed</span>
            </div>
          </div>

          {/* Last Sync */}
          <div className="flex flex-col items-center md:items-end flex-1 w-full pt-2 md:pt-0">
            <span className="text-xs font-bold text-[#c4c6cf] uppercase tracking-wider">
              Last Mesh Sync
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white">12m ago</span>
              <button
                onClick={handleSimulateRelay}
                disabled={isRelaying}
                className="material-symbols-outlined text-[18px] text-[#adc7f7] hover:text-white transition-colors cursor-pointer hover:rotate-180 duration-300"
                title="Force Mesh Resync"
              >
                sync
              </button>
            </div>
          </div>
        </div>

        {/* DTN Concept Graphic (Col Span 8) */}
        <div className="md:col-span-8 bg-[#455f88]/15 border border-white/15 rounded-2xl p-6 flex flex-col backdrop-blur-md shadow-lg justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#adc7f7]">
                route
              </span>
              Routing Protocol (Store-Carry-Forward)
            </h3>
            <button
              onClick={handleSimulateRelay}
              disabled={isRelaying}
              className="px-3 py-1 bg-[#d6e3ff]/20 hover:bg-[#d6e3ff]/30 text-white rounded-lg text-xs font-mono font-bold border border-white/20 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              <span>{isRelaying ? 'Simulating Relay...' : 'Simulate Packet Run'}</span>
            </button>
          </div>

          {/* Interactive Flow Stepper */}
          <div className="flex-1 flex items-center justify-between relative py-6 px-2 overflow-x-auto min-w-[540px]">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-white/15 -translate-y-1/2 z-0" />
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 -translate-y-1/2 z-0 animate-pulse" />

            {/* Step 1: Store */}
            <div
              onClick={() => setActiveStep(1)}
              className={`flex flex-col items-center z-10 gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                activeStep === 1
                  ? 'bg-[#002045] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-[#002045]/80 border-white/20 hover:border-white/40'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  activeStep === 1
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-white/10 border-[#adc7f7] text-[#adc7f7]'
                }`}
              >
                <span className="material-symbols-outlined">save</span>
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Store
              </span>
              <span className="font-mono text-[11px] text-[#c4c6cf] text-center max-w-[80px]">
                Save locally
              </span>
            </div>

            <span className="material-symbols-outlined text-white/40 z-10 bg-[#002045] p-1 rounded-full border border-white/20">
              arrow_forward
            </span>

            {/* Step 2: Carry */}
            <div
              onClick={() => setActiveStep(2)}
              className={`flex flex-col items-center z-10 gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                activeStep === 2
                  ? 'bg-[#002045] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-[#002045]/80 border-white/20 hover:border-white/40'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  activeStep === 2
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-white/10 border-[#adc7f7] text-[#adc7f7]'
                }`}
              >
                <span className="material-symbols-outlined">
                  directions_walk
                </span>
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Carry
              </span>
              <span className="font-mono text-[11px] text-[#c4c6cf] text-center max-w-[80px]">
                Physical movement
              </span>
            </div>

            <span className="material-symbols-outlined text-white/40 z-10 bg-[#002045] p-1 rounded-full border border-white/20">
              arrow_forward
            </span>

            {/* Step 3: Forward */}
            <div
              onClick={() => setActiveStep(3)}
              className={`flex flex-col items-center z-10 gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                activeStep === 3
                  ? 'bg-[#002045] border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-105'
                  : 'bg-[#002045]/80 border-white/20 hover:border-white/40'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                <span className="material-symbols-outlined text-amber-400 animate-pulse">
                  cell_tower
                </span>
              </div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Forward
              </span>
              <span className="font-mono text-[11px] text-[#c4c6cf] text-center max-w-[100px]">
                Relay via Bluetooth/WiFi Direct
              </span>
            </div>

            <span className="material-symbols-outlined text-white/40 z-10 bg-[#002045] p-1 rounded-full border border-white/20">
              arrow_forward
            </span>

            {/* Step 4: Deliver */}
            <div
              onClick={() => setActiveStep(4)}
              className={`flex flex-col items-center z-10 gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                activeStep === 4
                  ? 'bg-[#002045] border-emerald-400 shadow-[0_0_15px_rgba(56,161,105,0.4)] scale-105'
                  : 'bg-[#002045]/80 border-white/20 hover:border-white/40'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  activeStep === 4
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-white/10 border-[#adc7f7] text-[#adc7f7]'
                }`}
              >
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Deliver
              </span>
              <span className="font-mono text-[11px] text-[#c4c6cf] text-center max-w-[80px]">
                Target reached
              </span>
            </div>
          </div>

          {/* Terminal Console Logs */}
          <div className="mt-4 p-3 bg-black/40 rounded-xl border border-white/10 font-mono text-[11px] text-[#9ff5c1] space-y-1">
            <div className="text-[#adc7f7] font-bold flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span>DTN Daemon Telemetry Log:</span>
            </div>
            {logMessages.map((msg, idx) => (
              <div key={idx} className="truncate">
                {msg}
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Nodes List (Col Span 4) */}
        <div className="md:col-span-4 bg-[#455f88]/15 border border-white/15 rounded-2xl flex flex-col backdrop-blur-md shadow-lg overflow-hidden">
          <div className="p-4 border-b border-white/15 bg-black/20 flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#adc7f7]">
                bluetooth
              </span>
              Nearby Nodes
            </h3>
            <button
              onClick={() => onSimulatePacket('tablet-A', 'phone-C')}
              className="text-[#adc7f7] hover:text-white transition-colors"
              title="Ping All Nodes"
            >
              <span className="material-symbols-outlined text-[20px]">
                refresh
              </span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/10">
            {nodes.map((node) => {
              const isSelected = selectedNode === node.name;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node.name)}
                  className={`p-4 flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white/15'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        node.role === 'Relay Node'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                          : 'bg-white/10 border-white/20 text-[#adc7f7]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {node.icon}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {node.name}
                      </div>
                      <div className="font-mono text-xs text-[#c4c6cf]">
                        {node.role} • {node.distance || '50m'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className={`inline-flex items-center justify-center rounded-full h-6 px-2.5 text-[11px] font-mono font-bold border ${
                        node.role === 'Relay Node'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                          : 'bg-[#1a365d] text-[#adc7f7] border-[#adc7f7]/30'
                      }`}
                    >
                      {node.messagesQueued} msgs
                    </span>
                    <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{' '}
                      Connected
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-black/30 border-t border-white/15">
            <button
              onClick={handleSimulateRelay}
              className="w-full py-2.5 bg-transparent border-2 border-[#adc7f7] text-[#adc7f7] hover:bg-[#adc7f7] hover:text-[#002045] font-bold text-xs rounded-xl transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">
                sync_alt
              </span>
              <span>Pair & Relay Selected Node</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
