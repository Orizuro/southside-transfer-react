'use client';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './styles.css'
import { Autoplay, EffectCoverflow } from "swiper/modules";
import CtnButton from "./components/myButton";


export default function Home() {

  const slideImages = [
    { id: 1, src: "/images/image-1.jpg" },
    { id: 2, src: "/images/image-2.jpg" },
    { id: 3, src: "/images/image-3.jpg" },
    { id: 4, src: "/images/image-4.jpg" },
    { id: 5, src: "/images/image-5.jpg" }
  ]
  return (
    <>
      <div className="container justify-between items-center flex-row">
        <div className="px-8">
          <h1 className="font-bold text-5xl sm:text-6xl">We help you get anywhere YOU want in Algarve.</h1>
          <p className="py-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
          </p>

          <CtnButton />
        </div>

        <div className="py-8 bg-black">



        </div>


      </div>

    </>
  );
}
