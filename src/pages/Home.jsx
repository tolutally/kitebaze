import Hero from '../components/Hero.jsx';
import ScaleBreak from '../components/ScaleBreak.jsx';
import StopStitching from '../components/StopStitching.jsx';
import Approach from '../components/Approach.jsx';
import StartHere from '../components/StartHere.jsx';
import Results from '../components/Results.jsx';
import LeverageShift from '../components/LeverageShift.jsx';
import LogoBanner from '../components/LogoBanner.jsx';
import CaseStudies from '../components/CaseStudies.jsx';
import WhyKitebaze from '../components/WhyKitebaze.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CTA from '../components/CTA.jsx';
import BannerImage from '../components/BannerImage.jsx';
import FAQ from '../components/FAQ.jsx';
import MarqueeBanner from '../components/MarqueeBanner.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <LeverageShift />
      <ScaleBreak />
      <StopStitching />
      <Approach />
      <StartHere />
      <LogoBanner />
      <Results />
      <section className="relative z-10 overflow-hidden border-t border-kb-line bg-kb-canvas pb-24 pt-24">
        <CaseStudies />
        <WhyKitebaze />
        <Testimonials />
        <CTA />
        <BannerImage />
        <FAQ />
        <MarqueeBanner />
      </section>
    </>
  );
}
