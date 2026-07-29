'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '../container';
import { Reveal } from '../reveal';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    num: '01',
    title: 'Печать на футболках',
    text: 'DTF и цифровая печать: точный цвет, мягкий на ощупь принт, стойкий к стиркам.',
    image: '/design-post/dota-red.jpg',
  },
  {
    num: '02',
    title: 'Свой дизайн',
    text: 'Загрузите картинку или соберите макет в конструкторе — с текстом, шрифтами и позицией.',
    image: '/design-post/gta.jpg',
  },
  {
    num: '03',
    title: 'Корпоративный мерч',
    text: 'Худи, футболки и аксессуары с айдентикой компании. Работаем с тиражами любого объёма.',
    image: '/design-post/csgo-gold.jpg',
  },
  {
    num: '04',
    title: 'Готовые коллекции',
    text: 'Каталог принтов на любой вкус — от игровых до графики. Выбирайте и заказывайте в два клика.',
    image: '/design-post/mortal-combat-gold.jpg',
  },
];

export const Services = () => {
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <section id="process" className="relative bg-neutral-950 py-28 text-white md:py-40">
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
                  'group relative grid grid-cols-12 items-center gap-4 border-t border-white/10 py-8 transition-colors duration-500 md:py-10',
                  i === SERVICES.length - 1 && 'border-b',
                )}>
                <span className="col-span-2 font-serif text-sm text-white/30 md:col-span-1">
                  {service.num}
                </span>

                <h3
                  className={cn(
                    'col-span-10 font-serif text-[clamp(1.4rem,3.5vw,2.5rem)] transition-all duration-500 md:col-span-5',
                    active === i ? 'translate-x-2 text-white' : 'text-white/80',
                  )}>
                  {service.title}
                </h3>

                <p className="col-span-12 text-[14px] leading-relaxed text-white/45 md:col-span-6 md:pl-8">
                  {service.text}
                </p>

                {/* превью при наведении */}
                <div
                  className={cn(
                    'pointer-events-none absolute right-[8%] top-1/2 hidden h-40 w-32 -translate-y-1/2 overflow-hidden rounded-xl transition-all duration-500 lg:block',
                    active === i ? 'scale-100 opacity-100 rotate-3' : 'scale-90 opacity-0',
                  )}>
                  <Image
                    src={service.image}
                    alt=""
                    width={300}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
