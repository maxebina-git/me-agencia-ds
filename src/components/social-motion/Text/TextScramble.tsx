import React, { useState, useEffect, useRef } from 'react';

export const SCRAMBLE_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const SCRAMBLE_TICK_MS = 30;
export const SCRAMBLE_STAGGER_MS = 90;
export const SCRAMBLE_LETTER_MS = 720;

export function getScrambleFrame(
  text: string,
  tick: number,
  charset: string = SCRAMBLE_CHARSET,
  tickMs: number = SCRAMBLE_TICK_MS,
  staggerMs: number = SCRAMBLE_STAGGER_MS,
): string {
  const letterFrames = Math.max(1, Math.round(SCRAMBLE_LETTER_MS / tickMs));
  const staggerFrames = Math.max(1, Math.round(staggerMs / tickMs));
  return text.split('').map((char, index) => {
    const start = index * staggerFrames;
    if (tick <= start) return ' ';
    if (tick <= start + letterFrames) return charset[Math.floor(Math.random() * charset.length)] || ' ';
    return char;
  }).join('');
}

export function getScrambleTotalTicks(
  text: string,
  tickMs: number = SCRAMBLE_TICK_MS,
  staggerMs: number = SCRAMBLE_STAGGER_MS,
): number {
  if (text.length === 0) return 0;
  const letterFrames = Math.max(1, Math.round(SCRAMBLE_LETTER_MS / tickMs));
  const staggerFrames = Math.max(1, Math.round(staggerMs / tickMs));
  return (text.length - 1) * staggerFrames + letterFrames + 1;
}

interface TextScrambleProps {
  text: string;
  charset?: string;
  tick?: number;
  stagger?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TextScramble({
  text,
  charset = SCRAMBLE_CHARSET,
  tick = SCRAMBLE_TICK_MS,
  stagger = SCRAMBLE_STAGGER_MS,
  delay = 300,
  className = '',
  onComplete,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(() => getScrambleFrame(text, 0, charset, tick, stagger));
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text);
      return;
    }
    setDisplay(getScrambleFrame(text, 0, charset, tick, stagger));
    let tickCount = 0;
    let interval: ReturnType<typeof setInterval> | null = null;
    const totalTicks = getScrambleTotalTicks(text, tick, stagger);
    const delayId = setTimeout(() => {
      interval = setInterval(() => {
        tickCount += 1;
        setDisplay(getScrambleFrame(text, tickCount, charset, tick, stagger));
        if (tickCount >= totalTicks) {
          if (interval) clearInterval(interval);
          onCompleteRef.current?.();
        }
      }, tick);
    }, delay);
    return () => {
      clearTimeout(delayId);
      if (interval) clearInterval(interval);
    };
  }, [text, charset, tick, stagger, delay]);

  return <span className={className}>{display}</span>;
}
