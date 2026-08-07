import React from 'react';

const ITEMS = [
  'ЦИФРОВАЯ ПЕЧАТЬ',
  'DTF',
  'ШЕЛКОГРАФИЯ',
  'ВЫШИВКА',
  'КОРПОРАТИВНЫЙ МЕРЧ',
  'ТИРАЖИ ОТ 1 ШТ',
  'СВОЙ ДИЗАЙН',
];

export const Marquee = () => {
  return (
    <div className="relative overflow-hidden border-y border-black/[0.07] bg-[#690B23] py-5 text-white">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {ITEMS.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center whitespace-nowrap">
                <span className="px-8 text-[12px] tracking-[0.3em] text-white/70">{item}</span>
                <span className="h-1 w-1 rounded-full bg-white/25" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
