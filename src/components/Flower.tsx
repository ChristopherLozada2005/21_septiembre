import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, KeyboardEvent } from 'react';

import type { Flower as FlowerType } from '../data/flowers';

interface FlowerProps {
  flower: FlowerType;
  isDiscovered: boolean;
  isHinted: boolean;
  style: CSSProperties;
  onSelect: (flower: FlowerType) => void;
}

export function Flower({ flower, isDiscovered, isHinted, style, onSelect }: FlowerProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(flower);
    }
  };

  return (
    <motion.button
      type="button"
      className={`flower ${isDiscovered ? 'flower--visible' : 'flower--hidden'} ${
        isHinted ? 'flower--hinted' : ''
      } ${
        flower.hidden ? 'flower--special' : ''
      }`}
      style={style}
      onClick={() => onSelect(flower)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={
        isDiscovered ? `Abrir flor ${flower.name}` : `Descubrir flor escondida ${flower.name}`
      }
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05, rotate: 3 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
    >
      <motion.span
        className="flower__plant"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: isDiscovered ? [0, -3, 3, 0] : [0, 1.5, -1.5, 0],
                y: [0, -4, 0],
              }
        }
        transition={{ duration: prefersReducedMotion ? 0 : 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="flower__stem" aria-hidden="true" />
        <span className="flower__leaf flower__leaf--left" aria-hidden="true" />
        <span className="flower__leaf flower__leaf--right" aria-hidden="true" />
        <span className="flower__emoji">{isDiscovered ? flower.emoji : '✦'}</span>
      </motion.span>
      <span className="flower__name">{isDiscovered ? flower.name : flower.hidden ? 'Nuestra flor' : 'Descubre'}</span>
    </motion.button>
  );
}
