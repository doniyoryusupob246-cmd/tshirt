import React from 'react';
import { Button } from '../ui/button';

interface Props {
  className?: string;
  setIsBack: (bool: boolean) => void;
  isBack: boolean;
}

export const SelectBackFornt: React.FC<Props> = ({ isBack, setIsBack, className }) => {
  return (
    <div className="flex justify-around mb-10">
      <Button
        onClick={() => setIsBack(false)}
        className="h-[40px] cursor-pointer"
        variant={isBack == false ? 'default' : 'outline'}>
        Передняя часть
      </Button>
      <Button
        onClick={() => setIsBack(true)}
        className="h-[40px] cursor-pointer"
        variant={isBack == true ? 'default' : 'outline'}>
        Задняя часть
      </Button>
    </div>
  );
};
