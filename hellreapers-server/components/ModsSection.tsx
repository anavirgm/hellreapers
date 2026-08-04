'use client';

import React from 'react';

interface Mod {
  nombre: string;
  cat: string;
  desc: string;
  icono: string;
}

interface ModsSectionProps {
  mods: Mod[];
}

export default function ModsSection({ mods }: ModsSectionProps) {
  return (
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
        {mods.map((mod, index) => (
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
  );
}