import { motion, useReducedMotion } from 'framer-motion';

import { gardenContent } from '../data/flowers';

interface PlantFlowerProps {
  onPlant: () => void;
}

export function PlantFlower({ onPlant }: PlantFlowerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="plant-flower"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.35 }}
    >
      <motion.div
        className="plant-flower__badge"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌼
      </motion.div>
      <p>{gardenContent.plant.message}</p>
      <button type="button" onClick={onPlant}>
        {gardenContent.plant.action}
      </button>
    </motion.section>
  );
}
