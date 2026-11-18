import React, { type CSSProperties } from 'react';

/**
 * STICKER POP (Social Studio)
 * ===========================
 * Emoji/ícone que entra com spring elástico e fica balançando (wiggle) —
 * o clássico "salva", "comenta", "🔥" de reel. Sem hover: roda por timeline.
 *
 * Contrato do DS (ADR-005): cor do tema, entrada por keyframes com
 * `delayMs`/`durationMs`, `settled` = frame final (parado, levemente rotacionado).
 */
export interface StickerPopProps {
  /** Texto/emoji do sticker (ex.: "🔥", "SALVA"). */
  text: string;
  /** font-size do sticker, em px. Padrão 40. */
  size?: number;
  delayMs?: number;
  /** Duração do pop de entrada, em ms. Padrão 520. */
  durationMs?: number;
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function StickerPop({ text, size = 40, delayMs = 0, durationMs = 520, settled = false, className = '', style }: StickerPopProps) {
  const vars = {
    '--fx-sticker-delay': `${delayMs}ms`,
    '--fx-sticker-dur': `${durationMs}ms`,
  } as CSSProperties;
  return (
    <span
      className={`fx-sticker${settled ? ' is-settled' : ''}${className ? ` ${className}` : ''}`}
      style={{ fontSize: size, ...vars, ...style }}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
