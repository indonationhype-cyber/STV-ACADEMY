import Navbar from '@/components/Navbar';
import MemberProfileCard from '@/components/dashboard/MemberProfileCard';
import IphoneRewardProgress from '@/components/dashboard/IphoneRewardProgress';
import Link from 'next/link';

export default function DashboardPage() {
  // Demo Mock Data Member (Dalam produksi, data ini diambil dari Supabase berdasarkan sesi login)
  const mockMember = {
    id: 'e4a8b291-7c32-4d10-8912-984210a8ef12',
    nama_lengkap: 'Budi Santoso',
    whatsapp: '081234567890',
    kota: 'Jakarta Pusat',
    level_status: 'Level 3' as const,
    bybit_uid: '18492041',
    exness_uid: '9201482',
  };

  const mockTradingVolume = {
    accumulatedVolumeUsd: 750000,
    targetVolumeUsd: 1000000,
  };

  return (
    <div className="min-h-screen bg-primary-bg text-white font-body selection:bg-primary-accent selection:text-primary-bg">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">
            Member Portal
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Kelola profil keanggotaan, tautkan UID partner, dan pantau reward trading Anda.
          </p>
        </div>

        {/* Profil & Form UID Partner */}
        <MemberProfileCard member={mockMember} />

        {/* Visual Progress Bar Reward iPhone */}
        <IphoneRewardProgress
          levelStatus={mockMember.level_status}
          accumulatedVolumeUsd={mockTradingVolume.accumulatedVolumeUsd}
          targetVolumeUsd={mockTradingVolume.targetVolumeUsd}
        />

        {/* Quick Shortcut Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-secondary-surface/60 pt-8">
          <Link
            href="/academy"
            className="rounded-2xl border border-secondary-surface bg-[#080A08] p-5 transition-all hover:border-primary-accent/40 hover:bg-[#142800]/20"
          >
            <span className="text-xl mb-2 block">🎓</span>
            <h4 className="font-heading text-sm font-bold text-white">Stonevalley Academy</h4>
            <p className="text-xs text-gray-400 mt-1">Akses modul AMT, Footprint, & DOM[cite: 4].</p>
          </Link>

          <Link
            href="/orderflow"
            className="rounded-2xl border border-secondary-surface bg-[#080A08] p-5 transition-all hover:border-primary-accent/40 hover:bg-[#142800]/20"
          >
            <span className="text-xl mb-2 block">📊</span>
            <h4 className="font-heading text-sm font-bold text-white">Order Flow Engine</h4>
            <p className="text-xs text-gray-400 mt-1">Chart CVD & Delta real-time WebSocket[cite: 4].</p>
          </Link>

          <Link
            href="/terminal"
            className="rounded-2xl border border-secondary-surface bg-[#080A08] p-5 transition-all hover:border-primary-accent/40 hover:bg-[#142800]/20"
          >
            <span className="text-xl mb-2 block">🌐</span>
            <h4 className="font-heading text-sm font-bold text-white">Market Terminal</h4>
            <p className="text-xs text-gray-400 mt-1">Pantau SoSoValue ETF Inflow & berita.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
