import type { ArticleSet } from "./guides";

/** Brazilian Portuguese translation of the about page and guides. */
export const pt: ArticleSet = {
  about: {
    slug: "about",
    title: "Sobre o keyboardfast",
    description:
      "O keyboardfast é um teste de digitação gratuito em 14 idiomas, com modo código, estatísticas honestas e um modo prática que treina suas teclas fracas.",
    minutes: 2,
    sections: [
      {
        heading: "O que é o keyboardfast",
        body: [
          "O keyboardfast é um teste de velocidade de digitação feito para quem quer melhorar de verdade, e não só ver um número. Você pode se testar em 14 idiomas, do português e do inglês ao polonês, ao russo e ao indonésio, ou digitar código real em oito linguagens de programação.",
          "Cada resultado mostra muito mais que a velocidade: precisão, consistência, um gráfico segundo a segundo, as teclas que te atrasaram e como você digita letras em comparação com símbolos.",
        ],
      },
      {
        heading: "O que ele tem de diferente",
        body: [
          {
            list: [
              "Prática que se adapta a você: depois de alguns testes, o keyboardfast sabe quais letras e pares de letras mais te custam e monta o texto de prática em torno deles.",
              "Um mapa de calor do teclado no seu próprio layout (ABNT2, QWERTZ, AZERTY, Q turco e outros), para você ver seus pontos fracos de relance.",
              "Um ranking justo: cada resultado classificado é reproduzido e verificado no nosso servidor, então scripts e copiar e colar não entram na tabela.",
              "Modo código para desenvolvedores, com indentação automática para você praticar os caracteres que importam.",
              "Privacidade em primeiro lugar: não é preciso conta para fazer testes, e você pode baixar ou excluir seus dados quando quiser.",
            ],
          },
        ],
      },
      {
        heading: "Quem faz",
        body: [
          "O keyboardfast é um projeto independente criado e mantido por Furkan Haltas, desenvolvedor de software da Turquia. Ele nasceu da vontade de construir do começo ao fim um aplicativo web rápido e bem cuidado – do motor de digitação ao servidor onde roda – e de criar um teste de digitação que respeite seus usuários.",
          "Ideias, relatos de bugs e feedback são sempre bem-vindos pelo link de contato no rodapé de cada página.",
        ],
      },
    ],
  },
  guides: [
    {
      slug: "what-is-wpm",
      title: "O que significa WPM e como a velocidade de digitação é medida",
      description:
        "Palavras por minuto, velocidade bruta e líquida, precisão e consistência explicadas – e o que é uma boa velocidade de digitação.",
      minutes: 5,
      sections: [
        {
          heading: "Uma \"palavra\" tem cinco caracteres",
          body: [
            "Testes de digitação não contam palavras reais, porque aí \"e\" e \"extraordinariamente\" valeriam o mesmo. Em vez disso, cada cinco caracteres – incluindo espaços e pontuação – contam como uma palavra. Digitar 250 caracteres em um minuto equivale, portanto, a 50 palavras por minuto (WPM), sejam quais forem as palavras.",
            "Esse padrão torna os resultados comparáveis entre idiomas e textos, embora idiomas com palavras longas e muitas letras especiais, como alemão ou turco, costumem parecer um pouco mais lentos.",
          ],
        },
        {
          heading: "Velocidade líquida e velocidade bruta",
          body: [
            "O keyboardfast mostra duas velocidades. A velocidade bruta conta cada tecla pressionada, certa ou errada. A velocidade líquida – o número grande de WPM – conta apenas os caracteres das palavras digitadas corretamente. Se você digita rápido mas deixa erros para trás, a diferença entre as duas aumenta.",
            "Na vida real, o que importa é a velocidade líquida: um parágrafo rápido, mas cheio de erros, ainda precisa ser corrigido. Uma diferença pequena entre bruta e líquida é sinal de digitação limpa.",
          ],
        },
        {
          heading: "Precisão e consistência",
          body: [
            "A precisão é a porcentagem de toques corretos. Erros corrigidos também contam contra, porque você gastou tempo para cometê-los e consertá-los. Passar de 95% é uma boa meta; os melhores costumam ficar acima de 97%.",
            "A consistência mostra o quanto sua velocidade foi estável durante o teste. Um ritmo constante pontua alto; arrancadas e pausas, baixo. Quem digita com consistência costuma evoluir mais rápido, porque a velocidade não depende de o texto ser fácil.",
          ],
        },
        {
          heading: "O que é uma boa velocidade de digitação?",
          body: [
            "Faixas aproximadas de velocidade líquida em textos do dia a dia:",
            {
              list: [
                "Menos de 30 WPM – catando milho ou começando agora.",
                "30–45 WPM – mais ou menos a média de adultos que digitam com frequência.",
                "45–65 WPM – confortável e produtivo; suficiente para a maior parte do trabalho de escritório.",
                "65–90 WPM – rápido; típico de quem digita com os dez dedos há anos.",
                "Mais de 100 WPM – excepcional; poucas pessoas chegam lá com treino focado.",
              ],
            },
            "Testes curtos dão números mais altos, porque dá para manter um sprint por 15 segundos, mas não por dois minutos. Compare-se com seus próprios resultados no mesmo modo – é exatamente isso que a página de progresso faz.",
          ],
        },
        {
          heading: "Como obter um número confiável",
          body: [
            "Faça vários testes e olhe para a sua média, não para o seu melhor resultado. Use o teste de 60 segundos para um número realista, desative pontuação e números ao se comparar com outras pessoas e teste no idioma em que você realmente digita no dia a dia.",
          ],
        },
      ],
    },
    {
      slug: "how-to-type-faster",
      title: "Como digitar mais rápido: um plano prático",
      description:
        "Um caminho realista, passo a passo, para aumentar sua velocidade: precisão primeiro, prática curta e diária, foco nas teclas fracas e superação de platôs.",
      minutes: 6,
      sections: [
        {
          heading: "Vá mais devagar para ir mais rápido",
          body: [
            "O erro mais comum é praticar numa velocidade em que você erra muito. Cada erro corrigido custa mais tempo do que digitar o caractere com cuidado, e erros repetidos treinam seus dedos a cometê-los de novo.",
            "Mire primeiro em 96–98% de precisão. Se cair abaixo disso, diminua o ritmo até os erros sumirem e deixe a velocidade subir sozinha. Parece lento por uma ou duas semanas – depois começa a valer a pena.",
          ],
        },
        {
          heading: "Olhe para a tela, não para o teclado",
          body: [
            "Olhar para baixo quebra o fluxo de leitura e limita sua velocidade a cerca de 40 WPM. Se você ainda olha para as teclas, aprender a digitar com os dez dedos é a maior melhoria que você pode fazer – veja nosso guia sobre a fileira base e a posição dos dedos.",
          ],
        },
        {
          heading: "Pratique pouco e com frequência",
          body: [
            "Quinze minutos concentrados por dia valem mais que duas horas no domingo. Digitar é uma habilidade motora, e habilidades motoras se consolidam entre as sessões, principalmente durante o sono. Uma boa rotina:",
            {
              list: [
                "2–3 testes de aquecimento num ritmo tranquilo.",
                "5–10 minutos de modo prática nas suas teclas fracas.",
                "2–3 testes no seu ritmo normal para medir o progresso.",
              ],
            },
          ],
        },
        {
          heading: "Corrija primeiro suas teclas fracas",
          body: [
            "A maioria das pessoas perde quase todo o tempo em um punhado de letras e pares de letras. O keyboardfast registra com que frequência você erra cada tecla e quanto tempo leva para pressioná-la, e mostra isso num mapa de calor nas páginas de resultado e de progresso.",
            "O modo prática monta o texto com palavras reais que contêm essas teclas, então você repete muito mais exatamente o que te atrasa – sem digitar sequências de letras sem sentido.",
          ],
        },
        {
          heading: "Leia adiante e mantenha o ritmo",
          body: [
            "Quem digita rápido lê uma ou duas palavras à frente de onde está digitando, assim os dedos nunca esperam pela próxima palavra. Tente manter os olhos um pouco à frente do cursor e digitar num ritmo uniforme, em vez de correr nas palavras fáceis e travar nas difíceis. A pontuação de consistência mostra se está funcionando.",
          ],
        },
        {
          heading: "Como sair de um platô",
          body: [
            "Todo mundo empaca em algum momento. Se sua média não sai do lugar por algumas semanas, mude alguma coisa: passe para um teste mais longo, ative a pontuação, pratique em outro idioma ou no modo código, ou faça alguns testes de propósito lentos e perfeitos. A variedade obriga seus dedos a deixar de depender de hábitos que só funcionam com um tipo de texto.",
          ],
        },
        {
          heading: "Cuide do seu corpo",
          body: [
            "Sente-se com os ombros relaxados, os antebraços mais ou menos na altura do teclado e os pulsos levemente suspensos, em vez de apoiados com força na mesa. Tensão deixa você mais lento e, com o tempo, pode doer. Faça uma pausa curta sempre que as mãos estiverem cansadas.",
          ],
        },
      ],
    },
    {
      slug: "touch-typing",
      title: "Digitação com os dez dedos: fileira base e posição dos dedos",
      description:
        "Aprenda a digitar com os dez dedos passo a passo: onde os dedos ficam, qual dedo aperta cada tecla e como fazer a transição sem perder produtividade.",
      minutes: 6,
      sections: [
        {
          heading: "O que é digitar com os dez dedos",
          body: [
            "Digitar com os dez dedos significa digitar sem olhar para o teclado, com cada dedo responsável pelo seu próprio grupo de teclas. Seus dedos aprendem onde estão as teclas e seus olhos ficam no texto. Quase todo mundo que digita rápido faz assim.",
          ],
        },
        {
          heading: "A fileira base",
          body: [
            "Os dedos ficam apoiados na fileira do meio e voltam para ela depois de cada toque. No teclado brasileiro ABNT2, a mão esquerda fica em A S D F e a direita em J K L Ç. As teclas F e J têm pequenas saliências para você achar a posição sem olhar.",
            "No QWERTY inglês é A S D F / J K L e a tecla seguinte; no QWERTZ alemão, A S D F / J K L Ö; e no AZERTY francês, Q S D F / J K L M.",
          ],
        },
        {
          heading: "Qual dedo aperta cada tecla",
          body: [
            "Cada dedo cobre uma coluna diagonal de teclas acima e abaixo da sua tecla base:",
            {
              list: [
                "Os indicadores fazem a maior parte do trabalho: cada um cobre duas colunas – F, G, R, T, V, B à esquerda e J, H, U, Y, N, M à direita.",
                "Os dedos médios cobrem as colunas de D e K (E, C e I, vírgula).",
                "Os anelares cobrem as colunas de S e L (W, X e O, ponto).",
                "Os mindinhos cobrem o A e tudo à direita das teclas base da mão direita (P, Ç, as teclas de acento ´ e ~, o ponto e vírgula), além de Shift, Enter e Backspace.",
                "Os polegares apertam a barra de espaço – normalmente o da mão que não digitou a última letra.",
              ],
            },
            "Em português, as letras acentuadas usam teclas mortas: você aperta primeiro ´, ~ ou ^ com o mindinho direito e depois a vogal. Se essas teclas ou o Ç aparecem em vermelho no seu mapa de calor, aí está um bom ponto de partida.",
          ],
        },
        {
          heading: "Como aprender",
          body: [
            {
              list: [
                "Comece devagar e com precisão; 15–20 WPM sem olhar é uma boa primeira meta.",
                "Não olhe para baixo. Se precisar, olhe para a tela para ver o que você digitou.",
                "Pratique 15–20 minutos todo dia em vez de sessões longas.",
                "Use o modo prática quando tiver alguns testes – ele vai te levar às teclas que você evita.",
              ],
            },
          ],
        },
        {
          heading: "Espere uma queda temporária",
          body: [
            "Se você já digita com alguns dedos, a mudança vai te deixar mais lento por um tempo – muitas vezes de duas a quatro semanas. A maioria das pessoas passa a velocidade antiga em um ou dois meses e continua melhorando por muito tempo, enquanto quem cata milho costuma estacionar por volta de 40 WPM. Se você precisa continuar produtivo, use os dez dedos primeiro nas sessões de prática e mude de vez quando voltar à sua velocidade antiga.",
          ],
        },
      ],
    },
    {
      slug: "typing-for-programmers",
      title: "Velocidade de digitação para programadores",
      description:
        "Por que digitar ainda importa para desenvolvedores, quais caracteres atrasam quem programa e como praticar colchetes, símbolos e indentação com o modo código.",
      minutes: 5,
      sections: [
        {
          heading: "Velocidade de digitação importa para programar?",
          body: [
            "Programadores passam mais tempo pensando do que digitando, então velocidade bruta não é tudo. Mas uma digitação que não exige atenção deixa sua atenção livre para o problema. Se você precisa pensar onde fica a chave, esse foco sai do código – e em chats, revisões de código, mensagens de commit e documentação, desenvolvedores também digitam muito texto comum.",
          ],
        },
        {
          heading: "Código é outro tipo de texto",
          body: [
            "Código é cheio de caracteres que a prática comum nunca treina: parênteses, colchetes, chaves, aspas, ponto e vírgula, operadores, sublinhados e camelCase. Muitos exigem Shift ou, no ABNT2 e em outros layouts fora dos EUA, a tecla AltGr, o que os torna bem mais lentos que as letras.",
            "A página de resultados do keyboardfast compara sua velocidade em símbolos com a velocidade em letras. Se os símbolos levam o dobro do tempo, é aí que estão os ganhos mais fáceis.",
          ],
        },
        {
          heading: "Como funciona o modo código",
          body: [
            "O modo código traz trechos reais e idiomáticos em oito linguagens, incluindo JavaScript, TypeScript, Python, Go e Rust. A indentação é digitada para você – como faria um editor moderno – e você aperta Enter no fim de cada linha. Assim você pratica os caracteres que realmente digita ao programar, e não os espaços que o editor colocaria de qualquer forma.",
          ],
        },
        {
          heading: "Dicas para digitar código mais rápido",
          body: [
            {
              list: [
                "Aprenda onde fica cada símbolo sem olhar – principalmente { } [ ] ( ) < > no seu layout.",
                "Use o Shift certo: o da mão oposta à tecla que você está apertando.",
                "Muitos desenvolvedores com teclado ABNT2 mudam para o layout americano na hora de programar, porque lá os colchetes não precisam de AltGr. Vale testar se os símbolos são o seu gargalo.",
                "Pratique os padrões da sua linguagem principal: arrow functions, list comprehensions, tratamento de erros.",
                "Aprenda os atalhos do seu editor para autocompletar, múltiplos cursores e mover linhas – eles economizam mais tempo do que qualquer WPM a mais.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
