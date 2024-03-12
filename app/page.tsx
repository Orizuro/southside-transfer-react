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

      <div className="sm:flex container justify-between items-center">
        {
          // <div className="box-content px-8 justify-center">
          //   <h1 className="font-bold text-6xl">We help you get anywhere YOU want in Algarve.</h1>
          //   <p className="py-7">
          //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
          //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
          //   </p>
          //
          //   <CtnButton />
          // </div>

          // <Swiper
          //   effect={'coverflow'}
          //   grabCursor={true}
          //   centeredSlides={true}
          //   slidesPerView={'auto'}
          //   loop={true}
          //   coverflowEffect={{
          //     rotate: 0,
          //     stretch: 0,
          //     depth: 150,
          //     modifier: 2,
          //     slideShadows: true,
          //   }}
          //   pagination={true}
          //   modules={[Autoplay, EffectCoverflow/* , Pagination */]}
          //   autoplay={{
          //     delay: 2500,
          //     disableOnInteraction: false,
          //   }}
          //   className="swiper-container"
          // >
          //   <div className="container">
          //     {
          //       slideImages.map((image) => (
          //         <SwiperSlide key={image.id + 1} className='carrousel-container'>
          //           <Image key={image.id} src={image.src}
          //             alt=""
          //             fill={true}
          //             className={"carrousel-image rounded-lg"}
          //           />
          //         </SwiperSlide>
          //       ))
          //     }
          //   </div>
          //
          // </Swiper>
        }

      </div>
      <br />
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
      <br />

    </>
  );
}
