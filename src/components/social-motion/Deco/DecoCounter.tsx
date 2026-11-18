import React, { type CSSProperties } from 'react';

/**
 * Número que conta até o valor, dirigido pelo PROGRESSO da cena — não por
 * scroll. É o que permite o número aparecer certaininho no MP4 exportado.
 */
export interface DecoCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  /** Casas decimais. */
  decimals?: number;
  /** Progresso da cena (0..1). */
  progress?: number;
  /** Duração da cena em ms — necessário para converter o progresso em tempo. */
  durationMs?: number;
  /** Momento (ms dentro da cena) em que a contagem começa. Padrão 600. */
  startMs?: number;
  /** Duração da contagem (ms). Padrão 900. */
  countMs?: number;
  fontSize?: number;
  /**
   * Variante de exibição: 'count' (padrão, texto único — comportamento atual,
   * preservado) ou 'odometer' (cada dígito rola numa coluna 0-9, estilo slot).
   * A matemática continua progress-driven nos dois casos.
   */
  variant?: 'count' | 'odometer';
  className?: string;
  style?: CSSProperties;
}

export function DecoCounter({
  value,
  prefix = '',
  suffix = '',
  label,
  decimals = 0,
  progress = 0,
  durationMs = 0,
  startMs = 600,
  countMs = 900,
  fontSize = 58,
  variant = 'count',
  className = '',
  style,
}: DecoCounterProps) {
  const elapsed = progress * durationMs;
  const p = Math.min(1, Math.max(0, (elapsed - startMs) / Math.max(1, countMs)));
  const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
  const shown = value * eased;
  const formatted = shown.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  if (variant === 'odometer') {
    return (
      <div className={`fx-deco-counter fx-deco-counter--odometer ${className}`.trim()} style={style}>
        <span className="fx-deco-counter__value" style={{ fontSize }}>
          {prefix}
          {formatted.split('').map((ch, i) =>
            ch >= '0' && ch <= '9' ? (
              <span key={i} className="fx-odo" aria-hidden="true">
                <span className="fx-odo__col" style={{ transform: `translateY(${-Number(ch)}em)` }}>
                  {'0123456789'.split('').map((d) => (
                    <span key={d} className="fx-odo__d">{d}</span>
                  ))}
                </span>
              </span>
            ) : (
              <span key={i}>{ch}</span>
            ),
          )}
          <span className="fx-sr-only">{formatted}</span>
          {suffix}
        </span>
        {label ? <span className="fx-deco-counter__label">{label}</span> : null}
      </div>
    );
  }
  return (
    <div className={`fx-deco-counter ${className}`.trim()} style={style}>
      <span className="fx-deco-counter__value" style={{ fontSize }}>
        {prefix}
        {formatted}
        {suffix}
      </span>
      {label ? <span className="fx-deco-counter__label">{label}</span> : null}
    </div>
  );
}
