import type { Docs } from "./legal";

/** Portuguese translation of the English legal texts (the English and Turkish versions prevail). */
export const pt: Docs = {
  privacy: {
    title: "Política de Privacidade",
    intro:
      "Esta política explica quais dados pessoais o keyboardfast ({site}) trata, por quê, e quais são os seus direitos. Ela foi redigida de acordo com a Lei turca de Proteção de Dados Pessoais n.º 6698 (KVKK) e o Regulamento Geral sobre a Proteção de Dados da UE (RGPD).",
    sections: [
      {
        heading: "Quem é o responsável",
        body: [
          "O responsável pelo tratamento é {owner}, operador do keyboardfast. Para qualquer assunto desta política, entre em contato pelo e-mail {email}.",
        ],
      },
      {
        heading: "Usar o site sem conta",
        body: [
          "Você pode fazer testes de digitação sem entrar. As suas configurações (tema, opções do teste) e os seus resultados ficam guardados apenas no armazenamento local do seu navegador. Eles não são enviados para nós, e você pode apagá-los a qualquer momento limpando os dados do site no navegador.",
        ],
      },
      {
        heading: "Dados que tratamos quando você cria uma conta",
        body: [
          "Endereço de e-mail – para você entrar com um link de uso único e para identificar a sua conta.",
          "Se você escolher \"Continuar com o Google\", o Google compartilha conosco o seu e-mail, nome, foto de perfil e ID da conta. Usamos apenas o e-mail e o ID da conta para o login; nunca recebemos a sua senha do Google.",
          "Nome de usuário – o nome público que você escolhe; ele aparece no ranking junto com os seus melhores resultados.",
          "Resultados dos testes – velocidade (WPM), precisão, consistência, contagem de caracteres, modo e idioma do teste, data e hora de cada teste e um resumo compacto por tecla (acertos, erros, tempo médio) usado para mostrar as suas teclas fracas.",
          "Verificação de testes – quando você termina um teste conectado, as teclas que pressionou nesse teste e os respectivos tempos são enviados uma única vez ao nosso servidor, para que ele recalcule o resultado e confirme que não foi gerado por um script. Apenas o resultado é guardado; o registro de teclas é descartado imediatamente. Ele abrange somente o texto do teste, nada mais do que você digita.",
          "Não coletamos senhas (o login não usa senha), dados de pagamento nem localização precisa.",
        ],
      },
      {
        heading: "Dados técnicos",
        body: [
          "Como qualquer site, o nosso servidor recebe o seu endereço IP e informações do navegador a cada pedido. Usamos esses dados apenas para entregar o site e protegê-lo contra abusos. Os registros do servidor passam por rotação automática e não são guardados por mais tempo do que o necessário para esse fim.",
        ],
      },
      {
        heading: "Finalidades e bases legais",
        body: [
          "Fornecer as funcionalidades de conta que você pediu – guardar resultados, mostrar o seu progresso e classificá-lo no ranking (KVKK art. 5(2)(c); RGPD art. 6(1)(b), execução de contrato).",
          "Manter o serviço seguro e evitar trapaças e abusos (KVKK art. 5(2)(f); RGPD art. 6(1)(f), interesses legítimos).",
          "Não vendemos os seus dados, não criamos perfis de publicidade nem tomamos decisões automatizadas com efeitos jurídicos sobre você.",
        ],
      },
      {
        heading: "Prestadores de serviços",
        body: [
          "A Supabase Inc. hospeda a nossa base de dados e o sistema de login. Os dados da sua conta ficam guardados na região da União Europeia (Frankfurt, Alemanha).",
          "O nosso fornecedor de servidores virtuais hospeda o site em si.",
          "Os e-mails de login são enviados pela Resend Inc. a partir de noreply@keyboardfast.com.",
          "Se você entrar com o Google, a Google LLC (Google Ireland Ltd. para usuários na Europa) confirma a sua identidade segundo a sua própria política de privacidade.",
          "Estes prestadores tratam os dados apenas segundo as nossas instruções. Como alguns estão estabelecidos fora da Turquia, usar uma conta pode implicar a transferência de dados pessoais para o estrangeiro; isso acontece apenas na medida necessária para prestar o serviço e com as garantias adequadas exigidas pelo art. 9 da KVKK e pelo capítulo V do RGPD.",
        ],
      },
      {
        heading: "Por quanto tempo guardamos os dados",
        body: [
          "Os dados da conta e os resultados são guardados até você excluir a sua conta. Você pode excluí-la a qualquer momento no menu da conta; isso exclui de forma permanente o seu e-mail, o seu nome de usuário e todos os resultados da nossa base de dados.",
        ],
      },
      {
        heading: "Os seus direitos",
        body: [
          "Nos termos do art. 11 da KVKK e do RGPD, você pode perguntar se os seus dados são tratados, obter uma cópia, pedir a sua correção ou exclusão, opor-se ao tratamento e pedir informações sobre transferências. Você pode baixar todos os seus dados em um arquivo JSON e excluir a sua conta diretamente no menu da conta.",
          "Para qualquer outro pedido, escreva para {email}. Respondemos no prazo de 30 dias. Você também tem o direito de apresentar reclamação à Autoridade turca de Proteção de Dados Pessoais (KVKK) ou à autoridade de proteção de dados do seu país.",
        ],
      },
      {
        heading: "Crianças",
        body: [
          "O keyboardfast está aberto a todos, mas as contas destinam-se a pessoas com 16 anos ou mais. Se você tiver menos de 16 anos, peça autorização a um pai, mãe ou responsável antes de criar uma conta.",
        ],
      },
      {
        heading: "Alterações nesta política",
        body: [
          "Atualizaremos esta página se a forma como tratamos os dados mudar. A data no topo indica a versão mais recente. Alterações importantes serão anunciadas no site.",
        ],
      },
    ],
  },
  cookies: {
    title: "Política de Cookies",
    intro:
      "O keyboardfast usa apenas o armazenamento de que precisa para funcionar. Não usamos cookies de publicidade, de análise nem de rastreamento, por isso não pedimos consentimento para rastreamento.",
    sections: [
      {
        heading: "O que guardamos no seu navegador",
        body: [
          "locale (cookie, 1 ano) – lembra o idioma da interface que você escolheu.",
          "kf:settings (armazenamento local) – o seu tema e as opções de teste.",
          "kf:history (armazenamento local) – resultados de testes feitos sem login; usuários conectados têm uma cópia local dos próprios resultados para manter o site rápido.",
          "kf:pending (armazenamento local) – resultados aguardando envio para a sua conta quando você estava offline.",
          "kf:ticket (armazenamento local) – um bilhete de teste obtido antecipadamente que permite verificar o seu próximo teste para o ranking (apenas conectado).",
          "kf:consent (armazenamento local) – lembra que você já viu o aviso de cookies.",
          "sb-…-auth-token (armazenamento local) – mantém você conectado. É criado apenas ao entrar e removido ao sair.",
        ],
      },
      {
        heading: "Por que não é preciso consentimento",
        body: [
          "Todos os itens acima são estritamente necessários para funcionalidades que você usa ou guardam escolhas feitas por você. Segundo as regras de ePrivacy e a KVKK, não exigem consentimento prévio. Nenhum deles é compartilhado com terceiros para fins de marketing.",
        ],
      },
      {
        heading: "Como removê-los",
        body: [
          "Você pode apagar tudo a qualquer momento saindo da conta e limpando os dados do site {site} nas configurações do navegador. O site continuará a funcionar, mas os seus resultados locais e preferências serão redefinidos.",
        ],
      },
      {
        heading: "Alterações futuras",
        body: [
          "Se algum dia adicionarmos cookies opcionais (por exemplo, de análise ou publicidade), pediremos o seu consentimento antes de os usar e atualizaremos esta política.",
        ],
      },
    ],
  },
  terms: {
    title: "Termos de Uso",
    intro: "Estes termos aplicam-se quando você usa o keyboardfast ({site}). Ao usar o site, você concorda com eles.",
    sections: [
      {
        heading: "O serviço",
        body: [
          "O keyboardfast é um teste de velocidade de digitação gratuito. Podemos adicionar, alterar ou remover funcionalidades a qualquer momento. O serviço é prestado sem custos e sem garantia de disponibilidade.",
        ],
      },
      {
        heading: "A sua conta",
        body: [
          "Para criar uma conta, você precisa de um endereço de e-mail válido que controle. Proteja o acesso a esse e-mail, pois os links de login são enviados para lá. Uma conta por pessoa.",
          "O seu nome de usuário não pode imitar outras pessoas, conter linguagem ofensiva ou de ódio, nem fazer publicidade. Podemos alterar ou remover nomes de usuário que violem esta regra.",
        ],
      },
      {
        heading: "Jogo limpo",
        body: [
          "Os resultados têm de vir da sua própria digitação. Não é permitido usar bots, scripts, macros, clientes modificados ou qualquer outra forma de enviar resultados que você não digitou. Podemos remover esses resultados, ocultá-los do ranking ou encerrar as contas envolvidas.",
          "Não tente perturbar o serviço, acessar dados de outros usuários nem contornar medidas de segurança.",
        ],
      },
      {
        heading: "Conteúdo e propriedade intelectual",
        body: [
          "O design, o código e os textos do site pertencem a {owner}, salvo indicação em contrário. As listas de palavras e os trechos de código são fornecidos apenas para praticar digitação.",
        ],
      },
      {
        heading: "Isenção e responsabilidade",
        body: [
          "O keyboardfast é fornecido \"no estado em que se encontra\". Fazemos o nosso melhor para que os resultados sejam precisos e os dados estejam seguros, mas não podemos garantir que o serviço esteja sempre disponível, sem erros, nem que nenhum dado se perca. Na medida permitida por lei, não nos responsabilizamos por danos indiretos decorrentes do uso do serviço.",
        ],
      },
      {
        heading: "Fim do uso",
        body: [
          "Você pode deixar de usar o serviço e excluir a sua conta a qualquer momento no menu da conta. Podemos suspender contas que violem estes termos de forma grave ou repetida.",
        ],
      },
      {
        heading: "Lei aplicável e alterações",
        body: [
          "Estes termos são regidos pelas leis da República da Turquia. As normas imperativas de proteção do consumidor do seu país de residência não são afetadas. Podemos atualizar estes termos; a data no topo indica a versão em vigor. Dúvidas: {email}.",
        ],
      },
    ],
  },
};
