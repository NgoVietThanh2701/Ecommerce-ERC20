import Hero from "../../components/shop/Hero";
import Promo from "../../components/shop/Promo";
import Carousel from "../../components/shop/Carousel";
import SavingZone from "../../components/shop/SavingZone";
import CallToAction from "../../components/shop/CallToAction";
import MensCategory from "../../components/shop/MensCategory";
import WomensCategory from "../../components/shop/WomensCategory";

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