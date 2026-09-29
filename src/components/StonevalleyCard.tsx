import React from 'react';

interface CardProps {
  title: string;
  description: string;
  category: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function StonevalleyCard({
  title,
  description,
  category,
  ctaText = 'Pelajari Lebih Lanjut',
  onCtaClick,
}: CardProps) {
  return (
    <div className="max-w-sm rounded-2xl border border-secondary-surface bg-secondary-surface/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary-accent/50 hover:shadow-lg hover:shadow-primary-accent/10">
      {/* Category / Badge */}
      <span className="inline-block rounded-full bg-primary-accent/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary-accent uppercase font-body">
        {category}
      </span>

      {/* Heading / Judul menggunakan font Plus Jakarta Sans */}
      <h3 className="mt-4 font-heading text-xl font-bold tracking-tight text-white">
        {title}
      </h3>

      {/* Description menggunakan font Inter */}
      <p className="mt-2 font-body text-sm leading-relaxed text-gray-300">
        {description}
      </p>

      {/* Button Action menggunakan warna Primary Accent */}
      <button
        onClick={onCtaClick}
        className="mt-6 w-full rounded-xl bg-primary-accent px-4 py-2.5 font-body text-sm font-bold text-primary-bg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        {ctaText}
      </button>
    </div>
  );
}
