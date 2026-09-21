import { motion, useReducedMotion } from 'framer-motion';

import { gardenContent } from '../data/flowers';

interface FinalMessageProps {
  onReset: () => void;
}

const heartPositions = [
  { x: 0, y: 0 },
  { x: 18, y: -24 },
  { x: -18, y: -24 },
  { x: 36, y: 6 },
  { x: -36, y: 6 },
];

export function FinalMessage({ onReset }: FinalMessageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="final-message"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
    >
      <div className="final-message__heart" aria-label="Corazón formado por flores">
        {heartPositions.map((position, index) => (
          <motion.div
            key={index}
            className="final-message__flower"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, x: 0, y: 26 }}
            animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: prefersReducedMotion ? 0 : index * 0.08 }}
          >
            🌼
          </motion.div>
        ))}
      </div>

      <h2>{gardenContent.final.title}</h2>
      <p>{gardenContent.final.message}</p>
      <button type="button" onClick={onReset}>
        {gardenContent.final.action}
      </button>
    </motion.section>
  );
}
