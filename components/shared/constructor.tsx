'use client';
import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';
import { shirt } from '@/data/tshirt';
import { designs } from '@/data/designs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { DialogOrder } from './dialog-order';

interface Props {
  className?: string;
}

export type Print = {
  id: string;
  category: string;
  name: string;
  image: string;
  postImage: string;
  light: boolean;
  allowedColors: string[];
};

export type Color = {
  id: string;
  name: string;
  img: string;
  color: string;
};

const size = ['S', 'M', 'L', 'XL', 'XXL'];

export const Constructor: React.FC<Props> = ({ className }) => {
  const [selectPrint, setSelectPrint] = React.useState<string>(designs[1].id);
  const [selectColor, setSelectColor] = React.useState(shirt[0].id);
  const [selectSize, setSelectSize] = React.useState(size[0]);
  const [categories, setCategories] = React.useState<string>('games');

  const selectedPrint = designs.find((d) => d.id === selectPrint);
  const selectedColor = shirt.find((s) => s.id === selectColor);

  const filtredDesigns = designs.filter(
    (item) => item.category === categories && item.allowedColors.includes(selectColor),
  );

  console.log(`Размер: ${selectSize}, Print: ${selectPrint}, Color: ${selectColor}`);

  return (
    <div className={cn('mt-10', className)}>
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {/* LEFT */}
          <div className="w-full md:w-[50%] h-100">
            <h2 className="font-bold text-2xl">Футболки</h2>
            <p className="text-[14px] text-[#8a8a8a]">Создайте свой дизайн</p>

            <div className="w-full md:w-100 mt-5">
              <div className="mb-5">
                <p className="text-[14px] mb-2">Выберите категорию:</p>

                <Select defaultValue="games" onValueChange={(value) => setCategories(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="games">Игры</SelectItem>
                      <SelectItem value="multfilms">Мультики</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

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
            </div>
          </div>

          {/* RIGHT */}
          <div className="mt-[200px] md:mt-[0px] mx-auto bg-[radial-gradient(rgba(0,0,0,0.2)_1px,transparent_1px)] bg-size-[20px_20px] relative w-full md:w-[50%] flex items-center justify-center pt-5">
            <div className="relative w-full max-w-[320px] md:max-w-100">
              <Image
                className="w-full mb-5 absolute"
                src={selectedPrint?.image || ''}
                alt=""
                width={500}
                height={500}
              />

              <Image
                className="w-full mb-5"
                src={selectedColor?.img || ''}
                alt=""
                width={500}
                height={500}
              />
            </div>

            {/* BOTTOM PANEL */}
            <div className=" bg-linear-to-t from-white via-slate-200 to-slate-200 shadow-xl absolute w-[90%] md:w-[70%] h-auto md:h-37.5 -bottom-40 md:-bottom-10 rounded-xl p-3">
              <div className="flex flex-col gap-4">
                {/* COLOR */}
                <div>
                  <h4 className="font-medium text-[13px] mb-1">Цвет футболки</h4>

                  <div className="flex flex-wrap gap-2">
                    {shirt.map((color) => (
                      <Button
                        key={color.id}
                        onClick={() => setSelectColor(color.id)}
                        className="relative w-6.25 h-6.25 rounded-full
                          after:content-[''] after:absolute after:inset-0
                          after:rounded-full after:border-2
                          after:scale-125 after:opacity-0
                          after:border-(--border-color)
                          data-[active=true]:after:opacity-100
                          transition"
                        style={
                          {
                            backgroundColor: color.color,
                            '--border-color': color.color,
                          } as React.CSSProperties & Record<string, string>
                        }
                        data-active={selectColor === color.id}
                      />
                    ))}
                  </div>
                </div>

                {/* SIZE + ORDER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
                  <div>
                    <h4 className="font-medium text-[13px] mb-1">Размер футболки</h4>

                    <div className="flex flex-wrap gap-2">
                      {size.map((s, i) => (
                        <Button
                          onClick={() => setSelectSize(s)}
                          key={i}
                          variant={selectSize == s ? 'default' : 'outline'}
                          className="cursor-pointer">
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <DialogOrder
                    selectedPrint={selectedPrint ?? null}
                    selectedColor={selectedColor ?? null}
                    selectSize={selectSize}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
