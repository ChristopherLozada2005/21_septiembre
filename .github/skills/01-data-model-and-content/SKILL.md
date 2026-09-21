---
name: data-model-and-content
description: Usar esta skill cuando se necesite crear o editar el archivo de datos de las flores (src/data/flowers.ts), redactar significados y mensajes personales, o vincular fotografías a cada flor. Aplica también cuando Christopher quiera cambiar textos sin tocar componentes.
---

# Skill: Modelo de datos y contenido narrativo

## Objetivo
Separar todo el contenido (textos, significados, rutas de fotos) de la lógica visual,
en un único archivo tipado.

## Cuándo usar esta skill
- Al definir las 5 flores por primera vez.
- Al editar/personalizar mensajes o cambiar fotografías.
- Al agregar la "Nuestra flor" (la quinta, sin significado genérico).

## Contrato de datos

```ts
// src/data/flowers.ts
export interface Flower {
  id: string;
  name: string;
  emoji: string;
  meaning: string;      // significado general de la flor
  message: string;      // mensaje personal, en primera persona
  image: string;        // ruta en /public/photos
  memory: string;       // frase corta bajo la fotografía
  hidden?: boolean;      // true solo para la 5ta flor ("Nuestra flor")
}

export const flowers: Flower[] = [ /* 5 elementos */ ];
```

## Guía de redacción (mantener el tono ya validado en el documento base)
- Primera persona, tono cálido, directo, sin cursilería excesiva.
- Cada flor sigue la misma estructura: significado general -> por qué aplica a ella ->
  frase de cierre corta bajo la foto.
- La quinta flor ("Nuestra flor") es la única sin significado "de catálogo": su texto
  debe ser 100% personal y no reutilizar la fórmula de las otras cuatro.
- Si un texto real todavía no existe, dejar `"TODO: completar antes de publicar"` como
  valor, nunca lorem ipsum ni relleno genérico, para que sea evidente qué falta.

## Pasos
1. Crear `src/data/flowers.ts` con la interfaz `Flower` y el arreglo `flowers`.
2. Confirmar que cada `image` apunta a un archivo existente en `public/photos/`.
3. Validar longitud de textos: el `message` no debería superar ~5-6 líneas cortas para
   mantener el ritmo de lectura pensado en el documento original.
4. Si se agrega una sexta entrada por error, detenerse: el diseño es intencionalmente
   de 5 flores + 1 interacción de "plantar" (no es contenido, es mecánica).

## Criterios de aceptación
- `flowers.ts` exporta exactamente 5 flores tipadas.
- Ningún componente contiene strings de contenido narrativo hardcodeados.
- Los textos usan el tono ya validado (cálido, personal, sin relleno).
