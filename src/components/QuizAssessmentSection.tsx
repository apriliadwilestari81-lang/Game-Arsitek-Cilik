import React, { useState } from 'react';
import { ActiveView, QuizQuestion } from '../types';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  Award,
  Star,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Printer,
  Sparkles,
  Compass,
  MessageSquareHeart,
} from 'lucide-react';

interface QuizAssessmentSectionProps {
  onNavigate: (view: ActiveView) => void;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: 'Soal 1: Taman Persegi Baru',
    story: 'Wali Kota ingin membangun taman bermain baru berbentuk persegi dengan panjang sisi 7 meter. Berapa luas taman tersebut?',
    shapeName: 'Persegi',
    formulaHint: 'Luas = sisi × sisi (s × s)',
    dimensions: { 'Sisi (s)': '7 m' },
    correctAnswer: 49,
    unit: 'm²',
    options: [28, 42, 49, 56],
    explanation: 'Luas persegi = s × s = 7 m × 7 m = 49 m².',
    stepByStep: [
      'Identifikasi bentuk: Persegi dengan sisi (s) = 7 m.',
      'Gunakan rumus: Luas = s × s.',
      'Hitung: 7 × 7 = 49 m².',
    ],
  },
  {
    id: 2,
    title: 'Soal 2: Lapangan Olahraga',
    story: 'Sebuah lapangan serbaguna berbentuk persegi panjang memiliki panjang 9 meter dan lebar 4 meter. Berapa luasnya?',
    shapeName: 'Persegi Panjang',
    formulaHint: 'Luas = panjang × lebar (p × l)',
    dimensions: { 'Panjang (p)': '9 m', 'Lebar (l)': '4 m' },
    correctAnswer: 36,
    unit: 'm²',
    options: [26, 32, 36, 45],
    explanation: 'Luas persegi panjang = p × l = 9 m × 4 m = 36 m².',
    stepByStep: [
      'Identifikasi bentuk: Persegi panjang dengan p = 9 m dan l = 4 m.',
      'Gunakan rumus: Luas = p × l.',
      'Hitung: 9 × 4 = 36 m².',
    ],
  },
  {
    id: 3,
    title: 'Soal 3: Papan Petunjuk Segitiga',
    story: 'Papan petunjuk jalan kota berbentuk segitiga dengan panjang alas 10 cm dan tinggi 6 cm. Berapakah luas papan tersebut?',
    shapeName: 'Segitiga',
    formulaHint: 'Luas = ½ × alas × tinggi (½ × a × t)',
    dimensions: { 'Alas (a)': '10 cm', 'Tinggi (t)': '6 cm' },
    correctAnswer: 30,
    unit: 'cm²',
    options: [30, 60, 40, 16],
    explanation: 'Luas segitiga = ½ × a × t = ½ × 10 cm × 6 cm = 30 cm².',
    stepByStep: [
      'Identifikasi bentuk: Segitiga dengan a = 10 cm dan t = 6 cm.',
      'Gunakan rumus: Luas = ½ × a × t.',
      'Hitung: 10 × 6 = 60, lalu kalikan ½ (atau bagi 2) = 30 cm².',
    ],
  },
  {
    id: 4,
    title: 'Soal 4: Dinding Panggung Trapesium',
    story: 'Dinding panggung teater terbuka berbentuk trapesium dengan panjang sisi sejajar 5 cm dan 7 cm, serta tinggi 4 cm. Berapakah luasnya?',
    shapeName: 'Trapesium',
    formulaHint: 'Luas = ½ × (sisi sejajar 1 + sisi sejajar 2) × tinggi',
    dimensions: { 'Sisi Sejajar 1 (a)': '5 cm', 'Sisi Sejajar 2 (b)': '7 cm', 'Tinggi (t)': '4 cm' },
    correctAnswer: 24,
    unit: 'cm²',
    options: [16, 24, 28, 48],
    explanation: 'Luas trapesium = ½ × (5 + 7) × 4 = ½ × 12 × 4 = 24 cm².',
    stepByStep: [
      'Langkah 1: Jumlahkan kedua sisi sejajar di dalam kurung: 5 + 7 = 12 cm.',
      'Langkah 2: Kalikan dengan tinggi: 12 × 4 = 48 cm².',
      'Langkah 3: Ambil setengahnya (bagi 2): 48 ÷ 2 = 24 cm².',
    ],
  },
  {
    id: 5,
    title: 'Soal 5: Denah Rumah Gabungan (⭐ Bintang Bonus)',
    isBonus: true,
    story: 'Arsitek cilik merancang denah fasad rumah: bagian bawah berupa persegi panjang 8 m × 5 m, dan atap di atasnya berupa segitiga dengan alas 8 m dan tinggi 3 m. Berapakah luas total gabungan bangunan ini?',
    shapeName: 'Bangun Gabungan (Persegi Panjang + Segitiga)',
    formulaHint: 'Luas Total = Luas Persegi Panjang + Luas Segitiga',
    dimensions: { 'Persegi Panjang': '8 m × 5 m', 'Atap Segitiga': 'alas 8 m, tinggi 3 m' },
    correctAnswer: 52,
    unit: 'm²',
    options: [40, 48, 52, 64],
    explanation: 'Luas persegi panjang = 8 × 5 = 40 m². Luas segitiga = ½ × 8 × 3 = 12 m². Luas total = 40 + 12 = 52 m².',
    stepByStep: [
      'Langkah A: Hitung luas persegi panjang bawah: 8 m × 5 m = 40 m².',
      'Langkah B: Hitung luas atap segitiga atas: ½ × 8 m × 3 m = 12 m².',
      'Langkah C: Jumlahkan kedua luas: 40 m² + 12 m² = 52 m².',
    ],
  },
];

