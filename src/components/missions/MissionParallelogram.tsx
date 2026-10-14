import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { playSound } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { Star, CheckCircle, ArrowRight, ArrowLeft, MoveHorizontal } from 'lucide-react';

interface MissionParallelogramProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigate: (view: ActiveView) => void;
}

export const MissionParallelogram: React.FC<MissionParallelogramProps> = ({
  onComplete,
  isCompleted,
  onNavigate,
}) => {
  const [shiftProgress, setShiftProgress] = useState(0); // 0 (original parallelogram) to 100 (complete rectangle)
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<null | { correct: boolean; msg: string }>(null);

  const handleToggleShift = () => {
    playSound.click();
    setShiftProgress((prev) => (prev > 0 ? 0 : 100));
  };

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(userAnswer.trim());
    if (val === 15) {
      playSound.success();
      setFeedback({
        correct: true,
        msg: 'Hebat, Arsitek Cilik! Alas 5 cm × tinggi 3 cm = 15 cm². Jendela ventilasi terpasang rapi!',
      });
      onComplete();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } else {
      playSound.error();
      setFeedback({
        correct: false,
        msg: 'Hampir tepat! Ingat rumus jajar genjang: alas × tinggi. Kalikan 5 × 3 ya!',
      });
    }
  };

  // Dimensions for SVG:
  // Height = 100, Base = 140, Slant offset dx = 40
  const dx = 40;
  const currentDx = dx + (140 * shiftProgress) / 100;

  return (
    <div className="py-6 md:py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 md:p-6 rounded-3xl border border-orange-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-400 text-orange-950 flex items-center justify-center text-2xl font-black">
            🪟
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-orange-600">
                Misi 03 Kota Impian
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-slate-500">Jendela Menara Kota</span>
            </div>
            <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900">
              Jendela Jajar Genjang
            </h1>
          </div>
        </div>

        {/* Star Badge */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-xl shadow-xs">
              <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
              <span className="text-xs md:text-sm font-black">Lencana Misi 3 Diraih!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl">
              <Star className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold">Selesaikan untuk Lencana</span>
            </div>
          )}
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 3 Bagian Singkat */}
        <div className="lg:col-span-7 space-y-4">
          {/* Bagian 1: Rahasia Rumus */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-5 rounded-3xl shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-md">
                Rahasia Rumus
              </span>
              <span className="text-xs font-semibold text-orange-100">Potong & Geser Segitiga</span>
            </div>
            <h2 className="font-heading font-black text-2xl tracking-tight">
              Luas Jajar Genjang = alas × tinggi (a × t)
            </h2>
            <p className="text-orange-100 text-xs md:text-sm leading-relaxed">
              Jika potongan segitiga di sisi kiri dipotong dan digeser ke sisi kanan, jajar genjang akan berubah menjadi persegi panjang utuh!
            </p>
          </div>

          {/* Bagian 2: Contoh */}
          <div className="bg-white p-5 rounded-3xl border border-orange-200 shadow-sm space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-orange-700">
              Contoh Arsitek:
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              Jendela kantor arsitek berukuran <strong>alas = 6 cm</strong> dan <strong>tinggi tegak lurus = 4 cm</strong>.
            </p>
            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200/80 font-mono text-sm text-slate-800 flex items-center justify-between">
              <span>Luas = 6 cm × 4 cm</span>
              <span className="font-heading font-black text-orange-600 text-base">= 24 cm²</span>
            </div>
          </div>

          {/* Bagian 3: Coba Kamu! */}
          <div className="bg-white p-5 rounded-3xl border-2 border-orange-300 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-900 px-2.5 py-0.5 rounded-md">
                Coba Kamu!
              </span>
              <span className="text-xs text-slate-500">Kaca Ventilasi Udara</span>
            </div>

            <p className="text-sm font-semibold text-slate-800 leading-snug">
              Berapa luas kaca ventilasi jajar genjang jika <strong>alas = 5 cm</strong> dan <strong>tinggi = 3 cm</strong>?
            </p>

            <form onSubmit={handleCheckAnswer} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Tulis angka luas..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-orange-500 font-mono font-bold text-sm"
                />
                <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                  cm²
                </span>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-heading font-black text-xs md:text-sm rounded-xl transition-all shadow-xs"
              >
                Periksa Jawaban
              </button>
            </form>

            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  feedback.correct
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                {feedback.correct ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> : '💡'}
                <span>{feedback.msg}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive Cut-and-Slide Visualizer */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-orange-200 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-slate-500 uppercase">
                Laboratorium Potong & Geser
              </span>
              <button
                onClick={handleToggleShift}
                className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-lg text-xs font-black transition-colors"
              >
                <MoveHorizontal className="w-3.5 h-3.5 text-orange-600" />
                <span>{shiftProgress === 100 ? 'Kembalikan Asli' : 'Potong & Geser!'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Geser penggeser di bawah ini untuk melihat potongan segitiga kiri berjalan mengisi sisi kanan hingga menjadi persegi panjang!
            </p>

            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={shiftProgress}
                onChange={(e) => setShiftProgress(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* SVG Visualizer */}
            <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100 flex items-center justify-center min-h-[220px]">
              <svg viewBox="0 0 280 200" className="w-full max-w-[280px] h-auto overflow-visible">
                {/* Main Trapeze body of parallelogram that stays */}
                <polygon
                  points="65,40 185,40 145,140 65,140"
                  fill="#FED7AA"
                  stroke="#EA580C"
                  strokeWidth="2.5"
                />

                {/* The Cut Triangle: slides from left (x=25) to right (x=185) */}
                <polygon
                  points={`
                    ${25 + (120 * shiftProgress) / 100},140 
                    ${65 + (120 * shiftProgress) / 100},40 
                    ${65 + (120 * shiftProgress) / 100},140
                  `}
                  fill="#FDBA74"
                  stroke="#C2410C"
                  strokeWidth="2.5"
                />

                {/* Perpendicular Height dotted line */}
                <line
                  x1="65"
                  y1="40"
                  x2="65"
                  y2="140"
                  stroke="#DC2626"
                  strokeDasharray="3 3"
                  strokeWidth="2"
                />

                {/* Right-angle 90-degree square marker */}
                <path
                  d="M 65 128 L 77 128 L 77 140"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="1.8"
                />

                {/* Perpendicular height label */}
                <text
                  x="72"
                  y="92"
                  textAnchor="start"
                  fill="#DC2626"
                  fontSize="11"
                  fontWeight="bold"
                >
                  tinggi (t) = 4 cm
                </text>

                {/* Bottom Base label (alas) */}
                <text
                  x="105"
                  y="160"
                  textAnchor="middle"
                  fill="#9A3412"
                  fontSize="12"
                  fontWeight="bold"
                >
                  alas (a) = 6 cm
                </text>

                {/* Note about transformed rectangle */}
                {shiftProgress === 100 && (
                  <text
                    x="125"
                    y="25"
                    textAnchor="middle"
                    fill="#15803D"
                    fontSize="11"
                    fontWeight="900"
                  >
                    ✨ Jadi Persegi Panjang (6 × 4)!
                  </text>
                )}
              </svg>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-snug">
            ⚠️ <strong>Ingat Arsitek Cilik:</strong> Tinggi (<span className="text-red-600 font-bold">t</span>) selalu tegak lurus dengan alas (<span className="font-bold">a</span>), bukan sisi miringnya!
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-2');
          }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Misi 2</span>
        </button>

        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-4');
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-heading font-black text-xs md:text-sm rounded-xl shadow-xs transition-all"
        >
          <span>Lanjut ke Misi 4: Jembatan Trapesium</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
