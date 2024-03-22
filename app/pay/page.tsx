"use client";
import React, { useEffect, useState } from 'react';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import LocationSearchInput from './LocationSearch';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

//import DistanceMatrixService from './DistanceMatrixService';

interface MapComponentProps { }

const MapComponent: React.FC<MapComponentProps> = () => {

  const router = useRouter();
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [selectedQuatity, setSelectedQuantity] = useState(0);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => { DistanceMatrix() }, [destination]);
  useEffect(() => { DistanceMatrix() }, [origin]);
  useEffect(() => { calculatePrice() }, [selectedQuatity]);
  useEffect(() => { calculatePrice() }, [distance]);


  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [price, setPrice] = useState(0.0);
  var pricePerKilometer = 1.15;
  //price kilometer > 4 = 1.6

  const locationData = {
    "origin": origin,
    "destination": destination,
    "price": price,
  }

  const fetchGoogleApi = async () => {
    console.log("");
  }

  function calculatePrice() {
    var numPassengers = selectedQuatity;
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
    console.log("Price :" + checkifmin)
    if (checkifmin < 32) {
      setPrice(32)
    } else {
      setPrice(checkifmin)
    }

  }
  function DistanceMatrix() {
    if (origin == '' || destination == '') {
      return
    }
    var service = new google.maps.DistanceMatrixService();
    console.log("ORI: " + origin)
    console.log("DES: " + destination)
    console.log("QNT: " + selectedQuatity)

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
    console.log(response.rows[0].elements[0].distance)


  }

  function OptionsWithNumbers({ maxPassengers, labelText }: any) {

    var options = [<option key={0} defaultValue={"--"} >--</option>];
    for (var i = 1; i <= Number(maxPassengers); i++)
      options.push(<option key={i}>{i}</option>);


    return <div className="py-6">
      <label className='text-xl font-semibold' > {labelText} </label>
      <select className="select rounded w-full font-medium mt-2"
        value={selectedQuatity}
        onChange={e => {
          var value = parseFloat(e.target.value);

          if (isNaN(value)) {
            setIsButtonDisable(true);
            setPrice(0);
            setSelectedQuantity(0);
          }
          else {
            setIsButtonDisable(false);
            setSelectedQuantity(Number(e.target.value));
          }
        }
        }>
        {options}
      </select>
    </div>
  }

  return (
    <div className='justify-center items-center flex-col my-5'>
      <div className='w-full bg-blueLight rounded-lg p-8 opacity-95'>
        <h1 className='text-3xl'>Get a ride!</h1>
        {/*<h2 className='text-xl font-bold'>Effortlessly plan your journeys and we will create a seamless and cost-effective transfer experience.</h2>*/}
        <div className='flex flex-row gap-4'>
          <LocationSearchInput label={"From :"} placeHolder={"Type your address or location "}
            onSelectAddress={(address: string) => {
              setOrigin(address);
            }}
          />

          <LocationSearchInput label={"To :"} placeHolder={"Type your address or location "}
            onSelectAddress={(address: string) => {
              setDestination(address);
            }}
          />
        </div>

        <OptionsWithNumbers maxPassengers={16} labelText='Quantity of passengers:'></OptionsWithNumbers>
        <div className="flex-none text-center my-6">
          <text className='text-3xl font-semibold'>Price: {price.toFixed(2)}€</text>
        </div>

        <Link
          onClick={() => localStorage.setItem("paymentInfo", JSON.stringify(locationData))}
          className='font-bold bg-gradient-to-tr from-blue to-green hover:bg-gradient-radial rounded-full px-8 py-4'
          href={{
            pathname: '/checkout',
          }}
        >
          Next
        </Link>
      </div>
    </div>
  )

}

export default MapComponent;
