'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  // IP que se le muestra al usuario para conectarse
  const IP_MOSTRADA = 'photography-representations.gl.joinmc.link';
  
  // IP real para hacer la consulta técnica a la API sin bloqueos del túnel
  const IP_API = '147.185.221.225'; 

  const LINK_DISCORD = 'https://discord.gg/tu-comunidad';
  const LINK_MODPACK = 'https://mediafire.com/tu-modpack-1.20.1';
  const URL_IMAGEN_FONDO = '/images/banner.png';

  const [copiado, setCopiado] = useState(false);
  const [reglaAbierta, setReglaAbierta] = useState<number | null>(null);
  const [modalContenido, setModalContenido] = useState<'terminos' | 'privacidad' | null>(null);
  const [jugadores, setJugadores] = useState({ online: 0, max: 0, activo: false, cargando: true });

  // Consulta de estado inmediata
  useEffect(() => {
    const consultarServidor = async () => {
      try {
        // Consultamos con la IP directa que obtuvimos de tu ping
        const res = await fetch(`https://api.mcsrvstat.us/3/${IP_API}`);
        const data = await res.json();

        if (data && data.online) {
          setJugadores({
            online: data.players?.online || 0,
            max: data.players?.max || 0,
            activo: true,
            cargando: false,
          });
        } else {
          setJugadores({ online: 0, max: 0, activo: false, cargando: false });
        }
      } catch (error) {
        setJugadores({ online: 0, max: 0, activo: false, cargando: false });
      }
    };

    consultarServidor();
    const intervalo = setInterval(consultarServidor, 15000); // Revisa cada 15 segundos
    return () => clearInterval(intervalo);
  }, [IP_API]);

  // Copia el dominio que el usuario necesita en su juego
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

  // Alternar el estado de las reglas desplegables
  const toggleRegla = (id: number) => {
    setReglaAbierta((prev) => (prev === id ? null : id));
  };

  const stats = [
    { label: 'VERSIÓN', val: '1.20.1', color: 'text-slate-100' },
    { label: 'RENDIMIENTO', val: '20 TPS', color: 'text-emerald-400' },
    { label: 'MODS', val: '+80', color: 'text-slate-100' },
    { label: 'COMUNIDAD', val: 'DISCORD', color: 'text-sky-400' },
  ];

  const modsPrincipales = [
    { nombre: 'The Aether', cat: 'Dimensión', desc: 'Explora las islas flotantes en el cielo, nuevos materiales, estructuras y jefes.', icono: '☁️' },
    { nombre: 'Terralith', cat: 'Mundo', desc: 'Generación de terreno avanzada con casi 100 biomas naturales sin añadir bloques extra.', icono: '🏔️' },
    { nombre: "Farmer's Delight", cat: 'Cocina', desc: 'Amplía la agricultura y gastronomía con nuevas cosechas, platillos e ingredientes.', icono: '🍳' },
    { nombre: 'Deeper and Darker', cat: 'Dimensión', desc: 'Aventúrate más allá de la ciudad del Deep Dark en la dimensión del Otherside.', icono: '👁️' },
    { nombre: 'Sophisticated Backpacks', cat: 'Utilidad', desc: 'Mochilas personalizables con mejoras de almacenamiento, alimentación e ítems.', icono: '🎒' },
    { nombre: 'Waystones', cat: 'Viaje', desc: 'Puntos de teletransporte para moverte velozmente por todo el mapa.', icono: '🗿' },
  ];

  const reglas = [
    { id: 1, t: 'Respeto mutuo y buena convivencia', d: 'Prohibido el acoso, la discriminación, Insultos o la toxicidad en los chats del juego o Discord.' },
    { id: 2, t: 'Prohibido el uso de Cheats / X-Ray', d: 'El uso de hacks, clientes modificados no autorizados o X-Ray resultará en baneo permanente.' },
    { id: 3, t: 'No Griefing ni Robos', d: 'Respeta las edificaciones y granjas de otros jugadores, incluso en áreas sin proteger.' },
    { id: 4, t: 'Optimización de Redstone', d: 'Evita crear bucles infinitos o granjas masivas que afecten los TPS globales del servidor.' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] bg-mc-pattern text-slate-100 relative selection:bg-slate-700 selection:text-white">
      
      {/* 1. NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/95 backdrop-blur-md border-b-2 border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/favicon.ico" 
              alt="Hellreapers Logo" 
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-minecraft text-sm tracking-wider text-slate-100 uppercase">
              HELLREAPERS
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-minecraft tracking-wider text-slate-400">
            <a href="#inicio" className="hover:text-slate-100 transition">INICIO</a>
            <a href="#instalacion" className="hover:text-slate-100 transition">TUTORIAL</a>
            <a href="#mods" className="hover:text-slate-100 transition">MODS</a>
            <a href="#reglas" className="hover:text-slate-100 transition">REGLAS</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded text-xs font-mono">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  jugadores.cargando
                    ? 'bg-amber-400 animate-ping'
                    : jugadores.activo
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-rose-500'
                }`}
              />
              <span className="text-slate-300 font-bold uppercase">
                {jugadores.cargando
                  ? 'CARGANDO...'
                  : jugadores.activo
                  ? `${jugadores.online}/${jugadores.max} ONLINE`
                  : 'OFFLINE'}
              </span>
            </div>

            <a
              href={LINK_DISCORD}
              target="_blank"
              rel="noreferrer"
              className="btn-mc-diamond text-white font-minecraft text-[10px] px-4 py-2.5 rounded tracking-wider"
            >
              DISCORD ↗
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="inicio" className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={URL_IMAGEN_FONDO}
            alt="Hellreapers Background"
            className="w-full h-full object-cover object-center scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/60 via-[#0b0f17]/85 to-[#0b0f17]" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-700 text-slate-300 text-base font-minecraft px-4 py-2 rounded shadow-lg">
            <span>⚔️</span> SURVIVAL MODDED 1.20.1 
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none drop-shadow-2xl">
            ¡BIENVENIDO A <br />
            <span className="font-minecraft text-sky-400 mc-text-glow text-3xl sm:text-5xl lg:text-6xl block mt-3">
              HELLREAPERS!
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Explora un mundo cúbico infinito potenciado con aventura, magia ancestral y una comunidad activa.
          </p>

          {/* BOTÓN COPIAR IP CORREGIDO */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="mc-card-highlight p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left px-2">
                <span className="text-[10px] font-minecraft text-slate-400 uppercase block mb-1">DIRECCIÓN IP</span>
                <span className="text-base font-mono font-bold text-slate-100 select-all">{IP_MOSTRADA}</span>
              </div>

              <button
                type="button"
                onClick={copiarIP}
                className="w-full sm:w-auto btn-mc-emerald text-white font-minecraft text-[10px] px-5 py-3 rounded cursor-pointer active:scale-95 transition"
              >
                {copiado ? '¡COPIADO!' : 'COPIAR IP'}
              </button>
            </div>
          </div>

          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="mc-card p-4 rounded-xl text-center border-l-4 border-l-slate-600">
                <span className={`text-xl font-black block ${s.color}`}>{s.val}</span>
                <span className="text-[10px] font-minecraft text-slate-400 block mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INSTALACIÓN */}
      <section id="instalacion" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="mc-card-highlight p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <span className="text-slate-400 font-minecraft text-[10px] uppercase">PASO A PASO</span>
            <h2 className="text-2xl sm:text-3xl font-minecraft text-white mt-2">¿CÓMO ENTRAR?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { paso: '01', title: 'Java 17', desc: 'Instala Java 17 de 64 bits en tu equipo.' },
              { paso: '02', title: 'Forge 1.20.1', desc: 'Descarga e instala Forge para la versión 1.20.1.' },
              { paso: '03', title: 'Descargar Zip', desc: 'Obtén el archivo comprimido del modpack.' },
              { paso: '04', title: 'Pegar Mods', desc: 'Descomprime y copia los mods en tu carpeta .minecraft/mods.' },
            ].map((p, idx) => (
              <div key={idx} className="bg-slate-900/90 p-5 rounded-xl border border-slate-700 space-y-2">
                <span className="font-minecraft text-base text-slate-200 block">{p.paso}</span>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={LINK_MODPACK}
              target="_blank"
              rel="noreferrer"
              className="inline-block btn-mc-emerald text-white font-minecraft text-xs px-8 py-4 rounded cursor-pointer"
            >
              📥 DESCARGAR MODPACK (.ZIP)
            </a>
          </div>
        </div>
      </section>

      {/* 4. MODS */}
      <section id="mods" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-minecraft text-white tracking-wide">
            MODS DESTACADOS
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Una selección de los mods instalados en el servidor para enriquecer la experiencia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modsPrincipales.map((mod, index) => (
            <div key={index} className="mc-card p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{mod.icono}</span>
                <span className="text-[10px] font-minecraft text-slate-300 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded">
                  {mod.cat}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{mod.nombre}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. REGLAS DESPLEGABLES CORREGIDAS */}
      <section id="reglas" className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-minecraft text-white">REGLAS DEL SERVIDOR</h2>
          <p className="text-xs text-slate-400 mt-2">Haz clic en cualquier regla para desplegar la información</p>
        </div>

        <div className="space-y-4">
          {reglas.map((r) => {
            const isOpen = reglaAbierta === r.id;
            return (
              <div key={r.id} className="mc-card rounded-xl overflow-hidden border border-slate-800">
                <button
                  type="button"
                  onClick={() => toggleRegla(r.id)}
                  className="w-full p-5 text-left flex items-center justify-between cursor-pointer focus:outline-none hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-minecraft text-slate-200 text-xs">
                      0{r.id}
                    </span>
                    <h3 className="font-bold text-white text-base">{r.t}</h3>
                  </div>
                  <span className="text-slate-300 font-bold text-xl font-mono px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-900/30">
                    <p className="text-slate-300 text-sm sm:pl-12 leading-relaxed">
                      {r.d}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="border-t-2 border-slate-800 bg-[#070a10] py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-400">
          <div>
            <span className="font-minecraft text-sm text-slate-200 uppercase block mb-3">HELLREAPERS</span>
            <p>Servidor Survival Modded de Minecraft 1.20.1.</p>
          </div>
          <div>
            <span className="font-minecraft text-[10px] text-white uppercase block mb-3">Navegación</span>
            <p className="space-x-2">
              <a href="#inicio" className="hover:text-slate-200">Inicio</a> • 
              <a href="#mods" className="hover:text-slate-200">Mods</a> • 
              <a href="#instalacion" className="hover:text-slate-200">Tutorial</a>
            </p>
          </div>
          <div>
            <span className="font-minecraft text-[10px] text-white uppercase block mb-3">Legal</span>
            <div className="space-y-2">
              <p>© {new Date().getFullYear()} Hellreapers. No afiliado con Mojang / Microsoft.</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setModalContenido('terminos')}
                  className="text-sky-400 hover:underline cursor-pointer"
                >
                  Términos y Condiciones
                </button>
                <button
                  type="button"
                  onClick={() => setModalContenido('privacidad')}
                  className="text-sky-400 hover:underline cursor-pointer"
                >
                  Política de Privacidad
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 7. MODAL LEGAL */}
      {modalContenido && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="mc-card-highlight max-w-2xl w-full p-6 sm:p-8 rounded-2xl relative space-y-4 max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setModalContenido(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono text-xl font-bold bg-slate-800 px-3 py-1 rounded border border-slate-700 cursor-pointer"
            >
              ✕
            </button>

            {modalContenido === 'terminos' ? (
              <>
                <h3 className="font-minecraft text-lg text-white">TÉRMINOS Y CONDICIONES</h3>
                <div className="text-slate-300 text-xs sm:text-sm space-y-3 leading-relaxed border-t border-slate-800 pt-4">
                  <p>1. <strong>Uso del Servidor:</strong> Al acceder al servidor Hellreapers, aceptas respetar las normas comunitarias y a los administradores.</p>
                  <p>2. <strong>Baneos y Sanciones:</strong> Nos reservamos el derecho de sancionar o denegar el acceso a cualquier jugador que rompa las reglas o promueva un ambiente tóxico.</p>
                  <p>3. <strong>Sin Afiliación:</strong> Este servidor es una comunidad independiente y no está afiliado ni avalado por Mojang AB o Microsoft.</p>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-minecraft text-lg text-white">POLÍTICA DE PRIVACIDAD</h3>
                <div className="text-slate-300 text-xs sm:text-sm space-y-3 leading-relaxed border-t border-slate-800 pt-4">
                  <p>1. <strong>Datos Recopilados:</strong> Únicamente recopilamos información técnica básica como tu nombre de usuario dentro de Minecraft y dirección IP con el único fin de permitir el acceso al servidor.</p>
                  <p>2. <strong>Uso de Información:</strong> No compartimos ni vendemos tus datos a ningún tercero.</p>
                  <p>3. <strong>Cookies:</strong> Esta página web utiliza únicamente almacenamiento local básico para guardar preferencias del usuario en tu navegador.</p>
                </div>
              </>
            )}

            <div className="pt-4 text-right">
              <button
                type="button"
                onClick={() => setModalContenido(null)}
                className="btn-mc-diamond text-white font-minecraft text-xs px-5 py-2.5 rounded cursor-pointer"
              >
                ENTENDIDO
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}