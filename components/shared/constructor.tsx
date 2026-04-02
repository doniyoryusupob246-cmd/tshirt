'use client';
import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
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

interface Props {
  className?: string;
}

const size = ['S', 'M', 'L', 'XL', 'XXL'];

export const Constructor: React.FC<Props> = ({ className }) => {
  const [selectPrint, setSelectPrint] = React.useState(designs[1].id);
  const [selectColor, setSelectColor] = React.useState(shirt[0].id);
  const [selectSize, setSelectSize] = React.useState(size[0]);
  const [categories, setCategories] = React.useState<string>('games');

  const findCat = designs.filter((cat) => cat.category === categories);

  const selectedPrint = designs.find((d) => d.id === selectPrint);
  const selectedColor = shirt.find((s) => s.id === selectColor);

  return (
    <div className={cn('mt-10', className)}>
      <Container>
        <div className="flex justify-between gap-5">
          <div className="w-[50%] h-100">
            <h2 className="font-bold text-2xl">Футболки</h2>
            <p className="text-[14px] text-[#8a8a8a]">Создайте свой дизайн</p>

            <div className="w-100 mt-5">
              <div className=" mb-5 ">
                <p className="text-[14px] mb-2">Выберите категорию:</p>
                <Select defaultValue="games" onValueChange={(value) => setCategories(value)}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent defaultValue={'games'}>
                    <SelectGroup>
                      <SelectItem value="games">Игры</SelectItem>
                      <SelectItem value="multfilms">Мультики</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className=" scrollbar gap-3 flex flex-wrap justify-between  h-100 overflow-y-scroll">
                {findCat.map((item) => (
                  <Button
                    onClick={() => setSelectPrint(item.id)}
                    className="w-30 h-30"
                    variant={'outline'}
                    key={item.id}>
                    <Image src={item.postImage} alt={item.name} width={120} height={120} />
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className=" bg-[radial-gradient(rgba(0,0,0,0.2)_1px,transparent_1px)] bg-size-[20px_20px] relative w-[50%] flex items-center justify-center pt-5">
            <div className="relative max-w-100">
              <Image
                className="w-full mb-5 absolute"
                src={selectedPrint?.image || 'Картинка не загражается'}
                alt=""
                width={500}
                height={500}
              />
              <Image
                className="w-full mb-5"
                src={selectedColor?.img || 'Картинка не загражается'}
                alt=""
                width={500}
                height={500}
              />
            </div>
            <div className="bg-linear-to-t from-white via-slate-200 to-slate-200 shadow-xl absolute w-[70%] h-37.5 -bottom-30 rounded-xl p-3 ">
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-medium text-[13px] mb-1">Цвет футболки</h4>
                  <div className="flex gap-2">
                    {shirt.map((color) => (
                      <Button
                        onClick={() => {
                          setSelectColor(color.id);
                        }}
                        key={color.id}
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
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-medium text-[13px] mb-1">Размер футболки</h4>
                    <div className="flex gap-2">
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
                  <Button className="w-37.5 h-12.5 cursor-pointer" variant={'outline'}>
                    Заказать
                    <ShoppingCart />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
