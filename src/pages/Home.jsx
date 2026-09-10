import Hero from '../components/Hero.jsx';
import ScaleBreak from '../components/ScaleBreak.jsx';
import StopStitching from '../components/StopStitching.jsx';
import Approach from '../components/Approach.jsx';
import StartHere from '../components/StartHere.jsx';
import Results from '../components/Results.jsx';
import WhoWeWorkWith from '../components/WhoWeWorkWith.jsx';
import LeverageShift from '../components/LeverageShift.jsx';
import WhyNotChatGPT from '../components/WhyNotChatGPT.jsx';
import LogoBanner from '../components/LogoBanner.jsx';
import CaseStudies from '../components/CaseStudies.jsx';
import WhyKitebaze from '../components/WhyKitebaze.jsx';
import SecurityTrust from '../components/SecurityTrust.jsx';
import FAQ from '../components/FAQ.jsx';
import MarqueeBanner from '../components/MarqueeBanner.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <LeverageShift />
      <ScaleBreak />
      <WhyNotChatGPT />
      <Approach />
      <StartHere />
      <LogoBanner />
      <section className="relative z-10 overflow-hidden border-t border-kb-line bg-kb-canvas pb-16 pt-16">
        <CaseStudies />
      </section>
      <WhyKitebaze />
      <Results />
      <WhoWeWorkWith />
      <SecurityTrust />
      <StopStitching />
      <FAQ />
      <MarqueeBanner />
    </>
  );
}
