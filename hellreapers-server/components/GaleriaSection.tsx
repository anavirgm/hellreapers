'use client';

import React from 'react';

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
    <section id='galeria' className='py-16 px-4 max-w-7xl mx-auto'>
      <div className='text-center max-w-2xl mx-auto mb-12'>
        <span className='text-slate-400 font-minecraft text-[10px] uppercase'>CAPTURAS</span>
        <h2 className='text-2xl sm:text-3xl font-minecraft text-white mt-1'>MUNDO Y AVENTURA</h2>
        <p className='text-slate-400 mt-2 text-sm'>Echa un vistazo a los paisajes y la experiencia dentro de Hellreapers.</p>
      </div>

      <div className='grid md:grid-cols-3 gap-6'>
        {capturas.map((img, idx) => (
          <div
            key={idx}
            onClick={() => onSelectImage(img.url)}
            className='mc-card rounded-2xl overflow-hidden cursor-pointer group hover:border-sky-500/50 transition-all duration-300'
          >
            <div className='relative h-48 overflow-hidden'>
              <img src={img.url} alt={img.titulo} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
              <div className='absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors' />
              <span className='absolute bottom-3 right-3 bg-slate-900/80 text-white p-2 rounded text-xs font-minecraft border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity'>
                🔍 AMPLIAR
              </span>
            </div>
            <div className='p-4 bg-slate-900/60'>
              <h3 className='font-bold text-white text-base'>{img.titulo}</h3>
              <p className='text-slate-400 text-xs mt-1'>{img.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
