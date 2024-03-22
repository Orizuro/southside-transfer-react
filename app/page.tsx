'use client';
import Image from "next/image";
import NavBar from "./components/navbar";
import HowItWorks from "./components/howItWorksElement";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './styles.css'
import { Autoplay, EffectCoverflow } from "swiper/modules";
import CtnButton from "./components/myButton";
import ImagesContainer from "./components/imagesContainer";
import MapComponent from "./pay/page";
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react";


export default function Home() {

  const slideImages = [
    { id: 1, src: "/images/image-1.jpg" },
    { id: 2, src: "/images/image-2.jpg" },
    { id: 3, src: "/images/image-3.jpg" },
    { id: 4, src: "/images/image-4.jpg" },
    { id: 5, src: "/images/image-5.jpg" }
  ]

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      console.log(isInView);
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div>
      <ImagesContainer />
      <br />
      <div className="container mx-auto pt-4 min-h-screen">

        <div className=" bg-gradient-to-r from-blue to-green lg:p-6 p-2">
          <p className=" text-4xl font-semibold text-whiteBg mb-4"> How it works ? </p>

          <div className=" lg:flex-row flex-col items-stretch justify-center flex" >
            <HowItWorks
              num="1"
              title="You book your ride"
              text="You can call us or schedule the ride,  we make sure everything will go smoothly with our professional drivers. "
              image="/icons/car.png"
              button={<CtnButton />}
            />
            <HowItWorks
              num="2"
              title="Safe Payment"
              text="You can pay here safely online or at the end of the ride directly to your designated driver."
              image="/icons/shield.png" />
            <HowItWorks
              num="3"
              title="Relax and enjoy your ride"
              text="Let worries fade, our drivers will take care of everything. "
              image="/icons/happy.png"
            />
          </div >
        </div >
      </div>
      <br />

    </div>
  );
}
