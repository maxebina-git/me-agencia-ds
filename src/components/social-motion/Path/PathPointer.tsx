import React from 'react';

export const PATH_POINTER_DEFAULT_D = 'M 24 282 Q 70 90 228 40';
export const PATH_POINTER_VIEWBOX_WIDTH = 252;
export const PATH_POINTER_VIEWBOX_HEIGHT = 306;

interface PathPointerProps {
  d?: string;
  duration?: string;
  className?: string;
  /**
   * ViewBox do SVG. Tem que bater com o espaço em px da caixa: o traço
   * desenhado e o `offsetPath` da seta usam o MESMO caminho, e o offsetPath
   * é interpretado em px do elemento. Se o viewBox for diferente do tamanho
   * da caixa, a seta viaja fora do traço.
   */
  viewBox?: string;
}

export function PathPointer({
  d = PATH_POINTER_DEFAULT_D,
  duration = '3s',
  className = '',
  viewBox = `0 0 ${PATH_POINTER_VIEWBOX_WIDTH} ${PATH_POINTER_VIEWBOX_HEIGHT}`,
}: PathPointerProps) {
  return (
    <div className={className}>
      <svg className="absolute inset-0 w-full h-full" viewBox={viewBox} preserveAspectRatio="none" fill="none" aria-hidden>
        <path d={d} stroke="var(--slide-accent)" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />
      </svg>
      <div className="fx-path-pointer" style={{ offsetPath: `path('${d}')`, animationDuration: duration } as React.CSSProperties} />
    </div>
  );
}
