import { HeroSection } from "./components/HeroSection";
import { HowPizzaHutWorks } from "./components/HowPizzaHutWorks";
import { WhyChoosePizzaHub } from "./components/WhyChoosePizzaHub";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowPizzaHutWorks />
      <WhyChoosePizzaHub />
    </div>
  );
}

