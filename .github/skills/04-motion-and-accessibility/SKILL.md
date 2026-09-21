---
name: motion-and-accessibility
description: Usar esta skill al revisar o afinar cualquier animación del proyecto (pétalos, balanceo, transiciones de modal, secuencia final) para asegurar que respete prefers-reduced-motion, tenga propósito narrativo y funcione en móvil sin depender de hover.
---

# Skill: Motion design y accesibilidad transversal

## Objetivo
Auditar y ajustar todas las animaciones del sitio para que cumplan tres reglas: tienen
propósito narrativo, respetan preferencias de movimiento reducido, y funcionan igual en
touch que en mouse.

## Cuándo usar esta skill
- Como paso de revisión transversal, después de construir Intro, Garden, FlowerModal y
  antes de la secuencia final.
- Cada vez que se agregue una animación nueva.

## Checklist de auditoría

1. **Propósito**: ¿esta animación ayuda a entender qué pasó o a dónde mirar? Si la
   respuesta es "solo se ve bonita", simplificarla o quitarla.
2. **prefers-reduced-motion**: envolver animaciones de movimiento continuo (pétalos
   flotando, balanceo de flores, crecimiento de flores en la secuencia final) con:
   ```ts
   const shouldReduceMotion = useReducedMotion(); // de framer-motion
   ```
   y usar variantes reducidas (fade corto) cuando sea `true`.
3. **Sin dependencia de hover**: cualquier revelado de contenido debe dispararse también
   con `onClick`/`onTouchStart`. Verificar en un dispositivo o emulador táctil.
4. **Simultaneidad**: nunca más de una animación "grande" (crecimiento, formación de
   corazón, transición de pantalla completa) corriendo al mismo tiempo que otra.
5. **Rendimiento**: animar solo `transform` y `opacity` (evitar animar `width`,
   `top/left`, `box-shadow` en loops largos) para no generar jank en gama media/baja.
6. **Duraciones**: hover 150-250ms; apertura de modal 300-400ms; fotografías 400-600ms;
   secuencia final puede ser más larga (2-4s) pero debe poder saltarse con un tap.

## Criterios de aceptación
- Activar "reducir movimiento" en el sistema operativo elimina el balanceo continuo y
  las animaciones de pétalos, sin romper la funcionalidad.
- Todas las interacciones probadas con touch (no solo mouse) responden igual.
- Ninguna animación bloquea la posibilidad de cerrar el modal o avanzar.

## No hacer
- No agregar librerías de animación adicionales a Framer Motion.
- No usar `autoplay` de audio o video sin interacción previa del usuario.
