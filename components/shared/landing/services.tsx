'use client';

import React from 'react';
import { Printer, PenTool, Building2, LayoutGrid } from 'lucide-react';
import { Container } from '../container';
import { Reveal } from '../reveal';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    num: '01',
    title: 'Печать на футболках',
    text: 'DTF и цифровая печать: точный цвет, мягкий на ощупь принт, стойкий к стиркам.',
    icon: Printer,
  },
  {
    num: '02',
    title: 'Свой дизайн',
    text: 'Загрузите картинку или соберите макет в конструкторе — с текстом, шрифтами и позицией.',
    icon: PenTool,
  },
  {
    num: '03',
    title: 'Корпоративный мерч',
    text: 'Худи, футболки и аксессуары с айдентикой компании. Работаем с тиражами любого объёма.',
    icon: Building2,
  },
  {
    num: '04',
    title: 'Готовые коллекции',
    text: 'Каталог принтов на любой вкус — от игровых до графики. Выбирайте и заказывайте в два клика.',
    icon: LayoutGrid,
  },
];

export const Services = () => {
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <section id="process" className="relative bg-[#690B23] py-28 text-white md:py-40">
      <Container>
        <Reveal>
          <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
            <div>
              <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-white/35">
                Что мы делаем
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
                Услуги студии
              </h2>
            </div>
            <p className="max-w-xs text-[14px] leading-relaxed text-white/45">
              Полный цикл — от идеи и макета до готовой упакованной вещи.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {SERVICES.map((service, i) => (
            <Reveal key={service.num} delay={i * 80}>
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  'group relative flex flex-col gap-4 border-t border-white/10 py-8 transition-colors duration-500 md:grid md:grid-cols-12 md:items-center md:gap-4 md:py-10',
                  i === SERVICES.length - 1 && 'border-b',
                )}>
                <div className="flex items-center gap-4 md:col-span-1 md:flex-col md:items-start">
                  <div
                    className={cn(
                      'relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-500',
                      active === i
                        ? 'scale-100 rotate-3 border-white/25 bg-white/[0.08]'
                        : 'scale-90 rotate-0',
                    )}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
                    <service.icon
                      size={24}
                      strokeWidth={1.5}
                      className={cn(
                        'relative transition-colors duration-500',
                        active === i ? 'text-white' : 'text-white/50',
                      )}
                    />
                  </div>
                  <span className="font-serif text-sm text-white/30">{service.num}</span>
                </div>

                <h3
                  className={cn(
                    'font-serif text-[clamp(1.4rem,3.5vw,2.5rem)] transition-all duration-500 md:col-span-5',
                    active === i ? 'translate-x-2 text-white' : 'text-white/80',
                  )}>
                  {service.title}
                </h3>

                <p className="text-[14px] leading-relaxed text-white/45 md:col-span-6 md:pl-8">
                  {service.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
