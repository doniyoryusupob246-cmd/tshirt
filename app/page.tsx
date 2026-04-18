import { Constructor } from '@/components/shared/constructor';
import { Nav } from '@/components/shared/nav';

export default function Home() {
  return (
    <div>
      <Nav />
      <Constructor />
      <div className="mt-100"></div>
    </div>
  );
}
