import { Check } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Print } from './constructor';

interface Props {
  className?: string;
  filtredDesigns: Print[];
  selectPrint: string;
  setSelectPrint: (id: string) => void;
}

export const SelectDesign: React.FC<Props> = ({
  setSelectPrint,
  selectPrint,
  filtredDesigns,
  className,
}) => {
  return (
    <div className="scrollbar gap-3 flex flex-wrap justify-between h-100 overflow-y-scroll">
      {filtredDesigns.map((item) => (
        <div key={item.id} className="relative">
          {item.id === selectPrint && (
            <div className="absolute -bottom-1 right-0 z-50 flex items-center justify-center bg-black w-[18px] h-[18px] rounded-full">
              <Check size={15} className="text-[#a7a7a7]" />
            </div>
          )}

          <Button
            onClick={() => setSelectPrint(item.id)}
            className={cn(
              'lg:w-30 lg:h-30 w-[90px] h-[90px]',
              item.id === selectPrint && 'border border-[#a7a7a7]',
            )}
            variant="outline">
            <Image src={item.postImage} alt={item.name} width={120} height={120} />
          </Button>
        </div>
      ))}
    </div>
  );
};
