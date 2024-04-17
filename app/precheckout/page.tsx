"use client";
import React, { useEffect, useState } from 'react';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import ProductQuantity from '../components/numberselector';
// import { Radio } from '@material-tailwind/react';
import Input, { nameInputClassName } from '../components/input';
import { minLength, string, object } from 'valibot';
import * as v from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from "react-hook-form";


//import DistanceMatrixService from './DistanceMatrixService';

interface MapComponentProps { }

const MapComponent: React.FC<MapComponentProps> = () => {

  var data;
  if (typeof window !== 'undefined') {
    data = localStorage.getItem("calculator") ? JSON.parse(localStorage.getItem("calculator")) : null;
    console.log(data)
  } else {
    data = {}
  }
  const origin = data.origin; // searchParams.get("origin");
  const destination = data.destination //searchParams.get("destination");
  const price = data.price
  const time = data.price
  const selectedQuatity = data.selectedQuatity

  const locationData = {
    "origin": origin,
    "destination": destination,
    "price": price,
    "time": time,
    "selectedQuatity": selectedQuatity,
  }

  const [adult, setAdultN] = useState<number>(0);
  const [child, setChildN] = useState<number>(0);
  const [infant, setInfantN] = useState<number>(0);
  const [passagetSum, setPassagetSum] = useState<number>(0);
  const [meetAndGrret, setMeet] = useState<boolean>(false);

  const [pickupDate, setPickupDate] = useState("");
  const [totalSuitcases, setTotalSuitcases] = useState(0);

  useEffect(() => { setPassagetSum(adult + child + infant) }, [adult, child, infant]);

  function OptionsWithNumbers({ maxPassengers, labelText }: any) {

    var options = [<option key={0} defaultValue={"--"} >--</option>];
    for (var i = 1; i <= Number(maxPassengers); i++)
      options.push(<option key={i}>{i}</option>);

    return <div className="py-6">
    </div>
  }

  const today = new Date().toISOString().slice(0, 10)

  const formSchema = object({
    firstName: string([
      minLength(1, 'Please enter your first name')
    ]),

    lastName: string([
      minLength(1, 'Please enter your last name')
    ]),

    numSuitcases: v.coerce(
      v.number([v.toMinValue(0)]),
      Number,
    ),

    email: string([
      minLength(1, 'Please enter your email.'),
      v.email('The email address is badly formatted.'),
    ]),

    phoneNumber: string([
      minLength(1, "Please enter the pickup Date")
    ]),

    pickupDate: v.string([
      v.minValue(today),
      minLength(1, "Please enter the pickup Time")
    ]),

    pickupTime: string([
      minLength(1, "Please enter the pickup Time")
    ]),

    payment: string([
      minLength(1, "Please enter the payment method")
    ]),

    additionalInformation: v.optional(v.string()),

    terms: v.literal(true, "Please accept our terms."),
  });

  // const [phoneNumber, setPhoneNumber] = useState("");

  type FormSchemaType = v.Output<typeof formSchema>

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: valibotResolver(formSchema),
  });


  return (
    <div className='justify-center justify-items-center  grid grid-flow-row auto-rows-max '>
      <div className=' '>
        <div className='text-3xl p-5 text-center font-medium'> We just need some more details about your tripe</div>
      </div>
      <div className='border rounded-xl w-3/5 p-5 '>
        <div className='text-4xl text-center font-bold'> {price} €</div>
      </div>
      <div className='mt-6'>
        <div className='text-xl text-center '> Select the options bellow, all of them are free of charge</div>
      </div>


      <div className='my-6'>
        <div className='text-xl'>  Would you like a meet and great service?</div>
        <div className='grid grid-cols-2 justify-items-center my-2'>
          <div className="flex">
            <div >
              <label
                className=" border-2 border-[#ECF0F1] flex items-center justify-between rounded-lg bg-white py-2 px-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500 "
                htmlFor="DeliveryStandard"
              >
                <div>
                  <p className="text-gray-700">Yes</p>
                </div>
                <input className='sr-only'
                  type="radio"
                  id="DeliveryStandard"
                  value="DeliveryStandard"
                  checked={meetAndGrret}
                  onChange={() => setMeet(true)}
                >
                </input>
              </label>
            </div>

          </div>
          <div className="flex ">
            <div>
              <label
                className=" border-2 border-[#ECF0F1] flex items-center justify-between rounded-lg bg-white py-2 px-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500 "
                htmlFor="option1"
              >
                <div>
                  <p className="text-gray-700">No</p>
                </div>
                <input className='sr-only'
                  type="radio"
                  id="option1"
                  value="option1"
                  checked={!meetAndGrret}
                  onChange={() => setMeet(false)} >
                </input>
              </label>
            </div>

          </div>

        </div>

        {meetAndGrret && // if it's true return the actual JSX
          <div className="form-group grid-rows-2">
            <div className=''>
              <label>Number of flight</label>
              <input type="text" name="" className="block w-full rounded-md border-0 px-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div>
              <div className=''>
                <label>Name to be displayed</label>
                <input type="text" name="" className="block w-full rounded-md border-0 px-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
        }

      </div>

      <div> Date and time  of pick up</div>

      <div>
        <input
          className={nameInputClassName}
          onChange={(e) => setPickupDate(e.target.value)}
          type='datetime-local'
          required
        />
      </div>

      <div>
        <div className='text-xl '> Select the passenger so we can bring the right seats</div>
      </div>

      <button className='  text-gray-600 transition hover:opacity-75 px-4 ml-5 border rounded-lg shadow-xl' onClick={() => { setAdultN(selectedQuatity), setChildN(0), setInfantN(0) }}> All adults</button>

      <div className='carousel  w-full lg:w-3/4 gap-2 py-5  '>
        <div className='carousel-item pl-2 '>
          <ProductQuantity productQuantity={adult} setProductQuantity={setAdultN} age={"older then 13 years"} title={'Adults'} max={selectedQuatity} total={passagetSum} image="/icons/man.png" scale={'100'} ></ProductQuantity>
        </div>
        <div className='carousel-item'>
          <ProductQuantity productQuantity={child} setProductQuantity={setChildN} age={"less then 13 years"} title={'Children'} max={selectedQuatity} total={passagetSum} image="/icons/child.png" scale={'75'} ></ProductQuantity>
        </div>
        <div className='carousel-item pr-2'>
          <ProductQuantity productQuantity={infant} setProductQuantity={setInfantN} age={"less then 3 years"} title={'Infants'} max={selectedQuatity} total={passagetSum} image="/icons/infante.png" scale={'75'}></ProductQuantity>
        </div>
      </div>

      <div> Number of suitcases</div>
      <div>
        <input
          className={nameInputClassName}
          type='number'
          //onChange={(e) => setTotalSuitcases(e.target.value)} 
          required
        />
      </div>

      <div>
        <input type='submit' />
      </div>


    </div>

  )

}

export default MapComponent;
