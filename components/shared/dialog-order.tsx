import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, ShoppingCart } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Color, Print } from './constructor';
import React from 'react';
interface Props {
  selectedColor: Color | null;
  selectedPrint: Print | null;
  selectSize: string;
  selectBack: boolean;
  preview: string | null;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  screenshotUrl: string | null;
  isCapturing: boolean;
  onCapture: () => Promise<void>;
}
export const DialogOrder: React.FC<Props> = ({
  selectBack,
  selectedColor,
  selectedPrint,
  selectSize,
  position,
  preview,
  screenshotUrl,
  isCapturing,
  onCapture,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const [open, setOpen] = React.useState(false);
  const handleOpen = async (value: boolean) => {
    setOpen(value);
    if (value) {
      await onCapture();
    }
  };
  React.useEffect(() => {
    if (!open) return;
    if (!containerRef.current) return;

    const update = () => {
      setSize({
        width: containerRef.current!.offsetWidth,
        height: containerRef.current!.offsetHeight,
      });
    };

    update();

    // const observer = new ResizeObserver(update);
    // observer.observe(containerRef.current);

    // return () => observer.disconnect();
  }, [open]);

  const widthPx = position.width * size.width;
  const heightPx = position.height * size.height;
  const xPx = position.x * size.width;
  const yPx = position.y * size.height;
  console.log('kjghghg', size);
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger className="flex items-center justify-center rounded-xl gap-2 bg-white w-[150px] h-[50px] cursor-pointer">
        Заказать
        <ShoppingCart size={15} />
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-[95vw] md:w-[1000px] h-[600px] overflow-y-scroll md:overflow-auto md:h-130">
        <DialogHeader>
          <DialogTitle>Подтверждение заказа</DialogTitle>

          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-1 justify-center h-full">
            {/* FORM */}
            <div className="w-full md:w-[50%] h-full">
              <form className="flex flex-col h-full">
                <div className="flex flex-col gap-3 mt-3">
                  <div>
                    <Label className="mb-2" htmlFor="name">
                      Имя
                    </Label>
                    <Input id="name" type="name" placeholder="Имя" className="w-full h-[40px]" />
                  </div>

                  <div>
                    <Label className="mb-2" htmlFor="phone">
                      Телефон
                    </Label>
                    <Input
                      id="phone"
                      type="phone"
                      placeholder="Телефон"
                      className="w-full h-[40px]"
                    />
                  </div>

                  <div>
                    <Label className="mb-2" htmlFor="message">
                      Сообщение
                    </Label>
                    <Textarea id="message" placeholder="Сообщение" className="w-full" />
                  </div>
                </div>

                <Button className="cursor-pointer w-full h-[40px] bg-black text-white rounded-lg mt-4 md:mt-auto">
                  Заказать
                </Button>
              </form>
            </div>

            {/* PREVIEW */}
            <div className="w-full md:w-[50%] h-full flex items-center justify-center flex-col">
              <h2>{selectBack ? 'Задняя часть' : 'Передняя часть'}</h2>
              {/* <div ref={containerRef} className="relative max-w-[200px] md:max-w-[300px] h-[300px]">
                {preview && (
                  <div
                    className="absolute z-30 "
                    style={{
                      width: widthPx,
                      height: heightPx,
                      transform: `translate(${xPx}px, ${yPx}px)`,
                    }}>
                    <Image
                      src={preview}
                      alt=""
                      width={100}
                      height={100}
                      className="object-contain pointer-events-none max-w-[600px]"
                    />
                  </div>
                )}
                {!preview && (
                  <Image
                    className="w-full mb-5 absolute"
                    src={selectedPrint?.image || ''}
                    alt=""
                    width={300}
                    height={300}
                  />
                )}

                <Image
                  className="w-full mb-5"
                  src={
                    selectBack == false
                      ? selectedColor?.img || '/placeholder.png'
                      : selectedColor?.back || '/placeholder.png'
                  }
                  alt=""
                  width={300}
                  height={300}
                />

                {isCapturing && (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Loader2 className="animate-spin" size={28} />
                    <span className="text-sm">Генерация превью...</span>
                  </div>
                )}

                {!isCapturing && screenshotUrl && (
                  <Image src={screenshotUrl} alt="Превью заказа" fill className="object-contain" />
                )}

                {!isCapturing && !screenshotUrl && (
                  <p className="text-sm text-gray-400">Нет превью</p>
                )}
              </div> */}

              {/* ✅ position: relative + явные размеры обязательны для next/image с fill */}
              <div className="relative w-[280px] h-[300px] flex items-center justify-center">
                {isCapturing && (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Loader2 className="animate-spin" size={28} />
                    <span className="text-sm">Генерация превью...</span>
                  </div>
                )}

                {!isCapturing && screenshotUrl && (
                  <Image
                    src={screenshotUrl}
                    alt="Превью заказа"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                )}

                {!isCapturing && !screenshotUrl && (
                  <p className="text-sm text-gray-400">Нет превью</p>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left">
                <div>
                  <h4 className="font-medium">Размер:</h4>
                  <p>{selectSize}</p>
                </div>

                <div>
                  <h4 className="font-medium">Цвет футболки:</h4>
                  <p>{selectedColor?.id}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
