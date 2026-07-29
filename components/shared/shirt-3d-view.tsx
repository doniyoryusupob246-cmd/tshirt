'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const Shirt3D = dynamic(() => import('./shirt-3d'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full text-gray-400">
      <Loader2 className="animate-spin" size={32} />
    </div>
  ),
});

type Props = {
  color: string;
  decalUrl: string | null;
};

export function Shirt3DView({ color, decalUrl }: Props) {
  return (
    <div className="w-full h-[500px] rounded-xl bg-slate-100">
      <Shirt3D color={color} decalUrl={decalUrl} />
    </div>
  );
}
