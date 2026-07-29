'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Container } from './container';

interface Props {
  className?: string;
  /** прозрачная шапка поверх тёмного героя (для главной) */
  overlay?: boolean;
}

const LINKS = [
  { href: '/#about', label: 'О нас' },
  { href: '/#works', label: 'Работы' },
  { href: '/#process', label: 'Процесс' },
  { href: '/#pricing', label: 'Цены' },
];

export const Nav: React.FC<Props> = ({ className, overlay = false }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // тёмный текст, если шапка не поверх героя или уже проскроллили
  const solid = !overlay || scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-100 transition-all duration-500',
        solid ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 py-3' : 'bg-transparent py-6',
        className,
      )}>
      <Container>
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className={cn(
              'font-serif text-[22px] tracking-[0.2em] transition-colors duration-500',
              solid ? 'text-neutral-900' : 'text-white',
            )}>
            ATELIER
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-[13px] tracking-wide transition-colors duration-300',
                  'after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current',
                  'after:transition-all after:duration-300 hover:after:w-full',
                  solid
                    ? 'text-neutral-600 hover:text-neutral-900'
                    : 'text-white/70 hover:text-white',
                )}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/design"
              className={cn(
                'group relative hidden overflow-hidden rounded-full px-5 py-2.5 text-[13px] tracking-wide transition-all duration-300 sm:block',
                pathname === '/design' && 'pointer-events-none opacity-60',
                solid
                  ? 'bg-neutral-900 text-white hover:bg-neutral-700'
                  : 'bg-white text-neutral-900 hover:bg-white/90',
              )}>
              <span className="relative z-10">Твой дизайн</span>
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Меню"
              className={cn(
                'md:hidden flex flex-col justify-center gap-1.5 w-9 h-9 items-center rounded-full transition-colors',
                solid ? 'text-neutral-900' : 'text-white',
              )}>
              <span
                className={cn(
                  'block h-px w-5 bg-current transition-all duration-300',
                  open && 'translate-y-[3px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-px w-5 bg-current transition-all duration-300',
                  open && '-translate-y-[3px] -rotate-45',
                )}
              />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-500',
            open ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0',
          )}>
          <nav className="flex flex-col gap-1 pb-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-lg py-2.5 text-[15px] tracking-wide transition-colors',
                  solid
                    ? 'text-neutral-700 hover:text-neutral-950'
                    : 'text-white/80 hover:text-white',
                )}>
                {link.label}
              </Link>
            ))}

            <Link
              href="/design"
              onClick={() => setOpen(false)}
              className={cn(
                'mt-3 flex items-center justify-center rounded-full py-3.5 text-[14px] tracking-wide transition-colors sm:hidden',
                pathname === '/design' && 'pointer-events-none opacity-60',
                solid ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900',
              )}>
              Твой дизайн
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};
