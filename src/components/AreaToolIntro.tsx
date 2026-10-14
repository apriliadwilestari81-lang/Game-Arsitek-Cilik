import React, { useState } from 'react';
import { ActiveView } from '../types';
import { playSound } from '../utils/sound';
import { ArrowRight, Grid, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface AreaToolIntroProps {
  onNavigate: (view: ActiveView) => void;
}

export const AreaToolIntro: React.FC<AreaToolIntroProps> = ({ onNavigate }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [clickedTiles, setClickedTiles] = useState<number[]>([]);
  const [showQuickCount, setShowQuickCount] = useState(false);
  const [unitMode, setUnitMode] = useState<'cm' | 'm'>('m');

  const totalTiles = rows * cols;

  const handleTileClick = (index: number) => {
    playSound.click();
    if (clickedTiles.includes(index)) {
      setClickedTiles(clickedTiles.filter((i) => i !== index));
    } else {
      setClickedTiles([...clickedTiles, index]);
    }
  };

  const handleFillAll = () => {
    playSound.success();
    const all = Array.from({ length: totalTiles }, (_, i) => i);
    setClickedTiles(all);
    setShowQuickCount(true);
  };

  const handleReset = () => {
    playSound.click();
    setClickedTiles([]);
    setShowQuickCount(false);
  };

  return (
    <div className="py-6 md:py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-xl font-black">
            🧰
          </span>
          <div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Pondasi Dasar Matematika
            </div>
            <h1 className="font-heading font-black text-2xl md:text-3xl text-slate-900 tracking-tight">
              Alat Arsitek: Apa itu Luas?
            </h1>
          </div>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onNavigate('mission-1');
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-heading font-black text-xs md:text-sm rounded-xl transition-all shadow-sm"
        >
          <span>Lanjut ke Misi 1</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Concept Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Explanation Box (Max 4 lines concise) */}
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-amber-200/90 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-900 rounded-lg text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Rahasia Utama Arsitek</span>
            </div>

            <h2 className="font-heading font-black text-xl text-slate-900 leading-tight">
              Luas adalah Banyaknya Petak Satuan Penutup
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Bayangkan kamu sedang memasang ubin di lantai ruangan. 
              <strong> Luas</strong> adalah jumlah seluruh ubin petak persegi yang menutupi bidang itu secara rata tanpa celah.
            </p>

            {/* Units explanation */}
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-3">
              <div className="text-xs font-black text-amber-950 uppercase tracking-wider">
                Satuan Ukuran Luas:
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-200 border-2 border-sky-500 flex items-center justify-center font-bold text-xs text-sky-900 shrink-0">
                  1 cm²
                </div>
                <div className="text-xs text-slate-700">
                  <strong>Sentimeter persegi (cm²)</strong>: Untuk bidang gambar kecil di kertas/buku denah (sisi 1 cm × 1 cm).
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-200 border-2 border-emerald-500 flex items-center justify-center font-bold text-xs text-emerald-900 shrink-0">
                  1 m²
                </div>
                <div className="text-xs text-slate-700">
                  <strong>Meter persegi (m²)</strong>: Untuk ukuran bangunan nyata di kota (sisi 1 m × 1 m).
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500 italic">
            💡 "Daripada menghitung satu per satu, arsitek cerdas mengalikan baris × kolom!"
          </div>
        </div>

        {/* Right Interactive Grid Playground */}
        <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-amber-200/90 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-amber-500" />
                <span className="font-heading font-black text-base text-slate-900">
                  Laboratorium Petak Interaktif
                </span>
              </div>

              {/* Unit Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setUnitMode('m')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                    unitMode === 'm' ? 'bg-amber-500 text-white' : 'text-slate-600'
                  }`}
                >
                  Meter (m²)
                </button>
                <button
                  onClick={() => setUnitMode('cm')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                    unitMode === 'cm' ? 'bg-amber-500 text-white' : 'text-slate-600'
                  }`}
                >
                  Sentimeter (cm²)
                </button>
              </div>
            </div>

            {/* Dimension Sliders */}
            <div className="grid grid-cols-2 gap-4 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Panjang (Kolom):</span>
                  <span className="text-amber-600 font-mono text-sm">{cols} {unitMode}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={cols}
                  onChange={(e) => {
                    setCols(Number(e.target.value));
                    setClickedTiles([]);
                    setShowQuickCount(false);
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Lebar (Baris):</span>
                  <span className="text-sky-600 font-mono text-sm">{rows} {unitMode}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={rows}
                  onChange={(e) => {
                    setRows(Number(e.target.value));
                    setClickedTiles([]);
                    setShowQuickCount(false);
                  }}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>

            {/* The Interactive Grid */}
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 flex flex-col items-center justify-center min-h-[220px]">
              <div className="text-xs font-bold text-slate-500 mb-2">
                Klik kotak untuk menghitung petak secara manual, atau klik "Isi Semua"!
              </div>

              <div
                className="grid gap-1.5 p-2 bg-white rounded-xl border border-slate-300 shadow-inner"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(42px, 56px))`,
                }}
              >
                {Array.from({ length: totalTiles }, (_, idx) => {
                  const isChecked = clickedTiles.includes(idx);
                  const orderNumber = clickedTiles.indexOf(idx) + 1;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleTileClick(idx)}
                      className={`h-11 md:h-12 rounded-lg font-bold text-xs flex items-center justify-center transition-all transform active:scale-90 border ${
                        isChecked
                          ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-amber-100 text-slate-400'
                      }`}
                      title={`Petak ${idx + 1}`}
                    >
                      {isChecked ? (showQuickCount ? idx + 1 : orderNumber) : ''}
                    </button>
                  );
                })}
              </div>

              {/* Live Count Display */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
                <span className="font-semibold text-slate-700">
                  Petak Dihitung: <strong className="text-amber-600 text-base">{clickedTiles.length}</strong> / {totalTiles} petak
                </span>
                {clickedTiles.length === totalTiles && (
                  <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-xs font-black flex items-center gap-1">
                    🎉 Permukaan Penuh Tertutup!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Count Math Formula Card */}
          <div className="p-3 bg-gradient-to-r from-sky-50 to-amber-50 rounded-2xl border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black text-sky-900 uppercase">
                Rumus Kilat Arsitek:
              </div>
              <div className="font-heading font-black text-slate-900 text-base">
                Luas = {cols} {unitMode} × {rows} {unitMode} = <span className="text-amber-600">{totalTiles} {unitMode}²</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleFillAll}
                className="px-3.5 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Isi Semua</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
                title="Reset Petak"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
