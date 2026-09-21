---
name: garden-scene-and-flowers
description: Usar esta skill al construir la pantalla principal del jardín (Garden.tsx) y el componente individual de cada flor (Flower.tsx), incluyendo su posicionamiento libre, animación de balanceo y el contador de flores descubiertas.
---

# Skill: Escena del jardín y componente Flower

## Objetivo
Construir una escena que se sienta como un jardín, no como una grilla de tarjetas, con
flores posicionadas de forma orgánica y un contador de progreso.

## Cuándo usar esta skill
- Después de tener el modelo de datos (`data-model-and-content`) listo.
- Al implementar `Garden.tsx` y `Flower.tsx`.

## Especificación funcional

### Garden.tsx
- Renderiza las 5 flores de `flowers.ts` en posiciones no alineadas en grilla (usar
  posiciones absolutas o flexbox con offsets distintos por flor, no `grid` uniforme).
- La quinta flor ("Nuestra flor") debe estar visualmente más discreta/pequeña o algo
  más alejada del centro, para incentivar la exploración — sin llegar a ser imposible
  de encontrar en móvil (tap target mínimo de 44x44px).
- Muestra el contador: `X / 5 flores descubiertas`, actualizado en estado local
  (`discoveredFlowers: Set<string>` o array de ids).
- Si pasan ~12-15 segundos sin que se descubra la quinta flor, aplicar un leve brillo o
  aumento de escala sutil (no un letrero ni tooltip) para guiarla sin romper la magia.

### Flower.tsx
- Recibe `flower: Flower` y `onSelect: (id: string) => void`.
- Hover (desktop): `scale(1.05)`, rotación aleatoria leve (2-6deg), muestra el nombre.
- Balanceo continuo sutil vía Framer Motion (`animate` con `repeat: Infinity`,
  `repeatType: "mirror"`), duración 3-5s, ease `easeInOut`.
- En `prefers-reduced-motion: reduce`, desactivar el balanceo continuo y el hover-scale
  agresivo; dejar solo un cambio de opacidad al enfocar.
- Debe ser accesible por teclado: `tabIndex=0`, `role="button"`, `onKeyDown` para
  `Enter`/`Space`.

## Criterios de aceptación
- Las 5 flores se ven distribuidas de forma orgánica, no en grilla.
- El contador refleja correctamente cuántas flores únicas se han abierto.
- Funciona igual de bien con mouse (hover + click) y con touch (tap directo).
- Con `prefers-reduced-motion` activo, no hay balanceo continuo.

## No hacer
- No usar `Three.js` ni WebGL para el fondo o las flores.
- No hacer que el contador dependa de abrir la MISMA flor varias veces (usar `Set`, no
  contador incremental simple).
