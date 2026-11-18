export type SceneTransitionType =
  | 'none'
  | 'fade'
  | 'slide-up'
  | 'slide-left'
  | 'slide'
  | 'push'
  | 'wipe-up'
  | 'wipe'
  | 'zoom'
  | 'blur'
  | 'iris'
  | 'checkerboard'
  | 'curtain'
  | 'venetian'
  | 'diagonal'
  | 'grid'
  | 'flip'
  | 'diamond'
  | 'glitch'
  | 'rgb-split';

export type SceneEasing = 'linear' | 'smooth' | 'elastic';

export const SCENE_EASING: Record<SceneEasing, string> = {
  linear: 'linear',
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  elastic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export interface SceneTransition {
  type: SceneTransitionType;
  durationMs?: number;
  easing?: SceneEasing;
}

export interface ReelSceneDef {
  id?: string;
  durationMs: number;
  transition?: SceneTransition;
}

export const DEFAULT_TRANSITION_MS = 450;

const FRAGMENT_TYPES: ReadonlySet<string> = new Set([
  'checkerboard',
  'curtain',
  'venetian',
  'diagonal',
  'grid',
  'flip',
  'diamond',
  'glitch',
]);

export function isFragmentTransition(type: string): boolean {
  return FRAGMENT_TYPES.has(type);
}

export function normalizeTransitionType(type: SceneTransitionType | string | undefined): SceneTransitionType {
  if (!type) return 'fade';
  if (type === 'slide' || type === 'push') return 'slide-left';
  if (type === 'wipe') return 'wipe-up';
  return type as SceneTransitionType;
}

export function getSceneTransition(scene: ReelSceneDef): Required<Pick<SceneTransition, 'type' | 'durationMs' | 'easing'>> {
  const t = scene.transition;
  const type = normalizeTransitionType(t?.type ?? 'fade');
  return {
    type,
    durationMs: t?.type === 'none' || type === 'none' ? 0 : (t?.durationMs ?? DEFAULT_TRANSITION_MS),
    easing: t?.easing ?? 'smooth',
  };
}

export function getReelTotalDurationMs(scenes: ReelSceneDef[], holdMs = 0): number {
  return scenes.reduce((sum, s) => sum + Math.max(0, s.durationMs), 0) + Math.max(0, holdMs);
}
