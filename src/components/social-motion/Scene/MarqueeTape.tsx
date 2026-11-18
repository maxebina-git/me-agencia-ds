import React, { type CSSProperties } from 'react';

/**
 * FAIXA MARQUEE (Social Studio)
 * =============================
 * Fita de texto em loop contínuo ("Marketing • Sites • Automação ..."),
 * com a lista duplicada e `translateX(0 → -50%)` para loop perfeito.
 * A segunda cópia é `aria-hidden` (já está tudo dentro de aria-hidden).
 *
 * Contrato do DS (ADR-005): cor do tema (`--slide-text-muted` / `--slide-accent`);
 * loop CSS sob `:not(.is-settled)`; `settled` = fita parada no início.
 * Posicione com style (o padrão é `bottom: 0`).
 */
export interface MarqueeTapeProps {
  items: string[];
  /** Separador entre itens. Padrão "•". */
  separator?: string;
  /** Duração de um ciclo completo, em ms. Padrão 14000. */
  durationMs?: number;
  delayMs?: number;
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function MarqueeTape({
  items,
  separator = '•',
  durationMs = 14000,
  delayMs = 0,
  settled = false,
  className = '',
  style,
}: MarqueeTapeProps) {
  const vars = {
    '--fx-mq-dur': `${durationMs}ms`,
    '--fx-mq-delay': `${delayMs}ms`,
  } as CSSProperties;
  return (
    <div
      className={`fx-mq${settled ? ' is-settled' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...vars, ...style }}
      aria-hidden="true"
    >
      <div className="fx-mq__track">
        {[0, 1].map((copy) => (
          <span key={copy} className="fx-mq__copy">
            {items.map((it, i) => (
              <span key={i} className="fx-mq__item">
                {it}
                <span className="fx-mq__sep">{separator}</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
