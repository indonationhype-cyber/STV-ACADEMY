'use client';
import { useState } from 'react';

interface MemberData {
  id: string;
  nama_lengkap: string;
  whatsapp: string;
  kota: string;
  level_status: 'Level 1' | 'Level 2' | 'Level 3';
  bybit_uid?: string;
  exness_uid?: string;
}

export default function MemberProfileCard({ member }: { member: MemberData }) {
  const [bybitUid, setBybitUid] = useState(member.bybit_uid || '');
  const [exnessUid, setExnessUid] = useState(member.exness_uid || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveUid = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/user/uid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: member.id,
          bybit_uid: bybitUid,
          exness_uid: exnessUid,
        }),
      });

      if (res.ok) {
        setMessage('UID Partner berhasil dikaitkan!');
      } else {
        setMessage('Gagal menyimpan UID. Silakan coba lagi.');
      }
    } catch (err) {
      setMessage('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-secondary-surface bg-[#080A08] p-6 backdrop-blur-md">
      {/* Header Profile Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary-surface">
        <div>
          <span className="text-xs font-mono text-gray-500">MEMBER ID: {member.id.substring(0, 8)}...</span>
          <h2 className="font-heading text-2xl font-bold text-white mt-1">
            {member.nama_lengkap}
          </h2>
          <p className="font-body text-xs text-gray-400 mt-1">
            {member.kota} • {member.whatsapp}
          </p>
        </div>

        {/* Level Status Badge */}
        <div className="self-start sm:self-center">
          <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Status Keanggotaan</span>
          <span className="inline-block rounded-full bg-primary-accent/10 border border-primary-accent/40 px-4 py-1.5 font-heading text-xs font-bold text-primary-accent tracking-wider uppercase shadow-[0_0_12px_rgba(143,236,0,0.2)]">
            {member.level_status}
          </span>
        </div>
      </div>

      {/* Form Input UID Partner (Bybit & Exness) */}
      <form onSubmit={handleSaveUid} className="mt-6 space-y-4">
        <h3 className="font-heading text-sm font-semibold text-white">
          Kaitkan UID Account Partner
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-xs font-medium text-gray-300 mb-1">
              Bybit UID (Crypto)
            </label>
            <input
              type="text"
              placeholder="Contoh: 12345678"
              value={bybitUid}
              onChange={(e) => setBybitUid(e.target.value)}
              className="w-full rounded-xl border border-secondary-surface bg-[#142800]/20 p-3 font-mono text-xs text-white focus:border-primary-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-body text-xs font-medium text-gray-300 mb-1">
              Exness UID (Forex & CFD)
            </label>
            <input
              type="text"
              placeholder="Contoh: 87654321"
              value={exnessUid}
              onChange={(e) => setExnessUid(e.target.value)}
              className="w-full rounded-xl border border-secondary-surface bg-[#142800]/20 p-3 font-mono text-xs text-white focus:border-primary-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary-accent px-5 py-2.5 font-body text-xs font-bold text-primary-bg shadow-[0_0_15px_rgba(143,236,0,0.3)] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan UID Partner'}
          </button>

          {message && (
            <span className="font-body text-xs text-primary-accent animate-pulse">
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
