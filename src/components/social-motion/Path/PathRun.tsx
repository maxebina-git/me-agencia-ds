import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react';

export const PATH_RUN_DEFAULT_D = 'M 24 282 Q 70 90 228 40';
export const PATH_ARROW_DEFAULT_D = 'M 24 173 H 120 V 140 L 186 173 L 120 206 V 173';
export const PATH_CARD_DEFAULT_D = 'M 34 14 H 218 Q 238 14 238 34 V 272 Q 238 292 218 292 H 34 Q 14 292 14 272 V 34 Q 14 14 34 14 Z';
export const PATH_LOGO_M_D = 'M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z';
export const PATH_LOGO_E_D = 'M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z';
export const PATH_LOGO_VIEWBOX = '0 0 182 87';
export const PATH_TEXT_DEFAULT = 'Transforme Sua Empresa';
export const PATH_TEXT_FONT_SIZE = 36;
export const PATH_RUN_VIEWBOX_WIDTH = 252;
export const PATH_RUN_VIEWBOX_HEIGHT = 306;

export type PathRunVariant = 'run' | 'draw' | 'march' | 'fly' | 'arrow' | 'card' | 'logo' | 'text';

interface PathRunProps {
  variant?: PathRunVariant;
  d?: string;
  duration?: string;
  pulse?: boolean;
  text?: string;
  fontSize?: number;
  className?: string;
  once?: boolean;
}

function splitTextLines(text: string): string[] {
  const words = text.split(' ').filter(Boolean);
  if (words.length < 2) return [text];
  let best: string[] = [text];
  let bestMax = Infinity;
  for (let k = 1; k < words.length; k++) {
    const first = words.slice(0, k).join(' ');
    const second = words.slice(k).join(' ');
    const max = Math.max(first.length, second.length);
    if (max < bestMax) {
      bestMax = max;
      best = [first, second];
    }
  }
  return best;
}

