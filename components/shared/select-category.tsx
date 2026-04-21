import React from 'react';
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
  setCategories: (value: string) => void;
}

export const SelectCategory: React.FC<Props> = ({ setCategories, className }) => {
  return (
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
  );
};
