import type { Metadata } from 'next';
import { Fraunces, Manrope, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BriteWorks — AI Developer & UX Consultant',
    template: '%s — BriteWorks',
  },
  description:
    'AI Developer & UX Consultant — AI workflow, RAG, automation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClass = `${fraunces.variable} ${manrope.variable} ${notoSansJP.variable}`;
  return (
    <html lang="ja" className={fontClass}>
      <body>{children}</body>
    </html>
  );
}
