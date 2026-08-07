import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
});

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TheShirt — печать и кастомизация одежды',
  description:
    'Студия печати на одежде. Собственный конструктор, премиальные материалы, срок 1–2 дня.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn(
        'h-full',
        'antialiased',
        montserrat.variable,
        playfair.variable,
        'font-sans',
      )}>
      <body className="min-h-full flex flex-col bg-[#f7f6f4] text-neutral-900">{children}</body>
    </html>
  );
}
