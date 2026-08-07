import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ShoppingCart } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Color, Print } from './constructor';
import { FONTS, DEFAULT_FONT_ID } from '@/lib/fonts';
import type { TextLayerData } from './text-layer';
import React from 'react';
interface Props {
  selectedColor: Color | null;
  activePrintFront: Print | null;
  activePrintBack: Print | null;
  preview: string | null;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  textLayersFront: TextLayerData[];
  textLayersBack: TextLayerData[];
  selectSize: string;
  hasBack: boolean;
}

type SidePreviewProps = {
  label: string;
  bgImage: string;
  preview: string | null;
  activePrint: Print | null;
  position: Props['position'];
  textLayers: TextLayerData[];
  compact: boolean;
};

const SidePreview: React.FC<SidePreviewProps> = ({
  label,
  bgImage,
  preview,
  activePrint,
  position,
  textLayers,
  compact,
}) => (
  <div className="flex flex-col items-center gap-2">
    <h2 className="text-sm font-medium">{label}</h2>
    <div
      className={cn(
        'relative flex items-center justify-center',
        compact ? 'w-[160px] h-[180px]' : 'w-[280px] h-[300px]',
      )}>
      <Image src={bgImage || ''} alt="" fill className="object-contain" />

      {preview ? (
        <div
          className="absolute"
          style={{
            left: `${position.x * 100}%`,
            top: `${position.y * 100}%`,
            width: `${position.width * 100}%`,
            height: `${position.height * 100}%`,
          }}>
          <Image src={preview} alt="" fill className="object-contain" unoptimized />
        </div>
      ) : (
        activePrint && (
          <Image src={activePrint.image} alt="" fill className="absolute object-contain" />
        )
      )}

      {textLayers.map((layer) => {
        const font = FONTS.find((f) => f.id === layer.font) ?? FONTS.find((f) => f.id === DEFAULT_FONT_ID)!;
        return (
          <div
            key={layer.id}
            className="absolute flex items-center justify-center text-center break-words leading-tight overflow-hidden"
            style={{
              left: `${layer.position.x * 100}%`,
              top: `${layer.position.y * 100}%`,
              width: `${layer.position.width * 100}%`,
              height: `${layer.position.height * 100}%`,
              fontFamily: font.fontFamily,
              color: layer.color,
              fontSize: `${(compact ? 160 : 280) * layer.position.height * 0.6}px`,
            }}>
            {layer.content}
          </div>
        );
      })}
    </div>
  </div>
);

export const DialogOrder: React.FC<Props> = ({
  selectedColor,
  activePrintFront,
  activePrintBack,
  preview,
  position,
  textLayersFront,
  textLayersBack,
  hasBack,
  selectSize,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

                <Button className="cursor-pointer w-full h-[40px] bg-[#690B23] text-white rounded-lg mt-4 md:mt-auto">
                  Заказать
                </Button>
              </form>
            </div>

            {/* PREVIEW */}
            <div className="w-full md:w-[50%] h-full flex items-center justify-center flex-col gap-4">
              <div className={cn('flex gap-4', !hasBack && 'flex-col items-center')}>
                <SidePreview
                  label="Передняя часть"
                  bgImage={selectedColor?.img ?? ''}
                  preview={preview}
                  activePrint={activePrintFront}
                  position={position}
                  textLayers={textLayersFront}
                  compact={hasBack}
                />

                {hasBack && (
                  <SidePreview
                    label="Задняя часть"
                    bgImage={selectedColor?.back ?? ''}
                    preview={preview}
                    activePrint={activePrintBack}
                    position={position}
                    textLayers={textLayersBack}
                    compact={hasBack}
                  />
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
