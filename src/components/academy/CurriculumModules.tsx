'use client';

interface LevelModule {
  levelNumber: string;
  title: string;
  subtitle: string;
  duration: string;
  lessons: { title: string; duration: string; completed?: boolean }[];
}

export default function CurriculumModules() {
  const curriculum: LevelModule[] = [
    {
      levelNumber: 'LEVEL 01',
      title: 'Pondasi Mekanisme Pasar',
      subtitle: 'Memahami bagaimana pasar bekerja di balik layar, interaksi order book, dan Auction Process.',
      duration: '4 Modul • 2.5 Jam',
      lessons: [
        { title: 'Pengenalan Limit vs Market Order', duration: '20 menit', completed: true },
        { title: 'Anatomi Order Book & Bid-Ask Spread', duration: '35 menit', completed: true },
        { title: 'Prinsip Auction Market Theory Dasar', duration: '45 menit' },
        { title: 'Pengenalan Volume Profile & Initial Balance', duration: '40 menit' },
      ],
    },
    {
      levelNumber: 'LEVEL 02',
      title: 'Telescopic Matrix',
      subtitle: 'Navigasi multi-timeframe terstruktur untuk menyatukan konteks makro dengan eksekusi mikro.',
      duration: '3 Modul • 2 Jam',
      lessons: [
        { title: 'Pemetaan Konteks Harian & Mingguan', duration: '30 menit' },
        { title: 'Identifikasi Rotasi Value Area (VAH/VAL/POC)', duration: '45 menit' },
        { title: 'Struktur Market Imbalance & Gap Analysis', duration: '45 menit' },
      ],
    },
    {
      levelNumber: 'LEVEL 03',
      title: 'Smart Money Concepts & Order Flow',
      subtitle: 'Analisis jejak transaksi institusi menggunakan Footprint Chart dan Cumulative Volume Delta.',
      duration: '4 Modul • 3.5 Jam',
      lessons: [
        { title: 'Membaca Footprint Charting secara Presisi', duration: '50 menit' },
        { title: 'Pemanfaatan Cumulative Volume Delta (CVD)', duration: '40 menit' },
        { title: 'Identifikasi Stop Run & Institutional Liquidity Sweep', duration: '60 menit' },
        { title: 'SMC Alignment dengan Volume Profile', duration: '60 menit' },
      ],
    },
    {
      levelNumber: 'LEVEL 04',
      title: 'Market Depth & DOM Execution',
      subtitle: 'Eksekusi order tingkat lanjut berbasis Depth of Market, penyerapan likuiditas, dan manajemen risiko.',
      duration: '3 Modul • 3 Jam',
      lessons: [
        { title: 'Membaca Tape & Depth of Market (DOM)', duration: '60 menit' },
        { title: 'Deteksi Liquidity Absorption & Iceberg Orders', duration: '60 menit' },
        { title: 'Proses Eksekusi Presisi & Trade Management', duration: '60 menit' },
      ],
    },
  ];

  return (
    <section className="py-12 border-t border-secondary-surface/50">
      <div className="mb-10">
        <span className="text-xs font-semibold text-primary-accent uppercase tracking-widest font-body">
          Syllabus Roadmap
        </span>
        <h2 className="font-heading text-3xl font-extrabold text-white mt-1">
          Kurikulum Stonevalley Academy
        </h2>
        <p className="font-body text-xs text-gray-400 mt-2">
          Jalur pembelajaran sistematis dari dasar nol hingga penguasaan instrumen institusional.
        </p>
      </div>

      <div className="space-y-8">
        {curriculum.map((level, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-secondary-surface bg-[#080A08] p-6 md:p-8 transition-all hover:border-secondary-surface/80"
          >
            {/* Header Level */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-secondary-surface/60">
              <div>
                <span className="font-mono text-xs font-bold text-primary-accent tracking-wider">
                  {level.levelNumber}
                </span>
                <h3 className="font-heading text-xl font-bold text-white mt-1">
                  {level.title}
                </h3>
                <p className="font-body text-xs text-gray-400 mt-1 max-w-2xl">
                  {level.subtitle}
                </p>
              </div>
              <span className="self-start md:self-center font-mono text-xs text-gray-500 bg-secondary-surface/40 px-3 py-1.5 rounded-lg border border-secondary-surface">
                {level.duration}
              </span>
            </div>

            {/* Daftar Lesson */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {level.lessons.map((lesson, lessonIdx) => (
                <div
                  key={lessonIdx}
                  className="flex items-center justify-between rounded-xl border border-secondary-surface/40 bg-[#142800]/10 p-4 transition-colors hover:bg-[#142800]/30"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-mono font-bold ${
                        lesson.completed
                          ? 'bg-primary-accent text-primary-bg'
                          : 'border border-gray-600 text-gray-400'
                      }`}
                    >
                      {lesson.completed ? '✓' : lessonIdx + 1}
                    </span>
                    <span className="font-body text-xs font-medium text-gray-200">
                      {lesson.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500">{lesson.duration}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
