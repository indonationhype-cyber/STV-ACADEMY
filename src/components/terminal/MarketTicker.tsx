'use client';

interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change24h: string;
  isPositive: boolean;
}

export default function MarketTicker() {
  const tickers: TickerItem[] = [
    { symbol: 'BTC/USD', name: 'Bitcoin', price: '$94,250.00', change24h: '+2.45%', isPositive: true },
    { symbol: 'ETH/USD', name: 'Ethereum', price: '$3,480.10', change24h: '+1.82%', isPositive: true },
    { symbol: 'SOL/USD', name: 'Solana', price: '$212.50', change24h: '-0.65%', isPositive: false },
    { symbol: 'XAU/USD', name: 'Gold', price: '$2,654.80', change24h: '+0.40%', isPositive: true },
  ];

  return (
    <div className="w-full overflow-x-auto border-b border-secondary-surface bg-[#080A08] py-3 px-4 no-scrollbar">
      <div className="flex items-center gap-6 min-w-max">
        <span className="flex items-center gap-2 text-xs font-bold text-primary-accent uppercase tracking-wider font-heading">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-accent"></span>
          </span>
          Live Market
        </span>

        <div className="h-4 w-[1px] bg-secondary-surface" />

        {tickers.map((t) => (
          <div key={t.symbol} className="flex items-center gap-3 text-xs font-body">
            <span className="font-bold text-white">{t.symbol}</span>
            <span className="text-gray-300 font-mono">{t.price}</span>
            <span className={`font-mono font-semibold ${t.isPositive ? 'text-[#8fec00]' : 'text-red-400'}`}>
              {t.change24h}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
