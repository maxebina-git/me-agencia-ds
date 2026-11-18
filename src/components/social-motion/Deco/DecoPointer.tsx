import React, { type CSSProperties } from 'react';
import { PathPointer } from '../Path/PathPointer';

/**
 * Caminho padrão: nasce embaixo à direita e sobe até o texto — a seta viaja
 * pela curva e termina apontando para o bloco.
 *
 * A ponta (fim do caminho) fica no canto superior-esquerdo do viewBox, que é
 * onde a seta encosta no texto; a cauda sai pela direita.
 */
export const DECO_POINTER_DEFAULT_D = 'M 240 300 Q 210 120 40 40';

/**
 * Monta o caminho padrão na escala da caixa (em px).
 *
 * O traço (SVG) e a ponta da seta (`offsetPath`) usam o MESMO caminho, e o
 * `offsetPath` é interpretado em px do elemento — por isso o caminho precisa
 * ser gerado em px, e não no viewBox padrão 252x306.
 *
 * Normalizado (0..100): a cauda sai em (95, 98), a curva sobe até a ponta em
 * (16, 13) — a ponta é o que encosta no texto.
 */
export function buildPointerPath(width: number, height: number): string {
  const sx = width / 100;
  const sy = height / 100;
  const p = (x: number, y: number) => `${(x * sx).toFixed(2)} ${(y * sy).toFixed(2)}`;
  return `M ${p(95, 98)} Q ${p(83, 38)} ${p(16, 13)}`;
}

/** Posição da ponta dentro da caixa, em px (relativa ao canto superior-esquerdo). */
export const POINTER_TIP_RATIO = { x: 0.16, y: 0.13 } as const;

/**
 * Seta que percorre um traço pontilhado e aponta para o texto. Fica absoluto
 * em relação ao bloco — use-o dentro de um container com position: relative.
 */
export interface DecoPointerProps {
  /** Atraso antes da seta sair, em ms. */
  delayMs?: number;
  /** Duração do trajeto da seta (o DS anima em loop). */
  duration?: string;
  /** Caminho SVG em px, para a caixa informed em width/height. */
  d?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  /** Estado assentado: a seta fica parada na ponta, apontando para o texto. */
  settled?: boolean;
}

export function DecoPointer({
  delayMs = 0,
  duration = '3s',
  d,
  width = 150,
  height = 170,
  className = '',
  style,
  settled = false,
}: DecoPointerProps) {
  const path = d ?? buildPointerPath(width, height);
  return (
    <div
      aria-hidden="true"
      className={`fx-deco-pointer ${settled ? 'is-settled' : ''} ${className}`.trim()}
      style={{ ['--fx-deco-delay' as string]: `${delayMs}ms`, width, height, ...style }}
    >
      <PathPointer d={path} viewBox={`0 0 ${width} ${height}`} duration={duration} className="w-full h-full" />
    </div>
  );
}
