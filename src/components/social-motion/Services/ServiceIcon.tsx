import React from 'react';

/**
 * ÍCONES DE SERVIÇO
 * ==================
 * Set de ícones lineares usados no selo do card de serviço. São desenhados em
 * SVG inline (sem dependência externa) e usam `currentColor` — quem decide a
 * cor é o tema (`var(--slide-accent)`), nunca uma prop.
 */

export type ServiceIconName =
  | 'globe'
  | 'layout'
  | 'code'
  | 'workflow'
  | 'crm'
  | 'robot'
  | 'megaphone'
  | 'chart'
  | 'target'
  | 'brand'
  | 'content'
  | 'strategy'
  | 'audit'
  | 'price'
  | 'support';

const PATHS: Record<ServiceIconName, React.ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.7 2.6 15.3 0 18" />
      <path d="M12 3c-2.6 2.7-2.6 15.3 0 18" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M3 9h18M9 9v12" />
    </>
  ),
  code: (
    <>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
      <path d="M10 6.5h4a2 2 0 0 1 2 2v5.5M14 17.5h-4a2 2 0 0 1-2-2V10" />
    </>
  ),
  crm: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M9 4v16M15 4v16" />
      <circle cx="6" cy="9" r="1.1" />
      <circle cx="12" cy="13" r="1.1" />
      <circle cx="18" cy="8" r="1.1" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 4v4" />
      <circle cx="12" cy="3" r="1.2" />
      <circle cx="9" cy="14" r="1.2" />
      <circle cx="15" cy="14" r="1.2" />
      <path d="M2 12v3M22 12v3" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l7 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M16.5 9.2a4 4 0 0 1 0 5.6M19.5 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  content: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </>
  ),
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  audit: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M16 16l4 4" />
      <path d="M8 12v-2M11 12V8M14 12v-1" />
    </>
  ),
  price: (
    <>
      <path d="M3 11V4h7l10 10-7 7z" />
      <circle cx="7.5" cy="7.5" r="1.3" />
    </>
  ),
  support: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

export interface ServiceIconProps {
  /** Qual ícone do set. */
  name: ServiceIconName;
  /** Tamanho em px. */
  size?: number;
  /** Espessura do traço. */
  strokeWidth?: number;
  className?: string;
}

export function ServiceIcon({ name, size = 24, strokeWidth = 1.6, className = '' }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
