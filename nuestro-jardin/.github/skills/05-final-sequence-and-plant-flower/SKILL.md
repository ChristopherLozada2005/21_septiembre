---
name: final-sequence-and-plant-flower
description: Usar esta skill al implementar la mecánica de "planta una flor" (PlantFlower.tsx), el mensaje final (FinalMessage.tsx) y la animación de cierre donde las flores forman un corazón, incluyendo la persistencia en localStorage.
---

# Skill: Secuencia final y "planta una flor"

## Especificación funcional

### PlantFlower.tsx
- Habilitado solo cuando `discoveredFlowers.size === 5`.
- Al tap/click: nace una flor amarilla animada + mensaje "Esta flor la plantas tú."
- Guardar en `localStorage` (`nuestro-jardin:hasPlantedFlower`), envuelto en `try/catch`.
- Al cargar, leer esa clave para mostrar la flor ya plantada en visitas posteriores.

### FinalMessage.tsx
- Se activa tras plantar (o si ya estaba plantada).
- Las flores se reordenan formando un corazón (Framer Motion, coordenadas objetivo).
- Texto de cierre + botón "Volver a recorrer nuestro jardín".

## Criterios de aceptación
- La zona para plantar solo aparece tras descubrir las 5 flores.
- Recargar conserva el estado de "ya plantó su flor".
- Si `localStorage` falla, la experiencia sigue funcionando sin persistencia.

## No hacer
- No usar backend para guardar el estado.
- No bloquear el mensaje final si `localStorage` no está disponible.
