import React from 'react';
import { X, BookOpen, CheckCircle, AlertTriangle, Lightbulb, GraduationCap } from 'lucide-react';
import { playSound } from '../utils/sound';

interface TeacherNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherNotesModal: React.FC<TeacherNotesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col border border-amber-300 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-amber-500 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-200" />
            <div>
              <h2 className="font-heading font-black text-lg">
                Catatan Guru (Speaker Notes) & Kunci Jawaban
              </h2>
              <div className="text-xs text-amber-100 font-medium">
                Panduan Pedagogis Media Pembelajaran Matematika Kelas 5 SD
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Tutup Catatan Guru"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Section 1: CP & Tujuan */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-amber-950 text-xs uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>Capaian Pembelajaran (Fase C - Kelas 5 SD)</span>
            </div>
            <p className="text-xs leading-relaxed">
              Peserta didik mampu menentukan dan menyelesaikan masalah yang berkaitan dengan luas bangun datar (persegi, persegi panjang, segitiga, jajar genjang, trapesium, belah ketupat, dan layang-layang) serta gabungan bangun datar secara visual dan bermakna.
            </p>
          </div>

          {/* Section 2: Kunci Jawaban Misi "Coba Kamu!" */}
          <div className="space-y-3">
            <h3 className="font-heading font-black text-slate-900 text-base flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Kunci Jawaban Misi 1 – 5 ("Coba Kamu!")</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-amber-700 block mb-1">Misi 1: Taman & Kolam</span>
                <div>• Persegi sisi 6 m = 6 × 6 = <strong>36 m²</strong></div>
                <div>• Persegi panjang 7 m × 3 m = 7 × 3 = <strong>21 m²</strong></div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-sky-700 block mb-1">Misi 2: Atap Segitiga</span>
                <div>• Segitiga alas 8 cm, tinggi 5 cm:</div>
                <div>½ × 8 × 5 = ½ × 40 = <strong>20 cm²</strong></div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-orange-700 block mb-1">Misi 3: Jendela Jajar Genjang</span>
                <div>• Jajar genjang alas 5 cm, tinggi 3 cm:</div>
                <div>5 × 3 = <strong>15 cm²</strong></div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-1">Misi 4: Jembatan Trapesium</span>
                <div>• Sisi sejajar 3 cm & 5 cm, tinggi 4 cm:</div>
                <div>(3 + 5) = 8 cm → ½ × 8 × 4 = <strong>16 cm²</strong></div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 md:col-span-2">
                <span className="font-bold text-emerald-700 block mb-1">Misi 5: Ubin Belah Ketupat & Layang-layang</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>• Belah ketupat d₁=10 cm, d₂=4 cm: ½ × 10 × 4 = <strong>20 cm²</strong></div>
                  <div>• Layang-layang d₁=6 cm, d₂=6 cm: ½ × 6 × 6 = <strong>18 cm²</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Kunci Jawaban Uji Kemampuan Arsitek (5 Soal) */}
          <div className="space-y-3">
            <h3 className="font-heading font-black text-slate-900 text-base flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Kunci Jawaban Uji Kemampuan Arsitek (5 Soal)</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200">
                <strong>Soal 1: Persegi sisi 7 m</strong> → Luas = s × s = 7 × 7 = <strong>49 m²</strong>.
              </div>
              <div className="p-2.5 bg-sky-50/60 rounded-xl border border-sky-200">
                <strong>Soal 2: Persegi panjang 9 m × 4 m</strong> → Luas = p × l = 9 × 4 = <strong>36 m²</strong>.
              </div>
              <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <strong>Soal 3: Segitiga alas 10 cm, tinggi 6 cm</strong> → Luas = ½ × 10 × 6 = <strong>30 cm²</strong>.
              </div>
              <div className="p-2.5 bg-indigo-50/60 rounded-xl border border-indigo-200">
                <strong>Soal 4: Trapesium sisi sejajar 5 cm & 7 cm, tinggi 4 cm</strong> → Luas = ½ × (5 + 7) × 4 = ½ × 12 × 4 = <strong>24 cm²</strong>.
              </div>
              <div className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-200">
                <strong>Soal 5 (Bintang Bonus - Bangun Gabungan):</strong>
                <div>• Luas persegi panjang bawah = 8 × 5 = 40 m²</div>
                <div>• Luas atap segitiga atas = ½ × 8 × 3 = 12 m²</div>
                <div>• Luas total bangunan = 40 + 12 = <strong>52 m²</strong>.</div>
              </div>
            </div>
          </div>

          {/* Section 4: Miskonsepsi Umum & Tips Mengajar */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-black text-slate-900 text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Miskonsepsi Umum Siswa Kelas 5 & Solusinya</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
              <li>
                <strong>Tinggi vs Sisi Miring:</strong> Pada segitiga dan jajar genjang, siswa sering mengukur sisi miring alih-alih tinggi tegak lurus. <em>Tekankan tanda siku-siku (∟)!</em>
              </li>
              <li>
                <strong>Lupa Mengalikan ½:</strong> Siswa sering lupa membagi dua pada segitiga dan layang-layang/belah ketupat karena terbiasa dengan rumus persegi panjang. Tunjukkan visual belahan diagonal.
              </li>
              <li>
                <strong>Urutan Operasi Trapesium:</strong> Selalu ingatkan siswa untuk mengerjakan operasi dalam tanda kurung $(a + b)$ terlebih dahulu sebelum mengalikan tinggi.
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Tutup Catatan
          </button>
        </div>
      </div>
    </div>
  );
};
