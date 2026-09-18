import React, { useState, useRef } from 'react';
import { Upload, FileCode, CheckCircle, RefreshCw, Layers, Palette } from 'lucide-react';
import { DesignSubmission } from '../types';

interface CustomSubmitProps {
  onAddSubmission: (submission: DesignSubmission) => void;
  submissions: DesignSubmission[];
}

export default function CustomSubmit({ onAddSubmission, submissions }: CustomSubmitProps) {
  const [userName] = useState('saintonyy@gmail.com');
  const [designTitle, setDesignTitle] = useState('DECON_RAW_CREWNECK');
  const [fabricType, setFabricType] = useState('450 GSM Organic Cotton Fleece');
  const [fitStyle, setFitStyle] = useState('Oversized Boxy Dropped-Shoulder');
  const [colorPreset, setColorPreset] = useState('#0B0F14');
  const [releaseSzn] = useState('SZN_01 / CUSTOMS');
  const [notes, setNotes] = useState('Frayed hem detailing, heavy density technical prints on sleeve margins.');
  
  // File dropper Drag-and-Drop state
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  
  // Compiler state
  const [submitStep, setSubmitStep] = useState<'idle' | 'stitching' | 'success'>('idle');
  const [stitchProgress, setStitchProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState('');
  const [latestSubmissionCode, setLatestSubmissionCode] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop Handling
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    const sizeInKb = (file.size / 1024).toFixed(1);
    setSelectedFile({
      name: file.name,
      size: `${sizeInKb} KB`,
      type: file.type || 'image/jpeg'
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFabricSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !designTitle) return;

    setSubmitStep('stitching');
    setStitchProgress(0);

    const stages = [
      { prg: 20, msg: 'Validating fabric blueprints...' },
      { prg: 45, msg: 'Compressing coordinate metadata bounds...' },
      { prg: 70, msg: 'Stitch compiler indexing patterns...' },
      { prg: 90, msg: 'Sealing with warnings & barcode brackets...' },
      { prg: 100, msg: 'OFFICIALLY ARCHIVED.' }
    ];

    let currentStageId = 0;
    const interval = setInterval(() => {
      if (currentStageId < stages.length) {
        const stage = stages[currentStageId];
        setStitchProgress(stage.prg);
        setCurrentAction(stage.msg);
        currentStageId++;
      } else {
        clearInterval(interval);
        
        // Generate a random unique item code
        const uniqueId = 'BS-CST-' + Math.floor(100 + Math.random() * 900);
        
        const newSub: DesignSubmission = {
          id: Date.now().toString(),
          userName,
          designTitle,
          notes: `FABRIC: ${fabricType} • FIT: ${fitStyle} • PRES: ${colorPreset} • NOTES: ${notes}`,
          timestamp: new Date().toISOString().substring(0, 10),
          status: 'ACCEPTED',
          code: uniqueId
        };

        onAddSubmission(newSub);
        setLatestSubmissionCode(uniqueId);
        setSubmitStep('success');
      }
    }, 450);
  };

  const handleResetSubmit = () => {
    setDesignTitle('DECON_RAW_CREWNECK');
    setNotes('Frayed hem detailing, heavy density technical prints on sleeve margins.');
    setSelectedFile(null);
    setSubmitStep('idle');
    setStitchProgress(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* LEFT COLUMN: UPLOAD AND CONFIGURATION FORM */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl">
          <div className="border-b border-concrete/40 pb-4 mb-6 flex justify-between items-center text-left">
            <div>
              <span className="text-xs font-mono text-steel-gray uppercase font-bold tracking-wider">
                AESTHETIC STITCH PORT // UPLOAD
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-graphite-black uppercase tracking-tight mt-1">
                SUBMIT NEW ARCHIVE_FILE
              </h2>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-signal-yellow shadow-[0_0_8px_#FFD400] animate-pulse"></div>
          </div>

          {submitStep === 'idle' && (
            <form onSubmit={handleFabricSubmit} className="flex flex-col gap-5 font-mono text-xs">
              
              {/* Username & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-steel-gray uppercase font-semibold">STITCH AGENT ID (EMAIL)</label>
                  <div className="glass-inset px-4 py-3 rounded-xl text-graphite-black text-xs font-bold">
                    {userName}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-steel-gray uppercase font-semibold">GARMENT DESIGN TITLE</label>
                  <input
                    type="text"
                    value={designTitle}
                    onChange={e => setDesignTitle(e.target.value)}
                    required
                    maxLength={30}
                    placeholder="e.g. CO.DECON_FLEECE"
                    className="glass-inset px-4 py-3 rounded-xl outline-none text-xs text-graphite-black placeholder:text-steel-gray/60 font-bold uppercase"
                  />
                </div>
              </div>

              {/* Fabric Specs & Fit Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-steel-gray uppercase font-semibold">FABRICATION SPEC WEIGHT</label>
                  <input
                    type="text"
                    value={fabricType}
                    onChange={e => setFabricType(e.target.value)}
                    required
                    placeholder="e.g. 500 GSM French Terry"
                    className="glass-inset px-4 py-3 rounded-xl outline-none text-xs text-graphite-black placeholder:text-steel-gray/60 font-bold uppercase"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-steel-gray uppercase font-semibold">ESTIMATED SILHOUETTE FIT</label>
                  <input
                    type="text"
                    value={fitStyle}
                    onChange={e => setFitStyle(e.target.value)}
                    required
                    placeholder="e.g. Boxy Oversized Drop"
                    className="glass-inset px-4 py-3 rounded-xl outline-none text-xs text-graphite-black placeholder:text-steel-gray/60 font-bold uppercase"
                  />
                </div>
              </div>

              {/* Color Preset Choice & Release label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-steel-gray uppercase font-semibold flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-steel-gray" /> COLOR BLOCK SELECTION
                  </label>
                  <div className="flex gap-2.5">
                    {['#0B0F14', '#ECEFF3', '#6D7684', '#B8B6B0'].map(col => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setColorPreset(col)}
                        style={{ backgroundColor: col }}
                        className={`w-9 h-9 rounded-xl cursor-pointer border relative transition-all ${
                          colorPreset === col ? 'border-warning-red ring-2 ring-warning-red/30 scale-105 shadow-md' : 'border-concrete/50'
                        }`}
                        title={col}
                      >
                        {colorPreset === col && (
                          <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-steel-gray uppercase font-semibold">SZN CLASSIFICATION</label>
                  <div className="glass-inset px-4 py-3 rounded-xl text-graphite-black text-xs font-bold">
                    {releaseSzn}
                  </div>
                </div>
              </div>

              {/* DRAG AND DROP FILE UPLOADER COMPONENT */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-steel-gray uppercase font-semibold">
                  AESTHETIC FLAT LAY SKETCH / PROTEST FILE (CLICK OR DRAG)
                </label>
                
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerBrowse}
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-warning-red bg-warning-red/10'
                      : 'border-concrete/60 hover:border-graphite-black glass-inset'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,application/pdf"
                  />

                  <Upload className={`w-9 h-9 mb-3 transition-transform ${isDragging ? 'scale-125 text-warning-red animate-pulse' : 'text-steel-gray'}`} />
                  
                  {selectedFile ? (
                    <div className="flex items-center gap-2.5 text-graphite-black glass-panel px-4 py-2 rounded-xl">
                      <FileCode className="w-4 h-4 text-warning-red" />
                      <span className="text-xs font-mono font-bold uppercase">
                        {selectedFile.name} ({selectedFile.size})
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-bold text-graphite-black">
                        DRAG & DROP DESIGN FILE OR <span className="text-warning-red underline decoration-2">CLICK TO EXPLORE</span>
                      </span>
                      <span className="text-[11px] text-steel-gray">
                        Supports high resolution PNG, JPG, CAD drawings, zip specs up to 10MB
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Deconstruction specifications */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-steel-gray uppercase font-semibold">SPECIFICATIONS & DECONSTRUCTION NOTES</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  required
                  placeholder="Detail frayed ends, print positioning, zipper tracks, specific custom coordinates..."
                  className="glass-inset px-4 py-3 rounded-xl outline-none text-xs text-graphite-black placeholder:text-steel-gray/60 font-medium uppercase resize-none leading-relaxed"
                />
              </div>

              {/* Form Action */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-mono text-xs sm:text-sm font-black tracking-widest bg-graphite-black text-off-white hover:bg-warning-red hover:shadow-[0_4px_24px_rgba(193,18,31,0.3)] transition-all duration-300 cursor-pointer uppercase mt-2 shadow-xl"
              >
                COMPILE & SUBMIT BLUEPRINT STITCH (→)
              </button>

            </form>
          )}

          {/* submitStep === 'stitching' Progress layout */}
          {submitStep === 'stitching' && (
            <div className="py-16 flex flex-col items-center justify-center text-center font-mono gap-4 select-none">
              <RefreshCw className="w-10 h-10 text-steel-gray animate-spin" />
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-xs sm:text-sm font-extrabold text-graphite-black uppercase">
                  STITCH COMPILER EXECUTING...
                </span>
                <span className="text-xs text-warning-red font-bold uppercase tracking-wider animate-pulse">
                  {currentAction}
                </span>
              </div>

              {/* Custom responsive progress slide */}
              <div className="w-64 h-3 bg-concrete/40 rounded-full overflow-hidden glass-inset">
                <div
                  className="h-full bg-graphite-black transition-all duration-300"
                  style={{ width: `${stitchProgress}%` }}
                />
              </div>
              <span className="text-xs text-steel-gray font-semibold">{stitchProgress}% COMPLETED</span>
            </div>
          )}

          {/* submitStep === 'success' confirmation */}
          {submitStep === 'success' && (
            <div className="py-12 flex flex-col items-center justify-center text-center font-mono gap-5 select-none">
              <div className="w-16 h-16 rounded-full glass-inset flex items-center justify-center text-graphite-black shadow-inner">
                <CheckCircle className="w-10 h-10 text-warning-red" />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm sm:text-base font-black text-warning-red tracking-widest">
                  STITCH PROTOCOL ACCEPTED
                </span>
                <div className="glass-inset px-5 py-3 rounded-xl text-graphite-black font-black text-sm select-all my-2">
                  {latestSubmissionCode} // VERIFIED
                </div>
                <p className="text-xs text-steel-gray leading-relaxed max-w-sm uppercase">
                  Your custom blueprint garment has been recorded in the workspace and tagged with standard Bold Star coordinate vectors. Look at the submissions panel to view!
                </p>
              </div>

              <button
                onClick={handleResetSubmit}
                className="glass-interactive px-6 py-3 rounded-xl text-xs font-bold tracking-wider hover:bg-graphite-black hover:text-off-white transition-all cursor-pointer mt-2"
              >
                PUSH ANOTHER BLUEPRINT FILE (↺)
              </button>
            </div>
          )}

        </div>
      </div>

      {/* RIGHT COLUMN: REVIEWS SUBMISSIONS LIST */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="glass-panel p-6 sm:p-7 rounded-2xl">
          <span className="text-xs font-mono text-steel-gray uppercase pb-3 border-b border-concrete/40 block font-bold mb-4 text-left">
            01_B // CO_SUBMITTERS_POOL_INDEXED
          </span>

          {submissions.length === 0 ? (
            <div className="py-14 flex flex-col items-center justify-center text-center font-mono gap-3 select-none text-steel-gray">
              <Layers className="w-10 h-10" />
              <div className="text-xs uppercase font-bold">
                NO_SUBMISSIONS_RECORDED
              </div>
              <p className="text-xs max-w-[240px] leading-relaxed uppercase">
                Submit a flat-lay design on the left panel to catalog a custom user spec.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[64vh] pr-1">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="glass-card p-4 rounded-xl text-left font-mono relative flex flex-col gap-2.5"
                >
                  <div className="flex justify-between items-center bg-graphite-black text-off-white p-1.5 px-3 rounded-lg w-full text-xs font-bold select-none">
                    <span>FILE_CODE: {sub.code}</span>
                    <span className="text-[11px] text-concrete font-normal">{sub.timestamp}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-graphite-black uppercase font-display">
                      [{sub.designTitle}]
                    </h4>
                    <span className="text-xs text-steel-gray uppercase block mt-0.5">
                      DESIGNER: {sub.userName}
                    </span>
                  </div>

                  <div className="glass-inset p-3 rounded-lg text-xs text-graphite-black/90 font-medium leading-relaxed uppercase">
                    {sub.notes}
                  </div>

                  <div className="self-end border border-warning-red text-[10px] text-warning-red font-bold tracking-widest uppercase px-2 py-0.5 rotate-[-3deg] rounded select-none bg-white shadow-sm">
                    APPROVED_STITCH
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
