---
name: flower-modal-and-memories
description: Usar esta skill al construir el modal que se abre al hacer click/tap en una flor (FlowerModal.tsx) y la tarjeta de recuerdo con la fotografía (MemoryCard.tsx), incluyendo la secuencia de revelado de significado, mensaje y foto.
---

# Skill: Modal de flor y tarjeta de recuerdo

## Objetivo
Que cada flor, al abrirse, cuente su historia en una secuencia clara: significado ->
mensaje personal -> fotografía -> frase de cierre, sin sentirse como un formulario.

## Cuándo usar esta skill
- Después de tener `Garden.tsx`/`Flower.tsx` funcionando y emitiendo `onSelect`.

## Especificación funcional

### FlowerModal.tsx
- Se abre cuando `selectedFlower` no es `null` en el estado de `App.tsx`.
- Al abrir: el fondo se oscurece (overlay `rgba(0,0,0,0.4)` aprox.), el resto del
  jardín reduce protagonismo (blur leve u opacidad reducida, no lo saques del DOM).
- Contenido en este orden: nombre de la flor -> significado general -> mensaje
  personal -> botón "Ver nuestro recuerdo" -> `MemoryCard` (fotografía + frase).
- Cierre: botón visible, tecla `Escape`, click fuera del modal, y gesto de "volver"
  en móvil. Al cerrar, marcar la flor como descubierta si no lo estaba.
- Debe atrapar el foco mientras está abierto (focus trap) y devolverlo al elemento
  disparador al cerrar.

### MemoryCard.tsx
- Recibe `image` y `memory` (la frase corta).
- Transición de entrada: `opacity: 0 -> 1` + `translateY(20px) -> 0`, 400-600ms.
- La imagen debe tener `alt` descriptivo y cargarse en formato `.webp` con ancho
  máximo adecuado a modal (evitar servir la imagen a resolución completa de cámara).

## Criterios de aceptación
- El flujo significado -> mensaje -> botón -> foto -> frase se respeta en las 5 flores.
- El modal es completamente operable con teclado y con tap en móvil.
- Cerrar y reabrir una flor ya descubierta no duplica su conteo en el contador.
- No hay scroll bloqueado permanentemente en `body` si el usuario cierra el modal.

## No hacer
- No mostrar la fotografía antes del mensaje personal (rompe el ritmo narrativo
  diseñado: texto primero, recuerdo visual después, como recompensa).
- No usar un modal genérico de librería de UI de terceros; construirlo a medida para
  mantener control total del diseño y las transiciones.
