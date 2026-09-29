import Navbar from '@/components/Navbar';
import MarketTicker from '@/components/terminal/MarketTicker';
import EtfFlowSummary from '@/components/terminal/EtfFlowSummary';
import NewsFeedTerminal from '@/components/terminal/NewsFeedTerminal';

export default function TerminalPage() {
  return (
    <div className="min-h-screen bg-primary-bg text-white font-body selection:bg-primary-accent selection:text-primary-bg">
      <Navbar />
      
      {/* Real-time Ticker Header */}
      <MarketTicker />

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">
            Market Intelligence Terminal
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Data real-time aliran dana institusi & analisis pasar crypto global.
          </p>
        </div>

        {/* SoSoValue ETF Flow */}
        <EtfFlowSummary />

        {/* Live News Terminal Feed */}
        <NewsFeedTerminal />
      </main>
    </div>
  );
}
