'use client';

import React, { useEffect, useState } from "react";
import ImagesContainer from "./components/imagesContainer";
import LocationSearchInput from "./pay/LocationSearch";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import HowItWorks from "./components/howItWorksElement";
import CtnButton from "./components/myButton";
import WhatWeOffer from "./components/whtaweoffer";
import { tripInfo } from "@/app/module";

//<text className="text-7xl font-bold justify-center justify-items-center "> Where you want to go ?</text>
//items-center
export default function Home() {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [nPassenger, setSelectedQuantity] = useState(0);
  const [distance, setDistance] = useState<number>(0);
  const [time, setTime] = useState<string>('---');
  const [price, setPrice] = useState(0.0);
  useEffect(() => { DistanceMatrix() }, [destination, origin]);
  useEffect(() => { calculatePrice() }, [nPassenger, distance, time]);

  const { router } = useRouter();

  useEffect(() => {
    push('/precheckout');
  });

  var pricePerKilometer = 1.15;
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

    const data: tripInfo = {
        origin: origin,
        destination: destination,
        price: price,
        time: time,
        nPassenger: nPassenger,
        olddata: undefined,
        adult: 0,
        child: 0,
        infant: 0,
        dateOfPickup: "",
        timeOfPickup: "",
        TotalLuggage: 0,
        additionInfo: undefined
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
    setDistance(response.rows[0].elements[0].distance.value);
    setTime(response.rows[0].elements[0].duration.text);
    console.log(response.rows[0].elements[0].duration.text);

  }

  const data: tripInfo = {
    origin: origin,
    destination: destination,
    price: price,
    time: time,
    nPassenger: nPassenger,
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

  function validateInput() {

    alert(`${origin} -> ${destination} ${nPassenger}`);
    // console.log()

    if (destination && origin && nPassenger != 0) {
      alert(`${origin} -> ${destination} ${nPassenger}`)
      localStorage.setItem("tripInfo", JSON.stringify(data));
      return redirect("/precheckout");
    }
  }

  return (
    <div>
      <div className="w-full h-[440vh] bg-image-test bg-cover bg-bottom">

        <div className="flex justify-center p-5 lg:py-16   ">
          <text className=" text-6xl lg:text-7xl font-bold text-left"> Where you want to go ?</text>
        </div>
        <div className="flex justify-center items-center p-3 lg:py-10 ">
          <div className="backdrop-blur-sm lg:w-3/4 ">
            <h1 className="  text-2xl lg:text-center lg:text-4xl font-medium">We help you get anywhere you want in Algarve.
              Effortlessly plan your journeys and we will create a seamless and cost-effective transfer experience.</h1>
          </div>
        </div>
        <div className='flex justify-center row-start-3 p-5  pt-20'>
          <div className=" text-2xl font-medium backdrop-blur-md">
            Select your pickup location, destination, and the number of passengers, including children, traveling with you:</div>
        </div>

        <div className="flex items-center justify-center lg:pb-10 ">
          <div className=" lg:w-3/4 w-4/5 rounded-2xl h-auto   grid-rows-3  bg-[#F2F4F4] shadow-2xl shadow-black/80">

            <div className="grid row-start-2 lg:grid-cols-10  lg:grid-rows-1 h-auto grid-rows-4">

              <div className="flex items-center md:col-span-3 justify-center p-5  ">
                <LocationSearchInput label={"From :"} placeHolder={"Type your address or location "}
                  onSelectAddress={(address: string) => {
                    setOrigin(address);
                  }
                  }
                />
              </div>
              <div className="flex items-center justify-center md:col-span-3 p-5 ">
                <LocationSearchInput label={"To :"} placeHolder={"Type your address or location "}
                  onSelectAddress={(address: string) => {
                    setDestination(address);
                  }}
                />
              </div>
              <div className="flex items-center justify-center md:col-span-2 p-5">
                <OptionsWithNumbers maxPassengers={16} labelText='Quantity:'></OptionsWithNumbers>
              </div>


              <div className="flex items-center justify-center md:col-span-2">
                <button
                  onClick={validateInput}
                  className='font-medium bg-blueLight hover:bg-blueLight/60 rounded-2xl p-3 '
                >
                  Next {"->"}
                </button>
              </div>
            </div>
            <div className='flex justify-center row-start-3 p-5'>
              <div className=" text-2xl ">Expected time of travel: {time}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-20 lg:py-10 ">
          <div className="backdrop-blur-sm lg:w-3/4 ">
            <h1 className=" text-5xl lg:text-center lg:text-6xl font-medium text-whiteBg ">How it works ? </h1>
          </div>
        </div>
        <div className=" flex justify-center items-center">
          <div className="carousel w-full lg:w-3/4  p-5 ">
            <div className="carousel-item relative w-full lg:w-1/3  ">
              <HowItWorks
                num="1"
                title="You book your ride"
                text="Simply complete the booking form, ensuring to include your flight details if heading from the airport.
                                Select your pickup address/destination, and the price will be instantly displayed based on your chosen route. "
                image="/icons/car.png"
              />
            </div>
            <div className="carousel-item relative w-full lg:w-1/3 ">
              <HowItWorks
                num="2"
                title="Safe"
                text="Your designated driver will await you, holding a sign bearing your name. They'll escort you directly and safely to your destination without any additional stops. Payment can be made via card or cash directly to the driver."
                image="/icons/shield.png" />
            </div>
            <div className="carousel-item relative w-full lg:w-1/3 ">
              <HowItWorks
                num="3"
                title="Relax and enjoy your ride"
                text="Putting our customers first is our utmost priority. Rest assured, our drivers will manage every aspect with precision and care, allowing you to relax and leave your concerns behind."
                image="/icons/happy.png"
              />
            </div>

          </div>
        </div>


        <div>
          <p className=" text-4xl font-semibold mb-4"> What we offer? </p>
        </div>
        <WhatWeOffer

          title="You book your ride"
          text="You can call us or schedule the ride,  we make sure everything will go smoothly with our professional drivers. "
          image="/icons/car.png"

        ></WhatWeOffer>


      </div>

    </div>
  )

}
