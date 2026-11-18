import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getReelTotalDurationMs, getSceneTransition, isFragmentTransition, type ReelSceneDef, type SceneTransition } from './timeline';

export interface SceneRenderState {
  index: number;
  scene: ReelSceneDef;
  active: boolean;
  progress: number;
  elapsedMs: number;
}

export interface ReelTimelineProps {
  scenes: ReelSceneDef[];
  holdMs?: number;
  autoPlay?: boolean;
  loop?: boolean;
  startAtMs?: number;
  renderScene: (state: SceneRenderState) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onProgress?: (elapsedMs: number, totalMs: number) => void;
  onComplete?: () => void;
}

function computeActiveIndex(scenes: ReelSceneDef[], elapsedMs: number): number {
  let acc = 0;
  for (let i = 0; i < scenes.length; i++) {
    const dur = Math.max(0, scenes[i].durationMs);
    if (elapsedMs < acc + dur || i === scenes.length - 1) return i;
    acc += dur;
  }
  return Math.max(0, scenes.length - 1);
}

function easeOutCubic(x: number): number {
  const t = Math.min(1, Math.max(0, x));
  return 1 - Math.pow(1 - t, 3);
}

// Regra: outgoing (slide/BG atual) permanece visível e o incoming (próximo, BG+elementos)
// é revelado por cima (clip/opacity/transform) OU por fragmentos (fatias do outgoing saem).
function transitionStyle(t: Required<Pick<SceneTransition, 'type' | 'durationMs' | 'easing'>>, p: number): React.CSSProperties {
  const k = easeOutCubic(p);
  if (t.type === 'none') return { opacity: p >= 1 ? 1 : 0 };
  if (t.type === 'fade') return { opacity: k };
  if (t.type === 'slide-up') return { opacity: k, transform: 'translateY(' + (1 - k) * 8 + '%)' };
  if (t.type === 'slide-left' || t.type === 'slide' || t.type === 'push') return { opacity: k, transform: 'translateX(' + (1 - k) * 8 + '%)' };
  if (t.type === 'zoom') return { opacity: k, transform: 'scale(' + (1 + (1 - k) * 0.04) + ')' };
  if (t.type === 'wipe-up' || t.type === 'wipe') return { opacity: 1, clipPath: 'inset(' + (1 - k) * 100 + '% 0 0 0)' };
  if (t.type === 'blur') return { opacity: k, filter: 'blur(' + (1 - k) * 8 + 'px)' };
  if (t.type === 'iris') return { opacity: 1, clipPath: 'circle(' + k * 120 + '% at 50% 50%)' };
  if (t.type === 'rgb-split') {
    const o = (1 - k) * 3;
    return {
      opacity: k,
      transform: 'translateX(' + (1 - k) * 10 + 'px)',
      filter:
        'drop-shadow(' + o + 'px 0 0 var(--slide-accent)) drop-shadow(' + -o + 'px 0 0 var(--slide-primary, var(--slide-accent)))',
    };
  }
  if (isFragmentTransition(t.type)) return { opacity: 1 };
  return { opacity: k };
}

type FragSpec = { cols: number; rows: number; stagger: number };

function fragSpec(type: string): FragSpec {
  if (type === 'curtain') return { cols: 4, rows: 1, stagger: 0.06 };
  if (type === 'venetian') return { cols: 1, rows: 6, stagger: 0.05 };
  if (type === 'diagonal') return { cols: 2, rows: 1, stagger: 0.08 };
  if (type === 'flip') return { cols: 2, rows: 2, stagger: 0.07 };
  if (type === 'diamond' || type === 'grid') return { cols: 4, rows: 3, stagger: type === 'diamond' ? 0.07 : 0.05 };
  if (type === 'checkerboard') return { cols: 4, rows: 3, stagger: 1 / 15 };
  if (type === 'glitch') return { cols: 6, rows: 4, stagger: 0.05 };
  return { cols: 4, rows: 3, stagger: 0.08 };
}

function cellDelay(type: string, row: number, col: number, cols: number, rows: number, stagger: number): number {
  if (type === 'diagonal') return col * stagger;
  if (type === 'diamond') return (Math.abs(col - (cols - 1) / 2) + Math.abs(row - (rows - 1) / 2)) * stagger;
  if (type === 'glitch') return ((row * 7 + col * 13) % 5) * stagger; // jitter determinístico por célula
  return (row + col) * stagger;
}

