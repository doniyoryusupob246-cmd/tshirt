import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Container } from './container';

interface Props {
  className?: string;
}

export const Nav: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('py-3 bg-[#e0e0e0]', className)}>
      <Container>
        <Link className="text-[20px] font-bold" href={'/'}>
          LOGO
        </Link>
      </Container>
    </div>
  );
};
