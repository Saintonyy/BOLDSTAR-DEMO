import React, { useState } from 'react';
import { Clipboard, Check, Cpu } from 'lucide-react';

export default function SystemSpecs() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(hex);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const tokens = [
    { name: 'Graphite Black', hex: '#0B0F14', desc: 'Anclaje y contraste, paneles clave, top nav y display de marca.' },
    { name: 'Frosted Glass Surface', hex: 'rgba(255,255,255,0.65)', desc: 'Base translúcida glassmórfica con backdrop-blur de 20px.' },
    { name: 'Pure White Reflection', hex: '#FFFFFF', desc: 'Bordes especulares frontales de cristal que capturan la luz.' },
    { name: 'Steel Gray', hex: '#5A616A', desc: 'Texto secundario, metadatos estructurados, labels de etiquetas.' },
    { name: 'Signal Yellow', hex: '#FFD400', desc: 'Acento industrial Off-White / Yeezy, foco activo y directivas.' },
    { name: 'Warning Red', hex: '#C1121F', desc: 'Acento de confección, notificaciones de origen, stamps y atelier.' }
  ];

  const symbols = [
    { glyph: '[   ]', operator: 'Encuadre', use: 'Marcos de cards, títulos primarios, chips interactivos.' },
    { glyph: '★', operator: 'Origen / Sello', use: 'Notificaciones críticas, momentos clave, marcas de autenticidad.' },
    { glyph: '//', operator: 'Flujo / Split', use: 'Divisores de sección, progresión secuencial, guías de navegación.' },
    { glyph: '●', operator: 'Nodo / Estado', use: 'Pasos de selección, paginación, indicador de actividad del sistema.' },
    { glyph: '<_>', operator: 'Código / Sistema', use: 'Especificaciones técnicas de laboratorio, tags, configuraciones ledger.' }
  ];

  return (
    <div className="flex flex-col gap-8 text-left animate-fade-up">
      {/* Overview Block */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-signal-yellow/10 to-transparent pointer-events-none" />
        <div className="text-warning-red mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase">
            [ GUIDELINES // SYSTEM MANUAL // SZN_1 ]
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-graphite-black tracking-tight uppercase">
          BOLDSTAR® GLASS VISUAL GRAMMAR
        </h1>
        <p className="text-xs sm:text-sm font-mono text-steel-gray leading-relaxed max-w-2xl mt-2 uppercase">
          Guía de traducción técnica para adaptar componentes de interfaz al lenguaje híbrido glassmórfico industrial Bold Star. Inspirado en el minimalismo arquitectónico, cristal escarchado y tipografía sans-serif de alta precisión.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COL-1: TOKENS DE COLOR */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass-panel p-6 sm:p-7 rounded-2xl">
            <span className="text-xs font-mono text-steel-gray uppercase pb-3 border-b border-concrete/40 block font-bold mb-4">
              01 // COLOR_SYSTEM_TOKENS & REFRACCIÓN
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tokens.map((tok, idx) => {
                const isCopied = copiedToken === tok.hex;
                return (
                  <div key={idx} className="glass-card px-4 py-3.5 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-xl shadow-md border border-white/60"
                        style={{ backgroundColor: tok.hex }}
                      />
                      <div className="text-left font-mono">
                        <span className="text-xs text-graphite-black font-extrabold uppercase block">
                          {tok.name}
                        </span>
                        <span className="text-[11px] text-steel-gray font-medium">
                          {tok.hex}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(tok.hex)}
                      className="w-8 h-8 rounded-lg glass-interactive text-graphite-black flex items-center justify-center cursor-pointer transition-all active:scale-95"
                      title="Copiar token"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Clipboard className="w-4 h-4 text-zinc-600" />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Design Rule Notification */}
            <div className="mt-4 glass-inset p-4 rounded-xl text-xs font-mono text-steel-gray leading-relaxed">
              <span className="text-warning-red font-black block mb-1 uppercase">★ REGLA DE MARCA CRÍTICA:</span>
              El cristal glassmórfico no satura el fondo; utiliza un blur óptico multicapa con reflejos blancos en los bordes superiores. Los acentos Signal Yellow y Warning Red operan exclusivamente como señales técnicas, micro-etiquetas e interacciones táctiles.
            </div>
          </div>

          {/* COL-1B: CODIFICACIÓN DE SÍMBOLOS */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl">
            <span className="text-xs font-mono text-steel-gray uppercase pb-3 border-b border-concrete/40 block font-bold mb-4">
              02 // STRUCTURAL_OPERATORS_GRAMMAR
            </span>

            <div className="flex flex-col gap-3">
              {symbols.map((sym, idx) => (
                <div key={idx} className="glass-card px-4 py-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left font-mono">
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-lg sm:text-xl font-bold bg-graphite-black text-off-white px-3.5 py-1.5 rounded-lg min-w-[75px] text-center shadow-md uppercase">
                      {sym.glyph}
                    </span>
                    <div>
                      <span className="text-xs sm:text-sm text-graphite-black font-extrabold uppercase block leading-none mb-1">
                        {sym.operator}
                      </span>
                      <span className="text-xs text-steel-gray leading-relaxed">
                        {sym.use}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COL-2: NORMAS DE GLASSMORFISM Y LAYOUT */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col gap-4 text-left">
            <span className="text-xs font-mono text-steel-gray uppercase pb-3 border-b border-concrete/40 block font-bold">
              03 // GLASSMORHPISM_ARCHITECTURE
            </span>

            <div className="glass-inset p-4 rounded-xl relative flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-mono text-steel-gray">
                <span className="font-semibold">OPTICAL_BLUR_TEST:</span>
                <span className="text-signal-yellow font-bold bg-graphite-black px-2 py-0.5 rounded text-[10px]">BLUR: 20PX</span>
              </div>
              
              <div className="h-32 flex items-center justify-around gap-4 p-4 rounded-xl relative overflow-hidden bg-gradient-to-r from-zinc-200/50 to-zinc-300/50">
                {/* Outset glass card demo */}
                <div className="w-20 h-20 rounded-2xl glass-card flex flex-col items-center justify-center text-center select-none cursor-pointer shadow-lg hover:scale-105 transition-transform">
                  <span className="text-base font-bold text-graphite-black">⌖</span>
                  <span className="text-[10px] font-mono text-steel-gray font-bold mt-1">FROSTED</span>
                </div>
                {/* Smoked glass card demo */}
                <div className="w-20 h-20 rounded-2xl glass-dark-card flex flex-col items-center justify-center text-center select-none cursor-pointer shadow-lg hover:scale-105 transition-transform">
                  <span className="text-base text-signal-yellow font-bold animate-pulse">●</span>
                  <span className="text-[10px] font-mono text-concrete font-bold mt-1">SMOKED</span>
                </div>
              </div>

              <p className="text-xs font-mono text-steel-gray leading-relaxed uppercase mt-1">
                La técnica glassmórfica de Bold Star emplea doble capa de reflexión (borde superior e izquierdo en blanco puro semitransparente) junto con desenfoques gaussianos sutiles. Proporciona tridimensionalidad sin saturar el espacio visual.
              </p>
            </div>

            <div className="glass-inset p-4 rounded-xl flex flex-col gap-1.5 text-xs font-mono">
              <span className="text-graphite-black font-extrabold uppercase">SPECIFICATIONS IN BRIEF:</span>
              <ul className="list-disc list-inside text-steel-gray leading-relaxed mt-1 flex flex-col gap-1.5">
                <li>BORDES: 1px con gradientes translúcidos blancos de alta reflexión</li>
                <li>SUPERFICIE: Fondos semitransparentes con backdrop-filter: blur(20px)</li>
                <li>RADIOS: 16px a 24px en contenedores y paneles primarios</li>
                <li>INTERACTIVIDAD: Transiciones elásticas suaves con ligeras elevaciones</li>
              </ul>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col gap-4">
            <span className="text-xs font-mono text-steel-gray uppercase pb-3 border-b border-concrete/40 block font-bold">
              04 // AESTHETIC_INTEGRATION_CHECK
            </span>

            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="glass-card px-4 py-3 rounded-xl flex items-center justify-between">
                <span className="text-steel-gray font-medium">GRID DE ALINEACIÓN:</span>
                <span className="text-warning-red font-bold uppercase">CAD BLUEPRINT MATRIX</span>
              </div>
              <div className="glass-card px-4 py-3 rounded-xl flex items-center justify-between">
                <span className="text-steel-gray font-medium">ESTILO DE TIPOGRAFÍA:</span>
                <span className="text-graphite-black font-bold">INDUSTRIAL PLUS JAKARTA SANS</span>
              </div>
              <div className="glass-card px-4 py-3 rounded-xl flex items-center justify-between">
                <span className="text-steel-gray font-medium">LENGUAJE MONOCROMÁTICO:</span>
                <span className="text-graphite-black font-bold">OFF-WHITE / YEEZY ARCHIVE</span>
              </div>
            </div>

            <div className="glass-dark p-5 rounded-2xl font-mono text-xs leading-relaxed text-center relative select-none border border-white/10 text-off-white">
              <div className="text-concrete/60 text-[10px] mb-1 font-bold">+ BS-FRAME-GLASS +</div>
              <span className="text-off-white font-semibold">"NO ES SOLO ROPA. ES UN PROTOCOLO VISUAL. ES UN SISTEMA DE SEÑAL."</span>
              <div className="mt-2 text-warning-red font-bold tracking-wider">★ CO. DIS-ARMED AGENCY MEXICO CITY // SZN_1 ★</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
