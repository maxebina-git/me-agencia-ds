import React, { type CSSProperties } from 'react';

/**
 * BOX ANIMADO (caixa que se desenha)
 * ================================
 * Retângulo de cantos arredondados que se desenha em volta de um texto,
 * como um marca-texto sendo traçado. A cor vem do tema (`--slide-accent`),
 * então o mesmo componente serve para o tema midnight, cream ou neon sem
 * nenhuma mudança no consumidor.
 *
 * O tamanho é do CONSUMIDOR (o app mede o texto e passa width/height): o DS
 * entrega o desenho, quem compõe decide o tamanho.
 *
 * Estado assentado (`settled`): o box já desenhado, sem animação — é o que
 * a tela estática mostra e o que o vídeo mostra no final.
 */

export type DecoBoxVariant = 'highlight' | 'frame' | 'chip';

export interface DecoBoxProps {
  /** Largura do box em px. */
  width: number;
  /** Altura do box em px. */
  height: number;
  /** Raio da quina, em px. Sem valor, usa o do preset. */
  radius?: number;
  /** Espessura do traço, em px. Sem valor, usa a do preset. */
  strokeWidth?: number;
  /** 'highlight' = preenchido + traço · 'frame' = só traço · 'chip' = pílula. */
  variant?: DecoBoxVariant;
  /** Atraso antes do box começar a se desenhar, em ms. */
  delayMs?: number;
  /** Duração do traçado, em ms. */
  durationMs?: number;
  /**
   * Loop: o box se desenha, segura e some no fim do ciclo, repetindo.
   * É para **ilustração no demo** — no conteúdo final o desenho é uma vez só.
   * O ciclo dura 8× a duração do traço (700ms → ciclo de 5,6s).
   */
  loop?: boolean;
  /** Estado assentado: o box já desenhado, sem animação. */
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const VARIANT_PRESETS: Record<DecoBoxVariant, { radius: number; fill: boolean; strokeWidth: number }> = {
  highlight: { radius: 10, fill: true, strokeWidth: 2.5 },
  frame: { radius: 12, fill: false, strokeWidth: 2 },
  chip: { radius: 999, fill: true, strokeWidth: 2 },
};

/**
 * Caminho de um retângulo de cantos arredondados, com o traço afastado
 * `inset` da borda (para o traço não ser cortado pela borda do SVG).
 */
export function buildBoxPath(width: number, height: number, radius: number, inset: number): string {
  const x0 = inset;
  const y0 = inset;
  const x1 = Math.max(x0, width - inset);
  const y1 = Math.max(y0, height - inset);
  const r = Math.max(0, Math.min(radius - inset, (x1 - x0) / 2, (y1 - y0) / 2));
  return [
    `M ${(x0 + r).toFixed(2)} ${y0.toFixed(2)}`,
    `H ${(x1 - r).toFixed(2)}`,
    `A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x1.toFixed(2)} ${(y0 + r).toFixed(2)}`,
    `V ${(y1 - r).toFixed(2)}`,
    `A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${(x1 - r).toFixed(2)} ${y1.toFixed(2)}`,
    `H ${(x0 + r).toFixed(2)}`,
    `A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x0.toFixed(2)} ${(y1 - r).toFixed(2)}`,
    `V ${(y0 + r).toFixed(2)}`,
    `A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${(x0 + r).toFixed(2)} ${y0.toFixed(2)}`,
    'Z',
  ].join(' ');
}

export function DecoBox({
  width,
  height,
  radius,
  strokeWidth,
  variant = 'highlight',
  delayMs = 0,
  durationMs = 700,
  loop = false,
  settled = false,
  className = '',
  style,
}: DecoBoxProps) {
  const preset = VARIANT_PRESETS[variant];
  const r = Math.min(radius ?? preset.radius, width / 2, height / 2);
  const sw = strokeWidth ?? preset.strokeWidth;
  const d = buildBoxPath(width, height, r, sw / 2);

  return (
    <div
      aria-hidden="true"
      className={`fx-deco-box ${loop ? 'is-loop' : ''} ${settled ? 'is-settled' : ''} ${className}`.trim()}
      style={
        {
          ['--fx-deco-delay' as string]: `${delayMs}ms`,
          ['--fx-deco-box-duration' as string]: `${durationMs}ms`,
          width,
          height,
          ...style,
        } as CSSProperties
      }
    >
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" fill="none">
        {preset.fill ? <rect className="fx-deco-box__fill" x={0} y={0} width={width} height={height} rx={r} /> : null}
        <path className="fx-deco-box__line" d={d} pathLength={100} strokeWidth={sw} />
      </svg>
    </div>
  );
}
