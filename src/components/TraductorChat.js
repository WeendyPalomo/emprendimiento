// src/components/TraductorChat.js
import { createContext, useContext, useState } from 'react';

export const ChatLanguageContext = createContext();

export const ChatLanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Idioma por defecto

  // ✅ Textos fijos del sistema de chat por idioma
  const staticTexts = {
    es: {
      initialBotMessage: 'Hola, soy tu asistente legal. ¿En qué puedo ayudarte hoy?',
      typingIndicator: 'Escribiendo...',
      noAnswer: 'Lo siento, no tengo una respuesta para esa pregunta.',
      inputPlaceholder: 'Escribe tu pregunta...',
      sendButton: 'Enviar'
    },
    qu: {
      initialBotMessage: 'Ñuqaqa kamachiy yanapakurqani kani. ¿Imanata yanapani kanki?',
      typingIndicator: 'Qillqachkan...',
      noAnswer: 'Ama hina, ñuqa mana respuesta chay tapuykita riqsini.',
      inputPlaceholder: 'Tapuykita qillqay...',
      sendButton: 'Apachiy'
    }
  };

  // ✅ Preguntas frecuentes traducidas
  const translations = [
   [
    {
        id: 1,
        keywords: ['herencia', 'testamento', 'sucesión'],
        pregunta: {
        es: '¿Cómo se tramita una herencia en Ecuador?',
        qu: '¿Imanalla Ecuadorpi mirayta rurayta riksinchi?'
        },
        respuesta: {
        es: 'En Ecuador, el proceso de herencia se inicia tras el fallecimiento de una persona. Si hay testamento, se respeta la voluntad del fallecido. Si no, se aplica la sucesión intestada, donde los herederos forzosos (cónyuge, hijos, padres) reciben la legítima. El trámite se realiza ante un notario o un juez, según el caso, y requiere acta de defunción, partida de nacimiento de los herederos, certificado de bienes y pago de impuestos. Es importante asesorarse legalmente para evitar conflictos familiares o repartos injustos.',
        qu: 'Ecuadorpi, mirayta ruray kallarinmi shuk runa wañushpa. Testamento tiyashkaka, wañushkapa munayta yuyarishkanchik. Mana testamento tiyashkaka, kamachikwan mirayta churashkan, chaypi kushilla/kusa, wawakuna, tayta-mamakuna mirayta chaskinkuna. Kay rurayka notarioman uta juezman rurashka kan, imashina kaspik. Wañushkapa killkashka, miraykunapa wacharishka, charishkapa killkashka, shinallatak impuestokunata pagayta munan. Kamachik yachachikkunawan rimanakuy allinmi, churanakuy paktachiyta, chaymi chikanakuyta harkayta ushan.'
        }
    },
    {
        id: 2,
        keywords: ['divorcio', 'separación', 'custodia'],
        pregunta: {
        es: '¿Qué necesito para iniciar un proceso de divorcio?',
        qu: '¿Imanata munani divorcio rurayta kallarikpak?'
        },
        respuesta: {
        es: 'Para iniciar un divorcio en Ecuador, se puede proceder por mutuo acuerdo o por causales legales. En ambos casos se presenta una demanda ante el juez competente. Si hay hijos, debe regularse la pensión de alimentos, custodia y régimen de visitas. Si no hay acuerdo, el proceso puede ser más largo. También puede realizarse ante notario si no hay hijos menores ni bienes. Es recomendable el apoyo de un abogado para garantizar el respeto a los derechos de ambas partes.',
        qu: 'Ecuadorpi divorcio rurayta kallarikpak, ishkankuna rimanakushpa, uta kamachikmanta causakunawan ruray ushan. Ishkayninmanta, juezman mañayta apamun. Wawakuna tiyashkaka, mikuyta pagay, rikuyta yachay, watukuna tiyakpak paktanakuyta rurayta munan. Mana paktanakushkaka, rurayka unaylla kan. Wawakuna uchilla, charishkakuna mana tiyashkaka, notariomanmi ruray ushan. Abogadopa yanapaymi allin, shinami ishkay shimi allikayta pakta rurayta ushan.'
        }
    },
    {
        id: 3,
        keywords: ['tierra', 'posesión', 'registro'],
        pregunta: {
        es: '¿Cómo puedo legalizar una propiedad rural en Ecuador?',
        qu: '¿Imanalla Ecuadorpi chakrapi allpata legalnin?'
        },
        respuesta: {
        es: 'Para legalizar una propiedad rural se requiere demostrar la posesión pacífica y continua por al menos cinco años. Se debe solicitar al Ministerio de Agricultura el proceso de adjudicación, que incluye inspección técnica, pago de tasas, y emisión del certificado de posesión. Luego se puede inscribir en el Registro de la Propiedad. Este proceso es clave para acceder a créditos, programas estatales y evitar disputas legales. Se recomienda acudir a un técnico legal o agrario para el trámite.',
        qu: 'Chakrapi allpata legalninpakmi, shuk runa ñawpaq phishka watata kawsaylla, mana chinkaylla tiyashkata rikuchina munan. Agricultura Ministeriomanmi mañayta apamun, chaypi adjudicación ruraykuna, rikuchik ruray, kullkita pagay, shinallatak posesión killkashkapa churay. Chaymanta Propiedadpa Killkaypi killkanakta ushan. Kay ruraymi kallari rurayta, kullkita mañanakuyta, estado ruraykunaman yaykuyta, shinallatak mana churanakuyta chinkayta. Kamachik yachachikkunaman rinakta yanapanakuy allinmi.'
        }
    },
    {
        id: 4,
        keywords: ['créditos agrícolas', 'BanEcuador', 'financiamiento'],
        pregunta: {
        es: '¿Dónde puedo solicitar un crédito para actividades agrícolas o ganaderas?',
        qu: '¿Maypita chakramanta uta uywamanta ruraypak kullkita mañani?'
        },
        respuesta: {
        es: 'Los agricultores, ganaderos y emprendedores rurales pueden solicitar créditos productivos en entidades como BanEcuador, que ofrece líneas de financiamiento con bajas tasas de interés y plazos flexibles. Estos créditos están diseñados para fomentar la producción rural, mejorar tecnología y apoyar cadenas productivas. También se puede acceder a programas del Ministerio de Agricultura y Ganadería (MAG), como fondos no reembolsables o programas de incentivo agrícola. Es importante presentar un plan de inversión, copia de cédula, RUC si aplica, y documentación técnica del proyecto para ser considerado beneficiario.',
        qu: 'Chakrakkuna, uywakuna, chakrapi rurayta kallarishkakuna, BanEcuador shina kullkita mañanakun. Chaypi uchilla intereskunawan, mana rigidokunata rurayta yanapanakuna. Kay kullkikunaka chakrapi rurayta alli kawsachiypakmi, mushuk yachaykunata ruraypakmi, shina llankay ruraykunata yanapan. Shinallatak Agricultura y Ganadería Ministeriopa (MAG) rural programakunaman yaykuy ushan, mana kutikullkikunawan, rurayta yanapanakuykunawan. Kullkita mañaypak, ruraypa plan, cédula, RUC tiyashkaka, shinallatak proyectopa yachay killkashkakunata churayta munan.'
        }
    },
    {
        id: 5,
        keywords: ['legalización de tierras', 'adjudicación de terrenos', 'posesión efectiva'],
        pregunta: {
        es: '¿Qué requisitos necesito para legalizar un terreno rural sin escrituras?',
        qu: '¿Imanata munani legalnin rurayta mana papelinwan?'
        },
        respuesta: {
        es: 'Debes demostrar la posesión pacífica, pública e ininterrumpida del terreno durante al menos cinco años. El trámite de adjudicación se realiza en el Ministerio de Agricultura y Ganadería (MAG), donde debes presentar documentos como planos georreferenciados, certificado de no poseer otro terreno, acta de posesión, declaración juramentada y pago de tasas. Una vez aprobado, se te entregará el título de propiedad que deberás inscribir en el Registro de la Propiedad. Este proceso es clave para obtener seguridad jurídica y acceso a créditos.',
        qu: 'Terrenota kawsaylla, rimaylla, mana chinkaylla ñawpaq phishka watata tiyashkata rikuchiyta munanki. Adjudicación rurayka Agricultura y Ganadería Ministeriomanmi rurashkan. Kaypi chay ruraypak apamunki: allpapa georreferenciadokuna, shuk allpa mana charishkakapa killkashka, tiyashkapa acta, juramentashka willay, kullkita pagay. Chayta aprobashka kachun, charishkapa killkashkata churankichu, chayta Propiedad Killkaypi killkanakanki. Kay ruraymi allpakapa kamachikta charik, kullkita mañanakuyta yanapak.'
        }
    },
    {
        id: 6,
        keywords: ['violencia de género', 'denuncia', 'protección'],
        pregunta: {
        es: '¿Dónde puedo denunciar violencia de género en el área rural?',
        qu: '¿Maypita warmita llakichishkata willani chakrapi?'
        },
        respuesta: {
        es: 'Puedes denunciar violencia de género en la Unidad Judicial especializada más cercana, en la Fiscalía o en una UPC. También puedes llamar al ECU-911. La Ley Orgánica para Prevenir y Erradicar la Violencia contra las Mujeres protege a víctimas con medidas como boletas de auxilio, restricciones al agresor, acompañamiento psicológico y atención médica. No necesitas abogado para presentar la denuncia. Hay casas de acogida disponibles en varias provincias que te pueden asistir.',
        qu: 'Warmita llakichishkata willayta ushanki asha kawsaypa Juezpa Wasipi, Fiscalía ukupi uta UPC ukupi. ECU-911man llamayta ushankipash. Warmikunata Llakiwan Harkana Kamachik (Ley Orgánica para Prevenir y Erradicar la Violencia contra las Mujeres) harkana ruraykunawan yanaparin: yanapay killkashkakuna, llakichikta harkana, yuyaywan yanapay, hampinakunawan yanapay. Mana abogadota minishtinki willayta apanakapak. Achka markakunapi wasikuna tiyankuna yanapayta churaypak.'
        }
    },
    {
        id: 7,
        keywords: ['pensión de alimentos', 'juicio de alimentos', 'derechos de los hijos'],
        pregunta: {
        es: '¿Cómo puedo demandar al padre o madre de mis hijos si no pasa pensión?',
        qu: '¿Imanalla ñukaka wawapa taytaman uta mamaman mañani mikuyta mana pagashkaka?'
        },
        respuesta: {
        es: 'Debes presentar una demanda de alimentos en la Unidad Judicial de Familia del cantón donde vive el menor. Necesitas la partida de nacimiento del hijo, cédula del demandante, y si tienes, datos del trabajo del demandado. El juez establecerá una pensión provisional según el baremo oficial y citará a audiencia. Si no cumple, se puede iniciar un proceso de apremio (detención) o retención de cuentas. La pensión es obligatoria por ley.',
        qu: 'Cantónpi tiyak wawakunapa Ayllu Juzgadopi mikuy mañanakuyta apamunki. Wawapa wacharishkapa killkashka, mañakunapa cédula, shinallatak mana pagakunapa llamkaypi willay tiyashkaka chaykunata apamunki. Juezmi mikuyta kamachik killkashmanta churanka, shinallatak rimaykunaman kayachinka. Mana paktachishkaka, harkay rurayta kallarinkapakmi, shina kaptin kullkikunata kutina kashkan. Mikuyta pagaykamanta kamachik rimashka kan.'
        }
    },
    {
        id: 8,
        keywords: ['sucesión intestada', 'testamento', 'posesión efectiva'],
        pregunta: {
        es: '¿Qué pasa si un familiar muere sin dejar testamento?',
        qu: '¿Imata pasan shuk ayllu wañushpa mana testamento sakishkaka?'
        },
        respuesta: {
        es: 'Si una persona fallece sin dejar testamento, se inicia un proceso de sucesión intestada. Los herederos forzosos (cónyuge, hijos, padres) deben presentar una solicitud de posesión efectiva en la notaría (si no hay conflictos) o en el juzgado (si hay oposición). Se requiere acta de defunción, partidas de nacimiento de los herederos y certificado de bienes. El juez o notario determinará la distribución de la herencia según el Código Civil. Los bienes deben registrarse en el catastro correspondiente.',
        qu: 'Shuk runa wañushpa mana testamento sakishkaka, kamachikman mirayta churayta kallarinmi. Kushilla/kusa, wawakuna, taytamamakuna notariamanmi mañayta apamun, mana churanakuykuna kaspika, uta juzgadomanmi churanakuykuna tiyashkaka. Wañushkapa killkashka, miraykunapa wacharishka, charishkapa killkashkakunata apamun. Juez uta notariomi mirayta rakina, Código Civilpi rimaywan. Charishkakunaka katastrupi killkanakun.'
        }
    },
    {
        id: 9,
        keywords: ['tierra comunal', 'pueblos indígenas', 'territorios colectivos'],
        pregunta: {
        es: '¿Qué derechos tienen las comunidades sobre tierras comunales?',
        qu: '¿Imata ayllukunaka allpa tantanakuypi allikayta charinkuna?'
        },
        respuesta: {
        es: 'Las comunidades indígenas, afroecuatorianas y montubias tienen derechos colectivos sobre sus territorios ancestrales, según la Constitución del Ecuador y la Ley Orgánica de Tierras Rurales. No pueden ser enajenadas ni embargadas. La comunidad debe estar registrada y organizada. Pueden decidir el uso del suelo, explotar recursos naturales respetando la consulta previa, y acceder a programas estatales. También pueden inscribir sus tierras colectivas en el Registro de la Propiedad como un solo predio comunal.',
        qu: 'Runa ayllukuna, afroecuatorianokuna, montubiokuna, paykunapa ñawpa allpakunapi tantanakushkapa allikayta charinkuna, Ecuadorpa Constituciónwan, chakrapura allpakunapa kamachikwan. Mana chinkayta, mana kunayta ushan. Aylluka killkashka, tantanakushka kashkakunata munan. Allpapi imashina llamkakushka, pachamama charishkakunata ruranakunata paykunaka paktachinkapak, ñawpa tapuywan yuyayta riksishpa. Shinallatak paykunaka ayllupura allpakunata Propiedad Killkaypi shuk killkashka shina killkaptin ushan.'
        }
    },
    {
        id: 10,
        keywords: ['arrendamiento', 'inquilino', 'desalojo'],
        pregunta: {
        es: '¿Cuáles son mis derechos como inquilino en una vivienda arrendada?',
        qu: '¿Imata allikayta charini wasipi arriendashka tiyakpika?'
        },
        respuesta: {
        es: 'Como inquilino en Ecuador, tienes derecho a un contrato de arrendamiento escrito, con cláusulas claras sobre el canon, duración y obligaciones. El arrendador no puede desalojarte sin orden judicial. Está prohibido subir el arriendo arbitrariamente o cortar servicios básicos. Puedes exigir facturas, recibir la vivienda en buen estado, y denunciar abusos en la Defensoría del Pueblo o en el Ministerio de Vivienda. El contrato puede registrarse voluntariamente para mayor seguridad legal.',
        qu: 'Ecuadorpi wasipi arriendashka tiyak runaka, killkashka contratopi tiyana allikayta charinki. Chaypi arriendo kullki, watay, minishtishkakuna kamachishka kankuna. Arriendakuna mana juezpa killkashkawan llukshichiyta ushanichu. Mana kamachikwanmi arriendo jawayta, uta servicioskunata pitayta rurana. Facturakunata mañanki, wasita alli kawsaypi chaskinki, shinallatak mana alli ruraykunata Defensoría del Pueblo ukupi uta Vivienda Ministeriopi willayta ushanki. Contratoka munashpa killkanakunmi, kamachikpi alli tiyayta ruraypak.'
        }
    },
    {
        id: 11,
        keywords: ['acta de nacimiento', 'registro civil', 'inscripción de nacimiento'],
        pregunta: {
            es: '¿Cómo inscribo a mi hijo si nació en casa o en el campo?',
            qu: '¿Imanalla ñuka wawata killkanimi wasipi uta chakrapi wacharishkakpi?'
        },
        respuesta: {
            es: 'Debes acudir al Registro Civil más cercano con el certificado de nacido vivo emitido por un centro de salud, partera o autoridad local. Si no lo tienes, puedes presentar dos testigos que acrediten el nacimiento. También necesitarás tu cédula y la del padre (si aplica). La inscripción es gratuita y obligatoria. Garantiza el acceso a educación, salud y derechos ciudadanos. Puedes hacerlo hasta los 12 años con declaración juramentada.',
            qu: 'Wawata killkayanaykipakmi, kawsaypa kamachikmanta killkashka wacharishkapa willaywan asha Registro Civilman rinanki, hampina wasimanta, parteramanta, uta llakta autoridadmanta apamushkaka. Mana chayta tiyashkakpika, ishkay testigokunata apamunki, paykunaka wacharishkata yachachinkapak. Shinallatak cédulamanta, taytapa cédulapash tiyashkaka apamunki. Kay killkay mana kullkiwanmi, shinallatak kamachikwanmi. Chaymi wawapa yachayman, hampiman, kawsaypa allikaykunaman yaykuyta yanapan. Kunan shuk chunka iskay watakama juramentashka willaywan killkayanakta ushan.'
        }
    }

    ]

  ];

  // ✅ Unificamos ambos: textos fijos + preguntas/respuestas
  const chatTranslations = {
    ...staticTexts[language],
    data: translations
  };

  return (
    <ChatLanguageContext.Provider value={{ language, setLanguage, translations: chatTranslations }}>
      {children}
    </ChatLanguageContext.Provider>
  );
};

export const useChatLanguage = () => useContext(ChatLanguageContext);
