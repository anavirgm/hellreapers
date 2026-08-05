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
          className="w-full h-full object-cover object-center scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17]/50 via-[#0b0f17]/80 to-[#0b0f17]" />
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10 w-full">
        
        {/* LOGO DESTACADO DEL SERVIDOR */}
        <div className="flex justify-center mb-6">
          <img 
            src={logoUrl} 
            alt="Hellreapers Big Logo" 
            className="w-24 h-24 sm:w-36 sm:h-36 object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.5)] anim-glow-static"
          />
        </div>

        {/* ETIQUETA DE VERSIÓN Y ACCESO */}
        <div className="flex justify-center px-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 bg-slate-900/90 border border-amber-500/30 text-slate-300 text-xs sm:text-sm font-minecraft px-4 py-2.5 rounded-lg shadow-lg">
            <span className="text-amber-400">👑</span>
            <span>SURVIVAL MODDED 1.20.1</span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/50 px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider">
              PREMIUM ONLY
            </span>
          </div>
        </div>

        {/* TÍTULO PRINCIPAL (CORREGIDO PARA MÓVIL) */}
        <div className="space-y-3 px-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight leading-tight drop-shadow-2xl text-white">
            ¡BIENVENIDO A
          </h1>
          <h1 className="font-minecraft text-sky-400 mc-text-glow text-3xl sm:text-5xl md:text-6xl lg:text-8xl block leading-none uppercase tracking-wide">
            HELLREAPERS!
          </h1>
        </div>

        {/* DESCRIPCIÓN */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed px-4">
          Explora un mundo cúbico infinito potenciado con aventura, magia ancestral y una comunidad activa.
        </p>

        {/* BOTÓN COPIAR IP (CORREGIDO PARA MÓVIL) */}
        <div className="pt-2 max-w-lg mx-auto w-full px-2">
          <div className="mc-card-highlight p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-700">
            <div className="text-center sm:text-left px-2 w-full sm:w-auto">
              <span className="text-[11px] font-minecraft text-slate-400 uppercase block mb-1.5 tracking-wide">DIRECCIÓN IP</span>
              {/* font-mono más pequeña en móvil para que no se corte la IP */}
              <span className="text-xs sm:text-base font-mono font-bold text-slate-100 select-all break-all sm:break-normal">
                {ipMostrada}
              </span>
            </div>

            <button
              type="button"
              onClick={copiarIP}
              className="w-full sm:w-auto btn-mc-emerald text-white font-minecraft text-[11px] px-6 py-3.5 rounded-md cursor-pointer active:scale-95 transition tracking-wider whitespace-nowrap"
            >
              {copiado ? '¡COPIADO!' : 'COPIAR IP'}
            </button>
          </div>
        </div>

        {/* AVATARES DE JUGADORES EN VIVO */}
        {jugadores.activo && jugadores.online > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 px-4">
            <div className="flex -space-x-3 overflow-hidden p-1">
              {jugadores.lista.length > 0 ? (
                jugadores.lista.slice(0, 5).map((player, idx) => (
                  <img
                    key={idx}
                    src={`https://visage.surgeplay.com/face/64/${player.uuid || player.name}`}
                    alt={player.name}
                    title={player.name}
                    className="inline-block h-9 w-9 rounded-md ring-2 ring-slate-900 bg-slate-800 object-cover"
                  />
                ))
              ) : (
                <img
                  src="https://visage.surgeplay.com/face/64/MHF_Steve"
                  alt="Jugador"
                  className="inline-block h-9 w-9 rounded-md ring-2 ring-slate-900 bg-slate-800"
                />
              )}
            </div>
            <span className="text-xs sm:text-sm text-slate-300 font-minecraft text-center">
              ¡{jugadores.online} {jugadores.online === 1 ? 'jugador explorando' : 'jugadores explorando'} ahora mismo!
            </span>
          </div>
        )}

        {/* GRILLA DE STATS (CORREGIDA PARA MÓVIL) */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto w-full px-2">
          {stats.map((s, i) => (
            <div key={i} className="mc-card p-5 rounded-2xl text-center border-b-4 border-b-slate-700 bg-slate-900/80">
              {/* Texto más pequeño en móvil para evitar que se corte */}
              <span className={`text-base sm:text-xl md:text-2xl font-black block leading-none ${s.color}`}>
                {s.val}
              </span>
              <span className="text-[10px] sm:text-xs font-minecraft text-slate-400 block mt-2 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}