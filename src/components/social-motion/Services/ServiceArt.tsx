import React, { type CSSProperties } from 'react';
import { ServiceIcon, type ServiceIconName } from './ServiceIcon';

/**
 * ARTE DE SERVIÇO (flat + mock)
 * =============================
 * As duas camadas visuais de um card de serviço, no contrato do DS:
 *
 * - `flat`  → ilustração plana abstrata (círculos + formas + ícone grande).
 *             No card ela entra como FUNDO com bleed (layer de trás, opaca).
 * - `mock`  → envelope de dispositivo (browser/phone/dash) com o ícone dentro
 *             e barras de UI. No card ela é o FOCO (layer da frente).
 *
 * Cor: sempre `var(--slide-accent)` (via `currentColor` no container) e
 * `var(--slide-text)` para os neutros — quem manda é o tema, nunca uma prop.
 * A "foto real" entra depois, no app social, no lugar da camada mock.
 */

export type ServiceArtVariant = 'flat' | 'mock';
export type ServiceDevice = 'browser' | 'phone' | 'dash';

export interface ServiceArtProps {
  /** Ícone exibido no centro da arte. */
  icon: ServiceIconName;
  /** 'flat' = fundo abstrato · 'mock' = envelope de dispositivo. */
  variant: ServiceArtVariant;
  /** Tipo de dispositivo do mock. Ignorado em 'flat'. Padrão 'browser'. */
  device?: ServiceDevice;
  className?: string;
  style?: CSSProperties;
}

/** ViewBox comum das duas artes. */
export const SERVICE_ART_VIEWBOX_W = 200;
export const SERVICE_ART_VIEWBOX_H = 120;

function FlatBackdrop() {
  return (
    <svg className="ssvc-art__bg" viewBox={`0 0 ${SERVICE_ART_VIEWBOX_W} ${SERVICE_ART_VIEWBOX_H}`} preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <circle cx="162" cy="10" r="66" fill="currentColor" opacity=".12" />
      <circle cx="12" cy="116" r="36" fill="var(--slide-text)" opacity=".07" />
      <circle cx="100" cy="56" r="36" stroke="currentColor" strokeWidth="2" opacity=".55" />
      <path d="M28 96h84M28 106h56" stroke="var(--slide-text)" strokeWidth="4" strokeLinecap="round" opacity=".18" />
      <path d="M150 84l20-24 12 10 18-22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".5" />
      <circle cx="196" cy="48" r="5" fill="currentColor" opacity=".7" />
      <circle cx="34" cy="30" r="4" fill="var(--slide-text)" opacity=".3" />
    </svg>
  );
}

