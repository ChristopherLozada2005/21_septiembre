---
name: garden-scene-and-flowers
description: Usar esta skill al construir la pantalla principal del jardín (Garden.tsx) y el componente individual de cada flor (Flower.tsx), incluyendo su posicionamiento libre, animación de balanceo y el contador de flores descubiertas.
---

# Skill: Escena del jardín y componente Flower

## Objetivo
Construir una escena que se sienta como un jardín, no como una grilla de tarjetas.

## Especificación funcional

### Garden.tsx
- Renderiza las 5 flores en posiciones no alineadas en grilla.
- La quinta flor ("Nuestra flor") más discreta, sin dejar de ser tocable (44x44px mín).
- Contador: `X / 5 flores descubiertas` con `Set<string>`.
- Si pasan ~12-15s sin encontrar la 5ta, aplicar un leve brillo/escala sutil.

### Flower.tsx
- Hover: `scale(1.05)`, rotación leve, muestra nombre.
- Balanceo continuo sutil (Framer Motion, `repeat: Infinity`, 3-5s).
- Con `prefers-reduced-motion`, desactivar balanceo y hover agresivo.
- Accesible por teclado: `tabIndex=0`, `role="button"`, `onKeyDown`.

## Criterios de aceptación
- Las 5 flores se ven distribuidas de forma orgánica.
- El contador refleja flores únicas abiertas.
- Funciona igual con mouse y con touch.

## No hacer
- No usar Three.js/WebGL.
- No hacer que el contador dependa de reabrir la misma flor.
