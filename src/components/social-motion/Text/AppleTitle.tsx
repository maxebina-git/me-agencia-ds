import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

export const APPLE_DIVIDER_MS = 500;
export const APPLE_LINE_MS = 600;
export const APPLE_HOLD_MS = 400;
export const APPLE_BOTTOM_MS = 500;
export const APPLE_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const APPLE_TOP_FONT_PX = 18;
export const APPLE_BOTTOM_FONT_PX = 24;
export const APPLE_FIRST_LINE_FONT_PX = 16;

interface AppleTitleProps {
  top: string[];
  bottom: string;
  dividerDuration?: number;
  lineDuration?: number;
  lineHold?: number;
  bottomDuration?: number;
  easing?: string;
  animate?: boolean;
  className?: string;
  onComplete?: () => void;
  topFontSize?: number;
  bottomFontSize?: number;
  firstLineFontSize?: number;
  secondLineFontSize?: number;
  autoFit?: boolean;
  fitPadding?: number;
}

export function AppleTitle({
  top,
  bottom,
  dividerDuration = APPLE_DIVIDER_MS,
  lineDuration = APPLE_LINE_MS,
  lineHold = APPLE_HOLD_MS,
  bottomDuration = APPLE_BOTTOM_MS,
  easing = APPLE_EASING,
  animate = true,
  className = '',
  onComplete,
  topFontSize = APPLE_TOP_FONT_PX,
  bottomFontSize = APPLE_BOTTOM_FONT_PX,
  firstLineFontSize,
  secondLineFontSize,
  autoFit = true,
  fitPadding = 0,
}: AppleTitleProps) {
  const finalStep = top.length + 2;
  const [step, setStep] = useState(() => (animate ? 0 : finalStep));
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lineHeights, setLineHeights] = useState<number[]>([]);
  const [bottomHeight, setBottomHeight] = useState(0);
  const [topSize, setTopSize] = useState(topFontSize);
  const [bottomSize, setBottomSize] = useState(bottomFontSize);
  const [firstSize, setFirstSize] = useState(firstLineFontSize ?? topFontSize);
  const [secondSize, setSecondSize] = useState(secondLineFontSize ?? topFontSize);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bottomRef = useRef<HTMLSpanElement | null>(null);
  const topSizeRef = useRef(topFontSize);
  const bottomSizeRef = useRef(bottomFontSize);
  const firstSizeRef = useRef(firstLineFontSize ?? topFontSize);
  const secondSizeRef = useRef(secondLineFontSize ?? topFontSize);
  const fitKeyRef = useRef('');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    topSizeRef.current = topSize;
  }, [topSize]);

  useEffect(() => {
    bottomSizeRef.current = bottomSize;
  }, [bottomSize]);

  useEffect(() => {
    firstSizeRef.current = firstSize;
  }, [firstSize]);

  useEffect(() => {
    secondSizeRef.current = secondSize;
  }, [secondSize]);

  const playing = animate && !reducedMotion;

  useLayoutEffect(() => {
    const next = lineRefs.current.map(el => el?.getBoundingClientRect().height ?? 0);
    if (next.join(',') !== lineHeights.join(',')) setLineHeights(next);
    const nextBottom = bottomRef.current?.getBoundingClientRect().height ?? 0;
    if (nextBottom !== bottomHeight) setBottomHeight(nextBottom);
  }, [top, bottom, topSize, bottomSize, firstSize, secondSize, step]);

  useLayoutEffect(() => {
    if (!autoFit) {
      if (Math.abs(topSizeRef.current - topFontSize) > 0.1) {
        topSizeRef.current = topFontSize;
        setTopSize(topFontSize);
      }
      if (Math.abs(bottomSizeRef.current - bottomFontSize) > 0.1) {
        bottomSizeRef.current = bottomFontSize;
        setBottomSize(bottomFontSize);
      }
      const firstTarget = firstLineFontSize ?? topFontSize;
      if (Math.abs(firstSizeRef.current - firstTarget) > 0.1) {
        firstSizeRef.current = firstTarget;
        setFirstSize(firstTarget);
      }
      const secondTarget = secondLineFontSize ?? topFontSize;
      if (Math.abs(secondSizeRef.current - secondTarget) > 0.1) {
        secondSizeRef.current = secondTarget;
        setSecondSize(secondTarget);
      }
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const fit = () => {
      const availWidth = el.clientWidth - fitPadding;
      if (!availWidth || availWidth <= 0) return;
      const availHeight = el.clientHeight > 0 ? el.clientHeight / 2 : 0;
      const fitKey = `${availWidth}x${availHeight}|${firstLineFontSize}|${secondLineFontSize}`;
      const resetToTarget = fitKey !== fitKeyRef.current;
      fitKeyRef.current = fitKey;

      // Linhas com tamanho proprio (1a/2a): quebra na mesma tag (wrap normal).
      const fitOwnLine = (idx: number, target: number | undefined, sizeRef: React.MutableRefObject<number>, setSize: (v: number) => void) => {
        const lineEl = lineRefs.current[idx];
        const lineHeightPx = lineEl ? lineEl.getBoundingClientRect().height : 0;
        if (target !== undefined && lineEl && lineHeightPx > 0) {
          const current = sizeRef.current;
          let next = current;
          if (availHeight > 0 && lineHeightPx > availHeight) {
            // Nao cabe: encolhe proporcionalmente.
            next = Math.max(8, Math.floor(Math.min(target, current * (availHeight / lineHeightPx)) * 10) / 10);
          } else if (resetToTarget && Math.abs(current - target) > 0.1) {
            // So volta ao alvo quando o container/alvo mudou. Voltar a cada medicao fazia
            // encolher -> caber -> voltar ao alvo -> nao caber em loop infinito de setState.
            next = target;
          }
          if (Math.abs(current - next) > 0.1) {
            sizeRef.current = next;
            setSize(next);
          }
        }
        return lineHeightPx;
      };
      const firstHeight = fitOwnLine(0, firstLineFontSize, firstSizeRef, setFirstSize);
      const secondHeight = fitOwnLine(1, secondLineFontSize, secondSizeRef, setSecondSize);

      // Demais linhas do topo: escala pela largura E pela altura restante.
      const usedBeforeRest = (firstLineFontSize !== undefined ? firstHeight : 0) + (secondLineFontSize !== undefined ? secondHeight : 0);
      const remainingHeight = availHeight > 0 ? Math.max(0, availHeight - usedBeforeRest) : 0;
      let maxTopWidth = 0;
      let totalTopHeight = 0;
      lineRefs.current.forEach((r, idx) => {
        if (!r || (idx === 0 && firstLineFontSize !== undefined) || (idx === 1 && secondLineFontSize !== undefined)) return;
        maxTopWidth = Math.max(maxTopWidth, r.scrollWidth);
        totalTopHeight += r.getBoundingClientRect().height;
      });
      if (maxTopWidth > 0 && totalTopHeight > 0) {
        let scale = 1;
        if (maxTopWidth > availWidth) scale = Math.min(scale, availWidth / maxTopWidth);
        if (remainingHeight > 0 && totalTopHeight > remainingHeight) scale = Math.min(scale, remainingHeight / totalTopHeight);
        if (scale < 1) {
          const nextTop = Math.max(8, Math.floor(Math.min(topFontSize, topSizeRef.current * scale) * 10) / 10);
          if (Math.abs(topSizeRef.current - nextTop) > 0.1) {
            topSizeRef.current = nextTop;
            setTopSize(nextTop);
          }
        }
      }

      // Bottom: idem, com a sua metade do container.
      const b = bottomRef.current;
      if (b && b.scrollWidth > 0) {
        const bHeight = b.getBoundingClientRect().height;
        let scale = 1;
        if (b.scrollWidth > availWidth) scale = Math.min(scale, availWidth / b.scrollWidth);
        if (availHeight > 0 && bHeight > availHeight) scale = Math.min(scale, availHeight / bHeight);
        if (scale < 1) {
          const nextBottom = Math.max(8, Math.floor(Math.min(bottomFontSize, bottomSizeRef.current * scale) * 10) / 10);
          if (Math.abs(bottomSizeRef.current - nextBottom) > 0.1) {
            bottomSizeRef.current = nextBottom;
            setBottomSize(nextBottom);
          }
        }
      }
    };
    fit();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(fit);
      ro.observe(el);
    }
    if (typeof document !== 'undefined' && document.fonts && typeof document.fonts.ready.then === 'function') {
      document.fonts.ready.then(() => fit()).catch(() => undefined);
    }
    return () => { ro?.disconnect(); };
  }, [top, bottom, topFontSize, bottomFontSize, firstLineFontSize, secondLineFontSize, autoFit, fitPadding, lineHeights, bottomHeight]);

  useEffect(() => {
    if (!playing) {
      setStep(finalStep);
      return;
    }
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 0;
    timers.push(setTimeout(() => setStep(1), at));
    at += dividerDuration;
    top.forEach((_, index) => {
      timers.push(setTimeout(() => setStep(2 + index), at));
      at += lineDuration + lineHold;
    });
    timers.push(setTimeout(() => setStep(finalStep), at));
    timers.push(setTimeout(() => onCompleteRef.current?.(), at + bottomDuration));
    return () => timers.forEach(clearTimeout);
  }, [playing, top, bottom, dividerDuration, lineDuration, lineHold, bottomDuration, finalStep]);

  const transition = (duration: number) => `transform ${duration}ms ${easing}, height ${duration}ms ${easing}`;

  return (
    <span ref={containerRef} className={`relative block w-full h-full text-base ${className}`}>
      <span className="absolute left-0 w-full flex flex-col justify-end" style={{ bottom: '50%' }}>
        {top.map((line, index) => {
          const visible = step > 1 + index;
          const isFirst = index === 0 && firstLineFontSize !== undefined;
          const isSecond = index === 1 && secondLineFontSize !== undefined;
          const isAuto = isFirst || isSecond;
          const lineSize = isFirst ? firstSize : isSecond ? secondSize : topSize;
          const fallbackHeight = isAuto ? lineSize * 1.2 : lineSize * 1.15;
          return (
            <span
              key={index}
              className="block overflow-hidden"
              style={{
                height: visible ? `${lineHeights[index] ?? fallbackHeight}px` : '0px',
                transition: transition(lineDuration),
              }}
            >
              <span
                ref={el => { lineRefs.current[index] = el; }}
                className={`block ${isAuto ? 'leading-normal' : 'leading-[1.15]'} ${index === 0 ? 'text-[var(--slide-text)] opacity-60' : 'text-[var(--slide-text)]'}`}
                style={isAuto
                  ? { fontSize: lineSize, transform: visible ? 'translateY(0)' : 'translateY(100%)', transition: `transform ${lineDuration}ms ${easing}`, whiteSpace: 'normal', overflowWrap: 'normal', wordBreak: 'normal', hyphens: 'none', lineHeight: 'normal' }
                  : { fontSize: lineSize, transform: visible ? 'translateY(0)' : 'translateY(100%)', transition: `transform ${lineDuration}ms ${easing}`, whiteSpace: 'normal', overflowWrap: 'normal', wordBreak: 'normal', hyphens: 'none' }}
              >
                {line}
              </span>
            </span>
          );
        })}
      </span>
      <span
        className="absolute left-0 block h-[3px] w-full bg-[var(--slide-accent)] origin-center"
        style={{ top: '50%', transform: `translateY(-50%) scaleX(${step >= 1 ? 1 : 0})`, transition: `transform ${dividerDuration}ms ${easing}` }}
        aria-hidden="true"
      />
      <span className="absolute left-0 w-full flex flex-col justify-start" style={{ top: '50%' }}>
        <span
          className="block overflow-hidden"
          style={{
            height: step >= finalStep ? `${bottomHeight || bottomSize * 1.15}px` : '0px',
            transition: transition(bottomDuration),
          }}
        >
          <span
            ref={bottomRef}
            className="block whitespace-nowrap leading-normal text-[var(--slide-accent)]"
            style={{ fontSize: bottomSize, transform: step >= finalStep ? 'translateY(0)' : 'translateY(-100%)', transition: `transform ${bottomDuration}ms ${easing}`, lineHeight: 'normal' }}
          >
            {bottom}
          </span>
        </span>
      </span>
    </span>
  );
}
