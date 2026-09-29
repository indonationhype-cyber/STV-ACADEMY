TypeScript
'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import OrderFlowChart from '../../components/chart/OrderFlowChart';

export default function OrderFlowPage() {
  const [symbol, setSymbol] = useState<'BTCUSDT' | 'ETHUSDT' | 'SOLUSDT'>('BTCUSDT');
  const [source, setSource] = useState<'bybit' | 'binance'>('bybit');

  return (
    <div className="min-h-screen bg-primary-bg text-white font-body selection:bg-primary-accent selection:text-primary-bg">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Title & Controller Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary-accent animate-pulse" />
              Order Flow & CVD Charting Engine
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-body">
              Data eksekusi agresif real-time terhubung langsung ke WebSocket Bybit & Binance[cite: 4].
            </p>
          </div>

          {/* Control Switchers */}
          <div className="flex items-center gap-3">
            {/* Pair Switcher */}
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value as any)}
              className="rounded-xl border border-secondary-surface bg-[#080A08] px-3 py-2 text-xs font-mono font-bold text-primary-accent focus:border-primary-accent focus:outline-none"
            >
              <option value="BTCUSDT">BTC/USDT</option>
              <option value="ETHUSDT">ETH/USDT</option>
              <option value="SOLUSDT">SOL/USDT</option>
            </select>

            {/* Source Switcher */}
            <div className="flex rounded-xl border border-secondary-surface bg-[#080A08] p-1 font-mono text-xs">
              <button
                onClick={() => setSource('bybit')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  source === 'bybit' ? 'bg-primary-accent text-primary-bg font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Bybit
              </button>
              <button
                onClick={() => setSource('binance')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  source === 'binance' ? 'bg-primary-accent text-primary-bg font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Binance
              </button>
            </div>
          </div>
        </div>

        {/* Lightweight Canvas Chart Component */}
        <OrderFlowChart symbol={symbol} source={source} />
      </main>
    </div>
  );
}
