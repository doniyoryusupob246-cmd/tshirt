import { Nav } from '@/components/shared/nav';
import { Hero } from '@/components/shared/landing/hero';
import { Marquee } from '@/components/shared/landing/marquee';
import { About } from '@/components/shared/landing/about';
import { Services } from '@/components/shared/landing/services';
import { Works } from '@/components/shared/landing/works';
import { Pricing } from '@/components/shared/landing/pricing';
import { Cta } from '@/components/shared/landing/cta';
import { Footer } from '@/components/shared/footer';

export default function Home() {
  return (
    <>
      <Nav overlay />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        {/* <Works /> */}
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
