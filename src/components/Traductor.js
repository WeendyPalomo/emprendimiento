// src/components/Traductor.js
import React, { useState, createContext, useContext } from 'react';
import './Traductor.css'; // Importa los estilos para el botón de traducción
import ToggleSwitch from './ToggleSwitch';

// 1. Crea el Contexto de Idioma
export const LanguageContext = createContext();

// 2. Componente Proveedor de Idioma
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Estado para el idioma actual



  // Función para alternar el idioma
  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'es' ? 'qu' : 'es'));
  };

  // Diccionario de traducciones
  const translations = {
    es: {
      translateButton: 'Traducir a Quichua',
      homeTitle: '¡Bienvenido a tu Asistente Legal Rural!',
      homeParagraph1: 'Aquí encontrarás apoyo y orientación sobre temas legales relevantes para las comunidades rurales, especialmente en la zona de **Chugchilán, Cantón Sigchos, Provincia de Cotopaxi, Ecuador**.',
      homeParagraph2: 'Nuestro objetivo es brindarte información accesible sobre derechos territoriales, uso del agua, conflictos vecinales, temas de familia, trabajo y más.',
      homeStart: 'Puedes empezar:',
      newChatButton: '💬 Iniciar un Nuevo Chat',
      exploreButton: '✨ Explorar Temas Legales',
      homeFooter: 'Utiliza el menú lateral para navegar entre las diferentes secciones. ¡Estamos aquí para ayudarte!',
      sidebarHome: 'Inicio',
      sidebarNewChat: 'Nuevo Chat',
      sidebarExplore: 'Explorar Temas',
      sidebarSearchChats: 'Buscar Chats',
      sidebarTitle: 'Asistente Legal',
      sidebarTagline: 'Chugchilán',
      sidebarFooter: '© 2024 Legal AI',
      newChatTitle: 'Asistente Legal',
      newChatPlaceholder: 'Escribe tu pregunta legal...',
      newChatSend: 'Enviar',
      explorePageTitle: 'Explorar Temas Legales en Chugchilán',
      explorePageDescription: 'Aquí encontrarás información y consejos básicos sobre temas legales relevantes para la comunidad rural de Chugchilán, Sigchos, Cotopaxi, Ecuador.',
      exploreGoToChat: 'Ir al Chat',
      searchChatsTitle: 'Buscar Chats Anteriores',
      searchChatsDescription: 'Aquí podrás buscar y revisar tus conversaciones pasadas con el Asistente Legal.',
      pageNotFound: 'Página no encontrada',
      // Categorías de Explore
      tierra: 'Tierra',
      familia: 'Familia',
      trabajo: 'Trabajo',
      violencia: 'Violencia',
      chat: 'Chat',
      tierraInfo: 'En Chugchilán, los derechos sobre la tierra a menudo se entrelazan con las costumbres ancestrales y la propiedad comunitaria. Es vital conocer la Ley de Tierras Rurales y Territorios Ancestrales para la regularización y protección de la propiedad. En caso de conflictos, la mediación comunitaria es una primera instancia clave.',
      familiaInfo: 'Las dinámicas familiares en Chugchilán pueden tener particularidades culturales. Los temas de matrimonio, uniones de hecho, herencias y custodia de menores se rigen por el Código Civil y de la Niñez y Adolescencia. Se recomienda buscar el diálogo y, si es necesario, acudir a las Tenencias Políticas o Juntas Parroquiales.',
      trabajoInfo: 'Las condiciones laborales en zonas rurales como Chugchilán varían. Es importante conocer los derechos del trabajador establecidos en el Código del Trabajo de Ecuador, incluso para labores agrícolas o artesanales. La seguridad social y los contratos justos son aspectos a considerar. La Oficina de Trabajo puede brindar asesoría.',
      violenciaInfo: 'La violencia de cualquier tipo es inaceptable. En Chugchilán, como en todo el Ecuador, existen leyes para proteger a las víctimas de violencia intrafamiliar y de género. No dudes en denunciar. Puedes acudir a la Policía Nacional, Juntas Cantonales de Protección de Derechos, o la Fiscalía. Hay organizaciones que brindan apoyo psicológico y legal.',
      chatInfo: 'Este es el módulo de chat principal donde puedes hacer tus preguntas directamente al asistente legal. Utiliza palabras clave para obtener respuestas rápidas sobre cualquier tema legal relevante para Chugchilán.',
      noInfo: 'No hay información disponible para esta categoría aún.'
    },
    qu: {
      translateButton: 'Kichwa Rimayman Tikrachiy',
      homeTitle: 'Alli shamushkankichik Kawsaypak Yanapak Killkaman!',
      homeParagraph1: 'Kaypi, Chugchilán kitillipi, Sigchos kitipi, Kutupaksi markapi, Ecuador mama llaktapi kawsak runakunapak allpa, yaku, ayllu, llamkaymanta, shuktak imakunamantapash yachayta tarinkichik.',
      homeParagraph2: 'Ñukanchik munayka, allpa harkaymanta, yaku llamkaymanta, ayllu churanakuykunamanta, llamkaymanta, shuktak imakunamantapash yachayta, tukuykunaman chayakpakmi.',
      homeStart: 'Kaymanta kallarinkichik:',
      newChatButton: '💬 Mushuk Rimayta Kallarichina',
      exploreButton: '✨ Kamachiy Yachaykunata Maskana',
      homeFooter: 'Kuchu rikuchita llamkachiy, shuktak rakuymanta shuktakman purinkapak. ¡Yanapankapakmi kaypi kanchik!',
      sidebarHome: 'Ñawpa Pata',
      sidebarNewChat: 'Mushuk Rimay',
      sidebarExplore: 'Yachaykunata Maskana',
      sidebarSearchChats: 'Ñawpa Rimaykunata Maskana',
      sidebarTitle: 'Kamachiy Yanapak',
      sidebarTagline: 'Chugchilán',
      sidebarFooter: '© 2024 Kamachiy AI',
      newChatTitle: 'Kamachiy Yanapak',
      newChatPlaceholder: 'Tapuyta killkay...',
      newChatSend: 'Kachay',
      explorePageTitle: 'Chugchilán Kamachiy Yachaykunata Maskana',
      explorePageDescription: 'Kaypi, Chugchilán, Sigchos, Kutupaksi, Ecuador mama llaktapi kawsak runakunapak kamachiy yachaykunamanta, yanapak tapuykunamanta, yachaykunamanta tarinkichik.',
      exploreGoToChat: 'Rimayman Rina',
      // Categorías de Explore en Quichua
      tierra: 'Allpa',
      familia: 'Ayllu',
      trabajo: 'Llamkay',
      violencia: 'Mana Alli Ruray',
      chat: 'Rimay',
      tierraInfo: 'Chugchilánpi, allpamanta kamachiykuna, ñawpa kawsaywan, ayllu allpawanmi tantanakushka. Allpa Kamachiyta, Ancestral Allpakunata yachayka, allpata allichinkapak, harkaypakmi sinchi. Churanakuy tiyakpika, ayllu tantanakuywan allichiyka ñawpa yanapaymi.',
      familiaInfo: 'Chugchilán ayllu kawsaypi, shuktak kawsay rikchaykuna tiyan. Kasarakuy, tantanakuy, harkaykuna, wawakunata wakaychaymanta kamachiykuna, Civil Kamachiywan, Wawa, Ñukalla Kamachiywanpashmi pusharin. Rimayta maskay, mana atikpika, Tenencia Política, Parroquia Tantanakuykunamanmi rina kanka.',
      trabajoInfo: 'Chugchilán shina chakrakawsaypi, llamkay ruraykuna shuktakmi. Ecuador Llamkay Kamachiypi churashka llamkaypak hayñikunata yachayka sinchi, chakrakawsaypi, ruraykunapipash. Social Yanapay, alli llamkay churaykuna yachayka sinchi. Llamkay Oficinaka yanapayta kunata ushan.',
      violenciaInfo: 'Mana alli rurayka mana allichu. Chugchilánpi, tukuy Ecuadorpi shina, ayllu ukhupi, kari-warmi mana alli ruraykunamanta harkaypak kamachiykuna tiyan. Mana manchaychu willayta. Policía Nacionalman, Derechos Harkay Tantanakuykunaman, Fiscalía ukumanpashmi rina ushankichik. Shuktak tantanakuykunapash yanapayta kun.',
      chatInfo: 'Kay rimay patapi, kamachiy yanapakman tapuykunata rurayta ushankichik. Chugchilánpi kamachiy yachaykunamanta utka kutichiykunata tarinkapak, sinchi rimaykunata llamkachiy.',
      noInfo: 'Kay yachaymanta mana willay tiyanchu kunanrak.'
    }
  };

  return (

    <LanguageContext.Provider value={{ language, translations: translations[language], toggleLanguage }}>
      <div className="language-toggle-container">
        <ToggleSwitch isOn={language === 'qu'} handleToggle={toggleLanguage} />
      </div>
      {children}
    </LanguageContext.Provider>

  );
};

// 3. Hook personalizado para usar el contexto (opcional, pero buena práctica)
export const useLanguage = () => useContext(LanguageContext);
