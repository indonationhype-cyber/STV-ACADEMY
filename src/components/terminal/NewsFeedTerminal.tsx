'use client';

interface NewsItem {
  id: string;
  time: string;
  title: string;
  source: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

export default function NewsFeedTerminal() {
  const newsFeed: NewsItem[] = [
    {
      id: '1',
      time: '14:32 WITA',
      title: 'BlackRock iShares Bitcoin Trust mencatatkan net inflow $320M dalam sesi perdagangan hari ini.',
      source: 'Bloomberg Terminal',
      sentiment: 'BULLISH',
    },
    {
      id: '2',
      time: '13:15 WITA',
      title: 'Federal Reserve memberikan sinyal penyesuaian suku bunga pada kuartal mendatang.',
      source: 'Reuters Financial',
      sentiment: 'NEUTRAL',
    },
    {
      id: '3',
      time: '11:40 WITA',
      title: 'Data Order Flow dan Liquidity Heatmap menunjukkan akumulasi agresif pada level support $92,000.',
      source: 'Stonevalley Analytics',
      sentiment: 'BULLISH',
    },
    {
      id: '4',
      time: '09:05 WITA',
      title: 'Regulator memantau aktivitas transaksi derivatif pasar crypto menjelang penutupan opsi bulanan.',
      source: 'CoinDesk',
      sentiment: 'BEARISH',
    },
  ];

  return (
    <div className="rounded-2xl border border-secondary-surface bg-[#080A08] p-6">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-secondary-surface">
        <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary-accent" />
          Live Terminal Intelligence
        </h3>
        <span className="text-xs font-mono text-gray-500">AUTO-REFRESH: 60S</span>
      </div>

      <div className="space-y-4 font-body">
        {newsFeed.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl border border-secondary-surface/50 bg-[#142800]/20 p-4 transition-all hover:border-primary-accent/40 hover:bg-[#142800]/40"
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-gray-400">{item.time} • {item.source}</span>
              <span
                className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                  item.sentiment === 'BULLISH'
                    ? 'bg-primary-accent/20 text-primary-accent'
                    : item.sentiment === 'BEARISH'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-gray-700/30 text-gray-300'
                }`}
              >
                {item.sentiment}
              </span>
            </div>
            <p className="text-sm text-gray-200 group-hover:text-white transition-colors leading-relaxed">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
