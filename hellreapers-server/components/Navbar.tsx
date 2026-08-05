'use client';

import React from 'react';

interface NavbarProps {
  logoUrl: string;
  linkDiscord: string;
  jugadores: {
    cargando: boolean;
    activo: boolean;
    online: number;
    max: number;
  };
}

export default function Navbar({ logoUrl, linkDiscord, jugadores }: NavbarProps) {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/95 backdrop-blur-md border-b-2 border-slate-800'>
      <div className='max-w-7xl mx-auto px-4 h-20 flex items-center justify-between'>
        <a href='#' className='flex items-center gap-3 group'>
          <img
            src={logoUrl}
            alt='Hellreapers Logo'
            className='w-12 h-12 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]'
          />
          <span className='font-minecraft text-sm tracking-wider text-slate-100 uppercase'>HELLREAPERS</span>
        </a>

        <nav className='hidden md:flex items-center gap-6 text-xs font-minecraft tracking-wider text-slate-400'>
          <a href='#inicio' className='hover:text-slate-100 transition'>
            INICIO
          </a>
          <a href='#instalacion' className='hover:text-slate-100 transition'>
            TUTORIAL
          </a>
          <a href='#galeria' className='hover:text-slate-100 transition'>
            GALERÍA
          </a>
          <a href='#mods' className='hover:text-slate-100 transition'>
            MODS
          </a>
          <a href='#reglas' className='hover:text-slate-100 transition'>
            REGLAS
          </a>
        </nav>

        <div className='flex items-center gap-3'>
          <div className='hidden lg:flex h-10 items-center gap-2 bg-slate-900 border border-slate-800 px-3 rounded text-xs font-mono'>
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                jugadores.cargando ? 'bg-amber-400 animate-ping' : jugadores.activo ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span className='text-slate-300 font-bold uppercase'>
              {jugadores.cargando ? 'CARGANDO...' : jugadores.activo ? `${jugadores.online}/${jugadores.max} ONLINE` : 'OFFLINE'}
            </span>
          </div>

          <a
            href={linkDiscord}
            target='_blank'
            rel='noreferrer'
            className='btn-mc-diamond text-white font-minecraft text-[10px] px-4 py-2.5 rounded tracking-wider'
          >
            DISCORD
          </a>
        </div>
      </div>
    </header>
  );
}
