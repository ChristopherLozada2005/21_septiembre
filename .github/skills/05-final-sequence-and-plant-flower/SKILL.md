---
name: final-sequence-and-plant-flower
description: Usar esta skill al implementar la mecánica de "planta una flor" (PlantFlower.tsx), el mensaje final (FinalMessage.tsx) y la animación de cierre donde las flores forman un corazón, incluyendo la persistencia en localStorage.
---

# Skill: Secuencia final y "planta una flor"

## Objetivo
Cerrar la experiencia con una acción participativa (ella planta una flor) y un mensaje
final emocional, persistiendo el estado localmente para que, si vuelve a abrir el
enlace en el mismo dispositivo, encuentre su flor ya plantada.

## Cuándo usar esta skill
- Después de que las 5 flores y su modal funcionan correctamente.
- Es el último bloque funcional antes de pasar a `deploy-and-privacy`.

## Especificación funcional

### PlantFlower.tsx
- Se habilita solo cuando `discoveredFlowers.size === 5`.
- Muestra una zona vacía del jardín con el texto "Ahora planta una flor."
- Al hacer tap/click en esa zona: nace una nueva flor amarilla animada (crecimiento
  desde escala 0 a 1, easing suave) y aparece el mensaje "Esta flor la plantas tú."
- Guardar el estado en `localStorage` bajo una clave clara, por ejemplo
  `nuestro-jardin:hasPlantedFlower`, envuelto en `try/catch`:
  ```ts
  try {
    localStorage.setItem("nuestro-jardin:hasPlantedFlower", "true");
  } catch {
    // continuar sin persistencia si el navegador lo bloquea
  }
  ```
- Al cargar la app, leer esa clave para decidir si mostrar la flor ya plantada de
  entrada (para una segunda visita) en vez de pedir plantarla de nuevo.

### FinalMessage.tsx
- Se activa tras plantar la flor (o inmediatamente si ya estaba plantada en una
  visita anterior).
- Todas las flores reaparecen y, mediante Framer Motion, se reordenan hasta formar la
  silueta de un corazón (usar un set de coordenadas objetivo por flor, animando
  `x`/`y` con `transition: { duration, ease }`).
- Mostrar el texto de cierre ya definido en el documento base, terminando en
  "Feliz 21 de septiembre, mi señorita." y el botón "Volver a recorrer nuestro jardín".
- El botón de reinicio debe volver a `Garden.tsx` sin perder el estado de
  `hasPlantedFlower` (ella no debería tener que "replantar" cada vez).

## Criterios de aceptación
- La zona para plantar solo aparece tras descubrir las 5 flores.
- Recargar la página en el mismo navegador conserva que ya plantó su flor.
- Si `localStorage` falla (modo privado, cuotas), la experiencia sigue funcionando,
  simplemente sin recordar el estado en la siguiente visita.
- La animación del corazón puede saltarse/acelerarse con un tap, no es obligatorio
  esperarla completa.

## No hacer
- No usar backend ni servicios externos para guardar el estado de "planta una flor".
- No bloquear el mensaje final si `localStorage` no está disponible.
