import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, Tag, Printer } from 'lucide-react';

interface CartDrawerProps {
  cart: CartItem[];
  onUpdateQty: (productCode: string, size: 'S' | 'M' | 'L' | 'XL', increment: boolean) => void;
  onRemove: (productCode: string, size: 'S' | 'M' | 'L' | 'XL') => void;
  onClose: () => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  cart,
  onUpdateQty,
  onRemove,
  onClose,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'compiling' | 'receipt'>('cart');
  const [compilerLines, setCompilerLines] = useState<string[]>([]);
  const [receiptHash, setReceiptHash] = useState('');

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'SZN_777') {
      setDiscountPercent(20);
      setPromoMessage('20% ARCHIVE DISCOUNT APPLIED // ACTIVE');
    } else if (code === 'ARCHIVE_FREE') {
      setFreeShipping(true);
      setPromoMessage('FREE METADATA GROUND SHIPPING APPLIED // ACTIVE');
    } else {
      setPromoMessage('CODE VERIFICATION ERROR: CHECK INVALID SYNTAX');
      setTimeout(() => setPromoMessage(''), 3000);
    }
  };

  const subtotal = calculateSubtotal();
  const discountAmount = subtotal * (discountPercent / 100);
  const shippingCost = subtotal === 0 ? 0 : freeShipping ? 0 : 35;
  const totalAmount = subtotal - discountAmount + shippingCost;

  const handleCheckoutSim = () => {
    setCheckoutStep('compiling');
    const lines = [
      'Initializing BOLDSTAR® Checkout protocol...',
      'Access token acknowledged: saintonyy@gmail.com',
      'Resolving coordinate alignment: 19.4326° N / 99.1332° W',
      'Verifying item codes stock index...',
      ...cart.map(item => `Matching ${item.product.itemCode} [SIZE_${item.selectedSize}] QTY:${item.quantity}...`),
      'Compiling payment ledger...',
      'Generating transaction authentication hash...',
      'Applying database security rule blueprints...',
      'OFFICIAL ARCHIVE CONFIRMED.',
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < lines.length) {
        setCompilerLines(prev => [...prev, lines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setReceiptHash('BS-TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase());
          setCheckoutStep('receipt');
        }, 1200);
      }
    }, 280);
  };

  const resetAll = () => {
    onClearCart();
    setCheckoutStep('cart');
    setCompilerLines([]);
    setReceiptHash('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-graphite-black/60 backdrop-blur-md z-50 flex items-center justify-end transition-opacity duration-300">
      <div className="w-full max-w-xl h-screen glass-panel pl-0 border-y-0 rounded-none overflow-y-auto flex flex-col relative shadow-2xl">
        
        {/* CLOSING / TELEMETRY HEADER */}
        <div className="w-full glass-dark min-h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 select-none border-b border-white/10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1.5 glass-dark-inset rounded text-off-white border border-white/10">
              LEDGER_BAG // ARCHIVE
            </span>
            <span className="w-2 h-2 rounded-full bg-signal-yellow shadow-[0_0_8px_#FFD400] animate-pulse"></span>
            <span className="text-xs font-mono text-concrete uppercase hidden sm:inline">Active Allocation Block</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar carrito de compras"
            className="min-w-[44px] min-h-[44px] rounded-full glass-interactive text-off-white flex items-center justify-center cursor-pointer transition-all hover:text-warning-red hover:bg-white/10 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CART TIER 1: ACTIVE FILES LIST */}
        {checkoutStep === 'cart' && (
          <div className="p-4 sm:p-8 pb-12 sm:pb-8 flex-grow flex flex-col gap-6 text-left">
            {cart.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center select-none py-16">
                <div className="w-16 h-16 rounded-full glass-inset flex items-center justify-center text-steel-gray text-xl">
                  📭
                </div>
                <div>
                  <h3 className="font-display text-base font-extrabold text-graphite-black uppercase">
                    ARCHIVE_LEDGER_EMPTY
                  </h3>
                  <p className="text-xs font-mono text-steel-gray leading-relaxed max-w-xs mt-2 uppercase">
                    Your allocation bag contains zero files. Explore the Collections matrix to stitch items.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[48vh] pr-1 sm:pr-2">
                <span className="text-xs font-mono text-steel-gray block uppercase tracking-wider font-bold">
                  STITCH_ALLOCATION_BLOCKS [{cart.length}]
                </span>

                {cart.map((item) => (
                  <div
                    key={`${item.product.itemCode}-${item.selectedSize}`}
                    className="glass-card p-3.5 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative"
                  >
                    {/* Item parameters info */}
                    <div className="flex flex-col gap-1 text-left flex-grow">
                      <span className="font-mono text-[10px] text-off-white bg-graphite-black px-2 py-0.5 rounded w-fit font-bold">
                        {item.product.itemCode} // SIZE_{item.selectedSize}
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-extrabold text-graphite-black tracking-tight uppercase">
                        {item.product.title}
                      </h4>
                      <span className="text-xs font-mono font-semibold text-steel-gray">
                        ${item.product.price}.00 • Total: ${item.product.price * item.quantity}.00 USD
                      </span>
                    </div>

                    {/* Operational controls with at least 44px touch targets */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-concrete/30">
                      <div className="flex items-center gap-1 glass-inset rounded-xl p-1">
                        <button
                          onClick={() => onUpdateQty(item.product.itemCode, item.selectedSize, false)}
                          aria-label="Disminuir cantidad"
                          className="min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center hover:bg-concrete/30 active:bg-warning-red active:text-white cursor-pointer transition-colors text-steel-gray"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-7 text-center text-sm font-mono font-black text-graphite-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.itemCode, item.selectedSize, true)}
                          aria-label="Aumentar cantidad"
                          className="min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center hover:bg-concrete/30 active:bg-signal-yellow active:text-graphite-black cursor-pointer transition-colors text-steel-gray"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(item.product.itemCode, item.selectedSize)}
                        className="min-w-[44px] min-h-[44px] rounded-xl glass-interactive text-steel-gray hover:text-warning-red active:bg-warning-red active:text-white flex items-center justify-center cursor-pointer transition-colors"
                        aria-label={`Eliminar ${item.product.title} del carrito`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CODES & SUMMATION INVOICE */}
            {cart.length > 0 && (
              <div className="mt-auto border-t border-concrete/40 pt-5 flex flex-col gap-4 text-left">
                {/* PROMO ENTRY */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-steel-gray uppercase font-semibold">
                    SYS_PROMO_VERIFICATION_LEDGER
                  </span>
                  <div className="flex gap-2">
                    <div className="flex-grow glass-inset rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 min-h-[46px]">
                      <Tag className="w-4 h-4 text-steel-gray shrink-0" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        placeholder="CODE (e.g. SZN_777)"
                        className="bg-transparent border-none outline-none w-full text-xs font-mono text-graphite-black placeholder:text-steel-gray/60 uppercase font-semibold"
                      />
                    </div>
                    <button
                      onClick={handleApplyPromo}
                      className="glass-interactive px-4 sm:px-5 min-h-[46px] rounded-xl text-xs font-mono font-bold tracking-wider cursor-pointer hover:bg-graphite-black hover:text-off-white active:scale-95 transition-all"
                    >
                      APPLY (✓)
                    </button>
                  </div>
                  {promoMessage && (
                    <span className="text-xs font-mono font-black text-warning-red uppercase tracking-wider text-center mt-1 bg-white/70 py-2 rounded-lg border border-warning-red/30">
                      {promoMessage}
                    </span>
                  )}
                </div>

                {/* COMPUTING CALCULATOR */}
                <div className="glass-inset p-4 sm:p-5 rounded-2xl text-left flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-xs font-mono text-steel-gray font-medium">
                    <span>ALLOCATED SUB-TOTAL:</span>
                    <span className="text-graphite-black font-bold text-sm">${subtotal}.00 USD</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between items-center text-xs font-mono text-warning-red font-bold">
                      <span>SYS_STITCH DISCOUNT ({discountPercent}%):</span>
                      <span>-${discountAmount}.00 USD</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs font-mono text-steel-gray font-medium">
                    <span>METADATA DELIVERY CHARGE:</span>
                    <span className="text-graphite-black font-bold">
                      {shippingCost === 0 ? 'FREE_LEDGER_EST' : `$${shippingCost}.00 USD`}
                    </span>
                  </div>
                  <div className="h-[1px] bg-concrete/40 my-1" />
                  <div className="flex justify-between items-center text-sm font-mono font-black text-graphite-black">
                    <span className="tracking-wide">TOTAL LEDGER OUTFLOW:</span>
                    <span className="text-base sm:text-lg">${totalAmount}.00 USD</span>
                  </div>
                </div>

                {/* CHECKOUT ACTION BUTTON */}
                <button
                  onClick={handleCheckoutSim}
                  className="w-full min-h-[54px] py-4 px-4 rounded-xl font-mono text-xs sm:text-sm font-black tracking-widest bg-graphite-black text-off-white hover:bg-warning-red hover:shadow-[0_4px_24px_rgba(193,18,31,0.3)] active:scale-98 uppercase transition-all duration-200 cursor-pointer shadow-xl flex items-center justify-center gap-2"
                >
                  <span>STITCH_COMPILE_CHECKOUT (→)</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* CART TIER 2: ACTIVE COMPILED LOGGER SCREEN */}
        {checkoutStep === 'compiling' && (
          <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between text-left h-full bg-[#080B0D] scanline-container">
            <div className="flex flex-col gap-3.5 font-mono text-xs text-emerald-400 select-none">
              <span className="text-concrete font-black uppercase text-xs mb-2 tracking-widest border-b border-zinc-800 pb-3 flex items-center justify-between">
                <span>BS_TXN_LEDGER_COMPILING // STITCHING</span>
                <span className="text-emerald-400 animate-pulse font-bold">● COMPILE_ACTIVE</span>
              </span>

              {compilerLines.map((line, i) => (
                <div key={i} className="leading-relaxed font-semibold">
                  <span className="text-zinc-600 mr-2">[{i + 1}]</span>
                  {line}
                </div>
              ))}
              
              <div className="w-16 h-8 mt-4 flex items-end gap-1.5 select-none">
                <div className="w-3 h-full bg-emerald-400/80 animate-pulse"></div>
                <div className="w-3 h-[60%] bg-emerald-400/60"></div>
                <div className="w-3 h-[80%] bg-emerald-400/85"></div>
              </div>
            </div>

            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest text-center">
              SYSTEM TERMINAL CO-SECURE // CO. DIS-ARMED ©2026
            </div>
          </div>
        )}

        {/* CART TIER 3: TYPOGRAPHIC RAW RECEIPT DISPLAY */}
        {checkoutStep === 'receipt' && (
          <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between text-left h-full bg-[#0E1012] scanline-container text-white select-none">
            <div className="bg-[#FAF9F6] text-black px-5 sm:px-8 py-8 shadow-2xl relative rounded-xl font-mono flex flex-col gap-4 text-xs">
              
              <div className="text-center flex flex-col items-center pb-4 border-b border-dashed border-zinc-400 gap-1.5 select-none">
                <Printer className="w-6 h-6 text-zinc-800" />
                <h3 className="font-display text-lg font-black uppercase leading-tight tracking-wider mt-1">
                  [BOLDSTAR®]
                </h3>
                <span className="text-xs text-zinc-500 font-semibold">
                  SYSTEM LEDGER RECEIPT // SZN_01
                </span>
                <span className="text-[11px] text-zinc-400">
                  CO-DEV STITCH AGENCY // MEXICO CITY
                </span>
              </div>

              {/* Meta information tags */}
              <div className="flex flex-col gap-2 text-xs border-b border-dashed border-zinc-400 pb-3.5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">LEDGER_TXN:</span>
                  <span className="font-bold">{receiptHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">TIMESTAMP:</span>
                  <span className="font-bold">{new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">VISITOR:</span>
                  <span className="font-bold">saintonyy@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">ALT_COORD:</span>
                  <span className="font-bold">19.4326° N / 99.1332° W</span>
                </div>
              </div>

              {/* Allocated list breakdown */}
              <div className="flex flex-col gap-2.5 border-b border-dashed border-zinc-400 pb-4">
                <span className="text-xs text-zinc-500 block uppercase font-bold">SECURED_OBJECT_ALLOCATIONS:</span>
                {cart.map((item, id) => (
                  <div key={id} className="flex justify-between text-xs font-medium leading-relaxed">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{item.product.title}</span>
                      <span className="text-xs text-zinc-500">CODE: {item.product.itemCode} // SIZE_{item.selectedSize} // QTY: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-right self-center text-sm">${item.product.price * item.quantity}.00</span>
                  </div>
                ))}
              </div>

              {/* Summary Calculations */}
              <div className="flex flex-col gap-2 text-xs border-b border-dashed border-zinc-400 pb-4">
                <div className="flex justify-between">
                  <span>GROSS_LEDGER_VAL:</span>
                  <span className="font-bold text-sm">${subtotal}.00 USD</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-warning-red font-bold text-xs">
                    <span>PROMO_LEADER DISCOUNT ({discountPercent}%):</span>
                    <span>-${discountAmount}.00 USD</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>SHIPPING EXPENSES:</span>
                  <span className="font-bold">{shippingCost === 0 ? 'FREE_SZN_MET' : `$${shippingCost}.00 USD`}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black pt-2 border-t border-dotted border-zinc-400">
                  <span>LEDGER_OUTFLOW:</span>
                  <span>${totalAmount}.00 USD</span>
                </div>
              </div>

              {/* Barcode Simulator */}
              <div className="flex flex-col items-center gap-1.5 py-2 select-none">
                <div className="flex items-center gap-[2px] h-12 w-full justify-center opacity-90">
                  <div className="w-1.5 h-full bg-black"></div>
                  <div className="w-0.5 h-full bg-black"></div>
                  <div className="w-1 h-full bg-black"></div>
                  <div className="w-2.5 h-full bg-black"></div>
                  <div className="w-0.5 h-full bg-black"></div>
                  <div className="w-1.5 h-full bg-black"></div>
                  <div className="w-0.5 h-full bg-black"></div>
                  <div className="w-1 h-full bg-black"></div>
                  <div className="w-3 h-full bg-black"></div>
                  <div className="w-0.5 h-full bg-black"></div>
                  <div className="w-1.5 h-full bg-black"></div>
                  <div className="w-1 h-full bg-black"></div>
                  <div className="w-0.5 h-full bg-black"></div>
                  <div className="w-2 h-full bg-black"></div>
                  <div className="w-2 h-full bg-black"></div>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                  * {receiptHash} *
                </span>
              </div>

              <div className="text-xs text-center text-zinc-500 leading-normal border-t border-dashed border-zinc-400 pt-3 flex flex-col align-center">
                <span>THANK_YOU. YOUR ITEMS HAVE BEEN OFFICIALLY ARCHIVED.</span>
                <span className="font-bold text-black mt-1">DISPATCH SHIELD DELIVERIES SCHEDULED WITHIN 72H.</span>
              </div>

            </div>

            <button
              onClick={resetAll}
              className="w-full min-h-[52px] py-4 px-4 rounded-xl font-mono text-xs sm:text-sm font-black tracking-widest bg-[#FAF9F6] text-black hover:bg-warning-red hover:text-white active:scale-98 uppercase transition-all duration-200 cursor-pointer text-center shadow-xl select-none"
            >
              CLOSE ARCHIVE_FILE & CLEAR LEDGER
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
