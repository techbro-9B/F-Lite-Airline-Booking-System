import Image from "next/image";
import HeroSection from "./homepage/components/HeroSection";
import { HomeNavBar } from "./homepage/components/HomeNavBar";
import AboutUs from "./homepage/components/AboutUs";
import WhereWeFly from "./homepage/components/WhereWeFly";
import Footer from "./homepage/components/Footer";
import Testimonials from "./homepage/components/Testimonials";
export default function Home() {
  return (
    <>
    {/* The basic stuff we need for a landing page... */}
    <HomeNavBar/>

    <HeroSection/>
    <AboutUs/>
    <Testimonials/>

    {/* irrelevant for sprint 1 */}
    {/* <WhereWeFly/> 
    <Footer/> */}
      
    </>
  );
}
