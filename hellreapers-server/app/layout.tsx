import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HellReapers — Servidor Hardcore de Minecraft',
  description:
    'HellReapers es un servidor Hardcore de Minecraft 26.3 sobre Fabric. Una sola vida, sin mods y con una comunidad activa. Entra y sobrevive.',
  openGraph: {
    title: 'HellReapers — Servidor Hardcore de Minecraft',
    description: 'Servidor Hardcore de Minecraft 26.3 sobre Fabric. Una sola vida.',
    url: 'https://hellreapers.vercel.app',
    siteName: 'HellReapers',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='es' data-scroll-behavior='smooth' className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
