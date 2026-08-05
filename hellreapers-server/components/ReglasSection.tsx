'use client';

import React, { useState } from 'react';

interface Regla {
  id: number;
  t: string;
  d: string;
}

interface ReglasSectionProps {
  reglas: Regla[];
}

export default function ReglasSection({ reglas }: ReglasSectionProps) {
  const [reglaAbierta, setReglaAbierta] = useState<number | null>(null);

  const toggleRegla = (id: number) => {
    setReglaAbierta((prev) => (prev === id ? null : id));
  };

  return (
    <section id='reglas' className='py-20 px-4 max-w-4xl mx-auto'>
      <div className='text-center max-w-2xl mx-auto mb-12'>
        <h2 className='text-2xl sm:text-3xl font-minecraft text-white'>REGLAS DEL SERVIDOR</h2>
        <p className='text-xs text-slate-400 mt-2'>Haz clic en cualquier regla para desplegar la información</p>
      </div>

      <div className='space-y-4'>
        {reglas.map((r) => {
          const isOpen = reglaAbierta === r.id;
          return (
            <div key={r.id} className='mc-card rounded-xl overflow-hidden border border-slate-800'>
              <button
                type='button'
                onClick={() => toggleRegla(r.id)}
                className='w-full p-5 text-left flex items-center justify-between cursor-pointer focus:outline-none hover:bg-slate-800/40 transition-colors'
              >
                <div className='flex items-center gap-4'>
                  <span className='w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-minecraft text-slate-200 text-xs'>
                    0{r.id}
                  </span>
                  <h3 className='font-bold text-white text-base'>{r.t}</h3>
                </div>
                <span className='text-slate-300 font-bold text-xl font-mono px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700'>
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className='px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-900/30'>
                  <p className='text-slate-300 text-sm sm:pl-12 leading-relaxed'>{r.d}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
