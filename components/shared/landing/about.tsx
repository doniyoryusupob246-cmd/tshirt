import React from 'react';
import Image from 'next/image';
import { Container } from '../container';
import { Reveal } from '../reveal';

const STATS = [
  { value: '2', suffix: 'лет', label: 'на рынке печати' },
  { value: '15', suffix: 'тыс.', label: 'изделий отпечатано' },
  { value: '1–2', suffix: 'дня', label: 'средний срок заказа' },
  { value: '20', suffix: '+', label: 'брендов доверяют' },
];

export const About = () => {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-neutral-400">
                О студии
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
                Делаем вещи,
                <br />
                <span className="italic text-neutral-400">а не просто печать</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-neutral-600">
                <p>
                  TheShirt — небольшая студия, где за каждым заказом стоят живые люди. Мы подбираем
                  ткань, тестируем печать и следим, чтобы вещь пережила не одну стирку.
                </p>
                <p>
                  Работаем и с частными заказами, и с брендами: от единственной футболки в подарок
                  до капсульной коллекции и корпоративного мерча.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal direction="right">
              <div className="card-glow relative overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/hero_tshirt.png"
                  alt="Печать на футболке"
                  width={1200}
                  height={900}
                  className="w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
                />
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 90}>
                  <div className="border-t border-black/10 pt-5">
                    <p className="font-serif text-4xl leading-none tracking-tight">
                      {stat.value}
                      <span className="ml-1 text-lg text-neutral-400">{stat.suffix}</span>
                    </p>
                    <p className="mt-3 text-[12px] leading-snug text-neutral-500">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
