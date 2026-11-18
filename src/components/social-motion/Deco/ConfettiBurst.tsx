import React, { type CSSProperties } from 'react';

/**
 * CONFETTI BURST (Social Studio)
 * ==============================
 * Explosão de confete para o end card ("resultado", "conquista"). DOM puro
 * (spans) com **seed fixa** → cada partícula tem trajetória determinística,
 * então o export frame a frame bate com a tela estática.
 *
 * Contrato do DS (ADR-005): cor do tema (paleta de --slide-*), sem cor fixa
 * por prop; `settled` = frame final (confete já sumiu, opacidade 0).
 */

function mulberry32(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ConfettiBurstProps {
  /** Nº de partículas. Limitado a 8..80. Padrão 48. */
  count?: number;
  /** Seed do gerador — mude para outra explosão, mantenha para determinismo. Padrão 7. */
  seed?: number;
  /** Origem da explosão, em % da cena. Padrão 50/42. */
  originX?: number;
  originY?: number;
  delayMs?: number;
  /** Duração da explosão, em ms. Padrão 1800. */
  durationMs?: number;
  /** Estado assentado: frame final (vazio). */
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ConfettiBurst({
  count = 48,
  seed = 7,
  originX = 50,
  originY = 42,
  delayMs = 0,
  durationMs = 1800,
  settled = false,
  className = '',
  style,
}: ConfettiBurstProps) {
  const n = Math.min(80, Math.max(8, Math.round(count)));
  const rnd = mulberry32(seed);
  const palette = [
    'var(--slide-accent)',
    'var(--slide-primary, var(--slide-accent))',
    'var(--slide-text)',
    'color-mix(in srgb, var(--slide-accent) 60%, var(--slide-bg))',
  ];
  const parts = Array.from({ length: n }, (_, i) => {
    const angle = rnd() * Math.PI * 2;
    const dist = 70 + rnd() * 190;
    return {
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist * 0.7 - 40,
      rot: (rnd() - 0.5) * 720,
      size: 5 + rnd() * 6,
      round: rnd() > 0.6,
      color: palette[i % palette.length],
    };
  });
  const vars = {
    '--fx-cf-delay': `${delayMs}ms`,
    '--fx-cf-dur': `${durationMs}ms`,
  } as CSSProperties;
  return (
    <div
      className={`fx-cf${settled ? ' is-settled' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...vars, ...style }}
      aria-hidden="true"
    >
      {parts.map((p, i) => (
        <span
          key={i}
          className="fx-cf__p"
          style={{
            left: `${originX}%`,
            top: `${originY}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 1.6,
            background: p.color,
            borderRadius: p.round ? '50%' : 2,
            '--tx': `${p.tx.toFixed(1)}px`,
            '--ty': `${p.ty.toFixed(1)}px`,
            '--rot': `${p.rot.toFixed(0)}deg`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
