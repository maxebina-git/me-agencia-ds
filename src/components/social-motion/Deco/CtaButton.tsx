import React, { type CSSProperties } from 'react';

/**
 * BOTÃO DE CTA ANIMADO (Social Studio)
 * ====================================
 * Pílula de chamada ("Segue pra mais", "Link na bio") com entrada em pop,
 * anel pulsante em loop e flutuação suave — sem hover/clique (timeline).
 *
 * Contrato do DS (ADR-005): cor do tema (`--slide-accent` / `--slide-on-accent`),
 * entrada por keyframes com `delayMs`/`durationMs`, `settled` = frame final
 * (botão parado, sem pulso/flutuação).
 */
export interface CtaButtonProps {
  /** Texto do botão. */
  label: string;
  /** Se informado, renderiza <a>; senão, <span role="button">. */
  href?: string;
  /** Atraso da entrada, em ms. Padrão 0. */
  delayMs?: number;
  /** Duração do pop de entrada, em ms. Padrão 600. */
  durationMs?: number;
  /** Estado assentado: frame final, sem animação. */
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function CtaButton({ label, href, delayMs = 0, durationMs = 600, settled = false, className = '', style }: CtaButtonProps) {
  const vars = {
    '--fx-cta-delay': `${delayMs}ms`,
    '--fx-cta-dur': `${durationMs}ms`,
  } as CSSProperties;
  const cls = `fx-cta${settled ? ' is-settled' : ''}${className ? ` ${className}` : ''}`;
  const inner = (
    <>
      <span className="fx-cta__ring" aria-hidden="true" />
      <span className="fx-cta__label">{label}</span>
    </>
  );
  if (href) return <a className={cls} style={{ ...vars, ...style }} href={href}>{inner}</a>;
  return <span className={cls} style={{ ...vars, ...style }} role="button">{inner}</span>;
}
