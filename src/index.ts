// Design System Max Ebina - Entry Point
// Exporta todos os componentes para uso em outros projetos

// Componentes UI
export { Badge } from './components/ui';
export { GlitchText } from './components/ui';
export { Button } from './components/ui';
export { ServiceCard } from './components/ui';
export { LeadCaptureForm } from './components/ui';
export { FAQ } from './components/ui';
export { TestimonialCard } from './components/ui';
export { WhatsAppFloat } from './components/ui';
export { ScrollToTop } from './components/ui';
export { Navbar } from './components/ui';
export { Footer } from './components/ui';
export { Table } from './components/ui';
export { SectionHeader } from './components/ui';
export { AnimatedCounter } from './components/ui';
export { Modal } from './components/ui';
export { Drawer } from './components/ui';

// Componentes de Seção
export { HeroSection } from './components/HeroSection';
export { InstagramSlide } from './components/ui';

// Componentes de Template
export { PhoneMockup } from './components/PhoneMockup';

// Componentes de Background
export { ParticlesBackground } from './components/ParticlesBackground';
export { OceanBackground } from './components/OceanBackground';

// Social Motion — Textos
export { TextScramble, getScrambleFrame, getScrambleTotalTicks, SCRAMBLE_CHARSET, SCRAMBLE_TICK_MS, SCRAMBLE_STAGGER_MS, SCRAMBLE_LETTER_MS } from './components/social-motion/Text/TextScramble';
export { TipsyFrame, TIPSY_DURATION_MS, TIPSY_EASING } from './components/social-motion/Text/TipsyFrame';
export { AppleTitle, APPLE_DIVIDER_MS, APPLE_LINE_MS, APPLE_HOLD_MS, APPLE_BOTTOM_MS, APPLE_EASING, APPLE_TOP_FONT_PX, APPLE_BOTTOM_FONT_PX, APPLE_FIRST_LINE_FONT_PX } from './components/social-motion/Text/AppleTitle';
export { StrokeText, STROKE_VIEWBOX_WIDTH, STROKE_VIEWBOX_HEIGHT, STROKE_DURATION_MS, STROKE_COLORS } from './components/social-motion/Text/StrokeText';
export { PewPewText } from './components/social-motion/Text/PewPewText';
export type { PewPewTextProps } from './components/social-motion/Text/PewPewText';
export { RubberStamp } from './components/social-motion/Text/RubberStamp';
export type { RubberStampProps } from './components/social-motion/Text/RubberStamp';

// Social Motion — Path
export { PathRun, PATH_RUN_DEFAULT_D, PATH_ARROW_DEFAULT_D, PATH_CARD_DEFAULT_D, PATH_LOGO_M_D, PATH_LOGO_E_D, PATH_LOGO_VIEWBOX, PATH_TEXT_DEFAULT, PATH_TEXT_FONT_SIZE, PATH_RUN_VIEWBOX_WIDTH, PATH_RUN_VIEWBOX_HEIGHT } from './components/social-motion/Path/PathRun';
export type { PathRunVariant } from './components/social-motion/Path/PathRun';
export { PathPointer, PATH_POINTER_DEFAULT_D, PATH_POINTER_VIEWBOX_WIDTH, PATH_POINTER_VIEWBOX_HEIGHT } from './components/social-motion/Path/PathPointer';
export { PathPulse, PATH_PULSE_DEFAULT_D, PATH_PULSE_VIEWBOX_WIDTH, PATH_PULSE_VIEWBOX_HEIGHT } from './components/social-motion/Path/PathPulse';
export type { PathPulseProps } from './components/social-motion/Path/PathPulse';

// Social Motion — Elementos de apoio (entram junto com o texto)
export { DecoStamp } from './components/social-motion/Deco/DecoStamp';
export type { DecoStampProps } from './components/social-motion/Deco/DecoStamp';
export { DecoPointer, DECO_POINTER_DEFAULT_D, buildPointerPath, POINTER_TIP_RATIO } from './components/social-motion/Deco/DecoPointer';
export type { DecoPointerProps } from './components/social-motion/Deco/DecoPointer';
export { DecoCounter } from './components/social-motion/Deco/DecoCounter';
export type { DecoCounterProps } from './components/social-motion/Deco/DecoCounter';
export { DecoBox, buildBoxPath } from './components/social-motion/Deco/DecoBox';
export type { DecoBoxProps, DecoBoxVariant } from './components/social-motion/Deco/DecoBox';

// Social Motion — Cena & Timeline (reels/vídeo multi-cena)
export { ReelTimeline, getReelTotalDurationMs, getSceneTransition, SCENE_EASING, DEFAULT_TRANSITION_MS } from './components/social-motion/Scene';
export type { ReelTimelineProps, SceneRenderState, ReelSceneDef, SceneTransition, SceneTransitionType, SceneEasing } from './components/social-motion/Scene';
export { SceneBackdrop, BG_PRESETS } from './components/social-motion/Scene';
export type { SceneBackdropProps, SceneBackdropPreset, SceneBackdropPresetDef, SceneBackdropEntry } from './components/social-motion/Scene';
export { StepsList, ReelProgress, MarqueeTape, SceneOverlay } from './components/social-motion/Scene';
export type { StepsListProps, StepItem, ReelProgressProps, MarqueeTapeProps, SceneOverlayProps, SceneOverlayPreset } from './components/social-motion/Scene';

// Social Motion — Extras (lote 2026-11-17: CTA, lista, sticker, confete, anel, lottie)
export { CtaButton } from './components/social-motion/Deco/CtaButton';
export type { CtaButtonProps } from './components/social-motion/Deco/CtaButton';
export { StickerPop } from './components/social-motion/Deco/StickerPop';
export type { StickerPopProps } from './components/social-motion/Deco/StickerPop';
export { ConfettiBurst } from './components/social-motion/Deco/ConfettiBurst';
export type { ConfettiBurstProps } from './components/social-motion/Deco/ConfettiBurst';
export { DecoProgressRing } from './components/social-motion/Deco/DecoProgressRing';
export type { DecoProgressRingProps } from './components/social-motion/Deco/DecoProgressRing';
export { LottieDeco } from './components/social-motion/Deco/LottieDeco';
export type { LottieDecoProps } from './components/social-motion/Deco/LottieDeco';

// Social Motion — Serviços (card de serviço: selo + arte + título + safe zone)
// Obs.: o nome `ServiceCard` já existe em components/ui (card da LP) — por isso
// o primitivo novo se chama `SocialServiceCard`.
export { ServiceIcon, ServiceArt, SocialServiceCard, SERVICE_FAMILIES, SOCIAL_SERVICE_CARD_SIZES, SERVICE_ART_VIEWBOX_W, SERVICE_ART_VIEWBOX_H } from './components/social-motion/Services';
export type { ServiceIconName, ServiceIconProps, ServiceArtProps, ServiceArtVariant, ServiceDevice, SocialServiceCardProps, ServiceCardAspect, ServiceFamily, ServiceCardData } from './components/social-motion/Services';

// Importar estilos globais
import './index.css';
