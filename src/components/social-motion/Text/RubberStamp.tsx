import React, { type CSSProperties, type ElementType, type ReactNode } from 'react';

export interface RubberStampProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delayMs?: number;
  durationMs?: number;
  /** Estado assentado: mostra o carimbo já no lugar, sem animação. */
  settled?: boolean;
}

export function RubberStamp({ children, as: Tag = 'span', className = '', style, delayMs = 0, durationMs = 650, settled = false }: RubberStampProps) {
  return (
    <Tag
      className={`fx-rubber-stamp-once ${settled ? 'fx-rubber-stamp-settled' : ''} ${className}`.trim()}
      style={
        {
          animationDelay: `${delayMs}ms`,
          animationDuration: `${durationMs}ms`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
