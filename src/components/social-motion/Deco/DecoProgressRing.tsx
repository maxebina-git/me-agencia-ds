import React, { type CSSProperties } from 'react';

/**
 * ANEL DE PROGRESSO (Social Studio)
 * =================================
 * Círculo que se desenha até `value/max` (stroke-dashoffset com pathLength=100).
 * O arco usa a cor do tema (`--slide-accent`); trilha, `color-mix` do tema.
 *
 * Contrato do DS (ADR-005): entrada por keyframes com `delayMs`/`durationMs`
 * (o `to` do desenho é o offset final via CSS var `--fx-ring-off`);
 * `settled` = anel já completo, sem animação.
 */
export interface DecoProgressRingProps {
  /** Valor atual. */
  value: number;
  /** Valor que representa 100%. Padrão 100. */
  max?: number;
  /** Diâmetro do anel, em px. Padrão 120. */
  size?: number;
  /** Espessura do traço, em px. Padrão 8. */
  strokeWidth?: number;
  delayMs?: number;
  /** Duração do desenho, em ms. Padrão 900. */
  durationMs?: number;
  /** Rótulo central (ex.: "72%"). */
  label?: string;
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function DecoProgressRing({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  delayMs = 0,
  durationMs = 900,
  label,
  settled = false,
  className = '',
  style,
}: DecoProgressRingProps) {
  const p = Math.min(1, Math.max(0, value / Math.max(1, max)));
  const off = 100 - p * 100;
  const r = (size - strokeWidth) / 2;
  const c = size / 2;
  const vars = {
    '--fx-ring-delay': `${delayMs}ms`,
    '--fx-ring-dur': `${durationMs}ms`,
    '--fx-ring-off': String(off),
  } as CSSProperties;
  return (
    <div
      className={`fx-ring${settled ? ' is-settled' : ''}${className ? ` ${className}` : ''}`}
      style={{ width: size, height: size, ...vars, ...style }}
      role="img"
      aria-label={label ?? `${Math.round(p * 100)}%`}
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        <circle className="fx-ring__track" cx={c} cy={c} r={r} pathLength={100} strokeWidth={strokeWidth} />
        <circle
          className="fx-ring__bar"
          cx={c}
          cy={c}
          r={r}
          pathLength={100}
          strokeWidth={strokeWidth}
          style={{ strokeDashoffset: off }}
        />
      </svg>
      {label ? <span className="fx-ring__label">{label}</span> : null}
    </div>
  );
}
