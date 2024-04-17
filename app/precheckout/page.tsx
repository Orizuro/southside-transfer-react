"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductQuantity from '../components/numberselector';
import {tripInfo} from "@/app/module";
import No_ssr from "@/app/components/no_ssr";

interface MapComponentProps { }

const MapComponent: React.FC<MapComponentProps> = () => {


    let data: tripInfo;
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem("tripInfo")
        data = item ? JSON.parse(item) : {destination: "", nPassenger: 0, origin: "", time: "", price: 0}
    } else {
        data = {destination: "", nPassenger: 0, origin: "", time: "", price: 0}
    }

    const [adult, setAdultN] = useState<number>(0);
    const [child, setChildN] = useState<number>(0);
    const [infant, setInfantN] = useState<number>(0);
    const [passagetSum, setPassagetSum] = useState<number>(0);
    const [meetAndGrret, setMeet] = useState<boolean>(false);
    useEffect(() => { setPassagetSum(adult + child + infant) }, [adult, child, infant]);

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



        <div className='justify-center justify-items-center  grid grid-flow-row auto-rows-max '>
            <div className=' '>
                <div className='text-3xl p-5 text-center font-medium'> We just need some more details about your tripe</div>
            </div>
            <No_ssr>
            <div className='border rounded-xl w-3/5 p-5 '>
                <div className='text-4xl text-center font-bold'> {data.price} €</div>
            </div>
            </No_ssr>
            <div className='mt-6'>
                <div className='text-xl text-center '> Select the options bellow, all of them are free of charge</div>
            </div>

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
            <button className='  text-gray-600 transition hover:opacity-75 px-4 ml-5 border rounded-lg shadow-xl' onClick={() => { setAdultN(data.nPassenger), setChildN(0), setInfantN(0) }}> All adults</button>

            <div className='carousel  w-full lg:w-3/4 gap-2 py-5  '>
                <div className='carousel-item pl-2 '>
                    <ProductQuantity productQuantity={adult} setProductQuantity={setAdultN} age={"older then 13 years"} title={'Adults'} max={data.nPassenger} total={passagetSum} image="/icons/man.png" scale={'100'} ></ProductQuantity>
                </div>
                <div className='carousel-item'>
                    <ProductQuantity productQuantity={child} setProductQuantity={setChildN} age={"less then 13 years"} title={'Children'} max={data.nPassenger} total={passagetSum} image="/icons/child.png" scale={'75'} ></ProductQuantity>
                </div>
                <div className='carousel-item pr-2'>
                    <ProductQuantity productQuantity={infant} setProductQuantity={setInfantN} age={"less then 3 years"} title={'Infants'} max={data.nPassenger} total={passagetSum} image="/icons/infante.png" scale={'75'}></ProductQuantity>
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
            <div> Number of suitcases</div>
            <div> Other information</div>
            <div className=' flex justify-between'>

      <div> Date and time  of pick up</div>
                <Link
                    onClick={() => localStorage.setItem("tripInfo", JSON.stringify(data))}
                    className='font-bold bg-gradient-to-tr from-blue to-green hover:bg-gradient-radial rounded-full px-8 py-4'
                    href={{
                        pathname: '/checkout',
                    }}
                >
                    Next
                </Link>
            </div>

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

    )

      <div>
        <input type='submit' />
      </div>


    </div>

  )

}

export default MapComponent;
