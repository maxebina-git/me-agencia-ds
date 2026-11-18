import React, { type CSSProperties } from 'react';
import { ServiceIcon, type ServiceIconName } from './ServiceIcon';
import { ServiceArt, type ServiceDevice } from './ServiceArt';

/**
 * CARD DE SERVIÇO (Social Studio)
 * ===============================
 * Um serviço representado como card de Instagram, com as 3 camadas da
 * "Direção D" que aprovamos:
 *
 *   1. selo  — círculo com o ícone do serviço (topo direito);
 *   2. flat  — ilustração plana atrás, com bleed (fundo, opaca);
 *   3. mock  — envelope de dispositivo na frente (foco), no lugar onde
 *              depois entra a foto real no app social.
 *
 * Embaixo: título + frase sobre um scrim (degradê para o fundo do tema).
 *
 * Contrato do DS: a largura máxima vem do aspect (4:5 = 340×425, 9:16 =
 * 340×604, mesmo slide do `.instagram-slide`) e o card encolhe
 * proporcionalmente (`aspect-ratio`) se a célula do consumidor for menor —
 * nunca transborda nem corta texto. Cor vem do tema (`--slide-*`) e o
 * estado assentado (`settled`) é o frame final — o mesmo que a tela
 * estática do app social mostra.
 */

export type ServiceCardAspect = '4:5' | '9:16';

export const SOCIAL_SERVICE_CARD_SIZES: Record<ServiceCardAspect, { width: number; height: number }> = {
  '4:5': { width: 340, height: 425 },
  '9:16': { width: 340, height: 604 },
};

export interface SocialServiceCardProps {
  /** Título do serviço (ex.: "Sites Institucionais"). */
  title: string;
  /** Frase curta de venda (ex.: "Sua casa digital própria, no ar em dias."). */
  phrase: string;
  /** Ícone do selo e das artes. */
  icon: ServiceIconName;
  /** Dispositivo do mock. Padrão 'browser'. */
  device?: ServiceDevice;
  /** Formato do slide: '4:5' (feed) ou '9:16' (reels). Padrão '4:5'. */
  aspect?: ServiceCardAspect;
  /** Mostra a safe zone por cima do card (demo no DS). */
  showSafeZone?: boolean;
  /** Estado assentado: card no frame final, sem animação de entrada. */
  settled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function SocialServiceCard({
  title,
  phrase,
  icon,
  device = 'browser',
  aspect = '4:5',
  showSafeZone = false,
  settled = false,
  className = '',
  style,
}: SocialServiceCardProps) {
  const size = SOCIAL_SERVICE_CARD_SIZES[aspect];
  const is916 = aspect === '9:16';

  return (
    <div
      className={`ssvc ssvc--${aspect.replace(':', '-')} ${settled ? 'is-settled' : ''} ${className}`.trim()}
      style={{
        // Largura máxima é o tamanho do aspect; encolhe proporcionalmente
        // (aspect-ratio) se a célula do consumidor for menor — nunca transborda.
        width: '100%',
        maxWidth: size.width,
        aspectRatio: `${size.width} / ${size.height}`,
        ...style,
      }}
      role="img"
      aria-label={`${title} — ${phrase}`}
    >
      {/* camada de fundo: ilustração plana com bleed */}
      <ServiceArt variant="flat" icon={icon} className="ssvc__flat" />

      {/* camada de foco: mock do dispositivo (foto real entra aqui depois) */}
      <ServiceArt variant="mock" icon={icon} device={device} className="ssvc__mock" />

      {/* selo: ícone do serviço */}
      <div className="ssvc__seal">
        <ServiceIcon name={icon} size={22} strokeWidth={1.8} />
      </div>

      {/* título + frase */}
      <div className="ssvc__foot">
        <h3 className="ssvc__title">{title}</h3>
        <p className="ssvc__phrase">{phrase}</p>
      </div>

      {/* safe zone (demo) */}
      {showSafeZone && (
        <div className={`safe-zone-overlay ${is916 ? 'safe-zone-overlay--916' : ''}`} aria-hidden="true">
          <span className="safe-zone-label">Safe Zone</span>
        </div>
      )}
    </div>
  );
}
