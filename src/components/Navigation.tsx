import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isDarkTheme?: boolean;
  onLogout?: () => void;
}

export const DesktopSidebar: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  isDarkTheme = false,
  onLogout,
}) => {
  const navItems: { tab: TabType; label: string; icon: string }[] = [
    { tab: 'home', label: 'Dashboard', icon: 'dashboard' },
    { tab: 'requests', label: 'Relief Requests', icon: 'pending_actions' },
    { tab: 'dtn', label: 'DTN Nodes', icon: 'settings_input_component' },
    { tab: 'resources', label: 'Resource Inventory', icon: 'package_2' },
    { tab: 'allocations', label: 'Fund Allocation', icon: 'account_balance' },
    { tab: 'deliveries', label: 'Delivery Tracking', icon: 'local_shipping' },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col h-screen sticky top-0 w-64 border-r shrink-0 z-40 transition-colors duration-200 ${
        isDarkTheme
          ? 'bg-[#002045] border-white/10 text-white'
          : 'bg-[#eff4ff] border-[#c4c6cf]/60 text-[#0d1c2e]'
      }`}
    >
      {/* Brand & User Profile Header */}
      <div className="p-6 border-b border-black/10 dark:border-white/10">
        <h1
          className={`text-2xl font-bold tracking-tight mb-5 ${
            isDarkTheme ? 'text-[#adc7f7]' : 'text-[#002045]'
          }`}
        >
          FundRelease
        </h1>
        <div className="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6rxJERfr1g0dXkA9S2MoMHpp5jiAwT-I5HPYLYUrJfRElySFoWmFSqGIqXaKGduHDhwirfR3gyeJIyKNG7dRi3WKLv38Mcujc76SiRM7B04pZCsSvYMW9NkIHXi47hStXhQ2L6LNzvuqAHihRGssLZEfWROung82rLi8DgdO-kCoJCymb-GxGbsl-fVbS7gkwWU9h-v_F_QweUSqxcKOKqVKWDvGFZ8UPk5xZZrU3EjWKqE6_97wm2w"
            alt="Relief Coordinator"
            className="w-12 h-12 rounded-full object-cover border-2 border-white/40 shadow-sm"
          />
          <div>
            <p
              className={`font-semibold text-sm leading-tight ${
                isDarkTheme ? 'text-[#adc7f7]' : 'text-[#002045]'
              }`}
            >
              Relief Coordinator
            </p>
            <p className="text-xs text-[#43474e] dark:text-[#c4c6cf] mt-0.5">
              Uttarakhand Flood 2026
            </p>
            <span
              className={`inline-block mt-1 px-2 py-0.5 text-[11px] font-mono rounded font-medium ${
                isDarkTheme
                  ? 'bg-[#1a365d] text-[#adc7f7] border border-[#adc7f7]/30'
                  : 'bg-[#d4e4fc] text-[#002045]'
              }`}
            >
              Admin Mode
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 pr-3 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <li key={item.tab}>
                <button
                  onClick={() => onSelectTab(item.tab)}
                  className={`w-full flex items-center gap-3.5 pl-6 py-3 my-0.5 text-sm font-semibold rounded-r-full transition-all duration-200 text-left ${
                    isActive
                      ? isDarkTheme
                        ? 'bg-[#adc7f7] text-[#001b3c] font-bold shadow-sm'
                        : 'bg-[#1a365d] text-white font-bold shadow-sm'
                      : isDarkTheme
                      ? 'text-[#c4c6cf] hover:bg-[#1a365d]/50 hover:text-white'
                      : 'text-[#43474e] hover:bg-[#dce9ff] hover:text-[#002045]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      isActive ? 'filled' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / Settings & Logout */}
      <div className="p-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-1">
        <button
          onClick={() => onSelectTab('settings')}
          className={`w-full flex items-center gap-3.5 pl-6 py-2.5 text-sm font-semibold rounded-r-full transition-all ${
            currentTab === 'settings'
              ? isDarkTheme
                ? 'bg-[#adc7f7] text-[#001b3c]'
                : 'bg-[#1a365d] text-white'
              : isDarkTheme
              ? 'text-[#c4c6cf] hover:bg-[#1a365d]/50'
              : 'text-[#43474e] hover:bg-[#dce9ff]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
          <span>System Settings</span>
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 pl-6 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-r-full transition-all mt-1"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Switch Operator</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export const MobileBottomNav: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  isDarkTheme = false,
}) => {
  const tabs: { tab: TabType; label: string; icon: string }[] = [
    { tab: 'home', label: 'Home', icon: 'home' },
    { tab: 'requests', label: 'Requests', icon: 'assignment_late' },
    { tab: 'dtn', label: 'DTN', icon: 'hub' },
    { tab: 'resources', label: 'Resources', icon: 'inventory_2' },
    { tab: 'allocations', label: 'More', icon: 'menu' },
  ];

  return (
    <nav
      className={`fixed bottom-0 w-full z-50 flex justify-around items-center border-t md:hidden pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.06)] ${
        isDarkTheme
          ? 'bg-[#002045] border-white/10 text-[#adc7f7]'
          : 'bg-white border-[#c4c6cf]/60 text-[#43474e]'
      }`}
    >
      {tabs.map((t) => {
        const isActive =
          t.tab === currentTab ||
          (t.tab === 'allocations' && (currentTab === 'allocations' || currentTab === 'deliveries' || currentTab === 'settings'));

        return (
          <button
            key={t.tab}
            onClick={() => onSelectTab(t.tab)}
            className={`flex flex-col items-center justify-center py-2 px-3 my-1 rounded-xl transition-all duration-150 ${
              isActive
                ? 'bg-[#b51822] text-white scale-95 shadow-sm'
                : isDarkTheme
                ? 'text-[#c4c6cf] hover:text-white'
                : 'text-[#43474e] hover:text-[#002045]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                isActive ? 'filled' : ''
              }`}
            >
              {t.icon}
            </span>
            <span className="text-[11px] font-semibold mt-0.5">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
