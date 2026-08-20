import React from 'react';
import { DisasterMeta } from '../types';

interface HeaderProps {
  meta: DisasterMeta;
  onToggleOnline: () => void;
  onOpenDTNSyncModal: () => void;
  isDarkTheme?: boolean;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  meta,
  onToggleOnline,
  onOpenDTNSyncModal,
  isDarkTheme = false,
  onOpenProfile,
}) => {
  return (
    <header
      className={`flex justify-between items-center w-full px-4 sm:px-6 md:px-8 py-3.5 border-b transition-colors duration-200 sticky top-0 z-30 ${
        isDarkTheme
          ? 'bg-[#002045] border-white/10 text-white'
          : 'bg-[#f8f9ff] border-[#c4c6cf]/60 text-[#0d1c2e]'
      }`}
    >
      {/* Brand & Mobile Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`material-symbols-outlined text-[28px] font-bold ${
              isDarkTheme ? 'text-[#adc7f7]' : 'text-[#1a365d]'
            }`}
          >
            signal_cellular_alt
          </span>
          <span
            className={`text-[19px] tracking-tight font-black ${
              isDarkTheme ? 'text-[#adc7f7]' : 'text-[#1a365d]'
            }`}
          >
            FundRelease
          </span>
        </div>

        {/* Subtitle tag hidden on small screens */}
        <span
          className={`hidden xl:inline-flex items-center text-xs font-mono px-2.5 py-0.5 rounded-full border ${
            isDarkTheme
              ? 'bg-[#1a365d]/50 border-[#adc7f7]/30 text-[#adc7f7]'
              : 'bg-[#eff4ff] border-[#c4c6cf] text-[#43474e]'
          }`}
        >
          Disaster Command • Uttarakhand 2026
        </span>
      </div>

      {/* Connectivity Status & Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Interactive Online/Offline Toggle */}
        <button
          onClick={onToggleOnline}
          title={meta.isOnline ? 'Click to simulate field disconnection (DTN Mode)' : 'Click to restore online cloud sync'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wide border shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
            meta.isOnline
              ? isDarkTheme
                ? 'bg-[#003f25] border-[#5caf81]/40 text-[#9ff5c1]'
                : 'bg-[#eff4ff] border-[#c4c6cf] text-[#0d1c2e]'
              : 'bg-[#d93537]/15 border-[#d93537]/40 text-[#ba1a1a] dark:text-[#ffdad7]'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              meta.isOnline
                ? 'bg-[#38A169] animate-pulse shadow-[0_0_8px_#38A169]'
                : 'bg-[#d93537] animate-ping shadow-[0_0_8px_#d93537]'
            }`}
          />
          <span>{meta.isOnline ? 'ONLINE' : 'DTN ACTIVE'}</span>
        </button>

        {/* DTN Quick Sync Indicator */}
        <button
          onClick={onOpenDTNSyncModal}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
            isDarkTheme
              ? 'bg-[#1a365d]/60 border-white/20 text-[#d6e3ff] hover:bg-[#1a365d]'
              : 'bg-[#eff4ff] border-[#c4c6cf] text-[#43474e] hover:bg-[#e5eeff]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">sync</span>
          <span>{meta.connectedDTNNodesCount} Nodes Paired</span>
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={onOpenProfile}
          className="relative group focus:outline-none"
          title="Relief Coordinator Profile"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbnTgVHsXWPKj8tWTitSsMFCFND5HIWDnT18XX2f0HLDg4hTxeR4s1ktvJ53OazjhXdGygzq5nnELOAFQ8iL9ZDi3b7qpYqYNxZsCPdaLGMt1OyHf8KaAbOGXcDV02LDrGfKI7J-3VTuNvv-x0J8TltHrB_ZKLcqEWgnEcm2m_LqF2QREKz_A2g6boS9ygdIlmFvrRmfgM8fLbY02BjcuBmO1gkov5YKXTWFHBbJxVLraAnVJgWMPfAA"
            alt="Coordinator Avatar"
            className={`w-8 h-8 rounded-full object-cover border-2 shadow-sm transition-transform group-hover:scale-105 ${
              isDarkTheme ? 'border-[#adc7f7]' : 'border-[#1a365d]/30'
            }`}
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#38A169] border-2 border-white" />
        </button>
      </div>
    </header>
  );
};
