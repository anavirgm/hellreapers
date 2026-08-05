'use client';

import React from 'react';

interface InstalacionSectionProps {
  linkModpack: string;
}

export default function InstalacionSection({ linkModpack }: InstalacionSectionProps) {
  const pasos = [
    { paso: '01', title: 'Java 17', desc: 'Ten instalado Java en tu equipo.' },
    { paso: '02', title: 'Forge 1.20.1', desc: 'Descarga e instala Forge para la versión 1.20.1.' },
    { paso: '03', title: 'Descargar Zip', desc: 'Obtén el archivo comprimido del modpack.' },
    { paso: '04', title: 'Pegar Mods', desc: 'Descomprime y copia los mods en tu carpeta .minecraft/mods.' },
  ];

  return (
    <section id='instalacion' className='py-30 px-4 max-w-7xl mx-auto'>
      <div className='mc-card-highlight p-8 md:p-12 rounded-3xl relative overflow-hidden'>
        <div className='max-w-2xl mb-10'>
          <span className='text-slate-400 font-minecraft text-[10px] uppercase'>PASO A PASO</span>
          <h2 className='text-2xl sm:text-3xl font-minecraft text-white mt-2'>¿CÓMO ENTRAR?</h2>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {pasos.map((p, idx) => (
            <div key={idx} className='bg-slate-900/90 p-5 rounded-xl border border-slate-700 space-y-2'>
              <span className='font-minecraft text-base text-slate-200 block'>{p.paso}</span>
              <h3 className='text-base font-bold text-white'>{p.title}</h3>
              <p className='text-slate-400 text-xs leading-relaxed'>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className='mt-10 text-center'>
          <a
            href={linkModpack}
            target='_blank'
            rel='noreferrer'
            className='inline-block btn-mc-emerald text-white font-minecraft text-xs px-8 py-4 rounded cursor-pointer'
          >
            📥 DESCARGAR MODPACK (.ZIP)
          </a>
        </div>
      </div>
    </section>
  );
}
