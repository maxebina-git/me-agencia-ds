import React, { useState, useEffect, useRef } from 'react';

export const TIPSY_DURATION_MS = 6000;
export const TIPSY_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

interface TipsyFrameProps {
  text: string;
  duration?: number;
  easing?: string;
  delay?: number;
  animate?: boolean;
  className?: string;
  onComplete?: () => void;
}

export function TipsyFrame({
  text,
  duration = TIPSY_DURATION_MS,
  easing = TIPSY_EASING,
  delay = 0,
  animate = true,
  className = '',
  onComplete,
}: TipsyFrameProps) {
  const [isActive, setIsActive] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!animate) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let completeId: ReturnType<typeof setTimeout> | null = null;
    const startId = setTimeout(() => {
      setIsActive(true);
      completeId = setTimeout(() => onCompleteRef.current?.(), duration);
    }, delay);
    return () => {
      clearTimeout(startId);
      if (completeId) clearTimeout(completeId);
    };
  }, [text, duration, delay, animate]);

  const frameStyle = (borderColor: string, zIndex: number, boxShadow?: string): React.CSSProperties => ({
    boxSizing: 'content-box',
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '80%',
    padding: '0.9em 0.3em',
    borderStyle: 'solid',
    borderWidth: '0.32em',
    borderColor,
    boxShadow,
    zIndex,
    transform: `translate(-50%, -50%) rotate(${isActive ? 180 : 0}deg)`,
    transition: `transform ${duration}ms ${easing}`,
    pointerEvents: 'none',
  });

  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <span className="relative z-10">{text}</span>
      <span style={frameStyle('var(--slide-accent) var(--slide-accent) transparent transparent', 0)} aria-hidden="true" />
      <span style={frameStyle('transparent transparent var(--slide-primary) var(--slide-primary)', 20, '0 0 40px color-mix(in srgb, var(--slide-primary) 45%, transparent)')} aria-hidden="true" />
    </span>
  );
}
