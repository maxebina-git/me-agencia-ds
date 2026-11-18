import React, { type CSSProperties } from 'react';

/**
 * LISTA DE PASSOS EM CENA (Social Studio)
 * =======================================
 * "1 → 2 → 3" de um processo: cada item entra em cascata (stagger) com
 * badge numerado no gradiente do tema. Progress-driven por timeline:
 * o consumidor passa `delayMs`/`staggerMs` e o export é determinístico.
 *
 * Contrato do DS (ADR-005): cores só do tema (`--slide-gradient`,
 * `--slide-on-accent`, `--slide-text`, `--slide-text-muted`);
 * `settled` = todos os itens no frame final, sem animação.
 */
export interface StepItem {
  title: string;
  desc?: string;
}

export interface StepsListProps {
  steps: StepItem[];
  /** Atraso do primeiro item, em ms. Padrão 0. */
  delayMs?: number;
  /** Intervalo entre itens, em ms. Padrão 500. */
  staggerMs?: number;
  /** Duração da entrada de cada item, em ms. Padrão 500. */
  durationMs?: number;
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function StepsList({
  steps,
  delayMs = 0,
  staggerMs = 500,
  durationMs = 500,
  settled = false,
  className = '',
  style,
}: StepsListProps) {
  return (
    <ol
      className={`fx-steps${settled ? ' is-settled' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {steps.map((s, i) => (
        <li
          key={i}
          className="fx-steps__item"
          style={{
            animationDelay: `${delayMs + i * staggerMs}ms`,
            animationDuration: `${durationMs}ms`,
          }}
        >
          <span className="fx-steps__badge" aria-hidden="true">{i + 1}</span>
          <span className="fx-steps__body">
            <span className="fx-steps__title">{s.title}</span>
            {s.desc ? <span className="fx-steps__desc">{s.desc}</span> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
