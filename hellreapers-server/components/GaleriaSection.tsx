'use client';

import React from 'react';
import Image from 'next/image';

interface Captura {
  url: string;
  titulo: string;
  desc: string;
}

interface GaleriaSectionProps {
  capturas: Captura[];
  onSelectImage: (url: string) => void;
}

export default function GaleriaSection({ capturas, onSelectImage }: GaleriaSectionProps) {
  return (
    <section id='galeria' className='py-30 px-4 max-w-7xl mx-auto'>
      <div className='text-center max-w-2xl mx-auto mb-12'>
        <span className='text-slate-400 font-minecraft text-[10px] uppercase'>GALERÍA</span>
        <h2 className='text-2xl sm:text-3xl font-minecraft text-white mt-1'>MUNDO Y AVENTURA</h2>
        <p className='text-slate-400 mt-2 text-sm'>Echa un vistazo a los paisajes y la experiencia dentro de Hellreapers.</p>
      </div>

      <div className='grid md:grid-cols-3 gap-6'>
        {capturas.map((img) => (
          <button
            key={img.url}
            type='button'
            onClick={() => onSelectImage(img.url)}
            aria-label={`Ampliar captura: ${img.titulo}`}
            className='mc-card rounded-2xl overflow-hidden cursor-pointer group hover:border-sky-500/50 transition-all duration-300 text-left w-full'
          >
            <div className='relative h-48 overflow-hidden'>
              <Image
                src={img.url}
                alt={img.titulo}
                width={1600}
                height={881}
                sizes='(min-width: 768px) 33vw, 100vw'
                className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-500'
              />
              <div className='absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors' />
              <span className='absolute bottom-3 right-3 bg-slate-900/80 text-white p-2 rounded text-xs font-minecraft border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity'>
                <span aria-hidden='true'>🔍 </span>AMPLIAR
              </span>
            </div>
            <div className='p-4 bg-slate-900/60'>
              <h3 className='font-bold text-white text-base'>{img.titulo}</h3>
              <p className='text-slate-400 text-xs mt-1'>{img.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
