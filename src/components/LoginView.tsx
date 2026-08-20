import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (mode: 'online' | 'offline', email: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('coordinator@agency.gov');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('online', email || 'coordinator@agency.gov');
  };

  const handleOffline = () => {
    onLogin('offline', email || 'field.operator@offline.dtn');
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#f8f9ff] text-[#0d1c2e]">
      {/* Left Pane: Branding & Context (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#002045] relative flex-col justify-between p-12 overflow-hidden shadow-2xl z-10">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full opacity-30 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuARRDF6SYhz6bJdxiYrU3epL0zWwjDHYuZEvKlKul90DZ6xPcwzomntAxrimcT86zigKaLUK1Gix8XKD-RcHOfwJHCWcsEi0U1zQ6Cfbm2-chznAxd6Jw4P75pGI1caRWjSAlF7qDTPNSb2_16IdVz64xOKO1LNsZnDaeRVgfSsOPNQTMOf1memXLJtsXIKl6oz9b0Orcyfh6me2cuhZPFVzvkfiUcmTKaF4vE6JL2Zvo3Fvucl-ZQmXQ')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002045]/80 via-[#002045]/90 to-[#002045]" />
        </div>

        {/* Header/Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <span className="material-symbols-outlined filled text-white text-[34px]">
            signal_cellular_alt
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            FundRelease
          </h1>
        </div>

        {/* Value Proposition / Tagline */}
        <div className="relative z-10 max-w-md my-auto py-8">
          <p className="text-4xl xl:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Resilient Relief.
            <br />
            <span className="text-[#adc7f7] opacity-95">
              Transparent Delivery.
            </span>
          </p>
          <p className="text-base xl:text-lg text-[#eff4ff]/80 border-l-2 border-[#adc7f7] pl-4 font-normal leading-relaxed">
            Enterprise-grade dashboard engineered for high-stakes environments
            where clarity saves lives.
          </p>

          <div className="mt-8 flex items-center gap-3 text-xs font-mono text-[#adc7f7]/90 bg-[#1a365d]/50 p-3 rounded-lg border border-[#adc7f7]/20">
            <span className="material-symbols-outlined text-base">hub</span>
            <span>Delay-Tolerant Network (DTN) Store-Carry-Forward Protocol Active</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-[#eff4ff]/60 flex justify-between items-center">
          <span>Uttarakhand Flood Response 2026</span>
          <span>v3.4.2 Secure Enclave</span>
        </div>
      </div>

      {/* Right Pane: Login Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 bg-[#f8f9ff] min-h-screen">
        <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[#c4c6cf]/60 shadow-lg relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#002045]" />

          {/* Mobile Logo (Visible only on small screens) */}
          <div className="flex lg:hidden items-center gap-2 mb-4 justify-center">
            <span className="material-symbols-outlined filled text-[#002045] text-[32px]">
              signal_cellular_alt
            </span>
            <h1 className="text-2xl font-black text-[#002045] tracking-tight">
              FundRelease
            </h1>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-[#0d1c2e] mb-1">
              Secure Access
            </h2>
            <p className="text-sm text-[#43474e]">
              Enter your credentials to access the relief command center.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / User ID */}
            <div className="space-y-1.5">
              <label
                className="block text-xs font-bold uppercase tracking-wider text-[#0d1c2e]"
                htmlFor="userId"
              >
                Email / User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74777f]">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0d1c2e] bg-white border border-[#c4c6cf] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#002045] focus:border-[#002045] placeholder:text-[#c4c6cf]"
                  id="userId"
                  name="userId"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="coordinator@agency.gov"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-[#0d1c2e]"
                  htmlFor="password"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('coordinator@agency.gov');
                    setPassword('relief2026pass');
                  }}
                  className="text-[11px] font-mono text-[#1a365d] hover:underline"
                >
                  Fill Demo Pass
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74777f]">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0d1c2e] bg-white border border-[#c4c6cf] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#002045] focus:border-[#002045] placeholder:text-[#c4c6cf]"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-3">
              <button
                className="w-full flex items-center justify-center gap-2 bg-[#002045] hover:bg-[#1a365d] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#002045] focus:ring-offset-2"
                type="submit"
              >
                <span>Sign In</span>
                <span className="material-symbols-outlined text-[18px]">login</span>
              </button>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-[#c4c6cf]" />
                <span className="flex-shrink-0 mx-3 text-xs font-bold text-[#74777f]">
                  OR
                </span>
                <div className="flex-grow border-t border-[#c4c6cf]" />
              </div>

              <button
                onClick={handleOffline}
                className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-[#002045] text-[#002045] hover:bg-[#eff4ff] font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#002045] focus:ring-offset-2"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">wifi_off</span>
                <span>Continue Offline</span>
              </button>
            </div>
          </form>

          {/* Context Note */}
          <div className="mt-4 p-4 bg-[#eff4ff] rounded-xl border border-[#c4c6cf]/80 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#43474e] text-[20px] mt-0.5 shrink-0">
              info
            </span>
            <p className="text-xs text-[#43474e] leading-relaxed">
              Offline mode allows field teams to continue collecting and storing
              relief data locally until connectivity is restored. Data will
              sync automatically via DTN mesh upon reconnection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
