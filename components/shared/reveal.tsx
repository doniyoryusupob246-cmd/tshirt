'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  /** задержка появления в мс — для каскада элементов */
  delay?: number;
  /** направление, откуда «выезжает» блок */
  direction?: 'up' | 'left' | 'right' | 'none';
}

/**
 * Появление блока при попадании в вьюпорт.
 * Основной путь — IntersectionObserver, плюс запасная проверка по scroll/resize:
 * контент не должен остаться невидимым, даже если observer не отработал.
 * Уважает prefers-reduced-motion — при нём контент виден сразу.
 */
export const Reveal: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = null;

    const cleanup = () => {
      observer?.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };

    function check() {
      const el = ref.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 60 && rect.bottom > 0;
      if (inView) {
        setVisible(true);
        cleanup();
      }
      return inView;
    }

    // блок уже виден при первом рендере — показываем без ожидания скролла
    if (check()) return;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            cleanup();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
      );
      observer.observe(node);
    }

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });

    return cleanup;
  }, []);

  const hidden =
    direction === 'left'
      ? '-translate-x-12'
      : direction === 'right'
        ? 'translate-x-12'
        : direction === 'up'
          ? 'translate-y-12'
          : '';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
        visible
          ? 'opacity-100 translate-x-0 translate-y-0 blur-0'
          : cn('opacity-0 blur-[6px]', hidden),
        className,
      )}>
      {children}
    </div>
  );
};
