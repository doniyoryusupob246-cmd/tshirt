'use client';
import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ImageUp, Loader2, Plus, Trash2 } from 'lucide-react';
import { shirt } from '@/data/tshirt';
import { designs } from '@/data/designs';
import { Shirt3DView } from './shirt-3d-view';
import { DialogOrder } from './dialog-order';
import { SelectCategory } from './select-category';
import { SelectDesign } from './select-design';
import { SelectBackFornt } from './select-back-fornt';
import { CanvaImage } from './canva-image';
import { TextLayerItem, type TextLayerData, type TextLayerPosition } from './text-layer';
import { Input } from '../ui/input';
import { FieldLabel } from '../ui/field';
import { processImageFile, MAX_IMAGE_SIZE_MB } from '@/lib/image';
import { FONTS, DEFAULT_FONT_ID } from '@/lib/fonts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
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

  const [selectPrintFront, setSelectPrintFront] = React.useState<string>('');
  const [selectPrintBack, setSelectPrintBack] = React.useState<string>('');
  const [selectColor, setSelectColor] = React.useState(shirt[0].id);
  const [is3D, setIs3D] = React.useState(false);

  const [selectSize, setSelectSize] = React.useState(size[0]);
  const [categories, setCategories] = React.useState<string>('games');
  const [preview, setPreview] = React.useState<string | null>(null);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isBack, setIsBack] = React.useState(false);
  const [hasBack, setHasBack] = React.useState(false);
  const [isActiveResize, setIsActiveResize] = React.useState(false);

  const [textLayersFront, setTextLayersFront] = React.useState<TextLayerData[]>([]);
  const [textLayersBack, setTextLayersBack] = React.useState<TextLayerData[]>([]);
  const [activeTextId, setActiveTextId] = React.useState<string | null>(null);

  const [position, setPosition] = React.useState({
    x: 0.3,
    y: 0.25,
    width: 0.4,
    height: 0.4,
  });

  const [tabs, setTabs] = React.useState(false);
  const selectedPrintFront = designs.find((d) => d.id === selectPrintFront);
  const selectedPrintBack = designs.find((d) => d.id === selectPrintBack);
  const selectedColor = shirt.find((s) => s.id === selectColor);
  const activePrintFront =
    selectedPrintFront && selectedPrintFront.allowedColors.includes(selectColor)
      ? selectedPrintFront
      : null;
  const activePrintBack =
    selectedPrintBack && selectedPrintBack.allowedColors.includes(selectColor)
      ? selectedPrintBack
      : null;
  const filtredDesigns = designs.filter(
    (item) => item.category === categories && item.allowedColors.includes(selectColor),
  );

  const handleColorChange = (colorId: string) => {
    setSelectColor(colorId);

    // чиним только УЖЕ выбранный принт, если он стал недопустим для нового
    // цвета — но не назначаем принт «из ниоткуда», если сторона пустая
    if (selectPrintFront && !selectedPrintFront?.allowedColors.includes(colorId)) {
      const fallback = designs.find(
        (item) => item.category === categories && item.allowedColors.includes(colorId),
      );
      setSelectPrintFront(fallback ? fallback.id : '');
    }

    if (selectPrintBack && !selectedPrintBack?.allowedColors.includes(colorId)) {
      const fallback = designs.find(
        (item) => item.category === categories && item.allowedColors.includes(colorId),
      );
      setSelectPrintBack(fallback ? fallback.id : '');
    }
  };

  const handleFile = async (file: File | null) => {
    if (!file) {
      setPreview(null);
      setUploadError(null);
      return;
    }

    setUploadError(null);
    setIsProcessingUpload(true);
    try {
      const dataUrl = await processImageFile(file);
      setPreview(dataUrl);
    } catch (err) {
      setPreview(null);
      setUploadError(err instanceof Error ? err.message : 'Не удалось загрузить файл');
    } finally {
      setIsProcessingUpload(false);
    }
  };

  const activeTextLayers = isBack ? textLayersBack : textLayersFront;
  const setActiveTextLayers = isBack ? setTextLayersBack : setTextLayersFront;

  const addTextLayer = () => {
    const newLayer: TextLayerData = {
      id: crypto.randomUUID(),
      content: 'Текст',
      font: DEFAULT_FONT_ID,
      color: '#000000',
      position: { x: 0.3, y: 0.4, width: 0.4, height: 0.15 },
    };
    setActiveTextLayers((prev) => [...prev, newLayer]);
    setActiveTextId(newLayer.id);
  };

  const updateTextLayer = (id: string, patch: Partial<TextLayerData>) => {
    setActiveTextLayers((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const removeTextLayer = (id: string) => {
    setActiveTextLayers((prev) => prev.filter((t) => t.id !== id));
    if (activeTextId === id) setActiveTextId(null);
  };

  React.useEffect(() => {
    function handleClickOutsideText(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('.text-layer-rnd')) {
        setActiveTextId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutsideText);
    return () => document.removeEventListener('mousedown', handleClickOutsideText);
  }, []);

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
              <div>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setIs3D((v) => !v)}>
                  {is3D ? '2D режим' : '3D просмотр'}
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
                  onChange={(e) => handleFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="picture"
                  type="file"
                  accept="image/*"
                />
                <FieldLabel
                  className={cn(
                    'border rounded-xl w-full h-[300px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors px-4 text-center',
                    isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-400',
                  )}
                  htmlFor="picture"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFile(file);
                  }}>
                  {isProcessingUpload ? (
                    <Loader2 className="animate-spin text-gray-400" size={28} />
                  ) : preview ? (
                    <Image
                      src={preview}
                      width={200}
                      height={200}
                      alt="Предпросмотр загруженного дизайна"
                      className="object-contain max-h-[260px] w-auto"
                    />
                  ) : (
                    <>
                      <ImageUp className="text-gray-400" size={28} />
                      <p className="text-xs text-gray-400">
                        Перетащите изображение сюда или нажмите, чтобы выбрать
                        <br />
                        (до {MAX_IMAGE_SIZE_MB} МБ)
                      </p>
                    </>
                  )}
                </FieldLabel>

                {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}

                {preview && !isProcessingUpload && (
                  <>
                    <p className="text-xs text-gray-500 mt-2">
                      Перетащите картинку на футболке или измените размер, потянув за уголок
                    </p>
                    <Button
                      onClick={() => {
                        handleFile(null);
                        if (inputRef.current) {
                          inputRef.current.value = '';
                        }
                      }}
                      className="mt-2 cursor-pointer">
                      Очистить
                    </Button>
                  </>
                )}
              </div>

              <div className="w-full md:w-100 mt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[14px] font-medium">
                    Текст для: <b>{isBack ? 'задней части' : 'передней части'}</b>
                  </p>
                  <Button
                    variant="outline"
                    className="cursor-pointer h-[32px] text-xs"
                    onClick={addTextLayer}>
                    <Plus size={14} className="mr-1" />
                    Добавить текст
                  </Button>
                </div>

                <div className="flex flex-col gap-3">
                  {activeTextLayers.map((layer) => (
                    <div
                      key={layer.id}
                      className={cn(
                        'border rounded-lg p-3 flex flex-col gap-2',
                        activeTextId === layer.id ? 'border-blue-400' : 'border-gray-200',
                      )}
                      onClick={() => setActiveTextId(layer.id)}>
                      <Input
                        value={layer.content}
                        onChange={(e) => updateTextLayer(layer.id, { content: e.target.value })}
                        placeholder="Введите текст"
                      />
                      <div className="flex items-center gap-2">
                        <Select
                          value={layer.font}
                          onValueChange={(font) => updateTextLayer(layer.id, { font })}>
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {FONTS.map((f) => (
                              <SelectItem key={f.id} value={f.id}>
                                <span style={{ fontFamily: f.fontFamily }}>{f.label}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <input
                          type="color"
                          value={layer.color}
                          onChange={(e) => updateTextLayer(layer.id, { color: e.target.value })}
                          className="w-9 h-9 rounded cursor-pointer border border-gray-300 shrink-0"
                          title="Цвет текста"
                        />

                        <Button
                          variant="outline"
                          className="cursor-pointer h-9 w-9 p-0 text-red-500 shrink-0"
                          onClick={() => removeTextLayer(layer.id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={cn(
                'w-full md:w-100 mt-5 overflow-hidden transition-all duration-300',
                !tabs ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
              )}>
              <SelectCategory setCategories={setCategories} />

              <p className="text-[13px] text-[#8a8a8a] mb-2">
                Дизайн для: <b>{isBack ? 'задней части' : 'передней части'}</b>
              </p>

              <SelectDesign
                setSelectPrint={isBack ? setSelectPrintBack : setSelectPrintFront}
                selectPrint={isBack ? selectPrintBack : selectPrintFront}
                filtredDesigns={filtredDesigns}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="mt-[200px] md:mt-[0px] mx-auto bg-[radial-gradient(rgba(0,0,0,0.2)_1px,transparent_1px)] bg-size-[20px_20px] relative w-full md:w-[50%] flex items-center justify-center pt-5">
            <div className="relative w-full max-w-[320px] md:max-w-100">
              <SelectBackFornt
                isBack={isBack}
                setIsBack={setIsBack}
                hasBack={hasBack}
                setHasBack={setHasBack}
              />
              {is3D ? (
                <Shirt3DView
                  color={selectedColor?.color ?? '#ffffff'}
                  decalUrl={preview ?? selectedPrintFront?.image ?? null}
                />
              ) : (
                <div ref={designRef} className="card-container">
                  {preview && (
                    <CanvaImage
                      containerRef={designRef}
                      inputRef={inputRef}
                      preview={preview}
                      setPreview={setPreview}
                      position={position}
                      setPosition={setPosition}
                      isActiveResize={isActiveResize}
                      setIsActiveResize={setIsActiveResize}
                      ref={ref}
                    />
                  )}
                  <div className={`card ${isBack ? 'flipped' : ''}`}>
                    <div>
                      {!tabs && activePrintFront && (
                        <Image
                          className="w-full mb-5 absolute"
                          src={activePrintFront.image}
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

                      {textLayersFront.map((layer) => (
                        <TextLayerItem
                          key={layer.id}
                          layer={layer}
                          containerRef={designRef}
                          isActive={activeTextId === layer.id}
                          onActivate={() => setActiveTextId(layer.id)}
                          onChangePosition={(position: TextLayerPosition) =>
                            setTextLayersFront((prev) =>
                              prev.map((t) => (t.id === layer.id ? { ...t, position } : t)),
                            )
                          }
                          onRemove={() => {
                            setTextLayersFront((prev) => prev.filter((t) => t.id !== layer.id));
                            setActiveTextId(null);
                          }}
                        />
                      ))}
                    </div>

                    <div className="card-face back">
                      {hasBack && !tabs && activePrintBack && (
                        <Image
                          className="w-full mb-5 absolute"
                          src={activePrintBack.image}
                          alt=""
                          width={500}
                          height={500}
                        />
                      )}

                      {hasBack &&
                        textLayersBack.map((layer) => (
                          <TextLayerItem
                            key={layer.id}
                            layer={layer}
                            containerRef={designRef}
                            isActive={activeTextId === layer.id}
                            onActivate={() => setActiveTextId(layer.id)}
                            onChangePosition={(position: TextLayerPosition) =>
                              setTextLayersBack((prev) =>
                                prev.map((t) => (t.id === layer.id ? { ...t, position } : t)),
                              )
                            }
                            onRemove={() => {
                              setTextLayersBack((prev) => prev.filter((t) => t.id !== layer.id));
                              setActiveTextId(null);
                            }}
                          />
                        ))}
                      <Image src={selectedColor?.back || ''} alt="" width={500} height={500} />
                    </div>
                  </div>
                </div>
              )}
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
                        onClick={() => handleColorChange(color.id)}
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
                    selectedColor={selectedColor ?? null}
                    activePrintFront={activePrintFront}
                    activePrintBack={activePrintBack}
                    preview={preview}
                    position={position}
                    textLayersFront={textLayersFront}
                    textLayersBack={textLayersBack}
                    hasBack={hasBack}
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
