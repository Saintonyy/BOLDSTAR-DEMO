/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, SystemState, DesignSubmission } from './types';
import { ARCHIVE_PRODUCTS } from './data';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetailDrawer from './components/ProductDetailDrawer';
import CartDrawer from './components/CartDrawer';
import SystemSpecs from './components/SystemSpecs';
import CustomSubmit from './components/CustomSubmit';
import MobileNavbar from './components/MobileNavbar';
import { Filter, Grid, List, Search, Compass, Layers, ChevronDown, ChevronUp } from 'lucide-react';

export default function App() {
  // --- 1. CORE SYSTEM STATE INITIALIZERS ---
  const [systemState, setSystemState] = useState<SystemState>(() => {
    return {
      isCartOpen: false,
      activeTab: 'collections',
      searchQuery: '',
      categoryFilter: 'all',
      priceRange: 600,
      viewMode: 'grid'
    };
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const cached = localStorage.getItem('boldstar_cart');
    return cached ? JSON.parse(cached) : [];
  });

  const [submissions, setSubmissions] = useState<DesignSubmission[]>(() => {
    const cached = localStorage.getItem('boldstar_submissions');
    return cached ? JSON.parse(cached) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Synchronizers
  useEffect(() => {
    localStorage.setItem('boldstar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('boldstar_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // --- 2. PRODUCT DATA PROCESSING & FILTERS ---
  const handleAddToCart = (product: Product, size: 'S' | 'M' | 'L' | 'XL') => {
    setCart(prev => {
      const matchIdx = prev.findIndex(item => item.product.itemCode === product.itemCode && item.selectedSize === size);
      if (matchIdx > -1) {
        const copy = [...prev];
        copy[matchIdx] = {
          ...copy[matchIdx],
          quantity: copy[matchIdx].quantity + 1
        };
        return copy;
      } else {
        return [...prev, { product, quantity: 1, selectedSize: size }];
      }
    });
  };

  const handleUpdateQty = (productCode: string, size: 'S' | 'M' | 'L' | 'XL', increment: boolean) => {
    setCart(prev => {
      const matchIdx = prev.findIndex(item => item.product.itemCode === productCode && item.selectedSize === size);
      if (matchIdx > -1) {
        const copy = [...prev];
        const newQty = increment ? copy[matchIdx].quantity + 1 : copy[matchIdx].quantity - 1;
        
        if (newQty <= 0) {
          copy.splice(matchIdx, 1);
        } else {
          copy[matchIdx] = {
            ...copy[matchIdx],
            quantity: newQty
          };
        }
        return copy;
      }
      return prev;
    });
  };

  const handleRemoveFromCart = (productCode: string, size: 'S' | 'M' | 'L' | 'XL') => {
    setCart(prev => prev.filter(item => !(item.product.itemCode === productCode && item.selectedSize === size)));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddSubmission = (newSub: DesignSubmission) => {
    setSubmissions(prev => [newSub, ...prev]);
  };

  // Filtration logic merging category codes, names, and pricing
  const filteredProducts = ARCHIVE_PRODUCTS.filter(prod => {
    const matchesCategory = systemState.categoryFilter === 'all' || prod.category === systemState.categoryFilter;
    const matchesSearch = prod.title.toLowerCase().includes(systemState.searchQuery.toLowerCase()) || 
                          prod.itemCode.toLowerCase().includes(systemState.searchQuery.toLowerCase()) ||
                          prod.materials.some(m => m.toLowerCase().includes(systemState.searchQuery.toLowerCase()));
    const matchesPrice = prod.price <= systemState.priceRange;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen blueprint-grid flex flex-col antialiased relative overflow-hidden">
      
      {/* AMBIENT GLOW BACKDROPS (Provides luminous depth for glassmorphism blur) */}
      <div className="ambient-glow-amber" />
      <div className="ambient-glow-slate" />
      <div className="ambient-glow-red" />

      {/* BACKGROUND GRAPHIC COORDINATE MATRIX */}
      <div className="absolute inset-x-0 top-36 h-0.5 border-t border-dashed border-concrete/40 pointer-events-none z-0" />
      <div className="absolute left-[8%] inset-y-0 w-[1px] border-l border-dashed border-concrete/40 pointer-events-none z-0" />
      <div className="absolute right-[8%] inset-y-0 w-[1px] border-r border-dashed border-concrete/40 pointer-events-none z-0" />

      {/* HEADER COMPONENT */}
      <Header
        systemState={systemState}
        setSystemState={setSystemState}
        cartCount={cartItemsCount}
        onCartToggle={() => setSystemState(prev => ({ ...prev, isCartOpen: !prev.isCartOpen }))}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-32 md:pb-8 relative z-10">

        {/* ================= SECTION A: COLLECTIONS ARCHIVE SHOWCASE ================= */}
        {systemState.activeTab === 'collections' && (
          <div className="flex flex-col gap-6 sm:gap-8 text-left">
            
            {/* Title Glass HUD Banner */}
            <div className="glass-panel p-5 sm:p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-1 sm:mb-2">
              <div>
                <div className="flex items-center gap-2 text-warning-red text-xs font-mono tracking-widest font-bold mb-2 uppercase">
                  <span>● INDEX_MODE // {filteredProducts.length}_OBJECTS_CATALOGED</span>
                  <span className="text-steel-gray">|</span>
                  <span className="text-graphite-black font-semibold">SZN_01 // ACTIVE</span>
                </div>
                <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-graphite-black uppercase">
                  ACTIVE COLLECTIONS
                </h1>
                <p className="text-xs sm:text-sm font-mono text-steel-gray max-w-xl leading-relaxed uppercase mt-1.5 sm:mt-2">
                  Explore the deconstructed design catalog. Heavy fabric bases, raw sewing trails, coordinates, and geometric alignment tags.
                </p>
              </div>

              {/* Grid / List Visual Selection controls */}
              <div className="flex gap-2 p-1.5 glass-inset rounded-xl self-start md:self-auto select-none">
                <button
                  onClick={() => setSystemState(prev => ({ ...prev, viewMode: 'grid' }))}
                  aria-label="Vista en cuadrícula"
                  className={`min-h-[44px] px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
                    systemState.viewMode === 'grid' 
                      ? 'bg-graphite-black text-off-white shadow-md' 
                      : 'text-steel-gray hover:text-graphite-black'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  [GRID]
                </button>
                <button
                  onClick={() => setSystemState(prev => ({ ...prev, viewMode: 'index' }))}
                  aria-label="Vista en lista o índice"
                  className={`min-h-[44px] px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
                    systemState.viewMode === 'index' 
                      ? 'bg-graphite-black text-off-white shadow-md' 
                      : 'text-steel-gray hover:text-graphite-black'
                  }`}
                >
                  <List className="w-4 h-4" />
                  [INDEX]
                </button>
              </div>
            </div>

            {/* MOBILE QUICK CATEGORY HORIZONTAL FILTER BAR */}
            <div className="md:hidden flex flex-col gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
                {[
                  { val: 'all', label: 'ALL UNITS' },
                  { val: 'hoodie', label: 'HOODIES' },
                  { val: 'tshirt', label: 'T-SHIRTS' },
                  { val: 'footwear', label: 'BOOTS' },
                  { val: 'outerwear', label: 'OUTERWEAR' },
                  { val: 'utility', label: 'MODULAR' }
                ].map(cat => (
                  <button
                    key={cat.val}
                    onClick={() => setSystemState(prev => ({ ...prev, categoryFilter: cat.val }))}
                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer select-none active:scale-95 flex items-center justify-center ${
                      systemState.categoryFilter === cat.val
                        ? 'bg-graphite-black text-off-white shadow-md border border-graphite-black'
                        : 'glass-interactive text-steel-gray hover:text-graphite-black'
                    }`}
                  >
                    [{cat.label}]
                  </button>
                ))}
              </div>

              {/* Mobile search & filter drawer toggle button */}
              <button
                onClick={() => setIsMobileFilterOpen(prev => !prev)}
                className="w-full min-h-[46px] glass-interactive rounded-xl px-4 py-2.5 font-mono text-xs font-bold flex items-center justify-between text-graphite-black active:scale-98 cursor-pointer select-none"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-warning-red" />
                  <span>FILTERS & PRICE {systemState.searchQuery || systemState.priceRange < 600 ? '(ACTIVE)' : ''}</span>
                </span>
                <span className="text-steel-gray flex items-center gap-1 text-[11px]">
                  {isMobileFilterOpen ? (
                    <>
                      HIDE <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      EXPAND <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* INTEGRATED FILTRATION DRILLDOWN CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              
              {/* FILTER PANEL PILLBOX (3 columns on desktop, accordion on mobile) */}
              <div className={`md:col-span-3 ${isMobileFilterOpen ? 'flex' : 'hidden md:flex'} flex-col gap-5`}>
                <div className="glass-panel p-5 sm:p-6 rounded-2xl flex flex-col gap-5 text-left w-full">
                  <div className="border-b border-concrete/40 pb-3 flex items-center justify-between text-left select-none">
                    <span className="text-xs font-mono font-bold text-graphite-black uppercase flex items-center gap-2 tracking-wider">
                      <Filter className="w-4 h-4 text-warning-red" />
                      CATALOG_FILTER
                    </span>
                    <span className="w-2 h-2 rounded-full bg-signal-yellow shadow-[0_0_8px_#FFD400]"></span>
                  </div>

                  {/* Search bar */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-steel-gray uppercase font-semibold">TEXT_QUERY</span>
                    <div className="glass-inset px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 min-h-[46px]">
                      <Search className="w-4 h-4 text-steel-gray shrink-0" />
                      <input
                        type="text"
                        value={systemState.searchQuery}
                        onChange={e => setSystemState(prev => ({ ...prev, searchQuery: e.target.value }))}
                        placeholder="NAME, CODE, COMPOSITION..."
                        className="bg-transparent border-none outline-none w-full text-xs font-mono text-graphite-black placeholder:text-steel-gray/60 uppercase font-medium"
                      />
                    </div>
                  </div>

                  {/* Category filters list */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-steel-gray uppercase font-semibold">SZN_CATEGORY</span>
                    <div className="flex flex-col gap-1.5 font-mono text-xs">
                      {[
                        { val: 'all', label: 'All Catalog Units [ALL]' },
                        { val: 'hoodie', label: 'Heavy Hoodies [HOD]' },
                        { val: 'tshirt', label: 'Boxy T-Shirts [TEE]' },
                        { val: 'footwear', label: 'Tactical Boots [BTS]' },
                        { val: 'outerwear', label: 'Outerwear Shields [OUT]' },
                        { val: 'utility', label: 'Modular Gear [UTL]' }
                      ].map(cat => (
                        <button
                          key={cat.val}
                          onClick={() => setSystemState(prev => ({ ...prev, categoryFilter: cat.val }))}
                          className={`min-h-[44px] text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center active:scale-98 ${
                            systemState.categoryFilter === cat.val
                              ? 'bg-graphite-black text-off-white font-bold shadow-md'
                              : 'hover:bg-concrete/20 text-steel-gray hover:text-graphite-black font-medium'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Threshold slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-mono text-steel-gray">
                      <span className="font-semibold">MAXIMUM PRICE OUTLAY</span>
                      <span className="text-graphite-black font-bold">${systemState.priceRange} USD</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={600}
                      step={20}
                      value={systemState.priceRange}
                      onChange={e => setSystemState(prev => ({ ...prev, priceRange: Number(e.target.value) }))}
                      className="w-full accent-graphite-black cursor-pointer h-3 bg-concrete/40 rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-steel-gray font-medium">
                      <span>$100</span>
                      <span>$600</span>
                    </div>
                  </div>

                  {/* Short promotional alert */}
                  <div className="glass-dark-card p-4 rounded-xl text-left select-none border border-white/10">
                    <div className="text-xs font-mono font-bold text-signal-yellow uppercase flex items-center gap-1.5">
                      <span>★</span> ACTIVE STITCH DIRECTIVE:
                    </div>
                    <div className="text-[11px] font-mono text-concrete mt-1.5 leading-relaxed uppercase">
                      Enter code <span className="font-bold text-warning-red">SZN_777</span> at ledger stage to subtract 20% off total value.
                    </div>
                  </div>

                </div>
              </div>

              {/* MAIN DATA VIEW AREA (9 columns) */}
              <div className="md:col-span-9">
                {filteredProducts.length === 0 ? (
                  <div className="glass-panel py-24 rounded-2xl flex flex-col items-center justify-center text-center gap-4 select-none">
                    <Compass className="w-12 h-12 text-steel-gray/40 animate-spin-slow" />
                    <div>
                      <h3 className="font-display text-base font-black text-graphite-black uppercase">
                        ZERO_FILES_MATCHED
                      </h3>
                      <p className="text-xs font-mono text-steel-gray max-w-xs mt-2 uppercase leading-relaxed">
                        The current alignment parameters matched zero indexed ledger garments. Adjust filters or query index parameters.
                      </p>
                    </div>
                  </div>
                ) : systemState.viewMode === 'grid' ? (
                  /* GRAPHITE CARD GRID */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(prod => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onViewDetails={setSelectedProduct}
                      />
                    ))}
                  </div>
                ) : (
                  /* FLAT INDEX INDUSTRIAL STYLE */
                  <div className="glass-panel rounded-2xl overflow-hidden">
                    <table className="w-full text-left font-mono text-xs tracking-tight border-collapse">
                      <thead>
                        <tr className="bg-concrete/20 border-b border-concrete/40 uppercase text-xs text-steel-gray font-bold">
                          <th className="py-3.5 px-4">ITEM_CODE</th>
                          <th className="py-3.5 px-4">TITLE</th>
                          <th className="py-3.5 px-4 hidden sm:table-cell">CLASSIFICATION</th>
                          <th className="py-3.5 px-4 hidden md:table-cell">MATERIALS</th>
                          <th className="py-3.5 px-4">EST_PRICE</th>
                          <th className="py-3.5 px-4 text-center">STITCH</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-concrete/30 text-graphite-black font-medium">
                        {filteredProducts.map(prod => (
                          <tr key={prod.id} className="hover:bg-concrete/15 transition-colors group">
                            <td className="py-4 px-4 font-bold">{prod.itemCode}</td>
                            <td className="py-4 px-4 uppercase font-display font-bold group-hover:text-warning-red transition-colors">{prod.title}</td>
                            <td className="py-4 px-4 hidden sm:table-cell text-steel-gray">{prod.szn.split('/')[0]}</td>
                            <td className="py-4 px-4 hidden md:table-cell max-w-xs truncate text-steel-gray">{prod.materials.join(', ')}</td>
                            <td className="py-4 px-4 font-extrabold">${prod.price}.00</td>
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => setSelectedProduct(prod)}
                                className="glass-interactive min-h-[44px] px-4 py-2 rounded-lg text-xs font-bold hover:bg-graphite-black hover:text-off-white active:scale-95 transition-all cursor-pointer uppercase flex items-center justify-center mx-auto select-none"
                              >
                                INSPECT
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ================= SECTION A2: SUBMITTED CUSTOM WORKSPACE SHOWCASE ================= */}
                {submissions.length > 0 && (
                  <div className="mt-12 flex flex-col gap-6 text-left border-t border-concrete/40 pt-10">
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-steel-gray tracking-widest uppercase font-semibold">
                        CO-CREATION ARCHIVE BLOCK
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-black text-graphite-black uppercase">
                        AGENT_SUBMISSIONS_LEDGER
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {submissions.map(sub => (
                        <div
                          key={sub.id}
                          className="glass-card p-5 rounded-2xl flex flex-col justify-between font-mono relative"
                        >
                          <div className="absolute top-4 left-4 border border-concrete/40 bg-graphite-black text-off-white text-xs rounded-md px-2.5 py-1 select-none font-bold">
                            CODE: {sub.code}
                          </div>
                          
                          <div className="w-full aspect-square rounded-xl bg-[#090b0d] flex flex-col items-center justify-center p-4 my-4 relative border border-concrete/30 shadow-inner">
                            <span className="text-steel-gray text-[9px] tracking-widest block mb-4 uppercase font-semibold">CUSTOM STITCH DRAFT</span>
                            
                            <div className="w-24 h-24 border border-dashed border-signal-yellow/50 flex items-center justify-center relative rounded-2xl animate-pulse">
                              <div className="absolute inset-1 border border-dotted border-zinc-800" />
                              <Layers className="w-8 h-8 text-signal-yellow/70" />
                            </div>
                            
                            <span className="text-[10px] font-mono text-concrete/70 absolute bottom-3 uppercase text-center leading-tight">
                              FABRIC BLUEPRINT DEPLOYED<br />{sub.timestamp} INDEX
                            </span>
                          </div>

                          <div className="text-left mt-1">
                            <h4 className="font-display text-sm sm:text-base font-bold text-graphite-black uppercase">
                              [{sub.designTitle}]
                            </h4>
                            <span className="text-xs font-mono text-steel-gray uppercase font-medium">
                              DESIGNER: {sub.userName}
                            </span>
                          </div>

                          <div className="absolute bottom-4 right-4 border border-warning-red text-[9px] text-warning-red font-bold tracking-widest uppercase px-2 py-0.5 rotate-[-5deg] rounded bg-white shadow-sm">
                            SZN_STITCH
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ================= SECTION B: ARCHIVE / SYSTEM DIRECTIVE DOCUMENTATION ================= */}
        {systemState.activeTab === 'archive' && (
          <SystemSpecs />
        )}

        {/* ================= SECTION C: CUSTOM STITCH SUBMISSIONS PORT ================= */}
        {systemState.activeTab === 'custom-submit' && (
          <CustomSubmit
            onAddSubmission={handleAddSubmission}
            submissions={submissions}
          />
        )}

      </main>

      {/* FOOTER CO-DESIGN ARTIFACTS */}
      <footer className="w-full border-t border-concrete/40 mt-16 px-4 sm:px-6 md:px-8 py-8 pb-28 md:pb-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-steel-gray uppercase select-none relative z-10 glass-panel">
        <div className="flex flex-wrap gap-4 sm:gap-8 items-center mb-4 md:mb-0 justify-center">
          <span className="font-black text-graphite-black tracking-widest font-display text-xs">
            © BOLDSTAR® {new Date().getFullYear()}
          </span>
          <span className="hidden sm:inline text-concrete">|</span>
          <span className="hover:text-graphite-black cursor-help transition-all">COORDINATES: (19.4326° N / 99.1332° W)</span>
          <span className="hidden sm:inline text-concrete">|</span>
          <span className="hover:text-graphite-black cursor-help transition-all">SZN_1 DESIGN PROTOCOL HANDBOOK</span>
        </div>
        
        <div className="flex items-center gap-2 tracking-wider">
          <span className="text-graphite-black font-semibold">[ AGENCY: MEXICO CITY // SYSTEM ENGINE ]</span>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION DOCK (VISIBLE ON MOBILE ONLY) */}
      <MobileNavbar
        activeTab={systemState.activeTab}
        onTabChange={(tab) => setSystemState(prev => ({ ...prev, activeTab: tab }))}
        cartCount={cartItemsCount}
        onOpenCart={() => setSystemState(prev => ({ ...prev, isCartOpen: true }))}
        isCartOpen={systemState.isCartOpen}
      />

      {/* --- 3. MODAL OVERLAY PORTALS --- */}

      {/* SPECIFICATION DETAILED DRAWER MODULE */}
      {selectedProduct && (
        <ProductDetailDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* ACTIVE SHOPPING CART LEDGER */}
      {systemState.isCartOpen && (
        <CartDrawer
          cart={cart}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveFromCart}
          onClose={() => setSystemState(prev => ({ ...prev, isCartOpen: false }))}
          onClearCart={handleClearCart}
        />
      )}

    </div>
  );
}
