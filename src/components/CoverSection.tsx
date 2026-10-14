import React from 'react';
import { ActiveView } from '../types';
import { playSound } from '../utils/sound';
import { Sparkles, Compass, MapPin, ArrowRight } from 'lucide-react';

interface CoverSectionProps {
  onStart: () => void;
  onNavigate: (view: ActiveView) => void;
}

export const CoverSection: React.FC<CoverSectionProps> = ({ onStart, onNavigate }) => {
  return (
    <div className="relative overflow-hidden py-6 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Grade Tagline */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-amber-700 bg-amber-100/90 border border-amber-300 px-3.5 py-1.5 rounded-xl shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Matematika Kelas 5 SD</span>
            <span aria-hidden="true">·</span>
            <span>Geometri & Pengukuran</span>
          </div>
          <div className="text-xs md:text-sm font-semibold text-slate-500">
            Kurikulum Merdeka / Tematik SD
          </div>
        </div>

        {/* Hero Card Container */}
        <div className="bg-white rounded-3xl border border-amber-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-black uppercase tracking-wider mb-4">
                ⭐ Proyek Kota Impian
              </div>

              <h1 className="font-heading font-black text-3xl md:text-5xl text-slate-900 tracking-tight leading-[1.15] text-balance mb-4">
                Petualangan <span className="text-amber-500">Arsitek Cilik</span>: Membongkar Rahasia <span className="text-sky-600">Luas Bangun Datar</span>
              </h1>

              <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                Halo, Arsitek Cilik! Ayo bantu Wali Kota menata taman, kolam renang, atap rumah, hingga jembatan kota dengan mengungkap rahasia luas 7 bangun datar!
              </p>
            </div>

            {/* Feature Highlights - 3 Quick items */}
            <div className="grid grid-cols-3 gap-3 py-3 border-y border-amber-100">
              <div className="p-2.5 rounded-xl bg-amber-50/80 text-center">
                <div className="text-xl md:text-2xl mb-1">🏗️</div>
                <div className="text-xs font-bold text-slate-800">5 Misi Seru</div>
                <div className="text-[11px] text-slate-500">Kota Impian</div>
              </div>
              <div className="p-2.5 rounded-xl bg-sky-50/80 text-center">
                <div className="text-xl md:text-2xl mb-1">📐</div>
                <div className="text-xs font-bold text-slate-800">7 Bangun Datar</div>
                <div className="text-[11px] text-slate-500">Potong & Geser</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/80 text-center">
                <div className="text-xl md:text-2xl mb-1">⭐</div>
                <div className="text-xs font-bold text-slate-800">Lencana Bintang</div>
                <div className="text-[11px] text-slate-500">& Sertifikat Resmi</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playSound.fanfare();
                  onStart();
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-heading font-black text-lg rounded-2xl shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 hover:translate-y-[-1px]"
              >
                <span>Mulai Petualangan Arsitek!</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  playSound.click();
                  onNavigate('letter-map');
                }}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-2xl border border-slate-300/80 transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Buka Peta Misi</span>
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full bg-amber-100 flex items-center justify-center overflow-hidden">
            <img
              src="/src/assets/images/hero_arsitek_cilik_1791994413439.jpg"
              alt="Arsitek Cilik berhelm proyek di depan Kota Impian"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Caption Overlay */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm">
              <Compass className="w-4 h-4 text-sky-600" />
              <span>Kota Impian Siap Dibangun!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
