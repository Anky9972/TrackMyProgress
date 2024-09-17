// src/pages/Home.js
import Hero from '../components/hero';
import Features from '../components/features';
import HowItWorks from '../components/howitworks';
import CallToAction from '../components/calltoaction';
import Footer from '../components/footer';
import { HeroScrollDemo } from '../components/heroscroll';
import FAQs from '../components/faq';

const Home = () => {
  return (
    <div>
      <Hero />
      <HeroScrollDemo/>
      <Features />
      <HowItWorks />
      <FAQs/>
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
