import { motion, useReducedMotion } from 'framer-motion';

interface MemoryCardProps {
  image: string;
  memory: string;
  flowerName: string;
}

export function MemoryCard({ image, memory, flowerName }: MemoryCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.figure
      className="memory-card"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: 'easeOut' }}
    >
      <img
        className="memory-card__image"
        src={image}
        sizes="(max-width: 640px) 100vw, 560px"
        alt={`Recuerdo de la flor ${flowerName}`}
      />
      <figcaption className="memory-card__caption">{memory}</figcaption>
    </motion.figure>
  );
}
