import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { playSound } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { Star, CheckCircle, ArrowRight, ArrowLeft, Scissors } from 'lucide-react';

interface MissionTriangleProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigate: (view: ActiveView) => void;
}

export const MissionTriangle: React.FC<MissionTriangleProps> = ({
  onComplete,
  isCompleted,
  onNavigate,
}) => {
  const [splitSeparation, setSplitSeparation] = useState(0); // 0 (bersatu) to 30 (terpisah)
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<null | { correct: boolean; msg: string }>(null);

  const handleSplitToggle = () => {
    playSound.click();
    setSplitSeparation((prev) => (prev > 0 ? 0 : 25));
  };

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(userAnswer.trim());
    if (val === 20) {
      playSound.success();
      setFeedback({
        correct: true,
        msg: 'Hebat sekali! ½ × 8 cm × 5 cm = 20 cm². Atap gazebo impian kokoh terpasang!',
      });
      onComplete();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } else {
      playSound.error();
      setFeedback({
        correct: false,
        msg: 'Belum pas. Rumus segitiga: ½ × alas × tinggi. Hitung: ½ × 8 × 5 ya!',
      });
    }
  };

  return (
    <div className="py-6 md:py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 md:p-6 rounded-3xl border border-sky-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-400 text-sky-950 flex items-center justify-center text-2xl font-black">
            🏠
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-sky-600">
                Misi 02 Kota Impian
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-slate-500">Atap Rumah & Gedung</span>
            </div>
            <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900">
              Atap Segitiga
            </h1>
          </div>
        </div>

        {/* Star Badge */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-xl shadow-xs">
              <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
              <span className="text-xs md:text-sm font-black">Lencana Misi 2 Diraih!</span>
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
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 text-white p-5 rounded-3xl shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-md">
                Rahasia Rumus
              </span>
              <span className="text-xs font-semibold text-sky-100">½ Persegi Panjang</span>
            </div>
            <h2 className="font-heading font-black text-2xl tracking-tight">
              Luas Segitiga = ½ × alas × tinggi (½ × a × t)
            </h2>
            <p className="text-sky-100 text-xs md:text-sm leading-relaxed">
              Jika sebuah persegi panjang dipotong diagonal menjadi dua, terbentuklah 2 segitiga yang sama persis! Maka luas 1 segitiga adalah setengahnya.
            </p>
          </div>

          {/* Bagian 2: Contoh */}
          <div className="bg-white p-5 rounded-3xl border border-sky-200 shadow-sm space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-sky-700">
              Contoh Arsitek:
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              Atap rumah bertingkat memiliki <strong>alas = 6 cm</strong> dan <strong>tinggi = 4 cm</strong>.
            </p>
            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200/80 font-mono text-sm text-slate-800 flex items-center justify-between">
              <span>Luas = ½ × 6 cm × 4 cm</span>
              <span className="font-heading font-black text-sky-600 text-base">= 12 cm²</span>
            </div>
          </div>

          {/* Bagian 3: Coba Kamu! */}
          <div className="bg-white p-5 rounded-3xl border-2 border-sky-300 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded-md">
                Coba Kamu!
              </span>
              <span className="text-xs text-slate-500">Atap Gazebo Taman</span>
            </div>

            <p className="text-sm font-semibold text-slate-800 leading-snug">
              Berapa luas atap gazebo jika <strong>alas = 8 cm</strong> dan <strong>tinggi = 5 cm</strong>?
            </p>

            <form onSubmit={handleCheckAnswer} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Tulis angka luas..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-sky-500 font-mono font-bold text-sm"
                />
                <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                  cm²
                </span>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-heading font-black text-xs md:text-sm rounded-xl transition-all shadow-xs"
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

        {/* Right: Interactive Visual Proof (Cut Diagonal Animation) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-sky-200 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-slate-500 uppercase">
                Laboratorium Pembongkaran
              </span>
              <button
                onClick={handleSplitToggle}
                className="flex items-center gap-1.5 px-3 py-1 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-lg text-xs font-black transition-colors"
              >
                <Scissors className="w-3.5 h-3.5 text-sky-600" />
                <span>{splitSeparation > 0 ? 'Satukan Kembali' : 'Potong Diagonal!'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Tekan tombol potong atau geser slider untuk melihat bagaimana persegi panjang terbelah menjadi 2 segitiga kembar!
            </p>

            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="35"
                value={splitSeparation}
                onChange={(e) => setSplitSeparation(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* SVG Interactive Visualizer */}
            <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100 flex items-center justify-center min-h-[220px]">
              <svg viewBox="0 0 260 210" className="w-full max-w-[260px] h-auto overflow-visible">
                {/* Full Outline dashed when separated */}
                {splitSeparation > 0 && (
                  <rect
                    x="30"
                    y="30"
                    width="180"
                    height="120"
                    fill="none"
                    stroke="#94A3B8"
                    strokeDasharray="4 4"
                    strokeWidth="1.5"
                    rx="4"
                  />
                )}

                {/* Triangle 1: Top-Left (slides up-left) */}
                <polygon
                  points={`
                    ${30 - splitSeparation * 0.5},${30 - splitSeparation * 0.5} 
                    ${210 - splitSeparation * 0.5},${30 - splitSeparation * 0.5} 
                    ${30 - splitSeparation * 0.5},${150 - splitSeparation * 0.5}
                  `}
                  fill="#FDE68A"
                  stroke="#D97706"
                  strokeWidth="2.5"
                />

                {/* Triangle 2: Bottom-Right (slides down-right) */}
                <polygon
                  points={`
                    ${210 + splitSeparation * 0.5},${30 + splitSeparation * 0.5} 
                    ${210 + splitSeparation * 0.5},${150 + splitSeparation * 0.5} 
                    ${30 + splitSeparation * 0.5},${150 + splitSeparation * 0.5}
                  `}
                  fill="#BAE6FD"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                />

                {/* Perpendicular 90-degree square symbol */}
                <path
                  d={`M ${30 - splitSeparation * 0.5} ${138 - splitSeparation * 0.5} L ${42 - splitSeparation * 0.5} ${138 - splitSeparation * 0.5} L ${42 - splitSeparation * 0.5} ${150 - splitSeparation * 0.5}`}
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="2"
                />

                {/* Bottom Base Label (alas) */}
                <text
                  x={120 + splitSeparation * 0.5}
                  y={170 + splitSeparation * 0.5}
                  textAnchor="middle"
                  fill="#0369A1"
                  fontSize="12"
                  fontWeight="bold"
                >
                  alas (a) = 6 cm
                </text>

                {/* Right Height Label (tinggi tegak lurus) */}
                <text
                  x={225 + splitSeparation * 0.5}
                  y={95 + splitSeparation * 0.5}
                  textAnchor="start"
                  fill="#0369A1"
                  fontSize="12"
                  fontWeight="bold"
                >
                  tinggi (t) = 4 cm
                </text>

                {/* Diagonal cut line indicator */}
                {splitSeparation === 0 && (
                  <line
                    x1="210"
                    y1="30"
                    x2="30"
                    y2="150"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                )}
              </svg>
            </div>
          </div>

          <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-sky-950 flex items-center justify-between">
              <span>Luas Persegi Panjang: 6 × 4 = 24 cm²</span>
              <span className="text-slate-400">÷ 2</span>
            </div>
            <div className="font-bold text-sky-700 flex items-center justify-between">
              <span>Luas 1 Segitiga: ½ × 6 × 4 =</span>
              <span className="font-heading font-black text-sm text-sky-800">12 cm²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-1');
          }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Misi 1</span>
        </button>

        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-3');
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-heading font-black text-xs md:text-sm rounded-xl shadow-xs transition-all"
        >
          <span>Lanjut ke Misi 3: Jendela Jajar Genjang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
