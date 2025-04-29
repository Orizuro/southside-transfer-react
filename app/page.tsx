'use client';

import React, { useEffect, useState } from "react";
import LocationSearchInput from "./pay/LocationSearch";
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link';
import HowItWorks from "./components/howItWorksElement";
import WhatWeOffer from "./components/whtaweoffer";
import { tripInfo } from "@/app/module";
import styled from "styled-components";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";
import { Button } from '@nextui-org/react';
import {MailIcon} from "@nextui-org/shared-icons";
import {PhoneIcon} from "@heroicons/react/16/solid";
// import bgImage from "../public/images/bg-image.webp";

//<text className="text-7xl font-bold justify-center justify-items-center "> Where you want to go ?</text>
//items-center
export default function Home() {

  useEffect(() => {
    // Load Google Maps script with places library
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_SECRET_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      console.log('Google Maps API loaded');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      document.head.removeChild(script);
    };
  }, []);


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

    <div className="bg-primary-light">

      {/* Booking Form */}
      <div className="w-full bg-image-test bg-center lg:bg-cover pt-16 p-8">
        <div className="container mx-auto max-w-4xl ">
          <h1 className="text-5xl font-semibold text-center mb-6">
            Faro Airport Transfers
          </h1>
          <p className="text-xl font-medium mb-2 text-justify">
            Book reliable and affordable airport transfers from Faro Airport to any destination in the Algarve.
            Enjoy private, door-to-door transport to resorts, hotels, villas, and golf courses across the region.
          </p>
          <p className="text-xl font-medium text-center">

          </p>
        </div>

        {/* Booking Form */}
        <div className="relative flex flex-col items-center justify-center  pb-16 pt-32 ">

          <div className="w-full max-w-5xl bg-gray-300 p-8 rounded-2xl shadow-lg">
            <h2 className="text-4xl font-bold text-black mb-8 text-center">Booking</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 text-black">
              {/* Departure Date and Time */}
              <div className="lg:col-span-2">
                <label className="block mb-2 font-medium ">Departure date and time</label>
                <input
                    type="datetime-local"
                    className="w-full p-3 rounded-lg text-black"
                />
              </div>

              {/* Pickup */}
              <div className="lg:col-span-2">
                <label className="block mb-2 font-medium">Pick up location</label>
                <LocationSearchInput
                    label=""
                    placeHolder="Select pickup location"
                    onSelectAddress={(address: string) => setOrigin(address)} onAfterSelect={undefined}                />
              </div>

              {/* Drop-off */}
              <div className="lg:col-span-2">
                <label className="block mb-2 font-medium">Drop off location</label>
                <LocationSearchInput
                    label=""
                    placeHolder="Select drop-off location"
                    onSelectAddress={(address: string) => setDestination(address)} onAfterSelect={undefined}                />
              </div>

              {/* How many people */}
              <div className="lg:col-span-2">
                <label className="block mb-2 font-medium">How many people?</label>
                <select
                    className="w-full p-3 rounded-lg text-black"
                    value={nPassenger}
                    onChange={e => setSelectedQuantity(parseInt(e.target.value))}
                >
                  <option value={0}>--</option>
                  {Array.from({ length: 16 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              {/* Return / One Way */}
              <div className="lg:col-span-2 flex items-end justify-center p-4">
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="tripType"
                        className="appearance-none w-5 h-5 border-2 border-white rounded-sm checked:bg-primary-light checked:border-primary-light"
                    />
                    Return
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="tripType"
                        className="appearance-none w-5 h-5 border-2 border-white rounded-sm checked:bg-primary-light checked:border-primary-light"
                    />
                    One way
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-2 flex items-end">
                <button
                    onClick={submit}
                    className="w-full bg-blue hover:bg-primary   bg-primary-light utext-black font-bold py-3 rounded-lg border-primary border-2"
                >
                  FIND A TRANSFER
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className=" p-8">
        {/* How It Works Section */}
        <section id="HowItWorks" className="container mx-auto max-w-5xl mb-16 ">
          <h2 className="text-4xl font-bold mb-4 text-center">How it works ?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <HowItWorks
                num="1"
                title="You book your ride"
                text="Simply complete the booking form, ensuring to include your flight details if heading from the airport. Select your pickup address/destination, and the price will be instantly displayed based on your chosen route."
                image="/icons/car.png"
                alt="car icon"
              />
            </div>
            <div>
              <HowItWorks
                num="2"
                title="Safe"
                text="Your designated driver will await you, holding a sign bearing your name. They'll escort you directly and safely to your destination without any additional stops. Payment can be made via card or cash directly to the driver."
                image="/icons/shield.png"
                alt="shield icon"
              />
            </div>
            <div>
              <HowItWorks
                num="3"
                title="Relax and enjoy your ride"
                text="Putting our customers first is our utmost priority. Rest assured, our drivers will manage every aspect with precision and care, allowing you to relax and leave your concerns behind."
                image="/icons/happy.png"
                alt="happy face icon"
              />
            </div>
          </div>
        </section>
        {/* What We Offer Section */}
        <section id="WhatWeOffer" className="container mx-auto max-w-5xl mb-16">
            <WhatWeOffer/>
        </section>

        {/* Contact Us Section */}
        <section id="ContactUs" className="bg-gray-100 py-12 rounded-2xl">
          <div className="container mx-auto max-w-4xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {/* Email */}
            <div className="flex items-start gap-4 ">
              <div className="bg-white p-3 rounded-full shadow ">
                <MailIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase font-medium">Email Us</h3>
                <p className="lg:text-lg font-semibold text-gray-800">bookings@southsidetransfers.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow">
                <PhoneIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase font-medium">Call Us</h3>
                <p className="text-lg font-semibold text-gray-800">+351 914 313 808</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>


  )

}
