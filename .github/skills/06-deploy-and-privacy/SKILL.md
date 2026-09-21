---
name: deploy-and-privacy
description: Usar esta skill al preparar el despliegue final en Vercel y, específicamente, al agregar las fotografías reales al proyecto de forma segura, incluyendo la URL, la vista previa del enlace (og:image), el noindex, y la revisión de que ninguna foto real quede expuesta en un repositorio público.
---

# Skill: Deploy y privacidad

## Objetivo
Publicar el sitio de forma que sea accesible solo por el enlace directo, sin quedar
indexado en buscadores, y sin exponer fotografías reales en un repositorio público de
GitHub.

## Cómo agregar las fotos reales de forma segura (paso a paso)

Hay dos formas seguras de hacerlo. Elige una según si necesitas o no control de
versiones con git.

### Opción A — Recomendada para hoy (sin git, más rápida)

Despliega directo desde tu carpeta local a Vercel, sin conectar nunca el proyecto a un
repositorio de GitHub. Las fotos nunca quedan en un historial de git ni en ningún lugar
público más que el propio sitio desplegado.

```bash
npm install -g vercel
# dentro de la carpeta del proyecto, con las fotos ya en public/photos/
vercel login
vercel --prod
```

- Esto sube tu build local (incluidas las fotos) directo al hosting de Vercel.
- Nadie puede ver las fotos "navegando" el proyecto en GitHub, porque no existe ese
  repositorio.
- El sitio publicado sigue siendo accesible por cualquiera que tenga el link (no hay
  autenticación), así que igual aplican `robots.txt` + `noindex` + URL no adivinable
  (ver más abajo).

### Opción B — Si quieres guardar el proyecto en GitHub con control de versiones

1. Crea el repositorio en GitHub como **Privado** desde el momento de creación (no
   lo dejes público "por ahora, después lo cambio").
2. Recién ahí agrega las fotos a `public/photos/` y haz commit.
3. Conecta ese repositorio privado a Vercel para despliegues automáticos en cada push.
4. Si en algún momento decides hacer el repo público (por ejemplo, para compartir el
   código como portafolio), primero debes eliminar las fotos del **historial completo**
   de git (no basta con borrarlas y hacer un commit nuevo; siguen visibles en commits
   anteriores). Usa `git filter-repo` o simplemente crea un repo nuevo sin ese historial
   antes de hacerlo público.

### Importante en ambos casos: repo privado ≠ sitio privado

Un repositorio privado protege el código y las fotos dentro de **GitHub**. No hace
privado el **sitio ya publicado**: cualquiera con el link puede verlo, porque no hay
backend ni login. Por eso, sin importar la opción elegida, siempre debes aplicar:

- `robots.txt` bloqueando todo (ver sección "Checklist previa al deploy").
- Meta `<meta name="robots" content="noindex">`.
- Una URL no adivinable en Vercel (evitar nombres obvios como
  `nuestro-jardin.vercel.app`).

### Antes de subir cualquier foto (ambas opciones)
- Quitar metadatos EXIF (ubicación GPS, modelo de dispositivo) con una herramienta como
  `exiftool -all= foto.jpg` o el equivalente al exportar desde el editor de fotos.
- Comprimir/convertir a `.webp` para que cargue rápido en 4G.
- Nombrar los archivos de forma neutra (`photo-01.webp`), nunca con nombres reales.

## Checklist previa al deploy

1. **Repositorio**: aplicar Opción A o B de arriba, según corresponda.
2. **robots.txt** y meta `noindex` presentes en el build final.
3. **URL**: nombre de proyecto en Vercel no adivinable.
4. **og:image**: ilustración de flor, no foto real:
   ```html
   <meta property="og:title" content="Tengo algo para ti" />
   <meta property="og:description" content="Ábrelo cuando tengas unos minutos." />
   <meta property="og:image" content="/flowers/preview.webp" />
   ```
5. **Build**: correr `npm run build` y revisar tamaño del bundle.
6. **Prueba final en móvil real**, no solo emulador.
7. **Mensaje de envío**: corto, sin explicar de qué se trata.

## Criterios de aceptación
- El sitio funciona igual en desktop y en un teléfono real, con buena carga en 4G.
- Ninguna fotografía real de la pareja quedó en el historial de commits de GitHub (si
  se usó git) o no existe historial de git en absoluto (si se usó Opción A).
- El link no aparece indexado en buscadores (verificable con `site:` días después).
- La previsualización en WhatsApp muestra una imagen neutra.

## No hacer
- No dejar el repositorio público con fotos reales "por ahora, después lo hago
  privado": decidir la opción (A o B) antes del primer commit con imágenes.
- No asumir que un repo privado hace privado el sitio publicado.
- No agregar analíticas de terceros a un regalo personal.
