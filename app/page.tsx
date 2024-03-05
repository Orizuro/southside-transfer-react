'use client';
import Image from "next/image";
import NavBar from "./components/navbar";
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
      <div className="sm:flex container justify-between items-center">
        <div className="box-content px-8 justify-center">
          <h1 className="font-bold text-6xl">We help you get anywhere YOU want in Algarve.</h1>
          <p className="py-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
          </p>

          <CtnButton />
        </div>


        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            slideShadows: true,
          }}
          pagination={true}
          modules={[Autoplay, EffectCoverflow/* , Pagination */]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="swiper-container"
        >
          <div className="container">
            {
              slideImages.map((image) => (
                <SwiperSlide key={image.id + 1} className='carrousel-container'>
                  <Image key={image.id} src={image.src}
                    alt=""
                    fill={true}
                    className={"carrousel-image rounded-lg"}
                  />
                </SwiperSlide>
              ))
            }
          </div>

        </Swiper>

      </div>

      <br />
      <div className="bg-blue p-8">
        <p className=" text-4xl font-semibold text-whiteBg"> How it works ? </p>

        <div className="sm:columns-3 columns-1 p-8 flex" >
          <div>
            <div className=" container absolute bg-whiteBg btn-circle flex  ">
              <p className=" text-center m-auto font-bold"> 1</p>
            </div>
            <div className="p-4 container  ">
              <div className=" container bg-neutral-200 p-4 rounded-xl ">
                <div className="image-container flex justify-center items-center">
                  <img src="/icons/car.png " width={170} height={170} />
                </div >
                <p className=" text-center text-2xl font-extrabold"> You book your ride </p>
                <div className="container p-4 rounded-xl text-center ">
                  <p className=" text-center text-lg font-medium mb-5"> You can call us or schedule the ride,  we make sure everything will go smoothly with our professional drivers. </p>

                  <CtnButton />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className=" container absolute bg-whiteBg btn-circle flex ">
              <p className=" text-center m-auto font-bold"> 2</p>
            </div>
            <div className="p-4 container ">
              <div className=" container bg-neutral-200 p-4 rounded-xl ">
                <div className="image-container flex justify-center items-center mb-10 mt-10">
                  <img src="/icons/shield.png " width={120} height={120} />
                </div >
                <p className=" text-center text-2xl font-extrabold"> Safe Payment </p>
                <div className="container p-4 rounded-xl">
                  <p className=" text-center text-lg font-medium"> You can pay here safely online or at the end of the ride directly to your designated driver. </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className=" container absolute bg-whiteBg btn-circle flex ">
              <p className=" text-center m-auto font-bold"> 3</p>
            </div>
            <div className="p-4 container overlay">
              <div className=" container bg-neutral-200 p-4 rounded-xl ">
                <div className="image-container flex justify-center items-center mb-10 mt-10">
                  <img src="/icons/happy.png " width={120} height={120} />
                </div >
                <p className=" text-center text-2xl font-extrabold"> Relax and enjoy your ride</p>
                <div className="container p-4 rounded-xl">
                  <p className=" text-center text-lg font-medium">Let worries fade, our drivers will take care of everything. </p>
                </div>
              </div>
            </div>
          </div>


        </div >
      </div >
    </>
  );
}
