---
name: setup-and-conventions
description: Usar esta skill al iniciar el proyecto "Nuestro Jardín Amarillo" desde cero, o cuando se necesite recordar la estructura base, el stack y las convenciones antes de tocar cualquier componente. Es siempre el primer paso.
---

# Skill: Setup y convenciones base

## Objetivo
Dejar el proyecto inicializado con el stack correcto, la estructura de carpetas y los
tokens de diseño listos, para que el resto de skills puedan construir sobre una base
consistente.

## Cuándo usar esta skill
- Al crear el repositorio por primera vez.
- Cuando un agente nuevo retoma el proyecto y necesita contexto rápido antes de escribir código.

## Pasos

1. Inicializar proyecto:
   ```
   npm create vite@latest nuestro-jardin -- --template react-ts
   cd nuestro-jardin
   npm install framer-motion lucide-react
   ```
2. Crear la estructura de carpetas exacta descrita en `copilot-instructions.md` (sección 3).
3. Crear `src/index.css` con las variables CSS de la sección 5 de `copilot-instructions.md`.
4. Configurar fuentes (Playfair Display + Inter) vía `@fontface`/Google Fonts con
   `font-display: swap` y `<link rel="preload">` en `index.html`.
5. Crear `robots.txt` en `public/` con:
   ```
   User-agent: *
   Disallow: /
   ```
6. Agregar `<meta name="robots" content="noindex">` en `index.html`.
7. Verificar que `npm run dev` levanta sin errores y que las variables de color se ven
   aplicadas en un `<div>` de prueba.

## Criterios de aceptación
- El proyecto compila (`npm run build`) sin errores de TypeScript.
- La paleta de colores y tipografías están disponibles como variables globales.
- `robots.txt` y meta noindex están presentes.
- No se agregaron dependencias fuera de las listadas en `copilot-instructions.md`.

## No hacer
- No instalar Tailwind, Redux, React Router u otras librerías no solicitadas.
- No crear páginas/rutas adicionales: es una experiencia de una sola vista.
