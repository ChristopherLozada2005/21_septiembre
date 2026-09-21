import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import type { Flower as FlowerType } from '../data/flowers';
import { gardenContent } from '../data/flowers';
import { Flower } from './Flower';
import { Intro } from './Intro';

interface GardenProps {
  flowers: FlowerType[];
  discoveredFlowers: Set<string>;
  onSelectFlower: (flower: FlowerType) => void;
}

const positions = [
  { bottom: '5%', left: '8%' },
  { bottom: '10%', left: '31%' },
  { bottom: '4%', left: '55%' },
  { bottom: '8%', left: '74%' },
  { bottom: '3%', left: '43%' },
];

export function Garden({ flowers, discoveredFlowers, onSelectFlower }: GardenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hintShownFor, setHintShownFor] = useState<string | null>(null);
  const discoveredCount = discoveredFlowers.size;
  const hiddenFlower = flowers.find((flower) => flower.hidden);
  const hiddenFlowerDiscovered = Boolean(hiddenFlower && discoveredFlowers.has(hiddenFlower.id));
  const hintKey = `${hiddenFlower?.id ?? ''}:${hiddenFlowerDiscovered}`;
  const showHint = hintShownFor === hintKey && !hiddenFlowerDiscovered;

  useEffect(() => {
    if (!hiddenFlower || hiddenFlowerDiscovered) {
      return;
    }

    const hintTimer = window.setTimeout(() => setHintShownFor(hintKey), 13000);
    return () => window.clearTimeout(hintTimer);
  }, [hiddenFlower, hiddenFlowerDiscovered, hintKey]);

  return (
    <section className="garden" aria-label="Jardín de flores">
      <Intro />

      <div className="garden__count" aria-live="polite">
        {discoveredCount} / {flowers.length} flores descubiertas
      </div>

      <div className="garden__scene">
        <div className="garden__sun" aria-hidden="true" />
        <div className="garden__horizon" aria-hidden="true" />
        <div className="garden__foliage garden__foliage--back" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="garden__flowers">
        {flowers.map((flower, index) => (
          <Flower
            key={flower.id}
            flower={flower}
            isDiscovered={discoveredFlowers.has(flower.id)}
            isHinted={showHint && flower.id === hiddenFlower?.id}
            style={positions[index]}
            onSelect={onSelectFlower}
          />
        ))}
        </div>
        <div className="garden__foliage garden__foliage--front" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      {showHint && <p className="garden__hint">{gardenContent.hint}</p>}

      <motion.div
        className="garden__ground"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
      />
    </section>
  );
}
