import { useCallback, useEffect, useState } from 'react';

import './App.css';
import { FinalMessage } from './components/FinalMessage';
import { FlowerModal } from './components/FlowerModal';
import { Garden } from './components/Garden';
import { PlantFlower } from './components/PlantFlower';
import { flowers, type Flower } from './data/flowers';

const STORAGE_KEY = 'nuestro-jardin:hasPlantedFlower';

function App() {
  const [discoveredFlowers, setDiscoveredFlowers] = useState<Set<string>>(() => new Set());
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [hasPlantedFlower, setHasPlantedFlower] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.body.style.overflow = selectedFlower ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedFlower]);

  const handleFlowerSelect = (flower: Flower) => {
    setSelectedFlower(flower);
    setDiscoveredFlowers((current) => {
      const next = new Set(current);
      next.add(flower.id);
      return next;
    });
  };

  const handleModalClose = useCallback(() => {
    setSelectedFlower(null);
  }, []);

  const handlePlantFlower = () => {
    setHasPlantedFlower(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Intentionally ignore storage failures and continue the experience.
    }
  };

  const handleReset = () => {
    setDiscoveredFlowers(new Set());
    setSelectedFlower(null);
    setHasPlantedFlower(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures and keep the experience intact.
    }
  };

  const allFlowersDiscovered = discoveredFlowers.size === flowers.length;

  return (
    <main className="app-shell">
      {!hasPlantedFlower ? (
        <>
          <Garden
            flowers={flowers}
            discoveredFlowers={discoveredFlowers}
            onSelectFlower={handleFlowerSelect}
          />

          {allFlowersDiscovered && <PlantFlower onPlant={handlePlantFlower} />}
          <FlowerModal flower={selectedFlower} onClose={handleModalClose} />
        </>
      ) : (
        <FinalMessage onReset={handleReset} />
      )}
    </main>
  );
}

export default App;
