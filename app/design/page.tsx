import { Constructor } from '@/components/shared/constructor';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Container } from '@/components/shared/container';

export const metadata = {
  title: 'Конструктор — TheShirt',
  description: 'Создайте свой дизайн футболки: принты, свои изображения и текст.',
};

export default function DesignPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-32">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-400">Конструктор</p>
        </Container>
        <Constructor />
      </main>
      <div className="mt-60 md:mt-32">
        <Footer />
      </div>
    </>
  );
}
