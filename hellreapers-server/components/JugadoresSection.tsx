'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Jugador {
  name: string;
  uuid: string;
}

interface JugadoresSectionProps {
  jugadores: {
    cargando: boolean;
    activo: boolean;
    online: number;
    max: number;
    lista: Jugador[];
  };
}

const ALTURA_RENDER = 416; // alto en px del render de cuerpo completo (aspecto 8:13)
const MAX_VISIBLES = 12;

function renderVzgeFull(sujeto: string) {
  // Render 3D de cuerpo completo. `no=shadow` para dibujar nuestra propia sombra,
  // `autocrop` + `stableCamera` para un recorte prolijo con ángulo estable.
  return `https://vzge.me/full/${ALTURA_RENDER}/${sujeto}?no=shadow&autocrop&stableCamera`;
}

function CuerpoJugador({ sujeto, indice }: { sujeto: string; indice: number }) {
  return (
    <div className='relative flex h-56 w-full items-end justify-center overflow-visible sm:h-64'>
      {/* Halo de luz detrás del jugador */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-400/15 blur-3xl' />

      {/* Sombra bajo los pies */}
      <div className='pointer-events-none absolute bottom-1 left-1/2 h-3 w-24 -translate-x-1/2 rounded-[50%] bg-black/45 blur-sm' />

      <img
        src={renderVzgeFull(sujeto)}
        alt={sujeto}
        title={sujeto}
        loading='lazy'
        decoding='async'
        draggable={false}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          if (!img.src.includes('X-Steve')) img.src = renderVzgeFull('X-Steve');
        }}
        className='animate-float-slow relative h-full w-auto select-none object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105'
        style={{ animationDelay: `${(indice % 4) * 700}ms` }}
      />
    </div>
  );
}

function TarjetaJugador({ jugador, indice }: { jugador: Jugador; indice: number }) {
  return (
    <div
      style={{ transitionDelay: `${Math.min(indice * 90, 720)}ms` }}
      className='transition-all duration-700 ease-out'
    >
      <div className='mc-card group flex h-full flex-col items-center rounded-2xl p-4 sm:p-5 hover:border-sky-400/60'>
        <CuerpoJugador sujeto={jugador.uuid || jugador.name} indice={indice} />
        <div className='mt-3 flex w-full flex-col items-center gap-2'>
          <span className='max-w-full truncate font-minecraft text-[10px] text-white'>{jugador.name}</span>
          <span className='inline-flex items-center gap-1.5 font-minecraft text-[9px] text-emerald-400'>
            <span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse' />
            EN LÍNEA
          </span>
        </div>
      </div>
    </div>
  );
}

function CuerpoDecorativo({ sujeto, indice }: { sujeto: string; indice: number }) {
  return (
    <div className='relative flex h-44 w-28 flex-col items-center justify-end'>
      <div className='pointer-events-none absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-sky-400/15 blur-2xl' />
      <div className='pointer-events-none absolute bottom-0 left-1/2 h-2.5 w-20 -translate-x-1/2 rounded-[50%] bg-black/45 blur-[2px]' />
      <img
        src={renderVzgeFull(sujeto)}
        alt={sujeto}
        title={sujeto}
        loading='lazy'
        decoding='async'
        draggable={false}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          if (!img.src.includes('X-Steve')) img.src = renderVzgeFull('X-Steve');
        }}
        className='animate-float-slow relative h-40 w-auto select-none object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]'
        style={{ animationDelay: `${(indice % 4) * 700}ms` }}
      />
    </div>
  );
}

function EstadoVacio({ titulo, mensaje }: { titulo: string; mensaje: string }) {
  return (
    <div style={{ transitionDelay: '120ms' }} className='col-span-full transition-all duration-700 ease-out'>
      <div className='mc-card flex flex-col items-center rounded-2xl p-8 text-center sm:p-10'>
        <div className='flex items-end justify-center gap-4'>
          <CuerpoDecorativo sujeto='X-Steve' indice={0} />
          <CuerpoDecorativo sujeto='X-Alex' indice={1} />
        </div>
        <h3 className='mt-4 font-minecraft text-xs text-slate-200'>{titulo}</h3>
        <p className='mt-2 max-w-md text-sm leading-relaxed text-slate-400'>{mensaje}</p>
      </div>
    </div>
  );
}

function Esqueleto() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='mc-card flex h-72 flex-col items-center rounded-2xl p-4'>
          <div className='h-56 w-full animate-pulse rounded-lg bg-slate-700/40' />
          <div className='mt-3 h-3 w-20 animate-pulse rounded bg-slate-700/40' />
        </div>
      ))}
    </div>
  );
}

export default function JugadoresSection({ jugadores }: JugadoresSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [enVista, setEnVista] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnVista(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibles = jugadores.lista.slice(0, MAX_VISIBLES);
  const restantes = jugadores.lista.length - visibles.length;
  const sinDetalle = jugadores.activo && jugadores.online > 0 && jugadores.lista.length === 0;

  const estado: 'listado' | 'sinDetalle' | 'vacio' | 'apagado' = jugadores.activo
    ? visibles.length > 0
      ? 'listado'
      : sinDetalle
        ? 'sinDetalle'
        : 'vacio'
    : 'apagado';

  return (
    <section ref={ref} id='jugadores' className='mx-auto max-w-7xl px-4 py-20'>
      <div className='mx-auto mb-12 max-w-2xl text-center'>
        <span className='font-minecraft text-[10px] uppercase text-slate-400'>Jugadores en línea</span>
        {jugadores.activo && (
          <span className='ml-3 inline-flex translate-y-[-2px] items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 align-middle font-minecraft text-[9px] text-emerald-400'>
            <span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse' />
            EN VIVO · {jugadores.online}/{jugadores.max}
          </span>
        )}
        <h2 className='mt-1 font-minecraft text-2xl text-white sm:text-3xl'>SOBREVIVIENTES EN EL MUNDO</h2>
        <p className='mt-2 text-sm text-slate-400'>
          Los valientes que están explorando HellReapers ahora mismo, en su máximo esplendor.
        </p>
      </div>

      {jugadores.cargando ? (
        <Esqueleto />
      ) : (
        <div
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-700 ${
            enVista ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {estado === 'listado' &&
            visibles.map((j, i) => (
              <TarjetaJugador key={`${j.uuid || j.name}-${i}`} jugador={j} indice={i} />
            ))}

          {estado === 'sinDetalle' && (
            <EstadoVacio
              titulo='JUGADORES EN EL MUNDO SIN LISTAR'
              mensaje={`Hay ${jugadores.online} jugadores conectados ahora mismo, pero la API no reveló sus nombres. ¡Entra y descubrí quiénes son!`}
            />
          )}

          {estado === 'vacio' && (
            <EstadoVacio
              titulo='¡NADIE POR AQUÍ TODAVÍA!'
              mensaje='El mundo hardcore te está esperando. Entrá y convertite en el primer sobreviviente de la temporada.'
            />
          )}

          {estado === 'apagado' && (
            <EstadoVacio
              titulo='EL SERVIDOR ESTÁ APAGADO'
              mensaje='El mundo está oscuro en este momento. Vuelve pronto, los reapers no descansan para siempre...'
            />
          )}
        </div>
      )}

      {estado === 'listado' && restantes > 0 && (
        <p className='mt-6 text-center font-minecraft text-[10px] text-slate-500'>
          Y {restantes} {restantes === 1 ? 'sobreviviente más' : 'sobrevivientes más'} en el mundo...
        </p>
      )}
    </section>
  );
}