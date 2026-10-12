import Link from 'next/link';

const mods = [
  ['The Aether', '1.5.2', 'Aventura'],
  ['All The Leaks', '1.1.1', 'Rendimiento'],
  ['Ametrin', '0.1.2', 'Contenido'],
  ['AppleSkin', '2.5.1', 'Utilidad'],
  ['Architectury API', '9.2.14', 'Libreria'],
  ['Artifacts', '9.5.19', 'Aventura'],
  ['ATi Structures', '1.4.2', 'Mundo'],
  ['Atlas Lib', '1.1.12', 'Libreria'],
  ['BaguetteLib', '1.1.6', 'Libreria'],
  ['Balm', '7.3.41', 'Libreria'],
  ['Better Chunk Loading', '5.4', 'Rendimiento'],
  ["Block Factory's Bosses", '2.1.2', 'Aventura'],
  ['Call of Yucutan', '1.0.13', 'Aventura'],
  ['Cave Dweller', '1.7.0', 'Aventura'],
  ['Chunky', '1.3.146', 'Utilidad'],
  ['Cloth Config', '11.1.136', 'Libreria'],
  ['Companions', '1.2.3', 'Aventura'],
  ['Connectible Chains', '2.2.5', 'Decoracion'],
  ['Cult of Azazel', '1.1.4.9a', 'Aventura'],
  ['Cupboard', '3.9', 'Libreria'],
  ['Curios API', '5.14.1', 'Libreria'],
  ['Deeper and Darker', '1.3.3', 'Aventura'],
  ['Dungeons and Combat', '1.2.4', 'Aventura'],
  ['When Dungeons Arise: Seven Seas', '1.0.2', 'Mundo'],
  ['Dungeons Enhanced', '5.4.3', 'Mundo'],
  ['Embeddium', '0.3.31', 'Rendimiento'],
  ['Enchanting Infuser', '8.0.3', 'Magia'],
  ["Explorer's Compass", '1.4.0', 'Utilidad'],
  ["Farmer's Delight", '1.3.2', 'Cocina'],
  ['FerriteCore (Fabric)', '6.0.1', 'Rendimiento'],
  ['FerriteCore', '6.0.1', 'Rendimiento'],
  ['GeckoLib', '4.8.4', 'Libreria'],
  ['Gravestone Curios Compatibility', '3.0.0', 'Compatibilidad'],
  ['Gravestone', '1.0.35', 'Utilidad'],
  ['Handcrafted', '3.0.6', 'Decoracion'],
  ['Immersive UI', '0.3.0', 'Utilidad'],
  ['Incendium', '5.3.4', 'Mundo'],
  ['Inventory Sorter', '23.0.11', 'Utilidad'],
  ['Iter RPG', '0.7.9a', 'Aventura'],
  ['Jade', '11.13.2', 'Utilidad'],
  ['Just Enough Items', '15.20.0.134', 'Utilidad'],
  ['JourneyMap', '6.0.0-beta.4', 'Utilidad'],
  ['Just Zoom', '2.0.0', 'Utilidad'],
  ['KnightLib', '1.6.1', 'Libreria'],
  ['Konkrete', '1.8.0', 'Libreria'],
  ['Legendary Monsters', '2.1.22', 'Aventura'],
  ['Lithostitched', '1.4.11', 'Libreria'],
  ['Lootr', '0.7.35.94', 'Aventura'],
  ["Macaw's Lights", '1.1.5', 'Decoracion'],
  ['ModernFix', '5.27.66', 'Rendimiento'],
  ['Monster Expansion', '0.7.4', 'Aventura'],
  ["Neko's Enchanted Books", '2.0.3', 'Magia'],
  ["NoCube's Villagers Sell Animals", '1.2.1', 'Contenido'],
  ['Not Enough Recipe Book', '0.4.1', 'Utilidad'],
  ['OctoLib', '0.5.0.1', 'Libreria'],
  ["Pana's Craft RPG", '3.6', 'Aventura'],
  ['Paraglider', '1.9.0.0', 'Aventura'],
  ['Puzzles Lib', '8.1.33', 'Libreria'],
  ['Relics', '0.8.0.13', 'Aventura'],
  ['Resourceful Lib', '2.1.23', 'Libreria'],
  ['Ribbits', '3.0.5', 'Contenido'],
  ['Scaling Mobs', '2.4.4', 'Aventura'],
  ['Sophisticated Backpacks', '3.24.59.1960', 'Utilidad'],
  ['Sophisticated Core', '1.3.66.2138', 'Libreria'],
  ['Stackable Potions', '1.0.0', 'Utilidad'],
  ['Starlight', '1.1.2', 'Rendimiento'],
  ['Structure Gel API', '2.16.1', 'Libreria'],
  ['Sweet Calamity', '1.0.1', 'Aventura'],
  ['Terralith', '2.5.1', 'Mundo'],
  ['Terramity', '0.9.8', 'Aventura'],
  ['The Hordes', '1.6.3f', 'Aventura'],
  ['UniMixins', '0.3.1', 'Libreria'],
  ['Waystones', '14.1.20', 'Viaje'],
  ['Wither Reincarnated', '1.0.5', 'Aventura'],
  ["YUNG's API", '4.0.6', 'Libreria'],
  ['Zipline', '1.3.0', 'Viaje'],
] as const;