export const QuizAssessmentSection: React.FC<QuizAssessmentSectionProps> = ({ onNavigate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [qId: number]: boolean }>({});
  const [studentName, setStudentName] = useState('Arsitek Hebat Indonesia');
  const [favoriteShape, setFavoriteShape] = useState('Jendela Jajar Genjang');
  const [reflectionReason, setReflectionReason] = useState('Karena seru melihat potongan segitiganya bisa digeser jadi persegi panjang yang rapi!');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  const currentQ = quizQuestions[currentIdx];
  const isAnswered = submittedAnswers[currentQ.id];
  const userChoice = userAnswers[currentQ.id];
  const isCorrect = userChoice === currentQ.correctAnswer;

  const scoreCount = quizQuestions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
  const allCompleted = Object.keys(submittedAnswers).length === quizQuestions.length;

  const handleSelectOption = (val: number) => {
    if (isAnswered) return;
    playSound.click();
    setUserAnswers({ ...userAnswers, [currentQ.id]: val });
  };

  const handleSubmitCurrent = () => {
    if (userChoice === undefined) return;
    setSubmittedAnswers({ ...submittedAnswers, [currentQ.id]: true });
    if (userChoice === currentQ.correctAnswer) {
      playSound.success();
      if (currentQ.isBonus) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
    } else {
      playSound.error();
    }
  };

  const handlePrintCertificate = () => {
    playSound.click();
    window.print();
  };

  return (
    <div className="py-6 md:py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 md:p-6 rounded-3xl border border-amber-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl font-black">
            🏆
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600">
              Evaluasi Akhir Kota Impian
            </div>
            <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900">
              Uji Kemampuan Arsitek & Penghargaan
            </h1>
          </div>
        </div>

        {/* Live Score Tally */}
        <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-1.5 rounded-2xl border border-amber-300">
          <Star className="w-5 h-5 fill-amber-400 text-amber-600" />
          <span className="font-heading font-black text-amber-900 text-sm">
            Skor: {scoreCount} / {quizQuestions.length} Soal
          </span>
        </div>
      </div>

      {/* Question Stepper / Navigator */}
      <div className="flex items-center justify-center gap-2 p-2 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-xl mx-auto">
        {quizQuestions.map((q, idx) => {
          const done = submittedAnswers[q.id];
          const correct = userAnswers[q.id] === q.correctAnswer;
          const isCurrent = currentIdx === idx;
          return (
            <button
              key={q.id}
              onClick={() => {
                playSound.click();
                setCurrentIdx(idx);
              }}
              className={`flex-1 py-2 px-1 text-xs font-bold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
                isCurrent
                  ? 'bg-amber-500 text-white shadow-xs scale-105'
                  : done
                  ? correct
                    ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                    : 'bg-rose-100 text-rose-900 hover:bg-rose-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{q.isBonus ? '⭐ Soal 5' : `Soal ${q.id}`}</span>
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Left: Question Prompt and Options */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md ${
                currentQ.isBonus ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-sky-100 text-sky-900'
              }`}>
                {currentQ.isBonus ? '⭐ Bintang Bonus Arsitek' : `Soal ${currentQ.id} dari 5`}
              </span>
              <span className="text-xs font-bold text-slate-500">{currentQ.shapeName}</span>
            </div>

            <h2 className="font-heading font-black text-xl md:text-2xl text-slate-900 leading-snug">
              {currentQ.title}
            </h2>

            <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
              "{currentQ.story}"
            </p>

            {/* Hint of formula */}
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Petunjuk rumus: <strong>{currentQ.formulaHint}</strong></span>
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = userChoice === opt;
                let btnStyle = 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800';
                if (isSelected) {
                  btnStyle = 'bg-amber-400 border-amber-500 text-amber-950 font-black shadow-xs ring-2 ring-amber-400/40';
                }
                if (isAnswered) {
                  if (opt === currentQ.correctAnswer) {
                    btnStyle = 'bg-emerald-500 border-emerald-600 text-white font-black shadow-xs';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-500 border-rose-600 text-white font-black';
                  } else {
                    btnStyle = 'opacity-40 bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswered}
                    className={`py-3 px-4 rounded-2xl border text-base font-mono font-bold transition-all text-center flex items-center justify-center gap-2 ${btnStyle}`}
                  >
                    <span>{opt} {currentQ.unit}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {!isAnswered ? (
              <button
                onClick={handleSubmitCurrent}
                disabled={userChoice === undefined}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-heading font-black text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                Kunci Jawaban Saya
              </button>
            ) : (
              <div className="w-full flex items-center justify-between gap-2">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${
                  isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                }`}>
                  {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : '💡'}
                  <span>{isCorrect ? 'Jawaban Benar!' : 'Belum Tepat'}</span>
                </span>

                <button
                  onClick={() => {
                    playSound.click();
                    if (currentIdx < quizQuestions.length - 1) {
                      setCurrentIdx(currentIdx + 1);
                    }
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <span>{currentIdx < quizQuestions.length - 1 ? 'Soal Berikutnya' : 'Selesai'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Dimension Illustration & Step-by-Step Breakdown */}
        <div className="md:col-span-5 bg-gradient-to-br from-amber-50/50 to-sky-50/50 p-6 md:p-8 border-t md:border-t-0 md:border-l border-amber-200 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
              Cetak Biru Dimensi
            </h3>

            {/* Visual SVG for Current Question */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200/90 shadow-inner flex items-center justify-center min-h-[170px] mb-4">
              {currentQ.id === 1 && (
                <svg viewBox="0 0 160 140" className="w-36 h-32">
                  <rect x="25" y="20" width="100" height="100" fill="#FDE68A" stroke="#D97706" strokeWidth="3" rx="4" />
                  <text x="75" y="14" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="bold">s = 7 m</text>
                  <text x="132" y="74" textAnchor="start" fill="#92400E" fontSize="12" fontWeight="bold">s = 7 m</text>
                </svg>
              )}
              {currentQ.id === 2 && (
                <svg viewBox="0 0 180 120" className="w-44 h-28">
                  <rect x="20" y="25" width="135" height="60" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" rx="4" />
                  <text x="87" y="18" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="bold">p = 9 m</text>
                  <text x="162" y="60" textAnchor="start" fill="#0369A1" fontSize="12" fontWeight="bold">l = 4 m</text>
                </svg>
              )}
              {currentQ.id === 3 && (
                <svg viewBox="0 0 180 130" className="w-40 h-28">
                  <polygon points="20,105 150,105 85,25" fill="#A7F3D0" stroke="#059669" strokeWidth="3" />
                  <line x1="85" y1="25" x2="85" y2="105" stroke="#DC2626" strokeDasharray="3 2" strokeWidth="2" />
                  <text x="85" y="122" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">a = 10 cm</text>
                  <text x="92" y="65" textAnchor="start" fill="#DC2626" fontSize="11" fontWeight="bold">t = 6 cm</text>
                </svg>
              )}
              {currentQ.id === 4 && (
                <svg viewBox="0 0 180 130" className="w-44 h-28">
                  <polygon points="25,100 145,100 120,30 50,30" fill="#C7D2FE" stroke="#4F46E5" strokeWidth="3" />
                  <line x1="50" y1="30" x2="50" y2="100" stroke="#DC2626" strokeDasharray="3 2" strokeWidth="2" />
                  <text x="85" y="22" textAnchor="middle" fill="#3730A3" fontSize="11" fontWeight="bold">a = 5 cm</text>
                  <text x="85" y="118" textAnchor="middle" fill="#3730A3" fontSize="11" fontWeight="bold">b = 7 cm</text>
                  <text x="56" y="68" textAnchor="start" fill="#DC2626" fontSize="11" fontWeight="bold">t = 4 cm</text>
                </svg>
              )}
              {currentQ.id === 5 && (
                <svg viewBox="0 0 200 160" className="w-44 h-36">
                  {/* House base rectangle */}
                  <rect x="35" y="70" width="120" height="70" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" rx="3" />
                  {/* Roof triangle */}
                  <polygon points="35,70 155,70 95,20" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
                  {/* Height line for triangle */}
                  <line x1="95" y1="20" x2="95" y2="70" stroke="#DC2626" strokeDasharray="2 2" strokeWidth="1.5" />
                  <text x="95" y="48" textAnchor="start" fill="#DC2626" fontSize="10" fontWeight="bold">t = 3 m</text>
                  <text x="95" y="110" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">8 m × 5 m</text>
                  <text x="95" y="152" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">alas = 8 m</text>
                </svg>
              )}
            </div>

            {/* Dimension Specs */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1 mb-3">
              <span className="font-bold text-slate-700 block">Ukuran Tertera:</span>
              {Object.entries(currentQ.dimensions).map(([k, v]) => (
                <div key={k} className="flex justify-between text-slate-600">
                  <span>{k}:</span>
                  <span className="font-mono font-bold text-amber-700">{v}</span>
                </div>
              ))}
            </div>

            {/* Step-by-Step explanation when answered */}
            {isAnswered && (
              <div className="p-3.5 bg-amber-100/90 rounded-2xl border border-amber-300 text-xs text-slate-800 space-y-2">
                <div className="font-black text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pembahasan Langkah:</span>
                </div>
                <div className="space-y-1">
                  {currentQ.stepByStep.map((s, i) => (
                    <div key={i} className="flex items-start gap-1.5 leading-snug">
                      <span className="font-bold text-amber-700">{i + 1}.</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 italic text-center">
            📐 Arsitek Cilik selalu menghitung dengan teliti dan presisi!
          </div>
        </div>
      </div>

      {/* Bagian Refleksi Interaktif */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-amber-200 shadow-xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-amber-100">
          <MessageSquareHeart className="w-6 h-6 text-rose-500" />
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-rose-600">
              Refleksi Belajar Arsitek Cilik
            </div>
            <h3 className="font-heading font-black text-xl text-slate-900">
              "Rumus mana yang paling seru menurutmu?"
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Pilih Bangun Datar Favoritmu:
            </label>
            <div className="space-y-2">
              {[
                { name: 'Persegi & Persegi Panjang', desc: 'Seru karena petak ubinnya sangat rapi dan mudah dihitung' },
                { name: 'Atap Segitiga', desc: 'Takjub saat persegi panjang dipotong diagonal jadi 2 segitiga kembar' },
                { name: 'Jendela Jajar Genjang', desc: 'Sangat keren saat segitiga kiri dipotong dan digeser ke kanan' },
                { name: 'Jembatan Trapesium', desc: 'Asyik saat 2 trapesium disatukan jadi 1 jajar genjang besar' },
                { name: 'Ubin Belah Ketupat & Layang-layang', desc: 'Menarik karena kedua diagonalnya berpotongan tegak lurus' },
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    playSound.click();
                    setFavoriteShape(item.name);
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    favoriteShape === item.name
                      ? 'bg-amber-100 border-amber-400 font-bold text-amber-950 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-black">{item.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tulis Alasan Serumu Sendiri:
              </label>
              <textarea
                value={reflectionReason}
                onChange={(e) => setReflectionReason(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-2xl border border-slate-300 text-xs md:text-sm focus:outline-amber-500"
                placeholder="Menurutku rumus paling seru adalah..."
              />
            </div>

            <div className="p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl border border-amber-200">
              <div className="text-xs font-bold text-amber-900 mb-1">
                Apresiasi untuk Arsitek Cilik:
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Hebat sekali! Memahami dari mana rumus berasal jauh lebih berharga daripada sekadar menghafal. Kamu sudah membuktikannya seperti arsitek sungguhan!
              </p>
            </div>

            <button
              onClick={() => {
                playSound.success();
                setReflectionSubmitted(true);
              }}
              className="py-2.5 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Simpan Refleksi Arsitek
            </button>
          </div>
        </div>
      </div>

      {/* Sertifikat Resmi Arsitek Cilik Terbaik */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border-4 border-amber-400 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0">
        {/* Certificate Decorative Ribbon */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400 rotate-45 transform pointer-events-none flex items-end justify-center pb-2 shadow-md">
          <Star className="w-8 h-8 fill-amber-950 text-amber-950" />
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider border border-amber-300">
              🏛️ Penghargaan Resmi Pemerintah Kota Impian
            </div>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-slate-900 tracking-tight">
              SERTIFIKAT PENGHARGAAN
            </h2>
            <p className="text-xs md:text-sm font-semibold text-slate-500 tracking-widest uppercase">
              No. Sertifikat: ARCH-KOTA-IMPIAN-{new Date().getFullYear()}
            </p>
          </div>

          <div className="space-y-2 py-2">
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Dengan bangga diberikan kepada:
            </p>

            {/* Editable Student Name */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-center font-heading font-black text-2xl md:text-3xl text-amber-600 border-b-2 border-amber-400 bg-amber-50/40 py-1.5 focus:outline-none focus:bg-amber-100/60 rounded-t-lg transition-colors"
                title="Klik untuk mengubah nama siswa"
              />
              <span className="text-[11px] text-slate-400 italic">
                (Ketik namamu di atas untuk dicantumkan di sertifikat)
              </span>
            </div>

            <div className="text-sm md:text-base font-bold text-slate-800 pt-2">
              Sebagai <span className="text-amber-600 font-black">"ARSITEK CILIK TERBAIK"</span>
            </div>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Telah berhasil membongkar rahasia luas 7 bangun datar matematika Kelas 5 SD dan menerapkan keahliannya dalam membangun ruang publik di Kota Impian.
            </p>
          </div>

          {/* Star Medals Row */}
          <div className="flex items-center justify-center gap-2 py-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center shadow-xs"
              >
                <Star className="w-5 h-5 fill-amber-400 text-amber-600" />
              </div>
            ))}
          </div>

          {/* Signature & Seal Row */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-amber-200">
            <div>
              <div className="h-12 flex items-center justify-center text-2xl">
                🏛️✍️
              </div>
              <div className="font-heading font-black text-slate-900 text-xs md:text-sm">
                Wali Kota Kota Impian
              </div>
              <div className="text-[11px] text-slate-500">Pemerintah Kota Impian</div>
            </div>

            <div>
              <div className="h-12 flex items-center justify-center text-2xl">
                📐⭐
              </div>
              <div className="font-heading font-black text-slate-900 text-xs md:text-sm">
                Guru Pembimbing Matematika
              </div>
              <div className="text-[11px] text-slate-500">SD Bintang Prestasi</div>
            </div>
          </div>

          {/* Print Certificate Button */}
          <div className="pt-2 print:hidden">
            <button
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-heading font-black text-sm rounded-2xl shadow-lg shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan Sertifikat (Print / PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 print:hidden">
        <button
          onClick={() => {
            playSound.click();
            onNavigate('secret-table');
          }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tabel Rahasia</span>
        </button>

        <button
          onClick={() => {
            playSound.fanfare();
            onNavigate('letter-map');
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-heading font-black text-xs md:text-sm rounded-xl shadow-xs transition-all"
        >
          <span>Kembali ke Peta Kota Impian</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
