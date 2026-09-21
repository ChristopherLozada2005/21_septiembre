---
name: data-model-and-content
description: Usar esta skill cuando se necesite crear o editar el archivo de datos de las flores (src/data/flowers.ts), redactar significados y mensajes personales, o vincular fotografías a cada flor.
---

# Skill: Modelo de datos y contenido narrativo

## Objetivo
Separar todo el contenido (textos, significados, rutas de fotos) de la lógica visual,
en un único archivo tipado.

## Contrato de datos

```ts
// src/data/flowers.ts
export interface Flower {
  id: string;
  name: string;
  emoji: string;
  meaning: string;
  message: string;
  image: string;        // ruta en /public/photos
  memory: string;
  hidden?: boolean;      // true solo para la 5ta flor ("Nuestra flor")
}

export const flowers: Flower[] = [ /* 5 elementos */ ];
```

## Guía de redacción
- Primera persona, tono cálido, directo, sin cursilería excesiva.
- Estructura: significado general -> por qué aplica a ella -> frase de cierre corta.
- La quinta flor ("Nuestra flor") es la única sin significado "de catálogo".
- Si un texto real todavía no existe, dejar `"TODO: completar antes de publicar"`.

## Pasos
1. Crear `src/data/flowers.ts` con la interfaz `Flower` y el arreglo `flowers`.
2. Confirmar que cada `image` apunta a un archivo existente en `public/photos/`.
3. Validar longitud de textos (mensajes cortos, 5-6 líneas).
4. No agregar una sexta entrada de contenido: la sexta interacción es "plantar", no
   una flor de contenido.

## Criterios de aceptación
- `flowers.ts` exporta exactamente 5 flores tipadas.
- Ningún componente contiene strings de contenido narrativo hardcodeados.
