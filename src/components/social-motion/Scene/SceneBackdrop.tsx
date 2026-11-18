import React, { type CSSProperties } from 'react';

/**
 * FUNDO DE CENA EM MOTION (Social Studio)
 * =======================================
 * Camada de fundo de uma cena de reel, com 6 presets prontos
 * (`BG_PRESETS`). É a primeira camada da orquestração: o fundo
 * entra/transiciona ANTES dos elementos (texto, cards, CTA).
 *
 * Contrato do DS (ADR-005):
 * - ocupa a cena inteira (`position: absolute; inset: 0`) — o consumidor
 *   só posiciona o slide relativo em volta;
 * - cor vem do tema (`var(--slide-bg)`, `--slide-accent`, …), nunca de prop;
 * - a entrada é por keyframes CSS com `delayMs`/`durationMs`, então é
 *   determinística frame a frame no export de vídeo;
 * - `settled` desliga as animações e mostra o frame final — a tela
 *   estática aprovada tem que ser igual ao último frame do vídeo.
 *
 * Uso no app social (dados declarativos por cena):
 *
 * ```tsx
 * <div className="instagram-slide" data-theme={tema}>
 *   <SceneBackdrop preset={cena.bg} delayMs={0} durationMs={600} settled={estatico} />
 *   ...conteúdo por cima...
 * </div>
 * ```
 */

export type SceneBackdropPreset =
  | 'solid'
  | 'gradient-shift'
  | 'accent-glow'
  | 'shape-float'
  | 'wipe-reveal'
  | 'zoom-bg';

export type SceneBackdropEntry = 'fade' | 'wipe-up' | 'zoom';

export interface SceneBackdropPresetDef {
  id: SceneBackdropPreset;
  /** Nome de exibição (demo). */
  name: string;
  /** Duração padrão da entrada, em ms (o consumidor pode sobrepor). */
  durationMs: number;
  /** Tipo de entrada. */
  entry: SceneBackdropEntry;
  /** Quando usar. */
  desc: string;
}

/** Catálogo de presets de fundo — dados puros, consumidos pelo demo e pelo app. */
export const BG_PRESETS: SceneBackdropPresetDef[] = [
  { id: 'solid', name: 'Solid (tema)', durationMs: 0, entry: 'fade', desc: 'BG consistente por tema; o contraste vem do conteúdo.' },
  { id: 'gradient-shift', name: 'Gradient shift', durationMs: 900, entry: 'fade', desc: 'Variação de superfície entre cenas sem trocar de tema.' },
  { id: 'accent-glow', name: 'Accent glow', durationMs: 1200, entry: 'fade', desc: 'Pulso/sopro de luz de destaque (hook/CTA), sutil.' },
  { id: 'shape-float', name: 'Shapes / blur', durationMs: 600, entry: 'fade', desc: 'Profundidade com formas desfocadas em loop; não competir com o texto.' },
  { id: 'wipe-reveal', name: 'Wipe reveal', durationMs: 600, entry: 'wipe-up', desc: 'Nova superfície revelada por wipe — exige contraste entre BGs.' },
  { id: 'zoom-bg', name: 'Zoom BG', durationMs: 600, entry: 'zoom', desc: 'Ênfase na troca de camada; usar com parcimônia.' },
];

export interface SceneBackdropProps {
  /** Preset de fundo. Padrão 'solid'. */
  preset?: SceneBackdropPreset;
  /** Atraso da entrada, em ms. Padrão 0. */
  delayMs?: number;
  /** Duração da entrada, em ms. Se omitido, usa o `durationMs` do preset. */
  durationMs?: number;
  /** Estado assentado: frame final, sem animação de entrada (tela estática). */
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function SceneBackdrop({
  preset = 'solid',
  delayMs = 0,
  durationMs,
  settled = false,
  className = '',
  style,
}: SceneBackdropProps) {
  const def = BG_PRESETS.find((p) => p.id === preset) ?? BG_PRESETS[0];
  const dur = durationMs ?? def.durationMs;
  const timingVars = {
    '--fx-bg-delay': `${delayMs}ms`,
    '--fx-bg-dur': `${dur}ms`,
  } as CSSProperties;

  return (
    <div
      className={`fx-scene-bg fx-scene-bg--${preset}${settled ? ' is-settled' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...timingVars, ...style }}
      aria-hidden="true"
    >
      {/* base: sempre o fundo do tema */}
      <div className="fx-scene-bg__base" />
      {/* camada de variação (gradient-shift / wipe-reveal / zoom-bg) */}
      {preset !== 'solid' && preset !== 'accent-glow' && preset !== 'shape-float' && (
        <div className="fx-scene-bg__layer" />
      )}
      {/* accent-glow: dois sopros de luz */}
      {preset === 'accent-glow' && (
        <>
          <div className="fx-scene-bg__glow fx-scene-bg__glow--a" />
          <div className="fx-scene-bg__glow fx-scene-bg__glow--b" />
        </>
      )}
      {/* shape-float: três formas desfocadas em loop */}
      {preset === 'shape-float' && (
        <>
          <div className="fx-scene-bg__shape fx-scene-bg__shape--a" />
          <div className="fx-scene-bg__shape fx-scene-bg__shape--b" />
          <div className="fx-scene-bg__shape fx-scene-bg__shape--c" />
        </>
      )}
    </div>
  );
}
