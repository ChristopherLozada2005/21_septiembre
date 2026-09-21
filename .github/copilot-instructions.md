# Copilot Instructions — Nuestro Jardín Amarillo

Estas instrucciones aplican a todo el repositorio. Copilot (chat o agente) debe leerlas
antes de generar o modificar código en este proyecto.

## 1. Qué es este proyecto

Una experiencia web de un solo uso (single-page, sin backend) que reemplaza un ramo de
flores amarillas. Cada flor del jardín, al interactuar, revela un significado, un mensaje
personal y una fotografía real de la pareja. Es un regalo, no un producto: prioriza la
emoción, el detalle y el cuidado por sobre la cantidad de features.

**Regla de oro:** ante la duda entre "una cosa más" y "pulir lo que ya existe", elegir
pulir. Cinco flores muy bien hechas > veinte flores genéricas.

## 2. Stack técnico (no te desvíes de esto)

- React + TypeScript + Vite
- Framer Motion para animaciones (no usar Three.js, no usar GSAP salvo que se pida)
- CSS plano o CSS Modules (no instalar Tailwind ni librerías de UI de terceros salvo que
  se solicite explícitamente)
- Lucide React solo para los 1-2 íconos utilitarios (cerrar, pausa de música)
- Persistencia: únicamente `localStorage`. No hay backend, no hay base de datos, no hay
  llamadas a APIs externas.
- Hosting: Vercel.

## 3. Estructura de carpetas esperada

```
src/
  components/
    Intro.tsx
    Garden.tsx
    Flower.tsx
    FlowerModal.tsx
    MemoryCard.tsx
    FinalMessage.tsx
    PlantFlower.tsx
  data/
    flowers.ts
  assets/
  App.tsx
  main.tsx
  index.css
public/
  photos/
  flowers/
```

No crear carpetas adicionales (`utils/`, `hooks/`, `store/`) a menos que una tarea
concreta lo justifique. Mantener el proyecto pequeño y legible.

## 4. Contenido y datos

- Todo el texto narrativo (significados, mensajes, nombres de flores) vive en
  `src/data/flowers.ts`, nunca hardcodeado dentro de componentes.
- Las fotografías van en `public/photos/` en formato `.webp`, nombradas de forma neutra
  (`photo-01.webp`, no nombres reales de personas).
- **Cómo agregar las fotos reales de forma segura (resumen; ver detalle completo y pasos
  exactos en `skills/06-deploy-and-privacy/SKILL.md`):**
  - Opción recomendada para hoy: desplegar directo con `vercel --prod` desde el build
    local, **sin conectar el proyecto a un repositorio de git**. Así las fotos nunca
    tocan GitHub.
  - Alternativa: si quieres control de versiones, crea el repositorio como **privado
    desde el inicio** (antes del primer commit con imágenes) y conecta Vercel a ese
    repo privado para los despliegues automáticos.
  - En ambos casos: quitar metadatos EXIF (ubicación, dispositivo) de las fotos antes de
    usarlas, y comprimir a `.webp`.
  - Importante: un repo privado protege el código/fotos en GitHub, pero **no hace
    privado el sitio publicado** (el link sigue siendo accesible para quien lo tenga).
    Para eso se usa `robots.txt` + meta `noindex` + una URL no adivinable (ya cubierto
    en la sección 9 y en la skill 06).

## 5. Diseño visual (tokens)

Usar estas variables CSS, no valores hardcodeados dispersos:

```css
--color-bg-cream: #FFF9E6;
--color-yellow-soft: #FDE68A;
--color-yellow-main: #FACC15;
--color-yellow-deep: #EAB308;
--color-leaf: #365314;
--color-earth: #713F12;
--color-text: #422006;
--color-white: #FFFFFF;

--font-heading: "Playfair Display", serif;
--font-body: "Inter", sans-serif;
```

Evitar: rojo/rosa intenso, glitter, cursivas decorativas excesivas, estética de plantilla
de San Valentín, más de una animación grande ocurriendo simultáneamente.

## 6. Animación

- Toda animación debe tener un propósito narrativo, nunca "animación por animación".
- Respetar siempre `prefers-reduced-motion`.
- Duraciones sugeridas: hover 150-250ms, apertura de modal 300-400ms, transiciones de
  foto 400-600ms.

## 7. Accesibilidad y interacción

- Todo lo que funciona con `hover` en desktop debe tener un equivalente funcional con
  `tap`/`click` en móvil.
- El modal de cada flor debe atrapar el foco, cerrarse con `Escape`, y devolver el foco
  al cerrarse.
- Las imágenes deben llevar `alt` descriptivo.
- Contraste de texto mínimo AA.

## 8. Rendimiento

- Imágenes en `.webp`, con tamaños responsivos (`srcset`).
- Precargar fuentes (Playfair Display, Inter) con `font-display: swap`.
- Música (si se implementa) nunca debe autoreproducirse antes de una interacción.

## 9. Privacidad y publicación

- La URL final no debe ser indexable: `<meta name="robots" content="noindex">` +
  `robots.txt` que bloquee todo.
- Preferir una URL no adivinable en vez de un nombre genérico predecible.
- El "og:image" para previsualización en WhatsApp debe ser una ilustración de flor, no
  una fotografía real de la pareja.
- Si se implementa "planta una flor", envolver `localStorage` en `try/catch`.

## 10. Convenciones de código

- Componentes en PascalCase, un componente por archivo.
- Props tipadas explícitamente con `interface`, no `any`.
- Commits en español, imperativo y breves.
- Correr `npm run build` antes de dar por cerrada una tarea.

## 11. Qué NO hacer

- No agregar backend, autenticación, analytics de terceros ni trackers.
- No agregar más de 5 flores principales.
- No usar contenido de relleno/lorem ipsum; usar `TODO: texto personal aquí` si falta.
- No optimizar prematuramente en un sitio de una sola página.
