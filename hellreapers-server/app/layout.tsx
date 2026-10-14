import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Press_Start_2P } from 'next/font/google';
import './globals.css';

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const pressStart2P = Press_Start_2P({
  weight: '400',
  variable: '--font-minecraft',
  subsets: ['latin'],
  display: 'swap',
});

const SITE_URL = 'https://hellreapers.vercel.app';
const SITE_DESCRIPTION =
  'HellReapers es un servidor Hardcore de Minecraft 26.3 sobre Fabric. Una sola vida, sin mods y con una comunidad activa. Entra y sobrevive.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'HellReapers — Servidor Hardcore de Minecraft',
  description: SITE_DESCRIPTION,
  applicationName: 'HellReapers',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'HellReapers — Servidor Hardcore de Minecraft',
    description: 'Servidor Hardcore de Minecraft 26.3 sobre Fabric. Una sola vida.',
    url: SITE_URL,
    siteName: 'HellReapers',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HellReapers — Servidor Hardcore de Minecraft',
    description: 'Servidor Hardcore de Minecraft 26.3 sobre Fabric. Una sola vida.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0f17',
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'HellReapers',
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      description: SITE_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      name: 'HellReapers',
      url: SITE_URL,
      inLanguage: 'es',
      description: SITE_DESCRIPTION,
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='es' data-scroll-behavior='smooth' className={`${jakartaSans.variable} ${pressStart2P.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        {children}
      </body>
    </html>
  );
}
