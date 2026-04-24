'use client';
import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ImageUp } from 'lucide-react';
import { shirt } from '@/data/tshirt';
import { designs } from '@/data/designs';

import { DialogOrder } from './dialog-order';
import { SelectCategory } from './select-category';
import { SelectDesign } from './select-design';
import { SelectBackFornt } from './select-back-fornt';
import { CanvaImage } from './canva-image';
import { Input } from '../ui/input';
import { FieldLabel } from '../ui/field';
import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
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
  back: string;
};

const size = ['S', 'M', 'L', 'XL', 'XXL'];

export const Constructor: React.FC<Props> = ({ className }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const designRef = React.useRef<HTMLDivElement>(null);

  const [selectPrint, setSelectPrint] = React.useState<string>(designs[1].id);
  const [selectColor, setSelectColor] = React.useState(shirt[0].id);

  const [selectSize, setSelectSize] = React.useState(size[0]);
  const [categories, setCategories] = React.useState<string>('games');
  const [uploadFile, setUploadFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [isBack, setIsBack] = React.useState(false);
  const [isActiveResize, setIsActiveResize] = React.useState(false);

  const [position, setPosition] = React.useState({
    x: 0.3,
    y: 0.25,
    width: 0.4,
    height: 0.4,
  });

  const [screenshotUrl, setScreenshotUrl] = React.useState<string | null>(null);
  const [isCapturing, setIsCapturing] = React.useState(false);

  const [tabs, setTabs] = React.useState(false);
  const selectedPrint = designs.find((d) => d.id === selectPrint);
  const selectedColor = shirt.find((s) => s.id === selectColor);

  const filtredDesigns = designs.filter(
    (item) => item.category === categories && item.allowedColors.includes(selectColor),
  );

  const handleCapture = async () => {
    if (!designRef.current) return;
    setIsCapturing(true);
    try {
      const dataUrl = await toPng(designRef.current, {
        cacheBust: true,
        // backgroundColor: null,
      });
      setScreenshotUrl(dataUrl);
    } finally {
      setIsCapturing(false);
    }
  };

  React.useEffect(() => {
    if (!uploadFile) {
      setPreview(null);
      return;
    }

    const render = new FileReader();
    render.onload = (e) => {
      setPreview(e.target?.result as string);
    };

    render.readAsDataURL(uploadFile);
  }, [uploadFile]);

  return (
    <div className={cn('mt-10', className)}>
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {/* LEFT */}
          <div className="w-full md:w-[50%] h-100">
            <div className="flex items-center gap-30">
              <div>
                <h2 className="font-bold text-2xl">Футболки</h2>
                <p className="text-[14px] text-[#8a8a8a]">Создайте свой дизайн</p>
              </div>
              <div>
                <Button
                  onClick={() => setTabs(!tabs)}
                  className="cursor-pointer"
                  variant={'outline'}>
                  {tabs ? 'Назад' : 'Создать дизайн'}
                </Button>
              </div>
            </div>

            <div
              className={cn(
                'w-full md:w-100 mt-5 overflow-hidden transition-all duration-300',
                tabs ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
              )}>
              <div className="w-full md:w-100">
                <Input
                  ref={inputRef}
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="picture"
                  type="file"
                />
                <FieldLabel
                  className="border border-gray-400 rounded-xl w-full h-[300px] flex items-center justify-center cursor-pointer"
                  htmlFor="picture">
                  {preview ? (
                    <Image src={preview} width={200} height={200} alt="Img" />
                  ) : (
                    <ImageUp className="text-gray-400" size={28} />
                  )}
                </FieldLabel>
                {preview && (
                  <Button
                    onClick={() => {
                      setUploadFile(null);
                      setPreview(null);

                      if (inputRef.current) {
                        inputRef.current.value = '';
                      }
                    }}
                    className="mt-2 cursor-pointer">
                    Очистить
                  </Button>
                )}
              </div>
            </div>

            <div
              className={cn(
                'w-full md:w-100 mt-5 overflow-hidden transition-all duration-300',
                !tabs ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
              )}>
              <SelectCategory setCategories={setCategories} />

              <SelectDesign
                setSelectPrint={setSelectPrint}
                selectPrint={selectPrint}
                filtredDesigns={filtredDesigns}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="mt-[200px] md:mt-[0px] mx-auto bg-[radial-gradient(rgba(0,0,0,0.2)_1px,transparent_1px)] bg-size-[20px_20px] relative w-full md:w-[50%] flex items-center justify-center pt-5">
            <div className="relative w-full max-w-[320px] md:max-w-100">
              <SelectBackFornt isBack={isBack} setIsBack={setIsBack} />
              <div ref={designRef} className="card-container">
                {preview && (
                  <CanvaImage
                    containerRef={designRef}
                    inputRef={inputRef}
                    preview={preview}
                    setPreview={setPreview}
                    setUpload={setUploadFile}
                    position={position}
                    setPosition={setPosition}
                    isActiveResize={isActiveResize}
                    setIsActiveResize={setIsActiveResize}
                    ref={ref}
                  />
                )}
                <div className={`card ${isBack ? 'flipped' : ''}`}>
                  <div>
                    {!tabs && (
                      <Image
                        className="w-full mb-5 absolute"
                        src={selectedPrint?.image || ''}
                        alt=""
                        width={500}
                        height={500}
                      />
                    )}

                    <Image
                      className="w-full mb-5"
                      src={selectedColor?.img || ''}
                      alt=""
                      width={500}
                      height={500}
                    />
                  </div>

                  <div className="card-face back">
                    {!tabs && (
                      <Image
                        className="w-full mb-5 absolute"
                        src={selectedPrint?.image || ''}
                        alt=""
                        width={500}
                        height={500}
                      />
                    )}
                    <Image src={selectedColor?.back || ''} alt="" width={500} height={500} />
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM PANEL */}
            <div className=" bg-linear-to-t from-white via-slate-200 to-slate-200 shadow-xl absolute w-[90%] md:w-[70%] h-auto  -bottom-40 md:-bottom-10 rounded-xl p-3">
              <div className="flex flex-col gap-4">
                {/* COLOR */}
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-[13px]">Цвет футболки:</h4>

                  <div className="flex flex-wrap gap-2">
                    {shirt.map((color) => (
                      <Button
                        key={color.id}
                        onClick={() => setSelectColor(color.id)}
                        className="cursor-pointer relative w-6.25 h-6.25 rounded-full
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
                    preview={preview}
                    position={position}
                    selectedPrint={selectedPrint ?? null}
                    selectedColor={selectedColor ?? null}
                    selectBack={isBack}
                    selectSize={selectSize}
                    screenshotUrl={screenshotUrl}
                    isCapturing={isCapturing}
                    onCapture={handleCapture}
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
