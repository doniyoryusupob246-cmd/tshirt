import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../container';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#690B23] text-white">
      {/* фоновые градиентные пятна */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-aurora absolute -top-1/4 -left-[10%] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(120,120,255,0.25),transparent_65%)] blur-3xl" />
        <div
          className="animate-aurora absolute -bottom-1/3 right-[-15%] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(255,180,120,0.22),transparent_65%)] blur-3xl"
          style={{ animationDelay: '-7s' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75))]" />
      </div>

      <Container className="relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <p
              className="animate-rise text-[11px] tracking-[0.42em] text-white/45 uppercase mb-8"
              style={{ animationDelay: '120ms' }}>
              Студия печати на одежде
            </p>

            <h1 className="font-serif leading-[0.88] tracking-[-0.02em]">
              <span
                className="animate-rise block text-[clamp(3rem,10vw,8.5rem)]"
                style={{ animationDelay: '220ms' }}>
                ОДЕЖДА
              </span>
              <span
                className="animate-rise block text-[clamp(3rem,10vw,8.5rem)] italic text-white/55"
                style={{ animationDelay: '360ms' }}>
                с характером
              </span>
            </h1>

            <p
              className="animate-rise mt-10 max-w-md text-[15px] leading-relaxed text-white/60"
              style={{ animationDelay: '520ms' }}>
              Мы превращаем идею в вещь, которую хочется носить. Печать, дизайн и подбор материалов
              — от одной футболки до тиража для бренда.
            </p>

            <div
              className="animate-rise mt-12 flex flex-wrap items-center gap-4"
              style={{ animationDelay: '660ms' }}>
              <Link
                href="/design"
                className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] tracking-wide text-neutral-900 transition-all duration-300 hover:gap-5 hover:bg-white/90">
                Собрать свой дизайн
                <ArrowRight size={16} className="transition-transform duration-300" />
              </Link>
              <Link
                href="#works"
                className="rounded-full border border-white/20 px-8 py-4 text-[13px] tracking-wide text-white/80 transition-colors duration-300 hover:border-white/50 hover:text-white">
                Наши работы
              </Link>
            </div>
          </div>

          {/* RIGHT — карточка с футболкой */}
          <div className="lg:col-span-5">
            <div
              className="animate-rise relative mx-auto max-w-[420px]"
              style={{ animationDelay: '480ms' }}>
              <div className="relative overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/hero_2.png"
                  alt="Футболка с печатью"
                  width={800}
                  height={800}
                  priority
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* индикатор скролла */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">Листайте</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-hint absolute inset-x-0 h-1/2 bg-white/80" />
        </span>
      </div>
    </section>
  );
};
