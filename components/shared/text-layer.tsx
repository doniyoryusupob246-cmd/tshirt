import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import React from 'react';
import { Rnd } from 'react-rnd';
import { FONTS, DEFAULT_FONT_ID } from '@/lib/fonts';

export type TextLayerPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TextLayerData = {
  id: string;
  content: string;
  font: string;
  color: string;
  position: TextLayerPosition;
};

interface Props {
  layer: TextLayerData;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  onActivate: () => void;
  onChangePosition: (position: TextLayerPosition) => void;
  onRemove: () => void;
}

const Handle = () => (
  <div className={cn('w-[10px] h-[10px] bg-white border border-[#2e7eff] rounded-sm ml-1 mt-1')} />
);

export const TextLayerItem: React.FC<Props> = ({
  layer,
  containerRef,
  isActive,
  onActivate,
  onChangePosition,
  onRemove,
}) => {
  const [parentSize, setParentSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      setParentSize({
        width: containerRef.current!.offsetWidth,
        height: containerRef.current!.offsetHeight,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef]);

  const font = FONTS.find((f) => f.id === layer.font) ?? FONTS.find((f) => f.id === DEFAULT_FONT_ID)!;

  const widthPx = layer.position.width * parentSize.width;
  const heightPx = layer.position.height * parentSize.height;
  const xPx = layer.position.x * parentSize.width;
  const yPx = layer.position.y * parentSize.height;

  return (
    <Rnd
      onMouseDown={onActivate}
      className={cn(
        'text-layer-rnd border',
        isActive ? 'border-[#2e7eff]' : 'border-transparent',
      )}
      size={{ width: widthPx, height: heightPx }}
      position={{ x: xPx, y: yPx }}
      bounds="parent"
      resizeHandleComponent={
        isActive
          ? {
              bottomRight: <Handle />,
              topRight: <Handle />,
              bottomLeft: <Handle />,
              topLeft: <Handle />,
            }
          : {}
      }
      onDragStop={(e, d) => {
        if (!parentSize.width || !parentSize.height) return;
        onChangePosition({
          ...layer.position,
          x: d.x / parentSize.width,
          y: d.y / parentSize.height,
        });
      }}
      onResizeStop={(e, direction, ref, delta, pos) => {
        if (!parentSize.width || !parentSize.height) return;
        onChangePosition({
          width: ref.offsetWidth / parentSize.width,
          height: ref.offsetHeight / parentSize.height,
          x: pos.x / parentSize.width,
          y: pos.y / parentSize.height,
        });
      }}>
      <div className="relative w-full h-full">
        {isActive && (
          <div className="cursor-pointer flex items-center justify-center w-6 h-6 bg-red-900 absolute -top-3 left-1/2 -translate-x-1/2 rounded-full z-10">
            <Trash
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-white"
              size={12}
            />
          </div>
        )}
        <div
          className="w-full h-full flex items-center justify-center overflow-hidden pointer-events-none select-none text-center break-words leading-tight"
          style={{ fontFamily: font.fontFamily, color: layer.color, fontSize: `${heightPx * 0.6}px` }}>
          {layer.content || 'Текст'}
        </div>
      </div>
    </Rnd>
  );
};
