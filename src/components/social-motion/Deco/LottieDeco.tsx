import React, { useEffect, useRef, type CSSProperties } from 'react';

/**
 * LOTTIE DECO (Social Studio)
 * ===========================
 * Wrapper fino sobre lottie-web para animações vindas do designer
 * (LottieFiles/After Effects exportado em .json). O lottie-web é
 * **import dinâmico** — vira chunk separado e só baixa/instala se o
 * consumidor usar este componente (peer opcional, não entra no bundle
 * de quem não usa).
 *
 * Contrato do DS (ADR-005): `settled` = último frame parado
 * (`goToAndStop(totalFrames - 1)`), ou seja, o frame que aparece na
 * tela estática. Cor/forma vêm do próprio .json (dado do designer),
 * não de prop de cor. Sem lottie-web instalado, renderiza vazio sem quebrar.
 */
export interface LottieDecoProps {
  /** URL pública do .json (LottieFiles). */
  src?: string;
  /** animationData inline (objeto do .json). */
  data?: Record<string, unknown>;
  /** Liga o play automático (quando não settled). Padrão true. */
  autoplay?: boolean;
  loop?: boolean;
  /** Frame final parado — deve casar com a tela estática. */
  settled?: boolean;
  /** Atraso antes de tocar/mostrar, em ms. Padrão 0. */
  delayMs?: number;
  className?: string;
  style?: CSSProperties;
}

export function LottieDeco({
  src,
  data,
  autoplay = true,
  loop = true,
  settled = false,
  delayMs = 0,
  className = '',
  style,
}: LottieDecoProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || (!src && !data)) return;
    let anim: { destroy: () => void; play: () => void; goToAndStop: (f: number, b: boolean) => void; totalFrames: number } | undefined;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    // Import dinâmico com specifier literal: o Vite separa em chunk próprio
    // (quem não usa LottieDeco não paga o lottie-web) e no build:lib fica
    // externalizado (peer opcional). Tipos via @types/lottie-web (devDep).
    import('lottie-web')
      .then((mod) => {
        if (cancelled || !ref.current) return;
        // lottie-web empacota os próprios tipos, mas a forma canônica do
        // default export varia entre builds — normaliza aqui.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lottie: any = (mod as any).default ?? mod;
        anim = lottie.loadAnimation({
          container: ref.current,
          renderer: 'svg',
          loop,
          autoplay: false,
          animationData: data,
          path: src,
        });
        const start = () => {
          if (!anim) return;
          if (settled) anim.goToAndStop(Math.max(0, anim.totalFrames - 1), true);
          else if (autoplay) anim.play();
        };
        if (delayMs > 0) timer = setTimeout(start, delayMs);
        else start();
      })
      .catch(() => {
        /* lottie-web não instalado: não quebra o resto da cena */
      });
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      anim?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, JSON.stringify(data), autoplay, loop, settled, delayMs]);

  return <div ref={ref} className={`fx-lottie${className ? ` ${className}` : ''}`} style={style} aria-hidden="true" />;
}
