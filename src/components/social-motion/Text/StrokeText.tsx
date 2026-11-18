import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

export const STROKE_VIEWBOX_WIDTH = 252;
export const STROKE_VIEWBOX_HEIGHT = 305;
export const STROKE_DURATION_MS = 6000;
export const STROKE_COLORS = ['var(--slide-accent)', 'var(--slide-primary)'];

interface StrokeTextProps {
  text: string;
  fontSize?: number;
  duration?: number;
  className?: string;
}

function wrapText(el: SVGTextElement, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let current = '';
  for (const char of text) {
    const candidate = current + char;
    el.textContent = candidate;
    if (current && el.getComputedTextLength() > maxWidth) {
      lines.push(current);
      current = char;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function truncateLines(el: SVGTextElement, text: string, maxWidth: number, maxLines: number): string[] {
  const lines = wrapText(el, text, maxWidth);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines - 1);
  const remaining = text.slice(kept.join('').length);
  let end = remaining.length;
  while (end > 0) {
    const candidate = `${remaining.slice(0, end)}...`;
    el.textContent = candidate;
    if (el.getComputedTextLength() <= maxWidth) {
      kept.push(candidate);
      break;
    }
    end -= 1;
  }
  if (!kept.length || kept.length < maxLines) kept.push('...');
  return kept;
}

export function StrokeText({ text, fontSize = 45, duration = STROKE_DURATION_MS, className = '' }: StrokeTextProps) {
  const [lines, setLines] = useState<string[]>([text]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [viewSize, setViewSize] = useState({ width: STROKE_VIEWBOX_WIDTH, height: STROKE_VIEWBOX_HEIGHT });
  const measureRef = useRef<SVGTextElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

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
    const el = measureRef.current;
    if (!el) return;
    const lineHeight = fontSize * 1.15;
    const maxLines = Math.max(1, Math.floor(viewSize.height / lineHeight));
    const next = truncateLines(el, text, viewSize.width, maxLines);
    setLines(prev => (prev.join('\n') === next.join('\n') ? prev : next));
  }, [text, fontSize, viewSize]);

  const dash = fontSize;
  const gap = fontSize / 6;
  const dashSpace = dash * (STROKE_COLORS.length - 1) + gap * STROKE_COLORS.length;
  const cycle = -((dash + gap) * STROKE_COLORS.length);
  const lineHeight = fontSize * 1.15;
  const totalHeight = lines.length * lineHeight;
  const startY = (viewSize.height - totalHeight) / 2 + fontSize / 2;

  return (
    <div ref={wrapRef} className={`w-full h-full ${className}`}>
      <svg
        viewBox={`0 0 ${viewSize.width} ${viewSize.height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={lines.join(' ')}
      >
        <text
          ref={measureRef}
          fontSize={fontSize}
          fontFamily="var(--font-display), 'Space Grotesk', sans-serif"
          fontWeight={700}
          letterSpacing="0.025em"
          visibility="hidden"
        >
          {text}
        </text>
        {lines.map((line, lineIndex) =>
          STROKE_COLORS.map((color, index) => (
            <text
              key={`${lineIndex}-${index}`}
              x="50%"
              y={startY + lineIndex * lineHeight}
              dy="0.35em"
              textAnchor="middle"
              fontSize={fontSize}
              fontFamily="var(--font-display), 'Space Grotesk', sans-serif"
              fontWeight={700}
              letterSpacing="0.025em"
              fill="none"
              stroke={color}
              strokeWidth={3}
              strokeLinejoin="round"
              strokeDasharray={`${dash} ${dashSpace}`}
              style={{
                animation: reducedMotion ? 'none' : `strokeDashMove ${duration}ms linear ${-((index + 1) * (duration / STROKE_COLORS.length))}ms infinite`,
                ['--stroke-cycle' as never]: cycle,
              } as React.CSSProperties}
            >
              {line}
            </text>
          )),
        )}
      </svg>
    </div>
  );
}
