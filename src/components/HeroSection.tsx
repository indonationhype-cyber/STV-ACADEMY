export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary-bg py-24 px-6 text-center">
      <div className="mx-auto max-w-4xl">
        {/* Pill Badge */}
        <div className="inline-block rounded-full border border-primary-accent/30 bg-secondary-surface px-4 py-1.5 text-xs font-semibold tracking-widest text-primary-accent uppercase font-body mb-6">
          STONEVALLEY ACADEMY 2.0
        </div>

        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
          Trading Rasional. <br />
          <span className="text-primary-accent">Bukan Tebak-Tebakan</span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 font-body text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Dari dasar nol hingga penguasaan mekanisme institusional. Pelajari struktur pasar, likuiditas, dan manajemen risiko secara presisi.
        </p>

        {/* Dual CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#gate"
            className="w-full sm:w-auto rounded-xl bg-primary-accent px-8 py-4 font-body text-sm font-bold text-primary-bg shadow-[0_0_20px_rgba(143,236,0,0.3)] transition-transform hover:scale-105"
          >
            Daftar Akses Gratis Sekarang →
          </a>
          <a
            href="#kurikulum"
            className="w-full sm:w-auto rounded-xl border border-secondary-surface bg-secondary-surface/30 px-8 py-4 font-body text-sm font-semibold text-white transition-colors hover:border-primary-accent/50"
          >
            Lihat Kurikulum
          </a>
        </div>
      </div>
    </section>
  );
}