function TextPath({ text, fontSize, duration, className = '' }: { text: string; fontSize: number; duration: string; className?: string }) {
  const lines = useMemo(() => splitTextLines(text), [text]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [viewSize, setViewSize] = useState({ width: PATH_RUN_VIEWBOX_WIDTH, height: PATH_RUN_VIEWBOX_HEIGHT });
  const [effectiveFontSize, setEffectiveFontSize] = useState(fontSize);
  const [lens, setLens] = useState<number[]>([]);
  const measureRef = useRef<SVGTextElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(SVGTextElement | null)[]>([]);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setViewSize(prev => (prev.width === rect.width && prev.height === rect.height ? prev : { width: rect.width, height: rect.height }));
      }
    };
    update();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update);
      ro.observe(wrap);
    }
    return () => { ro?.disconnect(); };
  }, []);

  useLayoutEffect(() => {
    setEffectiveFontSize(fontSize);
  }, [fontSize]);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    el.textContent = lines.reduce((a, b) => (a.length >= b.length ? a : b));
    const longest = el.getComputedTextLength();
    if (longest > viewSize.width && effectiveFontSize > 12) {
      setEffectiveFontSize(Math.max(12, Math.floor(effectiveFontSize * (viewSize.width / longest))));
    }
  }, [lines, effectiveFontSize, viewSize]);

  useLayoutEffect(() => {
    const next = lineRefs.current.map(el => (el ? el.getComputedTextLength() : 0));
    setLens(prev => (prev.join() === next.join() ? prev : next));
  }, [lines, effectiveFontSize, viewSize]);

  const lineHeight = effectiveFontSize * 1.15;
  const totalHeight = lines.length * lineHeight;
  const startY = (viewSize.height - totalHeight) / 2 + effectiveFontSize / 2;
  const strokeWidth = Math.max(0.75, effectiveFontSize / 24);

  return (
    <div ref={wrapRef} className={`absolute inset-0 w-full h-full ${className}`}>
      <svg
        viewBox={`0 0 ${viewSize.width} ${viewSize.height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        role="img"
        aria-label={text}
      >
        <text
          ref={measureRef}
          fontSize={effectiveFontSize}
          fontFamily="var(--font-display), 'Space Grotesk', sans-serif"
          fontWeight={700}
          letterSpacing="0.025em"
          visibility="hidden"
        >
          {text}
        </text>
        {lines.map((line, lineIndex) => (
          <text
            key={lineIndex}
            ref={node => { lineRefs.current[lineIndex] = node; }}
            x="50%"
            y={startY + lineIndex * lineHeight}
            dy="0.35em"
            textAnchor="middle"
            fontSize={effectiveFontSize}
            fontFamily="var(--font-display), 'Space Grotesk', sans-serif"
            fontWeight={700}
            letterSpacing="0.025em"
            fill="none"
            stroke="var(--slide-accent)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={lineIndex === 0 ? 'fx-path-text-line-a' : 'fx-path-text-line-b'}
            style={{
              ['--len' as never]: lens[lineIndex] || 100,
              animationDuration: duration,
            } as React.CSSProperties}
          >
            {line}
          </text>
        ))}
      </svg>
    </div>
  );
}

function DrawPath({ d, duration, className = '' }: { d: string; duration: string; className?: string }) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number; angle: number } | null>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const tip = path.getPointAtLength(len);
    const back = path.getPointAtLength(Math.max(0, len - 5));
    const angle = (Math.atan2(tip.y - back.y, tip.x - back.x) * 180) / Math.PI;
    setEnd({ x: tip.x, y: tip.y, angle });
  }, [d]);

  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} viewBox={`0 0 ${PATH_RUN_VIEWBOX_WIDTH} ${PATH_RUN_VIEWBOX_HEIGHT}`} preserveAspectRatio="none" fill="none" aria-hidden>
      <path ref={pathRef} className="fx-path-draw-line" d={d} pathLength={100} stroke="var(--slide-accent)" strokeWidth="2.5" strokeLinecap="round" style={{ animationDuration: duration }} />
      {end && (
        <g className="fx-path-draw-arrow" style={{ animationDuration: duration }} transform={`translate(${end.x},${end.y}) rotate(${end.angle})`}>
          <polygon points="0,0 -13,-6 -13,6" fill="var(--slide-accent)" />
        </g>
      )}
    </svg>
  );
}

export function PathRun({ variant = 'run', d, duration = '3s', pulse = true, text = PATH_TEXT_DEFAULT, fontSize = PATH_TEXT_FONT_SIZE, className = '', once = false }: PathRunProps) {
  const path = d ?? (variant === 'arrow' ? PATH_ARROW_DEFAULT_D : variant === 'card' ? PATH_CARD_DEFAULT_D : PATH_RUN_DEFAULT_D);
  const offsetStyle = { offsetPath: `path('${path}')`, animationDuration: duration } as React.CSSProperties;

  if (variant === 'draw') {
    return <DrawPath d={path} duration={duration} className={className} />;
  }

  if (variant === 'logo') {
    if (once) {
      return (
        <svg className={`absolute inset-0 w-full h-full ${className}`} viewBox={PATH_LOGO_VIEWBOX} preserveAspectRatio="none" fill="none" role="img" aria-label="ME Marketing Digital">
          <path className="fx-path-logo-once-fill" d={PATH_LOGO_M_D} pathLength={100} fill="var(--slide-accent)" stroke="none" style={{ animationDuration: duration }} />
          <path className="fx-path-logo-once-fill" d={PATH_LOGO_E_D} pathLength={100} fill="var(--slide-accent)" stroke="none" style={{ animationDuration: duration }} />
          <path className="fx-path-logo-once-m" d={PATH_LOGO_M_D} pathLength={100} fill="none" stroke="var(--slide-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animationDuration: duration }} />
          <path className="fx-path-logo-once-e" d={PATH_LOGO_E_D} pathLength={100} fill="none" stroke="var(--slide-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animationDuration: duration }} />
        </svg>
      );
    }

    return (
      <svg className={`absolute inset-0 w-full h-full ${className}`} viewBox={PATH_LOGO_VIEWBOX} preserveAspectRatio="none" fill="none" aria-hidden>
        <path className="fx-path-logo-m" d={PATH_LOGO_M_D} pathLength={100} fill="none" stroke="var(--slide-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animationDuration: duration }} />
        <path className="fx-path-logo-e" d={PATH_LOGO_E_D} pathLength={100} fill="none" stroke="var(--slide-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animationDuration: duration }} />
      </svg>
    );
  }

  if (variant === 'text') {
    return <TextPath text={text} fontSize={fontSize} duration={duration} className={className} />;
  }

  if (variant === 'arrow' || variant === 'card') {
    return (
      <svg className={`absolute inset-0 w-full h-full ${className}`} viewBox={`0 0 ${PATH_RUN_VIEWBOX_WIDTH} ${PATH_RUN_VIEWBOX_HEIGHT}`} preserveAspectRatio="none" fill="none" aria-hidden>
        <path className="fx-path-draw-line" d={path} pathLength={100} stroke="var(--slide-accent)" strokeWidth="2.5" strokeLinecap="round" style={{ animationDuration: duration }} />
      </svg>
    );
  }

  if (variant === 'march') {
    return (
      <svg className={`absolute inset-0 w-full h-full ${className}`} viewBox={`0 0 ${PATH_RUN_VIEWBOX_WIDTH} ${PATH_RUN_VIEWBOX_HEIGHT}`} preserveAspectRatio="none" fill="none" aria-hidden>
        <path d={path} stroke="var(--slide-accent)" strokeWidth="2" strokeDasharray="4 8" opacity="0.35" />
        <path className="fx-path-march" d={path} stroke="var(--slide-accent)" strokeWidth="5" style={{ animationDuration: duration }} />
      </svg>
    );
  }

  if (variant === 'fly') {
    return (
      <div className={className}>
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${PATH_RUN_VIEWBOX_WIDTH} ${PATH_RUN_VIEWBOX_HEIGHT}`} preserveAspectRatio="none" fill="none" aria-hidden>
          <path d={path} stroke="var(--slide-accent)" strokeWidth="2" strokeDasharray="4 8" opacity="0.35" />
        </svg>
        <div className={pulse ? 'fx-fly-to' : 'fx-fly-to fx-fly-plain'} style={offsetStyle} />
      </div>
    );
  }

  return (
    <div className={className}>
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${PATH_RUN_VIEWBOX_WIDTH} ${PATH_RUN_VIEWBOX_HEIGHT}`} preserveAspectRatio="none" fill="none" aria-hidden>
        <path d={path} stroke="var(--slide-accent)" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />
      </svg>
      <div className="fx-path-dot" style={offsetStyle} />
    </div>
  );
}
