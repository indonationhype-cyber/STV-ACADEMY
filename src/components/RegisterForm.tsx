'use client';
import { useState } from 'react';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    whatsapp: '',
    fokus_pasar: 'Forex Exness', // Default opsi Exness
    rencana_modal: '< $100',
    umur: '',
    kota: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Simpan data pendaftaran ke Supabase (API /api/register)
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // 2. Minta Link Undangan Telegram Sekali Pakai dari API Gate Bot
        try {
          const tgRes = await fetch('/api/telegram/invite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama_lengkap: formData.nama_lengkap }),
          });

          const tgData = await tgRes.json();

          if (tgRes.ok && tgData.success && tgData.invite_link) {
            // Redirect otomatis ke Link Undangan Telegram Sekali Pakai
            window.location.href = tgData.invite_link;
            return;
          }
        } catch (tgErr) {
          console.warn('Telegram Bot API belum aktif/error, mengalihkan ke WhatsApp Admin:', tgErr);
        }

        // 3. Fallback jika Telegram Bot belum aktif / error: Redirect ke WA Admin
        const message = `Halo Admin Stonevalley, saya ${formData.nama_lengkap} dari ${formData.kota} telah mendaftar di web portal. Mohon bantuan aktivasi akses.`;
        const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`; // Ganti dengan nomor WA Admin kamu
        window.location.href = waUrl;
      } else {
        alert('Gagal menyimpan data. Silakan coba lagi.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="gate" className="bg-primary-bg py-20 px-6">
      <div className="mx-auto max-w-xl rounded-3xl border border-secondary-surface bg-secondary-surface/20 p-8 md:p-10 backdrop-blur-md">
        <h2 className="font-heading text-2xl font-bold text-white text-center">
          Admission Portal Gate
        </h2>
        <p className="font-body text-xs text-gray-400 text-center mt-2 mb-8">
          Isi formulir untuk mendapatkan akses ke Stonevalley Academy & Komunitas.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 font-body text-sm">
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-secondary-surface bg-primary-bg p-3 text-white focus:border-primary-accent focus:outline-none"
              placeholder="Contoh: Budi Santoso"
              value={formData.nama_lengkap}
              onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-1">No. WhatsApp</label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-secondary-surface bg-primary-bg p-3 text-white focus:border-primary-accent focus:outline-none"
              placeholder="081234567890"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-1">Fokus Pasar</label>
              <select
                className="w-full rounded-xl border border-secondary-surface bg-primary-bg p-3 text-white focus:border-primary-accent focus:outline-none"
                value={formData.fokus_pasar}
                onChange={(e) => setFormData({ ...formData, fokus_pasar: e.target.value })}
              >
                <option value="Forex Exness">Forex (Exness)</option>
                <option value="Crypto Bybit">Crypto (Bybit)</option>
                <option value="Keduanya">Keduanya (Exness & Bybit)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-1">Rencana Modal</label>
              <select
                className="w-full rounded-xl border border-secondary-surface bg-primary-bg p-3 text-white focus:border-primary-accent focus:outline-none"
                value={formData.rencana_modal}
                onChange={(e) => setFormData({ ...formData, rencana_modal: e.target.value })}
              >
                <option value="< $100">&lt; $100</option>
                <option value="$100 - $500">$100 - $500</option>
                <option value="$500 - $1,000">$500 - $1,000</option>
                <option value="> $1,000">&gt; $1,000</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-1">Umur</label>
              <input
                type="number"
                required
                className="w-full rounded-xl border border-secondary-surface bg-primary-bg p-3 text-white focus:border-primary-accent focus:outline-none"
                placeholder="Misal: 24"
                value={formData.umur}
                onChange={(e) => setFormData({ ...formData, umur: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-1">Asal Kota</label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-secondary-surface bg-primary-bg p-3 text-white focus:border-primary-accent focus:outline-none"
                placeholder="Misal: Jakarta"
                value={formData.kota}
                onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary-accent p-4 font-body text-sm font-bold text-primary-bg shadow-[0_0_15px_rgba(143,236,0,0.3)] transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-4"
          >
            {loading ? 'Menyimpan...' : 'Simpan Data & Masuk Komunitas →'}
          </button>
        </form>
      </div>
    </section>
  );
}
