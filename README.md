# Kit de Copilot — Nuestro Jardín Amarillo

Este paquete contiene el contenido listo para que un agente (GitHub Copilot en modo
agente, o cualquier asistente de código) construya el proyecto siguiendo tus ideas
del documento original, con calidad de producción y sin salirse de alcance.

## Cómo usarlo

1. Copia toda la carpeta `.github/` (incluyendo `copilot-instructions.md` y
   `skills/`) a la raíz de tu repositorio del proyecto `nuestro-jardin`.
2. `copilot-instructions.md` se aplica automáticamente como contexto de todo el
   repositorio en Copilot Chat/agente (VS Code y GitHub.com lo detectan solo).
3. Las carpetas dentro de `skills/` son tareas puntuales. Pídele al agente que las siga
   **en orden numérico** (00 a 06); cada una tiene objetivo, pasos y criterios de
   aceptación claros.

## Orden recomendado de trabajo

| # | Skill | Qué produce |
|---|-------|-------------|
| 00 | setup-and-conventions | Proyecto Vite+React+TS inicializado, tokens de diseño, fuentes |
| 01 | data-model-and-content | `flowers.ts` con las 5 flores y sus textos |
| 02 | garden-scene-and-flowers | `Garden.tsx` + `Flower.tsx` con posicionamiento orgánico |
| 03 | flower-modal-and-memories | `FlowerModal.tsx` + `MemoryCard.tsx` |
| 04 | motion-and-accessibility | Auditoría transversal de animaciones + accesibilidad |
| 05 | final-sequence-and-plant-flower | `PlantFlower.tsx` + `FinalMessage.tsx` + corazón final |
| 06 | deploy-and-privacy | **Cómo agregar las fotos reales de forma segura** (paso a paso) + checklist de publicación en Vercel |

## Nota sobre el tiempo

Como hoy es el día de entrega, si el tiempo aprieta, el orden de recorte sugerido es:
primero simplificar/quitar la música y la animación de corazón final (05), después
simplificar el "hint" de la flor escondida (02); nunca recortes 01 (contenido) ni 06
(privacidad de las fotos), son lo que hace que el regalo se sienta personal y seguro.
