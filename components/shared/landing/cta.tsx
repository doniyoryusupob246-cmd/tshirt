import React from 'react';
import Link from 'next/link';
import { Container } from '../container';
import { Reveal } from '../reveal';
import { ArrowRight } from 'lucide-react';

export const Cta = () => {
  return (
    <section className="relative overflow-hidden bg-[#690B23] py-28 text-white md:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-aurora absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_65%)] blur-3xl" />
      </div>

      <Container className="relative z-10">
        <Reveal className="text-center">
          <p className="mb-8 text-[11px] uppercase tracking-[0.4em] text-white/35">
            Готовы начать?
          </p>
          <h2 className="mx-auto max-w-4xl font-serif text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            Соберите свою вещь
            <br />
            <span className="italic text-white/50">прямо сейчас</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-white/50">
            Конструктор работает прямо в браузере — выбирайте цвет, принт и текст, а мы
            позаботимся об остальном.
          </p>

          <Link
            href="/design"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-[13px] tracking-wide text-neutral-900 transition-all duration-300 hover:gap-5">
            Открыть конструктор
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
};
