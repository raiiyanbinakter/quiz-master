import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Eye,
  Info,
  ArrowRight,
  ArrowLeft,
  Activity
} from 'lucide-react';
import {
  VisualLabDefinition,
  PhysicsLabState,
  calculatePhysicsResult
} from '../../types/visualLab';

export const LAB_FORCE_MASS_ACCELERATION: VisualLabDefinition = {
  id: 'physics-force-mass-acceleration',
  title: 'বল, ভর ও ত্বরণ',
  route: 'academic',
  subjectId: 'physics_first_paper',
  chapterId: 'phys1_ch4',
  topicIds: ['phys1_ch4_t1', 'phys1_ch4_t2'],
  learningObjectives: [
    'বল বাড়লে ত্বরণ বাড়ে',
    'ভর বাড়লে একই বলে ত্বরণ কমে',
    'ঘর্ষণ থাকলে নিট বল কমে',
    'নিউটনের দ্বিতীয় সূত্র: F = ma'
  ],
  status: 'published'
};

interface PhysicsVisualLabProps {
  onClose?: () => void;
  onStartQuizForTopic?: (topicId: string) => void;
}

export const PhysicsVisualLab: React.FC<PhysicsVisualLabProps> = ({
  onClose,
  onStartQuizForTopic
}) => {
  // Slider states
  const [appliedForce, setAppliedForce] = useState<number>(40);
  const [mass, setMass] = useState<number>(5);
  const [frictionEnabled, setFrictionEnabled] = useState<boolean>(true);
  const [frictionForce, setFrictionForce] = useState<number>(10);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Challenge state
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Object position for simulation animation
  const [positionX, setPositionX] = useState<number>(150); // track width ~ 600px
  const [velocityX, setVelocityX] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const physics = calculatePhysicsResult(
    appliedForce,
    mass,
    frictionEnabled,
    frictionForce
  );

  // Track user slider interaction
  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
    setter(value);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  // Reset simulation block position & velocity
  const handleResetPosition = () => {
    setPositionX(150);
    setVelocityX(0);
  };

  // Animation Loop for non-reduced motion
  useEffect(() => {
    if (reducedMotion) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();

    const updatePhysics = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Calculate continuous movement along a 600px boundary (100px to 500px)
      if (physics.acceleration !== 0) {
        setVelocityX(prevV => {
          let newV = prevV + physics.acceleration * dt * 20; // scaled
          // Limit max speed
          if (newV > 120) newV = 120;
          if (newV < -120) newV = -120;
          return newV;
        });

        setPositionX(prevX => {
          let nextX = prevX + velocityX * dt;
          if (nextX > 500) {
            nextX = 100; // Loop back
          } else if (nextX < 100) {
            nextX = 500;
          }
          return nextX;
        });
      } else {
        // Decelerate smoothly to stop
        setVelocityX(prevV => prevV * 0.9);
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [physics.acceleration, velocityX, reducedMotion]);

  // Options for prediction challenge
  const challengeOptions = [
    { id: 'double', label: 'দ্বিগুণ হবে' },
    { id: 'half', label: 'অর্ধেক হবে', isCorrect: true },
    { id: 'same', label: 'অপরিবর্তিত থাকবে' },
    { id: 'zero', label: 'শূন্য হবে' }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-4 md:p-8 space-y-6 animate-in fade-in duration-200">
      
      {/* HEADER BAR */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              ভিজ্যুয়াল ল্যাব
            </span>
            <span className="text-xs text-slate-400 font-bold bg-slate-800/80 px-2.5 py-1 rounded-lg">
              Force, Mass & Acceleration
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            বল, ভর ও ত্বরণ (Force, Mass & Acceleration)
          </h1>
          <p className="text-xs text-slate-400">
            পদার্থবিজ্ঞান ১ম পত্র — অধ্যায় ৪: নিউটনীয় বলবিদ্যা
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Reduced Motion Toggle */}
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              reducedMotion
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="গতিশীল অ্যানিমেশন বন্ধ করে স্থির মোডে দেখুন"
          >
            <Eye className="w-4 h-4" />
            <span>হ্রাসকৃত মোশন {reducedMotion ? '(চালু)' : ''}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: SIMULATION CANVAS & FORMULA (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* SIMULATION AREA */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-cyan-400 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                সিমুলেশন ট্র্যাক (Track Simulation)
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                  শিক্ষার জন্য সরলীকৃত মডেল
                </span>
                <button
                  onClick={handleResetPosition}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                  title="অবস্থান রিসেট করুন"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SVG TRACK & OBJECT */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-x-auto">
              <svg
                viewBox="0 0 600 240"
                className="w-full h-auto min-w-[500px] select-none"
                aria-label="Physics object simulation showing forces and acceleration"
              >
                {/* Background Grid Lines */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
                <rect width="600" height="240" fill="url(#grid)" rx="12" />

                {/* Ground Track */}
                <line x1="40" y1="180" x2="560" y2="180" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                
                {/* Friction Hatching on Track */}
                {frictionEnabled && (
                  <path
                    d="M 50 180 L 40 190 M 100 180 L 90 190 M 150 180 L 140 190 M 200 180 L 190 190 M 250 180 L 240 190 M 300 180 L 290 190 M 350 180 L 340 190 M 400 180 L 390 190 M 450 180 L 440 190 M 500 180 L 490 190 M 550 180 L 540 190"
                    stroke="#d97706"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                )}

                {/* Track Distance Markers */}
                <text x="50" y="208" fill="#64748b" fontSize="10" textAnchor="middle">0m</text>
                <text x="175" y="208" fill="#64748b" fontSize="10" textAnchor="middle">5m</text>
                <text x="300" y="208" fill="#64748b" fontSize="10" textAnchor="middle">10m</text>
                <text x="425" y="208" fill="#64748b" fontSize="10" textAnchor="middle">15m</text>
                <text x="550" y="208" fill="#64748b" fontSize="10" textAnchor="middle">20m</text>

                {/* OBJECT BLOCK */}
                {(() => {
                  const currentX = reducedMotion ? 300 : positionX;
                  const objectWidth = Math.min(60 + mass * 2, 100);
                  const objectHeight = Math.min(50 + mass * 1.5, 80);
                  const objectY = 180 - objectHeight;

                  const appliedArrowLen = appliedForce * 1.5;
                  const frictionArrowLen = (frictionEnabled ? Math.min(frictionForce, appliedForce) : 0) * 1.5;

                  return (
                    <g transform={`translate(${currentX}, 0)`}>
                      {/* Movable Block */}
                      <rect
                        x={-objectWidth / 2}
                        y={objectY}
                        width={objectWidth}
                        height={objectHeight}
                        rx="10"
                        fill="#0f172a"
                        stroke="#06b6d4"
                        strokeWidth="2.5"
                        className="transition-all duration-75"
                      />

                      {/* Block Mass Label */}
                      <text
                        x="0"
                        y={objectY + objectHeight / 2 + 4}
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        m = {mass} kg
                      </text>

                      {/* Applied Force Arrow (Cyan, Right) */}
                      {appliedForce > 0 && (
                        <g transform={`translate(${objectWidth / 2}, ${objectY + objectHeight / 2})`}>
                          <line
                            x1="0"
                            y1="0"
                            x2={appliedArrowLen}
                            y2="0"
                            stroke="#22d3ee"
                            strokeWidth="3.5"
                            strokeDasharray={reducedMotion ? "none" : "none"}
                          />
                          <polygon
                            points={`${appliedArrowLen},-5 ${appliedArrowLen + 8},0 ${appliedArrowLen},5`}
                            fill="#22d3ee"
                          />
                          <text
                            x={appliedArrowLen / 2}
                            y="-8"
                            fill="#22d3ee"
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            Fₚ = {appliedForce} N
                          </text>
                        </g>
                      )}

                      {/* Friction Force Arrow (Amber, Left) */}
                      {frictionEnabled && frictionForce > 0 && (
                        <g transform={`translate(${-objectWidth / 2}, ${objectY + objectHeight / 2})`}>
                          <line
                            x1="0"
                            y1="0"
                            x2={-frictionArrowLen}
                            y2="0"
                            stroke="#f59e0b"
                            strokeWidth="3.5"
                          />
                          <polygon
                            points={`${-frictionArrowLen},-5 ${-frictionArrowLen - 8},0 ${-frictionArrowLen},5`}
                            fill="#f59e0b"
                          />
                          <text
                            x={-frictionArrowLen / 2}
                            y="-8"
                            fill="#f59e0b"
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            F_f = {Math.min(frictionForce, appliedForce)} N
                          </text>
                        </g>
                      )}

                      {/* Acceleration / Net Force Indicator Arrow Above Block */}
                      {physics.netForce > 0 ? (
                        <g transform={`translate(0, ${objectY - 25})`}>
                          <line x1="-30" y1="0" x2="30" y2="0" stroke="#10b981" strokeWidth="3" />
                          <polygon points="30,-4 38,0 30,4" fill="#10b981" />
                          <text x="0" y="-8" fill="#10b981" fontSize="11" fontWeight="extrabold" textAnchor="middle">
                            a = {physics.acceleration} m/s² →
                          </text>
                        </g>
                      ) : physics.netForce < 0 ? (
                        <g transform={`translate(0, ${objectY - 25})`}>
                          <line x1="30" y1="0" x2="-30" y2="0" stroke="#f43f5e" strokeWidth="3" />
                          <polygon points="-30,-4 -38,0 -30,4" fill="#f43f5e" />
                          <text x="0" y="-8" fill="#f43f5e" fontSize="11" fontWeight="extrabold" textAnchor="middle">
                            a = {physics.acceleration} m/s² ←
                          </text>
                        </g>
                      ) : (
                        <g transform={`translate(0, ${objectY - 20})`}>
                          <rect x="-70" y="-14" width="140" height="20" rx="6" fill="#1e293b" stroke="#475569" />
                          <text x="0" y="0" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
                            নিট বল শূন্য — ত্বরণ নেই
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* LIVE VALUES BAR */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-0.5">
                <span className="text-slate-400 text-[11px] block font-bold">প্রযুক্ত বল (Fₚ)</span>
                <span className="text-cyan-400 font-extrabold text-sm">{appliedForce} N</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-0.5">
                <span className="text-slate-400 text-[11px] block font-bold">ঘর্ষণ বল (F_f)</span>
                <span className="text-amber-400 font-extrabold text-sm">
                  {frictionEnabled ? Math.min(frictionForce, appliedForce) : 0} N
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-0.5">
                <span className="text-slate-400 text-[11px] block font-bold">নিট বল (Fₙₑₜ)</span>
                <span className={`font-extrabold text-sm ${physics.netForce === 0 ? 'text-slate-400' : 'text-emerald-400'}`}>
                  {physics.netForce} N
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-0.5">
                <span className="text-slate-400 text-[11px] block font-bold">ভর (m)</span>
                <span className="text-white font-extrabold text-sm">{mass} kg</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-slate-400 text-[11px] block font-bold">ত্বরণ (a)</span>
                <span className="text-violet-400 font-extrabold text-sm">{physics.acceleration} m/s²</span>
              </div>
            </div>

          </div>

          {/* FORMULA PANEL */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl space-y-3">
            <h3 className="text-xs font-extrabold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              গাণিতিক সমীকরণ ও সূত্র (Formulas)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-sans text-[11px] font-bold block">
                  ১. নিট বল (Net Force)
                </span>
                <div className="text-cyan-300 font-bold text-sm">
                  Fₙₑₜ = Fₐₚₚₗᵢₑd − F_friction
                </div>
                <div className="text-slate-400 font-sans text-[11px]">
                  = {appliedForce} N − {frictionEnabled ? Math.min(frictionForce, appliedForce) : 0} N = <span className="text-white font-bold">{physics.netForce} N</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-sans text-[11px] font-bold block">
                  ২. নিউটনের দ্বিতীয় সূত্র (Acceleration)
                </span>
                <div className="text-violet-300 font-bold text-sm">
                  a = Fₙₑₜ / m
                </div>
                <div className="text-slate-400 font-sans text-[11px]">
                  = {physics.netForce} N / {mass} kg = <span className="text-white font-bold">{physics.acceleration} m/s²</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CONTROLS & CHALLENGE (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* CONTROLS CARD */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-5">
            <h3 className="text-sm font-extrabold text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                সিমুলেশন কন্ট্রোল (Controls)
              </span>
            </h3>

            {/* Slider 1: Applied Force */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="applied-force-slider" className="font-bold text-slate-200">
                  ১. প্রযুক্ত বল (Applied Force):
                </label>
                <span className="font-extrabold text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  {appliedForce} N
                </span>
              </div>
              <input
                id="applied-force-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                value={appliedForce}
                onChange={(e) => handleSliderChange(setAppliedForce, Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
                aria-label="Applied force slider in Newtons"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>0 N</span>
                <span>50 N</span>
                <span>100 N</span>
              </div>
            </div>

            {/* Slider 2: Mass */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="mass-slider" className="font-bold text-slate-200">
                  ২. বস্তুর ভর (Mass):
                </label>
                <span className="font-extrabold text-white bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  {mass} kg
                </span>
              </div>
              <input
                id="mass-slider"
                type="range"
                min="1"
                max="20"
                step="1"
                value={mass}
                onChange={(e) => handleSliderChange(setMass, Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
                aria-label="Object mass slider in kilograms"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>1 kg</span>
                <span>10 kg</span>
                <span>20 kg</span>
              </div>
            </div>

            {/* Toggle 3 & Slider 4: Friction */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label htmlFor="friction-toggle" className="text-xs font-bold text-slate-200 flex items-center gap-2 cursor-pointer">
                  <span>ঘর্ষণ চালু করুন (Enable Friction)</span>
                </label>
                <input
                  id="friction-toggle"
                  type="checkbox"
                  checked={frictionEnabled}
                  onChange={(e) => handleSliderChange(setFrictionEnabled, e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer rounded"
                  aria-label="Toggle friction"
                />
              </div>

              {frictionEnabled && (
                <div className="space-y-2 pl-2 border-l-2 border-amber-500/40 animate-in fade-in">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="friction-force-slider" className="font-bold text-amber-300">
                      ঘর্ষণ বল (Friction Force):
                    </label>
                    <span className="font-extrabold text-amber-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {frictionForce} N
                    </span>
                  </div>
                  <input
                    id="friction-force-slider"
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={frictionForce}
                    onChange={(e) => handleSliderChange(setFrictionForce, Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                    aria-label="Friction force slider in Newtons"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                    <span>0 N</span>
                    <span>20 N</span>
                    <span>40 N</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PREDICTION CHALLENGE CARD */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-amber-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                ধারণাগত চ্যালেঞ্জ (Prediction Challenge)
              </h3>
              {hasInteracted && (
                <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-md font-bold">
                  সিমুলেশন অভিজ্ঞতা
                </span>
              )}
            </div>

            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              প্রশ্ন: যদি ভর দ্বিগুণ করা হয় এবং নিট বল একই থাকে, ত্বরণ কী হবে?
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {challengeOptions.map((opt) => {
                const isSelected = selectedAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedAnswer(opt.id)}
                    className={`p-3 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Feedback message */}
            {selectedAnswer && (
              <div className={`p-3.5 rounded-xl border text-xs font-semibold leading-relaxed animate-in fade-in ${
                selectedAnswer === 'half'
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950 border-amber-500/40 text-amber-300'
              }`}>
                {selectedAnswer === 'half' ? (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>সঠিক! একই নিট বলের ক্ষেত্রে ভর বাড়লে ত্বরণ কমে।</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>আবার ভাবুন: a = F / m। বল একই থাকলে ভর বাড়লে ত্বরণ কমে।</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RELATED PRACTICE BUTTON */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              এখন অনুশীলন করুন
            </h3>

            {onStartQuizForTopic ? (
              <button
                onClick={() => onStartQuizForTopic('phys1_ch4_t2')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>নিউটনের দ্বিতীয় সূত্রের প্রশ্ন অনুশীলন করুন</span>
              </button>
            ) : (
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-center text-xs text-slate-400 font-medium">
                এই টপিকের অনুশীলনী প্রশ্ন প্রস্তুত হচ্ছে।
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
