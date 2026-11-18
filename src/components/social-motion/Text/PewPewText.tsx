import React, { type CSSProperties, type ElementType } from 'react';

export interface PewPewTextProps {
  text: string;
  as?: ElementType;
  fontSize?: number;
  className?: string;
  style?: CSSProperties;
  start?: number;
  loop?: boolean;
  staggerMs?: number;
}

export function PewPewText({ text, as: Tag = 'p', fontSize, className = '', style, start = 0, loop = true, staggerMs }: PewPewTextProps) {
  const tokens = text.split(' ');
  let index = start;

  return (
    <Tag
      className={`fx-pewpew ${loop ? '' : 'fx-pewpew-once'} ${className}`.trim()}
      role="img"
      aria-label={text}
      style={{ fontSize, lineHeight: 1.05, ...(staggerMs === undefined ? {} : { '--fx-stagger': `${staggerMs / 1000}s` }), ...style } as CSSProperties}
    >
      {tokens.flatMap((word, wordIndex) => {
        const wordStart = index;
        const wordChars = Array.from(word);
        index += wordChars.length;
        if (wordIndex < tokens.length - 1) index += 1;

        const nodes = [
          <span key={`w-${wordIndex}`} className="inline-flex whitespace-nowrap">
            {wordChars.map((char, charIndex) => (
              <b key={`${wordStart}-${charIndex}`} aria-hidden="true" style={{ '--i': wordStart + charIndex } as CSSProperties}>
                {char}
              </b>
            ))}
          </span>,
        ];

        if (wordIndex < tokens.length - 1) {
          nodes.push(
            <span key={`s-${wordIndex}`} aria-hidden="true" className="inline-block" style={{ width: '.35em' }}>
              {'\u00A0'}
            </span>,
          );
        }

        return nodes;
      })}
    </Tag>
  );
}
