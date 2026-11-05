import React, { useEffect, useRef } from 'react';
import { OceanBackground } from './OceanBackground';
import { Badge, GlitchText } from './ui';

interface HeroSectionProps {
  headline: React.ReactNode;
  subheadline?: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryHref?: string;
  eyebrow?: React.ReactNode;
  headlineText?: string;
  logo?: React.ReactNode;
  logoText?: string;
}

export function HeroSection({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryHref = '#',
  ctaSecondaryHref = '#',
  eyebrow = 'Tecnologia que gera resultado',
  headlineText,
  logo,
  logoText,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const words = sectionRef.current.querySelectorAll('.word');
    words.forEach((word, i) => {
      const el = word as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.filter = 'blur(8px)';
      
      setTimeout(() => {
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.filter = 'blur(0)';
      }, 200 + i * 80);
    });
  }, [headline]);

  const words = typeof headline === 'string' ? headline.split(' ') : [];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark">
      {/* Ocean shader background */}
      <OceanBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24 flex flex-col items-center justify-center text-center gap-[clamp(1.25rem,calc(3vh+8px),2.5rem)]">
        {logo && (
          <div className="flex items-center justify-center gap-3">
            {logo}
            {logoText && (
              <div>
                <p className="font-display font-bold text-2xl text-[var(--text-on-surface)]">{logoText}</p>
              </div>
            )}
          </div>
        )}
        {eyebrow && typeof eyebrow === 'string' && eyebrow.trim().length > 0 && (
          <Badge pulseDot>{eyebrow}</Badge>
        )}

        <GlitchText as="h1" text={headlineText ?? (typeof headline === 'string' ? headline : undefined)} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
          {typeof headline === 'string' ? (
            words.map((word, i) => (
              <React.Fragment key={i}>
                <span className="word inline-block text-bg-light">
                  {word}
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))
          ) : (
            headline
          )}
        </GlitchText>

        {subheadline && (
          <p
            className="text-lg md:text-xl text-bg-light/60 max-w-2xl mx-auto opacity-0"
            style={{
              animation: 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards',
            }}
          >
            {subheadline}
          </p>
        )}

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
          style={{
            animation: 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards',
          }}
        >
          <a
            href={ctaPrimaryHref}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-display font-semibold rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-[#0f172a] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 animate-glow"
          >
            <span className="relative z-10">{ctaPrimary}</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          {ctaSecondary && (
            <a
              href={ctaSecondaryHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-display font-semibold rounded-xl border border-[#06B6D4]/50 text-[#06B6D4] hover:bg-[#06B6D4]/10 hover:border-[#06B6D4] hover:scale-105 transition-all duration-300"
            >
              {ctaSecondary}
            </a>
          )}
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0"
        style={{ animation: 'fade-in 1s ease 2s forwards' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-tech animate-bounce" />
        </div>
      </div>
    </section>
  );
}
