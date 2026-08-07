import React from 'react';
import Link from 'next/link';
import { Container } from '../container';
import { Reveal } from '../reveal';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    name: 'Одна вещь',
    price: '150 000',
    note: 'за изделие',
    features: [
      'Печать спереди и сзади',
      'Хлопок 190 г/м²',
      'Срок 1–2 дня',
      'Свой макет или каталог',
    ],
    accent: false,
  },
  {
    name: 'Одна вещь',
    price: '250 000',
    note: 'за изделие',
    features: [
      'Печать спереди и сзади',
      'Premium хлопок 240 г/м²',
      'Срок 1–2 дня',
      'Подарочная упаковка',
      'Проверка макета дизайнером',
    ],
    accent: true,
  },
  {
    name: 'Тираж',
    price: 'от 100 000',
    note: 'при заказе 20+',
    features: [
      'Скидка от объёма',
      'Единый стандарт качества',
      'Свои размеры и цвета',
      'Персональный менеджер',
    ],
    accent: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-28 md:py-40">
      <Container>
        <Reveal>
          <div className="mb-16 max-w-2xl md:mb-24">
            <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-neutral-400">
              Стоимость
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
              Честные цены
              <br />
              <span className="italic text-neutral-400">без сюрпризов</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 110}>
              <div
                className={cn(
                  'group relative flex h-full flex-col rounded-[1.5rem] p-8 transition-all duration-500 md:p-10',
                  plan.accent
                    ? 'bg-[#690B23] text-white shadow-2xl md:-translate-y-4'
                    : 'border border-black/10 bg-white hover:border-black/25',
                )}>
                {plan.accent && (
                  <span className="absolute right-8 top-8 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                    Хит
                  </span>
                )}

                <p
                  className={cn(
                    'text-[12px] uppercase tracking-[0.25em]',
                    plan.accent ? 'text-white/45' : 'text-neutral-400',
                  )}>
                  {plan.name}
                </p>

                <p className="mt-6 font-serif text-[2.6rem] leading-none tracking-tight">
                  {plan.price}
                </p>
                <p
                  className={cn(
                    'mt-2 text-[12px]',
                    plan.accent ? 'text-white/40' : 'text-neutral-400',
                  )}>
                  сум · {plan.note}
                </p>

                <ul className="mt-9 flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[14px] leading-snug">
                      <Check
                        size={15}
                        className={cn(
                          'mt-0.5 shrink-0',
                          plan.accent ? 'text-white/50' : 'text-neutral-400',
                        )}
                      />
                      <span className={plan.accent ? 'text-white/75' : 'text-neutral-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/design"
                  className={cn(
                    'mt-10 flex items-center justify-center rounded-full py-4 text-[13px] tracking-wide transition-all duration-300',
                    plan.accent
                      ? 'bg-white text-neutral-900 hover:bg-white/90'
                      : 'border border-black/15 hover:bg-[#690B23] hover:text-white',
                  )}>
                  Оформить
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
