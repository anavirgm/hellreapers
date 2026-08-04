'use client';

import React from 'react';

interface FooterProps {
  logoUrl: string;
  onOpenModal: (contenido: 'terminos' | 'privacidad') => void;
}

export default function Footer({ logoUrl, onOpenModal }: FooterProps) {
  return (
    <footer className="border-t-2 border-slate-800 bg-[#070a10] py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-400">
        <div className="flex items-start gap-3">
          <img src={logoUrl} alt="Logo Footer" className="w-8 h-8 object-contain" />
          <div>
            <span className="font-minecraft text-sm text-slate-200 uppercase block mb-1">HELLREAPERS</span>
            <p>Servidor Survival Modded de Minecraft 1.20.1.</p>
          </div>
        </div>
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