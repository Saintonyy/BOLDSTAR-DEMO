import React from 'react';
import { Product } from '../types';
import { Eye, MapPin, Tag, Activity } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  key?: string | number;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  // Renders a high-fidelity vector blueprint based on the product category
  const renderProductBlueprint = () => {
    switch (product.category) {
      case 'hoodie':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-[#090b0d] scanline-container">
            {/* Sizing Grid Lines */}
            <div className="absolute inset-2 border border-dashed border-zinc-800/40 rounded pointer-events-none" />
            <div className="absolute top-2 left-6 text-[10px] text-concrete/60 font-mono">W_W_GRID_500GSM</div>
            <div className="absolute bottom-2 right-6 text-[10px] text-concrete/60 font-mono">YEEZY_DRA_M06</div>

            {/* Hoodie Blueprint SVG */}
            <svg viewBox="0 0 100 100" className="w-[75%] h-[75%] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] filter transition-all duration-300 group-hover:scale-105">
              <path 
                d="M 50,15 C 38,15 35,28 15,25 C 10,24 8,30 9,42 C 10,50 18,52 18,52 C 18,52 17,90 20,95 C 23,97 77,97 80,95 C 83,90 82,52 82,52 C 82,52 90,50 91,42 C 92,30 90,24 85,25 C 65,28 62,15 50,15 Z" 
                fill="#1C1F22" 
                stroke="#5A616A" 
                strokeWidth="1.2" 
                strokeLinejoin="round" 
              />
              <path d="M 50,15 C 45,22 43,33 50,37 C 57,33 55,22 50,15 Z" fill="#0E1012" stroke="#5A616A" strokeWidth="1" />
              <path d="M 32,71 L 68,71 L 63,88 L 37,88 Z" fill="#151719" stroke="#5A616A" strokeWidth="1" strokeDasharray="1.5,1" />
              <path d="M 23,26 L 30,52" stroke="#5A616A" strokeWidth="1" strokeDasharray="1,1" />
              <path d="M 77,26 L 70,52" stroke="#5A616A" strokeWidth="1" strokeDasharray="1,1" />
              <line x1="20" y1="91" x2="80" y2="91" stroke="#5A616A" strokeWidth="1.5" />
            </svg>

            {/* Front watermark print details */}
            <div className="absolute bottom-14 select-none opacity-20 font-mono text-[9px] text-white text-center leading-normal">
              PROTOTYPE S1<br />W-W_WASHED_BLK
            </div>

            {/* Custom Overlay Signal tag */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-signal-yellow px-2 py-0.5 rounded text-[10px] text-graphite-black font-mono font-bold shadow-[0_0_10px_rgba(255,212,0,0.4)]">
              HEAVY_DEV
            </div>
          </div>
        );

      case 'tshirt':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-[#F3F1EC] pb-6">
            <div className="absolute inset-2 border border-dotted border-concrete/50 pointer-events-none rounded" />
            
            <svg viewBox="0 0 100 100" className="w-[78%] h-[78%] drop-shadow-[0_8px_16px_rgba(30,30,40,0.12)] filter transition-all duration-300 group-hover:scale-105">
              <path 
                d="M 50,14 C 42,14 36,18 20,16 C 13,15 12,23 15,35 C 18,44 19,41 19,41 L 19,92 C 19,94 81,94 81,92 L 81,41 C 81,41 82,44 85,35 C 88,23 87,15 80,16 C 64,18 58,14 50,14 Z" 
                fill="#E8E6E0" 
                stroke="#B8B6B0" 
                strokeWidth="1.2" 
                strokeLinejoin="round" 
              />
              <path d="M 36,16 C 36,21 64,21 64,16" fill="transparent" stroke="#A8A59C" strokeWidth="1.2" />
              <line x1="19" y1="50" x2="81" y2="50" stroke="#FFD400" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
              <line x1="50" y1="14" x2="50" y2="92" stroke="#FFD400" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
            </svg>

            {/* HIGH-FIDELITY STAR EMBLEM PRINT DISPLAY */}
            <div className="absolute top-1/2 transform -translate-y-1/2 w-14 h-14 flex items-center justify-center scale-95 group-hover:scale-105 transition-all duration-500">
              <svg viewBox="0 0 100 100" className="absolute w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] select-none">
                <polygon 
                  points="50,5 61,35 95,35 68,55 78,85 50,65 22,85 32,55 5,35 39,35" 
                  fill="url(#silverGrad)" 
                  stroke="#A8A499" 
                  strokeWidth="1"
                />
                <defs>
                  <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor="#BAB8B2" />
                    <stop offset="60%" stopColor="#E2E0D9" />
                    <stop offset="100%" stopColor="#87857F" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="relative w-6 h-6 rounded-full overflow-hidden flex shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)] border border-black/10 z-10">
                <div className="w-1/3 h-full bg-[#006847] flex items-center justify-center font-mono font-black text-white text-[7px]">P</div>
                <div className="w-1/3 h-full bg-[#FFFFFF] flex items-center justify-center font-mono font-black text-[#1C1F22] text-[7px]">R</div>
                <div className="w-1/3 h-full bg-[#CE1126] flex items-center justify-center font-mono font-black text-white text-[7px]">I</div>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 left-2 text-[8px] font-mono text-steel-gray text-center uppercase tracking-widest pointer-events-none">
              “MAKE MEXICO PRI AGAIN” • DECONSTRUCTED SERIES
            </div>
            
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-warning-red px-2 py-0.5 rounded text-[10px] text-white font-mono font-semibold shadow-[0_0_10px_rgba(193,18,31,0.4)]">
              INT_EDITION
            </div>
          </div>
        );

      case 'footwear':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-[#0d1013] scanline-container">
            <div className="absolute inset-2 border border-dashed border-zinc-800/40 rounded pointer-events-none" />
            <div className="absolute top-2 left-6 text-[10px] text-concrete/60 font-mono">CAD_BOOT_ENGINE</div>
            <div className="absolute bottom-2 right-6 text-[10px] text-concrete/60 font-mono">VULCANI_SOLE_D75</div>

            <svg viewBox="0 0 100 100" className="w-[78%] h-[78%] drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] filter transition-all duration-300 group-hover:scale-105">
              <path 
                d="M 23,20 C 23,20 28,15 36,20 C 40,22 40,40 45,52 C 48,58 57,64 78,65 C 84,66 85,73 85,78 C 85,82 82,85 75,85 C 60,85 10,85 10,82 C 10,75 14,35 23,20 Z" 
                fill="#2E3339" 
                stroke="#5A616A" 
                strokeWidth="1.2" 
                strokeLinejoin="round" 
              />
              <path d="M 12,85 L 14,89 M 18,85 L 20,89 M 24,85 L 26,89 M 32,85 L 34,89 M 42,85 L 44,89 M 52,85 L 54,89 M 64,85 L 66,89 M 74,85 L 76,89" stroke="#FFD400" strokeWidth="1" />
              <line x1="38" y1="30" x2="28" y2="40" stroke="#5A616A" strokeWidth="1" />
              <line x1="41" y1="38" x2="31" y2="48" stroke="#5A616A" strokeWidth="1" />
              <line x1="45" y1="46" x2="35" y2="56" stroke="#5A616A" strokeWidth="1" />
              <circle cx="38" cy="30" r="1.5" fill="#FFD400" />
              <circle cx="41" cy="38" r="1.5" fill="#FFD400" />
              <circle cx="45" cy="46" r="1.5" fill="#FFD400" />
            </svg>

            <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#1c2128] border border-zinc-700 px-2 py-0.5 rounded text-[10px] text-concrete font-mono">
              QTY: MEDIUM
            </div>
          </div>
        );

      case 'utility':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-[#07080a] scanline-container">
            <div className="absolute inset-2 border border-dashed border-zinc-800/40 rounded pointer-events-none" />
            <div className="absolute top-2 left-6 text-[10px] text-concrete/60 font-mono">MOD_RIG_STRUCTURE</div>

            <svg viewBox="0 0 100 100" className="w-[72%] h-[72%] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] filter transition-all duration-300 group-hover:scale-105">
              <rect x="20" y="25" width="60" height="48" rx="6" fill="#1C1E21" stroke="#3D424A" strokeWidth="1.2" />
              <line x1="30" y1="25" x2="30" y2="73" stroke="#3D424A" strokeWidth="2.5" />
              <line x1="70" y1="25" x2="70" y2="73" stroke="#3D424A" strokeWidth="2.5" />
              <rect x="27" y="44" width="6" height="8" rx="1.5" fill="#5F6672" stroke="#3D424A" strokeWidth="0.8" />
              <rect x="67" y="44" width="6" height="8" rx="1.5" fill="#5F6672" stroke="#3D424A" strokeWidth="0.8" />
              <polygon points="50,40 54,48 46,48" fill="#FFD400" />
            </svg>

            <div className="absolute top-3 right-3 flex items-center gap-1 bg-signal-yellow px-2 py-0.5 rounded text-[10px] text-graphite-black font-mono font-black shadow-[0_0_10px_rgba(255,212,0,0.4)]">
              MIL_SPEC
            </div>
          </div>
        );

      case 'outerwear':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 relative bg-[#ECEAE3]">
            <div className="absolute inset-2 border border-dotted border-concrete/50 pointer-events-none rounded" />
            
            <svg viewBox="0 0 100 100" className="w-[76%] h-[76%] drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] filter transition-all duration-300 group-hover:scale-105">
              <path 
                d="M 50,12 C 40,12 30,17 12,20 C 8,20 6,26 8,42 C 10,54 18,52 18,52 L 18,94 C 18,96 82,96 82,94 L 82,52 C 82,52 90,54 92,42 C 94,26 92,20 88,20 C 70,17 60,12 50,12 Z" 
                fill="rgba(215, 222, 230, 0.6)" 
                stroke="#6B7684" 
                strokeWidth="1.2" 
                strokeLinejoin="round" 
              />
              <path d="M 50,12 L 50,94" stroke="#6B7684" strokeWidth="1" strokeDasharray="2,2" />
              <rect x="23" y="58" width="18" height="24" rx="2" fill="rgba(190, 198, 208, 0.4)" stroke="#6B7684" strokeWidth="0.8" />
              <rect x="59" y="58" width="18" height="24" rx="2" fill="rgba(190, 198, 208, 0.4)" stroke="#6B7684" strokeWidth="0.8" />
              <circle cx="18" cy="94" r="1.5" fill="#FFD400" />
              <circle cx="82" cy="94" r="1.5" fill="#FFD400" />
            </svg>

            <div className="absolute top-3 right-3 flex items-center gap-1 bg-steel-gray px-2 py-0.5 rounded text-[10px] text-white font-mono">
              RIPSTOP_GRID
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-concrete/20 p-6 text-center text-xs font-mono text-steel-gray">
            [OBJECT_BLUEPRINT_UNAVAILABLE]
          </div>
        );
    }
  };

  return (
    <div className="glass-card p-5 flex flex-col justify-between group rounded-2xl relative select-none">
      {/* 1. ARCHIVAL HEADER METADATA RAILS */}
      <div className="flex justify-between items-center mb-3.5">
        <div className="glass-inset px-2.5 py-1 text-steel-gray rounded-md text-xs font-mono font-semibold flex gap-2 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-yellow animate-pulse" />
          {product.itemCode}
        </div>
        <div className="text-[11px] font-mono text-steel-gray text-right tracking-tight leading-tight uppercase font-medium">
          {product.szn.split('/')[0]}<br />
          <span className="text-graphite-black/70">v.2026 // CO</span>
        </div>
      </div>

      {/* 2. CENTER BLUEPRINT GRAPHIC CONTAINER */}
      <div 
        onClick={() => onViewDetails(product)}
        className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-concrete/30 transition-all bg-[#080B0D] relative mb-4 shadow-inner cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`Ver archivo técnico de ${product.title}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewDetails(product); }}
      >
        {renderProductBlueprint()}
      </div>

      {/* 3. PRODUCT SPECIFICATIONS & ACTIONS */}
      <div className="flex flex-col mt-auto text-left">
        <div className="flex justify-between items-baseline mb-1.5">
          <h3 className="font-display text-sm sm:text-base font-extrabold tracking-tight text-graphite-black uppercase">
            [{product.title}]
          </h3>
          <span className="font-mono text-sm sm:text-base font-bold tracking-tight text-graphite-black">
            ${product.price}.00 USD
          </span>
        </div>

        {/* Technical specs bullet labels */}
        <div className="flex flex-wrap gap-1.5 px-0.5 mt-1 mb-4 text-xs font-mono text-steel-gray">
          <span className="tracking-tight uppercase">
            FIT: <strong className="text-graphite-black font-semibold">{product.specs.fit.split(' ')[0]}</strong> //
          </span>
          <span className="tracking-tight uppercase">
            {product.materials[0].split(' ')[0]} //
          </span>
          <span className={`tracking-tight uppercase font-bold ${product.stock <= 8 ? 'text-warning-red' : 'text-signal-yellow drop-shadow-sm'}`}>
            {product.stock <= 8 ? `• ONLY_${product.stock}_LEFT` : `• IN_STOCK`}
          </span>
        </div>

        {/* HOVER / TOUCH SPEC TRIGGER BUTTON */}
        <button
          onClick={() => onViewDetails(product)}
          className="w-full min-h-[46px] glass-interactive py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 text-xs font-mono font-bold tracking-wider cursor-pointer group-hover:bg-graphite-black group-hover:text-off-white active:scale-98 active:bg-graphite-black active:text-off-white group-hover:shadow-[0_8px_20px_rgba(10,10,10,0.25)] transition-all duration-200"
        >
          <Eye className="w-4 h-4 text-signal-yellow transition-colors" />
          ANALYZE SPEC_FILE (→)
        </button>
      </div>

      {/* Engineering Corner Accents */}
      <div className="absolute top-1.5 left-2 font-mono text-[9px] text-steel-gray/40 pointer-events-none">+</div>
      <div className="absolute top-1.5 right-2 font-mono text-[9px] text-steel-gray/40 pointer-events-none">+</div>
      <div className="absolute bottom-1.5 left-2 font-mono text-[9px] text-steel-gray/40 pointer-events-none">+</div>
      <div className="absolute bottom-1.5 right-2 font-mono text-[9px] text-steel-gray/40 pointer-events-none">+</div>
    </div>
  );
}
