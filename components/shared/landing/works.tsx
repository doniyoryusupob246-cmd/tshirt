import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../container';
import { Reveal } from '../reveal';
import { ArrowUpRight } from 'lucide-react';

const ROW_ONE = [
  '/design-post/dota-red.jpg',
  '/design-post/csgo-gold.jpg',
  '/design-post/gta.jpg',
  '/design-post/minicraft-1.jpg',
  '/design-post/mortal-combat.jpg',
  '/design-post/nfs-black.jpg',
];

const ROW_TWO = [
  '/design-post/wanted-black.jpg',
  '/design-post/ea-gray.jpg',
  '/design-post/dota-gray.jpg',
  '/design-post/csgo-white-logo.jpg',
  '/design-post/mortal-combat-gold.jpg',
  '/design-post/minicraft-2.jpg',
];

const Strip = ({ items, reverse }: { items: string[]; reverse?: boolean }) => (
  <div className="flex w-max" style={reverse ? { animationDirection: 'reverse' } : undefined}>
    <div className="animate-marquee-slow flex" style={reverse ? { animationDirection: 'reverse' } : undefined}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
          {items.map((src, i) => (
            <div
              key={`${copy}-${i}`}
              className="card-glow relative mx-2 h-[220px] w-[180px] shrink-0 overflow-hidden rounded-xl md:h-[300px] md:w-[240px]">
              <Image
                src={src}
                alt=""
                fill
                sizes="240px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const Works = () => {
  return (
    <section id="works" className="overflow-hidden py-28 md:py-40">
      <Container>
        <Reveal>
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-neutral-400">
                Портфолио
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
                Избранные
                <br />
                <span className="italic text-neutral-400">работы</span>
              </h2>
            </div>

            <Link
              href="/design"
              className="group flex items-center gap-3 self-start rounded-full border border-black/15 px-7 py-4 text-[13px] tracking-wide transition-all duration-300 hover:border-black/40 md:self-auto">
              Создать свою
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </Container>

      <Reveal className="space-y-4" direction="none">
        <Strip items={ROW_ONE} />
        <Strip items={ROW_TWO} reverse />
      </Reveal>
    </section>
  );
};