function FragmentedOutgoing({ type, progress, children }: { type: string; progress: number; children: React.ReactNode }) {
  const { cols, rows, stagger } = fragSpec(type);
  const maxDelay = Array.from({ length: cols * rows }).reduce<number>((m, _, idx) => {
    const r = Math.floor(idx / cols), c = idx % cols;
    return Math.max(m, cellDelay(type, r, c, cols, rows, stagger));
  }, 0);
  const windowDur = Math.max(0.001, 1 - maxDelay);
  const cells = Array.from({ length: cols * rows });
  const isCheckerboard = type === 'checkerboard';
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gridTemplateRows: 'repeat(' + rows + ', 1fr)', pointerEvents: 'none', perspective: isCheckerboard ? '600px' : '800px' }}>
      {cells.map((_, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const even = (row + col) % 2 === 0;
        const delay = cellDelay(type, row, col, cols, rows, stagger);
        const cellP = easeOutCubic(Math.min(1, Math.max(0, (progress - delay) / windowDur)));
        const covered = 1 - cellP;
        let transform = 'scale(' + (0.82 + 0.18 * covered) + ')';
        if (type === 'curtain') transform = 'scaleX(' + covered + ')';
        else if (type === 'venetian') transform = 'scaleY(' + covered + ')';
        else if (type === 'diagonal') transform = 'translateX(' + (cellP * (col === 0 ? -120 : 120)) + '%)';
        else if (type === 'flip' || type === 'grid' || type === 'diamond') transform = 'rotateX(' + (even ? cellP * -90 : 0) + 'deg) rotateY(' + (even ? 0 : cellP * -90) + 'deg) scale(' + (0.85 + 0.15 * covered) + ')';
        else if (type === 'checkerboard') transform = even ? 'rotateY(' + cellP * -180 + 'deg)' : 'translateX(' + cellP * 8 + 'px)';
        else if (type === 'glitch') transform = 'translate(' + cellP * (col % 2 === 0 ? -16 : 16) + 'px,' + cellP * (row % 2 === 0 ? -10 : 10) + 'px) scale(' + (1 - 0.12 * cellP) + ')';
        return (
          <div key={idx} style={{ position: 'relative', overflow: 'hidden', width: isCheckerboard ? '101%' : '100%', height: isCheckerboard ? '102%' : '100%', marginTop: isCheckerboard ? '-1%' : undefined, zIndex: isCheckerboard ? 2 : undefined }}>
            <div style={{ position: 'absolute', width: cols * 100 + '%', height: rows * 100 + '%', left: -col * 100 + '%', top: -row * 100 + '%', opacity: covered, transform, transformOrigin: type === 'curtain' ? 'left' : type === 'venetian' ? 'top' : 'center', backfaceVisibility: 'hidden', willChange: 'transform, opacity' }}>
              {children}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ReelTimeline({
  scenes,
  holdMs = 0,
  autoPlay = true,
  loop = false,
  startAtMs = 0,
  renderScene,
  className = '',
  style,
  onProgress,
  onComplete,
}: ReelTimelineProps) {
  const totalMs = useMemo(() => getReelTotalDurationMs(scenes, holdMs), [scenes, holdMs]);
  const [elapsedMs, setElapsedMs] = useState(() => Math.min(Math.max(0, startAtMs), totalMs));

  useEffect(() => {
    setElapsedMs(Math.min(Math.max(0, startAtMs), totalMs));
  }, [startAtMs, totalMs, scenes]);

  useEffect(() => {
    if (!autoPlay || scenes.length === 0) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setElapsedMs(totalMs);
      onProgress?.(totalMs, totalMs);
      onComplete?.();
      return;
    }
    let raf = 0;
    const start = performance.now() - elapsedMs;
    const tick = (now: number) => {
      const next = Math.min(now - start, totalMs);
      setElapsedMs(next);
      onProgress?.(next, totalMs);
      if (next >= totalMs) {
        onComplete?.();
        if (loop && totalMs > 0) raf = requestAnimationFrame(tick);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoPlay, loop, totalMs, scenes.length]);

  const activeIndex = computeActiveIndex(scenes, elapsedMs);

  let acc = 0;
  const starts: number[] = [];
  scenes.forEach((s) => { starts.push(acc); acc += Math.max(0, s.durationMs); });
  const activeStart = starts[activeIndex] ?? 0;
  const activeT = getSceneTransition(scenes[activeIndex] ?? { durationMs: 0 });
  const inTransition = activeT.durationMs > 0 && elapsedMs - activeStart < activeT.durationMs;
  const outgoingIndex = inTransition && activeIndex > 0 ? activeIndex - 1 : -1;
  const revealP = inTransition ? Math.min(1, Math.max(0, (elapsedMs - activeStart) / activeT.durationMs)) : 1;
  const fragment = isFragmentTransition(activeT.type);

  const outgoingScene = outgoingIndex >= 0 ? scenes[outgoingIndex] : null;
  const outgoingStart = outgoingIndex >= 0 ? (starts[outgoingIndex] ?? 0) : 0;
  const outgoingDur = Math.max(0, outgoingScene?.durationMs ?? 0);
  const outgoingLocal = outgoingScene ? Math.min(outgoingDur, Math.max(0, elapsedMs - outgoingStart)) : 0;
  const outgoingProgress = outgoingDur > 0 ? outgoingLocal / outgoingDur : 1;

  acc = 0;
  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', ...style }}>
      {scenes.map((scene, index) => {
        const start = acc;
        const dur = Math.max(0, scene.durationMs);
        acc += dur;
        const active = index === activeIndex;
        const outgoing = index === outgoingIndex;
        const visible = active || (outgoing && !fragment);
        const local = Math.min(Math.max(0, (active ? elapsedMs : start + dur) - start), dur);
        const progress = dur > 0 ? local / dur : 1;
        const t = getSceneTransition(scene);
        const p = active ? revealP : outgoing ? 1 : 0;
        const baseStyle = active ? transitionStyle(t, p) : { opacity: 1 };
        const layerStyle: React.CSSProperties = visible
          ? { position: 'absolute', inset: 0, pointerEvents: active ? 'auto' : 'none', zIndex: active ? 2 : 1, ...baseStyle }
          : { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0 };
        return (
          <div key={scene.id ?? index} aria-hidden={!active} style={layerStyle}>
            {visible ? renderScene({ index, scene, active, progress, elapsedMs: local }) : null}
          </div>
        );
      })}
      {fragment && outgoingScene ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
          <FragmentedOutgoing type={activeT.type} progress={revealP}>
            {renderScene({ index: outgoingIndex, scene: outgoingScene, active: false, progress: outgoingProgress, elapsedMs: outgoingLocal })}
          </FragmentedOutgoing>
        </div>
      ) : null}
    </div>
  );
}
