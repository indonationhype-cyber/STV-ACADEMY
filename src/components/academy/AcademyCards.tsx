'use client';

interface CardData {
  id: string;
  badge: string;
  title: string;
  description: string;
  topics: string[];
  level: string;
}

export default function AcademyCards() {
  const cards: CardData[] = [
    {
      id: 'amt',
      badge: 'PRO MODULE',
      title: 'Auction Market Theory (AMT)',
      description: 'Memahami dinamika keseimbangan pasar, struktur nilai harga, dan rotasi likuiditas secara rasional.',
      topics: ['Balance vs Imbalance', 'Value Area (VAH & VAL)', 'Point of Control (POC)'],
      level: 'Level 01 - 02',
    },
    {
      id: 'footprint',
      badge: 'ADVANCED ORDER FLOW',
      title: 'Footprint & Delta Imbalance',
      description: 'Identifikasi pelaku pasar agresif (market order buyers/sellers) melalui visualisasi real-time bid/ask volume.',
      topics: ['Cumulative Volume Delta (CVD)', 'Stacked Imbalances', 'Unfinished Auctions'],
      level: 'Level 03',
    },
    {
      id: 'dom',
      badge: 'INSTITUTIONAL DEPTH',
      title: 'Market Depth & DOM',
      description: 'Menganalisis limit order book untuk mendeteksi penyerapan likuiditas, dinding order, dan aksi penipuan pasar (spoofing).',
      topics: ['Limit Order Book (LOB)', 'Liquidity Absorption', 'Spoofing & Iceberg Orders'],
      level: 'Level 04',
    },
  ];

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-white">
          Materi Unggulan Analisis Mekanis
        </h2>
        <p className="font-body text-xs text-gray-400 mt-1">
          Fokus pada eksekusi berbasis fakta objektif, bukan indikator lagging terbelakang.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-secondary-surface bg-[#142800]/20 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary-accent/50 hover:bg-[#142800]/40 hover:shadow-[0_0_20px_rgba(143,236,0,0.1)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-primary-accent/10 px-3 py-1 text-[10px] font-bold tracking-wider text-primary-accent uppercase font-body">
                  {card.badge}
                </span>
                <span className="text-xs font-mono text-gray-500">{card.level}</span>
              </div>

              <h3 className="font-heading text-xl font-bold text-white group-hover:text-primary-accent transition-colors">
                {card.title}
              </h3>

              <p className="mt-3 font-body text-xs text-gray-300 leading-relaxed">
                {card.description}
              </p>

              <div className="mt-6 space-y-2 border-t border-secondary-surface/60 pt-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-body">
                  Key Concepts:
                </p>
                <ul className="space-y-1">
                  {card.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-body">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-accent" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className="mt-8 w-full rounded-xl bg-primary-accent/10 border border-primary-accent/30 px-4 py-3 font-body text-xs font-bold text-primary-accent transition-all duration-200 hover:bg-primary-accent hover:text-primary-bg">
              Pelajari Modul Ini →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
