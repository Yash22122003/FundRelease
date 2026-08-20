import React, { useState } from 'react';
import { DisasterMeta } from '../types';

interface SettingsViewProps {
  meta: DisasterMeta;
  onResetData: () => void;
  onUpdateMeta: (meta: Partial<DisasterMeta>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  meta,
  onResetData,
  onUpdateMeta,
}) => {
  const [syncInterval, setSyncInterval] = useState('2m');
  const [autoVerify, setAutoVerify] = useState(true);
  const [encryptDTN, setEncryptDTN] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f8f9ff] pb-28 md:pb-12 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight mb-1">
            System & Network Settings
          </h1>
          <p className="text-sm text-[#43474e]">
            Configure disaster command parameters, cryptography, and DTN mesh preferences.
          </p>
        </div>
        {saveSuccess && (
          <span className="bg-[#9ff5c1] text-[#002111] px-3 py-1.5 rounded-lg text-xs font-bold font-mono animate-fade">
            ✓ Settings Applied
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Disaster Mission Profile */}
        <div className="bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#002045] flex items-center gap-2 border-b pb-3">
            <span className="material-symbols-outlined text-[#1a365d]">
              flag
            </span>
            Disaster Mission Parameters
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase text-[#43474e] mb-1">
              Active Operation Name
            </label>
            <input
              type="text"
              value={meta.title}
              onChange={(e) => onUpdateMeta({ title: e.target.value })}
              className="w-full p-2.5 border rounded-lg bg-[#f8f9ff] text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#43474e] mb-1">
              Operational Region
            </label>
            <input
              type="text"
              value={meta.region}
              onChange={(e) => onUpdateMeta({ region: e.target.value })}
              className="w-full p-2.5 border rounded-lg bg-[#f8f9ff] text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#43474e] mb-1">
              Total Relief Budget Corpus (INR ₹)
            </label>
            <input
              type="number"
              value={meta.totalReliefCorpus}
              onChange={(e) =>
                onUpdateMeta({ totalReliefCorpus: Number(e.target.value) })
              }
              className="w-full p-2.5 border rounded-lg bg-[#f8f9ff] text-sm font-mono font-bold text-[#002045]"
            />
          </div>
        </div>

        {/* DTN Network Configuration */}
        <div className="bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#002045] flex items-center gap-2 border-b pb-3">
            <span className="material-symbols-outlined text-[#1a365d]">
              settings_ethernet
            </span>
            DTN Protocol Settings
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase text-[#43474e] mb-1">
              Beacon Sync Frequency
            </label>
            <select
              value={syncInterval}
              onChange={(e) => setSyncInterval(e.target.value)}
              className="w-full p-2.5 border rounded-lg bg-[#f8f9ff] text-sm font-semibold"
            >
              <option value="30s">Every 30 Seconds (High Energy)</option>
              <option value="2m">Every 2 Minutes (Standard Tactical)</option>
              <option value="5m">Every 5 Minutes (Battery Saver)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-xl">
            <div>
              <div className="text-sm font-bold text-[#0d1c2e]">
                Auto-Verify Cryptographic Signatures
              </div>
              <div className="text-xs text-[#74777f]">
                Verify SHA-256 integrity hash upon receiving bundle
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoVerify}
              onChange={(e) => setAutoVerify(e.target.checked)}
              className="w-5 h-5 accent-[#1a365d]"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-xl">
            <div>
              <div className="text-sm font-bold text-[#0d1c2e]">
                End-to-End Mesh Encryption
              </div>
              <div className="text-xs text-[#74777f]">
                AES-GCM 256 for all village field requests
              </div>
            </div>
            <input
              type="checkbox"
              checked={encryptDTN}
              onChange={(e) => setEncryptDTN(e.target.checked)}
              className="w-5 h-5 accent-[#1a365d]"
            />
          </div>
        </div>

        {/* Local Storage & System Reset */}
        <div className="md:col-span-2 bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h4 className="text-base font-bold text-[#002045] mb-1">
              Data Management & Demo State
            </h4>
            <p className="text-xs text-[#43474e]">
              Reset all relief allocations, inventory changes, and simulated DTN messages back to baseline defaults.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onResetData}
              className="px-4 py-2 border border-red-500 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors"
            >
              Reset Baseline Data
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#1a365d] text-white hover:bg-[#002045] text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
