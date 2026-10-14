import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { playSound } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { Star, CheckCircle, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface MissionRhombusKiteProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigate: (view: ActiveView) => void;
}

export const MissionRhombusKite: React.FC<MissionRhombusKiteProps> = ({
  onComplete,
  isCompleted,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'rhombus' | 'kite'>('rhombus');
  const [showBoundingBox, setShowBoundingBox] = useState(true);

  // Rhombus test
  const [rhombusAnswer, setRhombusAnswer] = useState('');
  const [rhombusFeedback, setRhombusFeedback] = useState<null | { correct: boolean; msg: string }>(null);

  // Kite test
  const [kiteAnswer, setKiteAnswer] = useState('');
  const [kiteFeedback, setKiteFeedback] = useState<null | { correct: boolean; msg: string }>(null);

  const handleCheckRhombus = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(rhombusAnswer.trim());
    if (val === 20) {
      playSound.success();
      setRhombusFeedback({
        correct: true,
        msg: 'Hebat, Arsitek Cilik! ½ × 10 cm × 4 cm = 20 cm². Ubin belah ketupat plaza terpasang indah!',
      });
      if (kiteFeedback?.correct || isCompleted) {
        onComplete();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
    } else {
      playSound.error();
      setRhombusFeedback({
        correct: false,
        msg: 'Belum pas. Rumus: ½ × diagonal 1 × diagonal 2. Coba hitung: ½ × 10 × 4 ya!',
      });
    }
  };

  const handleCheckKite = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(kiteAnswer.trim());
    if (val === 18) {
      playSound.success();
      setKiteFeedback({
        correct: true,
        msg: 'Luar biasa! ½ × 6 cm × 6 cm = 18 cm². Layang-layang festival siap terbang tinggi!',
      });
      onComplete();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } else {
      playSound.error();
      setKiteFeedback({
        correct: false,
        msg: 'Ayo coba lagi. Rumus: ½ × d1 × d2. Coba hitung: ½ × 6 × 6 ya!',
      });
    }
  };

  return (
    <div className="py-6 md:py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 md:p-6 rounded-3xl border border-emerald-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl font-black">
            🪁
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                Misi 05 Kota Impian
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-slate-500">Ubin & Festival</span>
            </div>
            <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900">
              Belah Ketupat & Layang-layang
            </h1>
          </div>
        </div>

        {/* Star Badge */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-xl shadow-xs">
              <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
              <span className="text-xs md:text-sm font-black">Lencana Misi 5 Diraih!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl">
              <Star className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold">Selesaikan untuk Lencana</span>
            </div>
          )}
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center justify-center p-1.5 bg-emerald-100/70 rounded-2xl max-w-md mx-auto border border-emerald-200">
        <button
          onClick={() => {
            playSound.click();
            setActiveTab('rhombus');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-heading font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'rhombus'
              ? 'bg-white text-emerald-950 shadow-sm'
              : 'text-emerald-800 hover:text-emerald-950'
          }`}
        >
          <span>🔷 1. Belah Ketupat (Ubin)</span>
          {rhombusFeedback?.correct && <CheckCircle className="w-4 h-4 text-emerald-600" />}
        </button>
        <button
          onClick={() => {
            playSound.click();
            setActiveTab('kite');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs md:text-sm font-heading font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'kite'
              ? 'bg-white text-emerald-950 shadow-sm'
              : 'text-emerald-800 hover:text-emerald-950'
          }`}
        >
          <span>🪁 2. Layang-layang (Festival)</span>
          {kiteFeedback?.correct && <CheckCircle className="w-4 h-4 text-emerald-600" />}
        </button>
      </div>

      {/* TAB 1: BELAH KETUPAT */}
      {activeTab === 'rhombus' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 3 Bagian Singkat */}
          <div className="lg:col-span-7 space-y-4">
            {/* Bagian 1: Rahasia Rumus */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-5 rounded-3xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-md">
                  Rahasia Rumus
                </span>
                <span className="text-xs font-semibold text-emerald-100">½ × Persegi Pembungkus</span>
              </div>
              <h2 className="font-heading font-black text-2xl tracking-tight">
                Luas Belah Ketupat = ½ × d₁ × d₂
              </h2>
              <p className="text-emerald-100 text-xs md:text-sm leading-relaxed">
                Diagonal 1 (garis horizontal) dan Diagonal 2 (garis vertikal) saling membelah tegak lurus. Luasnya tepat setengah dari persegi panjang pembungkusnya!
              </p>
            </div>

            {/* Bagian 2: Contoh */}
            <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-sm space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-700">
                Contoh Arsitek:
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                Ubin belah ketupat lantai plaza memiliki <strong>diagonal 1 = 6 cm</strong> dan <strong>diagonal 2 = 8 cm</strong>.
              </p>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 font-mono text-sm text-slate-800 flex items-center justify-between">
                <span>Luas = ½ × 6 cm × 8 cm</span>
                <span className="font-heading font-black text-emerald-600 text-base">= 24 cm²</span>
              </div>
            </div>

            {/* Bagian 3: Coba Kamu! */}
            <div className="bg-white p-5 rounded-3xl border-2 border-emerald-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md">
                  Coba Kamu!
                </span>
                <span className="text-xs text-slate-500">Ubin Motif Bintang</span>
              </div>

              <p className="text-sm font-semibold text-slate-800 leading-snug">
                Berapa luas ubin belah ketupat dengan diagonal <strong>10 cm dan 4 cm</strong>?
              </p>

              <form onSubmit={handleCheckRhombus} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={rhombusAnswer}
                    onChange={(e) => setRhombusAnswer(e.target.value)}
                    placeholder="Tulis angka luas..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500 font-mono font-bold text-sm"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                    cm²
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-black text-xs md:text-sm rounded-xl transition-all shadow-xs"
                >
                  Periksa Jawaban
                </button>
              </form>

              {rhombusFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    rhombusFeedback.correct
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}
                >
                  {rhombusFeedback.correct ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> : '💡'}
                  <span>{rhombusFeedback.msg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Accurate SVG Diagram */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-emerald-200 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-500 uppercase">
                  Denah Akurat Berlabel
                </span>
                <button
                  onClick={() => setShowBoundingBox(!showBoundingBox)}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg"
                >
                  {showBoundingBox ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showBoundingBox ? 'Sembunyikan Kotak' : 'Lihat Kotak Luar'}</span>
                </button>
              </div>

              {/* SVG Graphic with labels */}
              <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-center min-h-[220px]">
                <svg viewBox="0 0 240 220" className="w-full max-w-[240px] h-auto overflow-visible">
                  {/* Bounding Rectangle */}
                  {showBoundingBox && (
                    <rect
                      x="40"
                      y="30"
                      width="160"
                      height="160"
                      fill="#ECFDF5"
                      stroke="#A7F3D0"
                      strokeDasharray="4 4"
                      strokeWidth="2"
                      rx="4"
                    />
                  )}

                  {/* Rhombus Shape */}
                  <polygon
                    points="120,30 200,110 120,190 40,110"
                    fill="#A7F3D0"
                    stroke="#059669"
                    strokeWidth="3"
                  />

                  {/* Diagonal 1 (horizontal, d1 = 6 cm) */}
                  <line
                    x1="40"
                    y1="110"
                    x2="200"
                    y2="110"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                  />

                  {/* Diagonal 2 (vertical, d2 = 8 cm) */}
                  <line
                    x1="120"
                    y1="30"
                    x2="120"
                    y2="190"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                  />

                  {/* Right-angle intersection marker */}
                  <path
                    d="M 120 98 L 132 98 L 132 110"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="1.5"
                  />

                  {/* Labels */}
                  <text
                    x="120"
                    y="105"
                    textAnchor="middle"
                    fill="#B45309"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    d₁ = 6 cm
                  </text>
                  <text
                    x="128"
                    y="65"
                    textAnchor="start"
                    fill="#1D4ED8"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    d₂ = 8 cm
                  </text>
                </svg>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center justify-between">
                <span>Persegi Pembungkus: 6 × 8 = 48 cm²</span>
                <span className="text-slate-400">÷ 2</span>
              </div>
              <div className="font-bold text-emerald-700 flex items-center justify-between">
                <span>Luas Belah Ketupat: ½ × 6 × 8 =</span>
                <strong className="text-emerald-800 font-heading text-sm">24 cm²</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LAYANG-LAYANG */}
      {activeTab === 'kite' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 3 Bagian Singkat */}
          <div className="lg:col-span-7 space-y-4">
            {/* Bagian 1: Rahasia Rumus */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-5 rounded-3xl shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-md">
                  Rahasia Rumus
                </span>
                <span className="text-xs font-semibold text-teal-100">Rumus Kembar dengan Belah Ketupat</span>
              </div>
              <h2 className="font-heading font-black text-2xl tracking-tight">
                Luas Layang-layang = ½ × d₁ × d₂
              </h2>
              <p className="text-teal-100 text-xs md:text-sm leading-relaxed">
                Sama seperti belah ketupat, diagonal layang-layang saling tegak lurus, sehingga rumusnya persis sama: setengah hasil kali kedua diagonalnya!
              </p>
            </div>

            {/* Bagian 2: Contoh */}
            <div className="bg-white p-5 rounded-3xl border border-teal-200 shadow-sm space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-teal-700">
                Contoh Arsitek:
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                Layang-layang festival udara kota memiliki <strong>diagonal 1 = 8 cm</strong> dan <strong>diagonal 2 = 5 cm</strong>.
              </p>
              <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200/80 font-mono text-sm text-slate-800 flex items-center justify-between">
                <span>Luas = ½ × 8 cm × 5 cm</span>
                <span className="font-heading font-black text-teal-600 text-base">= 20 cm²</span>
              </div>
            </div>

            {/* Bagian 3: Coba Kamu! */}
            <div className="bg-white p-5 rounded-3xl border-2 border-teal-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-md">
                  Coba Kamu!
                </span>
                <span className="text-xs text-slate-500">Layang-layang Hias</span>
              </div>

              <p className="text-sm font-semibold text-slate-800 leading-snug">
                Berapa luas layang-layang hias jika diagonalnya <strong>6 cm dan 6 cm</strong>?
              </p>

              <form onSubmit={handleCheckKite} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={kiteAnswer}
                    onChange={(e) => setKiteAnswer(e.target.value)}
                    placeholder="Tulis angka luas..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-teal-500 font-mono font-bold text-sm"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                    cm²
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-heading font-black text-xs md:text-sm rounded-xl transition-all shadow-xs"
                >
                  Periksa Jawaban
                </button>
              </form>

              {kiteFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    kiteFeedback.correct
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}
                >
                  {kiteFeedback.correct ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> : '💡'}
                  <span>{kiteFeedback.msg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Accurate SVG Diagram */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-teal-200 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-500 uppercase">
                  Denah Akurat Berlabel
                </span>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                  d₁ tegak lurus d₂
                </span>
              </div>

              {/* SVG Graphic with labels */}
              <div className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100 flex items-center justify-center min-h-[220px]">
                <svg viewBox="0 0 240 220" className="w-full max-w-[240px] h-auto overflow-visible">
                  {/* Kite Shape */}
                  {/* Top vertex: (120, 30), Left: (50, 90), Right: (190, 90), Bottom: (120, 195) */}
                  <polygon
                    points="120,30 190,90 120,195 50,90"
                    fill="#99F6E4"
                    stroke="#0D9488"
                    strokeWidth="3"
                  />

                  {/* Horizontal diagonal (d2 = 5 cm) */}
                  <line
                    x1="50"
                    y1="90"
                    x2="190"
                    y2="90"
                    stroke="#EA580C"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                  />

                  {/* Vertical diagonal (d1 = 8 cm) */}
                  <line
                    x1="120"
                    y1="30"
                    x2="120"
                    y2="195"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                  />

                  {/* Right-angle intersection marker */}
                  <path
                    d="M 120 78 L 132 78 L 132 90"
                    fill="none"
                    stroke="#0D9488"
                    strokeWidth="1.5"
                  />

                  {/* Labels */}
                  <text
                    x="120"
                    y="85"
                    textAnchor="middle"
                    fill="#C2410C"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    d₂ = 5 cm
                  </text>
                  <text
                    x="128"
                    y="145"
                    textAnchor="start"
                    fill="#1D4ED8"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    d₁ = 8 cm
                  </text>
                </svg>
              </div>
            </div>

            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-teal-950 flex items-center justify-between">
                <span>Hasil Kali Diagonal: 8 × 5 = 40 cm²</span>
                <span className="text-slate-400">÷ 2</span>
              </div>
              <div className="font-bold text-teal-700 flex items-center justify-between">
                <span>Luas Layang-layang: ½ × 8 × 5 =</span>
                <strong className="text-teal-800 font-heading text-sm">20 cm²</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-4');
          }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Misi 4</span>
        </button>

        <button
          onClick={() => {
            playSound.click();
            onNavigate('secret-table');
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-black text-xs md:text-sm rounded-xl shadow-xs transition-all"
        >
          <span>Lanjut ke Tabel Rahasia Arsitek</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
