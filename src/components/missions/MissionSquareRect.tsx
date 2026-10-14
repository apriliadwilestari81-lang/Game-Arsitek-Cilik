import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { playSound } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { Star, CheckCircle, ArrowRight, ArrowLeft, Lightbulb, Sparkles } from 'lucide-react';

interface MissionSquareRectProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigate: (view: ActiveView) => void;
}

export const MissionSquareRect: React.FC<MissionSquareRectProps> = ({
  onComplete,
  isCompleted,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'square' | 'rect'>('square');

  // Interactive inputs for "Coba Kamu!"
  const [squareAnswer, setSquareAnswer] = useState('');
  const [squareFeedback, setSquareFeedback] = useState<null | { correct: boolean; msg: string }>(null);

  const [rectAnswer, setRectAnswer] = useState('');
  const [rectFeedback, setRectFeedback] = useState<null | { correct: boolean; msg: string }>(null);

  // Dynamic slider for sandbox
  const [customSquareSide, setCustomSquareSide] = useState(5);
  const [customRectLength, setCustomRectLength] = useState(6);
  const [customRectWidth, setCustomRectWidth] = useState(4);

  const handleCheckSquare = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(squareAnswer.trim());
    if (val === 36) {
      playSound.success();
      setSquareFeedback({
        correct: true,
        msg: 'Hebat, Arsitek Cilik! Sisi 6 m × 6 m = 36 m². Taman bermain siap dibangun!',
      });
      if (rectFeedback?.correct || isCompleted) {
        onComplete();
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      playSound.error();
      setSquareFeedback({
        correct: false,
        msg: 'Hampir tepat! Ingat: luas persegi = sisi × sisi. Coba kalikan 6 × 6 ya!',
      });
    }
  };

  const handleCheckRect = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(rectAnswer.trim());
    if (val === 21) {
      playSound.success();
      setRectFeedback({
        correct: true,
        msg: 'Luar biasa! Panjang 7 m × lebar 3 m = 21 m². Kolam ikan siap diisi air!',
      });
      onComplete();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } else {
      playSound.error();
      setRectFeedback({
        correct: false,
        msg: 'Ayo coba lagi! Rumus persegi panjang = panjang × lebar. Coba kalikan 7 × 3 ya!',
      });
    }
  };

  return (
    <div className="py-6 md:py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
      {/* Top Breadcrumb & Mission Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 md:p-6 rounded-3xl border border-amber-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl font-black">
            🌳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                Misi 01 Kota Impian
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-slate-500">Taman & Kolam</span>
            </div>
            <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900">
              Persegi & Persegi Panjang
            </h1>
          </div>
        </div>

        {/* Corner Star Badge */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-xl shadow-xs">
              <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
              <span className="text-xs md:text-sm font-black">Lencana Misi 1 Diraih!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl">
              <Star className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold">Selesaikan untuk Lencana</span>
            </div>
          )}
        </div>
      </div>

      {/* Tab Switcher for 2 Shapes */}
      <div className="flex items-center justify-center p-1.5 bg-amber-100/70 rounded-2xl max-w-md mx-auto border border-amber-200">
        <button
          onClick={() => {
            playSound.click();
            setActiveTab('square');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-heading font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'square'
              ? 'bg-white text-amber-950 shadow-sm'
              : 'text-amber-800 hover:text-amber-950'
          }`}
        >
          <span>🌻 1. Persegi (Taman Kota)</span>
          {squareFeedback?.correct && <CheckCircle className="w-4 h-4 text-emerald-600" />}
        </button>
        <button
          onClick={() => {
            playSound.click();
            setActiveTab('rect');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-heading font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'rect'
              ? 'bg-white text-sky-950 shadow-sm'
              : 'text-sky-800 hover:text-sky-950'
          }`}
        >
          <span>🏊 2. Persegi Panjang (Kolam)</span>
          {rectFeedback?.correct && <CheckCircle className="w-4 h-4 text-emerald-600" />}
        </button>
      </div>

      {/* Content for TAB 1: PERSEGI */}
      {activeTab === 'square' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 3 Bagian Singkat */}
          <div className="lg:col-span-7 space-y-4">
            {/* Bagian 1: Rahasia Rumus */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-5 rounded-3xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-md">
                  Rahasia Rumus
                </span>
                <span className="text-xs font-semibold text-amber-100">Semua sisi sama panjang</span>
              </div>
              <h2 className="font-heading font-black text-2xl tracking-tight">
                Luas Persegi = sisi × sisi (s × s)
              </h2>
              <p className="text-amber-100 text-xs md:text-sm leading-relaxed">
                Karena keempat sisi persegi sama panjang, cukup kalikan panjang sisi dengan sisi itu sendiri.
              </p>
            </div>

            {/* Bagian 2: Contoh */}
            <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-amber-700">
                Contoh Arsitek:
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                Wali Kota ingin membangun taman bunga persegi dengan panjang <strong>sisi = 5 m</strong>.
              </p>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 font-mono text-sm text-slate-800 flex items-center justify-between">
                <span>Luas = 5 m × 5 m</span>
                <span className="font-heading font-black text-amber-600 text-base">= 25 m²</span>
              </div>
            </div>

            {/* Bagian 3: Coba Kamu! */}
            <div className="bg-white p-5 rounded-3xl border-2 border-amber-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md">
                  Coba Kamu!
                </span>
                <span className="text-xs text-slate-500">Taman Bermain Anak</span>
              </div>

              <p className="text-sm font-semibold text-slate-800 leading-snug">
                Berapa luas taman bermain persegi jika panjang sisinya <strong>6 m</strong>?
              </p>

              <form onSubmit={handleCheckSquare} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={squareAnswer}
                    onChange={(e) => setSquareAnswer(e.target.value)}
                    placeholder="Tulis angka luas..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-amber-500 font-mono font-bold text-sm"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                    m²
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-heading font-black text-xs md:text-sm rounded-xl transition-all shadow-xs"
                >
                  Periksa Jawaban
                </button>
              </form>

              {squareFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    squareFeedback.correct
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}
                >
                  {squareFeedback.correct ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> : '💡'}
                  <span>{squareFeedback.msg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Interactive Accurate SVG Diagram with Sliders */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-amber-200 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-500 uppercase">
                  Denah Akurat Berlabel
                </span>
                <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold">
                  s = {customSquareSide} m
                </span>
              </div>

              {/* Slider for experimenting */}
              <div className="mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>Ubah Ukuran Sisi Taman:</span>
                  <span className="text-amber-600 font-bold">{customSquareSide} meter</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="7"
                  value={customSquareSide}
                  onChange={(e) => setCustomSquareSide(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* SVG Graphic with labels */}
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100 flex items-center justify-center min-h-[220px]">
                <svg viewBox="0 0 240 220" className="w-full max-w-[240px] h-auto overflow-visible">
                  {/* Square Box */}
                  <rect
                    x="40"
                    y="30"
                    width={customSquareSide * 22}
                    height={customSquareSide * 22}
                    fill="#FDE68A"
                    stroke="#D97706"
                    strokeWidth="3"
                    rx="6"
                  />
                  {/* Internal Grid Lines to show tiles */}
                  {Array.from({ length: customSquareSide - 1 }).map((_, i) => (
                    <React.Fragment key={i}>
                      <line
                        x1={40 + (i + 1) * 22}
                        y1="30"
                        x2={40 + (i + 1) * 22}
                        y2={30 + customSquareSide * 22}
                        stroke="#F59E0B"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                      />
                      <line
                        x1="40"
                        y1={30 + (i + 1) * 22}
                        x2={40 + customSquareSide * 22}
                        y2={30 + (i + 1) * 22}
                        stroke="#F59E0B"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                      />
                    </React.Fragment>
                  ))}

                  {/* Top Label (sisi) */}
                  <text
                    x={40 + (customSquareSide * 22) / 2}
                    y="22"
                    textAnchor="middle"
                    fill="#92400E"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    s = {customSquareSide} m
                  </text>

                  {/* Right Label (sisi) */}
                  <text
                    x={50 + customSquareSide * 22}
                    y={30 + (customSquareSide * 22) / 2}
                    textAnchor="start"
                    fill="#92400E"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    s = {customSquareSide} m
                  </text>

                  {/* Center Area label */}
                  <rect
                    x={40 + (customSquareSide * 22) / 2 - 40}
                    y={30 + (customSquareSide * 22) / 2 - 12}
                    width="80"
                    height="24"
                    fill="white"
                    rx="4"
                    fillOpacity="0.9"
                  />
                  <text
                    x={40 + (customSquareSide * 22) / 2}
                    y={30 + (customSquareSide * 22) / 2 + 5}
                    textAnchor="middle"
                    fill="#B45309"
                    fontSize="11"
                    fontWeight="900"
                  >
                    L = {customSquareSide * customSquareSide} m²
                  </text>
                </svg>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-slate-700 flex items-center justify-between">
              <span>Luas = {customSquareSide} m × {customSquareSide} m =</span>
              <strong className="text-amber-700 font-heading text-sm">{customSquareSide * customSquareSide} m²</strong>
            </div>
          </div>
        </div>
      )}

      {/* Content for TAB 2: PERSEGI PANJANG */}
      {activeTab === 'rect' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 3 Bagian Singkat */}
          <div className="lg:col-span-7 space-y-4">
            {/* Bagian 1: Rahasia Rumus */}
            <div className="bg-gradient-to-br from-sky-500 to-sky-600 text-white p-5 rounded-3xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-md">
                  Rahasia Rumus
                </span>
                <span className="text-xs font-semibold text-sky-100">Panjang & Lebar Berbeda</span>
              </div>
              <h2 className="font-heading font-black text-2xl tracking-tight">
                Luas Persegi Panjang = panjang × lebar (p × l)
              </h2>
              <p className="text-sky-100 text-xs md:text-sm leading-relaxed">
                Panjang adalah ukuran sisi yang lebih panjang, dan lebar adalah sisi yang lebih pendek.
              </p>
            </div>

            {/* Bagian 2: Contoh */}
            <div className="bg-white p-5 rounded-3xl border border-sky-200 shadow-sm space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-sky-700">
                Contoh Arsitek:
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                Kolam renang kota memiliki <strong>panjang = 6 m</strong> dan <strong>lebar = 4 m</strong>.
              </p>
              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200/80 font-mono text-sm text-slate-800 flex items-center justify-between">
                <span>Luas = 6 m × 4 m</span>
                <span className="font-heading font-black text-sky-600 text-base">= 24 m²</span>
              </div>
            </div>

            {/* Bagian 3: Coba Kamu! */}
            <div className="bg-white p-5 rounded-3xl border-2 border-sky-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded-md">
                  Coba Kamu!
                </span>
                <span className="text-xs text-slate-500">Kolam Ikan Hias</span>
              </div>

              <p className="text-sm font-semibold text-slate-800 leading-snug">
                Berapa luas kolam ikan jika berukuran <strong>panjang 7 m dan lebar 3 m</strong>?
              </p>

              <form onSubmit={handleCheckRect} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={rectAnswer}
                    onChange={(e) => setRectAnswer(e.target.value)}
                    placeholder="Tulis angka luas..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-sky-500 font-mono font-bold text-sm"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                    m²
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-heading font-black text-xs md:text-sm rounded-xl transition-all shadow-xs"
                >
                  Periksa Jawaban
                </button>
              </form>

              {rectFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    rectFeedback.correct
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}
                >
                  {rectFeedback.correct ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> : '💡'}
                  <span>{rectFeedback.msg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Accurate SVG Diagram with Sliders */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-sky-200 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-500 uppercase">
                  Denah Akurat Berlabel
                </span>
                <span className="text-xs font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md font-bold">
                  {customRectLength} m × {customRectWidth} m
                </span>
              </div>

              {/* Sliders */}
              <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>Panjang (p):</span>
                    <span className="text-sky-600 font-bold">{customRectLength} meter</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="8"
                    value={customRectLength}
                    onChange={(e) => setCustomRectLength(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>Lebar (l):</span>
                    <span className="text-emerald-600 font-bold">{customRectWidth} meter</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="5"
                    value={customRectWidth}
                    onChange={(e) => setCustomRectWidth(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* SVG Graphic with labels */}
              <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100 flex items-center justify-center min-h-[200px]">
                <svg viewBox="0 0 250 180" className="w-full max-w-[240px] h-auto overflow-visible">
                  <rect
                    x="25"
                    y="30"
                    width={customRectLength * 22}
                    height={customRectWidth * 22}
                    fill="#BAE6FD"
                    stroke="#0284C7"
                    strokeWidth="3"
                    rx="6"
                  />

                  {/* Internal grid lines */}
                  {Array.from({ length: customRectLength - 1 }).map((_, i) => (
                    <line
                      key={`col-${i}`}
                      x1={25 + (i + 1) * 22}
                      y1="30"
                      x2={25 + (i + 1) * 22}
                      y2={30 + customRectWidth * 22}
                      stroke="#38BDF8"
                      strokeDasharray="2 2"
                      strokeWidth="1"
                    />
                  ))}
                  {Array.from({ length: customRectWidth - 1 }).map((_, j) => (
                    <line
                      key={`row-${j}`}
                      x1="25"
                      y1={30 + (j + 1) * 22}
                      x2={25 + customRectLength * 22}
                      y2={30 + (j + 1) * 22}
                      stroke="#38BDF8"
                      strokeDasharray="2 2"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Top Label (panjang) */}
                  <text
                    x={25 + (customRectLength * 22) / 2}
                    y="20"
                    textAnchor="middle"
                    fill="#0369A1"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    p = {customRectLength} m
                  </text>

                  {/* Right Label (lebar) */}
                  <text
                    x={35 + customRectLength * 22}
                    y={30 + (customRectWidth * 22) / 2}
                    textAnchor="start"
                    fill="#0369A1"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    l = {customRectWidth} m
                  </text>

                  {/* Center Area label */}
                  <rect
                    x={25 + (customRectLength * 22) / 2 - 40}
                    y={30 + (customRectWidth * 22) / 2 - 12}
                    width="80"
                    height="24"
                    fill="white"
                    rx="4"
                    fillOpacity="0.95"
                  />
                  <text
                    x={25 + (customRectLength * 22) / 2}
                    y={30 + (customRectWidth * 22) / 2 + 5}
                    textAnchor="middle"
                    fill="#0284C7"
                    fontSize="11"
                    fontWeight="900"
                  >
                    L = {customRectLength * customRectWidth} m²
                  </text>
                </svg>
              </div>
            </div>

            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 text-xs text-slate-700 flex items-center justify-between">
              <span>Luas = {customRectLength} m × {customRectWidth} m =</span>
              <strong className="text-sky-700 font-heading text-sm">{customRectLength * customRectWidth} m²</strong>
            </div>
          </div>
        </div>
      )}

      {/* Mission Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => {
            playSound.click();
            onNavigate('intro-area');
          }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Alat Luas</span>
        </button>

        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-2');
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-heading font-black text-xs md:text-sm rounded-xl shadow-xs transition-all"
        >
          <span>Lanjut ke Misi 2: Atap Segitiga</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
