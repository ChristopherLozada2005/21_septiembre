---
name: motion-and-accessibility
description: Usar esta skill al revisar o afinar cualquier animación del proyecto para asegurar que respete prefers-reduced-motion, tenga propósito narrativo y funcione en móvil sin depender de hover.
---

# Skill: Motion design y accesibilidad transversal

## Checklist de auditoría
1. Propósito: ¿ayuda a entender qué pasó o a dónde mirar?
2. `prefers-reduced-motion`: usar `useReducedMotion()` de framer-motion, variantes de
   fade corto cuando sea `true`.
3. Sin dependencia de hover: todo debe funcionar con `onClick`/`onTouchStart`.
4. Nunca más de una animación "grande" simultánea.
5. Animar solo `transform` y `opacity`.
6. Duraciones: hover 150-250ms; modal 300-400ms; fotos 400-600ms; final 2-4s (saltable).

## Criterios de aceptación
- "Reducir movimiento" del sistema elimina balanceo y pétalos sin romper funcionalidad.
- Todo probado con touch responde igual.

## No hacer
- No agregar librerías de animación adicionales.
- No usar autoplay de audio/video sin interacción previa.
