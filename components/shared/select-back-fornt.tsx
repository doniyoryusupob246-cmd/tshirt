import React from 'react';
import { Button } from '../ui/button';
import { Plus, X } from 'lucide-react';

interface Props {
  setIsBack: (bool: boolean) => void;
  isBack: boolean;
  hasBack: boolean;
  setHasBack: (bool: boolean) => void;
}

export const SelectBackFornt: React.FC<Props> = ({ isBack, setIsBack, hasBack, setHasBack }) => {
  return (
    <div className="flex justify-center items-center gap-2 mb-10">
      <Button
        onClick={() => setIsBack(false)}
        className="h-[40px] cursor-pointer"
        variant={isBack == false ? 'default' : 'outline'}>
        Передняя часть
      </Button>

      {hasBack ? (
        <>
          <Button
            onClick={() => setIsBack(true)}
            className="h-[40px] cursor-pointer"
            variant={isBack == true ? 'default' : 'outline'}>
            Задняя часть
          </Button>
          <Button
            onClick={() => {
              setHasBack(false);
              setIsBack(false);
            }}
            variant="outline"
            className="h-[40px] w-[40px] cursor-pointer text-red-500 hover:text-red-600"
            title="Убрать заднюю часть">
            <X size={16} />
          </Button>
        </>
      ) : (
        <Button
          onClick={() => {
            setHasBack(true);
            setIsBack(true);
          }}
          variant="outline"
          className="h-[40px] cursor-pointer">
          <Plus size={16} className="mr-1" />
          Добавить заднюю часть
        </Button>
      )}
    </div>
  );
};
