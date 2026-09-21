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
  { top: '18%', left: '12%' },
  { top: '24%', left: '52%' },
  { top: '52%', left: '20%' },
  { top: '56%', left: '63%' },
  { top: '74%', left: '42%' },
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
