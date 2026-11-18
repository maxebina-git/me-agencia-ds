import React, { type CSSProperties } from 'react';
import { RubberStamp } from '../Text/RubberStamp';

/**
 * Carimbo que cai com impacto sobre o texto — usado para marcar alerta,
 * "sem oferta", "urgente". A cor segue o tema (--slide-accent).
 */
export interface DecoStampProps {
  text: string;
  /** Atraso antes do carimbo cair, em ms. */
  delayMs?: number;
  /** Duração do impacto, em ms. */
  durationMs?: number;
  /** Tamanho da fonte do carimbo. */
  fontSize?: number;
  className?: string;
  style?: CSSProperties;
  /** Estado assentado: mostra o carimbo já no lugar, sem animação. */
  settled?: boolean;
}

export function DecoStamp({
  text,
  delayMs = 0,
  durationMs = 650,
  fontSize = 18,
  className = '',
  style,
  settled = false,
}: DecoStampProps) {
  return (
    <RubberStamp
      delayMs={delayMs}
      durationMs={durationMs}
      settled={settled}
      className={`fx-deco-stamp ${className}`.trim()}
      style={style}
    >
      <span className="fx-deco-stamp__label" style={{ fontSize }}>
        {text}
      </span>
    </RubberStamp>
  );
}
