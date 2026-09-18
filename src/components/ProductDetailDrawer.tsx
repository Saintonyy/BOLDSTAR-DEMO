import React, { useState } from 'react';
import { Product } from '../types';
import { X, Compass, Scissors, AlertCircle } from 'lucide-react';

interface ProductDetailDrawerProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL') => void;
}

export default function ProductDetailDrawer({
  product,
  onClose,
  onAddToCart
}: ProductDetailDrawerProps) {
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [addedMessage, setAddedMessage] = useState(false);

  // Find dimensions for the selected size
  const activeDims = product.dimensions.find(d => d.size === selectedSize) || product.dimensions[1];

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 2500);
  };

  const isFootwear = product.category === 'footwear';
  const isUtility = product.category === 'utility';

  return (
    <div className="fixed inset-0 bg-graphite-black/60 backdrop-blur-md z-50 flex items-center justify-end transition-opacity duration-300">
      {/* Drawer content slides in from the right */}
      <div className="w-full max-w-2xl h-screen glass-panel pl-0 border-y-0 rounded-none overflow-y-auto flex flex-col relative shadow-2xl">
        
        {/* CLOSING / HUD HEADER TOP ROW (Smoked Glass Bar) */}
        <div className="w-full glass-dark h-16 flex items-center justify-between px-6 sm:px-8 sticky top-0 z-20 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1.5 glass-dark-inset rounded text-off-white border border-white/10">
              SYS-DOC // {product.itemCode}
            </span>
            <span className="w-2 h-2 rounded-full bg-signal-yellow shadow-[0_0_8px_#FFD400] animate-pulse"></span>
            <span className="text-xs font-mono text-concrete uppercase hidden sm:inline">Aesthetic File Analysis</span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full glass-interactive text-off-white flex items-center justify-center cursor-pointer transition-all hover:text-warning-red hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* CONTENT ENVELOPE */}
        <div className="p-6 sm:p-8 flex-grow flex flex-col gap-6 text-left">

          {/* 1. HERO TITLE BLOCK */}
          <div className="flex flex-col border-b border-concrete/40 pb-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-xs font-mono text-steel-gray tracking-widest uppercase font-semibold">
                  DROP_CLASSIFICATION: {product.szn}
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-graphite-black uppercase tracking-tight mt-1">
                  [{product.title}]
                </h1>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-steel-gray block uppercase font-medium">Archival Price</span>
                <span className="font-mono text-xl sm:text-2xl font-black text-graphite-black">
                  ${product.price}.00 USD
                </span>
              </div>
            </div>
          </div>

          {/* 2. SPECIFICATIONS GRID & BLUEPRINT */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Visual Column */}
            <div className="md:col-span-5 aspect-[4/5] glass-dark-card rounded-2xl overflow-hidden flex items-center justify-center p-4 relative shadow-inner">
              <div className="absolute inset-2 border border-dashed border-zinc-800 rounded pointer-events-none" />
              <div className="w-full h-full flex items-center justify-center">
                {product.category === 'hoodie' && (
                  <svg viewBox="0 0 100 100" className="w-[82%] h-[82%] drop-shadow-2xl">
                    <path d="M 50,15 C 38,15 35,28 15,25 C 10,24 8,30 9,42 C 10,50 18,52 18,52 C 18,52 17,90 20,95 C 23,97 77,97 80,95 C 83,90 82,52 82,52 C 82,52 90,50 91,42 C 92,30 90,24 85,25 C 65,28 62,15 50,15 Z" fill="#1C1F22" stroke="#5A616A" strokeWidth="1" />
                    <path d="M 50,15 C 45,22 43,33 50,37 C 57,33 55,22 50,15 Z" fill="#0E1012" stroke="#5A616A" strokeWidth="1" />
                    <path d="M 32,71 L 68,71 L 63,88 L 37,88 Z" fill="#151719" stroke="#5A616A" strokeWidth="1" />
                  </svg>
                )}
                {product.category === 'tshirt' && (
                  <div className="relative w-full h-full flex items-center justify-center bg-[#F3F1EC] rounded-xl">
                    <svg viewBox="0 0 100 100" className="w-[85%] h-[85%]">
                      <path d="M 50,14 C 42,14 36,18 20,16 C 13,15 12,23 15,35 C 18,44 19,41 19,41 L 19,92 C 19,94 81,94 81,92 L 81,41 C 81,41 82,44 85,35 C 88,23 87,15 80,16 C 64,18 58,14 50,14 Z" fill="#E8E6E0" stroke="#B8B6B0" strokeWidth="1" />
                      <path d="M 36,16 C 36,21 64,21 64,16" fill="transparent" stroke="#B8B6B0" strokeWidth="1" />
                    </svg>
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="absolute w-full h-full opacity-80">
                        <polygon points="50,5 61,35 95,35 68,55 78,85 50,65 22,85 32,55 5,35 39,35" fill="#BAB8B2" stroke="#87857F" />
                      </svg>
                      <div className="relative w-4 h-4 rounded-full overflow-hidden flex border border-black/10 z-10">
                        <div className="w-1/3 h-full bg-[#006847]"></div>
                        <div className="w-1/3 h-full bg-white"></div>
                        <div className="w-1/3 h-full bg-[#CE1126]"></div>
                      </div>
                    </div>
                  </div>
                )}
                {product.category === 'footwear' && (
                  <svg viewBox="0 0 100 100" className="w-[82%] h-[82%]">
                    <path d="M 23,20 C 23,20 28,15 36,20 C 40,22 40,40 45,52 C 48,58 57,64 78,65 C 84,66 85,73 85,78 C 85,82 82,85 75,85 C 60,85 10,82 C 10,75 14,35 23,20 Z" fill="#2E3339" stroke="#5A616A" strokeWidth="1" />
                    <path d="M 12,85 L 14,89 M 18,85 L 20,89 M 24,85 L 26,89 M 32,85 L 34,89" stroke="#FFD400" strokeWidth="1" />
                  </svg>
                )}
                {product.category === 'utility' && (
                  <svg viewBox="0 0 100 100" className="w-[78%] h-[78%]">
                    <rect x="20" y="25" width="60" height="48" rx="6" fill="#1C1E21" stroke="#3D424A" strokeWidth="1.2" />
                    <line x1="30" y1="25" x2="30" y2="73" stroke="#3D424A" strokeWidth="2" />
                    <line x1="70" y1="25" x2="70" y2="73" stroke="#3D424A" strokeWidth="2" />
                    <polygon points="50,40 54,48 46,48" fill="#FFD400" />
                  </svg>
                )}
                {product.category === 'outerwear' && (
                  <svg viewBox="0 0 100 100" className="w-[82%] h-[82%]">
                    <path d="M 50,12 C 40,12 30,17 12,20 C 8,20 6,26 8,42 C 10,54 18,52 18,52 L 18,94 C 18,96 82,96 82,94 L 82,52 C 82,52 90,54 92,42 C 94,26 92,20 88,20 C 70,17 60,12 50,12 Z" fill="rgba(215,222,230,0.5)" stroke="#8A939E" strokeWidth="1" />
                  </svg>
                )}
              </div>
            </div>

            {/* Technical Context Parameters */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <span className="text-xs font-mono text-steel-gray uppercase block pb-1 border-b border-concrete/40 font-bold">
                SYSTEM_SPECIFICATIONS
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-graphite-black">
                <div className="glass-inset p-3 rounded-xl">
                  <span className="text-[10px] text-steel-gray block uppercase font-semibold">Item Weight</span>
                  <span className="font-bold text-sm">{product.specs.weight || 'UNSPECIFIED'}</span>
                </div>
                <div className="glass-inset p-3 rounded-xl">
                  <span className="text-[10px] text-steel-gray block uppercase font-semibold">Design Fit</span>
                  <span className="font-bold text-sm">{product.specs.fit}</span>
                </div>
                <div className="glass-inset p-3 rounded-xl col-span-2">
                  <span className="text-[10px] text-steel-gray block uppercase font-semibold">Origin Coordinates</span>
                  <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5 mt-0.5">
                    <Compass className="w-4 h-4 text-warning-red" />
                    {product.coordinates}
                  </span>
                </div>
              </div>

              <div className="glass-inset p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-steel-gray block mb-1.5 uppercase font-semibold">ARCHIVE_METADATA_NOTES</span>
                <p className="text-xs sm:text-sm text-graphite-black/90 font-mono leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* 3. SIZE & MEASUREMENTS SELECTION SHEET */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-concrete/40 pb-1.5">
              <span className="text-xs font-mono text-steel-gray uppercase font-bold">
                {isFootwear ? 'SZN_CODE_MAPPING' : 'DIMENSION_MATRIX_SELECTION (CM)'}
              </span>
              <span className="text-xs font-mono text-steel-gray uppercase flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5 text-warning-red" />
                Atelier Measurements
              </span>
            </div>

            <div className="flex gap-2.5">
              {(['S', 'M', 'L', 'XL'] as const).map(size => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-3 px-3 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-graphite-black text-off-white shadow-lg border border-graphite-black'
                        : 'glass-interactive text-steel-gray hover:text-graphite-black'
                    }`}
                  >
                    SIZE_{size}
                  </button>
                );
              })}
            </div>

            {/* Matrix Data Display */}
            {!isUtility && (
              <div className="glass-inset p-4 rounded-xl">
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono font-medium">
                  <div className="border-b border-concrete/40 pb-1.5 flex flex-col items-center">
                    <span className="text-[10px] text-steel-gray font-semibold">A: CHEST</span>
                    <span className="text-graphite-black font-bold mt-1 text-xs sm:text-sm">
                      {isFootwear ? 'N/A' : `${activeDims.chest} CM`}
                    </span>
                  </div>
                  <div className="border-b border-concrete/40 pb-1.5 flex flex-col items-center">
                    <span className="text-[10px] text-steel-gray font-semibold">B: SHOULDER</span>
                    <span className="text-graphite-black font-bold mt-1 text-xs sm:text-sm">
                      {isFootwear ? 'N/A' : `${activeDims.shoulder} CM`}
                    </span>
                  </div>
                  <div className="border-b border-concrete/40 pb-1.5 flex flex-col items-center">
                    <span className="text-[10px] text-steel-gray font-semibold">{isFootwear ? 'C: FOOT_L' : 'C: LENGTH'}</span>
                    <span className="text-graphite-black font-bold mt-1 text-xs sm:text-sm">
                      {activeDims.length} CM
                    </span>
                  </div>
                  <div className="border-b border-concrete/40 pb-1.5 flex flex-col items-center">
                    <span className="text-[10px] text-steel-gray font-semibold">D: SLEEVE</span>
                    <span className="text-graphite-black font-bold mt-1 text-xs sm:text-sm">
                      {!activeDims.sleeve || isFootwear ? 'N/A' : `${activeDims.sleeve} CM`}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 text-xs font-mono text-steel-gray leading-relaxed text-center bg-white/40 p-2 rounded-lg">
                  {isFootwear 
                    ? '★ HEEL-TO-TOE BLUEPRINT VECTOR. MEASURE AN EXISTING BOOT TO ALIGN SIZING.' 
                    : '★ MEASUREMENT IN DECONSTRUCTED FLAT DRAFT LAYOUT. FOR AN OVERSIZED / BOXIER DROP.'}
                </div>
              </div>
            )}
          </div>

          {/* 4. MATERIALS & FABRIC DECONSTRUCTION LIST */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-mono text-steel-gray uppercase block pb-1 border-b border-concrete/40 font-bold">
              FABRICATION_&_COMPOSITION
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.materials.map((mat, i) => (
                <span key={i} className="glass-interactive px-3 py-1.5 rounded-full text-xs font-mono text-graphite-black font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning-red" />
                  {mat}
                </span>
              ))}
            </div>
            
            <div className="glass-inset p-3.5 rounded-xl flex items-start gap-2.5 mt-1">
              <AlertCircle className="w-4 h-4 text-warning-red shrink-0 mt-0.5" />
              <div className="text-xs font-mono text-steel-gray leading-relaxed">
                Care instructions: {product.specs.care}. Limited edition atelier manufacture. Avoid abrasive detergents.
              </div>
            </div>
          </div>

          {/* 5. BIG ACTION / ADD TO ARCHIVE CONTROL */}
          <div className="mt-auto pt-6 flex flex-col gap-2">
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`w-full py-4 rounded-xl font-mono text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 ${
                product.stock === 0
                  ? 'bg-concrete text-steel-gray cursor-not-allowed shadow-none'
                  : 'bg-graphite-black text-off-white hover:bg-warning-red hover:shadow-[0_4px_24px_rgba(193,18,31,0.35)] shadow-xl'
              }`}
            >
              STITCH IN TO ARCHIVE BAG [SZN_STITCH]
            </button>
            
            {addedMessage && (
              <div className="text-center text-xs font-mono font-bold text-warning-red tracking-widest animate-pulse mt-1.5">
                ✦ ITEM SYSTEM CATALOGED SUCCESSFULLY IN YOUR CART ✦
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
