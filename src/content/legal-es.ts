import type { Docs } from "./legal";

/** Spanish translation of the English legal texts (the English and Turkish versions prevail). */
export const es: Docs = {
  privacy: {
    title: "Política de privacidad",
    intro:
      "Esta política explica qué datos personales trata keyboardfast ({site}), con qué fin y qué derechos tienes. Está redactada conforme a la Ley turca de Protección de Datos Personales n.º 6698 (KVKK) y al Reglamento General de Protección de Datos de la UE (RGPD).",
    sections: [
      {
        heading: "Responsable del tratamiento",
        body: [
          "El responsable es {owner}, operador de keyboardfast. Puedes contactarnos sobre cualquier punto de esta política en {email}.",
        ],
      },
      {
        heading: "Uso del sitio sin cuenta",
        body: [
          "Puedes hacer pruebas de mecanografía sin iniciar sesión. Tus ajustes (tema, opciones de prueba) y tus resultados se guardan solo en el almacenamiento local de tu navegador. No se nos envían y puedes borrarlos en cualquier momento eliminando los datos del sitio en tu navegador.",
        ],
      },
      {
        heading: "Datos que tratamos cuando creas una cuenta",
        body: [
          "Dirección de correo electrónico: para iniciar sesión con un enlace de un solo uso e identificar tu cuenta.",
          "Si eliges «Continuar con Google», Google nos comparte tu dirección de correo, nombre, foto de perfil e ID de cuenta. Solo usamos el correo y el ID de cuenta para iniciar sesión; nunca recibimos tu contraseña de Google.",
          "Nombre de usuario: el nombre público que eliges; aparece en la clasificación junto con tus mejores resultados.",
          "Resultados de las pruebas: velocidad (WPM), precisión, constancia, recuento de caracteres, modo e idioma de la prueba, fecha y hora de cada prueba, y un resumen compacto por tecla (aciertos, fallos, tiempo medio) que usamos para mostrarte tus teclas débiles.",
          "Verificación de pruebas: cuando terminas una prueba con la sesión iniciada, las teclas que pulsaste en esa prueba y sus tiempos se envían una sola vez a nuestro servidor para que recalcule el resultado y compruebe que no lo generó un script. Solo se guarda el resultado; el registro de pulsaciones se descarta de inmediato. Abarca únicamente el texto de la prueba, nada más de lo que escribas.",
          "No recopilamos contraseñas (el inicio de sesión no usa contraseña), datos de pago ni ubicación precisa.",
        ],
      },
      {
        heading: "Datos técnicos",
        body: [
          "Como cualquier sitio web, nuestro servidor recibe tu dirección IP y la información de tu navegador con cada solicitud. Solo los usamos para servir el sitio y protegerlo contra abusos. Los registros del servidor se rotan automáticamente y no se conservan más de lo necesario para ese fin.",
        ],
      },
      {
        heading: "Finalidades y bases jurídicas",
        body: [
          "Prestar las funciones de cuenta que solicitas: guardar resultados, mostrar tu progreso y clasificarte (KVKK art. 5(2)(c); RGPD art. 6(1)(b), ejecución de un contrato).",
          "Mantener la seguridad del servicio y evitar trampas y abusos (KVKK art. 5(2)(f); RGPD art. 6(1)(f), interés legítimo).",
          "No vendemos tus datos, no creamos perfiles publicitarios ni tomamos sobre ti decisiones automatizadas con efectos jurídicos.",
        ],
      },
      {
        heading: "Proveedores de servicios",
        body: [
          "Supabase Inc. aloja nuestra base de datos y el sistema de inicio de sesión. Los datos de tu cuenta se guardan en su región de la Unión Europea (Fráncfort, Alemania).",
          "Nuestro proveedor de servidores virtuales aloja el sitio web.",
          "Los correos de inicio de sesión los envía Resend Inc. desde noreply@keyboardfast.com.",
          "Si inicias sesión con Google, Google LLC (Google Ireland Ltd. para usuarios en Europa) confirma tu identidad conforme a su propia política de privacidad.",
          "Estos proveedores tratan los datos solo según nuestras instrucciones. Como algunos están establecidos fuera de Turquía, usar una cuenta puede implicar transferir datos personales al extranjero; esto ocurre solo en la medida necesaria para prestar el servicio y con las garantías adecuadas exigidas por el art. 9 de la KVKK y el capítulo V del RGPD.",
        ],
      },
      {
        heading: "Cuánto tiempo conservamos los datos",
        body: [
          "Los datos de la cuenta y los resultados se conservan hasta que eliminas tu cuenta. Puedes eliminarla en cualquier momento desde el menú de cuenta; así se borran de forma permanente tu correo, tu nombre de usuario y todos tus resultados de nuestra base de datos.",
        ],
      },
      {
        heading: "Tus derechos",
        body: [
          "Según el art. 11 de la KVKK y el RGPD, puedes preguntar si tratamos tus datos, obtener una copia, pedir que se corrijan o eliminen, oponerte al tratamiento y solicitar información sobre transferencias. Puedes descargar todos tus datos en un archivo JSON y eliminar tu cuenta directamente desde el menú de cuenta.",
          "Para cualquier otra solicitud, escribe a {email}. Respondemos en un plazo de 30 días. También tienes derecho a reclamar ante la Autoridad turca de Protección de Datos Personales (KVKK) o ante la autoridad de protección de datos de tu país.",
        ],
      },
      {
        heading: "Menores",
        body: [
          "keyboardfast está abierto a todo el mundo, pero las cuentas están pensadas para mayores de 16 años. Si eres menor, pide permiso a tu madre, padre o tutor antes de crear una cuenta.",
        ],
      },
      {
        heading: "Cambios en esta política",
        body: [
          "Actualizaremos esta página si cambia la forma en que tratamos los datos. La fecha de arriba indica la versión vigente. Los cambios importantes se anunciarán en el sitio.",
        ],
      },
    ],
  },
  cookies: {
    title: "Política de cookies",
    intro:
      "keyboardfast solo usa el almacenamiento que necesita para funcionar. No usamos cookies publicitarias, analíticas ni de seguimiento, por lo que no se solicita consentimiento para el seguimiento.",
    sections: [
      {
        heading: "Qué guardamos en tu navegador",
        body: [
          "locale (cookie, 1 año): recuerda el idioma de la interfaz que elegiste.",
          "kf:settings (almacenamiento local): tu tema y tus opciones de prueba.",
          "kf:history (almacenamiento local): resultados de pruebas hechas sin iniciar sesión; los usuarios con sesión tienen una copia local de sus propios resultados para que el sitio vaya rápido.",
          "kf:pending (almacenamiento local): resultados pendientes de subir a tu cuenta porque estabas sin conexión.",
          "kf:ticket (almacenamiento local): un ticket de prueba descargado de antemano que permite verificar tu próxima prueba para la clasificación (solo con sesión iniciada).",
          "kf:consent (almacenamiento local): recuerda que ya viste el aviso de cookies.",
          "sb-…-auth-token (almacenamiento local): mantiene tu sesión iniciada. Solo se crea al iniciar sesión y se elimina al cerrarla.",
        ],
      },
      {
        heading: "Por qué no se necesita consentimiento",
        body: [
          "Todos los elementos anteriores son estrictamente necesarios para funciones que usas o guardan elecciones que hiciste tú. Según las normas de ePrivacy y la KVKK, no requieren consentimiento previo. Ninguno se comparte con terceros con fines de marketing.",
        ],
      },
      {
        heading: "Cómo eliminarlos",
        body: [
          "Puedes borrarlo todo en cualquier momento cerrando sesión y eliminando los datos del sitio {site} en la configuración de tu navegador. El sitio seguirá funcionando, pero se restablecerán tus resultados locales y tus preferencias.",
        ],
      },
      {
        heading: "Cambios futuros",
        body: [
          "Si alguna vez añadimos cookies opcionales (por ejemplo, de analítica o publicidad), te pediremos consentimiento antes de usarlas y actualizaremos esta política.",
        ],
      },
    ],
  },
  terms: {
    title: "Condiciones de uso",
    intro: "Estas condiciones se aplican cuando usas keyboardfast ({site}). Al usar el sitio, las aceptas.",
    sections: [
      {
        heading: "El servicio",
        body: [
          "keyboardfast es una prueba de mecanografía gratuita. Podemos añadir, cambiar o eliminar funciones en cualquier momento. El servicio se ofrece sin coste y sin garantía de disponibilidad.",
        ],
      },
      {
        heading: "Tu cuenta",
        body: [
          "Para crear una cuenta necesitas una dirección de correo válida que controles. Protege el acceso a ese correo, porque allí se envían los enlaces de inicio de sesión. Una cuenta por persona.",
          "Tu nombre de usuario no debe suplantar a otras personas, contener lenguaje ofensivo o de odio ni anunciar nada. Podemos cambiar o eliminar los nombres de usuario que incumplan esta norma.",
        ],
      },
      {
        heading: "Juego limpio",
        body: [
          "Los resultados deben proceder de tu propia escritura. No se permite usar bots, scripts, macros, clientes modificados ni ninguna otra forma de enviar resultados que no hayas tecleado tú. Podemos eliminar esos resultados, ocultarlos de la clasificación o cerrar las cuentas implicadas.",
          "No intentes interrumpir el servicio, acceder a datos de otros usuarios ni eludir las medidas de seguridad.",
        ],
      },
      {
        heading: "Contenido y propiedad intelectual",
        body: [
          "El diseño, el código y los textos del sitio pertenecen a {owner}, salvo que se indique lo contrario. Las listas de palabras y los fragmentos de código se ofrecen solo para practicar mecanografía.",
        ],
      },
      {
        heading: "Exención y limitación de responsabilidad",
        body: [
          "keyboardfast se ofrece «tal cual». Hacemos todo lo posible para que los resultados sean precisos y los datos estén seguros, pero no podemos garantizar que el servicio esté siempre disponible, sin errores, ni que nunca se pierdan datos. En la medida en que lo permita la ley, no somos responsables de los daños indirectos derivados del uso del servicio.",
        ],
      },
      {
        heading: "Fin del uso",
        body: [
          "Puedes dejar de usar el servicio y eliminar tu cuenta en cualquier momento desde el menú de cuenta. Podemos suspender las cuentas que incumplan estas condiciones de forma grave o reiterada.",
        ],
      },
      {
        heading: "Ley aplicable y cambios",
        body: [
          "Estas condiciones se rigen por las leyes de la República de Turquía. Las normas imperativas de protección del consumidor de tu país de residencia no se ven afectadas. Podemos actualizar estas condiciones; la fecha de arriba indica la versión vigente. Preguntas: {email}.",
        ],
      },
    ],
  },
};
