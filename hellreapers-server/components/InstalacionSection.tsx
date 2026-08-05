'use client';

import React from 'react';

interface InstalacionSectionProps {
  linkModpack: string;
}

export default function InstalacionSection({ linkModpack }: InstalacionSectionProps) {
  const pasos = [
    { paso: '01', title: 'Java 17', desc: 'Instala Java 17 de 64 bits en tu equipo.' },
    { paso: '02', title: 'Forge 1.20.1', desc: 'Instala el launcher de Forge para la versión 1.20.1.' },
    { paso: '03', title: 'Pegar Mods', desc: 'Descarga el ZIP y mueve los mods a .minecraft/mods.' },
    { paso: '04', title: 'Copiar IP', desc: 'Copia la dirección del servidor usando el botón de arriba.' },
    { paso: '05', title: '¡A Jugar!', desc: 'Abre el juego, ve a Multijugador, pega la IP y conéctate.' },
  ];

  return (
    <section id='instalacion' className='py-20 px-4 max-w-7xl mx-auto'>
      <div className='mc-card-highlight p-6 md:p-12 rounded-3xl relative overflow-hidden'>
        <div className='max-w-2xl mb-8 md:mb-10'>
          <span className='text-slate-400 font-minecraft text-[10px] uppercase'>PASO A PASO</span>
          <h2 className='text-2xl sm:text-3xl font-minecraft text-white mt-2'>¿CÓMO ENTRAR?</h2>
        </div>

        {/* Adaptado a 5 columnas en pantallas grandes */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6'>
          {pasos.map((p, idx) => (
            <div key={idx} className='bg-slate-900/90 p-5 rounded-xl border border-slate-700 space-y-2 flex flex-col justify-between'>
              <div>
                <span className='font-minecraft text-sm text-sky-400 block mb-1'>{p.paso}</span>
                <h3 className='text-sm sm:text-base font-bold text-white'>{p.title}</h3>
                <p className='text-slate-400 text-xs leading-relaxed mt-2'>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 md:mt-10 text-center'>
          <a
            href={linkModpack}
            target='_blank'
            rel='noreferrer'
            className='inline-block btn-mc-emerald text-white font-minecraft text-xs px-8 py-4 rounded cursor-pointer active:scale-95 transition'
          >
            📥 DESCARGAR MODPACK (.ZIP)
          </a>
        </div>
      </div>
    </section>
  );
}