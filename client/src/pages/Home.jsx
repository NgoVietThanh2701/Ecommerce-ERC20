import Hero from "../components/Hero";
import Promo from "../components/Promo";
import Carousel from "../components/Carousel";
import SavingZone from "../components/SavingZone";
import CallToAction from "../components/CallToAction";
import MensCategory from "../components/MensCategory";
import WomensCategory from "../components/WomensCategory";

const Home = () => {
   return (
      <>
         <Hero />
         <Promo />
         <Carousel />
         <SavingZone />
         <CallToAction />
         <MensCategory />
         <WomensCategory />
      </>
   )
}

export default Home