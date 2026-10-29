import type { ArticleSet } from "./guides";

/** Spanish translation of the about page and guides. */
export const es: ArticleSet = {
  about: {
    slug: "about",
    title: "Acerca de keyboardfast",
    description:
      "keyboardfast es una prueba de mecanografía gratuita en 14 idiomas, con modo código, estadísticas honestas y un modo práctica que trabaja tus teclas débiles.",
    minutes: 2,
    sections: [
      {
        heading: "Qué es keyboardfast",
        body: [
          "keyboardfast es una prueba de velocidad de escritura pensada para quienes quieren mejorar de verdad, no solo ver un número. Puedes medirte en 14 idiomas, del español y el inglés al polaco, el ruso y el indonesio, o escribir código real en ocho lenguajes de programación.",
          "Cada resultado muestra mucho más que la velocidad: precisión, constancia, un gráfico segundo a segundo, las teclas que te frenaron y cómo escribes las letras en comparación con los símbolos.",
        ],
      },
      {
        heading: "Qué lo hace diferente",
        body: [
          {
            list: [
              "Práctica que se adapta a ti: tras unas cuantas pruebas, keyboardfast sabe qué letras y pares de letras te cuestan más y construye el texto de práctica a su alrededor.",
              "Un mapa de calor del teclado en tu propia distribución (española, QWERTZ, AZERTY, Q turca y más), para ver tus puntos débiles de un vistazo.",
              "Una clasificación justa: cada resultado clasificado se reproduce y verifica en nuestro servidor, así que los scripts y el copiar y pegar no llegan a la tabla.",
              "Modo código para desarrolladores, con sangría automática para que practiques los caracteres que importan.",
              "La privacidad primero: no necesitas cuenta para hacer pruebas y puedes descargar o borrar tus datos cuando quieras.",
            ],
          },
        ],
      },
      {
        heading: "Quién está detrás",
        body: [
          "keyboardfast es un proyecto independiente creado y gestionado por Furkan Haltas, desarrollador de software de Turquía. Nació como una forma de construir de principio a fin una aplicación web rápida y cuidada – desde el motor de escritura hasta el servidor en el que funciona – y de crear una prueba de mecanografía que respete a sus usuarios.",
          "Las ideas, los avisos de errores y los comentarios siempre son bienvenidos a través del enlace de contacto al pie de cada página.",
        ],
      },
    ],
  },
  guides: [
    {
      slug: "what-is-wpm",
      title: "Qué significa WPM y cómo se mide la velocidad de escritura",
      description:
        "Palabras por minuto, velocidad bruta y neta, precisión y constancia explicadas, y qué se considera una buena velocidad de escritura.",
      minutes: 5,
      sections: [
        {
          heading: "Una «palabra» son cinco caracteres",
          body: [
            "Las pruebas de mecanografía no cuentan palabras reales, porque entonces «y» y «extraordinariamente» valdrían lo mismo. En su lugar, cada cinco caracteres – incluidos espacios y signos de puntuación – cuentan como una palabra. Escribir 250 caracteres en un minuto equivale, por tanto, a 50 palabras por minuto (WPM), sean cuales sean las palabras.",
            "Este estándar permite comparar resultados entre idiomas y textos, aunque los idiomas con palabras largas y muchas letras especiales, como el alemán o el turco, suelen sentirse algo más lentos.",
          ],
        },
        {
          heading: "Velocidad neta y velocidad bruta",
          body: [
            "keyboardfast muestra dos velocidades. La velocidad bruta cuenta cada tecla que pulsaste, correcta o no. La velocidad neta – el número grande de WPM – solo cuenta los caracteres de las palabras escritas correctamente. Si escribes rápido pero dejas errores atrás, la diferencia entre ambas crece.",
            "En la vida real lo que importa es la velocidad neta: un párrafo rápido pero lleno de errores hay que corregirlo igualmente. Una diferencia pequeña entre bruta y neta indica una escritura limpia.",
          ],
        },
        {
          heading: "Precisión y constancia",
          body: [
            "La precisión es el porcentaje de pulsaciones correctas. Los errores corregidos también cuentan en contra, porque gastaste tiempo en cometerlos y arreglarlos. Superar el 95 % es un buen objetivo; los mejores suelen mantenerse por encima del 97 %.",
            "La constancia muestra lo regular que fue tu velocidad durante la prueba. Un ritmo estable puntúa alto; los acelerones y las pausas, bajo. Quienes escriben con constancia suelen mejorar más rápido, porque su velocidad no depende de que el texto resulte fácil.",
          ],
        },
        {
          heading: "¿Qué es una buena velocidad de escritura?",
          body: [
            "Rangos aproximados de velocidad neta con texto cotidiano:",
            {
              list: [
                "Menos de 30 WPM: escribir buscando las teclas o estar empezando.",
                "30–45 WPM: más o menos la media de los adultos que escriben a menudo.",
                "45–65 WPM: cómodo y productivo; suficiente para la mayoría del trabajo de oficina.",
                "65–90 WPM: rápido; habitual en mecanógrafos experimentados.",
                "Más de 100 WPM: excepcional; solo unos pocos lo alcanzan con práctica dedicada.",
              ],
            },
            "Las pruebas cortas dan cifras más altas, porque puedes mantener un sprint durante 15 segundos pero no durante dos minutos. Compárate con tus propios resultados en el mismo modo: eso es lo que hace la página de progreso.",
          ],
        },
        {
          heading: "Cómo obtener una cifra fiable",
          body: [
            "Haz varias pruebas y fíjate en tu media, no en tu mejor marca. Usa la prueba de 60 segundos para una cifra realista, desactiva la puntuación y los números si te comparas con otros y practica en el idioma en el que escribes a diario.",
          ],
        },
      ],
    },
    {
      slug: "how-to-type-faster",
      title: "Cómo escribir más rápido: un plan práctico",
      description:
        "Un camino realista, paso a paso, para aumentar tu velocidad: primero la precisión, práctica breve a diario, trabajar las teclas débiles y superar los estancamientos.",
      minutes: 6,
      sections: [
        {
          heading: "Ve más despacio para ir más rápido",
          body: [
            "El error más común es practicar a una velocidad con la que cometes muchos fallos. Cada error que corriges cuesta más tiempo que escribir el carácter con cuidado, y los errores repetidos entrenan a tus dedos para volver a cometerlos.",
            "Apunta primero a un 96–98 % de precisión. Si bajas de ahí, afloja el ritmo hasta que desaparezcan los errores y deja que la velocidad suba sola. Durante una o dos semanas parece lento; después empieza a dar frutos.",
          ],
        },
        {
          heading: "Mira la pantalla, no el teclado",
          body: [
            "Mirar hacia abajo rompe el flujo de lectura y limita tu velocidad a unos 40 WPM. Si todavía miras las teclas, aprender mecanografía al tacto es la mayor mejora que puedes hacer: consulta nuestra guía sobre la fila guía y la posición de los dedos.",
          ],
        },
        {
          heading: "Practica poco y a menudo",
          body: [
            "Quince minutos concentrados al día valen más que dos horas el domingo. Escribir es una habilidad motora, y las habilidades motoras se consolidan entre sesiones, sobre todo mientras duermes. Una buena rutina:",
            {
              list: [
                "2–3 pruebas de calentamiento a ritmo tranquilo.",
                "5–10 minutos de modo práctica con tus teclas débiles.",
                "2–3 pruebas a tu ritmo normal para medir el progreso.",
              ],
            },
          ],
        },
        {
          heading: "Corrige primero tus teclas débiles",
          body: [
            "La mayoría pierde casi todo su tiempo en un puñado de letras y pares de letras. keyboardfast registra con qué frecuencia fallas cada tecla y cuánto tardas en pulsarla, y lo muestra en un mapa de calor en las páginas de resultados y de progreso.",
            "El modo práctica crea texto con palabras reales que contienen esas teclas, así que repites mucho más justo lo que te frena, sin escribir cadenas de letras sin sentido.",
          ],
        },
        {
          heading: "Lee por delante y mantén el ritmo",
          body: [
            "Quienes escriben rápido leen una o dos palabras por delante de donde están escribiendo, así sus dedos nunca esperan a la siguiente palabra. Intenta mantener la vista un poco por delante del cursor y escribir a un ritmo uniforme, en lugar de correr en las palabras fáciles y atascarte en las difíciles. La puntuación de constancia muestra si funciona.",
          ],
        },
        {
          heading: "Cómo superar un estancamiento",
          body: [
            "Todo el mundo se atasca en algún momento. Si tu media no se mueve en un par de semanas, cambia algo: pasa a una prueba más larga, activa la puntuación, practica en otro idioma o en modo código, o haz algunas pruebas deliberadamente lentas y perfectas. La variedad obliga a tus dedos a dejar de depender de hábitos que solo sirven para un tipo de texto.",
          ],
        },
        {
          heading: "Cuida tu cuerpo",
          body: [
            "Siéntate con los hombros relajados, los antebrazos más o menos a la altura del teclado y las muñecas flotando en lugar de apoyadas con fuerza en la mesa. La tensión te hace más lento y, con el tiempo, puede doler. Haz una pausa breve cuando notes las manos cansadas.",
          ],
        },
      ],
    },
    {
      slug: "touch-typing",
      title: "Mecanografía al tacto: fila guía y posición de los dedos",
      description:
        "Aprende mecanografía al tacto paso a paso: dónde descansan los dedos, qué dedo pulsa cada tecla y cómo hacer el cambio sin perder productividad.",
      minutes: 6,
      sections: [
        {
          heading: "Qué es la mecanografía al tacto",
          body: [
            "Escribir al tacto significa escribir sin mirar el teclado, con cada dedo encargado de su propio grupo de teclas. Tus dedos aprenden dónde están las teclas y tus ojos se quedan en el texto. Casi todas las personas que escriben rápido lo hacen así.",
          ],
        },
        {
          heading: "La fila guía",
          body: [
            "Tus dedos descansan en la fila central de letras y vuelven a ella después de cada pulsación. En el teclado español la mano izquierda descansa en A S D F y la derecha en J K L Ñ. Las teclas F y J tienen pequeños relieves para encontrar la posición sin mirar.",
            "En el QWERTY inglés es A S D F / J K L y la tecla siguiente; en el QWERTZ alemán, A S D F / J K L Ö; y en el AZERTY francés, Q S D F / J K L M.",
          ],
        },
        {
          heading: "Qué dedo pulsa cada tecla",
          body: [
            "Cada dedo cubre una columna diagonal de teclas por encima y por debajo de su tecla guía:",
            {
              list: [
                "Los índices hacen la mayor parte del trabajo: cada uno cubre dos columnas, F, G, R, T, V, B a la izquierda y J, H, U, Y, N, M a la derecha.",
                "Los dedos corazón cubren las columnas de D y K (E, C e I, coma).",
                "Los anulares cubren las columnas de S y L (W, X y O, punto).",
                "Los meñiques cubren la A y todo lo que queda a la derecha de las teclas guía de la mano derecha (P, Ñ, la tecla de tilde ´ y el guion), además de Mayús, Intro y Retroceso.",
                "Los pulgares pulsan la barra espaciadora, normalmente el de la mano que no escribió la última letra.",
              ],
            },
            "En español, las vocales con tilde se escriben pulsando primero la tecla ´ con el meñique derecho y luego la vocal. Si esa tecla o la Ñ aparecen en rojo en tu mapa de calor, ahí tienes un buen punto de partida.",
          ],
        },
        {
          heading: "Cómo aprenderla",
          body: [
            {
              list: [
                "Empieza despacio y con precisión; 15–20 WPM sin mirar es un buen primer objetivo.",
                "No mires hacia abajo. Si lo necesitas, mira la pantalla para ver lo que has escrito.",
                "Practica 15–20 minutos cada día en lugar de en sesiones largas.",
                "Usa el modo práctica cuando tengas unas cuantas pruebas: te llevará a las teclas que evitas.",
              ],
            },
          ],
        },
        {
          heading: "Cuenta con una bajada temporal",
          body: [
            "Si ya escribes con unos pocos dedos, el cambio te hará más lento durante un tiempo, a menudo de dos a cuatro semanas. La mayoría supera su velocidad anterior en uno o dos meses y sigue mejorando mucho después, mientras que escribir buscando las teclas suele estancarse en torno a 40 WPM. Si necesitas seguir siendo productivo, usa la mecanografía al tacto primero en las prácticas y cámbiate del todo cuando recuperes tu velocidad.",
          ],
        },
      ],
    },
    {
      slug: "typing-for-programmers",
      title: "Velocidad de escritura para programadores",
      description:
        "Por qué escribir sigue importando a los desarrolladores, qué caracteres frenan al programar y cómo practicar corchetes, símbolos y sangría con el modo código.",
      minutes: 5,
      sections: [
        {
          heading: "¿Importa la velocidad al programar?",
          body: [
            "Los programadores pasan más tiempo pensando que escribiendo, así que la velocidad bruta no lo es todo. Pero escribir sin tener que prestar atención deja tu atención libre para el problema. Si tienes que pensar dónde está la llave, ese enfoque se lo quitas al código; y en chats, revisiones, mensajes de commit y documentación, los desarrolladores también escriben mucho texto normal.",
          ],
        },
        {
          heading: "El código es otro tipo de texto",
          body: [
            "El código está lleno de caracteres que la práctica habitual nunca entrena: paréntesis, corchetes, llaves, comillas, punto y coma, operadores, guiones bajos y camelCase. Muchos requieren Mayús o, en el teclado español y otras distribuciones europeas, la tecla AltGr, lo que los hace mucho más lentos que las letras.",
            "La página de resultados de keyboardfast compara tu velocidad con los símbolos y con las letras. Si los símbolos te cuestan el doble, ahí están las mejoras más fáciles.",
          ],
        },
        {
          heading: "Cómo funciona el modo código",
          body: [
            "El modo código te ofrece fragmentos reales e idiomáticos en ocho lenguajes, entre ellos JavaScript, TypeScript, Python, Go y Rust. La sangría se escribe por ti – como haría un editor moderno – y pulsas Intro al final de cada línea. Así practicas los caracteres que de verdad escribes al programar, no los espacios que el editor añadiría de todos modos.",
          ],
        },
        {
          heading: "Consejos para escribir código más rápido",
          body: [
            {
              list: [
                "Aprende dónde está cada símbolo sin mirar, sobre todo { } [ ] ( ) < > en tu distribución.",
                "Usa la tecla Mayús correcta: la de la mano contraria a la tecla que pulsas.",
                "Muchos desarrolladores con teclado español cambian a la distribución estadounidense para programar, porque allí los corchetes no necesitan AltGr. Pruébalo si los símbolos son tu cuello de botella.",
                "Practica los patrones de tu lenguaje principal: funciones flecha, comprensiones de listas, manejo de errores.",
                "Aprende los atajos de tu editor para autocompletar, varios cursores y mover líneas: ahorran más tiempo que cualquier WPM extra.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
