---
name: deploy-and-privacy
description: Usar esta skill al preparar el despliegue final en Vercel, incluyendo la URL, la vista previa del enlace (og:image), el noindex, y la revisión de que ninguna foto real quede expuesta en un repositorio público.
---

# Skill: Deploy y privacidad

## Objetivo
Publicar el sitio de forma que sea accesible solo por el enlace directo, sin quedar
indexado en buscadores, y sin exponer fotografías reales en un repositorio público de
GitHub.

## Cuándo usar esta skill
- Como último paso, cuando el resto de la experiencia (jardín, modal, secuencia final)
  ya está terminado y probado en local y en móvil.

## Checklist previa al deploy

1. **Repositorio**: si el repo es público, verificar que `public/photos/` con
   fotografías reales NO esté trackeado por git (agregar a `.gitignore` y subirlas solo
   como parte del build/deploy, o pasar el repositorio a privado antes de commitear).
2. **robots.txt** y meta `noindex` (definidos en `setup-and-conventions`) presentes en
   el build final.
3. **URL**: elegir un nombre de proyecto en Vercel no adivinable fácilmente (evitar
   `nuestro-jardin.vercel.app` si se quiere más privacidad; considerar un identificador
   corto no obvio).
4. **og:image**: configurar meta tags Open Graph con una ilustración de flor (no una
   foto real de la pareja), para que la previsualización en WhatsApp sea agradable sin
   filtrar contenido personal:
   ```html
   <meta property="og:title" content="Tengo algo para ti" />
   <meta property="og:description" content="Ábrelo cuando tengas unos minutos." />
   <meta property="og:image" content="/flowers/preview.webp" />
   ```
5. **Build**: correr `npm run build` y revisar el tamaño del bundle (las fotos deben
   estar optimizadas, no el bundle de JS/CSS).
6. **Prueba final en móvil real**: abrir el link desplegado desde un teléfono (no solo
   el emulador del navegador) y validar touch, audio y velocidad de carga en datos
   móviles.
7. **Mensaje de envío**: acompañar el link con un texto corto, sin explicar de qué se
   trata (mantener la sorpresa), por ejemplo: "Tengo algo para ti. Ábrelo cuando tengas
   unos minutos."

## Criterios de aceptación
- El sitio funciona igual en desktop y en un teléfono real, con buena velocidad de
  carga en 4G.
- El repositorio de GitHub (si es público) no contiene ninguna fotografía real de la
  pareja en su historial de commits.
- El link no aparece indexado en buscadores (verificable con `site:` en un buscador
  días después del deploy).
- La previsualización del link en WhatsApp muestra una imagen neutra, no una foto real.

## No hacer
- No dejar el repositorio público con fotos reales "por ahora, después lo hago
  privado": hacerlo antes del primer commit con imágenes.
- No agregar analíticas de terceros (Google Analytics, Meta Pixel, etc.) a un regalo
  personal.
