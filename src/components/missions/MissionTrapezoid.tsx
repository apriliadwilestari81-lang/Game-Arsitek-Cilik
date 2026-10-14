import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { playSound } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { Star, CheckCircle, ArrowRight, ArrowLeft, Copy, Sparkles } from 'lucide-react';

interface MissionTrapezoidProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigate: (view: ActiveView) => void;
}

export const MissionTrapezoid: React.FC<MissionTrapezoidProps> = ({
  onComplete,
  isCompleted,
  onNavigate,
}) => {
  const [duplicateMerged, setDuplicateMerged] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<null | { correct: boolean; msg: string }>(null);

  const handleToggleDuplicate = () => {
    playSound.click();
    setDuplicateMerged(!duplicateMerged);
  };

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(userAnswer.trim());
    if (val === 16) {
      playSound.success();
      setFeedback({
        correct: true,
        msg: 'Hebat sekali! (3 + 5) = 8, lalu ½ × 8 × 4 = 16 cm². Jembatan trapesium kokoh menyeberangi sungai!',
      });
      onComplete();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } else {
      playSound.error();
      setFeedback({
        correct: false,
        msg: 'Coba ikuti 2 langkah arsitek: (1) Jumlahkan 3 + 5 = 8. (2) Kalikan ½ × 8 × 4 ya!',
      });
    }
  };

  return (
    <div className="py-6 md:py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 md:p-6 rounded-3xl border border-indigo-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center text-2xl font-black">
            🌉
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Misi 04 Kota Impian
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-slate-500">Jembatan Sungai Kota</span>
            </div>
            <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900">
              Jembatan Trapesium
            </h1>
          </div>
        </div>

        {/* Star Badge */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-xl shadow-xs">
              <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
              <span className="text-xs md:text-sm font-black">Lencana Misi 4 Diraih!</span>
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
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-5 rounded-3xl shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-md">
                Rahasia Rumus
              </span>
              <span className="text-xs font-semibold text-indigo-100">2 Trapesium = 1 Jajar Genjang</span>
            </div>
            <h2 className="font-heading font-black text-xl md:text-2xl tracking-tight">
              Luas Trapesium = ½ × (sisi sejajar 1 + sisi sejajar 2) × tinggi
            </h2>
            <p className="text-indigo-100 text-xs md:text-sm leading-relaxed">
              Dua trapesium kembar jika dibalik dan disatukan akan membentuk jajar genjang dengan alas (a + b). Maka luas 1 trapesium adalah setengahnya!
            </p>
          </div>

          {/* Bagian 2: Contoh dengan Langkah Berurutan */}
          <div className="bg-white p-5 rounded-3xl border border-indigo-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                Contoh Arsitek (Langkah Berurutan):
              </span>
              <span className="text-xs font-bold text-slate-500">Sisi sejajar: 4 cm & 6 cm, tinggi: 4 cm</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <div className="font-black text-amber-900 mb-1">
                  Langkah 1: Jumlahkan Kurung (a + b)
                </div>
                <div className="font-mono text-slate-800">4 cm + 6 cm = <strong>10 cm</strong></div>
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="font-black text-indigo-950 mb-1">
                  Langkah 2: Kalikan Tinggi & Bagi 2
                </div>
                <div className="font-mono text-slate-800">½ × 10 cm × 4 cm = <strong className="text-indigo-700 text-sm">20 cm²</strong></div>
              </div>
            </div>
          </div>

          {/* Bagian 3: Coba Kamu! */}
          <div className="bg-white p-5 rounded-3xl border-2 border-indigo-300 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-md">
                Coba Kamu!
              </span>
              <span className="text-xs text-slate-500">Pondasi Tiang Jembatan</span>
            </div>

            <p className="text-sm font-semibold text-slate-800 leading-snug">
              Berapa luas tiang trapesium jika sisi sejajarnya <strong>3 cm dan 5 cm</strong>, serta tinggi <strong>4 cm</strong>?
            </p>

            <form onSubmit={handleCheckAnswer} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Tulis angka luas..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-indigo-500 font-mono font-bold text-sm"
                />
                <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                  cm²
                </span>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-xs md:text-sm rounded-xl transition-all shadow-xs"
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

        {/* Right: Interactive 2-Trapezoid Merger Visualizer */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-indigo-200 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-slate-500 uppercase">
                Laboratorium Penyatuan
              </span>
              <button
                onClick={handleToggleDuplicate}
                className="flex items-center gap-1.5 px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-lg text-xs font-black transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-indigo-600" />
                <span>{duplicateMerged ? 'Pisahkan Jadi 1' : 'Gandakan & Satukan!'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Klik tombol untuk menduplikasi trapesium dan membalikkannya hingga menjadi jajar genjang raksasa!
            </p>

            {/* SVG Visualizer */}
            <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100 flex items-center justify-center min-h-[220px]">
              <svg viewBox="0 0 280 200" className="w-full max-w-[280px] h-auto overflow-visible">
                {/* Trapezoid 1 (Original, Purple/Indigo) */}
                <polygon
                  points="50,45 130,45 170,145 20,145"
                  fill="#C7D2FE"
                  stroke="#4F46E5"
                  strokeWidth="2.5"
                />

                {/* Trapezoid 2 (Flipped Duplicate, Gold/Amber) */}
                {duplicateMerged && (
                  <polygon
                    points="130,45 260,45 180,145 170,145"
                    fill="#FDE68A"
                    stroke="#D97706"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Perpendicular Height dotted line inside Trapezoid 1 */}
                <line
                  x1="50"
                  y1="45"
                  x2="50"
                  y2="145"
                  stroke="#DC2626"
                  strokeDasharray="3 3"
                  strokeWidth="2"
                />

                {/* Right angle symbol */}
                <path
                  d="M 50 133 L 62 133 L 62 145"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="1.8"
                />

                {/* Height Label */}
                <text
                  x="56"
                  y="98"
                  textAnchor="start"
                  fill="#DC2626"
                  fontSize="11"
                  fontWeight="bold"
                >
                  t = 4 cm
                </text>

                {/* Top Parallel Side Label (a) */}
                <text
                  x="90"
                  y="35"
                  textAnchor="middle"
                  fill="#3730A3"
                  fontSize="11"
                  fontWeight="bold"
                >
                  sisi sejajar 1 = 4 cm
                </text>

                {/* Bottom Parallel Side Label (b) */}
                <text
                  x="95"
                  y="165"
                  textAnchor="middle"
                  fill="#3730A3"
                  fontSize="11"
                  fontWeight="bold"
                >
                  sisi sejajar 2 = 6 cm
                </text>

                {/* When merged, show combined base label */}
                {duplicateMerged && (
                  <text
                    x="140"
                    y="185"
                    textAnchor="middle"
                    fill="#047857"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    Alas Total Jajar Genjang = 4 + 6 = 10 cm
                  </text>
                )}
              </svg>
            </div>
          </div>

          <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 text-xs text-indigo-900 leading-snug">
            💡 <strong>Kunci Arsitek:</strong> Selalu <em>jumlahkan dua sisi sejajar</em> terlebih dahulu sebelum mengalikan dengan tinggi!
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-3');
          }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Misi 3</span>
        </button>

        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-5');
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-black text-xs md:text-sm rounded-xl shadow-xs transition-all"
        >
          <span>Lanjut ke Misi 5: Belah Ketupat & Layang-layang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