export default function ModsPage() {
  return (
    <main className='min-h-screen bg-[#0b0f17] bg-mc-pattern text-slate-100 selection:bg-slate-700 selection:text-white'>
      <header className='border-b-2 border-slate-800 bg-[#0b0f17]/95 backdrop-blur-md'>
        <div className='max-w-7xl mx-auto px-4 h-20 flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-3 group'>
            <img
              src='/favicon.ico'
              alt='Hellreapers Logo'
              className='w-12 h-12 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]'
            />
            <span className='font-minecraft text-sm tracking-wider text-slate-100'>HELLREAPERS</span>
          </Link>
          <Link href='/' className='btn-mc-diamond text-white font-minecraft text-[10px] px-4 py-2.5 rounded tracking-wider'>
            VOLVER
          </Link>
        </div>
      </header>

      <section className='max-w-7xl mx-auto px-4 py-16 sm:py-24'>
        <div className='max-w-3xl mb-14'>
          <p className='font-minecraft text-[10px] text-sky-400 tracking-wider mb-4'>HISTÓRICO · FORGE 1.20.1</p>
          <h1 className='font-minecraft text-2xl sm:text-4xl leading-relaxed text-white mc-text-glow'>LISTA DE MODS</h1>
          <p className='text-slate-400 mt-5 text-sm sm:text-base leading-relaxed'>
            Registro histórico del modpack de la era Survival Modded. El servidor actual es Hardcore de Fabric
            <strong> sin mods</strong>; esta lista se conserva por si el modpack vuelve a estar disponible.
          </p>
        </div>

        <div className='flex items-center gap-3 mb-7'>
          <span className='font-minecraft text-xs text-emerald-400'>{mods.length} MODS</span>
          <span className='h-px flex-1 bg-slate-800' />
          <span className='text-xs text-slate-500'>Versiones instaladas</span>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {mods.map(([name, version, category], index) => (
            <article key={name} className='mc-card rounded-xl p-5 flex items-center gap-4'>
              <span className='shrink-0 w-10 h-10 rounded border border-slate-700 bg-slate-900 flex items-center justify-center font-minecraft text-xs text-sky-400'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className='min-w-0 flex-1'>
                <h2 className='font-bold text-sm text-slate-100 truncate'>{name}</h2>
                <p className='text-xs text-slate-500 mt-1'>v{version}</p>
              </div>
              <span className='shrink-0 text-[9px] font-minecraft text-slate-300 bg-slate-800 border border-slate-700 px-2 py-1 rounded'>
                {category.toUpperCase()}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
