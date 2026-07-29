import { Montserrat, Oswald, Playfair_Display, Caveat, Comfortaa } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'], weight: ['400', '700'] });
const oswald = Oswald({ subsets: ['cyrillic', 'latin'], weight: ['400', '700'] });
const playfair = Playfair_Display({ subsets: ['cyrillic', 'latin'], weight: ['400', '700'] });
const caveat = Caveat({ subsets: ['cyrillic', 'latin'], weight: ['400', '700'] });
const comfortaa = Comfortaa({ subsets: ['cyrillic', 'latin'], weight: ['400', '700'] });

export type FontOption = {
  id: string;
  label: string;
  fontFamily: string;
};

export const FONTS: FontOption[] = [
  { id: 'montserrat', label: 'Montserrat', fontFamily: montserrat.style.fontFamily },
  { id: 'oswald', label: 'Oswald', fontFamily: oswald.style.fontFamily },
  { id: 'playfair', label: 'Playfair Display', fontFamily: playfair.style.fontFamily },
  { id: 'caveat', label: 'Caveat (рукописный)', fontFamily: caveat.style.fontFamily },
  { id: 'comfortaa', label: 'Comfortaa', fontFamily: comfortaa.style.fontFamily },
];

export const DEFAULT_FONT_ID = FONTS[0].id;
