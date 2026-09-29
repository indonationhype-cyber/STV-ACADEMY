import Navbar from '@/components/Navbar';
import AcademyCards from '@/components/academy/AcademyCards';
import CurriculumModules from '@/components/academy/CurriculumModules';

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-primary-bg text-white font-body selection:bg-primary-accent selection:text-primary-bg">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-10">
        {/* Banner Selamat Datang */}
        <div className="rounded-3xl border border-secondary-surface bg-gradient-to-r from-[#142800]/50 to-primary-bg p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block rounded-full border border-primary-accent/40 bg-primary-accent/10 px-3 py-1 text-xs font-semibold text-primary-accent uppercase font-body mb-4">
              MEMBER ACCESS GRANTED
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Stonevalley Academy <span className="text-primary-accent">Portal</span>
            </h1>
            <p className="mt-4 font-body text-sm text-gray-300 leading-relaxed">
              Selamat datang di portal pembelajaran riset institusional. Pelajari metodologi kuantitatif, analisis order flow, dan strategi pengelolaan risiko.
            </p>
          </div>
        </div>

        {/* 3 Showcase Cards Utama */}
        <AcademyCards />

        {/* Modul Kurikulum Terstruktur */}
        <CurriculumModules />
      </main>
    </div>
  );
}
