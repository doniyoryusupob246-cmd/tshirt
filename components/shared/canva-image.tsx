import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Rnd } from 'react-rnd';
type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};
interface Props {
  className?: string;
  setIsActiveResize: (bool: boolean) => void;
  isActiveResize: boolean;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setPreview: (value: string | null) => void;
  setUpload: (value: File | null) => void;
  preview: string | null;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  inputRef: React.RefObject<HTMLInputElement | null>;
  ref: React.RefObject<HTMLDivElement | null>;
}

const Handle = () => {
  return (
    <div
      className={cn('w-[10px] h-[10px] bg-white border border-[#2e7eff] rounded-sm ml-1 mt-1')}
    />
  );
};

export const CanvaImage: React.FC<Props> = ({
  setPosition,
  position,
  setIsActiveResize,
  isActiveResize,
  setPreview,
  setUpload,
  ref,
  inputRef,
  preview,
}) => {
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsActiveResize(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <Rnd
      onMouseDown={() => setIsActiveResize(true)}
      className={cn('z-50 border', isActiveResize ? 'border-[#2e7eff]' : 'border-transparent')}
      size={{ width: position.width, height: position.height }}
      position={{ x: position.x, y: position.y }}
      lockAspectRatio
      bounds="parent"
      resizeHandleComponent={
        isActiveResize
          ? {
              bottomRight: <Handle />,
              topRight: <Handle />,
              bottomLeft: <Handle />,
              topLeft: <Handle />,
            }
          : {}
      }
      onDragStop={(e, d) => {
        setPosition((prev: Position) => ({
          ...prev,
          x: d.x,
          y: d.y,
        }));
      }}
      onResizeStop={(e, direction, ref, delta, pos) => {
        setPosition({
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...pos,
        });
      }}>
      <div ref={ref} className="relative w-full h-full">
        {isActiveResize && (
          <div className="z-90 cursor-pointer flex items-center justify-center w-10 h-5 bg-red-900 absolute z-90 -top-4 left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-full">
            <Trash
              onClick={() => {
                setPreview(null);
                setUpload(null);
                if (inputRef.current) {
                  inputRef.current.value = '';
                }
              }}
              className="text-white"
              size={14}
            />
          </div>
        )}
        {preview && (
          <Image
            src={preview}
            alt=""
            fill
            className="object-contain pointer-events-none max-w-[600px]"
          />
        )}
      </div>
    </Rnd>
  );
};