function MockEnvelope({ device }: { device: ServiceDevice }) {
  if (device === 'phone') {
    return (
      <svg className="ssvc-art__bg" viewBox={`0 0 ${SERVICE_ART_VIEWBOX_W} ${SERVICE_ART_VIEWBOX_H}`} preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
        <rect x="72" y="6" width="56" height="108" rx="12" fill="var(--slide-text)" opacity=".06" stroke="var(--slide-text)" strokeOpacity=".3" strokeWidth="1.5" />
        <rect x="90" y="12" width="20" height="4" rx="2" fill="var(--slide-text)" opacity=".35" />
        <rect x="80" y="30" width="40" height="6" rx="3" fill="var(--slide-text)" opacity=".25" />
        <rect x="80" y="42" width="30" height="5" rx="2.5" fill="var(--slide-text)" opacity=".15" />
        <rect x="80" y="62" width="40" height="14" rx="7" fill="currentColor" opacity=".9" />
        <rect x="80" y="84" width="26" height="5" rx="2.5" fill="var(--slide-text)" opacity=".18" />
        <circle cx="100" cy="52" r="0" fill="none" />
      </svg>
    );
  }
  if (device === 'dash') {
    return (
      <svg className="ssvc-art__bg" viewBox={`0 0 ${SERVICE_ART_VIEWBOX_W} ${SERVICE_ART_VIEWBOX_H}`} preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
        <rect x="14" y="14" width="172" height="92" rx="9" fill="var(--slide-text)" opacity=".06" stroke="var(--slide-text)" strokeOpacity=".3" strokeWidth="1.5" />
        <rect x="14" y="14" width="34" height="92" rx="9" fill="var(--slide-text)" opacity=".1" />
        <circle cx="31" cy="28" r="5" fill="currentColor" />
        <rect x="22" y="44" width="18" height="4" rx="2" fill="var(--slide-text)" opacity=".3" />
        <rect x="22" y="56" width="18" height="4" rx="2" fill="var(--slide-text)" opacity=".2" />
        <rect x="56" y="26" width="38" height="30" rx="5" fill="var(--slide-text)" opacity=".08" />
        <rect x="100" y="26" width="38" height="30" rx="5" fill="currentColor" opacity=".22" />
        <rect x="144" y="26" width="34" height="30" rx="5" fill="var(--slide-text)" opacity=".08" />
        <path d="M62 48l8-9 7 5 8-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="106" y="34" width="26" height="4" rx="2" fill="currentColor" opacity=".8" />
        <rect x="106" y="42" width="18" height="4" rx="2" fill="var(--slide-text)" opacity=".3" />
        <rect x="56" y="66" width="122" height="6" rx="3" fill="var(--slide-text)" opacity=".16" />
        <rect x="56" y="78" width="86" height="6" rx="3" fill="var(--slide-text)" opacity=".1" />
        <rect x="56" y="90" width="52" height="10" rx="5" fill="currentColor" opacity=".9" />
      </svg>
    );
  }
  // browser (padrão)
  return (
    <svg className="ssvc-art__bg" viewBox={`0 0 ${SERVICE_ART_VIEWBOX_W} ${SERVICE_ART_VIEWBOX_H}`} preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
      <rect x="18" y="12" width="164" height="96" rx="9" fill="var(--slide-text)" opacity=".06" stroke="var(--slide-text)" strokeOpacity=".3" strokeWidth="1.5" />
      <path d="M18 21a9 9 0 0 1 9-9h146a9 9 0 0 1 9 9v7H18z" fill="var(--slide-text)" opacity=".12" />
      <circle cx="28" cy="20" r="2.6" fill="var(--slide-text)" opacity=".4" />
      <circle cx="38" cy="20" r="2.6" fill="var(--slide-text)" opacity=".3" />
      <circle cx="48" cy="20" r="2.6" fill="var(--slide-text)" opacity=".2" />
      <rect x="28" y="40" width="72" height="7" rx="3.5" fill="var(--slide-text)" opacity=".28" />
      <rect x="28" y="54" width="104" height="5" rx="2.5" fill="var(--slide-text)" opacity=".16" />
      <rect x="28" y="64" width="80" height="5" rx="2.5" fill="var(--slide-text)" opacity=".12" />
      <rect x="28" y="80" width="46" height="15" rx="7.5" fill="currentColor" opacity=".92" />
      <rect x="112" y="40" width="62" height="55" rx="6" fill="currentColor" opacity=".14" />
      <circle cx="143" cy="66" r="13" stroke="currentColor" strokeWidth="2.4" opacity=".65" />
    </svg>
  );
}

export function ServiceArt({ icon, variant, device = 'browser', className = '', style }: ServiceArtProps) {
  return (
    <div className={`ssvc-art ssvc-art--${variant} ${className}`.trim()} style={style} aria-hidden="true">
      {variant === 'flat' ? <FlatBackdrop /> : <MockEnvelope device={device} />}
      <ServiceIcon
        name={icon}
        size={variant === 'flat' ? 34 : 30}
        strokeWidth={variant === 'flat' ? 1.4 : 1.7}
        className="ssvc-art__icon"
      />
    </div>
  );
}
