import React from 'react';
import { Compass, Server, PlusCircle, ShoppingBag } from 'lucide-react';
import { TabType } from '../types';

interface MobileNavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount: number;
  onOpenCart: () => void;
  isCartOpen?: boolean;
}

export default function MobileNavbar({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  isCartOpen = false
}: MobileNavbarProps) {
  const navItems = [
    {
      id: 'collections' as TabType,
      label: 'COLECCIÓN',
      sublabel: '01.INDEX',
      icon: Compass,
      action: () => onTabChange('collections')
    },
    {
      id: 'archive' as TabType,
      label: 'MANUAL',
      sublabel: '02.DOCS',
      icon: Server,
      action: () => onTabChange('archive')
    },
    {
      id: 'custom-submit' as TabType,
      label: 'CREAR',
      sublabel: '03.STITCH',
      icon: PlusCircle,
      action: () => onTabChange('custom-submit')
    }
  ];

  return (
    <nav 
      id="mobile-bottom-navbar"
      aria-label="Navegación Móvil"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0B0F14]/90 backdrop-blur-2xl border-t border-white/15 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] px-2 pt-2 pb-safe"
      style={{ paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id && !isCartOpen;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`min-h-[52px] w-full flex flex-col items-center justify-center rounded-xl py-1.5 px-1 font-mono transition-all duration-200 select-none cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-white/15 text-off-white shadow-[0_0_16px_rgba(255,255,255,0.1)] border border-white/20'
                  : 'text-concrete/80 hover:text-off-white active:bg-white/10'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-signal-yellow' : ''}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1.5 w-1.5 h-1.5 rounded-full bg-signal-yellow shadow-[0_0_6px_#FFD400]" />
                )}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-extrabold mt-1 leading-none ${isActive ? 'text-white' : 'text-concrete/70'}`}>
                {item.label}
              </span>
              <span className="text-[8px] font-medium text-concrete/50 leading-none mt-0.5">
                {item.sublabel}
              </span>
            </button>
          );
        })}

        {/* CART BUTTON ON MOBILE NAVBAR */}
        <button
          onClick={onOpenCart}
          className={`min-h-[52px] w-full flex flex-col items-center justify-center rounded-xl py-1.5 px-1 font-mono transition-all duration-200 select-none cursor-pointer active:scale-95 relative ${
            isCartOpen
              ? 'bg-signal-yellow text-graphite-black font-black shadow-[0_0_18px_rgba(255,212,0,0.5)] border border-signal-yellow'
              : cartCount > 0
              ? 'bg-signal-yellow/20 text-off-white border border-signal-yellow/40'
              : 'text-concrete/80 hover:text-off-white active:bg-white/10'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <ShoppingBag className={`w-5 h-5 transition-transform duration-200 ${isCartOpen ? 'scale-110 text-graphite-black' : cartCount > 0 ? 'text-signal-yellow' : ''}`} />
            
            {cartCount > 0 && (
              <span className={`absolute -top-1.5 -right-2 text-[9px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-md ${
                isCartOpen 
                  ? 'bg-graphite-black text-signal-yellow' 
                  : 'bg-warning-red text-white animate-pulse'
              }`}>
                {cartCount}
              </span>
            )}
          </div>

          <span className={`text-[10px] uppercase tracking-wider font-extrabold mt-1 leading-none ${isCartOpen ? 'text-graphite-black' : 'text-white'}`}>
            CARRITO
          </span>
          <span className={`text-[8px] font-medium leading-none mt-0.5 ${isCartOpen ? 'text-graphite-black/80' : 'text-concrete/50'}`}>
            [{cartCount}] ITEMS
          </span>
        </button>
      </div>
    </nav>
  );
}
