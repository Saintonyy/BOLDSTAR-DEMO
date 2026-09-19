import React, { useState, useEffect } from 'react';
import { ShoppingBag, Compass, Activity, Server, Upload } from 'lucide-react';
import { SystemState } from '../types';

interface HeaderProps {
  systemState: SystemState;
  setSystemState: React.Dispatch<React.SetStateAction<SystemState>>;
  cartCount: number;
  onCartToggle: () => void;
}

export default function Header({
  systemState,
  setSystemState,
  cartCount,
  onCartToggle
}: HeaderProps) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      setTimeStr(utcStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: SystemState['activeTab']) => {
    setSystemState(prev => ({
      ...prev,
      activeTab: tab
    }));
  };

  return (
    <header className="w-full flex flex-col h-auto z-40 select-none sticky top-0">
      {/* 1. UPPER TECHNICAL TIER (Smoked Glass Telemetry Bar) */}
      <div className="w-full h-9 glass-dark border-x-0 border-t-0 flex items-center justify-between px-4 sm:px-6 md:px-8 text-xs font-mono text-concrete uppercase">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 font-semibold text-off-white">
            <span className="inline-block w-2 h-2 rounded-full bg-signal-yellow shadow-[0_0_8px_#FFD400] animate-pulse"></span>
            SYS: ACTIVE_PUBLIC
          </span>
          <span className="hidden sm:inline text-steel-gray">|</span>
          <span className="hidden sm:inline text-concrete/90">LOC: 19.4326° N / 99.1332° W</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-6">
          <span className="tracking-widest flex items-center gap-1.5 text-off-white/80">
            <Activity className="w-4 h-4 text-signal-yellow" />
            STITCH-ENGINE: OPERATIONAL
          </span>
          <span className="text-steel-gray">//</span>
          <span className="text-concrete/90">MEM: 99.8% AVAIL</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="tracking-wider tabular-nums font-semibold text-off-white">{timeStr}</span>
        </div>
      </div>

      {/* 2. PRIMARY NAV TIER (Frosted Glassmorphism Bar) */}
      <div className="w-full glass-panel border-x-0 py-2.5 sm:py-3.5 px-3 sm:px-6 md:px-8 flex items-center justify-between gap-3 sm:gap-4">
        {/* LOGO LOCKUP */}
        <button 
          onClick={() => handleTabChange('collections')}
          className="min-h-[44px] flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group text-left p-1 rounded-xl transition-all active:scale-98"
          aria-label="Ir a colecciones de Boldstar"
        >
          <div className="relative">
            <span className="font-display text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase leading-none text-graphite-black group-hover:text-warning-red transition-colors duration-300">
              boldstar
            </span>
            <div className="absolute -top-1.5 -right-3 sm:-right-4 flex items-center text-[9px] sm:text-[10px] font-mono text-warning-red font-extrabold">
              777
            </div>
          </div>
          <span className="text-warning-red font-display text-base sm:text-lg animate-spin-slow inline-block">★</span>
          
          <div className="hidden sm:flex flex-col text-[10px] font-mono text-steel-gray leading-tight mt-0.5 border-l border-concrete/40 pl-2.5">
            <span className="font-bold text-graphite-black">ARCHIVE SYSTEM</span>
            <span>VER. 2.0.26 // CORE</span>
          </div>
        </button>

        {/* DESKTOP/TABLET COMPONENT NAVIGATION (Frosted Glass Pills) */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono font-medium">
          <button
            onClick={() => handleTabChange('collections')}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 select-none active:scale-95 ${
              systemState.activeTab === 'collections'
                ? 'bg-graphite-black text-off-white font-bold shadow-[0_4px_16px_rgba(10,10,10,0.3)] border border-graphite-black'
                : 'glass-interactive text-steel-gray hover:text-graphite-black'
            }`}
          >
            <Compass className="w-4 h-4" />
            [01.COLLECTIONS]
          </button>

          <button
            onClick={() => handleTabChange('archive')}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 select-none active:scale-95 ${
              systemState.activeTab === 'archive'
                ? 'bg-graphite-black text-off-white font-bold shadow-[0_4px_16px_rgba(10,10,10,0.3)] border border-graphite-black'
                : 'glass-interactive text-steel-gray hover:text-graphite-black'
            }`}
          >
            <Server className="w-4 h-4" />
            [02.DOCUMENTATION]
          </button>

          <button
            onClick={() => handleTabChange('custom-submit')}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 select-none active:scale-95 ${
              systemState.activeTab === 'custom-submit'
                ? 'bg-graphite-black text-off-white font-bold shadow-[0_4px_16px_rgba(10,10,10,0.3)] border border-graphite-black'
                : 'glass-interactive text-steel-gray hover:text-graphite-black'
            }`}
          >
            <Upload className="w-4 h-4" />
            [03.SUBMIT_STITCH]
          </button>
        </div>

        {/* CART INTERACTIVE CONTROL (Glass Pill with Signal Yellow Glow) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onCartToggle}
            aria-label={`Ver carrito de compras con ${cartCount} prendas`}
            className={`min-h-[44px] glass-interactive group px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full flex items-center gap-2 sm:gap-3 text-xs font-mono cursor-pointer transition-all duration-300 select-none active:scale-95 ${
              cartCount > 0 
                ? 'bg-signal-yellow/20 border-signal-yellow/60 shadow-[0_0_18px_rgba(255,212,0,0.25)]' 
                : ''
            }`}
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-graphite-black" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-warning-red animate-ping" />
              )}
            </div>
            
            <span className="text-graphite-black font-bold tracking-wider">
              <span className="hidden xs:inline">BAG </span>
              <span className="text-steel-gray font-semibold">[{cartCount}]</span>
            </span>

            {cartCount > 0 && (
              <span className="hidden sm:inline glass-inset px-2 py-0.5 rounded text-[10px] bg-signal-yellow font-mono text-graphite-black font-black border border-graphite-black/20">
                ACTIVE
              </span>
            )}
          </button>

          {/* Quick status badge */}
          <div className="w-9 h-9 rounded-full glass-inset hidden lg:flex items-center justify-center text-xs text-steel-gray cursor-help" title="SYS-DIAL-STATUS: ACTIVE">
            ⚙️
          </div>
        </div>
      </div>

      {/* 3. RUNNING BULLETIN / TICKER TIER */}
      <div className="w-full bg-graphite-black text-off-white text-[10px] sm:text-xs tracking-widest font-mono uppercase h-7 overflow-hidden flex items-center relative select-none border-b border-white/10">
        <div className="marquee-container w-full">
          <div className="marquee-content gap-12 font-medium">
            <span>★ BOLDSTAR® SZN_01 DEPLOYED // SEÑALES DE TIEMPO Y HARDWARE BLANDO</span>
            <span>★ PROTOTYPING FOR UNKNOWN CONDITIONS // ACCESS LIMITED ON BS-ARC-777</span>
            <span>★ INSPIRED BY OFF-WHITE™ & YEEZY® CONCEPT SYSTEMS</span>
            <span>★ ESTILO ARCHIVO DIGITAL - HECHO EN MÉXICO - ©2026 CO. DIS-ARMED</span>
            <span>★ STITCH ENGINE LIVE DIAL: ACTIVE // NEW PRODUCTS CATALOGED ONLINE</span>
          </div>
          <div className="marquee-content gap-12 font-medium">
            <span>★ BOLDSTAR® SZN_01 DEPLOYED // SEÑALES DE TIEMPO Y HARDWARE BLANDO</span>
            <span>★ PROTOTYPING FOR UNKNOWN CONDITIONS // ACCESS LIMITED ON BS-ARC-777</span>
            <span>★ INSPIRED BY OFF-WHITE™ & YEEZY® CONCEPT SYSTEMS</span>
            <span>★ ESTILO ARCHIVO DIGITAL - HECHO EN MÉXICO - ©2026 CO. DIS-ARMED</span>
            <span>★ STITCH ENGINE LIVE DIAL: ACTIVE // NEW PRODUCTS CATALOGED ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
