import React, { type CSSProperties } from 'react';

/**
 * BARRA DE PROGRESSO DO REEL (Social Studio)
 * ==========================================
 * Fina barra fixa no topo da cena, proporcional ao `progress` (0..1) —
 * no app social vem do `onProgress` da ReelTimeline, então o export é
 * progress-driven (bate com a tela estática). Sem animação própria:
 * como o DecoCounter, não precisa de `settled`.
 */
export interface ReelProgressProps {
  /** 0..1. Valores fora são clamped. */
  progress: number;
  /** Espessura da barra, em px. Padrão 4. */
  height?: number;
  className?: string;
  style?: CSSProperties;
}

export function ReelProgress({ progress, height = 4, className = '', style }: ReelProgressProps) {
  const p = Math.min(1, Math.max(0, progress));
  return (
    <div
      className={`fx-reel-progress${className ? ` ${className}` : ''}`}
      style={{ height, ...style }}
      role="progressbar"
      aria-valuenow={Math.round(p * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="fx-reel-progress__fill" style={{ width: `${p * 100}%` }} />
    </div>
  );
}
