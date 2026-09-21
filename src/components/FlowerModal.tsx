import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { Flower } from '../data/flowers';
import { MemoryCard } from './MemoryCard';

interface FlowerModalProps {
  flower: Flower | null;
  onClose: () => void;
}

export function FlowerModal({ flower, onClose }: FlowerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const historyEntryRef = useRef(false);
  const [memoryFlowerId, setMemoryFlowerId] = useState<string | null>(null);
  const showMemory = memoryFlowerId === flower?.id;

  const handleClose = useCallback(() => {
    if (historyEntryRef.current) {
      historyEntryRef.current = false;
      window.history.back();
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!flower) {
      previouslyFocusedRef.current?.focus();
      previouslyFocusedRef.current = null;
      return;
    }

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    if (!historyEntryRef.current) {
      window.history.pushState({ flowerModal: true }, '', window.location.href);
      historyEntryRef.current = true;
    }
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handlePopState = () => {
      historyEntryRef.current = false;
      onClose();
    };

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !modalRef.current) {
        return;
      }

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('keydown', handleFocusTrap);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('keydown', handleFocusTrap);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [flower, handleClose, onClose]);

  return (
    <AnimatePresence>
      {flower && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            ref={modalRef}
            className="flower-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle de ${flower.name}`}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="flower-modal__close"
              onClick={handleClose}
              aria-label="Cerrar flor"
            >
              ×
            </button>

            <p className="eyebrow eyebrow--dark">{flower.name}</p>
            <h2>{flower.name}</h2>

            <div className="flower-modal__block">
              <h3>Significado</h3>
              <p>{flower.meaning}</p>
            </div>

            <div className="flower-modal__block">
              <h3>Mensaje</h3>
              <p>{flower.message}</p>
            </div>

            <button
              type="button"
              className="flower-modal__toggle"
              onClick={() => setMemoryFlowerId(showMemory ? null : flower.id)}
            >
              {showMemory ? 'Ocultar recuerdo' : 'Ver nuestro recuerdo'}
            </button>

            {showMemory && (
              <MemoryCard image={flower.image} memory={flower.memory} flowerName={flower.name} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
