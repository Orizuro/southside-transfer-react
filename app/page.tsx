'use client';

import React, { useEffect, useState } from "react";
import LocationSearchInput from "./pay/LocationSearch";
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link';
import HowItWorks from "./components/howItWorksElement";
import WhatWeOffer from "./components/whtaweoffer";
import { tripInfo } from "@/app/module";
import Head from "next/head";
import styled from "styled-components";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";import { Button } from '@nextui-org/react';
// import bgImage from "../public/images/bg-image.webp";

//<text className="text-7xl font-bold justify-center justify-items-center "> Where you want to go ?</text>
//items-center
export default function Home() {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [nPassenger, setSelectedQuantity] = useState(0);
  const [distance, setDistance] = useState<number>(0);
  const [time, setTime] = useState<string>('---');
  const [price, setPrice] = useState(0.0);
  useEffect(() => { DistanceMatrix() });
  useEffect(() => { calculatePrice() });
  var pricePerKilometer = 1.15;

  const router = useRouter();

  function calculatePrice() {
    var numPassengers = nPassenger;
    if (origin == '' || destination == '') {
      return
    }
    if (numPassengers == 0) {
      return
    }
    const basePriceUpTo5 = 7;
    const basePriceUpTo10 = 12;
    const basePriceUpTo12 = 19;
    var mult = 0.86

    const pricePerPassenger = 10; // Assuming 10€ for each additional passenger beyond 8
    var num = 0;
    if (numPassengers <= 4) {
      pricePerKilometer = 1.2;
      num = basePriceUpTo5;
    } else if (numPassengers <= 8) {
      pricePerKilometer = 1.7;
      num = basePriceUpTo10;
    } else if (numPassengers <= 12) {
      num = basePriceUpTo12
      pricePerKilometer = 2.8;
    } else {
      num = 20
      pricePerKilometer = 3.4
      //num = basePriceUpTo10 + pricePerPassenger * (numPassengers - 8);
    }
    console.log("Distance :" + distance)
    //pricePerKilometer = pricePerKilometer * mult
    var checkifmin = num + ((distance / 1000) * pricePerKilometer)
    if (checkifmin < 32) {
      setPrice(32)
    } else {
      setPrice(+checkifmin.toFixed(2))
    }

  }
  function DistanceMatrix() {
    if (origin == '' || destination == '') {
      return
    }
    var service = new google.maps.DistanceMatrixService();
    console.log("ORI: " + origin)
    console.log("DES: " + destination)
    console.log("QNT: " + nPassenger)

    service.getDistanceMatrix({
      avoidTolls: true,
      destinations: [origin],
      origins: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
    },
      callback)
  }
  function callback(response: any, status: google.maps.DistanceMatrixStatus) {
    // if (response == undefined)
    //   alert("Response undefined");
    if( response.rows[0].elements[0].status == "ZERO_RESULTS") {
      console.log("Error");
    }else{
      setDistance(response.rows[0].elements[0].distance.value);
      setTime(response.rows[0].elements[0].duration.text);
    }
  }

  const data: tripInfo = {
    origin: origin,
    destination: destination,
    price: price,
    travelTime: time,
    nPassenger: nPassenger,
    olddata: undefined,
    adult: 0,
    child: 0,
    infant: 0,
    dateOfPickup: "",
    timeOfPickup: "",
    totalLuggage: 0,
    additionInfo: undefined,
    flightNumber: "",
    displayedName: "",
  }

  function OptionsWithNumbers({ maxPassengers, labelText }: any) {

    var options = [<option key={0} defaultValue={"--"} >--</option>];
    for (var i = 1; i <= Number(maxPassengers); i++)
      options.push(<option key={i}>{i}</option>);


    return <div className="w-full ">
      <label className='text-xl font-semibold ' > {labelText} </label>
      <select className=" rounded-xl font-medium text-black w-full"
        value={nPassenger}
        onChange={e => {
          var value = parseFloat(e.target.value);

          if (isNaN(value)) {
            setSelectedQuantity(0);
          }
          else {
            setSelectedQuantity(Number(e.target.value));
          }
        }
        }>
        {options}
      </select>
    </div>
  }

  function submit() {
    if (nPassenger == 0) return null

    localStorage.setItem("tripInfo", JSON.stringify(data))
    router.push("/precheckout");

  }

  return (
    <div>
      <Head>
        <title>
          Southsidetransfers - South Side Transfers
        </title>
        <link rel="canonical" href="https://www.southsidetransfers.com/"/>
        <link rel="icon" href="/favicon.ico"/>
        <meta
            name="description"
            content="Discover reliable transportation services in Algarve, Portugal. Our premium fleet offers seamless transfers from anywhere to explore the stunning Algarve region. Enjoy comfort, punctuality, and competitive rates with our professional drivers. Book now for an unforgettable journey through Algarve’s beautiful landscapes and attractions."
            key="desc"
        />
      </Head>
      <div rel={"preload"} className="w-full bg-image-test bg-cover bg-top ">
        <div className="flex p-3"/>
        <div className="flex justify-center  p-3    ">
          <text className=" text-5xl font-semibold max-w-screen-md "> Where do you want to go ?</text>
        </div>

        <div className="flex justify-center items-center p-6 ">
          <div className="max-w-screen-md 2xl:max-w-screen-xl xl:max-w-screen-lg  ">
            <h1 className="  text-xl font-medium text-justify">Effortlessly plan your
              journeys and we will create a seamless and cost-effective transfer experience in the southside of
              Portugal.</h1>
            <h1 className="  text-xl font-medium text-justify">We help you get anywhere you
              want in
              Algarve.</h1>

          </div>
        </div>
        <div className="flex p-3"/>
        <div className={"items-center justify-center"}>
          <div className=" items-center justify-center p-3 md:flex">
            <div className="  2xl:w-3/4 rounded-xl h-auto grid-rows-3  bg-[#F2F4F4] shadow-2xl shadow-black/80 ">

              <div className="grid row-start-2 md:grid-cols-10  lg:grid-rows-1 h-auto ">

                <div className="flex items-center md:col-span-5 justify-center p-3 lg:col-span-3  ">
                  <LocationSearchInput
                      label={"From :"}
                      placeHolder={"Type your address or location "}
                      onSelectAddress={(address: string) => {
                        setOrigin(address);
                      }}
                  />
                </div>
                <div className="flex items-center justify-center md:col-span-5 p-3 lg:col-span-3 ">
                  <LocationSearchInput
                      label={"To :"}
                      placeHolder={"Type your address or location "}
                      onSelectAddress={(address: string) => {
                        setDestination(address);
                      }}
                  />
                </div>
                <div className="flex items-center justify-center md:col-span-4 p-3 lg:col-span-2 ">
                  <OptionsWithNumbers maxPassengers={16} labelText='Quantity:'></OptionsWithNumbers>
                </div>
                <div className='flex justify-center items-center p-3 md:col-span-4  lg:col-span-10 lg:order-5 '>
                  <div className=" text-xl ">Expected time of travel: {time}</div>
                </div>
                <div className="flex items-center justify-center md:col-span-2  lg:col-span-2 p-3">
                  <button
                      onClick={submit}
                      className='font-medium bg-blueLight hover:bg-blueLight/60 rounded-xl p-3 '
                  >
                    Next {"->"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="flex p-6 "/>
        <section id={"HowItWorks"}>
          <div className="  justify-center items-center flex  p-3  ">
            <div className="  max-w-screen-md rounded-xl bg-[#F2F4F4] shadow-2xl shadow-black/80 p-3  justify-center items-center w-full">
              <h1 className=" text-4xl text-center font-semibold  ">How it works ? </h1>
            </div>
          </div>


          <div className=" flex justify-center items-center">
            <div className="carousel md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl p-3 ">
              <div className="carousel-item relative max-w-full md:max-w-md lg:w-1/3 hover:">
                <HowItWorks
                    num="1"
                    title="You book your ride"
                    text="Simply complete the booking form, ensuring to include your flight details if heading from the airport.
                                Select your pickup address/destination, and the price will be instantly displayed based on your chosen route. "
                    image="/icons/car.png"
                    alt="car icon"
                />
              </div>
              <div className="carousel-item relative  max-w-full md:max-w-md  lg:w-1/3 ">
                <HowItWorks
                    num="2"
                    title="Safe"
                    text="Your designated driver will await you, holding a sign bearing your name. They'll escort you directly and safely to your destination without any additional stops. Payment can be made via card or cash directly to the driver."
                    image="/icons/shield.png"
                    alt="shield icon"/>
              </div>
              <div className="carousel-item relative  max-w-full md:max-w-md lg:w-1/3 ">
                <HowItWorks
                    num="3"
                    title="Relax and enjoy your ride"
                    text="Putting our customers first is our utmost priority. Rest assured, our drivers will manage every aspect with precision and care, allowing you to relax and leave your concerns behind."
                    image="/icons/happy.png"
                    alt="happy face icon"/>
              </div>

            </div>
          </div>
        </section>
        <div className="flex p-3"/>
        <section id={"WhatWeOffer"}>
          <div className="justify-center items-center flex  p-3">
            <div className=" max-w-screen-md rounded-xl bg-[#F2F4F4] shadow-2xl shadow-black/80 p-3  justify-center items-center w-full">
              <h1 className="text-4xl text-center font-semibold  ">What we offer ? </h1>
            </div>
          </div>

          <div className=" flex items-center justify-center p-3">
            <div className="grid md:grid-cols-2 max-w-screen-xl   ">
              <WhatWeOffer
                  title="Family-Friendly Services"
                  text="Enjoy free child seats and boosters for your family, spacious vehicles to accommodate all your luggage and strollers, and safe, comfortable travel for all ages."
                  image="/icons/car.png"
              ></WhatWeOffer>
              <WhatWeOffer
                  title="Airport Transfers"
                  text="Experience reliable and punctual transfers to and from Faro Airport with our meet and greet service. Travel comfortably and leave the logistics to us."
                  image="">
              </WhatWeOffer>
              <WhatWeOffer
                  title="Private Transfers"
                  text="Enjoy customized rides for individuals or groups to any destination in the Algarve. With free cancellation up to 24 hours in advance, transparent pricing, and comfortable, spacious vehicles, we ensure a stress-free journey."
                  image="">
              </WhatWeOffer>
              <WhatWeOffer
                  title="Golf Transfers"
                  text="Experience transportation to and from the Algarve's premier golf courses, with flexible scheduling tailored to your tee times. Our vehicles provide ample space to accommodate all your golf equipment, ensuring a seamless and enjoyable golfing experience."
                  image="">
              </WhatWeOffer>
            </div>
          </div>
        </section>
        <div className="flex p-3"/>

        <section id={"ContactUs"}>
          <div className=" flex justify-center items-center p-3 ">
            <div className=" bg-whiteBg shadow-2xl rounded-xl  ">
              <div className=" text-xl font-semibold justify-center text-center p-3 ">
                If you need any help contact us
              </div>
              <div className=" flex justify-center p-3 text-center  ">
                We will be happy to help you in any question, send us a email or call us.
              </div>
              <div className="items-center justify-center  ">
                <div className=" text-lg items-center justify-center p-3 flex">
                  <a className="p-3 bg-[#DEDEDE] rounded-xl shadow-lg"
                     href={"mailto:bookings@southsidetransfers.com"}>bookings@southsidetransfers.com</a>
                </div>
                <div className=" flex text-lg items-center justify-center p-3">
                  <a className=" p-3 bg-[#DEDEDE] rounded-xl shadow-lg" href="tel://+351914313808">+351 914 313 808 </a>
                </div>

              </div>
            </div>
          </div>
        </section>
        <div className="flex p-3"/>
      </div>

    </div>
  )

}
