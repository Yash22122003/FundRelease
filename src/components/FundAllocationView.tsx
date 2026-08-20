import React, { useState } from 'react';
import { FundAllocation, DisasterMeta } from '../types';

interface FundAllocationViewProps {
  meta: DisasterMeta;
  allocations: FundAllocation[];
  onOpenNewAllocationModal: () => void;
  onFilterOrExport: () => void;
}

export const FundAllocationView: React.FC<FundAllocationViewProps> = ({
  meta,
  allocations,
  onOpenNewAllocationModal,
  onFilterOrExport,
}) => {
  const [filterText, setFilterText] = useState('');

  const filteredAllocations = allocations.filter(
    (a) =>
      a.id.toLowerCase().includes(filterText.toLowerCase()) ||
      a.requestRef.toLowerCase().includes(filterText.toLowerCase()) ||
      a.purpose.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f8f9ff] pb-28 md:pb-12 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight mb-1">
            Fund Allocation Control
          </h1>
          <p className="text-sm text-[#43474e]">
            Manage and distribute relief funds securely. All transactions are
            cryptographically verified.
          </p>
        </div>
        <button
          onClick={onOpenNewAllocationModal}
          className="bg-[#b51822] hover:bg-[#930013] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">
            add_circle
          </span>
          <span>New Allocation</span>
        </button>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        {/* Main Fund Overview (Spans 8 cols) */}
        <div className="col-span-1 md:col-span-8 bg-white border border-[#c4c6cf]/70 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h2 className="text-base font-bold text-[#002045] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1a365d] text-[22px]">
                account_balance
              </span>
              Total Relief Fund Overview
            </h2>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl sm:text-5xl font-black text-[#0d1c2e] tracking-tight">
                ₹50,00,000
              </span>
              <span className="text-xs font-bold text-[#43474e] bg-[#eff4ff] border border-[#c4c6cf] px-2.5 py-1 rounded-md">
                Total Corpus
              </span>
            </div>

            {/* Allocation Progress Bar */}
            <div className="w-full h-4 bg-[#eff4ff] rounded-full overflow-hidden flex mb-2 border border-[#c4c6cf]/40 shadow-inner">
              {/* Released */}
              <div
                className="h-full bg-[#003f25] transition-all duration-500 hover:opacity-90"
                style={{ width: '48%' }}
                title="Released: ₹24L (48%)"
              />
              {/* Pending */}
              <div
                className="h-full bg-[#d93537] transition-all duration-500 hover:opacity-90"
                style={{ width: '17%' }}
                title="Pending: ₹8.5L (17%)"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-[#c4c6cf]/60">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#43474e] mb-1">
                Allocated
              </div>
              <div className="text-2xl font-black text-[#1a365d]">₹32.5L</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#43474e] mb-1 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#003f25]" />
                Released
              </div>
              <div className="text-2xl font-black text-[#0d1c2e]">₹24L</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#43474e] mb-1 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#d93537]" />
                Pending
              </div>
              <div className="text-2xl font-black text-[#0d1c2e]">₹8.5L</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#43474e] mb-1">
                Remaining
              </div>
              <div className="text-2xl font-black text-[#002045]">₹17.5L</div>
            </div>
          </div>
        </div>

        {/* Network Integrity / Map (Spans 4 cols) */}
        <div className="col-span-1 md:col-span-4 bg-white border border-[#c4c6cf]/70 rounded-2xl overflow-hidden flex flex-col relative shadow-sm min-h-[260px]">
          <div className="p-4 bg-[#eff4ff] border-b border-[#c4c6cf]/60 z-10">
            <h2 className="text-sm font-bold text-[#002045] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#1a365d] text-[20px]">
                lan
              </span>
              DTN Sync Status
            </h2>
          </div>

          <div className="flex-1 relative">
            {/* Decorative Map Background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFLAS_M9IXGeJa7sWB37YuZYDO9kf46MoAsS4XZB-zY_-o_iokmFWImlJCiyGn2_sOwKk_GQxiQDgpIyNtb5SmlJ51ywem-mLWnM6x2cUPQ70iO7tb10bR-5b5dwUD1wQXfgmjzTK8muvU6cHt9U_GmEV4zUnuNBg7isivs4IAVTJELsD_G1B8zXqMqSz4mvNgJJW7-SYADe-5uFH32ircGTMEDiRxLajbKeEfbD9XHiQ1kZ91VjzmxQ')`,
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-white/40 backdrop-blur-[2px] gap-2.5">
              <div className="bg-white border border-[#c4c6cf] p-3 rounded-xl shadow-md text-center w-full max-w-[210px]">
                <div className="text-xs font-bold text-[#005231] flex items-center justify-center gap-1 mb-0.5">
                  <span className="material-symbols-outlined filled text-[16px] text-[#38A169]">
                    verified
                  </span>
                  Ledger Synced
                </div>
                <div className="font-mono text-xs text-[#43474e]">
                  Last block: 14s ago
                </div>
              </div>

              <div className="bg-white border border-[#c4c6cf] p-3 rounded-xl shadow-md text-center w-full max-w-[210px]">
                <div className="text-xs font-bold text-[#b51822] flex items-center justify-center gap-1 mb-0.5">
                  <span className="material-symbols-outlined text-[16px]">
                    wifi_off
                  </span>
                  3 Nodes Offline
                </div>
                <div className="font-mono text-xs text-[#43474e]">
                  Fallback DTN active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Ledger Table */}
      <div className="bg-white border border-[#c4c6cf]/70 rounded-2xl flex flex-col overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-[#c4c6cf]/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#eff4ff]">
          <h2 className="text-base font-bold text-[#002045]">
            Recent Allocations
          </h2>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Filter by ID, Ref or Purpose..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="text-xs py-1.5 px-3 border border-[#c4c6cf] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#1a365d] w-full sm:w-56"
            />
            <button
              onClick={onFilterOrExport}
              className="p-2 text-[#43474e] hover:text-[#002045] transition-colors border border-[#c4c6cf] rounded-lg bg-white shrink-0"
              title="Download Ledger CSV"
            >
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9ff] border-b border-[#c4c6cf]/60 text-xs font-bold text-[#43474e] uppercase tracking-wider">
                <th className="p-3.5 whitespace-nowrap">ID</th>
                <th className="p-3.5 whitespace-nowrap">Request Ref</th>
                <th className="p-3.5 w-full">Purpose</th>
                <th className="p-3.5 text-right whitespace-nowrap">Amount</th>
                <th className="p-3.5 text-center whitespace-nowrap">Status</th>
                <th className="p-3.5 text-center whitespace-nowrap">Audit</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filteredAllocations.map((alloc) => (
                <tr
                  key={alloc.id}
                  className="border-b border-[#c4c6cf]/40 hover:bg-[#eff4ff]/60 transition-colors"
                >
                  <td className="p-3.5 font-mono font-bold text-[#1a365d]">
                    {alloc.id}
                  </td>
                  <td className="p-3.5 font-mono text-[#43474e]">
                    {alloc.requestRef}
                  </td>
                  <td className="p-3.5 text-[#0d1c2e] font-medium max-w-[240px] truncate">
                    {alloc.purpose}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#0d1c2e] text-right">
                    {alloc.amountFormatted}
                  </td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        alloc.status === 'Released'
                          ? 'bg-[#9ff5c1] text-[#002111]'
                          : 'bg-[#ffdad7] text-[#410004]'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          alloc.status === 'Released'
                            ? 'bg-[#002715]'
                            : 'bg-[#b51822]'
                        }`}
                      />
                      {alloc.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <div
                      className="inline-flex items-center justify-center cursor-help"
                      title={`${alloc.auditStatus} • Hash: ${alloc.blockHash}`}
                    >
                      {alloc.auditStatus === 'Blockchain Verified' ? (
                        <span className="material-symbols-outlined filled text-[20px] text-[#005231]">
                          verified_user
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[20px] text-[#74777f]">
                          pending
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#c4c6cf]/60 bg-[#f8f9ff] flex justify-between items-center text-xs text-[#43474e]">
          <span>Showing 1-{filteredAllocations.length} of {allocations.length} allocations</span>
          <div className="flex gap-1">
            <button className="p-1 border rounded hover:bg-white text-[#74777f]">
              <span className="material-symbols-outlined text-[16px]">
                chevron_left
              </span>
            </button>
            <button className="p-1 border rounded hover:bg-white text-[#74777f]">
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
