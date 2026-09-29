import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md">
      {/* Top Notification Banner */}
      <div className="bg-[#142800] py-2 px-4 text-center text-xs font-semibold text-[#8fec00] tracking-wide font-body">
        MODUL TERBARU: ORDER FLOW & FOOTPRINT CHARTING TELAH RILIS
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-secondary-surface bg-primary-bg/80 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="font-heading text-xl font-bold text-white tracking-wider">
            STONEVALLEY<span className="text-primary-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-body text-sm text-gray-300">
            <a href="#partners" className="hover:text-primary-accent transition-colors">Partners</a>
            <a href="#metodologi" className="hover:text-primary-accent transition-colors">Metodologi</a>
            <a href="#ekosistem" className="hover:text-primary-accent transition-colors">Ekosistem IG</a>
            <a href="#gate" className="hover:text-primary-accent transition-colors">Pendaftaran</a>
          </div>

          <a
            href="#gate"
            className="rounded-xl bg-primary-accent px-5 py-2.5 font-body text-xs font-bold text-primary-bg shadow-[0_0_15px_rgba(143,236,0,0.4)] transition-all hover:shadow-[0_0_25px_rgba(143,236,0,0.7)] hover:scale-105"
          >
            Akses Portal / Login Member
          </a>
        </div>
      </nav>
    </header>
  );
}
