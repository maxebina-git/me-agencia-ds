import React, { type CSSProperties } from 'react';

/**
 * LINHA DE PULSO (ECG)
 * ====================
 * Traço horizontal que entra, dá um "bico" de batimento cardíaco no meio e
 * sai — o separador que enquadra um título (acima e abaixo dele).
 *
 * Nasce no DS: o consumidor decide ONDE a linha fica (acima, abaixo, no meio)
 * e o QUANTO ela demora; o DS decide COMO ela se desenha e de que cor ela é
 * (`var(--slide-accent)`).
 *
 * O desenho usa `pathLength={100}` + `stroke-dashoffset` de 100 → 0, então o
 * traço "se escreve" da esquerda para a direita. Com `settled` o traço já
 * aparece desenhado — é o frame final, o mesmo que a tela estática do app
 * social mostra.
 */

/** Traço padrão (viewBox 208×40): reta, bico de ECG no centro-esquerda, reta. */
export const PATH_PULSE_DEFAULT_D = 'M 0 24 L 80 24 L 104 0 L 104 40 L 128 16 L 208 16';
export const PATH_PULSE_VIEWBOX_WIDTH = 208;
export const PATH_PULSE_VIEWBOX_HEIGHT = 40;

export interface PathPulseProps {
  /** Largura do SVG em px. Padrão 208 (o traço escala junto). */
  width?: number;
  /** Altura do SVG em px. Padrão 40. */
  height?: number;
  /** Caminho SVG (no espaço do viewBox). Sem valor, usa o traço ECG padrão. */
  d?: string;
  /** Duração do desenho em ms. Padrão 1500. */
  durationMs?: number;
  /** Atraso antes de começar a desenhar, em ms. */
  delayMs?: number;
  /** Espessura do traço, em px. Padrão 3. */
  strokeWidth?: number;
  /**
   * Loop: a linha se desenha, segura e some no fim do ciclo, repetindo.
   * É para **ilustração no demo** — no conteúdo final o desenho é uma vez só.
   * O ciclo dura 4× a duração do traço (1,5s → ciclo de 6s, o mesmo compasso
   * do Path Text).
   */
  loop?: boolean;
  /** Estado assentado: traço já desenhado, sem animação. */
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function PathPulse({
  width = PATH_PULSE_VIEWBOX_WIDTH,
  height = PATH_PULSE_VIEWBOX_HEIGHT,
  d = PATH_PULSE_DEFAULT_D,
  durationMs = 1500,
  delayMs = 0,
  strokeWidth = 3,
  loop = false,
  settled = false,
  className = '',
  style,
}: PathPulseProps) {
  return (
    <svg
      className={`fx-path-pulse ${loop ? 'is-loop' : ''} ${settled ? 'is-settled' : ''} ${className}`.trim()}
      width={width}
      height={height}
      viewBox={`0 0 ${PATH_PULSE_VIEWBOX_WIDTH} ${PATH_PULSE_VIEWBOX_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
      style={{
        ['--fx-path-pulse-duration']: `${durationMs}ms`,
        ['--fx-path-pulse-delay']: `${delayMs}ms`,
        ...style,
      } as CSSProperties}
    >
      <path
        className="fx-path-pulse-line"
        d={d}
        pathLength={100}
        stroke="var(--slide-accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
