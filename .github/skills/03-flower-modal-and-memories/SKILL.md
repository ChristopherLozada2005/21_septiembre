---
name: flower-modal-and-memories
description: Usar esta skill al construir el modal que se abre al hacer click/tap en una flor (FlowerModal.tsx) y la tarjeta de recuerdo con la fotografía (MemoryCard.tsx).
---

# Skill: Modal de flor y tarjeta de recuerdo

## Objetivo
Que cada flor cuente su historia en secuencia: significado -> mensaje -> foto -> cierre.

## Especificación funcional

### FlowerModal.tsx
- Se abre cuando `selectedFlower` no es `null`.
- Fondo oscurecido, resto del jardín pierde protagonismo (blur/opacidad).
- Orden: nombre -> significado -> mensaje -> botón "Ver nuestro recuerdo" -> MemoryCard.
- Cierre: botón, `Escape`, click fuera, gesto "volver" en móvil.
- Focus trap; devuelve el foco al cerrar.

### MemoryCard.tsx
- Recibe `image` y `memory`.
- Transición: `opacity 0->1` + `translateY(20px)->0`, 400-600ms.
- `alt` descriptivo, `.webp`, ancho ajustado al modal.

## Criterios de aceptación
- El flujo se respeta en las 5 flores.
- Modal operable con teclado y tap.
- Reabrir flor ya descubierta no duplica el conteo.

## No hacer
- No mostrar la foto antes del mensaje personal.
- No usar modal de librería de terceros.
