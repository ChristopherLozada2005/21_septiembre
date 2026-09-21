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
  `src/data/flowers.ts`, nunca hardcodeado dentro de componentes. Esto permite editar la
  historia sin tocar lógica.
- Las fotografías van en `public/photos/` en formato `.webp`, nombradas de forma neutra
  (`photo-01.webp`, no nombres reales de personas).
- **Nunca** subir fotografías reales a un repositorio público de GitHub. Si el repo no es
  privado, las fotos deben agregarse solo en el entorno de build/deploy local (carpeta
  ignorada por git) o el repositorio debe configurarse como privado antes de commitear
  cualquier imagen real.
- Quitar metadatos EXIF (ubicación, dispositivo) de las fotos antes de usarlas.

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

- Toda animación debe tener un propósito narrativo (guiar atención, revelar contenido),
  nunca "animación por animación".
- Respetar siempre `prefers-reduced-motion`: cuando esté activo, reemplazar
  transiciones de movimiento por simples fades cortos (150-200ms) y desactivar el
  balanceo continuo de las flores.
- Duraciones sugeridas: hover 150-250ms, apertura de modal 300-400ms, transiciones de
  foto 400-600ms.

## 7. Accesibilidad y interacción

- Todo lo que funciona con `hover` en desktop debe tener un equivalente funcional con
  `tap`/`click` en móvil. No depender de hover para revelar contenido crítico.
- El modal de cada flor debe:
  - atrapar el foco (focus trap) mientras está abierto,
  - cerrarse con `Escape` y con el botón/gesto de "volver" en móvil,
  - devolver el foco al elemento que lo abrió al cerrarse.
- Las imágenes deben llevar `alt` descriptivo (no vacío), aunque el contenido sea
  personal ("Fotografía de un recuerdo compartido").
- Contraste de texto sobre fondo crema/amarillo debe cumplir mínimo AA (verificar con
  el texto `--color-text` sobre `--color-bg-cream`, que ya cumple).

## 8. Rendimiento

- Imágenes en `.webp`, con tamaños responsivos (`srcset`) para que cargue rápido en 4G.
- Precargar (`font-display: swap` + preload) las fuentes Playfair Display e Inter para
  evitar parpadeo de texto.
- Música (si se implementa) debe cargarse de forma diferida y nunca autoreproducirse
  antes de una interacción explícita del usuario (política de navegadores + respeto a
  su contexto: puede estar sin audífonos).

## 9. Privacidad y publicación

- La URL final no debe ser indexable: agregar `<meta name="robots" content="noindex">`
  y un `robots.txt` que bloquee todo.
- Preferir una URL no adivinable en vez de un nombre genérico predecible.
- El "og:image" para previsualización en WhatsApp debe ser una ilustración de flor, no
  una fotografía real de la pareja.
- Si se implementa la mecánica "planta una flor", envolver el acceso a `localStorage`
  en `try/catch`: algunos navegadores (Safari en modo privado) pueden bloquearlo; si
  falla, la experiencia debe seguir funcionando sin persistencia.

## 10. Convenciones de código

- Componentes en PascalCase, un componente por archivo, exportación por defecto.
- Props tipadas explícitamente con `interface`, no `any`.
- Commits en español, en imperativo y breves: `agrega modal de flor`, `ajusta paleta de colores`.
- Antes de dar por cerrada una tarea, correr `npm run build` y confirmar que no hay
  errores de TypeScript.

## 11. Qué NO hacer

- No agregar backend, autenticación, analytics de terceros ni trackers.
- No agregar más de 5 flores principales (la sexta interacción es "plantar una flor",
  no una flor de contenido nuevo).
- No usar contenido de relleno/lorem ipsum en el mensaje final ni en los significados:
  si falta un texto real, dejar un placeholder visible como `TODO: texto personal aquí`
  para que quede claro que debe completarse antes de publicar.
- No optimizar prematuramente (lazy loading complejo, code-splitting agresivo) en un
  sitio de una sola página con 5-6 pantallas.
