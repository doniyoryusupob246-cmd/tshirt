'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
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

  // блокируем скролл страницы, пока открыто полноэкранное мобильное меню
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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
      </Container>

      {/* MOBILE MENU — полноэкранный непрозрачный оверлей, а не выпадашка внутри шапки */}
      <div
        className={cn(
          'fixed inset-0 z-110 bg-neutral-950 transition-opacity duration-300 md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}>
        <Container className="flex h-full flex-col pt-6">
          <div className="flex items-center justify-between">
            <span className="font-serif text-[22px] tracking-[0.2em] text-white">ATELIER</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white">
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 pb-20">
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-serif text-3xl text-white/85 transition-colors last:border-none hover:text-white"
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}>
                {link.label}
              </Link>
            ))}

            <Link
              href="/design"
              onClick={() => setOpen(false)}
              className={cn(
                'mt-8 flex items-center justify-center rounded-full bg-white py-4 text-[14px] tracking-wide text-neutral-900',
                pathname === '/design' && 'pointer-events-none opacity-60',
              )}>
              Твой дизайн
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
};
