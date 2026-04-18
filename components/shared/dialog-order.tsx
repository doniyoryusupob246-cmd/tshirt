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
import { Color, Print } from './constructor';
interface Props {
  selectedColor: Color | null;
  selectedPrint: Print | null;
  selectSize: string;
  selectBack: boolean;
}
export const DialogOrder: React.FC<Props> = ({
  selectBack,
  selectedColor,
  selectedPrint,
  selectSize,
}) => {
  console.log(selectedColor, selectedPrint);
  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center rounded-xl gap-2 bg-white w-[150px] h-[50px] cursor-pointer">
        Заказать
        <ShoppingCart size={15} />
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-[95vw] md:w-auto h-[600px] overflow-y-scroll md:overflow-auto md:h-130">
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
              <div className="relative max-w-[200px] md:max-w-[300px]">
                <Image
                  className="w-full mb-5 absolute"
                  src={selectedPrint?.image || ''}
                  alt=""
                  width={300}
                  height={300}
                />

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
