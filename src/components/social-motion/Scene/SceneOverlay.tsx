import React, { type CSSProperties } from 'react';

/**
 * OVERLAY DE CENA (Social Studio)
 * ===============================
 * Camada estática por cima da cena: vinheta, grão de filme (SVG feTurbulence
 * em data-URI) ou ambos. **Sem animação** — é seguro para o export frame a
 * frame e para `prefers-reduced-motion` (já é estático por natureza).
 *
 * Cores do tema: vinheta usa `--slide-bg`; o grão é monocromático com
 * `mix-blend-mode: overlay`. `z-index` 30 (abaixo da safe zone overlay do app).
 */
export type SceneOverlayPreset = 'vignette' | 'grain' | 'grain-vignette';

export interface SceneOverlayProps {
  preset?: SceneOverlayPreset;
  /** Opacidade extra da camada toda (0..1). */
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

export function SceneOverlay({ preset = 'grain-vignette', opacity, className = '', style }: SceneOverlayProps) {
  return (
    <div
      className={`fx-overlay fx-overlay--${preset}${className ? ` ${className}` : ''}`}
      style={opacity !== undefined ? { opacity, ...style } : style}
      aria-hidden="true"
    />
  );
}
