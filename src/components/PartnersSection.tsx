export default function PartnersSection() {
  const partners = [
    {
      name: "TradingView",
      role: "Analytics Standard",
      desc: "Platform analisis teknikal & charting standar industri global.",
    },
    {
      name: "Bybit Exchange",
      role: "Crypto Liquidity",
      desc: "Penyedia likuiditas derivatif crypto dengan dieksekusi kecepatan tinggi.",
    },
    {
      name: "Exness Broker", // HFX diubah menjadi Exness
      role: "Forex & CFD",
      desc: "Broker forex terpercaya dengan eksekusi instan dan insentif spred kompetitif.",
    },
  ];

  return (
    <section id="partners" className="bg-primary-bg py-16 px-6 border-t border-secondary-surface/40">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-heading text-2xl font-bold text-white mb-10">
          Official Ecosystem Partners
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-secondary-surface bg-secondary-surface/30 p-6 backdrop-blur-sm transition-all hover:border-primary-accent/40"
            >
              <span className="text-xs font-semibold text-primary-accent font-body tracking-wider uppercase">
                {item.role}
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-2">
                {item.name}
              </h3>
              <p className="font-body text-xs text-gray-400 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
