'use client';
import { useEffect, useState } from 'react';

interface EtfData {
  btcDailyInflow: string;
  ethDailyInflow: string;
  btcCumulativeInflow: string;
  totalAum: string;
  status: string;
}

export default function EtfFlowSummary() {
  const [data, setData] = useState<EtfData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEtfData() {
      try {
        const res = await fetch('/api/sosovalue');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch SoSoValue data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEtfData();
  }, []);

  return (
    <div className="rounded-2xl border border-secondary-surface bg-[#142800]/30 p-6 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold text-gray-400 font-body uppercase tracking-wider">
            SoSoValue Data Engine
          </span>
          <h2 className="font-heading text-xl font-bold text-white mt-1">
            Institutional Daily ETF Flow
          </h2>
        </div>

        {/* Status Indikator Institusi */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-accent/40 bg-primary-accent/10 px-3 py-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-accent"></span>
          </span>
          <span className="text-xs font-bold text-primary-accent uppercase tracking-wide font-body">
            {data?.status || 'BUYING / ACCUMULATING'}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse py-8 text-center text-xs text-gray-500 font-mono">
          Loading SoSoValue Ingestion Engine...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-secondary-surface bg-[#080A08] p-4">
            <p className="text-xs text-gray-400 font-body">BTC ETF Daily Inflow</p>
            <p className="mt-2 text-xl font-bold font-mono text-primary-accent">
              {data?.btcDailyInflow}
            </p>
          </div>

          <div className="rounded-xl border border-secondary-surface bg-[#080A08] p-4">
            <p className="text-xs text-gray-400 font-body">ETH ETF Daily Inflow</p>
            <p className="mt-2 text-xl font-bold font-mono text-primary-accent">
              {data?.ethDailyInflow}
            </p>
          </div>

          <div className="rounded-xl border border-secondary-surface bg-[#080A08] p-4">
            <p className="text-xs text-gray-400 font-body">BTC Cumulative Inflow</p>
            <p className="mt-2 text-xl font-bold font-mono text-white">
              {data?.btcCumulativeInflow}
            </p>
          </div>

          <div className="rounded-xl border border-secondary-surface bg-[#080A08] p-4">
            <p className="text-xs text-gray-400 font-body">Total ETF Net Assets (AUM)</p>
            <p className="mt-2 text-xl font-bold font-mono text-white">
              {data?.totalAum}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
