export interface Flower {
  id: string;
  name: string;
  emoji: string;
  meaning: string;
  message: string;
  image: string;
  memory: string;
  hidden?: boolean;
}

export const gardenContent = {
  eyebrow: 'Nuestro jardín',
  title: 'Un jardín que crece contigo',
  hint: 'Te falta una flor... la más especial está cerca.',
  plant: {
    message: 'Ya descubriste las 5 flores. Esta flor la plantas tú.',
    action: 'Plantar mi flor',
  },
  final: {
    title: 'Gracias por ser mi jardín.',
    message:
      'Cada flor representa un pedacito de lo que vive entre nosotros: alegría, calma, ternura y un futuro que se siente cada vez más claro.',
    action: 'Volver a recorrer nuestro jardín',
  },
} as const;

export const flowers: Flower[] = [
  {
    id: 'margarita',
    name: 'Margarita',
    emoji: '🌼',
    meaning:
      'La alegría que llega sin pedir permiso y se queda con una calma sencilla.',
    message:
      'Eres ese brillo que pone más luz en mis días. Me hace bien saber que contigo todo se siente más amable, más alegre y más mío.',
    image: '/photos/photo-01.svg',
    memory:
      'Ese día en el que nos miramos sin prisa y supe que me estaba encontrando en la forma más bonita de vivir.',
  },
  {
    id: 'azucena',
    name: 'Azucena',
    emoji: '🪷',
    meaning:
      'Representa la ternura que acompaña, limpia y hace sentir en casa incluso en la distancia.',
    message:
      'Tú eres ese lugar de calma en el que quiero llegar siempre. Tu presencia me hace respirar mejor y recordar que mi vida también puede ser suave.',
    image: '/photos/photo-02.svg',
    memory:
      'Recuerdo la noche en que todo se sintió quieto, pero lleno de nosotros, y entendí lo mucho que me gusta estar así contigo.',
  },
  {
    id: 'lavanda',
    name: 'Lavanda',
    emoji: '💜',
    meaning:
      'La quietud y la delicadeza de alguien que sabe cuidar sin hacer ruido.',
    message:
      'Me encanta cómo me cuidas sin que haga falta mucho. Te has vuelto una de las cosas más bellas y seguras que tengo en mi vida.',
    image: '/photos/photo-03.svg',
    memory:
      'La forma en que me abrazaste en ese momento me hizo sentir que, por fin, había llegado a un sitio que también me llevaba a casa.',
  },
  {
    id: 'rosa',
    name: 'Rosa',
    emoji: '🌹',
    meaning:
      'La paciencia de dejar crecer algo bonito con amor y sin prisa.',
    message:
      'Con tú, incluso lo cotidiano se vuelve más intenso y más bonito. No necesito un gran escenario para sentir que estoy exactamente donde quiero estar.',
    image: '/photos/photo-04.svg',
    memory:
      'Hay recuerdos pequeños que me quedan grabados: tus risas, tu mirada, el modo en que todo se hacía más claro cuando estabas tú.',
  },
  {
    id: 'nuestra-flor',
    name: 'Nuestra flor',
    emoji: '🌻',
    meaning:
      'No es una flor de catálogo: es la que nace cuando dos caminos se reconocen y se quedan juntos.',
    message:
      'Y así somos nosotros: dos personas que se eligen, se acompañan y hacen de lo simple un mundo bonito. Esta historia no necesita más que lo que ya existe entre nosotros.',
    image: '/photos/photo-05.svg',
    memory:
      'La mejor foto no es la más grande ni la más perfecta: es la que guarda la forma en que nos miramos y nos quedamos.',
    hidden: true,
  },
];
