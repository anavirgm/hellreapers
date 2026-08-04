'use client';

import React from 'react';

interface HeroSectionProps {
  bgUrl: string;
  logoUrl: string;
  ipMostrada: string;
  copiado: boolean;
  copiarIP: () => void;
  jugadores: {
    activo: boolean;
    online: number;
    lista: { name: string; uuid: string }[];
  };
  stats: { label: string; val: string; color: string }[];
}

export default function HeroSection({
  bgUrl,
  logoUrl,
  ipMostrada,
  copiado,
  copiarIP,
  jugadores,
  stats,
}: HeroSectionProps) {
  return (
    <section id="inicio" className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={bgUrl}
          alt="Hellreapers Background"
          className="w-full h-full object-cover object-center scale-105 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/40 via-[#0b0f17]/65 to-[#0b0f17]" />
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        <div className="flex justify-center mb-2">
            <img 
                src={logoUrl} 
                alt="Hellreapers Big Logo" 
                className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]"
            />
        </div>

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

        <div className="pt-2 max-w-lg mx-auto">
          <div className="mc-card-highlight p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left px-2">
              <span className="text-[10px] font-minecraft text-slate-400 uppercase block mb-1">DIRECCIÓN IP</span>
              <span className="text-base font-mono font-bold text-slate-100 select-all">{ipMostrada}</span>
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

        {/* AVATARES 3D DE JUGADORES EN VIVO */}
{jugadores.activo && (
  <div className="flex flex-col items-center justify-center gap-2 pt-2">
    {jugadores.online > 0 ? (
      <>
        <div className="flex items-center -space-x-2 overflow-hidden p-1">
          {jugadores.lista && jugadores.lista.length > 0 ? (
            jugadores.lista.slice(0, 6).map((player, idx) => (
              <img
                key={idx}
                src={`https://crafatar.com/avatars/${player.uuid || player.name}?size=36&overlay`}
                alt={player.name}
                title={player.name}
                className="inline-block h-9 w-9 rounded-md ring-2 ring-slate-900 bg-slate-800 object-cover transform hover:scale-110 hover:z-10 transition-transform"
              />
            ))
          ) : (
            // Cabezas genéricas si la API no desglosa la lista exacta por privacidad
            <div className="flex -space-x-2">
              <img
                src="https://crafatar.com/avatars/8667ba71-b85a-4004-af54-457a973daf31?size=36&overlay"
                alt="Steve"
                className="inline-block h-9 w-9 rounded-md ring-2 ring-slate-900 bg-slate-800"
              />
              <img
                src="https://crafatar.com/avatars/61699704-d927-4a8b-b56f-dec2d56412d3?size=36&overlay"
                alt="Alex"
                className="inline-block h-9 w-9 rounded-md ring-2 ring-slate-900 bg-slate-800"
              />
            </div>
          )}
        </div>
        <span className="text-xs text-slate-300 font-minecraft">
          ¡<span className="text-emerald-400 font-bold">{jugadores.online}</span> {jugadores.online === 1 ? 'jugador explorando' : 'jugadores explorando'} el mapa ahora mismo!
        </span>
      </>
    ) : (
      <span className="text-xs text-slate-400 font-mono bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800">
        El servidor está en línea sin jugadores conectados. ¡Sé el primero en entrar!
      </span>
    )}
  </div>
)}

        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="mc-card p-4 rounded-xl text-center border-l-4 border-l-slate-600">
              <span className={`text-xl font-black block ${s.color}`}>{s.val}</span>
              <span className="text-[10px] font-minecraft text-slate-400 block mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}