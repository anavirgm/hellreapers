'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InstalacionSection from '@/components/InstalacionSection';
import GaleriaSection from '@/components/GaleriaSection';
import ModsSection from '@/components/ModsSection';
import ReglasSection from '@/components/ReglasSection';
import Footer from '@/components/Footer';

export default function Home() {
  const IP_MOSTRADA = 'photography-representations.gl.joinmc.link';
  const IP_PARA_CONSULTAR = 'photography-representations.gl.joinmc.link:30921';
  const LINK_DISCORD = 'https://discord.gg/gmXx5bMUg';
  const LINK_MODPACK = 'https://www.mediafire.com/file/nni1zhcgnyz0ks6/mods.zip/file';
  const URL_IMAGEN_FONDO = '/images/banner.webp';
  const URL_LOGO = '/images/logo.png';

  // Interruptor global de mods.
  // HellReapers es hoy un servidor Hardcore de Fabric SIN mods, así que la sección
  // de mods, la página /mods y el botón del modpack quedan desactivados.
  // El código y los datos se conservan intactos por si vuelven los mods: basta
  // con poner este flag en true.
  const MODS_ENABLED = false;

  const [copiado, setCopiado] = useState(false);
  const [modalContenido, setModalContenido] = useState<'terminos' | 'privacidad' | null>(null);
  const [imagenModal, setImagenModal] = useState<string | null>(null);

  const [jugadores, setJugadores] = useState<{
    online: number;
    max: number;
    activo: boolean;
    cargando: boolean;
    lista: { name: string; uuid: string }[];
  }>({
    online: 0,
    max: 0,
    activo: false,
    cargando: true,
    lista: [],
  });

  useEffect(() => {
    const consultarServidor = async () => {
      try {
        const res = await fetch(`https://api.mcstatus.io/v2/status/java/${IP_PARA_CONSULTAR}`);
        const data = await res.json();

        if (data && data.online) {
          setJugadores({
            online: data.players?.online || 0,
            max: data.players?.max || 0,
            activo: true,
            cargando: false,
            lista: data.players?.list || [],
          });
        } else {
          setJugadores({ online: 0, max: 0, activo: false, cargando: false, lista: [] });
        }
      } catch {
        setJugadores({ online: 0, max: 0, activo: false, cargando: false, lista: [] });
      }
    };

    consultarServidor();
    const intervalo = setInterval(consultarServidor, 15000);
    return () => clearInterval(intervalo);
  }, [IP_PARA_CONSULTAR]);

  const copiarIP = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(IP_MOSTRADA);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = IP_MOSTRADA;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const stats = [
    { label: 'VERSIÓN', val: '26.3', color: 'text-violet-400' },
    { label: 'MODO', val: 'HARDCORE', color: 'text-rose-400' },
    { label: 'ACCESO', val: 'PREMIUM', color: 'text-amber-400' },
    { label: 'COMUNIDAD', val: 'DISCORD', color: 'text-sky-400' },
  ];

  const modsPrincipales = [
    { nombre: 'The Aether', cat: 'Dimensión', desc: 'Explora las islas flotantes en el cielo, nuevos materiales, estructuras y jefes.', icono: '☁️' },
    {
      nombre: 'Terralith',
      cat: 'Mundo',
      desc: 'Generación de terreno avanzada con casi 100 biomas naturales sin añadir bloques extra.',
      icono: '🏔️',
    },
    {
      nombre: "Farmer's Delight",
      cat: 'Cocina',
      desc: 'Amplía la agricultura y gastronomía con nuevas cosechas, platillos e ingredientes.',
      icono: '🍳',
    },
    {
      nombre: 'Deeper and Darker',
      cat: 'Dimensión',
      desc: 'Aventúrate más allá de la ciudad del Deep Dark en la dimensión del Otherside.',
      icono: '👁️',
    },
    {
      nombre: 'Sophisticated Backpacks',
      cat: 'Utilidad',
      desc: 'Mochilas personalizables con mejoras de almacenamiento, alimentación e ítems.',
      icono: '🎒',
    },
    { nombre: 'Waystones', cat: 'Viaje', desc: 'Puntos de teletransporte para moverte velozmente por todo el mapa.', icono: '🗿' },
  ];

  const capturasGaleria = [
    { url: '/images/barco.webp', titulo: 'Naturaleza Impresionante', desc: 'Paisajes y biomas del mundo hardcore' },
    { url: '/images/vaca.webp', titulo: 'Supervivencia Pura', desc: 'Granjas y animales para sobrevivir' },
    { url: '/images/players.webp', titulo: 'Comunidad en Acción', desc: 'Bases y construcciones en equipo' },
  ];

  const reglas = [
    {
      id: 1,
      t: 'Respeto mutuo y buena convivencia',
      d: 'Prohibido el acoso, la discriminación, insultos o la toxicidad en los chats del juego o Discord.',
    },
    {
      id: 2,
      t: 'Prohibido el uso de Cheats / X-Ray',
      d: 'El uso de hacks, clientes modificados no autorizados o X-Ray resultará en baneo permanente.',
    },
    { id: 3, t: 'No Griefing ni Robos', d: 'Respeta las edificaciones y granjas de otros jugadores, incluso en áreas sin proteger.' },
    {
      id: 4,
      t: 'Una sola vida (Hardcore)',
      d: 'La muerte es permanente durante la temporada. No se reviven jugadores ni se restauran sus ítems.',
    },
    {
      id: 5,
      t: 'Sin cuentas alternas',
      d: 'Usar una cuenta alt para evadir una muerte o un baneo resultará en sanción permanente.',
    },
    { id: 6, t: 'Optimización del servidor', d: 'Evita granjas masivas o bucles de redstone que afecten los TPS globales del servidor.' },
  ];

  return (
    <div className='min-h-screen bg-[#0b0f17] bg-mc-pattern text-slate-100 relative selection:bg-slate-700 selection:text-white'>
      <Navbar logoUrl={URL_LOGO} linkDiscord={LINK_DISCORD} jugadores={jugadores} modsEnabled={MODS_ENABLED} />

      <main>
        <HeroSection
          bgUrl={URL_IMAGEN_FONDO}
          logoUrl={URL_LOGO}
          ipMostrada={IP_MOSTRADA}
          copiado={copiado}
          copiarIP={copiarIP}
          jugadores={jugadores}
          stats={stats}
        />

        <InstalacionSection linkModpack={LINK_MODPACK} mostrarModpack={MODS_ENABLED} />

        <GaleriaSection capturas={capturasGaleria} onSelectImage={(url) => setImagenModal(url)} />

        {MODS_ENABLED && <ModsSection mods={modsPrincipales} />}

        <ReglasSection reglas={reglas} />
      </main>

      <Footer logoUrl={URL_LOGO} linkDiscord={LINK_DISCORD} modsEnabled={MODS_ENABLED} onOpenModal={(tipo) => setModalContenido(tipo)} />

      {/* MODAL VISOR DE CAPTURAS DE PANTALLA */}
      {imagenModal && (
        <Modal
          onClose={() => setImagenModal(null)}
          label='Vista ampliada de la captura'
          className='relative max-w-5xl w-full flex flex-col items-center'
        >
          <button
            type='button'
            onClick={() => setImagenModal(null)}
            aria-label='Cerrar vista ampliada'
            className='absolute -top-12 right-0 text-slate-300 hover:text-white font-mono text-xl font-bold bg-slate-800 px-3 py-1 rounded border border-slate-700 cursor-pointer'
          >
            ✕
          </button>
          <img
            src={imagenModal}
            alt='Captura ampliada del servidor HellReapers'
            className='max-h-[85vh] w-auto rounded-xl border-2 border-slate-700 shadow-2xl object-contain'
          />
          <p className='text-slate-400 text-xs font-minecraft mt-4'>Pulsa Esc o haz clic fuera para cerrar</p>
        </Modal>
      )}

      {/* MODAL LEGAL */}
      {modalContenido && (
        <Modal
          onClose={() => setModalContenido(null)}
          labelledBy='modal-legal-title'
          className='mc-card-highlight max-w-2xl w-full p-6 sm:p-8 rounded-2xl relative space-y-4 max-h-[85vh] overflow-y-auto'
        >
          <button
            type='button'
            onClick={() => setModalContenido(null)}
            aria-label='Cerrar ventana'
            className='absolute top-4 right-4 text-slate-400 hover:text-white font-mono text-xl font-bold bg-slate-800 px-3 py-1 rounded border border-slate-700 cursor-pointer'
          >
            ✕
          </button>

          {modalContenido === 'terminos' ? (
            <>
              <h3 id='modal-legal-title' className='font-minecraft text-lg text-white'>
                TÉRMINOS Y CONDICIONES
              </h3>
              <div className='text-slate-300 text-xs sm:text-sm space-y-3 leading-relaxed border-t border-slate-800 pt-4'>
                <p>
                  1. <strong>Uso del Servidor:</strong> Al acceder al servidor Hellreapers, aceptas respetar las normas comunitarias y a los
                  administradores.
                </p>
                <p>
                  2. <strong>Baneos y Sanciones:</strong> Nos reservamos el derecho de sancionar o denegar el acceso a cualquier jugador que rompa las
                  reglas o promueva un ambiente tóxico.
                </p>
                <p>
                  3. <strong>Sin Afiliación:</strong> Este servidor es una comunidad independiente y no está afiliado ni avalado por Mojang AB o
                  Microsoft.
                </p>
              </div>
            </>
          ) : (
            <>
              <h3 id='modal-legal-title' className='font-minecraft text-lg text-white'>
                POLÍTICA DE PRIVACIDAD
              </h3>
              <div className='text-slate-300 text-xs sm:text-sm space-y-3 leading-relaxed border-t border-slate-800 pt-4'>
                <p>
                  1. <strong>Datos Recopilados:</strong> Únicamente recopilamos información técnica básica como tu nombre de usuario dentro de
                  Minecraft y dirección IP con el único fin de permitir el acceso al servidor.
                </p>
                <p>
                  2. <strong>Uso de Información:</strong> No compartimos ni vendemos tus datos a ningún tercero.
                </p>
                <p>
                  3. <strong>Cookies:</strong> Esta página web utiliza únicamente almacenamiento local básico para guardar preferencias del usuario en
                  tu navegador.
                </p>
              </div>
            </>
          )}

          <div className='pt-4 text-right'>
            <button
              type='button'
              onClick={() => setModalContenido(null)}
              className='btn-mc-diamond text-white font-minecraft text-xs px-5 py-2.5 rounded cursor-pointer'
            >
              ENTENDIDO
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
