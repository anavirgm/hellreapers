'use client';

import React, { useEffect, useState } from 'react';

interface FooterProps {
  logoUrl: string;
  discordGuildId?: string; // ID de tu servidor de Discord (Opcional)
  linkDiscord: string;
  onOpenModal: (contenido: 'terminos' | 'privacidad') => void;
}

export default function Footer({ logoUrl, discordGuildId = '123456789', linkDiscord, onOpenModal }: FooterProps) {
  const [discordOnline, setDiscordOnline] = useState<number | null>(null);

  useEffect(() => {
    // Si tienes habilitado el Widget en los ajustes de tu servidor de Discord
    const fetchDiscordWidget = async () => {
      try {
        const res = await fetch(`https://discord.com/api/guilds/${discordGuildId}/widget.json`);
        const data = await res.json();
        if (data && typeof data.presence_count === 'number') {
          setDiscordOnline(data.presence_count);
        }
      } catch (err) {
        // Silencioso si no está activo el widget de Discord
      }
    };

    fetchDiscordWidget();
  }, [discordGuildId]);

  return (
    <footer className="border-t-2 border-slate-800 bg-[#070a10] py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-400">
        
        {/* COLUMNA 1: INFO Y DISCORD WIDGET */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <img src={logoUrl} alt="Logo Footer" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-minecraft text-sm text-slate-200 uppercase block mb-1">HELLREAPERS</span>
              <p>Servidor Survival Modded de Minecraft 1.20.1.</p>
            </div>
          </div>

          {/* TARJETA / WIDGET FLOTANTE DISCORD */}
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between max-w-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-mono text-[11px]">
                {discordOnline !== null ? `${discordOnline} en Discord` : 'Comunidad activa'}
              </span>
            </div>
            <a
              href={linkDiscord}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-minecraft text-sky-400 hover:underline"
            >
              UNIRSE ↗
            </a>
          </div>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN */}
        <div>
          <span className="font-minecraft text-[10px] text-white uppercase block mb-3">Navegación</span>
          <p className="space-x-2">
            <a href="#inicio" className="hover:text-slate-200">Inicio</a> • 
            <a href="#galeria" className="hover:text-slate-200">Galería</a> • 
            <a href="#mods" className="hover:text-slate-200">Mods</a> • 
            <a href="#instalacion" className="hover:text-slate-200">Tutorial</a>
          </p>
        </div>
        <div>
          <span className="font-minecraft text-[10px] text-white uppercase block mb-3">Legal</span>
          <div className="space-y-2">
            <p>© {new Date().getFullYear()} Hellreapers. No afiliado con Mojang / Microsoft.</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onOpenModal('terminos')}
                className="text-sky-400 hover:underline cursor-pointer"
              >
                Términos y Condiciones
              </button>
              <button
                type="button"
                onClick={() => onOpenModal('privacidad')}
                className="text-sky-400 hover:underline cursor-pointer"
              >
                Política de Privacidad
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}