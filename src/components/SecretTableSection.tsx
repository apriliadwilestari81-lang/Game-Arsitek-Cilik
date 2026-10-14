import React, { useState } from 'react';
import { ActiveView } from '../types';
import { playSound } from '../utils/sound';
import { ArrowRight, ArrowLeft, Calculator, BookOpen, Sparkles } from 'lucide-react';

interface SecretTableSectionProps {
  onNavigate: (view: ActiveView) => void;
}

interface ShapeSummary {
  name: string;
  formula: string;
  formulaDescription: string;
  symbolNote: string;
  bgColor: string;
  badgeColor: string;
  borderColor: string;
  textColor: string;
  renderSvg: () => React.ReactNode;
}

export const SecretTableSection: React.FC<SecretTableSectionProps> = ({ onNavigate }) => {
  const [selectedCalcShape, setSelectedCalcShape] = useState<number>(0);
  const [valA, setValA] = useState<number>(6);
  const [valB, setValB] = useState<number>(4);
  const [valC, setValC] = useState<number>(3); // for trapezoid height

  const shapes: ShapeSummary[] = [
    {
      name: '1. Persegi',
      formula: 'L = s × s (atau s²)',
      formulaDescription: 'Luas = sisi × sisi',
      symbolNote: 's = panjang sisi (keempat sisi sama)',
      bgColor: 'bg-amber-50/70 hover:bg-amber-50',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800',
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-16 h-14">
          <rect x="25" y="15" width="50" height="50" fill="#FDE68A" stroke="#D97706" strokeWidth="2" rx="3" />
          <text x="50" y="10" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="bold">s</text>
          <text x="82" y="42" textAnchor="start" fill="#92400E" fontSize="9" fontWeight="bold">s</text>
        </svg>
      ),
    },
    {
      name: '2. Persegi Panjang',
      formula: 'L = p × l',
      formulaDescription: 'Luas = panjang × lebar',
      symbolNote: 'p = panjang, l = lebar',
      bgColor: 'bg-sky-50/70 hover:bg-sky-50',
      badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
      borderColor: 'border-sky-200',
      textColor: 'text-sky-800',
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-16 h-14">
          <rect x="15" y="20" width="70" height="40" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" rx="3" />
          <text x="50" y="14" textAnchor="middle" fill="#0369A1" fontSize="9" fontWeight="bold">p</text>
          <text x="90" y="44" textAnchor="start" fill="#0369A1" fontSize="9" fontWeight="bold">l</text>
        </svg>
      ),
    },
    {
      name: '3. Segitiga',
      formula: 'L = ½ × a × t',
      formulaDescription: 'Luas = ½ × alas × tinggi',
      symbolNote: 'a = alas, t = tinggi tegak lurus',
      bgColor: 'bg-emerald-50/70 hover:bg-emerald-50',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-800',
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-16 h-14">
          <polygon points="15,65 85,65 50,15" fill="#A7F3D0" stroke="#059669" strokeWidth="2" />
          <line x1="50" y1="15" x2="50" y2="65" stroke="#DC2626" strokeDasharray="2 2" strokeWidth="1.5" />
          <path d="M 50 57 L 58 57 L 58 65" fill="none" stroke="#DC2626" strokeWidth="1" />
          <text x="50" y="76" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">a</text>
          <text x="54" y="40" textAnchor="start" fill="#DC2626" fontSize="9" fontWeight="bold">t</text>
        </svg>
      ),
    },
    {
      name: '4. Jajar Genjang',
      formula: 'L = a × t',
      formulaDescription: 'Luas = alas × tinggi',
      symbolNote: 'a = alas, t = tinggi tegak lurus',
      bgColor: 'bg-orange-50/70 hover:bg-orange-50',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800',
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-16 h-14">
          <polygon points="15,60 65,60 85,20 35,20" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <line x1="35" y1="20" x2="35" y2="60" stroke="#DC2626" strokeDasharray="2 2" strokeWidth="1.5" />
          <path d="M 35 52 L 43 52 L 43 60" fill="none" stroke="#DC2626" strokeWidth="1" />
          <text x="50" y="72" textAnchor="middle" fill="#9A3412" fontSize="9" fontWeight="bold">a</text>
          <text x="39" y="42" textAnchor="start" fill="#DC2626" fontSize="9" fontWeight="bold">t</text>
        </svg>
      ),
    },
    {
      name: '5. Trapesium',
      formula: 'L = ½ × (a + b) × t',
      formulaDescription: 'Luas = ½ × (sisi 1 + sisi 2) × tinggi',
      symbolNote: 'a, b = sisi sejajar, t = tinggi tegak lurus',
      bgColor: 'bg-indigo-50/70 hover:bg-indigo-50',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-800',
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-16 h-14">
          <polygon points="15,62 85,62 70,22 30,22" fill="#C7D2FE" stroke="#4F46E5" strokeWidth="2" />
          <line x1="30" y1="22" x2="30" y2="62" stroke="#DC2626" strokeDasharray="2 2" strokeWidth="1.5" />
          <path d="M 30 54 L 38 54 L 38 62" fill="none" stroke="#DC2626" strokeWidth="1" />
          <text x="50" y="16" textAnchor="middle" fill="#3730A3" fontSize="9" fontWeight="bold">a</text>
          <text x="50" y="74" textAnchor="middle" fill="#3730A3" fontSize="9" fontWeight="bold">b</text>
          <text x="33" y="44" textAnchor="start" fill="#DC2626" fontSize="9" fontWeight="bold">t</text>
        </svg>
      ),
    },
    {
      name: '6. Belah Ketupat',
      formula: 'L = ½ × d₁ × d₂',
      formulaDescription: 'Luas = ½ × diagonal 1 × diagonal 2',
      symbolNote: 'd₁, d₂ = panjang kedua garis diagonal',
      bgColor: 'bg-rose-50/70 hover:bg-rose-50',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-800',
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-16 h-14">
          <polygon points="50,15 85,40 50,65 15,40" fill="#FECDD3" stroke="#E11D48" strokeWidth="2" />
          <line x1="15" y1="40" x2="85" y2="40" stroke="#B45309" strokeDasharray="2 2" strokeWidth="1.5" />
          <line x1="50" y1="15" x2="50" y2="65" stroke="#1D4ED8" strokeDasharray="2 2" strokeWidth="1.5" />
          <text x="50" y="36" textAnchor="middle" fill="#B45309" fontSize="8" fontWeight="bold">d₁</text>
          <text x="54" y="26" textAnchor="start" fill="#1D4ED8" fontSize="8" fontWeight="bold">d₂</text>
        </svg>
      ),
    },
    {
      name: '7. Layang-layang',
      formula: 'L = ½ × d₁ × d₂',
      formulaDescription: 'Luas = ½ × diagonal 1 × diagonal 2',
      symbolNote: 'd₁, d₂ = panjang kedua garis diagonal',
      bgColor: 'bg-teal-50/70 hover:bg-teal-50',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-800',
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-16 h-14">
          <polygon points="50,12 80,35 50,68 20,35" fill="#99F6E4" stroke="#0D9488" strokeWidth="2" />
          <line x1="20" y1="35" x2="80" y2="35" stroke="#EA580C" strokeDasharray="2 2" strokeWidth="1.5" />
          <line x1="50" y1="12" x2="50" y2="68" stroke="#1D4ED8" strokeDasharray="2 2" strokeWidth="1.5" />
          <text x="50" y="31" textAnchor="middle" fill="#EA580C" fontSize="8" fontWeight="bold">d₁</text>
          <text x="54" y="52" textAnchor="start" fill="#1D4ED8" fontSize="8" fontWeight="bold">d₂</text>
        </svg>
      ),
    },
  ];

  // Quick Calculator Math
  const getCalcResult = () => {
    switch (selectedCalcShape) {
      case 0: // Square
        return { steps: `${valA} × ${valA}`, result: valA * valA, unit: 'cm²' };
      case 1: // Rect
        return { steps: `${valA} × ${valB}`, result: valA * valB, unit: 'cm²' };
      case 2: // Triangle
        return { steps: `½ × ${valA} × ${valB}`, result: 0.5 * valA * valB, unit: 'cm²' };
      case 3: // Parallelogram
        return { steps: `${valA} × ${valB}`, result: valA * valB, unit: 'cm²' };
      case 4: // Trapezoid
        return { steps: `½ × (${valA} + ${valB}) × ${valC}`, result: 0.5 * (valA + valB) * valC, unit: 'cm²' };
      case 5: // Rhombus
      case 6: // Kite
        return { steps: `½ × ${valA} × ${valB}`, result: 0.5 * valA * valB, unit: 'cm²' };
      default:
        return { steps: '', result: 0, unit: 'cm²' };
    }
  };

  const calcInfo = getCalcResult();

  return (
    <div className="py-6 md:py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 md:p-6 rounded-3xl border border-amber-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl font-black">
            📖
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-600">
              Cetak Biru Arsitek
            </div>
            <h1 className="font-heading font-black text-xl md:text-2xl text-slate-900">
              Tabel Rahasia 7 Bangun Datar
            </h1>
          </div>
        </div>

        <button
          onClick={() => {
            playSound.fanfare();
            onNavigate('quiz-assessment');
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-heading font-black text-xs md:text-sm rounded-xl shadow-xs transition-all"
        >
          <span>Mulai Uji Kemampuan & Sertifikat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* The 7 Shapes Table with Distinct Row Colors */}
      <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden">
        <div className="p-4 md:p-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-200" />
            <h2 className="font-heading font-black text-base md:text-lg">
              Ringkasan Rumus Luas Kelas 5 SD
            </h2>
          </div>
          <span className="text-xs font-semibold text-amber-100">7 Bangun Datar Lengkap</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] md:text-xs font-black text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Bangun Datar</th>
                <th className="py-3 px-4">Bentuk Berlabel</th>
                <th className="py-3 px-4">Rumus Luas</th>
                <th className="py-3 px-4">Keterangan Simbol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
              {shapes.map((s, index) => (
                <tr key={index} className={`transition-colors ${s.bgColor}`}>
                  {/* Name */}
                  <td className="py-3 px-4 font-heading font-black text-slate-900 whitespace-nowrap">
                    {s.name}
                  </td>

                  {/* SVG Shape Icon */}
                  <td className="py-2 px-4 shrink-0">
                    <div className="p-1 bg-white/90 rounded-xl border border-slate-200/80 shadow-xs inline-block">
                      {s.renderSvg()}
                    </div>
                  </td>

                  {/* Formula */}
                  <td className="py-3 px-4">
                    <div className="font-mono font-black text-slate-900 text-sm md:text-base">
                      {s.formula}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {s.formulaDescription}
                    </div>
                  </td>

                  {/* Symbol Note */}
                  <td className="py-3 px-4 text-xs text-slate-600 font-medium">
                    {s.symbolNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Quick-Calculator for Kids */}
      <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-lg space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Calculator className="w-5 h-5 text-amber-500" />
          <h3 className="font-heading font-black text-base md:text-lg text-slate-900">
            Kalkulator Cepat Arsitek: Coba Angka Berapa Saja!
          </h3>
        </div>

        <p className="text-xs text-slate-600">
          Pilih salah satu bangun datar, lalu masukkan ukuran sisinya untuk melihat bagaimana rumus bekerja secara ajaib!
        </p>

        {/* Shape Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {shapes.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                playSound.click();
                setSelectedCalcShape(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCalcShape === idx
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.name.replace(/^\d+\.\s*/, '')}
            </button>
          ))}
        </div>

        {/* Dynamic Inputs according to shape */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          {selectedCalcShape === 0 && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Panjang Sisi (s):
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={valA}
                onChange={(e) => setValA(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 font-mono font-bold text-sm focus:outline-amber-500"
              />
            </div>
          )}

          {selectedCalcShape !== 0 && selectedCalcShape !== 4 && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {selectedCalcShape === 1 ? 'Panjang (p):' : selectedCalcShape === 2 || selectedCalcShape === 3 ? 'Alas (a):' : 'Diagonal 1 (d₁):'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={valA}
                  onChange={(e) => setValA(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 font-mono font-bold text-sm focus:outline-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {selectedCalcShape === 1 ? 'Lebar (l):' : selectedCalcShape === 2 || selectedCalcShape === 3 ? 'Tinggi (t):' : 'Diagonal 2 (d₂):'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={valB}
                  onChange={(e) => setValB(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 font-mono font-bold text-sm focus:outline-amber-500"
                />
              </div>
            </>
          )}

          {selectedCalcShape === 4 && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Sisi Sejajar 1 (a):
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={valA}
                  onChange={(e) => setValA(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 font-mono font-bold text-sm focus:outline-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Sisi Sejajar 2 (b):
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={valB}
                  onChange={(e) => setValB(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 font-mono font-bold text-sm focus:outline-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Tinggi (t):
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={valC}
                  onChange={(e) => setValC(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 font-mono font-bold text-sm focus:outline-amber-500"
                />
              </div>
            </>
          )}

          {/* Result card */}
          <div className="p-3 bg-amber-100/80 rounded-xl border border-amber-300 flex flex-col justify-center sm:col-span-3">
            <div className="text-xs font-bold text-amber-900 mb-0.5">
              Perhitungan Langkah:
            </div>
            <div className="font-mono text-xs text-slate-700 mb-1">
              Luas = {calcInfo.steps}
            </div>
            <div className="font-heading font-black text-amber-800 text-xl">
              = {calcInfo.result} {calcInfo.unit}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-5');
          }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Misi 5</span>
        </button>

        <button
          onClick={() => {
            playSound.fanfare();
            onNavigate('quiz-assessment');
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-heading font-black text-xs md:text-sm rounded-xl shadow-xs transition-all"
        >
          <span>Uji Kemampuan Arsitek (5 Soal)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
