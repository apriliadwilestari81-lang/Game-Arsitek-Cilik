import React from 'react';
import { ActiveView, MissionProgress } from '../types';
import { Star, Volume2, VolumeX, BookOpen, MapPin, Award } from 'lucide-react';
import { playSound, isSoundEnabled, setSoundEnabled } from '../utils/sound';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  progress: MissionProgress;
  onOpenTeacherNotes: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  progress,
  onOpenTeacherNotes,
}) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSound.click();
  };

  const completedCount = Object.values(progress).filter(Boolean).length;

  const handleNav = (view: ActiveView) => {
    playSound.click();
    setActiveView(view);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 px-4 md:px-8 py-3 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNav('cover')}
          className="flex items-center gap-2 text-left group shrink-0 focus-visible:outline-amber-500 rounded-lg"
          aria-label="Kembali ke Halaman Utama"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
            📐
          </div>
          <span className="font-heading font-black text-slate-900 text-base md:text-lg tracking-tight whitespace-nowrap">
            Arsitek Cilik <span className="text-amber-600 font-bold hidden sm:inline">Kota Impian</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-600">
          <button
            onClick={() => handleNav('letter-map')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-600 flex items-center gap-1.5 ${
              activeView === 'letter-map' ? 'text-amber-600 font-bold underline underline-offset-8 decoration-2' : ''
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-500" />
            Peta Misi
          </button>

          <button
            onClick={() => handleNav('intro-area')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-600 ${
              activeView === 'intro-area' ? 'text-amber-600 font-bold underline underline-offset-8 decoration-2' : ''
            }`}
          >
            Alat Luas
          </button>

          <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200/60">
            {(['mission-1', 'mission-2', 'mission-3', 'mission-4', 'mission-5'] as ActiveView[]).map((mId, idx) => {
              const missionKey = `mission${idx + 1}` as keyof MissionProgress;
              const isDone = progress[missionKey];
              const isActive = activeView === mId;
              return (
                <button
                  key={mId}
                  onClick={() => handleNav(mId)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs'
                      : isDone
                      ? 'bg-amber-100 text-amber-900 hover:bg-amber-200/70'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                  title={`Misi ${idx + 1}`}
                >
                  <span>Misi {idx + 1}</span>
                  {isDone && <Star className="w-3 h-3 fill-amber-500 text-amber-600" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handleNav('secret-table')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-600 ${
              activeView === 'secret-table' ? 'text-amber-600 font-bold underline underline-offset-8 decoration-2' : ''
            }`}
          >
            Tabel Rahasia
          </button>

          <button
            onClick={() => handleNav('quiz-assessment')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-600 flex items-center gap-1 ${
              activeView === 'quiz-assessment' ? 'text-amber-600 font-bold underline underline-offset-8 decoration-2' : ''
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            Uji Arsitek
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Badge & Tools */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Star Badge */}
          <div 
            onClick={() => handleNav('letter-map')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-100/80 border border-amber-300 rounded-xl cursor-pointer hover:bg-amber-200 transition-colors"
            title={`${completedCount} dari 5 Misi Selesai`}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="font-heading font-black text-amber-900 text-xs md:text-sm tabular-nums">
              {completedCount}/5
            </span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            className="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors focus-visible:outline-amber-500"
            title={soundOn ? 'Matikan Suara' : 'Nyalakan Suara'}
            aria-label={soundOn ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundOn ? <Volume2 className="w-5 h-5 text-amber-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Teacher Notes Modal Trigger */}
          <button
            onClick={() => {
              playSound.click();
              onOpenTeacherNotes();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300/80 transition-colors whitespace-nowrap"
            title="Catatan Guru & Kunci Jawaban"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Catatan Guru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
