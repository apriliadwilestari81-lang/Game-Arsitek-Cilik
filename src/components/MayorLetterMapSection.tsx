import React from 'react';
import { ActiveView, MissionProgress } from '../types';
import { playSound } from '../utils/sound';
import { Star, CheckCircle, ArrowRight, Award, Compass } from 'lucide-react';

interface MayorLetterMapSectionProps {
  onNavigate: (view: ActiveView) => void;
  progress: MissionProgress;
}

export const MayorLetterMapSection: React.FC<MayorLetterMapSectionProps> = ({
  onNavigate,
  progress,
}) => {
  const missionsList = [
    {
      id: 'mission-1' as ActiveView,
      key: 'mission1' as keyof MissionProgress,
      title: 'Misi 1: Taman & Kolam',
      shapes: 'Persegi & Persegi Panjang',
      concept: 'Ubin petak satuan & perkalian sisi/panjang-lebar',
      icon: '🌳',
      color: 'from-amber-500 to-amber-600',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'mission-2' as ActiveView,
      key: 'mission2' as keyof MissionProgress,
      title: 'Misi 2: Atap Segitiga',
      shapes: 'Segitiga Sama Kaki & Siku-siku',
      concept: 'Membelah persegi panjang diagonal jadi 2 segitiga',
      icon: '🏠',
      color: 'from-sky-500 to-sky-600',
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
    },
    {
      id: 'mission-3' as ActiveView,
      key: 'mission3' as keyof MissionProgress,
      title: 'Misi 3: Jendela Jajar Genjang',
      shapes: 'Jajar Genjang Modern',
      concept: 'Potong segitiga tinggi lalu geser jadi persegi panjang',
      icon: '🪟',
      color: 'from-orange-500 to-orange-600',
      badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    },
    {
      id: 'mission-4' as ActiveView,
      key: 'mission4' as keyof MissionProgress,
      title: 'Misi 4: Jembatan Trapesium',
      shapes: 'Trapesium Kokoh Kota',
      concept: 'Gandakan 2 trapesium bersatu membentuk jajar genjang',
      icon: '🌉',
      color: 'from-indigo-500 to-indigo-600',
      badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    },
    {
      id: 'mission-5' as ActiveView,
      key: 'mission5' as keyof MissionProgress,
      title: 'Misi 5: Ubin & Layang-layang',
      shapes: 'Belah Ketupat & Layang-layang',
      concept: 'Setengah luas persegi panjang pembungkus diagonal',
      icon: '🪁',
      color: 'from-emerald-500 to-emerald-600',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
  ];

  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <div className="py-6 md:py-10 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      {/* Bagian 1: Surat dari Wali Kota */}
      <div className="bg-white rounded-3xl border border-amber-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Left: Illustration */}
        <div className="md:col-span-5 relative min-h-[260px] md:min-h-full bg-amber-50">
          <img
            src="/src/assets/images/surat_walikota_blueprint_1791994439154.jpg"
            alt="Meja Kerja Arsitek dan Surat Resmi dari Wali Kota"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-xl text-xs font-bold text-amber-900 border border-amber-300 shadow-xs flex items-center gap-1.5">
            <span className="text-amber-500">📜</span> Surat Resmi Wali Kota
          </div>
        </div>

        {/* Right: Content */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-5 bg-gradient-to-br from-white to-amber-50/40">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md">
                Balaikota Kota Impian
              </span>
              <span className="text-xs text-slate-500 font-medium">Nomor: 001/KOTA-IMPIAN/SD5</span>
            </div>

            <h2 className="font-heading font-black text-2xl md:text-3xl text-slate-900 tracking-tight mb-3">
              Surat Kepercayaan untuk <span className="text-amber-600">Arsitek Cilik</span>
            </h2>

            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-slate-700 text-sm leading-relaxed space-y-2">
              <p className="font-bold text-amber-950">
                "Halo, Arsitek Cilik Kebanggaan Kami!"
              </p>
              <p>
                Kota Impian sedang dalam proses pembangunan besar-besaran. Kami membutuhkan arsitek muda yang cerdas, teliti, dan penuh semangat untuk merancang ruang kota yang tepat ukurannya.
              </p>
              <p>
                Bongkarlah rahasia luas 7 bangun datar lewat 5 misi arsitektur. Kumpulkan 5 Lencana Bintang untuk meraih <strong>Sertifikat Arsitek Cilik Terbaik</strong>!
              </p>
              <p className="font-bold text-right text-slate-800 pt-1">
                — Wali Kota Kota Impian 🏛️
              </p>
            </div>
          </div>

          {/* 3 Tujuan Belajar Singkat */}
          <div>
            <h3 className="font-heading font-black text-slate-900 text-sm md:text-base mb-2.5 flex items-center gap-1.5">
              <span>🎯</span> 3 Tujuan Belajar Arsitek Cilik:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-xs">
                <div className="font-bold text-amber-600 text-xs mb-1">01. Petak Satuan</div>
                <div className="text-xs text-slate-600 leading-snug">
                  Memahami luas = banyaknya petak satuan cm² & m² penutup permukaan.
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-sky-200 shadow-xs">
                <div className="font-bold text-sky-600 text-xs mb-1">02. Bongkar Rumus</div>
                <div className="text-xs text-slate-600 leading-snug">
                  Menemukan rumus 7 bangun lewat potong, geser, dan gabung bentuk.
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-xs">
                <div className="font-bold text-emerald-600 text-xs mb-1">03. Bangun Kota</div>
                <div className="text-xs text-slate-600 leading-snug">
                  Menerapkan hitungan pada masalah nyata dan denah gabungan.
                </div>
              </div>
            </div>
          </div>

          {/* Quick CTA to Intro Tool */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                playSound.click();
                onNavigate('intro-area');
              }}
              className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-heading font-black rounded-xl shadow-md transition-all text-sm"
            >
              <span>Pelajari Alat Luas Dulu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-500 font-medium">atau pilih misi di peta bawah ini!</span>
          </div>
        </div>
      </div>

      {/* Bagian 2: Peta Misi Kota Impian */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-md w-fit mb-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Cetak Biru Kota Impian</span>
            </div>
            <h2 className="font-heading font-black text-2xl md:text-3xl text-slate-900 tracking-tight">
              Peta 5 Misi Arsitek
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Selesaikan setiap misi untuk menyalakan Lencana Bintang Emas arsitekturmu!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-2xl border border-amber-200">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-lg">
              ⭐
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Progres Lencana:</div>
              <div className="text-lg font-heading font-black text-slate-900">
                {completedCount} dari 5 Selesai
              </div>
            </div>
          </div>
        </div>

        {/* 5 Missions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {missionsList.map((m, idx) => {
            const isDone = progress[m.key];
            return (
              <div
                key={m.id}
                onClick={() => {
                  playSound.click();
                  onNavigate(m.id);
                }}
                className={`relative p-5 rounded-2xl border transition-all cursor-pointer group hover:-translate-y-1 hover:shadow-lg ${
                  isDone
                    ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-300/40'
                    : 'bg-white border-slate-200/90 hover:border-amber-400'
                }`}
              >
                {/* Header Icon + Star */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center text-2xl transition-colors">
                    {m.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    {isDone ? (
                      <span className="flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-200/90 px-2.5 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                        Lencana Diraih!
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 text-slate-300" />
                        Belum Diuji
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                  Misi 0{idx + 1}
                </div>
                <h3 className="font-heading font-black text-lg text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                  {m.title.replace(`Misi ${idx + 1}: `, '')}
                </h3>
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  📐 {m.shapes}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {m.concept}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                  <span>{isDone ? 'Buka Kembali Misi' : 'Mulai Jalankan Misi'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}

          {/* Quick Bonus Tile: Tabel Rahasia & Uji Akhir */}
          <div
            onClick={() => {
              playSound.click();
              onNavigate('secret-table');
            }}
            className="p-5 rounded-2xl border border-sky-200 bg-sky-50/60 hover:bg-sky-50 cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-2xl mb-3">
                📖
              </div>
              <div className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                Catatan Rahasia
              </div>
              <h3 className="font-heading font-black text-lg text-slate-900 mb-1">
                Tabel Rahasia 7 Bangun Datar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ringkasan lengkap 7 rumus luas dengan kalkulator arsitek interaktif!
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-sky-100 text-xs font-bold text-sky-700 group-hover:translate-x-1 transition-transform">
              <span>Buka Tabel Rahasia</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Bottom Banner to Final Test */}
        <div className="mt-8 p-5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shrink-0">
              🏆
            </div>
            <div>
              <h4 className="font-heading font-black text-lg leading-tight">
                Siap Mendapat Sertifikat Arsitek Cilik Terbaik?
              </h4>
              <p className="text-xs text-amber-100 font-medium">
                Selesaikan 5 soal latihan untuk mencetak sertifikat resmi bertanda tangan Wali Kota!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playSound.fanfare();
              onNavigate('quiz-assessment');
            }}
            className="px-5 py-3 bg-white hover:bg-amber-50 text-amber-900 font-heading font-black text-sm rounded-xl shadow-md transition-all whitespace-nowrap active:scale-95"
          >
            Uji Kemampuan & Sertifikat
          </button>
        </div>
      </div>
    </div>
  );
};
