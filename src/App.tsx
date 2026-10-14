import React, { useState, useEffect } from 'react';
import { ActiveView, MissionProgress } from './types';
import { Navbar } from './components/Navbar';
import { CoverSection } from './components/CoverSection';
import { MayorLetterMapSection } from './components/MayorLetterMapSection';
import { AreaToolIntro } from './components/AreaToolIntro';
import { MissionSquareRect } from './components/missions/MissionSquareRect';
import { MissionTriangle } from './components/missions/MissionTriangle';
import { MissionParallelogram } from './components/missions/MissionParallelogram';
import { MissionTrapezoid } from './components/missions/MissionTrapezoid';
import { MissionRhombusKite } from './components/missions/MissionRhombusKite';
import { SecretTableSection } from './components/SecretTableSection';
import { QuizAssessmentSection } from './components/QuizAssessmentSection';
import { TeacherNotesModal } from './components/TeacherNotesModal';
import { playSound } from './utils/sound';
import { BookOpen, MapPin, Award, Compass, Star } from 'lucide-react';

const STORAGE_KEY = 'arsitek_cilik_progress_v1';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('cover');
  const [isTeacherNotesOpen, setIsTeacherNotesOpen] = useState(false);

  // Initialize progress from localStorage
  const [progress, setProgress] = useState<MissionProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      mission1: false,
      mission2: false,
      mission3: false,
      mission4: false,
      mission5: false,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const handleCompleteMission = (key: keyof MissionProgress) => {
    setProgress((prev) => {
      const next = { ...prev, [key]: true };
      return next;
    });
    playSound.star();
  };

  const handleResetProgress = () => {
    if (window.confirm('Mulai ulang petualangan dari awal? Semua lencana bintang akan direset.')) {
      setProgress({
        mission1: false,
        mission2: false,
        mission3: false,
        mission4: false,
        mission5: false,
      });
      playSound.click();
      setActiveView('cover');
    }
  };

  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        progress={progress}
        onOpenTeacherNotes={() => setIsTeacherNotesOpen(true)}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 pb-12">
        {activeView === 'cover' && (
          <CoverSection
            onStart={() => setActiveView('letter-map')}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'letter-map' && (
          <MayorLetterMapSection
            onNavigate={setActiveView}
            progress={progress}
          />
        )}

        {activeView === 'intro-area' && (
          <AreaToolIntro onNavigate={setActiveView} />
        )}

        {activeView === 'mission-1' && (
          <MissionSquareRect
            onComplete={() => handleCompleteMission('mission1')}
            isCompleted={progress.mission1}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'mission-2' && (
          <MissionTriangle
            onComplete={() => handleCompleteMission('mission2')}
            isCompleted={progress.mission2}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'mission-3' && (
          <MissionParallelogram
            onComplete={() => handleCompleteMission('mission3')}
            isCompleted={progress.mission3}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'mission-4' && (
          <MissionTrapezoid
            onComplete={() => handleCompleteMission('mission4')}
            isCompleted={progress.mission4}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'mission-5' && (
          <MissionRhombusKite
            onComplete={() => handleCompleteMission('mission5')}
            isCompleted={progress.mission5}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'secret-table' && (
          <SecretTableSection onNavigate={setActiveView} />
        )}

        {activeView === 'quiz-assessment' && (
          <QuizAssessmentSection onNavigate={setActiveView} />
        )}
      </main>

      {/* Child-Friendly Educational Footer */}
      <footer className="border-t border-amber-200 bg-white/95 px-4 md:px-8 py-6 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center font-black text-xs">
              📐
            </div>
            <span className="font-heading font-black text-slate-800 text-sm">
              Petualangan Arsitek Cilik: Membongkar Rahasia Luas Bangun Datar
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Matematika Kelas 5 SD</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => {
                playSound.click();
                setIsTeacherNotesOpen(true);
              }}
              className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 hover:underline"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Catatan Guru & Kunci Jawaban</span>
            </button>

            <span>·</span>

            <button
              onClick={handleResetProgress}
              className="text-slate-400 hover:text-rose-600 transition-colors"
              title="Reset Semua Lencana Bintang"
            >
              Reset Progres
            </button>
          </div>
        </div>
      </footer>

      {/* Teacher Notes Modal */}
      <TeacherNotesModal
        isOpen={isTeacherNotesOpen}
        onClose={() => setIsTeacherNotesOpen(false)}
      />
    </div>
  );
}
