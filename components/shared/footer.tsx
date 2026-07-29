import React from 'react';
import Link from 'next/link';
import { Container } from './container';

const NAV = [
  { href: '/#about', label: 'О нас' },
  { href: '/#works', label: 'Работы' },
  { href: '/#process', label: 'Услуги' },
  { href: '/#pricing', label: 'Цены' },
  { href: '/design', label: 'Конструктор' },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 pb-10 pt-16 text-white">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[22px] tracking-[0.2em]">ATELIER</p>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/45">
              Студия печати и кастомизации одежды. Делаем вещи, которые хочется носить.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-white/30">Навигация</p>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-white/60 transition-colors duration-300 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-white/30">Контакты</p>
            <ul className="space-y-3 text-[14px] text-white/60">
              <li>
                <a href="tel:+998900000000" className="transition-colors hover:text-white">
                  +998 90 000 00 00
                </a>
              </li>
              <li>
                <a href="mailto:hello@atelier.uz" className="transition-colors hover:text-white">
                  hello@atelier.uz
                </a>
              </li>
              <li className="text-white/40">Ташкент, Узбекистан</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[12px] text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} ATELIER. Все права защищены.</p>
          <p>Сделано с любовью к деталям</p>
        </div>
      </Container>
    </footer>
  );
};
