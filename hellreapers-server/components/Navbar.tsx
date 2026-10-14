'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface NavbarProps {
  logoUrl: string;
  linkDiscord: string;
  modsEnabled?: boolean;
  jugadores: {
    cargando: boolean;
    activo: boolean;
    online: number;
    max: number;
  };
}

export default function Navbar({ logoUrl, linkDiscord, modsEnabled = false, jugadores }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const enlaces = [
    { href: '#inicio', label: 'INICIO' },
    { href: '#instalacion', label: 'TUTORIAL' },
    { href: '#galeria', label: 'GALERÍA' },
    ...(modsEnabled ? [{ href: '/mods', label: 'MODS' }] : []),
    { href: '#reglas', label: 'REGLAS' },
  ];

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-[#0b0f17]/95 backdrop-blur-md border-b-2 border-slate-800'>
      <div className='max-w-7xl mx-auto px-4 h-20 flex items-center justify-between'>
        <a href='#inicio' className='flex items-center gap-3 group'>
          <Image
            src={logoUrl}
            alt=''
            width={48}
            height={48}
            priority
            className='w-12 h-12 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]'
          />
          <span className='font-minecraft text-sm tracking-wider text-slate-100 uppercase'>HELLREAPERS</span>
        </a>

        <nav aria-label='Navegación principal' className='hidden md:flex items-center gap-6 text-xs font-minecraft tracking-wider text-slate-400'>
          {enlaces.map((enlace) => (
            <a key={enlace.href} href={enlace.href} className='hover:text-slate-100 transition'>
              {enlace.label}
            </a>
          ))}
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

          <button
            type='button'
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            aria-expanded={menuAbierto}
            aria-controls='menu-movil'
            aria-label={menuAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className='md:hidden flex h-10 w-10 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-200'
          >
            <span aria-hidden='true' className='text-xl leading-none'>
              {menuAbierto ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div id='menu-movil' className='md:hidden border-t border-slate-800 bg-[#0b0f17]/98 backdrop-blur-md'>
          <nav aria-label='Navegación móvil' className='flex flex-col px-4 py-3 text-xs font-minecraft tracking-wider text-slate-300'>
            {enlaces.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                onClick={() => setMenuAbierto(false)}
                className='rounded px-2 py-3 transition hover:bg-slate-800/60 hover:text-slate-100'
              >
                {enlace.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
