import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersSection from '@/components/PartnersSection';
import RegisterForm from '@/components/RegisterForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-bg text-white selection:bg-primary-accent selection:text-primary-bg font-body">
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main>
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Official Partners */}
        <PartnersSection />

        {/* Section 3: Admission Gate / Form Pendaftaran */}
        <RegisterForm />
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-secondary-surface/60 bg-primary-bg py-8 text-center text-xs text-gray-500">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-heading font-semibold text-gray-400">
            STONEVALLEY<span className="text-primary-accent">.</span> ACADEMY
          </p>
          <p>© {new Date().getFullYear()} Stonevalley. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
