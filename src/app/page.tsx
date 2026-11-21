import { HeroSection } from "./components/HeroSection";
import { HowPizzaHutWorks } from "./components/HowPizzaHutWorks";
import { WhyChoosePizzaHub } from "./components/WhyChoosePizzaHub";
import { MenuCategories } from "./components/MenuCategories";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MenuCategories />
      <HowPizzaHutWorks />
      <WhyChoosePizzaHub />
    </div>
  );
}

